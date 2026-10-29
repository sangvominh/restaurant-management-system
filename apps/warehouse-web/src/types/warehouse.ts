export type StockStatus = "An toàn" | "Sắp hết" | "Dưới định mức";
export type RequestStatus = "Chờ duyệt" | "Đã duyệt" | "Từ chối";

export interface Material {
  code: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  minimum: number;
  location: string;
  expiry: string;
  branch: string;
}

export interface IssueRequest {
  code: string;
  branch: string;
  date: string;
  requester: string;
  status: RequestStatus;
  items: { name: string; quantity: number; unit: string }[];
}

export interface ProductionOrder {
  code: string;
  product: string;
  quantity: number;
  assignee: string;
  materialStatus: string;
  status: string;
  progress: number;
}
