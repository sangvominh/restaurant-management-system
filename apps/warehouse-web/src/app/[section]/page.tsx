import Workspace from "@/components/workspace";
import SupplierManagement from "@/components/warehouse/supplier-management";
import MaterialManagement from "@/components/warehouse/material-management";
import ReceiptManagement from "@/components/warehouse/receipt-management";
import MaterialIssueManagement from "@/components/warehouse/material-issue-management";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section === "suppliers") return <SupplierManagement />;
  if (section === "materials") return <MaterialManagement />;
  if (section === "receipts") return <ReceiptManagement />;
  if (section === "material-issues") return <MaterialIssueManagement />;
  return <Workspace key={section} section={section} />;
}
