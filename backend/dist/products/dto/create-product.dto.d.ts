import { ProductStatus } from '../entities/product.entity.js';
export declare class CreateProductDto {
    name: string;
    description?: string;
    category: string;
    price: number;
    unit?: string;
    status?: ProductStatus;
}
