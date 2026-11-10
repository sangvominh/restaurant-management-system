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
    ready(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    updateArea(name: string, b: unknown, r: R): Promise<{
        name: string;
        rows: number;
        columns: number;
        color: string;
    }>;
    deleteArea(name: string, r: R): Promise<{
        name: string;
        rows: number;
        columns: number;
        color: string;
    }>;
    deleteTable(id: string, r: R): Promise<{
        id: string;
        status: string;
        name: string;
        area: string;
        x: number;
        y: number;
    }>;
    products(r: R): Promise<{
        stock: import("@prisma/client-runtime-utils").Decimal;
        available: import("@prisma/client-runtime-utils").Decimal;
        allocations: {
            lineId: string;
            ready: import("@prisma/client-runtime-utils").Decimal;
            missing: import("@prisma/client-runtime-utils").Decimal;
        }[];
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
    changeLine(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    serve(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    replenish(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    areas(r: R): Promise<{
        name: string;
        rows: number;
        columns: number;
        color: string;
    }[]>;
    area(b: unknown, r: R): Promise<{
        name: string;
        rows: number;
        columns: number;
        color: string;
    }>;
    tables(r: R): Promise<{
        id: string;
        status: string;
        name: string;
        area: string;
        x: number;
        y: number;
    }[]>;
    createTable(b: unknown, r: R): Promise<{
        id: string;
        status: string;
        name: string;
        area: string;
        x: number;
        y: number;
    }>;
    updateTable(id: string, b: unknown, r: R): Promise<{
        id: string;
        status: string;
        name: string;
        area: string;
        x: number;
        y: number;
    }>;
    send(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    list(r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }[]>;
    create(b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    update(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    confirm(id: string, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    cancel(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    pay(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            servings: ({
                servedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                servedAt: Date;
                servedById: string;
            })[];
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                } | null;
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                requestedAt: Date;
                requestedById: string;
                saleLineId: string;
                productionOrderId: string | null;
            })[];
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
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                reason: string;
                saleLineId: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            }[];
            reviewedBy: {
                name: string;
            } | null;
            requestedBy: {
                name: string;
            };
        } & {
            id: string;
            status: string;
            reason: string | null;
            approvedAt: Date | null;
            reviewedById: string | null;
            saleId: string;
            requestedAt: Date;
            requestedById: string;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    request(b: unknown, r: R): Promise<{
        sale: {
            id: string;
            status: string;
            createdAt: Date;
            code: string;
            version: number;
            createdById: string;
            closedAt: Date | null;
            closedById: string | null;
            tableId: string | null;
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
                note: string;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                sentById: string | null;
                sentAt: Date | null;
                batch: number | null;
                productName: string;
                saleId: string;
            };
        } & {
            id: string;
            requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
            exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
            exportId: string;
            saleLineId: string;
        })[];
        reviewedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        } | null;
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        status: string;
        reason: string | null;
        approvedAt: Date | null;
        reviewedById: string | null;
        saleId: string;
        requestedAt: Date;
        requestedById: string;
    }>;
}
export {};
