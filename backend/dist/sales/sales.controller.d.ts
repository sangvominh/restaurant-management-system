import type { Request } from 'express';
import { AdminAuthService, type AdminUser } from '../admin/admin-auth.service.js';
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
            roleName: string;
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
    constructor(service: SalesService);
    updateArea(name: string, b: unknown, r: R): Promise<{
        name: string;
        columns: number;
        rows: number;
        color: string;
    }>;
    deleteArea(name: string, r: R): Promise<{
        name: string;
        columns: number;
        rows: number;
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
    report(month: string, r: R): Promise<{
        month: string;
        orders: number;
        paid: import("@prisma/client-runtime-utils").Decimal;
        cash: import("@prisma/client-runtime-utils").Decimal;
        transfer: import("@prisma/client-runtime-utils").Decimal;
        products: {
            id: string;
            name: string;
            unit: string;
            quantity: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
            revenue: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
        }[];
    }>;
    price(id: string, b: unknown, r: R): Promise<{
        id: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    products(r: R): Promise<{
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
        status: string;
        name: string;
        code: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        unitId: string;
        categoryId: string;
    }[]>;
    changeLine(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
    areas(r: R): Promise<{
        name: string;
        columns: number;
        rows: number;
        color: string;
    }[]>;
    area(b: unknown, r: R): Promise<{
        name: string;
        columns: number;
        rows: number;
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
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
    list(r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }[]>;
    create(b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
    update(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
    confirm(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
    cancel(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
    pay(id: string, b: unknown, r: R): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receivedById: string | null;
            method: string;
            paidAt: Date | null;
            saleId: string;
        } | null;
        table: {
            id: string;
            status: string;
            name: string;
            area: string;
            x: number;
            y: number;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
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
                note: string;
                saleLineId: string;
                requestedAt: Date;
                requestedById: string;
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            note: string;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            productId: string;
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
        status: string;
        createdAt: Date;
        code: string;
        closedAt: Date | null;
        closedById: string | null;
        version: number;
        tableId: string | null;
        createdById: string;
    }>;
}
export {};
