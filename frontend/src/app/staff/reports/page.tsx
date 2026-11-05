import { BackLink } from "@/components/staff/context";
import Link from 'next/link';
import { Icon } from '@/components/staff/ui';
const items = [
 {href:'/staff/material-waste',icon:'report_problem',title:'Hao hụt nguyên liệu',description:'Báo nguyên liệu hao hụt, bao gồm đổ, hỏng hoặc hết hạn'},
 {href:'/staff/processing-defects',icon:'restaurant',title:'Sự cố trong chế biến',description:'Báo món hoặc lệnh đang làm bị lỗi và nguyên liệu thực tế đã dùng'},
 {href:'/staff/finished-defects',icon:'inventory_2',title:'Hao hụt thành phẩm trong kho',description:'Báo thành phẩm hao hụt tại kho'},
];
export default function Reports() { return <div className="finished-hub"><BackLink href="/staff"/><h1>Báo lỗi / hao hụt</h1><p className="muted">Chọn loại sự cố cần báo.</p>{items.map(item=><Link key={item.href} href={item.href} className="finished-choice"><span className="finished-choice-icon"><Icon name={item.icon}/></span><span className="finished-choice-text"><strong>{item.title}</strong><small>{item.description}</small></span></Link>)}</div>; }
