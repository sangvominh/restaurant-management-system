"use client";
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Field,
  Icon,
  Notice,
} from "@/components/staff/ui";
import { money } from "@/lib/api";
import { bill, billTotal } from "./data";
import { OrderCard, PreviewLink, SectionHeading } from "./shared";
type Props = { inform: () => void };
export function Transfer({ inform }: Props) {
  const [mode, setMode] = useState("transfer");
  const [target, setTarget] = useState("02");
  const [zone, setZone] = useState("Tầng 1");
  const [reason, setReason] = useState("Khách đổi chỗ mát hơn");
  return (
    <>
      <Card className="context-bar">
        <span className="table-token">B04</span>
        <div className="flex-1">
          <strong className="text-lg">Bàn B04 · Tầng 1</strong>
          <p className="muted text-xs mt-1">
            Hóa đơn khách: Anh Dũng · {money(billTotal)}
          </p>
        </div>
        <Badge>Đang phục vụ</Badge>
      </Card>
      <div className="segmented my-5">
        {[
          ["transfer", "swap_horiz", "Chuyển bàn"],
          ["merge", "call_merge", "Gộp bàn"],
        ].map(([id, icon, label]) => (
          <button
            key={id}
            className={mode === id ? "selected" : ""}
            onClick={() => setMode(id)}
          >
            <Icon name={icon} />
            {label}
            {id === "merge" && <Badge tone="amber">Cần duyệt</Badge>}
          </button>
        ))}
      </div>
      <div className="two-columns">
        <div>
          <SectionHeading
            title="Chọn bàn đích"
            meta="Dữ liệu bàn mẫu · Hóa đơn vẫn theo từng khách"
          />
          <div className="chips mb-4">
            {["Tầng 1", "Tầng 2", "Sân vườn"].map((z) => (
              <button
                key={z}
                className={`chip ${zone === z ? "active" : ""}`}
                onClick={() => setZone(z)}
              >
                {z}
              </button>
            ))}
          </div>
          {zone !== "Tầng 1" && (
            <div className="mb-4">
              <Notice>Khu vực được chọn chỉ minh họa bộ lọc giao diện.</Notice>
            </div>
          )}
          <div className="space-y-3">
            {[
              ["02", "Bàn trống", "4 – 6 chỗ", "empty"],
              ["01", "Đang dùng bữa", "4 khách · Tối đa 10 khách", "serving"],
              ["03", "Cần dọn dẹp", "Bàn chưa sẵn sàng", "dirty"],
              ["05", "Đặt trước 12:30", "Đã có khách đặt bàn", "reserved"],
            ].map(([n, state, sub, type]) => (
              <button
                key={n}
                onClick={() => setTarget(n)}
                disabled={
                  type === "dirty" ||
                  type === "reserved" ||
                  (mode === "transfer" && type === "serving")
                }
                className={`target-table ${target === n ? "selected" : ""}`}
              >
                <span className="table-token small">B{n}</span>
                <span className="flex-1 text-left">
                  <strong>Bàn B{n}</strong>
                  <span className="muted text-xs block mt-1">{sub}</span>
                </span>
                <Badge
                  tone={
                    type === "empty"
                      ? "green"
                      : type === "serving"
                        ? "blue"
                        : "gray"
                  }
                >
                  {state}
                </Badge>
                <Icon
                  name={
                    target === n
                      ? "check_circle"
                      : type === "dirty" || type === "reserved"
                        ? "lock"
                        : "radio_button_unchecked"
                  }
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <SectionHeading
              title={
                mode === "transfer" ? "Tóm tắt chuyển bàn" : "Tóm tắt gộp bàn"
              }
            />
            <div className="transfer-flow">
              <div>
                <span className="muted text-xs">Bàn nguồn</span>
                <strong>B04</strong>
                <small>Anh Dũng</small>
              </div>
              <Icon name="arrow_forward" />
              <div>
                <span className="muted text-xs">Bàn đích</span>
                <strong>B{target}</strong>
                <small>{target === "02" ? "Bàn trống" : "Đang phục vụ"}</small>
              </div>
            </div>
            <div className="shift-info my-5">
              <div>
                <span>Món chuyển mẫu</span>
                <strong>4 món · 9 phần</strong>
              </div>
              <div>
                <span>Tổng tiền món</span>
                <strong>{money(billTotal)}</strong>
              </div>
            </div>
            <Field label="Lý do chuyển / gộp bàn">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                {[
                  "Khách đổi chỗ mát hơn",
                  "Khách ghép thêm người",
                  "Khu vực máy lạnh lỗi",
                  "Yêu cầu không gian yên tĩnh",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </Card>
          <Notice>
            Đây là bản xem trước. Chưa chuyển hoặc gộp bàn, chưa gửi thông báo
            tới bếp và thu ngân. Hóa đơn theo khách phải được giữ nguyên.
          </Notice>
          <div className="flex gap-3">
            <PreviewLink screen="order-detail" secondary className="flex-1">
              Quay lại
            </PreviewLink>
            <Button onClick={inform} className="flex-1">
              <Icon name="check_circle" />
              {mode === "transfer"
                ? `Chuyển sang B${target}`
                : "Gửi yêu cầu gộp"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export function Split({ inform }: Props) {
  const [mode, setMode] = useState("items");
  const [people, setPeople] = useState(4);
  const [assigned, setAssigned] = useState([0, 1, 0, 1]);
  const totalA = bill.reduce(
    (s, item, i) => s + (assigned[i] === 0 ? item.quantity * item.price : 0),
    0,
  );
  const totalB = billTotal - totalA;
  return (
    <>
      <Card className="context-bar">
        <span className="table-token">B04</span>
        <div>
          <strong className="text-lg">Bàn 04 · Hóa đơn khách Anh Dũng</strong>
          <p className="muted text-xs mt-1">
            #HD-081 · Tổng tiền món {money(billTotal)}
          </p>
        </div>
      </Card>
      <div className="segmented my-5">
        <button
          className={mode === "items" ? "selected" : ""}
          onClick={() => setMode("items")}
        >
          <Icon name="receipt_long" />
          Tách theo món
        </button>
        <button
          className={mode === "equal" ? "selected" : ""}
          onClick={() => setMode("equal")}
        >
          <Icon name="groups" />
          Chia đều người
        </button>
      </div>
      {mode === "equal" && (
        <Card className="mb-5">
          <SectionHeading title="Chia đều hóa đơn mẫu" />
          <div className="flex justify-between items-center gap-4">
            <div>
              <p className="muted">Tạm tính mỗi người</p>
              <strong className="text-3xl text-primary">
                {money(Math.floor(billTotal / people))}
              </strong>
              <p className="muted text-xs mt-2">
                Số dư {money(billTotal % people)} cần phân bổ khi chốt.
              </p>
            </div>
            <div className="stepper">
              <button
                aria-label="Giảm số người"
                disabled={people <= 2}
                onClick={() => setPeople((p) => p - 1)}
              >
                <Icon name="remove" />
              </button>
              <strong>{people}</strong>
              <button
                aria-label="Tăng số người"
                disabled={people >= 20}
                onClick={() => setPeople((p) => p + 1)}
              >
                <Icon name="add" />
              </button>
            </div>
          </div>
        </Card>
      )}
      <p className="muted text-xs flex items-center gap-2 mb-4">
        <Icon name="swipe_vertical" />
        Chạm mũi tên để xem cách phân bổ món giữa hai hóa đơn.
      </p>
      <div className="two-columns">
        {[0, 1].map((group) => (
          <Card key={group} className={`split-card split-${group}`}>
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <span className="split-label">{group === 0 ? "A" : "B"}</span>
                <div>
                  <h2>Hóa đơn {group === 0 ? "gốc" : "mới"}</h2>
                  <p className="muted text-xs mt-1">
                    Khách {group === 0 ? "1 · Anh Dũng" : "2 · Chị Lan"} (mẫu)
                  </p>
                </div>
              </div>
              <Badge>{group === 0 ? "#081A" : "#081B"}</Badge>
            </div>
            <div className="split-total">
              <span>Tạm tính</span>
              <strong>{money(group === 0 ? totalA : totalB)}</strong>
            </div>
            <div className="min-h-40">
              {bill.map(
                (item, i) =>
                  assigned[i] === group && (
                    <div key={i} className="split-item">
                      <OrderCard
                        quantity={item.quantity}
                        name={item.name}
                        note={`${money(item.price)} / phần`}
                        amount={item.price * item.quantity}
                      />
                      <button
                        className="move-item"
                        onClick={() =>
                          setAssigned((a) =>
                            a.map((g, index) => (index === i ? 1 - g : g)),
                          )
                        }
                      >
                        <Icon name={group === 0 ? "south" : "north"} />
                        Chuyển sang {group === 0 ? "B" : "A"}
                      </button>
                    </div>
                  ),
              )}
            </div>
            <div className="flex gap-2 mt-5">
              <Button secondary onClick={inform} className="flex-1">
                <Icon name="print" />
                In tạm tính
              </Button>
              <Button onClick={inform} className="flex-1">
                Thu bill {group === 0 ? "A" : "B"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-5">
        <div className="flex flex-wrap justify-between gap-4">
          <strong className="flex gap-2 items-center">
            <Icon name="calculate" />
            Đối soát tiền món
          </strong>
          <Badge tone="green">Phân bổ mẫu khớp tổng</Badge>
        </div>
        <div className="flex justify-between mt-4">
          <span className="muted">Bill A + Bill B</span>
          <strong>{money(totalA + totalB)}</strong>
        </div>
      </Card>
      <div className="my-4">
        <Notice>
          Phân bổ chỉ diễn ra trên giao diện. API tách hóa đơn chưa hoàn thiện;
          không tạo hóa đơn mới hoặc ghi nhận thanh toán.
        </Notice>
      </div>
      <div className="flex gap-3">
        <Button secondary onClick={() => setAssigned([0, 1, 0, 1])}>
          <Icon name="restart_alt" />
          Đặt lại
        </Button>
        <Button className="flex-1" onClick={inform}>
          <Icon name="call_split" />
          Xác nhận tách 2 hóa đơn
        </Button>
      </div>
    </>
  );
}
export function Cancel({ inform }: Props) {
  const [selected, setSelected] = useState("cooking");
  const [type, setType] = useState("Hủy món");
  const [reason, setReason] = useState("Khách chờ lâu muốn về");
  const [note, setNote] = useState(
    "Khách có việc gấp, muốn xin hủy món sốt vang.",
  );
  return (
    <>
      <Card className="context-bar">
        <span className="context-symbol">
          <Icon name="receipt_long" />
        </span>
        <div className="flex-1">
          <strong className="text-lg">Bàn 04 · Phiếu gọi #081</strong>
          <p className="muted text-xs mt-1">
            Khách mẫu: Anh Dũng · 2 món đang gọi
          </p>
        </div>
        <Badge tone="amber">Cần kiểm tra quyền</Badge>
      </Card>
      <div className="my-4">
        <Notice>
          Món đã chế biến cần kiểm tra phê duyệt và hao hụt. Không tự trừ lại
          kho khi hủy món.
        </Notice>
      </div>
      <div className="two-columns">
        <div className="space-y-5">
          <Card>
            <SectionHeading
              title="Chọn món cần xử lý"
              meta="Chọn 1 món trong hóa đơn của khách"
            />
            {[
              ["cooking", "Phở Bò Sốt Vang", 85000, "Đang nấu · Bếp số 1"],
              ["queued", "Phở Bò Tái Nạm", 75000, "Chờ chế biến"],
            ].map(([id, name, price, state]) => (
              <button
                className={`cancel-choice ${selected === id ? "selected" : ""}`}
                key={id}
                onClick={() => setSelected(String(id))}
              >
                <Icon
                  name={
                    selected === id
                      ? "radio_button_checked"
                      : "radio_button_unchecked"
                  }
                />
                <span className="flex-1 text-left">
                  <strong>1× {name}</strong>
                  <small className="muted block mt-2">{state}</small>
                </span>
                <strong>{money(Number(price))}</strong>
              </button>
            ))}
            {selected === "cooking" && (
              <p className="kitchen-warning mt-3">
                <Icon name="warning" />
                Món đã lên bếp. Cần quản lý ca phê duyệt trước khi xử lý.
              </p>
            )}
          </Card>
          <Card>
            <SectionHeading title="Loại yêu cầu áp dụng" />
            <div className="cancel-types">
              {[
                ["cancel", "Hủy món"],
                ["sync_alt", "Đổi món"],
                ["remove_circle_outline", "Giảm số lượng"],
              ].map(([icon, label]) => (
                <button
                  key={label}
                  className={type === label ? "selected" : ""}
                  onClick={() => setType(label)}
                >
                  <Icon name={icon} />
                  {label}
                </button>
              ))}
            </div>
            {type === "Đổi món" && (
              <div className="mt-4">
                <Field label="Món thay thế mẫu">
                  <select>
                    <option>Phở Gà Đùi Chặt</option>
                    <option>Phở Bò Tái Nạm</option>
                  </select>
                </Field>
              </div>
            )}
            {type === "Giảm số lượng" && (
              <p className="muted text-xs mt-4">
                Món mẫu đang có 1 phần; cần kiểm tra số lượng thực tế trước khi
                giảm.
              </p>
            )}
          </Card>
          <Card>
            <SectionHeading title="Lý do xử lý" />
            <Field label="Lý do bắt buộc">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                {[
                  "Khách chờ lâu muốn về",
                  "Khách đổi ý sang món khác",
                  "Bếp báo hết nguyên liệu",
                  "Nhân viên order nhầm",
                  "Chất lượng không đạt",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <div className="mt-4">
              <Field label="Ghi chú cho quản lý & bếp">
                <textarea
                  maxLength={150}
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Field>
              <p className="muted text-xs text-right mt-1">
                {note.length}/150 ký tự
              </p>
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <SectionHeading title="Quy trình thẩm quyền" />
            <div className="approval-state">
              <span className="approval-icon">
                <Icon name="admin_panel_settings" />
              </span>
              <h2>
                {selected === "cooking"
                  ? "Cần phê duyệt của quản lý"
                  : "Kiểm tra quyền trước khi hủy"}
              </h2>
              <p className="muted text-sm mt-2">
                Chưa gửi yêu cầu. Bản xem trước không ghi nhận phê duyệt hoặc
                thay đổi đơn.
              </p>
            </div>
            <div className="divider my-5" />
            <p className="eyebrow mb-4">Các bước xử lý thực tế</p>
            {[
              [
                "fact_check",
                "Kiểm tra trạng thái món",
                "Máy chủ xác minh đơn, vai trò và chi nhánh",
              ],
              [
                "approval",
                "Xác nhận thẩm quyền",
                "Món đã nấu cần quy trình phê duyệt phù hợp",
              ],
              [
                "inventory_2",
                "Đối soát nguyên liệu",
                "Giữ nguyên sổ xuất kho, ghi nhận hao hụt riêng",
              ],
            ].map(([icon, title, sub]) => (
              <div key={title} className="approval-step">
                <Icon name={icon} />
                <div>
                  <strong>{title}</strong>
                  <p className="muted text-xs mt-1">{sub}</p>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <div className="flex justify-between gap-3">
              <span className="muted">Giá trị món được chọn</span>
              <strong className="text-primary text-xl">
                {money(selected === "cooking" ? 85000 : 75000)}
              </strong>
            </div>
            <p className="muted text-xs mt-2">
              Chưa tính hoàn tiền hoặc điều chỉnh hóa đơn.
            </p>
          </Card>
          <Notice>
            Quy trình phê duyệt, đổi món và hao hụt chưa được tích hợp hoàn
            chỉnh. Nút bên dưới chỉ hiển thị thông báo xem trước.
          </Notice>
          <Button onClick={inform} className="w-full">
            <Icon name="send" />
            {selected === "cooking"
              ? "Gửi yêu cầu phê duyệt"
              : "Gửi yêu cầu xử lý"}
          </Button>
          <PreviewLink screen="order-detail" secondary className="w-full">
            Quay lại chi tiết đơn
          </PreviewLink>
        </div>
      </div>
    </>
  );
}
