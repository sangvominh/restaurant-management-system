import Link from "next/link";
import { Card, Icon } from "./ui";
export function ComingSoon({ title }: { title: string }) {
  return <div className="max-w-xl mx-auto p-4"><Link href="/staff" className="staff-back">← Trang chủ</Link><Card className="mt-5 text-center"><Icon name="construction" /><h1 className="text-xl font-semibold mt-3">{title}</h1><p className="muted mt-2">Chức năng đang được phát triển.</p><Link href="/staff" className="btn btn-primary mt-5">Quay về trang chủ</Link></Card></div>;
}
