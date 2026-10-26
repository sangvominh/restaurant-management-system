"use client";
import { useState, type FormEvent, type SyntheticEvent } from "react";
import Image from "next/image";
import {
  Badge,
  Button,
  Card,
  Field,
  Icon,
  Notice,
} from "@/components/staff/ui";
import { money } from "@/lib/api";
import { brand } from "@/config/brand";
import { bill, billTotal, menu, menuImages, tables } from "./data";
import {
  KdsTicket,
  OrderCard,
  PaymentSelector,
  PreviewLink,
  SectionHeading,
  TableCard,
} from "./shared";
type Props = { inform: () => void };
export function Dashboard() {
  const occupied = 14;
  return (
    <>
      <Card className="welcome-card">
        <div className="flex justify-between gap-4">
          <div>
            <p className="muted text-xs mb-2">
              Khu vực: Tầng 1 <span className="mx-2">·</span> Ca trưa
            </p>
            <h1>
              Chào buổi trưa, Tuấn <span className="wave">☀️</span>
            </h1>
            <p className="muted mt-2">
              Một ca làm việc hiệu quả bắt đầu từ đây.
            </p>
          </div>
          <Badge tone="green">● Đang trong ca</Badge>
        </div>
        <div className="shift-strip">
          <span className="strip-icon">
            <Icon name="wb_sunny" />
          </span>
          <div className="flex-1">
            <strong>
              Ca Sáng <span className="font-normal">(06:30 – 14:30)</span>
            </strong>
            <p className="muted text-xs mt-1">Giờ vào ca mẫu: 06:28</p>
          </div>
          <div className="text-right">
            <strong className="metric text-primary">04:28</strong>
            <p className="muted text-xs">Đã làm</p>
          </div>
        </div>
        <div className="progress-track">
          <span style={{ width: "56%" }} />
        </div>
      </Card>
      <div className="stats-grid">
        {[
          [
            "table_restaurant",
            `${occupied}`,
            "/ 18 bàn",
            "Bàn đang phục vụ",
            "82% tải",
            "blue",
          ],
          [
            "receipt_long",
            "8",
            "đơn món",
            "Đang xử lý tại bàn",
            "Đang mở",
            "blue",
          ],
          ["skillet", "12", "món", "Chờ bếp trả món", "2 món muộn", "amber"],
          ["payments", "6.850k", "", "Doanh thu ca mẫu", "Tạm tính", "green"],
        ].map(([icon, value, unit, label, tag, tone]) => (
          <Card key={icon} className="stat-card">
            <div className="flex justify-between items-center">
              <span className={`stat-icon stat-${tone}`}>
                <Icon name={icon} />
              </span>
              <Badge tone={tone === "amber" ? "red" : "blue"}>{tag}</Badge>
            </div>
            <div className="mt-4">
              <strong className="metric">{value}</strong>
              <span className="muted ml-1 text-xs">{unit}</span>
            </div>
            <p className="muted text-xs mt-1">{label}</p>
          </Card>
        ))}
      </div>
      <SectionHeading
        title="Thao tác nhanh"
        meta="Những công việc thường dùng trong ca"
      />
      <div className="quick-actions">
        {[
          ["add_circle", "Chọn bàn", "tables"],
          ["bolt", "Gọi món nhanh", "order"],
          ["menu_book", "Thực đơn", "order"],
          ["payments", "Thu ngân", "payment"],
          ["swap_horiz", "Bàn giao ca", "shift"],
        ].map(([icon, label, screen], i) => (
          <PreviewLink key={label} screen={screen} secondary={i !== 0}>
            <Icon name={icon} />
            <span>{label}</span>
          </PreviewLink>
        ))}
      </div>
      <div className="dashboard-columns">
        <div>
          <SectionHeading title="Nhiệm vụ & Cảnh báo">
            <Badge tone="red">3 nhiệm vụ mẫu</Badge>
          </SectionHeading>
          <div className="space-y-3">
            <Card className="task-card task-red">
              <span className="task-icon">
                <Icon name="receipt_long" />
              </span>
              <div className="flex-1">
                <div className="flex gap-2 flex-wrap items-center">
                  <strong>Bàn 04</strong>
                  <Badge tone="red">Ưu tiên cao</Badge>
                </div>
                <p className="mt-1">Khách yêu cầu tính tiền</p>
                <p className="muted text-xs mt-2">Chờ 5 phút · Tiền mặt</p>
              </div>
              <PreviewLink screen="payment">Xử lý</PreviewLink>
            </Card>
            <Card className="task-card task-green">
              <span className="task-icon">
                <Icon name="soup_kitchen" />
              </span>
              <div className="flex-1">
                <div className="flex gap-2 flex-wrap">
                  <strong>Bàn 07</strong>
                  <Badge tone="green">Bếp báo sẵn</Badge>
                </div>
                <p className="mt-1">Phở Bò Đặc Biệt (2 tô)</p>
                <p className="muted text-xs mt-2">Quầy ra món 01 · Vừa xong</p>
              </div>
              <PreviewLink screen="order-detail" secondary>
                Giao món
              </PreviewLink>
            </Card>
            <Card className="task-card">
              <span className="task-icon">
                <Icon name="room_service" />
              </span>
              <div className="flex-1">
                <strong>Bàn 12</strong>
                <p className="mt-1">Mang thêm ớt lát & chanh</p>
                <p className="muted text-xs mt-2">2 khách · Yêu cầu mẫu</p>
              </div>
              <PreviewLink screen="tables" secondary>
                Xem bàn
              </PreviewLink>
            </Card>
          </div>
        </div>
        <div>
          <SectionHeading title="Tình trạng nhanh">
            <PreviewLink screen="tables" secondary>
              Sơ đồ đầy đủ <Icon name="chevron_right" />
            </PreviewLink>
          </SectionHeading>
          <Card>
            <p className="muted text-xs mb-4">
              Chọn bàn để xem giao diện chi tiết hoặc gọi món.
            </p>
            <div className="mini-tables">
              {[
                ["01", "4 khách", "38m", "blue"],
                ["02", "Trống", "Sẵn sàng", "green"],
                ["03", "Cần dọn", "8 phút", "red"],
                ["04", "Tính tiền", "Chờ thu", "amber"],
              ].map(([n, s, t, c]) => (
                <PreviewLink
                  key={n}
                  screen={
                    n === "02"
                      ? "order"
                      : n === "04"
                        ? "payment"
                        : "order-detail"
                  }
                  secondary
                  className={`mini-table mini-${c}`}
                >
                  <strong>{n}</strong>
                  <span>{s}</span>
                  <small>{t}</small>
                </PreviewLink>
              ))}
            </div>
            <div className="divider my-5" />
            <div className="flex justify-between">
              <span className="muted">Công suất sảnh</span>
              <strong className="text-primary">78%</strong>
            </div>
            <div className="progress-track mt-3">
              <span style={{ width: "78%" }} />
            </div>
          </Card>
          <div className="mt-4">
            <Notice>
              Các chỉ số và nhiệm vụ trên màn hình này là dữ liệu mẫu để duyệt
              giao diện.
            </Notice>
          </div>
        </div>
      </div>
    </>
  );
}
export function Tables({ inform }: Props) {
  const [zone, setZone] = useState("Tất cả");
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const rows = tables.filter(
    (t) =>
      `${t.number} ${t.note}`
        .toLocaleLowerCase("vi")
        .includes(query.toLocaleLowerCase("vi")) &&
      (state === "all" || t.state === state),
  );
  return (
    <>
      <div className="chips">
        {["Tất cả", "Tầng 1 · Sảnh lớn", "Tầng 2 · Máy lạnh", "Sân vườn"].map(
          (z, i) => (
            <button
              key={z}
              onClick={() => setZone(z)}
              className={`chip ${zone === z ? "active" : ""}`}
            >
              {z}
              <span>{[18, 10, 5, 3][i]}</span>
            </button>
          ),
        )}
      </div>
      {zone !== "Tất cả" && (
        <Notice>
          Bộ mẫu minh họa bố cục khu vực; dữ liệu bàn chưa được phân tầng thực
          tế.
        </Notice>
      )}
      <div className="table-summary">
        {[
          ["all", "Tất cả", "18"],
          ["empty", "Trống", "4"],
          ["serving", "Phục vụ", "9"],
          ["reserved", "Đặt trước", "3"],
          ["dirty", "Cần dọn", "2"],
        ].map(([id, label, n]) => (
          <button
            onClick={() => setState(id)}
            key={id}
            className={state === id ? "selected" : ""}
          >
            <strong className={`dot-${id}`}>{n}</strong>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="search-toolbar">
        <div className="search-field">
          <Icon name="search" />
          <input
            aria-label="Tìm bàn hoặc khách"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm số bàn, tên khách…"
          />
        </div>
        <PreviewLink screen="transfer" secondary>
          <Icon name="swap_horiz" />
          <span className="hide-small">Chuyển / Gộp</span>
        </PreviewLink>
      </div>
      <div className="table-grid">
        {rows.map((t) => (
          <TableCard key={t.number} table={t} inform={inform} />
        ))}
      </div>
      {rows.length === 0 && (
        <Card className="empty">Không tìm thấy bàn phù hợp.</Card>
      )}
      <div className="mt-5">
        <Notice>
          Trạng thái bàn, đặt trước và dọn bàn đang là dữ liệu mẫu. Không có bàn
          thực tế nào được thay đổi.
        </Notice>
      </div>
    </>
  );
}
export function Ordering({ inform }: Props) {
  const [category, setCategory] = useState("Tất cả");
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "pho-tai": 2,
    quay: 2,
    tra: 4,
  });
  const [note, setNote] = useState("");
  const total = menu.reduce((s, m) => s + m.price * (quantities[m.id] || 0), 0);
  const count = Object.values(quantities).reduce((s, n) => s + n, 0);
  function add(id: string, delta: number) {
    setQuantities((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + delta) }));
  }
  return (
    <>
      <Card className="context-bar">
        <span className="context-symbol">
          <Icon name="table_restaurant" />
        </span>
        <div className="flex-1">
          <strong className="text-lg">
            Bàn 04 <span className="muted text-sm font-normal">· Tầng 1</span>
          </strong>
          <p className="muted text-xs mt-1">Khách mẫu: Anh Dũng · 4 người</p>
        </div>
        <PreviewLink screen="transfer" secondary>
          <Icon name="swap_horiz" />
          Đổi bàn
        </PreviewLink>
      </Card>
      <div className="search-field my-4">
        <Icon name="search" />
        <input
          aria-label="Tìm món ăn"
          placeholder="Hôm nay khách dùng món gì?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Icon name="tune" />
      </div>
      <div className="chips mb-5">
        {["Tất cả", "Phở bò", "Phở gà", "Ăn kèm", "Đồ uống"].map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="order-layout">
        <div className="menu-grid">
          {menu
            .filter(
              (m) =>
                (category === "Tất cả" || m.category === category) &&
                m.name
                  .toLocaleLowerCase("vi")
                  .includes(query.toLocaleLowerCase("vi")),
            )
            .map((m) => (
              <Card
                key={m.id}
                className={`menu-item ${!m.available ? "menu-unavailable" : ""}`}
              >
                <div className={`food-art food-${m.id}`} aria-hidden="true">
                  <span>{m.emoji}</span>
                  {menuImages[m.id] && (
                    <Image
                      src={menuImages[m.id]}
                      alt={m.name}
                      width={400}
                      height={260}
                      unoptimized
                      className="food-photo"
                      onError={(e: SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {m.popular && <Badge tone="amber">Yêu thích</Badge>}
                  {!m.available && <Badge tone="gray">Tạm hết</Badge>}
                </div>
                <div className="menu-content">
                  <h2>{m.name}</h2>
                  <p className="muted text-xs mt-2">{m.description}</p>
                  <div className="flex justify-between items-center mt-4 gap-2">
                    <strong className="text-primary text-lg">
                      {money(m.price)}
                    </strong>
                    {m.available ? (
                      <div className="stepper">
                        <button
                          aria-label={`Giảm ${m.name}`}
                          onClick={() => add(m.id, -1)}
                          disabled={!quantities[m.id]}
                        >
                          <Icon name="remove" />
                        </button>
                        <strong>{quantities[m.id] || 0}</strong>
                        <button
                          aria-label={`Thêm ${m.name}`}
                          onClick={() => add(m.id, 1)}
                        >
                          <Icon name="add" />
                        </button>
                      </div>
                    ) : (
                      <Badge tone="gray">Hết món</Badge>
                    )}
                  </div>
                  {m.id === "pho-tai" && (quantities[m.id] || 0) > 0 && (
                    <div className="modifier-box">
                      <p className="flex items-center gap-1 text-xs font-semibold mb-2">
                        <Icon name="tune" />
                        Yêu cầu khẩu vị
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Ít bánh", "Nhiều nước béo", "Hành riêng"].map(
                          (s) => (
                            <label key={s} className="modifier">
                              <input
                                type="checkbox"
                                defaultChecked={s === "Ít bánh"}
                              />
                              {s}
                            </label>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>
        <aside className="cart-panel">
          <Card>
            <SectionHeading title="Đơn món đang chọn">
              <Badge>{count} phần</Badge>
            </SectionHeading>
            <p className="muted text-xs mb-3">Bàn 04 · Khách mẫu Anh Dũng</p>
            {menu
              .filter((m) => quantities[m.id] > 0)
              .map((m) => (
                <div key={m.id} className="cart-line">
                  <span>
                    {quantities[m.id]}× {m.name}
                  </span>
                  <strong>{money(m.price * quantities[m.id])}</strong>
                </div>
              ))}
            {!count && (
              <p className="muted my-4">
                Chọn món từ thực đơn để xem tạm tính.
              </p>
            )}
            <Field label="Ghi chú gửi bếp / bar">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={300}
                placeholder="Ví dụ: Không hành, ít cay…"
                rows={3}
              />
            </Field>
            <div className="divider my-4" />
            <div className="flex justify-between text-lg mb-4">
              <strong>Tạm tính</strong>
              <strong className="text-primary">{money(total)}</strong>
            </div>
            <Button onClick={inform} className="w-full" disabled={!count}>
              <Icon name="send" />
              Gửi bếp
            </Button>
            <p className="muted text-xs mt-3">
              Giỏ món chỉ thay đổi trong bản xem trước; chưa tạo đơn hoặc trừ
              kho.
            </p>
          </Card>
        </aside>
      </div>
      <div className="mobile-cart">
        <div>
          <strong>{money(total)}</strong>
          <p className="text-xs">{count} phần · Bàn 04</p>
        </div>
        <Button disabled={!count} onClick={inform}>
          Gửi bếp <Icon name="send" />
        </Button>
      </div>
    </>
  );
}
export function Kitchen({ inform }: Props) {
  const [tab, setTab] = useState("all");
  const [sound, setSound] = useState(true);
  const tickets = [
    {
      number: "081",
      table: "04",
      minutes: 12,
      state: "cooking" as const,
      items: [
        {
          name: "Phở Bò Tái Nạm",
          quantity: 2,
          note: "Không hành, nhiều tiêu sọ xay",
        },
        {
          name: "Phở Bò Sốt Vang",
          quantity: 1,
          note: "Đậm vị truyền thống, ăn kèm quẩy",
        },
      ],
    },
    {
      number: "082",
      table: "09",
      minutes: 3,
      state: "queued" as const,
      items: [
        {
          name: "Phở Gà Đùi Chặt",
          quantity: 2,
          note: "Chặt lá chanh, nhiều nước béo",
        },
        {
          name: "Trứng Trần",
          quantity: 1,
          note: "Lòng đào mềm, rắc tiêu thơm",
        },
      ],
    },
    {
      number: "080",
      table: "02",
      minutes: 1,
      state: "ready" as const,
      items: [
        {
          name: "Bắp Bò Chần",
          quantity: 1,
          note: "Đĩa ăn thêm, kèm gừng và hành chần",
        },
      ],
    },
  ];
  return (
    <>
      <Card className="kitchen-stats">
        <div>
          <Icon name="speed" />
          <span className="muted text-xs">Thời gian ra món TB</span>
          <strong>
            8.5 <small>phút/món</small>
          </strong>
        </div>
        <div>
          <Icon name="local_fire_department" />
          <span className="muted text-xs">Tải nhiệt bếp</span>
          <strong className="text-amber-600">
            Cao <small>(12 món)</small>
          </strong>
        </div>
        <button
          onClick={() => setSound(!sound)}
          className="icon-button"
          aria-label={sound ? "Tắt chuông mẫu" : "Bật chuông mẫu"}
        >
          <Icon name={sound ? "volume_up" : "volume_off"} />
        </button>
      </Card>
      <div className="chips my-5">
        {[
          ["all", "Tất cả", "12"],
          ["queued", "Mới nhận", "4"],
          ["cooking", "Đang nấu", "5"],
          ["ready", "Sẵn sàng", "3"],
        ].map(([id, label, n]) => (
          <button
            onClick={() => setTab(id)}
            className={`chip ${tab === id ? "active" : ""}`}
            key={id}
          >
            {label}
            <span>{n}</span>
          </button>
        ))}
      </div>
      <div className="kds-grid">
        {tickets
          .filter((t) => tab === "all" || t.state === tab)
          .map((t) => (
            <KdsTicket key={t.number} {...t} inform={inform} />
          ))}
      </div>
      <div className="mt-5">
        <Notice>
          Phiếu mẫu để duyệt giao diện. Chế biến thực tế phải được backend kiểm
          tra và xuất kho đúng một lần.
        </Notice>
      </div>
    </>
  );
}
export function Payment({ inform }: Props) {
  const [method, setMethod] = useState("cash");
  const [received, setReceived] = useState(300000);
  return (
    <>
      <Card className="context-bar">
        <span className="table-token">B04</span>
        <div className="flex-1">
          <strong className="text-lg">
            Bàn 04 <span className="muted font-normal text-sm">· Tầng 1</span>
          </strong>
          <p className="muted text-xs mt-1">
            Khách: Anh Dũng · Hóa đơn mẫu #HD-081
          </p>
        </div>
        <Badge tone="amber">Chờ thanh toán</Badge>
      </Card>
      <div className="bill-tools">
        <Button secondary onClick={inform}>
          <Icon name="print" />
          In tạm tính
        </Button>
        <PreviewLink screen="split" secondary>
          <Icon name="call_split" />
          Tách hóa đơn
        </PreviewLink>
        <PreviewLink screen="transfer" secondary>
          <Icon name="merge_type" />
          Gộp bàn
        </PreviewLink>
      </div>
      <div className="two-columns">
        <Card>
          <SectionHeading
            title="Chi tiết thực đơn"
            meta="Hóa đơn theo khách · 4 món, 9 phần"
          />
          {bill.map((i) => (
            <OrderCard
              key={i.name}
              quantity={i.quantity}
              name={i.name}
              note={`${money(i.price)} / phần · ${i.note}`}
              amount={i.price * i.quantity}
            />
          ))}
          <div className="bill-totals">
            <div>
              <span>Tổng tiền món</span>
              <strong>{money(billTotal)}</strong>
            </div>
            <div>
              <span>Giảm giá</span>
              <span className="muted">Chưa áp dụng</span>
            </div>
            <div>
              <span>Thuế / Phụ phí</span>
              <span className="muted">Chưa cấu hình</span>
            </div>
            <div className="grand-total">
              <strong>Tạm tính</strong>
              <strong>{money(billTotal)}</strong>
            </div>
          </div>
          <Notice>
            Chính sách thuế, giảm giá và ưu đãi sẽ theo cấu hình nghiệp vụ được
            phê duyệt.
          </Notice>
        </Card>
        <div className="space-y-4">
          <Card>
            <SectionHeading title="Phương thức thanh toán" />
            <PaymentSelector selected={method} onSelect={setMethod} />
            {method === "cash" ? (
              <div className="mt-5">
                <p className="text-xs font-semibold mb-2">
                  Gợi ý tiền khách đưa
                </p>
                <div className="chips mb-4">
                  {[billTotal, 300000, 500000].map((n) => (
                    <button
                      key={n}
                      className={`chip ${received === n ? "active" : ""}`}
                      onClick={() => setReceived(n)}
                    >
                      {n === billTotal ? "Vừa đủ" : money(n)}
                    </button>
                  ))}
                </div>
                <Field label="Khách đưa (VND)">
                  <input
                    type="number"
                    min={0}
                    max={1000000000}
                    step={1000}
                    value={received}
                    onChange={(e) => setReceived(Number(e.target.value))}
                  />
                </Field>
                <div className="change-row">
                  <span>Tiền thối lại</span>
                  <strong>{money(Math.max(0, received - billTotal))}</strong>
                </div>
                {received < billTotal && (
                  <p className="text-red-600 text-xs mt-2">
                    Tiền khách đưa chưa đủ.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-4">
                <Notice>
                  Phương thức này chưa được tích hợp. Bản xem trước không tạo QR
                  hoặc xác nhận giao dịch.
                </Notice>
              </div>
            )}
          </Card>
          <Button
            onClick={inform}
            className="w-full"
            disabled={method !== "cash" || received < billTotal}
          >
            <Icon name="receipt_long" />
            Thanh toán & In hóa đơn <Icon name="arrow_forward" />
          </Button>
          <p className="muted text-xs text-center">
            Bản xem trước không ghi nhận thu tiền hoặc gửi lệnh in.
          </p>
        </div>
      </div>
    </>
  );
}
export function OrderDetail({ inform }: Props) {
  return (
    <>
      <Card className="context-bar">
        <span className="table-token">B04</span>
        <div className="flex-1">
          <strong className="text-lg">Bàn 04 · Anh Dũng</strong>
          <p className="muted text-xs mt-1">
            Phiếu gọi mẫu #081 · Nhân viên: Nguyễn Văn Tuấn
          </p>
        </div>
        <Badge>42 phút</Badge>
      </Card>
      <Card className="mt-4">
        <div className="flex justify-between">
          <strong className="flex items-center gap-2">
            <Icon name="checklist" />
            Tiến độ phục vụ
          </strong>
          <strong className="text-primary">6 / 9 phần</strong>
        </div>
        <div className="progress-track my-3">
          <span style={{ width: "67%" }} />
        </div>
        <p className="muted text-xs">
          1 phần sẵn sàng bưng · 2 phần đang chế biến
        </p>
      </Card>
      <div className="two-columns mt-5">
        <div className="space-y-5">
          <Card className="detail-ready">
            <SectionHeading title="Chờ bưng lên" meta="Mới xong tại bếp">
              <Badge tone="green">1 phần</Badge>
            </SectionHeading>
            <OrderCard
              quantity={1}
              name="Phở Bò Tái Nạm"
              note="Bàn giao tại quầy ra đồ · 1 phút trước"
              amount={75000}
              action={
                <Button secondary onClick={inform}>
                  <Icon name="room_service" />
                  Đã phục vụ xong món này
                </Button>
              }
            />
          </Card>
          <Card>
            <SectionHeading title="Đang nấu tại bếp">
              <Badge tone="amber">2 phần</Badge>
            </SectionHeading>
            <OrderCard
              quantity={1}
              name="Phở Bò Tái Nạm"
              note="Bếp số 2 · Đã nấu 6 phút"
              amount={75000}
              state={<Badge tone="amber">Đang chế biến</Badge>}
            />
            <OrderCard
              quantity={1}
              name="Phở Bò Sốt Vang"
              note="Bếp số 1 · Không rau mùi"
              amount={85000}
              state={<Badge tone="amber">Đang chế biến</Badge>}
            />
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <SectionHeading title="Đã phục vụ">
              <Badge tone="gray">6 phần</Badge>
            </SectionHeading>
            <OrderCard
              quantity={4}
              name="Trà Đá Hoa Lài"
              note="Đã giao lúc 11:48"
              amount={20000}
            />
            <OrderCard
              quantity={2}
              name="Quẩy Giòn Phố Cổ"
              note="Đã giao lúc 11:50"
              amount={30000}
            />
            <div className="grand-total mt-5 flex justify-between">
              <strong>Tạm tính hóa đơn</strong>
              <strong>{money(billTotal)}</strong>
            </div>
            <p className="muted text-xs mt-2">
              Chưa áp dụng thuế, phí hoặc ưu đãi.
            </p>
          </Card>
          <div className="action-grid">
            <PreviewLink screen="order">
              <Icon name="library_add" />
              Gọi thêm món
            </PreviewLink>
            <PreviewLink screen="kitchen" secondary>
              <Icon name="electric_bolt" />
              Xem bếp
            </PreviewLink>
            <PreviewLink screen="cancel" secondary>
              <Icon name="edit_note" />
              Hủy / Đổi món
            </PreviewLink>
            <PreviewLink screen="transfer" secondary>
              <Icon name="swap_horiz" />
              Chuyển bàn
            </PreviewLink>
          </div>
          <PreviewLink screen="payment" className="w-full">
            <Icon name="payments" />
            Báo tính tiền · Thu ngân
          </PreviewLink>
        </div>
      </div>
    </>
  );
}
export function Shift({ inform }: Props) {
  const [handover, setHandover] = useState(false);
  const [bell, setBell] = useState(true);
  return (
    <>
      <Card className="profile-card">
        <span className="large-avatar">T</span>
        <div>
          <h1>Nguyễn Văn Tuấn</h1>
          <p className="muted mt-1">NV-0842 · Nhân viên phục vụ</p>
          <p className="text-xs text-primary mt-2 flex gap-1 items-center">
            <Icon name="location_on" />
            Chi nhánh Hoàn Kiếm, Hà Nội
          </p>
        </div>
        <Badge tone="green">Đang trong ca</Badge>
      </Card>
      <div className="two-columns mt-5">
        <div className="space-y-5">
          <Card>
            <SectionHeading title="Ca trưa hôm nay">
              <Icon name="wb_sunny" />
            </SectionHeading>
            <div className="shift-info">
              <div>
                <span>Khung giờ ca</span>
                <strong>10:30 – 15:30</strong>
              </div>
              <div>
                <span>Giờ check-in</span>
                <strong>
                  10:25 <Badge tone="green">Đúng giờ</Badge>
                </strong>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <Button secondary onClick={inform} className="flex-1">
                <Icon name="coffee" />
                Nghỉ giữa ca
              </Button>
              <Button onClick={() => setHandover(true)} className="flex-1">
                <Icon name="logout" />
                Bàn giao ca
              </Button>
            </div>
          </Card>
          <Card>
            <SectionHeading
              title="Hiệu suất ca mẫu"
              meta="Dữ liệu minh họa, không phải báo cáo thực tế"
            />
            <div className="performance-grid">
              {[
                ["table_restaurant", "26", "Bàn phục vụ"],
                ["receipt_long", "8.450k", "Doanh thu mang lại"],
                ["grade", "4.9 / 5", "Đánh giá mẫu"],
                ["account_balance_wallet", "120k", "Tip tạm ghi"],
              ].map(([icon, value, label]) => (
                <div key={icon}>
                  <Icon name={icon} />
                  <strong>{value}</strong>
                  <span className="muted text-xs">{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <SectionHeading title="Tiện ích ca & Công việc" />
            {[
              [
                "calendar_month",
                "Lịch làm việc tuần này",
                "5 ca đăng ký · 1 ngày nghỉ",
              ],
              [
                "fact_check",
                "Phiếu bàn giao ca trực",
                "Kiểm đếm tiền két & thiết bị",
              ],
              [
                "swap_horiz",
                "Đổi ca / Xin nghỉ phép",
                "Gửi yêu cầu tới quản lý",
              ],
            ].map(([icon, title, sub]) => (
              <button
                key={title}
                className="settings-row"
                onClick={
                  title.startsWith("Phiếu") ? () => setHandover(true) : inform
                }
              >
                <span className="stat-icon">
                  <Icon name={icon} />
                </span>
                <span className="flex-1 text-left">
                  <strong>{title}</strong>
                  <small className="muted block mt-1">{sub}</small>
                </span>
                <Icon name="chevron_right" />
              </button>
            ))}
          </Card>
          <Card>
            <SectionHeading title="Thiết bị & Tài khoản" />
            <button
              className="settings-row"
              onClick={() => setBell(!bell)}
              aria-pressed={bell}
            >
              <Icon name="notifications_active" />
              <span className="flex-1 text-left">
                <strong>Chuông báo món mới</strong>
                <small className="muted block mt-1">
                  Cài đặt giao diện mẫu
                </small>
              </span>
              <span className={`toggle ${bell ? "on" : ""}`}>
                <span />
              </span>
            </button>
            <button className="settings-row" onClick={inform}>
              <Icon name="pin" />
              <span className="flex-1 text-left">Đổi mã PIN</span>
              <Icon name="chevron_right" />
            </button>
            <PreviewLink screen="login" secondary className="w-full mt-4">
              <Icon name="power_settings_new" />
              Về màn hình đăng nhập
            </PreviewLink>
          </Card>
        </div>
      </div>
      {handover && (
        <div className="modal-backdrop" onClick={() => setHandover(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Kết thúc ca và bàn giao"
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="section-title">
              <h2>Kết thúc & Bàn giao ca</h2>
              <button
                onClick={() => setHandover(false)}
                className="icon-button"
                aria-label="Đóng"
              >
                <Icon name="close" />
              </button>
            </div>
            <Notice>Phiếu mẫu. Chưa chốt ca hoặc đối soát tiền thực tế.</Notice>
            <div className="shift-info my-5">
              <div>
                <span>Nhân viên trực</span>
                <strong>Nguyễn Văn Tuấn</strong>
              </div>
              <div>
                <span>Tiền mặt bàn giao mẫu</span>
                <strong>{money(3240000)}</strong>
              </div>
            </div>
            {[
              "Bàn giao máy POS cầm tay",
              "Đối soát bill và tiền két",
              "Bàn giao bàn đang phục vụ",
            ].map((s) => (
              <label className="checklist-row" key={s}>
                <input type="checkbox" />
                {s}
              </label>
            ))}
            <textarea
              rows={3}
              placeholder="Ghi chú bàn giao…"
              className="my-4"
            />
            <Button onClick={inform} className="w-full">
              Xác nhận chốt ca mẫu
            </Button>
          </section>
        </div>
      )}
    </>
  );
}
export function Login({ inform }: Props) {
  const [role, setRole] = useState("Phục vụ");
  const [show, setShow] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault();
    inform();
  }
  return (
    <div className="preview-login">
      <div className="text-center mb-7">
        <span className="login-mark">
          <Icon name="restaurant" />
        </span>
        <p className="eyebrow mt-5">Cổng nhân viên ca trực</p>
        <h1 className="login-brand mt-2">{brand.name}</h1>
        <p className="muted mt-2">Chuyên nghiệp · Nhanh chóng · Chuẩn xác</p>
      </div>
      <Card>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <p className="field-label">
              <Icon name="badge" />
              Chọn vai trò ca trực
            </p>
            <div className="role-options">
              {[
                ["table_restaurant", "Phục vụ"],
                ["point_of_sale", "Thu ngân"],
                ["skillet", "Bếp"],
                ["manage_accounts", "Quản lý"],
              ].map(([icon, label]) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => setRole(label)}
                  className={role === label ? "selected" : ""}
                >
                  <Icon name={icon} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <p className="muted text-xs mt-2">
              Lựa chọn chỉ để xem giao diện. Quyền thực tế do máy chủ xác định.
            </p>
          </div>
          <Field label="Chi nhánh làm việc">
            <select defaultValue="1">
              <option value="1">CN 01 · Hoàn Kiếm, Hà Nội</option>
              <option value="2">CN 02 · Ba Đình, Hà Nội</option>
              <option value="3">CN 03 · Cầu Giấy, Hà Nội</option>
            </select>
          </Field>
          <Field label="Mã số nhân viên">
            <input placeholder="Ví dụ: NV-2024-08" autoComplete="off" />
          </Field>
          <Field label="Mật khẩu / Mã PIN vào ca">
            <div className="relative">
              <input
                placeholder="Nhập mật khẩu hoặc mã PIN"
                type={show ? "text" : "password"}
                autoComplete="off"
                className="pr-14"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="icon-button absolute right-0 top-0"
                aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                <Icon name={show ? "visibility_off" : "visibility"} />
              </button>
            </div>
          </Field>
          <label className="checklist-row">
            <input type="checkbox" />
            Lưu thông tin trên thiết bị POS này
          </label>
          <Button className="w-full">
            <Icon name="login" />
            Đăng nhập vào ca
          </Button>
          <p className="muted text-xs">
            Bản xem trước không gửi hoặc lưu thông tin đăng nhập.
          </p>
          <div className="divider" />
          <div className="flex gap-3">
            <Button type="button" secondary className="flex-1" onClick={inform}>
              <Icon name="fingerprint" />
              Vân tay / Face ID
            </Button>
            <Button type="button" secondary className="flex-1" onClick={inform}>
              <Icon name="qr_code_scanner" />
              Quét thẻ
            </Button>
          </div>
        </form>
      </Card>
      <PreviewLink screen="dashboard" secondary className="w-full mt-4">
        Xem trước ứng dụng <Icon name="arrow_forward" />
      </PreviewLink>
    </div>
  );
}
