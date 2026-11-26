import Constants from 'expo-constants';
import { Platform } from 'react-native';

const DEFAULT_BACKEND_PORT = '3000';
const DEFAULT_TIMEOUT_MS = 12000;

export class ApiError extends Error {
  readonly statusCode: number;
  readonly isNetworkError: boolean;

  constructor(message: string, statusCode = 0, isNetworkError = false) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isNetworkError = isNetworkError;
  }
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * Tự động xác định Base URL của Backend cho cả Web, Android Emulator, iOS Simulator và điện thoại thật (Expo Go):
 * 1. Ưu tiên biến môi trường EXPO_PUBLIC_API_URL nếu có.
 * 2. Trên Web dùng http://localhost:3000.
 * 3. Trên thiết bị/máy ảo dùng host từ Expo Dev Server (Constants.expoConfig.hostUri) ghép cổng 3000.
 * 4. Dự phòng 10.0.2.2:3000 cho Android Emulator và localhost:3000 cho iOS Simulator.
 */
export function getApiBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (configured) {
    return stripTrailingSlash(configured);
  }

  if (Platform.OS === 'web') {
    return `http://localhost:${DEFAULT_BACKEND_PORT}`;
  }

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0]?.trim();
    if (host) {
      if (Platform.OS === 'android' && (host === 'localhost' || host === '127.0.0.1')) {
        return `http://10.0.2.2:${DEFAULT_BACKEND_PORT}`;
      }
      // Bỏ qua các tên miền tunnel của Expo (exp.direct / ngrok) vì cổng 3000 không đi chung tunnel đó
      if (!host.endsWith('.exp.direct') && !host.includes('ngrok')) {
        return `http://${host}:${DEFAULT_BACKEND_PORT}`;
      }
    }
  }

  return Platform.OS === 'android'
    ? `http://10.0.2.2:${DEFAULT_BACKEND_PORT}`
    : `http://localhost:${DEFAULT_BACKEND_PORT}`;
}

/**
 * Chuẩn hóa đường dẫn ảnh món ăn trả về từ Backend (hỗ trợ cả URL tuyệt đối và đường dẫn tương đối bắt đầu bằng '/').
 */
export function resolveAssetUrl(url: string | null | undefined): string | null {
  const trimmed = url?.trim();
  if (!trimmed) {
    return null;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `${getApiBaseUrl()}${trimmed}`;
  }
  return trimmed;
}

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const raw = (payload as { message?: unknown }).message;
    if (typeof raw === 'string' && raw.trim()) {
      return raw.trim();
    }
    if (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === 'string') {
      return raw.join('; ');
    }
  }
  return fallback;
}

/**
 * Hàm gọi HTTP chung cho toàn bộ ứng dụng di động (dùng chung cho cả Menu và Ordering/Account).
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    method = 'GET',
    body,
    token,
    headers: customHeaders,
    signal: externalSignal,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${getApiBaseUrl()}${normalizedPath}`;

  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  const onExternalAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timer);
      throw new ApiError('Yêu cầu đã bị hủy', 0, false);
    }
    externalSignal.addEventListener('abort', onExternalAbort, { once: true });
  }

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...customHeaders,
    };
    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const payload: unknown = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : await response.text().catch(() => null);

    if (!response.ok) {
      const message = extractErrorMessage(
        payload,
        `Yêu cầu thất bại (mã lỗi ${response.status})`,
      );
      throw new ApiError(message, response.status, false);
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (timedOut) {
      throw new ApiError(
        'Máy chủ phản hồi quá lâu. Vui lòng kiểm tra kết nối mạng và thử lại.',
        0,
        true,
      );
    }
    if (externalSignal?.aborted) {
      throw new ApiError('Yêu cầu đã bị hủy', 0, false);
    }
    throw new ApiError(
      'Không kết nối được máy chủ nhà hàng. Hãy kiểm tra Wi-Fi hoặc địa chỉ API.',
      0,
      true,
    );
  } finally {
    clearTimeout(timer);
    externalSignal?.removeEventListener('abort', onExternalAbort);
  }
}
