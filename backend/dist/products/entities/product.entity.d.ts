export declare enum ProductStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare class Product {
    id: number;
    name: string;
    description: string | null;
    category: string;
    price: number;
    unit: string;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}
