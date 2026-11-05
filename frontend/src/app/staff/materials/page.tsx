import { BackLink } from "@/components/staff/context";
import Link from "next/link";
import { Icon } from "@/components/staff/ui";

const choices = [
  { href: "/staff/inventory", icon: "warehouse", title: "Tồn kho", description: "Xem nguyên liệu trong kho và đề nghị xuất cho bếp" },
  { href: "/staff/kitchen-inventory", icon: "inventory_2", title: "Tồn bếp", description: "Xem nguyên liệu đã được cấp và còn tại bếp" },
  { href: "/staff/reports", icon: "report_problem", title: "Báo lỗi / hao hụt", description: "Báo sự cố hoặc hao hụt nguyên liệu, sản phẩm" },
  { href: "/staff/material-returns", icon: "assignment_return", title: "Hoàn trả nguyên liệu", description: "Lập đề nghị hoàn trả và xem các phiếu" },
];

export default function MaterialsPage() {
  return <div className="finished-hub">
    <BackLink href="/staff"/>
    <h1>Nguyên vật liệu</h1>
    <p className="muted">Chọn công việc bạn muốn thực hiện.</p>
    {choices.map(choice => <Link key={choice.href} href={choice.href} className="finished-choice">
      <span className="finished-choice-icon"><Icon name={choice.icon}/></span>
      <span className="finished-choice-text"><strong>{choice.title}</strong><small>{choice.description}</small></span>
    </Link>)}
  </div>;
}
