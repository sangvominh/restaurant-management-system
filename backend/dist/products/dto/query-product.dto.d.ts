import { ProductStatus } from '../entities/product.entity.js';
export type SortOrder = 'ASC' | 'DESC';
export declare class QueryProductDto {
    search?: string;
    category?: string;
    status?: ProductStatus;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'name' | 'price' | 'category' | 'createdAt';
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}
