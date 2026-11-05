export const screens = [
  {
    id: "login",
    label: "Đăng nhập nhân viên",
    short: "Đăng nhập",
    icon: "badge",
  },
  {
    id: "dashboard",
    label: "Tổng quan ca làm",
    short: "Trang chủ",
    icon: "home",
  },
  {
    id: "tables",
    label: "Quản lý sơ đồ bàn",
    short: "Sơ đồ bàn",
    icon: "grid_view",
  },
  {
    id: "order",
    label: "Gọi món · Thực đơn",
    short: "Gọi món",
    icon: "restaurant_menu",
  },
  {
    id: "kitchen",
    label: "Quản lý bếp KDS",
    short: "Bếp KDS",
    icon: "skillet",
  },
  {
    id: "payment",
    label: "Thanh toán hóa đơn",
    short: "Thanh toán",
    icon: "payments",
  },
  {
    id: "shift",
    label: "Ca làm việc cá nhân",
    short: "Ca làm",
    icon: "schedule",
  },
  {
    id: "order-detail",
    label: "Chi tiết đơn · Tiến độ món",
    short: "Chi tiết đơn",
    icon: "receipt_long",
  },
  {
    id: "transfer",
    label: "Chuyển / Gộp bàn",
    short: "Chuyển bàn",
    icon: "swap_horiz",
  },
  {
    id: "split",
    label: "Tách hóa đơn",
    short: "Tách hóa đơn",
    icon: "call_split",
  },
  {
    id: "cancel",
    label: "Yêu cầu hủy / Đổi món",
    short: "Hủy / Đổi món",
    icon: "edit_note",
  },
] as const;
export const menu = [
  {
    id: "pho-tai",
    name: "Phở Tái Nạm Gầu",
    category: "Phở bò",
    description: "Bò tái mềm, nạm giòn, gầu béo ngậy chuẩn vị Phố Cổ",
    price: 75000,
    emoji: "🍜",
    popular: true,
    available: true,
  },
  {
    id: "pho-vang",
    name: "Phở Bò Sốt Vang",
    category: "Phở bò",
    description: "Bò gân hầm vang đỏ, quế hồi thơm ngậy",
    price: 85000,
    emoji: "🍲",
    popular: false,
    available: true,
  },
  {
    id: "pho-ga",
    name: "Phở Gà Đùi Chặt",
    category: "Phở gà",
    description: "Gà ta da vàng, nước dùng trong thanh ngọt",
    price: 70000,
    emoji: "🍜",
    popular: false,
    available: true,
  },
  {
    id: "quay",
    name: "Quẩy Giòn Phố Cổ",
    category: "Ăn kèm",
    description: "Giòn rụm, nóng hổi · Đĩa 3 chiếc",
    price: 15000,
    emoji: "🥖",
    popular: false,
    available: true,
  },
  {
    id: "tra",
    name: "Trà Đá Hoa Lài",
    category: "Đồ uống",
    description: "Hương lài thanh mát · Thêm ít đá theo yêu cầu",
    price: 5000,
    emoji: "🧊",
    popular: false,
    available: true,
  },
  {
    id: "bap-bo",
    name: "Bắp Bò Trứng Non",
    category: "Ăn kèm",
    description: "Bắp hoa chần tái, trứng non béo bùi",
    price: 95000,
    emoji: "🥘",
    popular: false,
    available: false,
  },
];
export type PreviewTable = {
  number: string;
  state: "serving" | "checkout" | "empty" | "dirty" | "reserved";
  guests: number;
  capacity: number;
  time: string;
  total: number;
  note: string;
};
export const tables: PreviewTable[] = [
  {
    number: "01",
    state: "serving",
    guests: 4,
    capacity: 6,
    time: "42′",
    total: 485000,
    note: "2 món chờ bếp · 1× Cá kho tộ, 1× Canh cua",
  },
  {
    number: "04",
    state: "checkout",
    guests: 4,
    capacity: 6,
    time: "1h 15′",
    total: 285000,
    note: "Khách yêu cầu tính tiền · 3 phút trước",
  },
  {
    number: "02",
    state: "empty",
    guests: 0,
    capacity: 6,
    time: "",
    total: 0,
    note: "Bàn đã sẵn sàng đón khách. Đầy đủ dụng cụ và gia vị.",
  },
  {
    number: "03",
    state: "dirty",
    guests: 0,
    capacity: 4,
    time: "8 phút trước",
    total: 0,
    note: "Khách vừa rời bàn. Cần dọn chén đĩa và lau bàn.",
  },
  {
    number: "05",
    state: "reserved",
    guests: 6,
    capacity: 8,
    time: "12:30",
    total: 0,
    note: "Anh Dũng · 0988 ••• 456 · Đặt trước 6 khách",
  },
  {
    number: "06",
    state: "serving",
    guests: 2,
    capacity: 4,
    time: "18′",
    total: 195000,
    note: "Đã ra đủ món · 2 phần Bún bò Huế",
  },
];
export const bill = [
  {
    name: "Phở Tái Nạm Gầu",
    quantity: 2,
    price: 75000,
    note: "1 bát không hành",
  },
  {
    name: "Phở Bò Sốt Vang",
    quantity: 1,
    price: 85000,
    note: "Bánh mềm, đậm vị",
  },
  { name: "Quẩy Giòn Phố Cổ", quantity: 2, price: 15000, note: "Ăn kèm" },
  { name: "Trà Đá Hoa Lài", quantity: 4, price: 5000, note: "Ít đá" },
];
export const billTotal = bill.reduce((s, i) => s + i.price * i.quantity, 0);

