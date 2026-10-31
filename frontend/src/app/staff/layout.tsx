import { Suspense } from "react";
import { StaffShell } from "@/components/staff/context";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="p-6">Đang tải…</p>}>
      <StaffShell>{children}</StaffShell>
    </Suspense>
  );
}
