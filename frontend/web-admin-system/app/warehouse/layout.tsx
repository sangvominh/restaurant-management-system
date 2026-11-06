import WarehouseLayout from './WarehouseLayoutClient';
import '@/warehouse/app/globals.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return <WarehouseLayout>{children}</WarehouseLayout>;
}
