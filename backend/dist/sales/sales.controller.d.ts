import type { Request } from 'express';
import { AdminAuthService, type AdminUser } from '../admin/admin-auth.service.js';
import { FinishedService } from '../inventory/finished.service.js';
import { SalesService } from './sales.service.js';
type R = Request & {
    catalogUser: AdminUser;
    catalogToken: string;
};
export declare class RestaurantAuthController {
    private readonly auth;
    constructor(auth: AdminAuthService);
    login(b: unknown): Promise<{
        token: string;
        user: {
            id: string;
            username: string;
            name: string;
            permissions: string[];
        };
    }>;
    me(r: R): AdminUser;
    logout(r: R): {
        message: string;
    };
}
export declare class SalesController {
    private readonly service;
    private readonly finished;
    constructor(service: SalesService, finished: FinishedService);
    products(r: R): Promise<{
        stock: import("@prisma/client-runtime-utils").Decimal;
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
        id: string;
        status: string;
        name: string;
        code: string;
        unitId: string;
        categoryId: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    list(r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                name: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
            requestedBy: {
                name: string;
            };
            reviewedBy: {
                name: string;
            } | null;
        } & {
            id: string;
            status: string;
            requestedAt: Date;
            approvedAt: Date | null;
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }[]>;
    create(b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                name: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
            requestedBy: {
                name: string;
            };
            reviewedBy: {
                name: string;
            } | null;
        } & {
            id: string;
            status: string;
            requestedAt: Date;
            approvedAt: Date | null;
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }>;
    update(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                name: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
            requestedBy: {
                name: string;
            };
            reviewedBy: {
                name: string;
            } | null;
        } & {
            id: string;
            status: string;
            requestedAt: Date;
            approvedAt: Date | null;
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }>;
    confirm(id: string, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                name: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
            requestedBy: {
                name: string;
            };
            reviewedBy: {
                name: string;
            } | null;
        } & {
            id: string;
            status: string;
            requestedAt: Date;
            approvedAt: Date | null;
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }>;
    cancel(id: string, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                name: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
            requestedBy: {
                name: string;
            };
            reviewedBy: {
                name: string;
            } | null;
        } & {
            id: string;
            status: string;
            requestedAt: Date;
            approvedAt: Date | null;
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }>;
    pay(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                name: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
            requestedBy: {
                name: string;
            };
            reviewedBy: {
                name: string;
            } | null;
        } & {
            id: string;
            status: string;
            requestedAt: Date;
            approvedAt: Date | null;
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }>;
    request(b: unknown, r: R): Promise<{
        sale: {
            id: string;
            status: string;
            createdAt: Date;
            code: string;
            createdById: string;
        };
        lines: ({
            saleLine: {
                product: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    status: string;
                    name: string;
                    code: string;
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                productId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                saleId: string;
                productName: string;
            };
        } & {
            id: string;
            saleLineId: string;
            requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
            exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
            exportId: string;
        })[];
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        reviewedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        } | null;
    } & {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string | null;
        saleId: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
}
export {};
