"use client";
import Link from "next/link";
import { Badge, Button, Card, Icon } from "@/components/staff/ui";
import { money } from "@/lib/api";
import type { PreviewTable } from "./data";
export const route = (screen: string) => `/preview/${screen}`;
export function PreviewLink({
  screen,
  children,
  secondary = false,
  className = "",
}: {
  screen: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={route(screen)}
      className={`btn ${secondary ? "btn-secondary" : "btn-primary"} ${className}`}
    >
      {children}
    </Link>
  );
}
export function SectionHeading({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {meta && <p className="muted text-xs mt-1">{meta}</p>}
      </div>
      {children}
    </div>
  );
}
export function TableCard({
  table,
  inform,
}: {
  table: PreviewTable;
  inform: () => void;
}) {
  const labels = {
    serving: "Phục vụ",
    checkout: "Cần thanh toán",
    empty: "Bàn trống",
    dirty: "Cần dọn dẹp",
    reserved: "Đặt trước: 12:30",
  };
  const tones = {
    serving: "blue",
    checkout: "amber",
    empty: "green",
    dirty: "red",
    reserved: "amber",
  } as const;
  return (
    <Card className={`table-card table-${table.state}`}>
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="table-number">Bàn {table.number}</h2>
          <Badge tone={tones[table.state]}>{labels[table.state]}</Badge>
        </div>
        <span className="table-meta">
          <Icon name={table.state === "dirty" ? "timer" : "group"} />
          {table.guests
            ? `${table.guests} · ${table.time}`
            : `${table.capacity} chỗ`}
        </span>
      </div>
      {table.total > 0 && (
        <div className="flex justify-between mt-5 mb-2">
          <span className="muted">
            {table.state === "checkout" ? "Tổng tiền món" : "Tạm tính"}
          </span>
          <strong className="text-lg">{money(table.total)}</strong>
        </div>
      )}
      <p className={`table-note ${table.total ? "" : "my-5"}`}>
        <Icon
          name={
            table.state === "dirty"
              ? "cleaning_services"
              : table.state === "empty"
                ? "check_circle"
                : table.state === "reserved"
                  ? "event_available"
                  : "restaurant"
          }
        />
        {table.note}
      </p>
      <div className="flex gap-2 mt-5">
        {table.state === "empty" ? (
          <PreviewLink screen="order" className="w-full">
            <Icon name="table_restaurant" />
            Chọn bàn & Gọi món
          </PreviewLink>
        ) : table.state === "dirty" ? (
          <Button danger className="w-full" onClick={inform}>
            <Icon name="done_all" />
            Xác nhận đã dọn xong
          </Button>
        ) : table.state === "reserved" ? (
          <>
            <Button secondary onClick={inform} className="flex-1">
              <Icon name="call" />
              Gọi khách
            </Button>
            <Button onClick={inform} className="flex-1">
              Nhận khách
            </Button>
          </>
        ) : (
          <>
            <PreviewLink
              screen={table.state === "checkout" ? "split" : "order-detail"}
              secondary
              className="flex-1"
            >
              <Icon name="receipt_long" />
              {table.state === "checkout" ? "Xem hóa đơn" : "Xem đơn"}
            </PreviewLink>
            <PreviewLink
              screen={table.state === "checkout" ? "payment" : "order"}
              className="flex-1"
            >
              <Icon
                name={table.state === "checkout" ? "payments" : "add_circle"}
              />
              {table.state === "checkout" ? "Thanh toán" : "Gọi thêm"}
            </PreviewLink>
          </>
        )}
      </div>
    </Card>
  );
}
export function OrderCard({
  quantity,
  name,
  note,
  amount,
  state,
  action,
}: {
  quantity: number;
  name: string;
  note?: string;
  amount: number;
  state?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="order-row">
      <span className="quantity-box">{quantity}×</span>
      <div className="flex-1 min-w-0">
        <strong>{name}</strong>
        {note && <p className="muted text-xs mt-1">{note}</p>}
        {state && <div className="mt-2">{state}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
      <strong className="whitespace-nowrap">{money(amount)}</strong>
    </div>
  );
}
export function PaymentSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="payment-options">
      {[
        ["cash", "payments", "Tiền mặt", "Thu tiền tại bàn"],
        ["qr", "qr_code_scanner", "VietQR động", "Chưa tích hợp ngân hàng"],
        ["card", "credit_card", "Thẻ / POS", "Chưa kết nối thiết bị"],
        [
          "wallet",
          "account_balance_wallet",
          "Ví điện tử",
          "Chưa kết nối nhà cung cấp",
        ],
      ].map(([id, icon, title, detail]) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`payment-option ${selected === id ? "selected" : ""}`}
          aria-pressed={selected === id}
        >
          <Icon name={icon} />
          <div className="text-left flex-1">
            <strong>{title}</strong>
            <p className="muted text-xs mt-1">{detail}</p>
          </div>
          <Icon
            name={selected === id ? "check_circle" : "radio_button_unchecked"}
          />
        </button>
      ))}
    </div>
  );
}
export function KdsTicket({
  number,
  table,
  minutes,
  state,
  items,
  inform,
}: {
  number: string;
  table: string;
  minutes: number;
  state: "queued" | "cooking" | "ready";
  items: { name: string; quantity: number; note: string }[];
  inform: () => void;
}) {
  const ready = state === "ready";
  return (
    <Card className={`kds-ticket kds-${state}`}>
      <div className="flex items-center justify-between">
        <span className="eyebrow">Phiếu gọi #{number}</span>
        <Badge tone={ready ? "green" : minutes > 10 ? "red" : "gray"}>
          <Icon name={ready ? "done_all" : "schedule"} />
          {ready ? "Vừa xong" : `${minutes} phút`}
        </Badge>
      </div>
      <h2 className="flex gap-2 items-center text-2xl font-bold mt-3">
        <Icon name="table_restaurant" />
        Bàn {table}
      </h2>
      <div className="divider my-4" />
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 mb-5">
          <span className="quantity-box">{item.quantity}</span>
          <div className="flex-1">
            <strong>{item.name}</strong>
            <p
              className={`text-xs mt-2 ${item.note.includes("Không") ? "kitchen-warning" : "muted"}`}
            >
              {item.note.includes("Không") && <Icon name="warning" />}
              {item.note}
            </p>
          </div>
          <input
            type="checkbox"
            className="ticket-check"
            aria-label={`Đánh dấu ${item.name}`}
          />
        </div>
      ))}
      <p className="muted text-xs mb-4">
        Trạng thái:{" "}
        {ready
          ? "Chờ bưng lên bàn"
          : state === "cooking"
            ? "Đang chế biến"
            : "Chờ nhận nấu"}
      </p>
      <Button
        onClick={inform}
        className={`w-full ${ready ? "btn-ready" : ""}`}
        secondary={ready}
      >
        <Icon
          name={
            ready
              ? "room_service"
              : state === "cooking"
                ? "check_circle"
                : "local_fire_department"
          }
        />
        {ready
          ? "Đã nhận giao món"
          : state === "cooking"
            ? "Hoàn thành · Báo phục vụ"
            : "Bắt đầu nấu"}
      </Button>
    </Card>
  );
}
