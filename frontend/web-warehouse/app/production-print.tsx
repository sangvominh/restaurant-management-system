'use client';
import { DocumentTools, type PrintDocument, type PrintSection } from './document-print';
import type { Detail } from './execution-types';
import { statusInfo } from './status-ui';
const n = (v: string | null | undefined) => Number(v || 0);
const fmt = (v: number | string) => Number(v).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
const when = (v: string | null | undefined) => v ? new Date(v).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : '—';
export default function ProductionPrint({ data, disabled }: { data: Detail; disabled: boolean }) {
  const order = data.order, unit = order.bom.product.unit.symbol;
  const issued = order.materialIssues.filter(i => i.status === 'APPROVED').flatMap(i => i.lines);
  const actual = order.runs.reduce((sum, r) => sum + n(r.actualQuantity), 0);
  const accepted = order.runs.reduce((sum, r) => sum + n(r.acceptedQuantity), 0);
  const inspected = order.runs.filter(r => r.status !== 'PENDING');
  const rejected = inspected.reduce((sum, r) => sum + n(r.actualQuantity) - n(r.acceptedQuantity), 0);
  const waiting = order.runs.filter(r => r.status === 'PENDING').reduce((sum, r) => sum + n(r.actualQuantity), 0);
  const consumption = new Map<string, { name: string; unit: string; quantity: number }>();
  for (const line of issued) {
    const key = line.lot.materialId;
    const row = consumption.get(key) || { name: line.lot.material.name, unit: line.lot.material.unit.symbol, quantity: 0 };
    row.quantity += line.consumptions.reduce((sum, c) => sum + n(c.quantity), 0);
    consumption.set(key, row);
  }
  const planned = new Set(order.bom.lines.map(l => l.materialId));
  const returns = new Map<string, string[]>(), wastes = new Map<string, string[]>();
  for (const line of issued) {
    for (const entry of [
      ...line.returnLines.map(r => ({ ...r, doc: r.return, area: 'return' as const, maker: r.return.requestedBy.name, target: returns })),
      ...line.wasteLines.map(w => ({ ...w, doc: w.waste, area: 'waste' as const, maker: w.waste.reportedBy.name, target: wastes })),
    ]) {
      const d = entry.doc, row = entry.target.get(d.id) || [
        d.id + '\n' + when(d.requestedAt || d.reportedAt) + '\n' + entry.maker,
        '',
        statusInfo(entry.area, d.status).label,
        d.reason,
        (d.reviewedBy?.name || 'Chưa xử lý') + '\n' + when(d.approvedAt),
      ];
      row[1] += (row[1] ? '\n' : '') + line.lot.material.name + ' · ' + line.lot.code + ': ' + fmt(entry.quantity) + ' ' + line.lot.material.unit.symbol;
      entry.target.set(d.id, row);
    }
  }
  const sections: PrintSection[] = [
    {
      title: '2. Cấp nguyên liệu theo phiếu và lô',
      columns: ['Phiếu / ngày đề nghị / người lập', 'Nguyên liệu / lô', 'Đề nghị / đã cấp', 'Trạng thái / người xử lý / ngày', 'Lý do đề nghị / phản hồi'],
      rows: order.materialIssues.flatMap(issue => issue.lines.map(line => [
        issue.id + '\n' + when(issue.requestedAt) + '\n' + issue.requestedBy.name,
        line.lot.material.name + '\nLô ' + line.lot.code,
        fmt(line.requestedQuantity) + ' ' + line.lot.material.unit.symbol + '\n' + (issue.status === 'APPROVED' ? line.issuedQuantity === null ? 'Thiếu số liệu cấp' : 'Đã cấp ' + fmt(line.issuedQuantity) : issue.status === 'REJECTED' ? 'Không cấp' : 'Chưa cấp'),
        statusInfo('issue', issue.status).label + '\n' + (issue.reviewedBy?.name || 'Chưa xử lý') + '\n' + when(issue.approvedAt),
        'Đề nghị: ' + (issue.reason || '—') + '\nPhản hồi: ' + (issue.reviewNote || (issue.status === 'REJECTED' ? 'Phiếu cũ chưa có lý do từ chối' : '—')),
      ])),
    },
    {
      title: '3. Sản lượng và kết quả nghiệm thu',
      columns: ['Lần ghi nhận / người làm', 'Đã làm / đạt / không đạt', 'Trạng thái', 'Người nghiệm thu / ngày', 'Nhận xét'],
      rows: order.runs.map(run => [
        run.id + '\n' + when(run.recordedAt) + '\n' + run.performedBy.name,
        'Đã làm: ' + fmt(run.actualQuantity) + ' ' + unit + '\nĐạt: ' + (run.acceptedQuantity === null ? 'Chưa nghiệm thu' : fmt(run.acceptedQuantity)) + '\nKhông đạt: ' + (run.status === 'PENDING' ? 'Chưa xác định' : fmt(n(run.actualQuantity) - n(run.acceptedQuantity))),
        statusInfo('run', run.status).label,
        (run.inspectedBy?.name || 'Chưa nghiệm thu') + '\n' + when(run.inspectedAt),
        (run.inspectionNote || '—') + (run.productLot ? '\nLô TP: ' + run.productLot.code + '\nHSD: ' + run.productLot.expiryDate.slice(0, 10) : ''),
      ]),
    },
    {
      title: '4. Tiêu hao thực tế theo lần chế biến',
      columns: ['Lần ghi nhận / ngày', 'Nguyên liệu / lô', 'Lượng đã dùng', 'Người ghi nhận'],
      rows: order.runs.flatMap(run => run.consumptions.map(c => {
        const line = issued.find(l => l.id === c.issueLineId);
        return [run.id + '\n' + when(run.recordedAt), line ? line.lot.material.name + '\nLô ' + line.lot.code : 'Dòng cấp ' + c.issueLineId, fmt(c.quantity) + (line ? ' ' + line.lot.material.unit.symbol : ''), run.performedBy.name];
      })),
    },
    { title: '5. Hoàn nguyên liệu dư', columns: ['Phiếu / ngày / người lập', 'Nguyên liệu / lô / số lượng', 'Trạng thái', 'Lý do', 'Người xử lý / ngày'], rows: [...returns.values()] },
    { title: '6. Hao hụt nguyên liệu đã cấp', columns: ['Phiếu / ngày / người lập', 'Nguyên liệu / lô / số lượng', 'Trạng thái', 'Lý do', 'Người xử lý / ngày'], rows: [...wastes.values()] },
    {
      title: '7. Đối chiếu nguyên liệu đã cấp theo lô',
      note: 'Theo số liệu của lệnh. Chưa ghi xử lý = đã cấp − đã dùng − đã hoàn − đã hao hụt − lượng đang chờ duyệt. Không phải kiểm đếm ngoài bếp; lô hết hạn không được dùng dù còn số dư.',
      columns: ['Nguyên liệu / lô / đơn vị', 'Đã cấp / đã dùng', 'Đã hoàn / hao hụt', 'Chờ duyệt hoàn / hao hụt', 'Chưa ghi xử lý'],
      rows: issued.map(line => {
        const b = data.balances.find(b => b.id === line.id);
        return [line.lot.material.name + '\nLô ' + line.lot.code + '\nĐVT: ' + line.lot.material.unit.symbol, fmt(line.issuedQuantity || '0') + ' / ' + fmt(b?.consumed || '0'), fmt(b?.returned || '0') + ' / ' + fmt(b?.wasted || '0'), fmt(b?.pending || '0'), fmt(b?.remaining || '0')];
      }),
    },
  ];
  const document: PrintDocument = {
    tableTitle: '1. Định mức cho lệnh và tiêu hao thực tế',
    title: 'Lệnh chế biến và kết quả thực hiện', reference: order.id, status: statusInfo('order', order.status).label,
    fields: [
      ['Dữ liệu cập nhật đến', when(data.asOf)], ['Thành phẩm', order.bom.product.name], ['Số lượng yêu cầu', fmt(order.quantity) + ' ' + unit],
      ['Người giao', order.assignedBy.name], ['Người nhận', order.assignedTo.name],
      ['Ngày giao', when(order.assignedAt)], ['Hạn hoàn thành', order.dueAt ? when(order.dueAt) : 'Không đặt'],
      ['Công thức', 'Phiên bản ' + order.bom.version + ' · định mức gốc cho ' + fmt(order.bom.outputQuantity) + ' ' + unit],
      ['Đã làm / chờ nghiệm thu', fmt(actual) + ' / ' + fmt(waiting) + ' ' + unit],
      ['Đạt nhập kho / không đạt', fmt(accepted) + ' / ' + fmt(rejected) + ' ' + unit],
    ],
    columns: ['Nguyên liệu', 'Theo công thức cho lệnh', 'Đã ghi sử dụng', 'Đơn vị'],
    rows: [
      ...order.bom.lines.map(l => [l.material.name, fmt(n(l.quantity) * n(order.quantity) / n(order.bom.outputQuantity)), fmt(consumption.get(l.materialId)?.quantity || 0), l.material.unit.symbol]),
      ...[...consumption.entries()].filter(([id]) => !planned.has(id)).map(([, row]) => [row.name + ' (ngoài công thức)', '—', fmt(row.quantity), row.unit]),
    ],
    sections,
    note: 'Bảng đầu đối chiếu định mức và tiêu hao thực tế. Chỉ phiếu cấp/hoàn/hao hụt được duyệt mới ghi sổ. Chỉ sản lượng đạt được nghiệm thu mới tăng kho TP. Lệnh chưa đóng có thể còn phát sinh sau thời điểm in.',
    signatures: ['Người giao lệnh', 'Người thực hiện', 'Người nghiệm thu'],
  };
  return <><p className="footnote">Bản in gồm định mức, cấp NVL và phản hồi, sản lượng, nghiệm thu, tiêu hao, hoàn/hao hụt và số dư theo lệnh tại lúc tải dữ liệu.</p><DocumentTools document={document} disabled={disabled} /></>;
}

