"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InventoryRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { console.error("Inventory page error:", error); }, [error]);
  return <div className="inventory-error"><div className="error-mark">!</div><h2>Không thể tải dữ liệu tồn kho.</h2><p>Vui lòng kiểm tra kết nối đến máy chủ kho và thử lại.</p><button className="button button-primary" onClick={() => { reset(); router.refresh(); }}>Thử lại</button></div>;
}
