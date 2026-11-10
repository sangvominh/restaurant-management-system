type Person = { name: string };
type Review = { approvedAt: string | null; reviewedBy: Person | null };
type Doc = Review & { id: string; status: string; reason: string; requestedAt?: string; reportedAt?: string };
export type IssueLine = {
  id: string; requestedQuantity: string; issuedQuantity: string | null;
  lot: { id: string; materialId: string; code: string; material: { name: string; unit: { symbol: string } } };
  consumptions: { id: string; runId: string; quantity: string }[];
  returnLines: { id: string; quantity: string; return: Doc & { requestedBy: Person } }[];
  wasteLines: { id: string; quantity: string; waste: Doc & { reportedBy: Person } }[];
};
export type Detail = {
  asOf: string;
  order: {
    id: string; assignedAt: string; dueAt: string | null; status: string; quantity: string;
    assignedBy: Person; assignedTo: Person & { accountId: string | null };
    replenishments: { id: string; saleLine: { sale: { code: string; table: { name: string } | null } } }[];
    bom: {
      version: number; outputQuantity: string;
      lines: { materialId: string; quantity: string; material: { name: string; unit: { symbol: string } } }[];
      product: { name: string; unit: { symbol: string } };
    };
    materialIssues: (Review & {
      id: string; requestedAt: string; status: string; reason: string | null; reviewNote: string | null;
      requestedBy: Person; lines: IssueLine[];
    })[];
    runs: {
      id: string; recordedAt: string; performedBy: Person & { accountId: string | null }; status: string;
      actualQuantity: string; acceptedQuantity: string | null; inspectionNote: string | null;
      inspectedAt: string | null; inspectedBy: Person | null;
      consumptions: { id: string; issueLineId: string; quantity: string }[];
    }[];
  };
  lots: {
    id: string; materialId: string; code: string; stock: string; daysRemaining: number | null;
    expiryDate: string | null; material: { status: string; name: string; unit: { symbol: string } };
  }[];
  balances: {
    id: string; consumed: string; returned: string; wasted: string; pending: string;
    unsettled: string; remaining: string;
  }[];
};

