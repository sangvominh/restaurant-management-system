import { BackLink } from "@/components/staff/context";
import Link from "next/link";
import { Icon } from "@/components/staff/ui";
export default function KitchenHub() {
 return <div className="finished-hub"><BackLink href="/staff"/><h1>Bếp KDS</h1><p className="muted">Chọn công việc cần thực hiện.</p><Link href="/staff/kitchen/orders" className="finished-choice"><span className="finished-choice-icon"><Icon name="receipt_long"/></span><span className="finished-choice-text"><strong>Theo order</strong><small>Xem món theo bàn và trạng thái chế biến</small></span></Link><Link href="/staff/production" className="finished-choice"><span className="finished-choice-icon"><Icon name="skillet"/></span><span className="finished-choice-text"><strong>Theo lệnh sản xuất</strong><small>Xem lệnh được giao và báo hoàn thành</small></span></Link><Link href="/staff/production/history?type=ALL" className="finished-choice"><span className="finished-choice-icon"><Icon name="history"/></span><span className="finished-choice-text"><strong>Lịch sử chế biến</strong><small>Xem kết quả theo order và theo lệnh sản xuất</small></span></Link></div>;
}
