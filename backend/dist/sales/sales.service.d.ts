import { PrismaService } from '../prisma/prisma.service.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class SalesService {
    private readonly db;
    constructor(db: PrismaService);
    products(): Promise<{
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
    serve(saleId: string, input: unknown, user: AdminUser): Promise<{
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
    replenish(saleId: string, input: unknown, user: AdminUser): Promise<{
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
    areas(): Promise<{
        name: string;
        rows: number;
        columns: number;
        color: string;
    }[]>;
    saveArea(input: unknown, oldName?: string): Promise<{
        name: string;
        rows: number;
        columns: number;
        color: string;
    }>;
    deleteArea(name: string): Promise<{
        name: string;
        rows: number;
        columns: number;
        color: string;
    }>;
    deleteTable(id: string): Promise<{
        id: string;
        status: string;
        name: string;
        area: string;
        x: number;
        y: number;
    }>;
    ready(saleId: string, input: unknown, user: AdminUser): Promise<{
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
    tables(): Promise<{
        id: string;
        status: string;
        name: string;
        area: string;
        x: number;
        y: number;
    }[]>;
    saveTable(input: unknown, tableId?: string): Promise<{
        id: string;
        status: string;
        name: string;
        area: string;
        x: number;
        y: number;
    }>;
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
    action(saleId: string, action: 'confirm' | 'cancel' | 'pay', input: unknown, user: AdminUser): Promise<{
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
}
