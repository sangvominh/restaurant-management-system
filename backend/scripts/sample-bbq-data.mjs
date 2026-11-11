import { createHash } from 'node:crypto';
import { ROLE_PRESETS } from '../src/admin/role-presets.ts';
import { PERMISSIONS } from '../src/admin/permissions.ts';

// Stable identifiers keep an accidental second import from duplicating stock.
export function sampleId(key) {
  const hex = createHash('sha256').update(`restaurant-bbq-sample-v1:${key}`).digest('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}
export function shiftDay(day, offset) {
  return new Date(Date.parse(`${day}T00:00:00Z`) + offset * 86400000).toISOString().slice(0, 10);
}
export function vietnamToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
const at = (day, time) => new Date(`${day}T${time}:00+07:00`).toISOString();
const q = value => Number(value).toFixed(3);
const price = value => Number(value).toFixed(2);

// Prices, quantities, yields and recipes are fictional test fixtures, in VND.
const materials = [
  ['BRISKET', 'Ức bò nguyên tảng', 'kg', 'Thịt tươi', 12, 410000, 2],
  ['RIBS', 'Sườn heo nguyên tảng', 'kg', 'Thịt tươi', 8, 165000, 2],
  ['PORK', 'Nạc vai heo', 'kg', 'Thịt tươi', 8, 125000, 2],
  ['TURKEY', 'Ức gà tây', 'kg', 'Thịt tươi', 5, 260000, 2],
  ['SAUSAGE', 'Xúc xích sống', 'cay', 'Thịt tươi', 15, 38000, 3],
  ['SALT', 'Muối biển', 'kg', 'Gia vị', 2, 18000, 90],
  ['PEPPER', 'Tiêu đen xay', 'kg', 'Gia vị', 1, 220000, 90],
  ['WOOD', 'Gỗ sồi xông khói', 'kg', 'Nhiên liệu', 20, 25000, null],
  ['SAUCE', 'Sốt BBQ nền', 'lit', 'Gia vị', 3, 95000, 30],
  ['BEANS', 'Đậu khô', 'kg', 'Đồ khô', 3, 65000, 90],
  ['CABBAGE', 'Bắp cải', 'kg', 'Rau củ', 3, 22000, 1],
  ['CARROT', 'Cà rốt', 'kg', 'Rau củ', 2, 28000, 2],
  ['MAYO', 'Mayonnaise', 'kg', 'Sữa và trứng', 2, 85000, 5],
  ['POTATO', 'Khoai tây', 'kg', 'Rau củ', 5, 32000, 5],
  ['CUCUMBER', 'Dưa leo', 'kg', 'Rau củ', 2, 24000, 2],
  ['VINEGAR', 'Giấm táo', 'lit', 'Gia vị', 2, 45000, 90],
  ['SUGAR', 'Đường', 'kg', 'Đồ khô', 3, 25000, 90],
  ['COKE', 'Coca-Cola lon nguyên liệu đóng gói', 'lon', 'Đồ uống đóng gói', 24, 10000, 180],
  ['WATER', 'Nước suối chai nguyên liệu đóng gói', 'chai', 'Đồ uống đóng gói', 24, 5000, 180],
  ['FLOUR', 'Bột bắp', 'kg', 'Đồ khô', 3, 42000, 90],
  ['EGG', 'Trứng gà', 'qua', 'Sữa và trứng', 20, 3500, 7],
  ['MILK', 'Sữa tươi', 'lit', 'Sữa và trứng', 5, 32000, 3],
  ['BUTTER', 'Bơ lạt', 'kg', 'Sữa và trứng', 2, 160000, 7],
  ['BANANA', 'Chuối chín', 'kg', 'Rau củ', 3, 30000, 1],
  ['OLD-RUB', 'Gia vị cũ ngừng sử dụng', 'kg', 'Gia vị', 0, 70000, 90],
];
const menu = [
  ['BRISKET', 'Ức bò hun khói / Brisket', 'kg', 'Thịt hun khói', 980000, 10, { BRISKET: 20, SALT: .3, PEPPER: .3, WOOD: 4 }, 18],
  ['RIBS', 'Sườn heo hun khói', 'kg', 'Thịt hun khói', 690000, 10, { RIBS: 15, SALT: .2, PEPPER: .15, SAUCE: .8, WOOD: 3 }, 12],
  ['PULLED', 'Heo xé hun khói', 'kg', 'Thịt hun khói', 640000, 10, { PORK: 17, SALT: .25, PEPPER: .2, WOOD: 3 }, 10],
  ['TURKEY', 'Ức gà tây hun khói', 'kg', 'Thịt hun khói', 720000, 10, { TURKEY: 14, SALT: .25, PEPPER: .15, WOOD: 2 }, 7],
  ['SAUSAGE', 'Xúc xích hun khói', 'cay', 'Thịt hun khói', 85000, 20, { SAUSAGE: 20, WOOD: 1 }, 40],
  ['BEANS', 'Đậu hầm BBQ', 'phan', 'Món phụ', 35000, 20, { BEANS: 1.5, SAUCE: .5, SALT: .04 }, 50],
  ['SLAW', 'Salad bắp cải', 'phan', 'Món phụ', 30000, 20, { CABBAGE: 2, CARROT: .5, MAYO: .5 }, 40],
  ['POTATO', 'Salad khoai tây', 'phan', 'Món phụ', 35000, 20, { POTATO: 3, MAYO: .5, SALT: .03 }, 45],
  ['PICKLES', 'Dưa chua ăn kèm miễn phí', 'phan', 'Món phụ', 0, 20, { CUCUMBER: 1, VINEGAR: .5, SUGAR: .15 }, 60],
  ['COKE', 'Coca-Cola', 'lon', 'Đồ uống', 25000, 24, { COKE: 24 }, 72],
  ['WATER', 'Nước suối', 'chai', 'Đồ uống', 15000, 24, { WATER: 24 }, 72],
  ['CORN', 'Bánh bắp', 'phan', 'Món phụ', 25000, 20, { FLOUR: 1.2, EGG: 4, MILK: 1, BUTTER: .3, SUGAR: .3 }, 35],
  ['PUDDING', 'Pudding chuối', 'ly', 'Tráng miệng', 45000, 20, { BANANA: 1.8, MILK: 2, SUGAR: .3, FLOUR: .2 }, 30],
  ['BEEF-RIB', 'Sườn bò đặc biệt (tạm ngừng)', 'kg', 'Thịt hun khói', 1250000, 10, { BRISKET: 16, SALT: .2, PEPPER: .2, WOOD: 4 }, 0],
];

export function createSampleData({ date = vietnamToday(), scenario = 'service' } = {}) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(`${date}T00:00:00Z`)) || shiftDay(date, 0) !== date)
    throw new Error('Ngày phải đúng định dạng YYYY-MM-DD và tồn tại.');
  if (!['service', 'sold-out'].includes(scenario)) throw new Error('Scenario phải là service hoặc sold-out.');
  const rows = {};
  function add(table, key, fields) {
    const row = { id: sampleId(`${table}:${key}`), ...fields };
    (rows[table] ??= []).push(row);
    return row;
  }
  const employee = key => sampleId(`Employee:${key}`);
  const product = key => sampleId(`Product:${key}`);
  const material = key => sampleId(`Material:${key}`);
  const unit = key => sampleId(`Unit:${key}`);
  const category = (name, objectType) => {
    const id = sampleId(`Category:${objectType}:${name}`);
    if (!rows.Category?.some(row => row.id === id)) add('Category', `${objectType}:${name}`, { name: `[BBQ mẫu] ${name}`, objectType });
    return id;
  };
  for (const [symbol, name] of [['kg', 'Kilôgam'], ['lit', 'Lít'], ['cay', 'Cây'], ['phan', 'Phần'], ['lon', 'Lon'], ['chai', 'Chai'], ['qua', 'Quả'], ['ly', 'Ly']]) add('Unit', symbol, { name, symbol });
  for (const p of PERMISSIONS) add('Permission', p.code, { code: p.code, name: p.name });
  for (const preset of ROLE_PRESETS) {
    const role = add('Role', preset.id, { name: `[BBQ mẫu] ${preset.name}`, description: preset.description });
    for (const code of preset.permissions) {
      (rows.RolePermission ??= []).push({ roleId: role.id, permissionId: sampleId(`Permission:${code}`) });
    }
  }
  const people = [
    ['admin', 'system-admin', 'Quản trị dữ liệu mẫu'],
    ['kho', 'warehouse-manager', 'Nguyễn Minh Kho'],
    ['nvkho', 'warehouse-staff', 'Trần Thảo Giao Nhận'],
    ['beptruong', 'head-chef', 'Lê Hoàng Trưởng Bếp'],
    ['bep', 'cook', 'Phạm Anh Thợ Lò'],
    ['quanly', 'restaurant-manager', 'Võ Thanh Quản Lý'],
    ['phucvu', 'waiter', 'Đặng Ngọc Phục Vụ'],
    ['thungan', 'cashier', 'Bùi Thu Ngân'],
    ['nghiviec', 'waiter', 'Nhân viên ngừng hoạt động'],
  ];
  for (const [key, role, name] of people) {
    const account = add('Account', key, { username: `bbq_${key}`, passwordHash: '__SAMPLE_PASSWORD_HASH__', status: key === 'nghiviec' ? 'INACTIVE' : 'ACTIVE', createdAt: at(shiftDay(date, -15), '08:00'), roleId: sampleId(`Role:${role}`) });
    add('Employee', key, { code: `BBQ-NV-${key.toUpperCase()}`, name, email: `${key}@bbq.example.test`, status: account.status, accountId: account.id });
  }
  for (const [key, name, symbol, group, minimum] of materials) add('Material', key, { code: `BBQ-NVL-${key}`, name, unitId: unit(symbol), categoryId: category(group, 'MATERIAL'), minStock: q(minimum), status: key === 'OLD-RUB' ? 'INACTIVE' : 'ACTIVE' });
  for (const [key, name, symbol, group, sellingPrice, outputQuantity, recipe, quantity] of menu) {
    add('Product', key, { code: `BBQ-TP-${key}`, name, sellingPrice: price(sellingPrice), unitId: unit(symbol), categoryId: category(group, 'PRODUCT'), status: quantity ? 'ACTIVE' : 'INACTIVE' });
    const bom = add('Bom', key, { version: 1, outputQuantity: q(outputQuantity), effectiveAt: at(shiftDay(date, -20), '00:00'), status: quantity ? 'ACTIVE' : 'DRAFT', productId: product(key), createdById: employee('beptruong') });
    for (const [m, amount] of Object.entries(recipe)) add('BomLine', `${key}:${m}`, { bomId: bom.id, materialId: material(m), quantity: q(amount) });
  }
  const newBom = add('Bom', 'BRISKET-v2', { version: 2, outputQuantity: '10.000', effectiveAt: at(shiftDay(date, 1), '00:00'), status: 'DRAFT', productId: product('BRISKET'), createdById: employee('beptruong') });
  for (const [key, amount] of Object.entries({ BRISKET: 19.5, SALT: .28, PEPPER: .3, WOOD: 4 })) add('BomLine', `BRISKET-v2:${key}`, { bomId: newBom.id, materialId: material(key), quantity: q(amount) });
  for (const [key, name] of [['MEAT', 'Thịt sạch mẫu'], ['FRESH', 'Nông trại rau sữa mẫu'], ['DRY', 'Đồ khô và nhiên liệu mẫu'], ['DRINK', 'Đồ uống mẫu']]) add('Supplier', key, { code: `BBQ-NCC-${key}`, name: `${name} (hư cấu)`, address: 'Địa chỉ mô phỏng, TP.HCM', status: 'ACTIVE' });
  add('Supplier', 'OLD', { code: 'BBQ-NCC-OLD', name: 'Nhà cung cấp đã ngừng hợp tác (hư cấu)', status: 'INACTIVE' });
  const areaName = key => `[BBQ mẫu] ${key}`;
  for (const [name, color] of [['Trong nhà', '#9a5b35'], ['Sân ngoài', '#427b56'], ['Quầy nhận hàng', '#42688b']]) {
    (rows.DiningArea ??= []).push({ name: areaName(name), columns: 6, rows: 3, color });
    for (let n = 1; n <= (name === 'Quầy nhận hàng' ? 2 : 6); n++) add('DiningTable', `${name}:${n}`, { name: `BBQ-${name === 'Trong nhà' ? 'A' : name === 'Sân ngoài' ? 'B' : 'Q'}${String(n).padStart(2, '0')}`, area: areaName(name), x: (n - 1) % 6, y: 0, status: name === 'Sân ngoài' && n === 6 ? 'INACTIVE' : 'ACTIVE' });
  }

  const activeMenu = menu.filter(m => m[7] > 0);
  const warehouse = new Map(activeMenu.map(m => [m[0], 0]));
  const store = new Map(activeMenu.map(m => [m[0], 0]));
  function productMove(key, amount, type, time, source) {
    add('ProductMovement', `${type}:${Object.values(source)[0]}`, { productId: product(key), quantity: q(amount), movementType: type, postedAt: time, ...source });
    warehouse.set(key, Number(q(warehouse.get(key) + (['NHAP_SAN_XUAT', 'HOAN_CUA_HANG'].includes(type) ? amount : -amount))));
  }
  function storeMove(key, amount, type, time, source) {
    add('StoreMovement', `${type}:${Object.values(source)[0]}`, { productId: product(key), quantity: q(amount), movementType: type, postedAt: time, ...source });
    store.set(key, Number(q(store.get(key) + (type === 'IN_TRANSFER' ? amount : -amount))));
  }
  function materialMove(key, lotId, amount, fromSource, toSource, time, source) {
    add('MaterialMovement', key, { lotId, quantity: q(amount), fromSource, toSource, postedAt: time, ...source });
  }
  function receipt(day, amounts, suffix = 'CHINH', status = 'POSTED', expiryOverride) {
    const lots = {};
    const docs = {};
    for (const [key, amount] of Object.entries(amounts)) {
      if (amount <= 0) continue;
      const m = materials.find(m => m[0] === key);
      const supplierKey = m[3] === 'Thịt tươi' ? 'MEAT' : ['Rau củ', 'Sữa và trứng'].includes(m[3]) ? 'FRESH' : m[3] === 'Đồ uống đóng gói' ? 'DRINK' : 'DRY';
      const time = at(shiftDay(day, -1), '16:00');
      docs[supplierKey] ??= add('MaterialReceipt', `${day}:${suffix}:${supplierKey}`, { code: `BBQ-PN-${day.replaceAll('-', '')}-${suffix}-${supplierKey}`, receivedAt: time, status, note: 'Nhập theo kế hoạch mẻ bán ngày ' + day, supplierId: sampleId(`Supplier:${supplierKey}`), createdById: employee('nvkho') });
      const lot = add('MaterialLot', `${day}:${suffix}:${key}`, { code: `BBQ-LO-${day}-${suffix}-${key}`, materialId: material(key), expiryDate: expiryOverride === undefined ? m[6] === null ? null : shiftDay(day, m[6]) : expiryOverride });
      lots[key] = lot.id;
      const line = add('MaterialReceiptLine', `${day}:${suffix}:${key}`, { receiptId: docs[supplierKey].id, lotId: lot.id, quantity: q(amount), unitPrice: price(m[5]) });
      if (status === 'POSTED') materialMove(`receipt:${line.id}`, lot.id, amount, 'BEN_NGOAI', 'TRONG_KHO', time, { receiptLineId: line.id });
    }
    return lots;
  }
  function dispatch(key, day, amounts, status = 'APPROVED', time = '10:15') {
    const doc = add('StoreDispatch', key, { requestedAt: at(day, time), approvedAt: status === 'PENDING' ? null : at(day, time), status, reason: status === 'PENDING' ? 'Chuyển thêm từ mẻ đã chuẩn bị, không nấu theo đơn' : 'Bàn giao mẻ đã nghiệm thu trước giờ mở cửa', requestedById: employee('nvkho'), reviewedById: status === 'PENDING' ? null : employee('kho') });
    for (const [p, amount] of Object.entries(amounts)) {
      if (amount <= 0) continue;
      const line = add('StoreDispatchLine', `${key}:${p}`, { dispatchId: doc.id, productId: product(p), quantity: q(amount) });
      if (status === 'APPROVED') {
        productMove(p, amount, 'CHUYEN_CUA_HANG', at(day, time), { dispatchLineId: line.id });
        storeMove(p, amount, 'IN_TRANSFER', at(day, time), { dispatchLineId: line.id });
      }
    }
    return doc;
  }
  function adjustment(key, p, amount, kind, status, day, time, reason) {
    const doc = add('StoreAdjustment', key, { productId: product(p), quantity: q(amount), kind, status, reason, requestedAt: at(day, time), approvedAt: status === 'PENDING' ? null : at(day, time), requestedById: employee('quanly'), reviewedById: status === 'PENDING' ? null : employee('kho') });
    if (status === 'APPROVED') {
      storeMove(p, amount, kind, at(day, time), { adjustmentId: doc.id });
      if (kind === 'RETURN') productMove(p, amount, 'HOAN_CUA_HANG', at(day, time), { storeAdjustmentId: doc.id });
    }
    return doc;
  }
  function sale(key, day, time, amounts, { status = 'COMPLETED', table, served = true, oldPrice = false, method = 'CASH', note = '' } = {}) {
    const dateTime = at(day, time);
    const close = new Date(Date.parse(dateTime) + 15 * 60000).toISOString();
    const doc = add('Sale', key, { code: `BBQ-${day.replaceAll('-', '')}-${key}`, createdAt: dateTime, status, version: status === 'DRAFT' ? 0 : status === 'COMPLETED' ? 3 : 1, tableId: table ? sampleId(`DiningTable:Trong nhà:${table}`) : null, createdById: employee('phucvu'), closedAt: status === 'COMPLETED' ? close : null, closedById: status === 'COMPLETED' ? employee('thungan') : null });
    let total = 0;
    for (const [p, amount] of Object.entries(amounts)) {
      if (amount <= 0) continue;
      const item = menu.find(m => m[0] === p);
      const unitPrice = oldPrice && p === 'BRISKET' ? 920000 : item[4];
      const line = add('SaleLine', `${key}:${p}`, { saleId: doc.id, productId: product(p), productName: oldPrice && p === 'BRISKET' ? 'Brisket hun khói (tên thực đơn cũ)' : item[1], quantity: q(amount), unitPrice: price(unitPrice), note, sentAt: status === 'DRAFT' ? null : dateTime, sentById: status === 'DRAFT' ? null : employee('phucvu'), batch: status === 'DRAFT' ? null : 1 });
      total += Math.round(amount * unitPrice * 100);
      if (served && status !== 'DRAFT') add('Serving', line.id, { saleLineId: line.id, quantity: q(amount), servedAt: new Date(Date.parse(dateTime) + 5 * 60000).toISOString(), servedById: employee('phucvu') });
      if (status === 'COMPLETED') storeMove(p, amount, 'SALE', close, { saleLineId: line.id });
    }
    if (status === 'COMPLETED') add('Payment', key, { saleId: doc.id, amount: price(total / 100), method, status: 'PAID', paidAt: close, receivedById: employee('thungan') });
    return doc;
  }
  const history = [];
  for (let offset = -10; offset < 0; offset++) {
    const day = shiftDay(date, offset);
    if (new Date(`${day}T00:00:00Z`).getUTCDay() !== 1) history.push(day);
  }
  const days = [...history.slice(-6), date];
  let currentLots;
  for (const [index, day] of days.entries()) {
    const current = day === date;
    const quantities = Object.fromEntries(activeMenu.map(m => [m[0], m[2] === 'kg' ? Number(q(m[7] * (current ? 1 : 1 + (index % 3) * .1))) : Math.round(m[7] * (current ? 1 : 1 + (index % 3) * .1))]));
    const needs = {};
    for (const item of activeMenu) for (const [m, amount] of Object.entries(item[6])) needs[m] = Number(q((needs[m] || 0) + Number(q(amount * quantities[item[0]] / item[5]))));
    // One closed batch demonstrates surplus returned and waste approved separately.
    if (index === 0) needs.SALT = Number(q(needs.SALT + .2));
    if (current) for (const m of materials.filter(m => m[0] !== 'OLD-RUB')) needs[m[0]] = Number(q((needs[m[0]] || 0) + (m[0] === 'TURKEY' ? .2 : m[0] === 'SAUSAGE' ? 20 : m[4] * 2)));
    const lots = receipt(day, needs);
    if (current) currentLots = lots;
    for (const item of activeMenu) {
      const [p, , , , , output, recipe] = item;
      const order = add('ProductionOrder', `${day}:${p}`, { quantity: q(quantities[p]), assignedAt: at(shiftDay(day, -1), '18:00'), dueAt: at(day, '10:00'), status: 'COMPLETED', bomId: sampleId(`Bom:${p}`), assignedById: employee('beptruong'), assignedToId: employee('bep') });
      const issue = add('MaterialIssue', order.id, { productionOrderId: order.id, requestedAt: at(shiftDay(day, -1), '18:10'), approvedAt: at(shiftDay(day, -1), '18:15'), status: 'APPROVED', reason: 'Cấp cho mẻ kế hoạch; thịt hun khói chuẩn bị từ tối hôm trước', requestedById: employee('bep'), reviewedById: employee('kho') });
      const accepted = p === 'BRISKET' ? quantities[p] - .5 : quantities[p];
      const run = add('ProductionRun', order.id, { productionOrderId: order.id, recordedAt: at(day, '09:00'), actualQuantity: q(quantities[p]), acceptedQuantity: q(accepted), status: 'INSPECTED', inspectedAt: at(day, '09:30'), inspectionNote: p === 'BRISKET' ? 'Loại 0,5 kg phần khô; chỉ nhập lượng đạt. Không hủy kho lần hai.' : ['COKE', 'WATER'].includes(p) ? 'Soạn lô đồ uống đóng gói qua BOM 1:1; không phải nấu đồ uống' : 'Mẻ đạt kiểm tra chất lượng mô phỏng', performedById: employee('bep'), inspectedById: employee('beptruong') });
      for (const [m, amount] of Object.entries(recipe)) {
        const used = Number(q(amount * quantities[p] / output));
        const extra = index === 0 && p === 'BRISKET' && m === 'SALT' ? .2 : 0;
        const line = add('MaterialIssueLine', `${order.id}:${m}`, { issueId: issue.id, lotId: lots[m], requestedQuantity: q(used + extra), issuedQuantity: q(used + extra) });
        materialMove(`issue:${line.id}`, lots[m], used + extra, 'TRONG_KHO', 'DA_CAP', issue.approvedAt, { issueLineId: line.id });
        const consumed = add('ConsumptionLine', `${run.id}:${m}`, { runId: run.id, issueLineId: line.id, quantity: q(used) });
        materialMove(`consume:${consumed.id}`, lots[m], used, 'DA_CAP', 'DA_SU_DUNG', run.recordedAt, { consumptionLineId: consumed.id });
        if (extra) {
          const returned = add('MaterialReturn', line.id, { reason: 'Hoàn muối chưa dùng, giữ khô sạch', status: 'APPROVED', requestedAt: at(day, '09:05'), approvedAt: at(day, '09:15'), requestedById: employee('bep'), reviewedById: employee('kho') });
          const returnedLine = add('MaterialReturnLine', line.id, { returnId: returned.id, issueLineId: line.id, quantity: '.150' });
          materialMove(`return:${returnedLine.id}`, lots[m], .15, 'DA_CAP', 'TRONG_KHO', returned.approvedAt, { returnLineId: returnedLine.id });
          const waste = add('Waste', line.id, { reason: 'Muối rơi khi cân, không đưa lại vào thực phẩm', status: 'APPROVED', reportedAt: at(day, '09:05'), approvedAt: at(day, '09:15'), reportedById: employee('bep'), reviewedById: employee('kho') });
          const wasteLine = add('WasteLine', line.id, { wasteId: waste.id, sourceType: 'DA_CAP', issueLineId: line.id, quantity: '.050' });
          materialMove(`waste:${wasteLine.id}`, lots[m], .05, 'DA_CAP', 'DA_HUY', waste.approvedAt, { wasteLineId: wasteLine.id });
        }
      }
      productMove(p, accepted, 'NHAP_SAN_XUAT', run.inspectedAt, { runId: run.id });
    }
    const reserve = current ? { BRISKET: 2.5, TURKEY: 1, COKE: 12, WATER: 12 } : {};
    dispatch(`${day}:OPEN`, day, Object.fromEntries(activeMenu.map(m => [m[0], quantities[m[0]] - (m[0] === 'BRISKET' ? .5 : 0) - (reserve[m[0]] || 0)])));
    // A rainy historical day has waste; sealed drinks return to the warehouse.
    if (index === 4) {
      adjustment('RAIN-SLAW', 'SLAW', 2, 'WASTE', 'APPROVED', day, '13:40', 'Ngày mưa bán chậm; salad không đạt kiểm tra cuối ca');
      adjustment('SEALED-COKE', 'COKE', 6, 'RETURN', 'APPROVED', day, '13:40', 'Lon còn nguyên niêm phong, kiểm tra chất lượng trước khi hoàn');
    }
    const currentRemainder = { BRISKET: 0, RIBS: .75, PULLED: 3, TURKEY: 1, SAUSAGE: 6, BEANS: 5, SLAW: 4, POTATO: 3, PICKLES: 10, COKE: 10, WATER: 15, CORN: 0, PUDDING: 0 };
    const salesTotal = Object.fromEntries(activeMenu.map(m => [m[0], store.get(m[0]) - (current ? currentRemainder[m[0]] : 0)]));
    const sold = Object.fromEntries(activeMenu.map(m => [m[0], 0]));
    for (let n = 0; n < 8; n++) {
      const amounts = {};
      for (const m of activeMenu) {
        const cumulative = n === 7 ? salesTotal[m[0]] : m[2] === 'kg' ? Number(q(salesTotal[m[0]] * (n + 1) / 8)) : Math.floor(salesTotal[m[0]] * (n + 1) / 8);
        amounts[m[0]] = Number(q(cumulative - sold[m[0]]));
        sold[m[0]] = cumulative;
      }
      sale(`${current ? 'NOW' : `D${index + 1}`}-${String(n + 1).padStart(2, '0')}`, day, current ? `11:${String(n * 8).padStart(2, '0')}` : `${11 + Math.floor(n / 3)}:${String((n % 3) * 18).padStart(2, '0')}`, amounts, { method: n % 2 ? 'TRANSFER' : 'CASH', oldPrice: !current, table: n < 3 ? n + 1 : undefined, note: n === 7 ? 'Nhóm cuối nhận lượng mẻ còn lại; không chế biến theo đơn' : n % 2 ? 'Mang về, chia hộp riêng món phụ' : 'Ăn tại chỗ, cắt thịt tại quầy' });
    }
  }

  const ready = sale('CHO-THU', date, '12:25', { RIBS: .5, SAUSAGE: 2, BEANS: 2, COKE: 2 }, { status: 'CONFIRMED', table: 1, note: 'Đã phục vụ đủ, chờ thu tiền' });
  const partial = sale('DANG-PHUC-VU', date, '12:29', { PULLED: .5, TURKEY: .5, WATER: 3, POTATO: 1, PICKLES: 2, SLAW: 1 }, { status: 'CONFIRMED', table: 2, served: false, note: 'Giữ phần đã có; chỉ mang ra một phần' });
  const lineFor = (saleId, p) => rows.SaleLine.find(l => l.saleId === saleId && l.productId === product(p));
  for (const [p, amount] of [['PULLED', .25], ['WATER', 1]]) add('Serving', `partial:${p}`, { saleLineId: lineFor(partial.id, p).id, quantity: q(amount), servedAt: at(date, '12:35'), servedById: employee('phucvu') });
  for (const p of ['POTATO', 'PICKLES', 'SLAW']) Object.assign(lineFor(partial.id, p), { batch: 2, sentAt: at(date, '12:32') });
  sale('THIEU-HANG', date, '12:36', { RIBS: 1, WATER: 1 }, { status: 'DRAFT', table: 3, served: false, note: 'Nháp chưa giữ hàng: 1 kg sườn vượt lượng còn nhận mới 0,25 kg' });
  const swapped = add('SaleLine', 'swapped-brisket', { saleId: ready.id, productId: product('BRISKET'), productName: menu[0][1], quantity: '0.000', unitPrice: '980000.00', note: 'Dòng giữ lịch sử đổi món', sentAt: at(date, '11:17'), sentById: employee('phucvu'), batch: 1 });
  // SaleLineChange.quantity is the amount removed, not the final quantity.
  add('SaleLineChange', 'swap', { saleLineId: swapped.id, previousQuantity: '.250', quantity: '.250', replacementLineId: lineFor(ready.id, 'RIBS').id, changedById: employee('phucvu'), changedAt: at(date, '11:20'), reason: 'Khách đổi 0,25 kg brisket chưa ra sang 0,5 kg sườn còn sẵn' });
  for (const p of ['SAUSAGE', 'BEANS', 'COKE']) lineFor(ready.id, p).batch = 3;
  Object.assign(lineFor(ready.id, 'RIBS'), { batch: 2, sentAt: at(date, '11:20') });
  ready.createdAt = at(date, '11:17');
  ready.version = 4;
  const cancelled = sale('HUY-KHACH-ROI', date, '12:15', { SAUSAGE: 1 }, { status: 'CONFIRMED', served: false });
  cancelled.status = 'CANCELLED'; cancelled.closedAt = at(date, '12:20'); cancelled.closedById = employee('phucvu'); cancelled.version = 2;
  const cancelledLine = lineFor(cancelled.id, 'SAUSAGE');
  cancelledLine.quantity = '0.000';
  add('SaleLineChange', 'cancel', { saleLineId: cancelledLine.id, previousQuantity: '1.000', quantity: '1.000', reason: 'Khách rời hàng chờ trước khi nhận món', changedById: employee('phucvu'), changedAt: cancelled.closedAt });
  adjustment('HOLD-BEANS', 'BEANS', 1, 'WASTE', 'PENDING', date, '12:36', 'Tách phần bị đổ, chờ kho duyệt; tạm ngừng bán lượng này');
  adjustment('HOLD-SLAW', 'SLAW', 1, 'WASTE', 'PENDING', date, '12:36', 'Salad cần kiểm tra chất lượng, cách ly khỏi phần còn bán');
  adjustment('HOLD-COKE', 'COKE', 2, 'RETURN', 'PENDING', date, '12:37', 'Lon nguyên niêm phong đề nghị hoàn kho');
  adjustment('REJECT-RIBS', 'RIBS', .1, 'RETURN', 'REJECTED', date, '12:38', 'Từ chối hoàn vì chưa đủ thông tin chất lượng; chưa ghi sổ');
  dispatch('TRANSFER-PENDING', date, { BRISKET: 1 }, 'PENDING', '12:38');
  dispatch('TRANSFER-REJECTED', date, { TURKEY: .5 }, 'REJECTED', '12:39');

  // Open work is planned independently of sales: tomorrow or awaiting QC today.
  for (const [p, status, quantity] of [['BRISKET', 'NEW', 20], ['TURKEY', 'RECEIVED', 8], ['SAUSAGE', 'IN_PROGRESS', 20]]) {
    const order = add('ProductionOrder', `NEXT:${p}`, { quantity: q(quantity), status, assignedAt: p === 'SAUSAGE' ? at(shiftDay(date, -1), '18:30') : at(date, '12:30'), dueAt: at(p === 'SAUSAGE' ? date : shiftDay(date, 1), '10:00'), bomId: sampleId(`Bom:${p}`), assignedById: employee('beptruong'), assignedToId: employee('bep') });
    if (p === 'TURKEY') add('MaterialShortage', 'NEXT:TURKEY', { productionOrderId: order.id, materialId: material('TURKEY'), quantity: '5.000', reason: 'Thiếu nguyên liệu cho mẻ kế hoạch ngày mai; không hẹn khách chờ nấu', status: 'PENDING', requestedAt: at(date, '12:34'), updatedAt: at(date, '12:34'), requestedById: employee('bep') });
    if (p === 'SAUSAGE') {
      const issue = add('MaterialIssue', 'NEXT:SAUSAGE', { productionOrderId: order.id, status: 'APPROVED', requestedAt: at(shiftDay(date, -1), '18:35'), approvedAt: at(shiftDay(date, -1), '18:40'), reason: 'Mẻ theo kế hoạch từ tối trước, chưa nhập kho khi chưa nghiệm thu', requestedById: employee('bep'), reviewedById: employee('kho') });
      const run = add('ProductionRun', 'NEXT:SAUSAGE', { productionOrderId: order.id, actualQuantity: '10.000', status: 'PENDING', recordedAt: at(date, '09:10'), performedById: employee('bep') });
      for (const [m, issued, used] of [['SAUSAGE', 20, 10], ['WOOD', 1, .5]]) {
        const line = add('MaterialIssueLine', `NEXT:${m}`, { issueId: issue.id, lotId: currentLots[m], requestedQuantity: q(issued), issuedQuantity: q(issued) });
        materialMove(`issue:${line.id}`, line.lotId, issued, 'TRONG_KHO', 'DA_CAP', issue.approvedAt, { issueLineId: line.id });
        const consumption = add('ConsumptionLine', `NEXT:${m}`, { runId: run.id, issueLineId: line.id, quantity: q(used) });
        materialMove(`consume:${consumption.id}`, line.lotId, used, 'DA_CAP', 'DA_SU_DUNG', run.recordedAt, { consumptionLineId: consumption.id });
      }
    }
  }
  receipt(date, { BRISKET: 5, TURKEY: 3 }, 'NHAP', 'DRAFT');
  receipt(shiftDay(date, -5), { MILK: 2 }, 'HET-HAN', 'POSTED', shiftDay(date, -1));
  receipt(date, { CABBAGE: 1 }, 'CAN-HAN', 'POSTED', date);
  // Expired lot is retained with stock for expiry alerts, never issued to food.
  const expiredLot = receipt(shiftDay(date, -6), { BANANA: 1 }, 'HUY-HET-HAN', 'POSTED', shiftDay(date, -2)).BANANA;
  const expiredWaste = add('Waste', 'EXPIRED-LOT', { reason: 'Hủy chuối hết hạn tại kho', status: 'APPROVED', reportedAt: at(date, '08:00'), approvedAt: at(date, '08:10'), reportedById: employee('nvkho'), reviewedById: employee('kho') });
  const expiredWasteLine = add('WasteLine', 'EXPIRED-LOT', { wasteId: expiredWaste.id, lotId: expiredLot, sourceType: 'TRONG_KHO', quantity: '1.000' });
  materialMove('expired-waste', expiredLot, 1, 'TRONG_KHO', 'DA_HUY', expiredWaste.approvedAt, { wasteLineId: expiredWasteLine.id });

  if (scenario === 'sold-out') {
    // Settle reservations before selling the remainder of the finite daily batch.
    for (const doc of rows.StoreDispatch.filter(d => d.status === 'PENDING')) { doc.status = 'REJECTED'; doc.approvedAt = at(date, '13:00'); doc.reviewedById = employee('kho'); }
    for (const doc of rows.StoreAdjustment.filter(a => a.status === 'PENDING')) {
      doc.status = 'APPROVED'; doc.approvedAt = at(date, '13:00'); doc.reviewedById = employee('kho');
      const p = activeMenu.find(m => product(m[0]) === doc.productId)[0];
      storeMove(p, Number(doc.quantity), doc.kind, doc.approvedAt, { adjustmentId: doc.id });
      if (doc.kind === 'RETURN') productMove(p, Number(doc.quantity), 'HOAN_CUA_HANG', doc.approvedAt, { storeAdjustmentId: doc.id });
    }
    for (const doc of rows.Sale.filter(s => s.status === 'DRAFT' || s.status === 'CONFIRMED')) {
      if (doc.status === 'DRAFT') {
        doc.status = 'CANCELLED'; doc.closedAt = at(date, '13:05'); doc.closedById = employee('phucvu'); doc.version++;
        for (const line of rows.SaleLine.filter(l => l.saleId === doc.id)) {
          add('SaleLineChange', `CLOSE:${line.id}`, { saleLineId: line.id, previousQuantity: line.quantity, quantity: line.quantity, reason: 'Khách không chọn món thay thế; đóng nháp cuối ca', changedAt: doc.closedAt, changedById: employee('phucvu') });
          line.quantity = '0.000';
        }
        continue;
      }
      let cents = 0;
      for (const line of rows.SaleLine.filter(l => l.saleId === doc.id && Number(l.quantity) > 0)) {
        const p = activeMenu.find(m => product(m[0]) === line.productId)[0];
        const served = rows.Serving.filter(s => s.saleLineId === line.id).reduce((sum, s) => sum + Number(s.quantity), 0);
        if (Number(q(Number(line.quantity) - served)) > 0) add('Serving', `CLOSE:${line.id}`, { saleLineId: line.id, quantity: q(Number(line.quantity) - served), servedAt: at(date, '13:05'), servedById: employee('phucvu') });
        storeMove(p, Number(line.quantity), 'SALE', at(date, '13:10'), { saleLineId: line.id });
        cents += Math.round(Number(line.quantity) * Number(line.unitPrice) * 100);
      }
      add('Payment', `CLOSE:${doc.id}`, { saleId: doc.id, amount: price(cents / 100), method: 'TRANSFER', status: 'PAID', paidAt: at(date, '13:10'), receivedById: employee('thungan') });
      Object.assign(doc, { status: 'COMPLETED', closedAt: at(date, '13:10'), closedById: employee('thungan'), version: doc.version + 1 });
    }
    dispatch('LAST-TRANSFER', date, Object.fromEntries(warehouse), 'APPROVED', '13:15');
    sale('KHACH-CUOI', date, '13:25', Object.fromEntries(store), { method: 'TRANSFER', note: 'Bán toàn bộ phần đạt còn lại. Hết mẻ hôm nay; không nhận đơn chờ nấu.' });
  }
  return { version: 1, date, scenario, snapshotAt: at(date, scenario === 'service' ? '12:40' : '14:00'), historyDays: days.slice(0, -1), rows };
}

