import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { ProductionService } from './production.service.js';
import { ExecutionService } from './execution.service.js';
import { ShortageService } from './shortage.service.js';
type AuthRequest = Request & {
    catalogUser: AdminUser;
};
export declare class ProductionController {
    private readonly service;
    private readonly execution;
    private readonly shortages;
    constructor(service: ProductionService, execution: ExecutionService, shortages: ShortageService);
    private allow;
    references(r: AuthRequest): Promise<{
        products: ({
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            unitId: string;
            categoryId: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        })[];
        materials: ({
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        })[];
        employees: {
            id: string;
            name: string;
            code: string;
        }[];
    }>;
    shortageList(r: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    status: string;
                    code: string;
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                version: number;
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
        } & {
            id: string;
            status: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            assignedAt: Date;
            dueAt: Date | null;
            assignedById: string;
            assignedToId: string;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        updatedAt: Date;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        requestedAt: Date;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
        reviewNote: string | null;
    })[]>;
    reportShortage(b: unknown, r: AuthRequest): Promise<{
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    status: string;
                    code: string;
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                version: number;
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
        } & {
            id: string;
            status: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            assignedAt: Date;
            dueAt: Date | null;
            assignedById: string;
            assignedToId: string;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        updatedAt: Date;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        requestedAt: Date;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
        reviewNote: string | null;
    }>;
    reviewShortage(id: string, b: unknown, r: AuthRequest): Promise<{
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    status: string;
                    code: string;
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                version: number;
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
        } & {
            id: string;
            status: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            assignedAt: Date;
            dueAt: Date | null;
            assignedById: string;
            assignedToId: string;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        updatedAt: Date;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        requestedAt: Date;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
        reviewNote: string | null;
    }>;
    boms(r: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        product: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            unitId: string;
            categoryId: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            status: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
            material: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                status: string;
                code: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            materialId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    })[]>;
    createBom(b: unknown, r: AuthRequest): Promise<{
        product: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            unitId: string;
            categoryId: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            status: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
            material: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                status: string;
                code: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            materialId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    updateBom(id: string, b: unknown, r: AuthRequest): Promise<{
        product: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            status: string;
            code: string;
            unitId: string;
            categoryId: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            status: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
            material: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                status: string;
                code: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            materialId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    deleteBom(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    activate(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    orders(r: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        bom: {
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                status: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            createdBy: {
                id: string;
                name: string;
                status: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            lines: ({
                material: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    name: string;
                    status: string;
                    code: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
                materialId: string;
            })[];
        } & {
            id: string;
            status: string;
            version: number;
            effectiveAt: Date;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            createdById: string;
        };
        replenishments: ({
            saleLine: {
                sale: {
                    table: {
                        id: string;
                        name: string;
                        status: string;
                        area: string;
                        x: number;
                        y: number;
                    } | null;
                } & {
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
            };
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
        assignedBy: {
            id: string;
            name: string;
            status: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            name: string;
            status: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    })[]>;
    detail(id: string, r: AuthRequest): Promise<{
        asOf: string;
        order: {
            bom: {
                product: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    name: string;
                    status: string;
                    code: string;
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
                lines: ({
                    material: {
                        unit: {
                            symbol: string;
                            id: string;
                            name: string;
                        };
                    } & {
                        id: string;
                        name: string;
                        status: string;
                        code: string;
                        minStock: import("@prisma/client-runtime-utils").Decimal;
                        unitId: string;
                        categoryId: string;
                    };
                } & {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    bomId: string;
                    materialId: string;
                })[];
            } & {
                id: string;
                status: string;
                version: number;
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
            replenishments: ({
                saleLine: {
                    sale: {
                        table: {
                            id: string;
                            name: string;
                            status: string;
                            area: string;
                            x: number;
                            y: number;
                        } | null;
                    } & {
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
                };
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
            assignedBy: {
                id: string;
                name: string;
                status: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            assignedTo: {
                id: string;
                name: string;
                status: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            materialIssues: ({
                lines: ({
                    wasteLines: ({
                        waste: {
                            reviewedBy: {
                                name: string;
                            } | null;
                            reportedBy: {
                                name: string;
                            };
                        } & {
                            id: string;
                            status: string;
                            reason: string;
                            approvedAt: Date | null;
                            reviewedById: string | null;
                            reportedAt: Date;
                            reportedById: string;
                        };
                    } & {
                        id: string;
                        productId: string | null;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        note: string | null;
                        lotId: string | null;
                        sourceType: string;
                        issueLineId: string | null;
                        wasteId: string;
                    })[];
                    lot: {
                        material: {
                            unit: {
                                symbol: string;
                                id: string;
                                name: string;
                            };
                        } & {
                            id: string;
                            name: string;
                            status: string;
                            code: string;
                            minStock: import("@prisma/client-runtime-utils").Decimal;
                            unitId: string;
                            categoryId: string;
                        };
                    } & {
                        id: string;
                        code: string;
                        materialId: string;
                        expiryDate: Date | null;
                    };
                    consumptions: {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        runId: string;
                        issueLineId: string;
                    }[];
                    returnLines: ({
                        return: {
                            requestedBy: {
                                name: string;
                            };
                            reviewedBy: {
                                name: string;
                            } | null;
                        } & {
                            id: string;
                            status: string;
                            reason: string;
                            requestedAt: Date;
                            approvedAt: Date | null;
                            requestedById: string;
                            reviewedById: string | null;
                        };
                    } & {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        issueLineId: string;
                        returnId: string;
                    })[];
                } & {
                    id: string;
                    lotId: string;
                    requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                    issuedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                    issueId: string;
                })[];
                requestedBy: {
                    name: string;
                };
                reviewedBy: {
                    name: string;
                } | null;
            } & {
                id: string;
                status: string;
                reason: string | null;
                requestedAt: Date;
                approvedAt: Date | null;
                requestedById: string;
                reviewedById: string | null;
                productionOrderId: string;
                reviewNote: string | null;
            })[];
            runs: ({
                performedBy: {
                    name: string;
                    accountId: string | null;
                };
                consumptions: {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    runId: string;
                    issueLineId: string;
                }[];
                inspectedBy: {
                    name: string;
                } | null;
            } & {
                id: string;
                status: string;
                recordedAt: Date;
                actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                inspectedAt: Date | null;
                inspectionNote: string | null;
                productionOrderId: string;
                performedById: string;
                inspectedById: string | null;
            })[];
        } & {
            id: string;
            status: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            assignedAt: Date;
            dueAt: Date | null;
            assignedById: string;
            assignedToId: string;
        };
        lots: {
            daysRemaining: number | null;
            stock: import("@prisma/client-runtime-utils").Decimal;
            material: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                status: string;
                code: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
            id: string;
            code: string;
            materialId: string;
            expiryDate: Date | null;
        }[];
        balances: {
            id: string;
            consumed: import("@prisma/client-runtime-utils").Decimal;
            returned: import("@prisma/client-runtime-utils").Decimal;
            wasted: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
            unsettled: import("@prisma/client-runtime-utils").Decimal;
            remaining: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    execute(id: string, b: unknown, r: AuthRequest): Promise<{
        id: string;
        status: string;
        recordedAt: Date;
        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
        inspectedAt: Date | null;
        inspectionNote: string | null;
        productionOrderId: string;
        performedById: string;
        inspectedById: string | null;
    } | {
        id: string;
        status: string;
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
    } | {
        id: string;
        status: string;
        reason: string;
        approvedAt: Date | null;
        reviewedById: string | null;
        reportedAt: Date;
        reportedById: string;
    } | {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    } | {
        id: string;
        status: string;
        reason: string | null;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
        reviewNote: string | null;
    }>;
    createOrder(b: unknown, r: AuthRequest): Promise<{
        bom: {
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                status: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            createdBy: {
                id: string;
                name: string;
                status: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            lines: ({
                material: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    name: string;
                    status: string;
                    code: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
                materialId: string;
            })[];
        } & {
            id: string;
            status: string;
            version: number;
            effectiveAt: Date;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            createdById: string;
        };
        replenishments: ({
            saleLine: {
                sale: {
                    table: {
                        id: string;
                        name: string;
                        status: string;
                        area: string;
                        x: number;
                        y: number;
                    } | null;
                } & {
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
            };
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
        assignedBy: {
            id: string;
            name: string;
            status: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            name: string;
            status: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
    receive(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
    cancel(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
}
export {};
