import Link from "next/link";
import { Icon } from "@/components/staff/ui";
const choices = [
 { href: "/staff/production", icon: "skillet", title: "Tạo thành phẩm", description: "Chọn món, xem công thức và báo hoàn thành" },
 { href: "/staff/finished-issues/export", icon: "outbox", title: "Đề nghị xuất thành phẩm", description: "Xem tổng hợp ca và gửi đề nghị xuất bán" },
 { href: "/staff/finished-defects", icon: "report_problem", title: "Báo thành phẩm lỗi", description: "Gửi phiếu thành phẩm lỗi chờ quản lý duyệt" },
];
export default function FinishedGoodsHub() {
 return <div className="finished-hub"><Link className="staff-back" href="/staff">← Trang chủ</Link><h1>Thành phẩm</h1><p className="muted">Chọn công việc bạn muốn thực hiện.</p>{choices.map(choice => <Link key={choice.href} href={choice.href} className="finished-choice"><span className="finished-choice-icon"><Icon name={choice.icon}/></span><span className="finished-choice-text"><strong>{choice.title}</strong><small>{choice.description}</small></span><span aria-hidden="true">→</span></Link>)}</div>;
}
