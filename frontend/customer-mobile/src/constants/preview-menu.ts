import type { MenuCategory, MenuProduct } from '@/types/menu';

export const PREVIEW_CATEGORIES: MenuCategory[] = [
  { id: 'c-meat', name: 'Thịt hun khói', productCount: 3 },
  { id: 'c-side', name: 'Món ăn kèm', productCount: 2 },
  { id: 'c-drink', name: 'Đồ uống', productCount: 1 },
];

export const PREVIEW_PRODUCTS: MenuProduct[] = [
  {
    id: '11111111-1111-4111-8111-111111111101',
    code: 'BBQ-TP-RIBS',
    name: 'Sườn heo hun khói gỗ táo',
    description:
      'Sườn non tuyển chọn ướp gia vị khô 12 giờ, hun khói chậm bằng gỗ táo tự nhiên cho thớ thịt mềm mọng, phủ lớp sốt BBQ mật ong đậm đà.',
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    sellingPrice: '690000',
    unit: { id: 'u-kg', name: 'Kilôgam', symbol: 'kg' },
    category: { id: 'c-meat', name: 'Thịt hun khói' },
    available: '0.5',
    inStock: true,
  },
  {
    id: '11111111-1111-4111-8111-111111111102',
    code: 'BBQ-TP-BRISKET',
    name: 'Ức bò Mỹ hun khói Brisket',
    description:
      'Ức bò Mỹ hun khói 14 tiếng ở nhiệt độ thấp giữ trọn độ mọng ngọt tự nhiên, lớp vỏ tiêu đen dậy mùi thơm chuẩn phong cách Texas.',
    imageUrl:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80',
    sellingPrice: '820000',
    unit: { id: 'u-kg', name: 'Kilôgam', symbol: 'kg' },
    category: { id: 'c-meat', name: 'Thịt hun khói' },
    available: '3.5',
    inStock: true,
  },
  {
    id: '11111111-1111-4111-8111-111111111103',
    code: 'BBQ-TP-SAUSAGE',
    name: 'Xúc xích phô mai xông khói',
    description:
      'Xúc xích heo tươi nhồi thủ công kết hợp nhân phô mai cheddar béo ngậy tan chảy khi dùng nóng, ăn kèm mù tạt vàng.',
    imageUrl:
      'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=900&q=80',
    sellingPrice: '145000',
    unit: { id: 'u-portion', name: 'Phần', symbol: 'phần' },
    category: { id: 'c-side', name: 'Món ăn kèm' },
    available: '12',
    inStock: true,
  },
  {
    id: '11111111-1111-4111-8111-111111111106',
    code: 'BBQ-SD-POTATO',
    name: 'Khoai tây múi cau thảo mộc',
    description:
      'Khoai tây cắt múi cau vỏ giòn ruột bùi, xóc bơ tỏi, lá hương thảo tươi và muối biển.',
    imageUrl:
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=900&q=80',
    sellingPrice: '75000',
    unit: { id: 'u-portion', name: 'Phần', symbol: 'phần' },
    category: { id: 'c-side', name: 'Món ăn kèm' },
    available: '8',
    inStock: true,
  },
  {
    id: '11111111-1111-4111-8111-111111111104',
    code: 'BBQ-DR-COKE',
    name: 'Trà chanh sả ướp lạnh',
    description:
      'Trà ủ lạnh kết hợp chanh tươi và sả đập dập thanh mát, cân bằng vị giác tuyệt hảo khi thưởng thức thịt nướng.',
    imageUrl:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    sellingPrice: '39000',
    unit: { id: 'u-can', name: 'Ly', symbol: 'ly' },
    category: { id: 'c-drink', name: 'Đồ uống' },
    available: '4',
    inStock: true,
  },
  {
    id: '11111111-1111-4111-8111-111111111105',
    code: 'BBQ-TP-CHEEK',
    name: 'Má heo nướng sốt mật ong rừng',
    description:
      'Phần má heo giòn mềm chế biến theo mẻ giới hạn mỗi ngày, hiện lượng bàn giao ra cửa hàng đã bán hết.',
    imageUrl:
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80',
    sellingPrice: '360000',
    unit: { id: 'u-kg', name: 'Kilôgam', symbol: 'kg' },
    category: { id: 'c-meat', name: 'Thịt hun khói' },
    available: '0',
    inStock: false,
  },
];

export function findPreviewProductById(id: string): MenuProduct | undefined {
  return PREVIEW_PRODUCTS.find(item => item.id === id);
}
