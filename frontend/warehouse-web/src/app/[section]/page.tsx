import InventoryReport from "@/components/warehouse/inventory-report";
import WarehouseHistory from "@/components/warehouse/warehouse-history";
import MaterialAdjustmentManagement from "@/components/warehouse/material-adjustment-management";
import { notFound } from "next/navigation";
import SupplierManagement from "@/components/warehouse/supplier-management";
import MaterialManagement from "@/components/warehouse/material-management";
import ReceiptManagement from "@/components/warehouse/receipt-management";
import MaterialIssueManagement from "@/components/warehouse/material-issue-management";

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ branchCode?: string; page?: string }>;
}) {
  const { section } = await params;
  if (section === "suppliers") return <SupplierManagement />;
  if (section === "materials") return <MaterialManagement />;
  if (section === "receipts") return <ReceiptManagement />;
  if (section === "material-issues") return <MaterialIssueManagement />;
  if (section === "losses") return <MaterialAdjustmentManagement key="WASTE" type="WASTE" />;
  if (section === "returns") return <MaterialAdjustmentManagement key="RETURN" type="RETURN" />;
  if (section === "reports") return <InventoryReport/>;
  if (section === "transactions") { const query = await searchParams; return <WarehouseHistory branchCode={query.branchCode} page={Number(query.page) || 1}/>; }
  notFound();
}
