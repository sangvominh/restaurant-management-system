'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { API_URL } from './api';

const CHANNEL = 'restaurant-branding';
const STORAGE_EVENT = 'restaurant-branding-updated';
const BrandingContext = createContext<{
  restaurantName: string;
  publishRestaurantName: (name: string) => void;
} | null>(null);

export function RestaurantBrandingProvider({ children }: { children: React.ReactNode }) {
  const [restaurantName, setRestaurantName] = useState('Nhà hàng');
  const sequence = useRef(0);
  const channel = useRef<BroadcastChannel | null>(null);
  const controller = useRef<AbortController | null>(null);
  const pathname = usePathname();

  const refresh = useCallback(async () => {
    const current = ++sequence.current;
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    try {
      const response = await fetch(`${API_URL}/api/public/branding`, { cache: 'no-store', signal: request.signal });
      if (!response.ok) return;
      const data: { restaurantName?: unknown } = await response.json();
      if (current === sequence.current && typeof data.restaurantName === 'string' && data.restaurantName.trim())
        setRestaurantName(data.restaurantName);
    } catch { /* keep the last confirmed name if the API is temporarily unavailable */ }
  }, []);

  const publishRestaurantName = useCallback((name: string) => {
    // Called only after settings PUT has succeeded; an older in-flight GET must not undo it.
    sequence.current++;
    controller.current?.abort();
    setRestaurantName(name);
    if (channel.current) channel.current.postMessage('updated');
    else {
      try { localStorage.setItem(STORAGE_EVENT, String(Date.now())); } catch { /* polling remains available */ }
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onVisible = () => { if (document.visibilityState === 'visible') void refresh(); };
    const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_EVENT) void refresh(); };
    try {
      channel.current = new BroadcastChannel(CHANNEL);
      channel.current.onmessage = () => { void refresh(); };
    } catch { /* older browsers use storage events and polling */ }
    const timer = window.setInterval(onVisible, 5000);
    window.addEventListener('focus', onVisible);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      sequence.current++;
      controller.current?.abort();
      channel.current?.close();
      channel.current = null;
      window.clearInterval(timer);
      window.removeEventListener('focus', onVisible);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

  useEffect(() => {
    const area = pathname.startsWith('/warehouse') ? 'Kho / Nhà hàng' : pathname === '/login' ? 'Đăng nhập' : 'System Admin';
    document.title = `${restaurantName} | ${area}`;
  }, [restaurantName, pathname]);

  const value = useMemo(() => ({ restaurantName, publishRestaurantName }), [restaurantName, publishRestaurantName]);
  return <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>;
}

export function useRestaurantBranding() {
  const branding = useContext(BrandingContext);
  if (!branding) throw new Error('RestaurantBrandingProvider is required');
  return branding;
}
