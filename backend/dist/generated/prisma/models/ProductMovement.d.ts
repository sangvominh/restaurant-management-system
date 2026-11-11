import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductMovementModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductMovementPayload>;
export type AggregateProductMovement = {
    _count: ProductMovementCountAggregateOutputType | null;
    _avg: ProductMovementAvgAggregateOutputType | null;
    _sum: ProductMovementSumAggregateOutputType | null;
    _min: ProductMovementMinAggregateOutputType | null;
    _max: ProductMovementMaxAggregateOutputType | null;
};
export type ProductMovementAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ProductMovementSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ProductMovementMinAggregateOutputType = {
    receiptLineId: string | null;
    lotDisposalId: string | null;
    id: string | null;
    quantity: runtime.Decimal | null;
    movementType: string | null;
    postedAt: Date | null;
    productId: string | null;
    dispatchLineId: string | null;
    storeAdjustmentId: string | null;
    runId: string | null;
    exportLineId: string | null;
    wasteLineId: string | null;
};
export type ProductMovementMaxAggregateOutputType = {
    receiptLineId: string | null;
    lotDisposalId: string | null;
    id: string | null;
    quantity: runtime.Decimal | null;
    movementType: string | null;
    postedAt: Date | null;
    productId: string | null;
    dispatchLineId: string | null;
    storeAdjustmentId: string | null;
    runId: string | null;
    exportLineId: string | null;
    wasteLineId: string | null;
};
export type ProductMovementCountAggregateOutputType = {
    receiptLineId: number;
    lotDisposalId: number;
    id: number;
    quantity: number;
    movementType: number;
    postedAt: number;
    productId: number;
    dispatchLineId: number;
    storeAdjustmentId: number;
    runId: number;
    exportLineId: number;
    wasteLineId: number;
    _all: number;
};
export type ProductMovementAvgAggregateInputType = {
    quantity?: true;
};
export type ProductMovementSumAggregateInputType = {
    quantity?: true;
};
export type ProductMovementMinAggregateInputType = {
    receiptLineId?: true;
    lotDisposalId?: true;
    id?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    productId?: true;
    dispatchLineId?: true;
    storeAdjustmentId?: true;
    runId?: true;
    exportLineId?: true;
    wasteLineId?: true;
};
export type ProductMovementMaxAggregateInputType = {
    receiptLineId?: true;
    lotDisposalId?: true;
    id?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    productId?: true;
    dispatchLineId?: true;
    storeAdjustmentId?: true;
    runId?: true;
    exportLineId?: true;
    wasteLineId?: true;
};
export type ProductMovementCountAggregateInputType = {
    receiptLineId?: true;
    lotDisposalId?: true;
    id?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    productId?: true;
    dispatchLineId?: true;
    storeAdjustmentId?: true;
    runId?: true;
    exportLineId?: true;
    wasteLineId?: true;
    _all?: true;
};
export type ProductMovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductMovementCountAggregateInputType;
    _avg?: ProductMovementAvgAggregateInputType;
    _sum?: ProductMovementSumAggregateInputType;
    _min?: ProductMovementMinAggregateInputType;
    _max?: ProductMovementMaxAggregateInputType;
};
export type GetProductMovementAggregateType<T extends ProductMovementAggregateArgs> = {
    [P in keyof T & keyof AggregateProductMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductMovement[P]> : Prisma.GetScalarType<T[P], AggregateProductMovement[P]>;
};
export type ProductMovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithAggregationInput | Prisma.ProductMovementOrderByWithAggregationInput[];
    by: Prisma.ProductMovementScalarFieldEnum[] | Prisma.ProductMovementScalarFieldEnum;
    having?: Prisma.ProductMovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductMovementCountAggregateInputType | true;
    _avg?: ProductMovementAvgAggregateInputType;
    _sum?: ProductMovementSumAggregateInputType;
    _min?: ProductMovementMinAggregateInputType;
    _max?: ProductMovementMaxAggregateInputType;
};
export type ProductMovementGroupByOutputType = {
    receiptLineId: string | null;
    lotDisposalId: string | null;
    id: string;
    quantity: runtime.Decimal;
    movementType: string;
    postedAt: Date;
    productId: string;
    dispatchLineId: string | null;
    storeAdjustmentId: string | null;
    runId: string | null;
    exportLineId: string | null;
    wasteLineId: string | null;
    _count: ProductMovementCountAggregateOutputType | null;
    _avg: ProductMovementAvgAggregateOutputType | null;
    _sum: ProductMovementSumAggregateOutputType | null;
    _min: ProductMovementMinAggregateOutputType | null;
    _max: ProductMovementMaxAggregateOutputType | null;
};
export type GetProductMovementGroupByPayload<T extends ProductMovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductMovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductMovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductMovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductMovementGroupByOutputType[P]>;
}>>;
export type ProductMovementWhereInput = {
    AND?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    OR?: Prisma.ProductMovementWhereInput[];
    NOT?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    receiptLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    lotDisposalId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    id?: Prisma.UuidFilter<"ProductMovement"> | string;
    quantity?: Prisma.DecimalFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidFilter<"ProductMovement"> | string;
    dispatchLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    storeAdjustmentId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    runId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    exportLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    receiptLine?: Prisma.XOR<Prisma.ProductReceiptLineNullableScalarRelationFilter, Prisma.ProductReceiptLineWhereInput> | null;
    lotDisposal?: Prisma.XOR<Prisma.ProductLotDisposalNullableScalarRelationFilter, Prisma.ProductLotDisposalWhereInput> | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    dispatchLine?: Prisma.XOR<Prisma.StoreDispatchLineNullableScalarRelationFilter, Prisma.StoreDispatchLineWhereInput> | null;
    storeAdjustment?: Prisma.XOR<Prisma.StoreAdjustmentNullableScalarRelationFilter, Prisma.StoreAdjustmentWhereInput> | null;
    run?: Prisma.XOR<Prisma.ProductionRunNullableScalarRelationFilter, Prisma.ProductionRunWhereInput> | null;
    exportLine?: Prisma.XOR<Prisma.ProductExportLineNullableScalarRelationFilter, Prisma.ProductExportLineWhereInput> | null;
    wasteLine?: Prisma.XOR<Prisma.WasteLineNullableScalarRelationFilter, Prisma.WasteLineWhereInput> | null;
};
export type ProductMovementOrderByWithRelationInput = {
    receiptLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    lotDisposalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    storeAdjustmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    runId?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    receiptLine?: Prisma.ProductReceiptLineOrderByWithRelationInput;
    lotDisposal?: Prisma.ProductLotDisposalOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    dispatchLine?: Prisma.StoreDispatchLineOrderByWithRelationInput;
    storeAdjustment?: Prisma.StoreAdjustmentOrderByWithRelationInput;
    run?: Prisma.ProductionRunOrderByWithRelationInput;
    exportLine?: Prisma.ProductExportLineOrderByWithRelationInput;
    wasteLine?: Prisma.WasteLineOrderByWithRelationInput;
};
export type ProductMovementWhereUniqueInput = Prisma.AtLeast<{
    receiptLineId?: string;
    lotDisposalId?: string;
    id?: string;
    dispatchLineId?: string;
    storeAdjustmentId?: string;
    runId?: string;
    exportLineId?: string;
    wasteLineId?: string;
    AND?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    OR?: Prisma.ProductMovementWhereInput[];
    NOT?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    quantity?: Prisma.DecimalFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidFilter<"ProductMovement"> | string;
    receiptLine?: Prisma.XOR<Prisma.ProductReceiptLineNullableScalarRelationFilter, Prisma.ProductReceiptLineWhereInput> | null;
    lotDisposal?: Prisma.XOR<Prisma.ProductLotDisposalNullableScalarRelationFilter, Prisma.ProductLotDisposalWhereInput> | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    dispatchLine?: Prisma.XOR<Prisma.StoreDispatchLineNullableScalarRelationFilter, Prisma.StoreDispatchLineWhereInput> | null;
    storeAdjustment?: Prisma.XOR<Prisma.StoreAdjustmentNullableScalarRelationFilter, Prisma.StoreAdjustmentWhereInput> | null;
    run?: Prisma.XOR<Prisma.ProductionRunNullableScalarRelationFilter, Prisma.ProductionRunWhereInput> | null;
    exportLine?: Prisma.XOR<Prisma.ProductExportLineNullableScalarRelationFilter, Prisma.ProductExportLineWhereInput> | null;
    wasteLine?: Prisma.XOR<Prisma.WasteLineNullableScalarRelationFilter, Prisma.WasteLineWhereInput> | null;
}, "id" | "receiptLineId" | "lotDisposalId" | "dispatchLineId" | "storeAdjustmentId" | "runId" | "exportLineId" | "wasteLineId">;
export type ProductMovementOrderByWithAggregationInput = {
    receiptLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    lotDisposalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    storeAdjustmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    runId?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProductMovementCountOrderByAggregateInput;
    _avg?: Prisma.ProductMovementAvgOrderByAggregateInput;
    _max?: Prisma.ProductMovementMaxOrderByAggregateInput;
    _min?: Prisma.ProductMovementMinOrderByAggregateInput;
    _sum?: Prisma.ProductMovementSumOrderByAggregateInput;
};
export type ProductMovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductMovementScalarWhereWithAggregatesInput | Prisma.ProductMovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductMovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductMovementScalarWhereWithAggregatesInput | Prisma.ProductMovementScalarWhereWithAggregatesInput[];
    receiptLineId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    lotDisposalId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    id?: Prisma.UuidWithAggregatesFilter<"ProductMovement"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringWithAggregatesFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidWithAggregatesFilter<"ProductMovement"> | string;
    dispatchLineId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    storeAdjustmentId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    runId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    exportLineId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
};
export type ProductMovementCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateManyInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductMovementUncheckedUpdateManyInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementListRelationFilter = {
    every?: Prisma.ProductMovementWhereInput;
    some?: Prisma.ProductMovementWhereInput;
    none?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductMovementNullableScalarRelationFilter = {
    is?: Prisma.ProductMovementWhereInput | null;
    isNot?: Prisma.ProductMovementWhereInput | null;
};
export type ProductMovementCountOrderByAggregateInput = {
    receiptLineId?: Prisma.SortOrder;
    lotDisposalId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrder;
    storeAdjustmentId?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    exportLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type ProductMovementAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ProductMovementMaxOrderByAggregateInput = {
    receiptLineId?: Prisma.SortOrder;
    lotDisposalId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrder;
    storeAdjustmentId?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    exportLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type ProductMovementMinOrderByAggregateInput = {
    receiptLineId?: Prisma.SortOrder;
    lotDisposalId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrder;
    storeAdjustmentId?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    exportLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type ProductMovementSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ProductMovementCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
};
export type ProductMovementUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
};
export type ProductMovementUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    set?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    disconnect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    delete?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    update?: Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput | Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
};
export type ProductMovementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    set?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    disconnect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    delete?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    update?: Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput | Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
};
export type ProductMovementCreateNestedOneWithoutWasteLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutWasteLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutWasteLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutWasteLineInput, Prisma.ProductMovementUpdateWithoutWasteLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutWasteLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutWasteLineInput, Prisma.ProductMovementUpdateWithoutWasteLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type ProductMovementCreateNestedOneWithoutReceiptLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutReceiptLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutReceiptLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutReceiptLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutReceiptLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutReceiptLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutReceiptLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutReceiptLineInput, Prisma.ProductMovementUpdateWithoutReceiptLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutReceiptLineInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutReceiptLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutReceiptLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutReceiptLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutReceiptLineInput, Prisma.ProductMovementUpdateWithoutReceiptLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutReceiptLineInput>;
};
export type ProductMovementCreateNestedOneWithoutLotDisposalInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedCreateWithoutLotDisposalInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutLotDisposalInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutLotDisposalInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedCreateWithoutLotDisposalInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutLotDisposalInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutLotDisposalNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedCreateWithoutLotDisposalInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutLotDisposalInput;
    upsert?: Prisma.ProductMovementUpsertWithoutLotDisposalInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutLotDisposalInput, Prisma.ProductMovementUpdateWithoutLotDisposalInput>, Prisma.ProductMovementUncheckedUpdateWithoutLotDisposalInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutLotDisposalNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedCreateWithoutLotDisposalInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutLotDisposalInput;
    upsert?: Prisma.ProductMovementUpsertWithoutLotDisposalInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutLotDisposalInput, Prisma.ProductMovementUpdateWithoutLotDisposalInput>, Prisma.ProductMovementUncheckedUpdateWithoutLotDisposalInput>;
};
export type ProductMovementCreateNestedOneWithoutRunInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutRunInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutRunNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    upsert?: Prisma.ProductMovementUpsertWithoutRunInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutRunInput, Prisma.ProductMovementUpdateWithoutRunInput>, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutRunNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    upsert?: Prisma.ProductMovementUpsertWithoutRunInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutRunInput, Prisma.ProductMovementUpdateWithoutRunInput>, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
};
export type ProductMovementCreateNestedOneWithoutExportLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutExportLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutExportLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutExportLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutExportLineInput, Prisma.ProductMovementUpdateWithoutExportLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutExportLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutExportLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutExportLineInput, Prisma.ProductMovementUpdateWithoutExportLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
};
export type ProductMovementCreateNestedOneWithoutDispatchLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutDispatchLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutDispatchLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutDispatchLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutDispatchLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutDispatchLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutDispatchLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutDispatchLineInput, Prisma.ProductMovementUpdateWithoutDispatchLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutDispatchLineInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutDispatchLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutDispatchLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutDispatchLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutDispatchLineInput, Prisma.ProductMovementUpdateWithoutDispatchLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutDispatchLineInput>;
};
export type ProductMovementCreateNestedOneWithoutStoreAdjustmentInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedCreateWithoutStoreAdjustmentInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutStoreAdjustmentInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedCreateWithoutStoreAdjustmentInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutStoreAdjustmentInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedCreateWithoutStoreAdjustmentInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutStoreAdjustmentInput;
    upsert?: Prisma.ProductMovementUpsertWithoutStoreAdjustmentInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutStoreAdjustmentInput, Prisma.ProductMovementUpdateWithoutStoreAdjustmentInput>, Prisma.ProductMovementUncheckedUpdateWithoutStoreAdjustmentInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedCreateWithoutStoreAdjustmentInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutStoreAdjustmentInput;
    upsert?: Prisma.ProductMovementUpsertWithoutStoreAdjustmentInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutStoreAdjustmentInput, Prisma.ProductMovementUpdateWithoutStoreAdjustmentInput>, Prisma.ProductMovementUncheckedUpdateWithoutStoreAdjustmentInput>;
};
export type ProductMovementCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutProductInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput>;
};
export type ProductMovementCreateManyProductInputEnvelope = {
    data: Prisma.ProductMovementCreateManyProductInput | Prisma.ProductMovementCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductMovementUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutProductInput, Prisma.ProductMovementUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput>;
};
export type ProductMovementUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutProductInput, Prisma.ProductMovementUncheckedUpdateWithoutProductInput>;
};
export type ProductMovementUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateManyMutationInput, Prisma.ProductMovementUncheckedUpdateManyWithoutProductInput>;
};
export type ProductMovementScalarWhereInput = {
    AND?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
    OR?: Prisma.ProductMovementScalarWhereInput[];
    NOT?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
    receiptLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    lotDisposalId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    id?: Prisma.UuidFilter<"ProductMovement"> | string;
    quantity?: Prisma.DecimalFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidFilter<"ProductMovement"> | string;
    dispatchLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    storeAdjustmentId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    runId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    exportLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
};
export type ProductMovementCreateWithoutWasteLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutWasteLineInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutWasteLineInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
};
export type ProductMovementUpsertWithoutWasteLineInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutWasteLineInput, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutWasteLineInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutWasteLineInput, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type ProductMovementUpdateWithoutWasteLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutWasteLineInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutReceiptLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutReceiptLineInput = {
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutReceiptLineInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedCreateWithoutReceiptLineInput>;
};
export type ProductMovementUpsertWithoutReceiptLineInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedUpdateWithoutReceiptLineInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedCreateWithoutReceiptLineInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutReceiptLineInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutReceiptLineInput, Prisma.ProductMovementUncheckedUpdateWithoutReceiptLineInput>;
};
export type ProductMovementUpdateWithoutReceiptLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutReceiptLineInput = {
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutLotDisposalInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutLotDisposalInput = {
    receiptLineId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutLotDisposalInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedCreateWithoutLotDisposalInput>;
};
export type ProductMovementUpsertWithoutLotDisposalInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedUpdateWithoutLotDisposalInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedCreateWithoutLotDisposalInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutLotDisposalInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutLotDisposalInput, Prisma.ProductMovementUncheckedUpdateWithoutLotDisposalInput>;
};
export type ProductMovementUpdateWithoutLotDisposalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutLotDisposalInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutRunInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutRunInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutRunInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
};
export type ProductMovementUpsertWithoutRunInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutRunInput, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutRunInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutRunInput, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
};
export type ProductMovementUpdateWithoutRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutRunInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutExportLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutExportLineInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutExportLineInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
};
export type ProductMovementUpsertWithoutExportLineInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutExportLineInput, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutExportLineInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutExportLineInput, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
};
export type ProductMovementUpdateWithoutExportLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutExportLineInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutDispatchLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    storeAdjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutDispatchLineInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutDispatchLineInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedCreateWithoutDispatchLineInput>;
};
export type ProductMovementUpsertWithoutDispatchLineInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedUpdateWithoutDispatchLineInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedCreateWithoutDispatchLineInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutDispatchLineInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutDispatchLineInput, Prisma.ProductMovementUncheckedUpdateWithoutDispatchLineInput>;
};
export type ProductMovementUpdateWithoutDispatchLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutDispatchLineInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutStoreAdjustmentInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.ProductReceiptLineCreateNestedOneWithoutMovementInput;
    lotDisposal?: Prisma.ProductLotDisposalCreateNestedOneWithoutMovementInput;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutStoreAdjustmentInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    dispatchLineId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutStoreAdjustmentInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedCreateWithoutStoreAdjustmentInput>;
};
export type ProductMovementUpsertWithoutStoreAdjustmentInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedUpdateWithoutStoreAdjustmentInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedCreateWithoutStoreAdjustmentInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutStoreAdjustmentInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutStoreAdjustmentInput, Prisma.ProductMovementUncheckedUpdateWithoutStoreAdjustmentInput>;
};
export type ProductMovementUpdateWithoutStoreAdjustmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutStoreAdjustmentInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateManyProductInput = {
    receiptLineId?: string | null;
    lotDisposalId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    storeAdjustmentId?: string | null;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.ProductReceiptLineUpdateOneWithoutMovementNestedInput;
    lotDisposal?: Prisma.ProductLotDisposalUpdateOneWithoutMovementNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput;
    storeAdjustment?: Prisma.StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutProductInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementUncheckedUpdateManyWithoutProductInput = {
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotDisposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeAdjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    receiptLineId?: boolean;
    lotDisposalId?: boolean;
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    dispatchLineId?: boolean;
    storeAdjustmentId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
    receiptLine?: boolean | Prisma.ProductMovement$receiptLineArgs<ExtArgs>;
    lotDisposal?: boolean | Prisma.ProductMovement$lotDisposalArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.ProductMovement$dispatchLineArgs<ExtArgs>;
    storeAdjustment?: boolean | Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["productMovement"]>;
export type ProductMovementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    receiptLineId?: boolean;
    lotDisposalId?: boolean;
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    dispatchLineId?: boolean;
    storeAdjustmentId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
    receiptLine?: boolean | Prisma.ProductMovement$receiptLineArgs<ExtArgs>;
    lotDisposal?: boolean | Prisma.ProductMovement$lotDisposalArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.ProductMovement$dispatchLineArgs<ExtArgs>;
    storeAdjustment?: boolean | Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["productMovement"]>;
export type ProductMovementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    receiptLineId?: boolean;
    lotDisposalId?: boolean;
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    dispatchLineId?: boolean;
    storeAdjustmentId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
    receiptLine?: boolean | Prisma.ProductMovement$receiptLineArgs<ExtArgs>;
    lotDisposal?: boolean | Prisma.ProductMovement$lotDisposalArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.ProductMovement$dispatchLineArgs<ExtArgs>;
    storeAdjustment?: boolean | Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["productMovement"]>;
export type ProductMovementSelectScalar = {
    receiptLineId?: boolean;
    lotDisposalId?: boolean;
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    dispatchLineId?: boolean;
    storeAdjustmentId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
};
export type ProductMovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"receiptLineId" | "lotDisposalId" | "id" | "quantity" | "movementType" | "postedAt" | "productId" | "dispatchLineId" | "storeAdjustmentId" | "runId" | "exportLineId" | "wasteLineId", ExtArgs["result"]["productMovement"]>;
export type ProductMovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receiptLine?: boolean | Prisma.ProductMovement$receiptLineArgs<ExtArgs>;
    lotDisposal?: boolean | Prisma.ProductMovement$lotDisposalArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.ProductMovement$dispatchLineArgs<ExtArgs>;
    storeAdjustment?: boolean | Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
};
export type ProductMovementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receiptLine?: boolean | Prisma.ProductMovement$receiptLineArgs<ExtArgs>;
    lotDisposal?: boolean | Prisma.ProductMovement$lotDisposalArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.ProductMovement$dispatchLineArgs<ExtArgs>;
    storeAdjustment?: boolean | Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
};
export type ProductMovementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receiptLine?: boolean | Prisma.ProductMovement$receiptLineArgs<ExtArgs>;
    lotDisposal?: boolean | Prisma.ProductMovement$lotDisposalArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.ProductMovement$dispatchLineArgs<ExtArgs>;
    storeAdjustment?: boolean | Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
};
export type $ProductMovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductMovement";
    objects: {
        receiptLine: Prisma.$ProductReceiptLinePayload<ExtArgs> | null;
        lotDisposal: Prisma.$ProductLotDisposalPayload<ExtArgs> | null;
        product: Prisma.$ProductPayload<ExtArgs>;
        dispatchLine: Prisma.$StoreDispatchLinePayload<ExtArgs> | null;
        storeAdjustment: Prisma.$StoreAdjustmentPayload<ExtArgs> | null;
        run: Prisma.$ProductionRunPayload<ExtArgs> | null;
        exportLine: Prisma.$ProductExportLinePayload<ExtArgs> | null;
        wasteLine: Prisma.$WasteLinePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        receiptLineId: string | null;
        lotDisposalId: string | null;
        id: string;
        quantity: runtime.Decimal;
        movementType: string;
        postedAt: Date;
        productId: string;
        dispatchLineId: string | null;
        storeAdjustmentId: string | null;
        runId: string | null;
        exportLineId: string | null;
        wasteLineId: string | null;
    }, ExtArgs["result"]["productMovement"]>;
    composites: {};
};
export type ProductMovementGetPayload<S extends boolean | null | undefined | ProductMovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload, S>;
export type ProductMovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductMovementCountAggregateInputType | true;
};
export interface ProductMovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductMovement'];
        meta: {
            name: 'ProductMovement';
        };
    };
    findUnique<T extends ProductMovementFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductMovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductMovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductMovementFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductMovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductMovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductMovementFindManyArgs>(args?: Prisma.SelectSubset<T, ProductMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductMovementCreateArgs>(args: Prisma.SelectSubset<T, ProductMovementCreateArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductMovementCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductMovementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductMovementDeleteArgs>(args: Prisma.SelectSubset<T, ProductMovementDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductMovementUpdateArgs>(args: Prisma.SelectSubset<T, ProductMovementUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductMovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductMovementUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductMovementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductMovementUpsertArgs>(args: Prisma.SelectSubset<T, ProductMovementUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductMovementCountArgs>(args?: Prisma.Subset<T, ProductMovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductMovementCountAggregateOutputType> : number>;
    aggregate<T extends ProductMovementAggregateArgs>(args: Prisma.Subset<T, ProductMovementAggregateArgs>): Prisma.PrismaPromise<GetProductMovementAggregateType<T>>;
    groupBy<T extends ProductMovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductMovementGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductMovementGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductMovementFieldRefs;
}
export interface Prisma__ProductMovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    receiptLine<T extends Prisma.ProductMovement$receiptLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$receiptLineArgs<ExtArgs>>): Prisma.Prisma__ProductReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$ProductReceiptLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    lotDisposal<T extends Prisma.ProductMovement$lotDisposalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$lotDisposalArgs<ExtArgs>>): Prisma.Prisma__ProductLotDisposalClient<runtime.Types.Result.GetResult<Prisma.$ProductLotDisposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    dispatchLine<T extends Prisma.ProductMovement$dispatchLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$dispatchLineArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    storeAdjustment<T extends Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$storeAdjustmentArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    run<T extends Prisma.ProductMovement$runArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$runArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    exportLine<T extends Prisma.ProductMovement$exportLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$exportLineArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    wasteLine<T extends Prisma.ProductMovement$wasteLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$wasteLineArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductMovementFieldRefs {
    readonly receiptLineId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly lotDisposalId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly id: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly quantity: Prisma.FieldRef<"ProductMovement", 'Decimal'>;
    readonly movementType: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly postedAt: Prisma.FieldRef<"ProductMovement", 'DateTime'>;
    readonly productId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly dispatchLineId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly storeAdjustmentId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly runId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly exportLineId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly wasteLineId: Prisma.FieldRef<"ProductMovement", 'String'>;
}
export type ProductMovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductMovementScalarFieldEnum | Prisma.ProductMovementScalarFieldEnum[];
};
export type ProductMovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductMovementScalarFieldEnum | Prisma.ProductMovementScalarFieldEnum[];
};
export type ProductMovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductMovementScalarFieldEnum | Prisma.ProductMovementScalarFieldEnum[];
};
export type ProductMovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductMovementCreateInput, Prisma.ProductMovementUncheckedCreateInput>;
};
export type ProductMovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductMovementCreateManyInput | Prisma.ProductMovementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductMovementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    data: Prisma.ProductMovementCreateManyInput | Prisma.ProductMovementCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductMovementIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductMovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductMovementUpdateInput, Prisma.ProductMovementUncheckedUpdateInput>;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductMovementUpdateManyMutationInput, Prisma.ProductMovementUncheckedUpdateManyInput>;
    where?: Prisma.ProductMovementWhereInput;
    limit?: number;
};
export type ProductMovementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductMovementUpdateManyMutationInput, Prisma.ProductMovementUncheckedUpdateManyInput>;
    where?: Prisma.ProductMovementWhereInput;
    limit?: number;
    include?: Prisma.ProductMovementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductMovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateInput, Prisma.ProductMovementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductMovementUpdateInput, Prisma.ProductMovementUncheckedUpdateInput>;
};
export type ProductMovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductMovementWhereInput;
    limit?: number;
};
export type ProductMovement$receiptLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.ProductReceiptLineInclude<ExtArgs> | null;
    where?: Prisma.ProductReceiptLineWhereInput;
};
export type ProductMovement$lotDisposalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductLotDisposalSelect<ExtArgs> | null;
    omit?: Prisma.ProductLotDisposalOmit<ExtArgs> | null;
    include?: Prisma.ProductLotDisposalInclude<ExtArgs> | null;
    where?: Prisma.ProductLotDisposalWhereInput;
};
export type ProductMovement$dispatchLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type ProductMovement$storeAdjustmentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where?: Prisma.StoreAdjustmentWhereInput;
};
export type ProductMovement$runArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    where?: Prisma.ProductionRunWhereInput;
};
export type ProductMovement$exportLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where?: Prisma.ProductExportLineWhereInput;
};
export type ProductMovement$wasteLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where?: Prisma.WasteLineWhereInput;
};
export type ProductMovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
};
