import { warehouseJson, warehouseRequest } from "@/services/api";

export type CategoryType = "MATERIAL" | "RAW_MATERIAL";
export type RecordStatus = "ACTIVE" | "INACTIVE";

export interface Supplier {
  id: string;
  code: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: RecordStatus;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  categoryType: CategoryType;
  status: RecordStatus;
}

export interface Unit {
  id: string;
  name: string;
  baseUnitId: string | null;
  conversionFactor: string;
}

export interface MaterialRecord {
  code: string;
  name: string;
  categoryName: string;
  unitName: string;
  minStock: string;
  status: RecordStatus;
}

export interface Receipt {
  receiptCode: string;
  supplierCode: string;
  supplierName: string;
  branchCode: string;
  branchName: string;
  status: string;
  createdAt: string;
  totalItems: number;
}

export interface ReceiptDetail extends Omit<
  Receipt,
  "supplierCode" | "branchCode" | "totalItems"
> {
  note: string | null;
  details: Array<{
    materialCode: string;
    materialName: string;
    lotCode: string;
    locationName: string;
    unitName: string;
    quantity: string;
    unitPrice: string;
  }>;
}

export type IssueStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface MaterialIssue {
  issueCode: string;
  branchCode: string;
  branchName: string;
  status: IssueStatus;
  note: string | null;
  createdAt: string;
  totalItems: number;
}

export interface MaterialIssueDetail extends Omit<MaterialIssue, "totalItems"> {
  details: Array<{
    materialCode: string;
    materialName: string;
    lotCode: string;
    locationName: string;
    unitName: string;
    quantity: string;
  }>;
}

function query(values: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value?.trim()) params.set(key, value.trim());
  }
  const search = params.toString();
  return search ? `?${search}` : "";
}

export const warehouseService = {
  getSuppliers: (search?: string) =>
    warehouseRequest<Supplier[]>(`/suppliers${query({ search })}`),
  getSupplier: (code: string) =>
    warehouseRequest<Supplier>(`/suppliers/${encodeURIComponent(code)}`),
  createSupplier: (
    data: Pick<Supplier, "code" | "name"> &
      Partial<Pick<Supplier, "phone" | "email" | "address">>,
  ) => warehouseRequest<Supplier>("/suppliers", warehouseJson("POST", data)),
  updateSupplier: (
    code: string,
    data: Partial<Pick<Supplier, "name" | "phone" | "email" | "address">>,
  ) =>
    warehouseRequest<Supplier>(
      `/suppliers/${encodeURIComponent(code)}`,
      warehouseJson("PATCH", data),
    ),
  deleteSupplier: (code: string) =>
    warehouseRequest<void>(
      `/suppliers/${encodeURIComponent(code)}`,
      warehouseJson("DELETE"),
    ),

  getCategories: () => warehouseRequest<Category[]>("/categories"),
  createCategory: (data: Pick<Category, "code" | "name" | "categoryType">) =>
    warehouseRequest<Category>("/categories", warehouseJson("POST", data)),
  updateCategory: (
    code: string,
    data: Partial<Pick<Category, "name" | "status">>,
  ) =>
    warehouseRequest<Category>(
      `/categories/${encodeURIComponent(code)}`,
      warehouseJson("PATCH", data),
    ),
  getUnits: () => warehouseRequest<Unit[]>("/units"),

  getMaterials: (search?: string) =>
    warehouseRequest<MaterialRecord[]>(`/materials${query({ search })}`),
  getMaterial: (code: string) =>
    warehouseRequest<MaterialRecord>(`/materials/${encodeURIComponent(code)}`),
  createMaterial: (
    data: Pick<
      MaterialRecord,
      "code" | "name" | "categoryName" | "unitName" | "minStock"
    > & { categoryType: CategoryType },
  ) =>
    warehouseRequest<MaterialRecord>("/materials", warehouseJson("POST", data)),
  updateMaterial: (
    code: string,
    data: Partial<Pick<MaterialRecord, "name" | "minStock" | "status">>,
  ) =>
    warehouseRequest<MaterialRecord>(
      `/materials/${encodeURIComponent(code)}`,
      warehouseJson("PATCH", data),
    ),

  getReceipts: (
    filters: {
      supplierCode?: string;
      branchCode?: string;
      from?: string;
      to?: string;
    } = {},
  ) => warehouseRequest<Receipt[]>(`/receipts${query(filters)}`),
  getReceipt: (code: string) =>
    warehouseRequest<ReceiptDetail>(`/receipts/${encodeURIComponent(code)}`),
  createReceipt: (data: {
    receiptCode: string;
    supplierCode: string;
    branchCode: string;
    note?: string;
    details: Array<{
      materialCode: string;
      lotCode: string;
      expiryDate?: string;
      locationName: string;
      unitName: string;
      quantity: string;
      unitPrice: string;
    }>;
  }) =>
    warehouseRequest<{
      receiptId: string;
      receiptCode: string;
      status: string;
      totalItems: number;
    }>("/receipts", warehouseJson("POST", data)),

  getMaterialIssues: (status?: IssueStatus) =>
    warehouseRequest<MaterialIssue[]>(`/material-issues${query({ status })}`),
  getMaterialIssue: (code: string) =>
    warehouseRequest<MaterialIssueDetail>(
      `/material-issues/${encodeURIComponent(code)}`,
    ),
  approveMaterialIssue: (code: string) =>
    warehouseRequest<{
      issueCode: string;
      status: IssueStatus;
      totalItems: number;
    }>(
      `/material-issues/${encodeURIComponent(code)}/approve`,
      warehouseJson("POST"),
    ),
  rejectMaterialIssue: (code: string, reason: string) =>
    warehouseRequest<{
      issueCode: string;
      status: IssueStatus;
      reason: string;
    }>(
      `/material-issues/${encodeURIComponent(code)}/reject`,
      warehouseJson("POST", { reason }),
    ),
};