export const menuImages: Record<string, string> = {
  "pho-tai":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjhjYL7EcSjhhvCsXYpP2tET17hp4TnXdvApiTzdxXmvHulVUSCWp_wA504hd15SoXyOkLCFWXaPfF2NFWwU7n9VyZYQcN_uYMOuJwVKMMHXmKjHrla07hl-v42wTlkIVc5QmATBIX_T3KxOa2o2vGIIewBS2XEW-Nl0s6IrwPVXHUDfP6Qeoah-UdSJ307nlV7k8-lJU4WFGBT40AdE1UfWCeiCZYfh-ZTibY2zML3Wiw47d6JfRHag",
  "pho-vang":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8YPUUOpHaKKEuRcgYf7EXZGI1M5-GgKxwNJgitevwC8jihF6xP4bywCQfNHhxVpm0ChYeihLZr7jE-I0tKf7V0jBw77eftTLjQABXpDV--RTRA0O2lxOUBpyISrJ26NVw5C1TXClLgtDhLtxc3Qtfi_gwyp8Q6oAqyIgCu3RAn0bylOKElwlSST6VRqeVAu2ENRRAvJ3YXTpz3w9CrJbKQmqIrTU_eExmcu0YJ9GkduTXxMcfToRqpg",
  quay: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkKCIrVboiSmIuBQPueXFk5L0OUTnJzuB8g7ZiZ_ScaIFFaBpencLv8iLSAky9v5zZ9AJC5lpOqUuUWmuWfVAooKTOQjke99Kp3vpg6-6BYVfpmID7Q8N5XWN2k9uOnO2z7CPfT4Bogjzmc1tbjaG0pmZOfSUOBZPIG4p5ChP5uWTDGRoZImqA_KG_oMSA7Cg2AMLvgq3leLY0jjoVXXqXyJTjDh9XzIikfJjwQWZ2-IUWbQlK6cxXmA",
  tra: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhEZ1Iza74wQ56vZsHjNcTNZhPvsCkMn1f6kCoW4KPViLlz9PzQItCZnhx6BzBUaq2SHs1XqIPxLtN7p4bYAOHH94CNf0HinSMmveWE316fs7_voHyYkGCIQpHkelr-UZBXNcCe-J-4LBteruI2xq-Txv781hJWEYZDrWJfy94zyB5a3c2ziseSrhdRgVEdtR2-9CletQKWa2XEU_NXS-F7YNASz_bCtwqeZ9vkULCYO6aPg7Kv2D9ZQ",
  "bap-bo":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuACn2JxjtGi9qh7WlGkRrPDMUpQAYn6Dv4zTTBFpzM6kHR8CQNAjYE2sp8b0e1-yXEOsO-mlh1eu2IHjr4b_W76wNDzokikFeCNDBTVrofVRhvI9XOM0V66vKmSUtQ0tIFZ3adi05Sx7acHrwk-nYnnOxiVoe7sZvKfzU3BAq-Usi33c5HReydJ_SLHld5NwmI_fTaWeOLM5fT0iC1nqH0zS8jDUvjIrAhkoV3jyUKXcpKeK40T3uRxvw",
};
