import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class SalesService {
    private readonly db;
    constructor(db: PrismaService);
    products(): Promise<{
        stock: import("@prisma/client-runtime-utils").Decimal;
        available: import("@prisma/client-runtime-utils").Decimal;
        held: import("@prisma/client-runtime-utils").Decimal;
        reserved: import("@prisma/client-runtime-utils").Decimal;
        shortage: import("@prisma/client-runtime-utils").Decimal;
        expired: import("@prisma/client-runtime-utils").Decimal;
        untracked: import("@prisma/client-runtime-utils").Decimal;
        allocations: {
            lineId: string;
            ready: import("@prisma/client-runtime-utils").Decimal;
            missing: import("@prisma/client-runtime-utils").Decimal;
            lots: {
                lotId: string;
                code: string;
                expiryDate: Date;
                quantity: Prisma.Decimal;
            }[];
            exported: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
        }[];
        lots: {
            available: import("@prisma/client-runtime-utils").Decimal;
            seenInStore: boolean;
            warehouse: import("@prisma/client-runtime-utils").Decimal;
            store: import("@prisma/client-runtime-utils").Decimal;
            warehouseHeld: import("@prisma/client-runtime-utils").Decimal;
            storeHeld: import("@prisma/client-runtime-utils").Decimal;
            daysRemaining: number;
            expired: boolean;
            soon: boolean;
            warehouseAvailable: import("@prisma/client-runtime-utils").Decimal;
            storeAvailable: import("@prisma/client-runtime-utils").Decimal;
            disposals: ({
                createdBy: {
                    name: string;
                };
            } & {
                id: string;
                createdById: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                reason: string;
                postedAt: Date;
            })[];
            id: string;
            code: string;
            createdAt: Date;
            expiryDate: Date;
            productId: string;
            receiptLineId: string | null;
            manufacturedAt: Date;
            runId: string | null;
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
        name: string;
        code: string;
        status: string;
        unitId: string;
        categoryId: string;
        supplyType: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    priceProducts(): Prisma.PrismaPromise<({
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
    } & {
        id: string;
        name: string;
        code: string;
        status: string;
        unitId: string;
        categoryId: string;
        supplyType: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    salesReport(start: string, end: string, method?: string): Promise<{
        start: string;
        end: string;
        method: string;
        orders: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        average: import("@prisma/client-runtime-utils").Decimal;
        cash: import("@prisma/client-runtime-utils").Decimal;
        transfer: import("@prisma/client-runtime-utils").Decimal;
        granularity: string;
        trend: {
            key: string;
            paid: Prisma.Decimal;
            orders: number;
        }[];
        products: {
            id: string;
            name: string;
            category: string;
            unit: string;
            quantity: Prisma.Decimal;
            revenue: Prisma.Decimal;
        }[];
        sales: {
            id: string;
            code: string;
            table: string;
            paidAt: Date | null;
            method: string;
            total: import("@prisma/client-runtime-utils").Decimal;
            createdBy: string;
            productIds: string[];
        }[];
    }>;
    setPrice(productId: string, input: unknown): Promise<{
        id: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    list(): Promise<{
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
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                    dueAt: Date | null;
                    assignedBy: {
                        name: string;
                    };
                    assignedTo: {
                        name: string;
                        accountId: string | null;
                    };
                    runs: {
                        status: string;
                        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                    }[];
                } | null;
            } & {
                id: string;
                status: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                requestedAt: Date;
                productionOrderId: string | null;
                requestedById: string;
                saleLineId: string;
            })[];
            lotMovements: ({
                lot: {
                    code: string;
                    expiryDate: Date;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                postedAt: Date;
                receiptLineId: string | null;
                runId: string | null;
                dispatchLineId: string | null;
                location: string;
                saleLineId: string | null;
                adjustmentId: string | null;
                disposalId: string | null;
            })[];
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
            note: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
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
            requestedById: string;
            reviewedById: string | null;
            saleId: string;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        createdById: string;
        version: number;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }[]>;
    save(input: unknown, user: AdminUser, existingId?: string): Promise<{
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
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                    dueAt: Date | null;
                    assignedBy: {
                        name: string;
                    };
                    assignedTo: {
                        name: string;
                        accountId: string | null;
                    };
                    runs: {
                        status: string;
                        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                    }[];
                } | null;
            } & {
                id: string;
                status: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                requestedAt: Date;
                productionOrderId: string | null;
                requestedById: string;
                saleLineId: string;
            })[];
            lotMovements: ({
                lot: {
                    code: string;
                    expiryDate: Date;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                postedAt: Date;
                receiptLineId: string | null;
                runId: string | null;
                dispatchLineId: string | null;
                location: string;
                saleLineId: string | null;
                adjustmentId: string | null;
                disposalId: string | null;
            })[];
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
            note: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
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
            requestedById: string;
            reviewedById: string | null;
            saleId: string;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        createdById: string;
        version: number;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    changeLine(saleId: string, input: unknown, user: AdminUser): Promise<{
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
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                    dueAt: Date | null;
                    assignedBy: {
                        name: string;
                    };
                    assignedTo: {
                        name: string;
                        accountId: string | null;
                    };
                    runs: {
                        status: string;
                        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                    }[];
                } | null;
            } & {
                id: string;
                status: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                requestedAt: Date;
                productionOrderId: string | null;
                requestedById: string;
                saleLineId: string;
            })[];
            lotMovements: ({
                lot: {
                    code: string;
                    expiryDate: Date;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                postedAt: Date;
                receiptLineId: string | null;
                runId: string | null;
                dispatchLineId: string | null;
                location: string;
                saleLineId: string | null;
                adjustmentId: string | null;
                disposalId: string | null;
            })[];
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
            note: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
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
            requestedById: string;
            reviewedById: string | null;
            saleId: string;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        createdById: string;
        version: number;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    areas(): Promise<{
        name: string;
        columns: number;
        rows: number;
        color: string;
    }[]>;
    saveArea(input: unknown, oldName?: string): Promise<{
        name: string;
        columns: number;
        rows: number;
        color: string;
    }>;
    deleteArea(name: string): Promise<{
        name: string;
        columns: number;
        rows: number;
        color: string;
    }>;
    deleteTable(id: string): Promise<{
        id: string;
        name: string;
        status: string;
        area: string;
        x: number;
        y: number;
    }>;
    tables(): Promise<{
        id: string;
        name: string;
        status: string;
        area: string;
        x: number;
        y: number;
    }[]>;
    saveTable(input: unknown, tableId?: string): Promise<{
        id: string;
        name: string;
        status: string;
        area: string;
        x: number;
        y: number;
    }>;
    private confirmLines;
    send(saleId: string, input: unknown, user: AdminUser): Promise<{
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
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                    dueAt: Date | null;
                    assignedBy: {
                        name: string;
                    };
                    assignedTo: {
                        name: string;
                        accountId: string | null;
                    };
                    runs: {
                        status: string;
                        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                    }[];
                } | null;
            } & {
                id: string;
                status: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                requestedAt: Date;
                productionOrderId: string | null;
                requestedById: string;
                saleLineId: string;
            })[];
            lotMovements: ({
                lot: {
                    code: string;
                    expiryDate: Date;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                postedAt: Date;
                receiptLineId: string | null;
                runId: string | null;
                dispatchLineId: string | null;
                location: string;
                saleLineId: string | null;
                adjustmentId: string | null;
                disposalId: string | null;
            })[];
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
            note: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
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
            requestedById: string;
            reviewedById: string | null;
            saleId: string;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        createdById: string;
        version: number;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
    action(saleId: string, action: 'cancel' | 'pay', input: unknown, user: AdminUser): Promise<{
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
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            replenishments: ({
                productionOrder: {
                    id: string;
                    status: string;
                    dueAt: Date | null;
                    assignedBy: {
                        name: string;
                    };
                    assignedTo: {
                        name: string;
                        accountId: string | null;
                    };
                    runs: {
                        status: string;
                        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                    }[];
                } | null;
            } & {
                id: string;
                status: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                requestedAt: Date;
                productionOrderId: string | null;
                requestedById: string;
                saleLineId: string;
            })[];
            lotMovements: ({
                lot: {
                    code: string;
                    expiryDate: Date;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                postedAt: Date;
                receiptLineId: string | null;
                runId: string | null;
                dispatchLineId: string | null;
                location: string;
                saleLineId: string | null;
                adjustmentId: string | null;
                disposalId: string | null;
            })[];
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
            note: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
        } | null;
        exports: ({
            lines: {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
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
            requestedById: string;
            reviewedById: string | null;
            saleId: string;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        createdById: string;
        version: number;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    }>;
}