// Parent tables precede children; no legacy per-sale exports/replenishments.
export const INSERT_ORDER = ['Unit', 'Permission', 'Role', 'RolePermission', 'Account', 'Employee', 'Category', 'Material', 'Product', 'Supplier', 'DiningArea', 'DiningTable', 'MaterialLot', 'MaterialReceipt', 'MaterialReceiptLine', 'Bom', 'BomLine', 'ProductionOrder', 'MaterialIssue', 'MaterialIssueLine', 'ProductionRun', 'ConsumptionLine', 'MaterialReturn', 'MaterialReturnLine', 'Waste', 'WasteLine', 'MaterialMovement', 'StoreDispatch', 'StoreDispatchLine', 'StoreAdjustment', 'Sale', 'SaleLine', 'SaleLineChange', 'Serving', 'Payment', 'ProductMovement', 'StoreMovement', 'MaterialShortage'];

export function sampleSummary(data) {
  return data.rows.Product.filter(p => p.status === 'ACTIVE').map(p => {
    const sum = (table, predicate) => (data.rows[table] || []).filter(predicate).reduce((s, row) => s + Number(row.quantity), 0);
    const warehouse = sum('ProductMovement', m => m.productId === p.id && ['NHAP_SAN_XUAT', 'HOAN_CUA_HANG'].includes(m.movementType)) - sum('ProductMovement', m => m.productId === p.id && !['NHAP_SAN_XUAT', 'HOAN_CUA_HANG'].includes(m.movementType));
    const stock = sum('StoreMovement', m => m.productId === p.id && m.movementType === 'IN_TRANSFER') - sum('StoreMovement', m => m.productId === p.id && m.movementType !== 'IN_TRANSFER');
    const reserved = sum('SaleLine', l => l.productId === p.id && l.sentAt && data.rows.Sale.some(s => s.id === l.saleId && s.status === 'CONFIRMED'));
    const held = sum('StoreAdjustment', a => a.productId === p.id && a.status === 'PENDING');
    return { code: p.code, warehouse: q(warehouse), stock: q(stock), reserved: q(reserved), held: q(held), available: q(stock - reserved - held) };
  });
}
