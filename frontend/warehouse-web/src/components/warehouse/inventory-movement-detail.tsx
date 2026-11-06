"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";
import type { InventoryMovement } from "@/types/inventory";

export default function InventoryMovementDetail({ movement }: { movement: InventoryMovement }) {
  const [open, setOpen] = useState(false);
  const type = ({ RECEIPT: "Nhập kho", ISSUE: "Xuất kho", WASTE: "Hao hụt", RETURN: "Hoàn trả" } as Record<string, string>)[movement.movementType] ?? movement.movementType;
  const fields = [
    ["Nguyên vật liệu", movement.materialCode],
    ["Lô nguyên vật liệu", movement.lotCode],
    ["Vị trí kho", movement.locationName],
    ["Loại giao dịch", type],
    ["Số lượng trước giao dịch", movement.quantityBefore],
    ["Thay đổi", movement.quantityChange],
    ["Số lượng sau giao dịch", movement.quantityAfter],
    ["Chứng từ sản xuất liên quan", movement.orderCode ?? "Không có"],
    ["Thời điểm", new Date(movement.createdAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })],
  ];
  return <>
    <button className="row-action" title="Xem chi tiết" aria-label={"Xem chi tiết giao dịch " + movement.materialCode + " " + movement.lotCode + " " + movement.createdAt} onClick={() => setOpen(true)}><Eye size={14}/></button>
    {open && <div className="modal-backdrop"><div className="modal-card" role="dialog" aria-label="Chi tiết giao dịch kho" style={{ maxHeight: "90vh", overflowY: "auto" }}>
      <div className="modal-top"><h3>Chi tiết giao dịch kho</h3><button className="icon-button" aria-label="Đóng chi tiết giao dịch" onClick={() => setOpen(false)}><X size={17}/></button></div>
      <div className="modal-items">{fields.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || "—"}</strong></div>)}</div>
    </div></div>}
  </>;
}
