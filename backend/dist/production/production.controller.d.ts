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
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
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
            code: string;
            status: string;
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
            code: string;
            status: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    code: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    supplyType: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
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
        materialId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        requestedAt: Date;
        reason: string;
        reviewNote: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
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
            code: string;
            status: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    code: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    supplyType: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
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
        materialId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        requestedAt: Date;
        reason: string;
        reviewNote: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
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
            code: string;
            status: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    code: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    supplyType: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
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
        materialId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        requestedAt: Date;
        reason: string;
        reviewNote: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
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
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            code: string;
            status: string;
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
                code: string;
                status: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            materialId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            code: string;
            status: string;
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
                code: string;
                status: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            materialId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            code: string;
            status: string;
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
                code: string;
                status: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            materialId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
    }>;
    deleteBom(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
    }>;
    activate(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            createdBy: {
                id: string;
                name: string;
                code: string;
                status: string;
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
                    code: string;
                    status: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                materialId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
            })[];
        } & {
            id: string;
            status: string;
            createdById: string;
            productId: string;
            version: number;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
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
                    code: string;
                    status: string;
                    createdAt: Date;
                    createdById: string;
                    version: number;
                    closedAt: Date | null;
                    closedById: string | null;
                    tableId: string | null;
                };
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
            };
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
        assignedBy: {
            id: string;
            name: string;
            code: string;
            status: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            name: string;
            code: string;
            status: string;
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
                    code: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    supplyType: string;
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
                        code: string;
                        status: string;
                        minStock: import("@prisma/client-runtime-utils").Decimal;
                        unitId: string;
                        categoryId: string;
                    };
                } & {
                    id: string;
                    materialId: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    bomId: string;
                })[];
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
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
                        code: string;
                        status: string;
                        createdAt: Date;
                        createdById: string;
                        version: number;
                        closedAt: Date | null;
                        closedById: string | null;
                        tableId: string | null;
                    };
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
                };
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
            assignedBy: {
                id: string;
                name: string;
                code: string;
                status: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            assignedTo: {
                id: string;
                name: string;
                code: string;
                status: string;
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
                            approvedAt: Date | null;
                            reason: string;
                            reviewedById: string | null;
                            reportedAt: Date;
                            reportedById: string;
                        };
                    } & {
                        id: string;
                        note: string | null;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        lotId: string | null;
                        issueLineId: string | null;
                        sourceType: string;
                        wasteId: string;
                        productId: string | null;
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
                            code: string;
                            status: string;
                            minStock: import("@prisma/client-runtime-utils").Decimal;
                            unitId: string;
                            categoryId: string;
                        };
                    } & {
                        id: string;
                        code: string;
                        expiryDate: Date | null;
                        materialId: string;
                    };
                    consumptions: {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        issueLineId: string;
                        runId: string;
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
                            requestedAt: Date;
                            approvedAt: Date | null;
                            reason: string;
                            requestedById: string;
                            reviewedById: string | null;
                        };
                    } & {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        returnId: string;
                        issueLineId: string;
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
                requestedAt: Date;
                approvedAt: Date | null;
                reason: string | null;
                reviewNote: string | null;
                productionOrderId: string;
                requestedById: string;
                reviewedById: string | null;
            })[];
            runs: ({
                productLot: {
                    id: string;
                    code: string;
                    createdAt: Date;
                    expiryDate: Date;
                    productId: string;
                    receiptLineId: string | null;
                    manufacturedAt: Date;
                    runId: string | null;
                } | null;
                performedBy: {
                    name: string;
                    accountId: string | null;
                };
                consumptions: {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    issueLineId: string;
                    runId: string;
                }[];
                inspectedBy: {
                    name: string;
                } | null;
            } & {
                id: string;
                status: string;
                productionOrderId: string;
                recordedAt: Date;
                actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                inspectedAt: Date | null;
                inspectionNote: string | null;
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
                code: string;
                status: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
            id: string;
            code: string;
            expiryDate: Date | null;
            materialId: string;
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
        productionOrderId: string;
        recordedAt: Date;
        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
        inspectedAt: Date | null;
        inspectionNote: string | null;
        performedById: string;
        inspectedById: string | null;
    } | {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    } | {
        id: string;
        status: string;
        approvedAt: Date | null;
        reason: string;
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
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string | null;
        reviewNote: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
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
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            createdBy: {
                id: string;
                name: string;
                code: string;
                status: string;
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
                    code: string;
                    status: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                materialId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
            })[];
        } & {
            id: string;
            status: string;
            createdById: string;
            productId: string;
            version: number;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
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
                    code: string;
                    status: string;
                    createdAt: Date;
                    createdById: string;
                    version: number;
                    closedAt: Date | null;
                    closedById: string | null;
                    tableId: string | null;
                };
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
            };
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
        assignedBy: {
            id: string;
            name: string;
            code: string;
            status: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            name: string;
            code: string;
            status: string;
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
