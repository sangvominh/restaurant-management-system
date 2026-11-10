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
        allocations: {
            lineId: string;
            ready: import("@prisma/client-runtime-utils").Decimal;
            missing: import("@prisma/client-runtime-utils").Decimal;
            exported: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
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
        code: string;
        name: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        unitId: string;
        categoryId: string;
    }[]>;
    salesReport(month: string): Promise<{
        month: string;
        orders: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        cash: import("@prisma/client-runtime-utils").Decimal;
        transfer: import("@prisma/client-runtime-utils").Decimal;
        products: {
            id: string;
            name: string;
            unit: string;
            quantity: Prisma.Decimal;
            revenue: Prisma.Decimal;
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
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                status: string;
                unitId: string;
                categoryId: string;
            };
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                reason: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
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
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                note: string;
                requestedAt: Date;
                requestedById: string;
                productionOrderId: string | null;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
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
            saleId: string;
            reason: string | null;
            requestedAt: Date;
            approvedAt: Date | null;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
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
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                status: string;
                unitId: string;
                categoryId: string;
            };
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                reason: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
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
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                note: string;
                requestedAt: Date;
                requestedById: string;
                productionOrderId: string | null;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
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
            saleId: string;
            reason: string | null;
            requestedAt: Date;
            approvedAt: Date | null;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
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
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                status: string;
                unitId: string;
                categoryId: string;
            };
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                reason: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
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
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                note: string;
                requestedAt: Date;
                requestedById: string;
                productionOrderId: string | null;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
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
            saleId: string;
            reason: string | null;
            requestedAt: Date;
            approvedAt: Date | null;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
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
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                status: string;
                unitId: string;
                categoryId: string;
            };
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                reason: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
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
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                note: string;
                requestedAt: Date;
                requestedById: string;
                productionOrderId: string | null;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
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
            saleId: string;
            reason: string | null;
            requestedAt: Date;
            approvedAt: Date | null;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
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
        table: {
            id: string;
            name: string;
            status: string;
            area: string;
            x: number;
            y: number;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                status: string;
                unitId: string;
                categoryId: string;
            };
            changes: ({
                changedBy: {
                    name: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                reason: string;
                changedAt: Date;
                previousQuantity: import("@prisma/client-runtime-utils").Decimal;
                replacementLineId: string | null;
                changedById: string;
            })[];
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
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                note: string;
                requestedAt: Date;
                requestedById: string;
                productionOrderId: string | null;
            })[];
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
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
            saleId: string;
            reason: string | null;
            requestedAt: Date;
            approvedAt: Date | null;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        code: string;
        status: string;
        createdAt: Date;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
}
