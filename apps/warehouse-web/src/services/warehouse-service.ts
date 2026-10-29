import { branches, issueRequests, materials, productionOrders } from "@/mock/data";
import type { IssueRequest, Material, ProductionOrder } from "@/types/warehouse";

/** Data access boundary for the warehouse UI. Replace these mock functions with read-only API adapters when integration starts. */
export const warehouseService = {
  async getMaterials(): Promise<Material[]> { return materials; },
  async getIssueRequests(): Promise<IssueRequest[]> { return issueRequests; },
  async getProductionOrders(): Promise<ProductionOrder[]> { return productionOrders; },
  async getBranches(): Promise<string[]> { return branches; },
};
