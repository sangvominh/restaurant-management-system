import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StoreMovementModel = runtime.Types.Result.DefaultSelection<Prisma.$StoreMovementPayload>;
export type AggregateStoreMovement = {
    _count: StoreMovementCountAggregateOutputType | null;
    _avg: StoreMovementAvgAggregateOutputType | null;
    _sum: StoreMovementSumAggregateOutputType | null;
    _min: StoreMovementMinAggregateOutputType | null;
    _max: StoreMovementMaxAggregateOutputType | null;
};
export type StoreMovementAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type StoreMovementSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type StoreMovementMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
    movementType: string | null;
    postedAt: Date | null;
    dispatchLineId: string | null;
    saleLineId: string | null;
    adjustmentId: string | null;
};
export type StoreMovementMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
    movementType: string | null;
    postedAt: Date | null;
    dispatchLineId: string | null;
    saleLineId: string | null;
    adjustmentId: string | null;
};
export type StoreMovementCountAggregateOutputType = {
    id: number;
    productId: number;
    quantity: number;
    movementType: number;
    postedAt: number;
    dispatchLineId: number;
    saleLineId: number;
    adjustmentId: number;
    _all: number;
};
export type StoreMovementAvgAggregateInputType = {
    quantity?: true;
};
export type StoreMovementSumAggregateInputType = {
    quantity?: true;
};
export type StoreMovementMinAggregateInputType = {
    id?: true;
    productId?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    dispatchLineId?: true;
    saleLineId?: true;
    adjustmentId?: true;
};
export type StoreMovementMaxAggregateInputType = {
    id?: true;
    productId?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    dispatchLineId?: true;
    saleLineId?: true;
    adjustmentId?: true;
};
export type StoreMovementCountAggregateInputType = {
    id?: true;
    productId?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    dispatchLineId?: true;
    saleLineId?: true;
    adjustmentId?: true;
    _all?: true;
};
export type StoreMovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreMovementWhereInput;
    orderBy?: Prisma.StoreMovementOrderByWithRelationInput | Prisma.StoreMovementOrderByWithRelationInput[];
    cursor?: Prisma.StoreMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StoreMovementCountAggregateInputType;
    _avg?: StoreMovementAvgAggregateInputType;
    _sum?: StoreMovementSumAggregateInputType;
    _min?: StoreMovementMinAggregateInputType;
    _max?: StoreMovementMaxAggregateInputType;
};
export type GetStoreMovementAggregateType<T extends StoreMovementAggregateArgs> = {
    [P in keyof T & keyof AggregateStoreMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStoreMovement[P]> : Prisma.GetScalarType<T[P], AggregateStoreMovement[P]>;
};
export type StoreMovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreMovementWhereInput;
    orderBy?: Prisma.StoreMovementOrderByWithAggregationInput | Prisma.StoreMovementOrderByWithAggregationInput[];
    by: Prisma.StoreMovementScalarFieldEnum[] | Prisma.StoreMovementScalarFieldEnum;
    having?: Prisma.StoreMovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StoreMovementCountAggregateInputType | true;
    _avg?: StoreMovementAvgAggregateInputType;
    _sum?: StoreMovementSumAggregateInputType;
    _min?: StoreMovementMinAggregateInputType;
    _max?: StoreMovementMaxAggregateInputType;
};
export type StoreMovementGroupByOutputType = {
    id: string;
    productId: string;
    quantity: runtime.Decimal;
    movementType: string;
    postedAt: Date;
    dispatchLineId: string | null;
    saleLineId: string | null;
    adjustmentId: string | null;
    _count: StoreMovementCountAggregateOutputType | null;
    _avg: StoreMovementAvgAggregateOutputType | null;
    _sum: StoreMovementSumAggregateOutputType | null;
    _min: StoreMovementMinAggregateOutputType | null;
    _max: StoreMovementMaxAggregateOutputType | null;
};
export type GetStoreMovementGroupByPayload<T extends StoreMovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StoreMovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StoreMovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StoreMovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StoreMovementGroupByOutputType[P]>;
}>>;
export type StoreMovementWhereInput = {
    AND?: Prisma.StoreMovementWhereInput | Prisma.StoreMovementWhereInput[];
    OR?: Prisma.StoreMovementWhereInput[];
    NOT?: Prisma.StoreMovementWhereInput | Prisma.StoreMovementWhereInput[];
    id?: Prisma.UuidFilter<"StoreMovement"> | string;
    productId?: Prisma.UuidFilter<"StoreMovement"> | string;
    quantity?: Prisma.DecimalFilter<"StoreMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"StoreMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"StoreMovement"> | Date | string;
    dispatchLineId?: Prisma.UuidNullableFilter<"StoreMovement"> | string | null;
    saleLineId?: Prisma.UuidNullableFilter<"StoreMovement"> | string | null;
    adjustmentId?: Prisma.UuidNullableFilter<"StoreMovement"> | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    dispatchLine?: Prisma.XOR<Prisma.StoreDispatchLineNullableScalarRelationFilter, Prisma.StoreDispatchLineWhereInput> | null;
    saleLine?: Prisma.XOR<Prisma.SaleLineNullableScalarRelationFilter, Prisma.SaleLineWhereInput> | null;
    adjustment?: Prisma.XOR<Prisma.StoreAdjustmentNullableScalarRelationFilter, Prisma.StoreAdjustmentWhereInput> | null;
};
export type StoreMovementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    saleLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    adjustmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    dispatchLine?: Prisma.StoreDispatchLineOrderByWithRelationInput;
    saleLine?: Prisma.SaleLineOrderByWithRelationInput;
    adjustment?: Prisma.StoreAdjustmentOrderByWithRelationInput;
};
export type StoreMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    dispatchLineId?: string;
    saleLineId?: string;
    adjustmentId?: string;
    AND?: Prisma.StoreMovementWhereInput | Prisma.StoreMovementWhereInput[];
    OR?: Prisma.StoreMovementWhereInput[];
    NOT?: Prisma.StoreMovementWhereInput | Prisma.StoreMovementWhereInput[];
    productId?: Prisma.UuidFilter<"StoreMovement"> | string;
    quantity?: Prisma.DecimalFilter<"StoreMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"StoreMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"StoreMovement"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    dispatchLine?: Prisma.XOR<Prisma.StoreDispatchLineNullableScalarRelationFilter, Prisma.StoreDispatchLineWhereInput> | null;
    saleLine?: Prisma.XOR<Prisma.SaleLineNullableScalarRelationFilter, Prisma.SaleLineWhereInput> | null;
    adjustment?: Prisma.XOR<Prisma.StoreAdjustmentNullableScalarRelationFilter, Prisma.StoreAdjustmentWhereInput> | null;
}, "id" | "dispatchLineId" | "saleLineId" | "adjustmentId">;
export type StoreMovementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    saleLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    adjustmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StoreMovementCountOrderByAggregateInput;
    _avg?: Prisma.StoreMovementAvgOrderByAggregateInput;
    _max?: Prisma.StoreMovementMaxOrderByAggregateInput;
    _min?: Prisma.StoreMovementMinOrderByAggregateInput;
    _sum?: Prisma.StoreMovementSumOrderByAggregateInput;
};
export type StoreMovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.StoreMovementScalarWhereWithAggregatesInput | Prisma.StoreMovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.StoreMovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StoreMovementScalarWhereWithAggregatesInput | Prisma.StoreMovementScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"StoreMovement"> | string;
    productId?: Prisma.UuidWithAggregatesFilter<"StoreMovement"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"StoreMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringWithAggregatesFilter<"StoreMovement"> | string;
    postedAt?: Prisma.DateTimeWithAggregatesFilter<"StoreMovement"> | Date | string;
    dispatchLineId?: Prisma.UuidNullableWithAggregatesFilter<"StoreMovement"> | string | null;
    saleLineId?: Prisma.UuidNullableWithAggregatesFilter<"StoreMovement"> | string | null;
    adjustmentId?: Prisma.UuidNullableWithAggregatesFilter<"StoreMovement"> | string | null;
};
export type StoreMovementCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutStoreMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutStoreMovementInput;
    saleLine?: Prisma.SaleLineCreateNestedOneWithoutStoreMovementInput;
    adjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutStoreMovementInput;
};
export type StoreMovementUncheckedCreateInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    saleLineId?: string | null;
    adjustmentId?: string | null;
};
export type StoreMovementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutStoreMovementNestedInput;
    saleLine?: Prisma.SaleLineUpdateOneWithoutStoreMovementNestedInput;
    adjustment?: Prisma.StoreAdjustmentUpdateOneWithoutStoreMovementNestedInput;
};
export type StoreMovementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreMovementCreateManyInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    saleLineId?: string | null;
    adjustmentId?: string | null;
};
export type StoreMovementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StoreMovementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreMovementListRelationFilter = {
    every?: Prisma.StoreMovementWhereInput;
    some?: Prisma.StoreMovementWhereInput;
    none?: Prisma.StoreMovementWhereInput;
};
export type StoreMovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StoreMovementNullableScalarRelationFilter = {
    is?: Prisma.StoreMovementWhereInput | null;
    isNot?: Prisma.StoreMovementWhereInput | null;
};
export type StoreMovementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    adjustmentId?: Prisma.SortOrder;
};
export type StoreMovementAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type StoreMovementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    adjustmentId?: Prisma.SortOrder;
};
export type StoreMovementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    dispatchLineId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    adjustmentId?: Prisma.SortOrder;
};
export type StoreMovementSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type StoreMovementCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutProductInput, Prisma.StoreMovementUncheckedCreateWithoutProductInput> | Prisma.StoreMovementCreateWithoutProductInput[] | Prisma.StoreMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutProductInput | Prisma.StoreMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StoreMovementCreateManyProductInputEnvelope;
    connect?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
};
export type StoreMovementUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutProductInput, Prisma.StoreMovementUncheckedCreateWithoutProductInput> | Prisma.StoreMovementCreateWithoutProductInput[] | Prisma.StoreMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutProductInput | Prisma.StoreMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StoreMovementCreateManyProductInputEnvelope;
    connect?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
};
export type StoreMovementUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutProductInput, Prisma.StoreMovementUncheckedCreateWithoutProductInput> | Prisma.StoreMovementCreateWithoutProductInput[] | Prisma.StoreMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutProductInput | Prisma.StoreMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StoreMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.StoreMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StoreMovementCreateManyProductInputEnvelope;
    set?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    disconnect?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    delete?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    connect?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    update?: Prisma.StoreMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.StoreMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StoreMovementUpdateManyWithWhereWithoutProductInput | Prisma.StoreMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StoreMovementScalarWhereInput | Prisma.StoreMovementScalarWhereInput[];
};
export type StoreMovementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutProductInput, Prisma.StoreMovementUncheckedCreateWithoutProductInput> | Prisma.StoreMovementCreateWithoutProductInput[] | Prisma.StoreMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutProductInput | Prisma.StoreMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StoreMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.StoreMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StoreMovementCreateManyProductInputEnvelope;
    set?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    disconnect?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    delete?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    connect?: Prisma.StoreMovementWhereUniqueInput | Prisma.StoreMovementWhereUniqueInput[];
    update?: Prisma.StoreMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.StoreMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StoreMovementUpdateManyWithWhereWithoutProductInput | Prisma.StoreMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StoreMovementScalarWhereInput | Prisma.StoreMovementScalarWhereInput[];
};
export type StoreMovementCreateNestedOneWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutSaleLineInput, Prisma.StoreMovementUncheckedCreateWithoutSaleLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutSaleLineInput;
    connect?: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutSaleLineInput, Prisma.StoreMovementUncheckedCreateWithoutSaleLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutSaleLineInput;
    connect?: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementUpdateOneWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutSaleLineInput, Prisma.StoreMovementUncheckedCreateWithoutSaleLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutSaleLineInput;
    upsert?: Prisma.StoreMovementUpsertWithoutSaleLineInput;
    disconnect?: Prisma.StoreMovementWhereInput | boolean;
    delete?: Prisma.StoreMovementWhereInput | boolean;
    connect?: Prisma.StoreMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreMovementUpdateToOneWithWhereWithoutSaleLineInput, Prisma.StoreMovementUpdateWithoutSaleLineInput>, Prisma.StoreMovementUncheckedUpdateWithoutSaleLineInput>;
};
export type StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutSaleLineInput, Prisma.StoreMovementUncheckedCreateWithoutSaleLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutSaleLineInput;
    upsert?: Prisma.StoreMovementUpsertWithoutSaleLineInput;
    disconnect?: Prisma.StoreMovementWhereInput | boolean;
    delete?: Prisma.StoreMovementWhereInput | boolean;
    connect?: Prisma.StoreMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreMovementUpdateToOneWithWhereWithoutSaleLineInput, Prisma.StoreMovementUpdateWithoutSaleLineInput>, Prisma.StoreMovementUncheckedUpdateWithoutSaleLineInput>;
};
export type StoreMovementCreateNestedOneWithoutDispatchLineInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutDispatchLineInput;
    connect?: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementUncheckedCreateNestedOneWithoutDispatchLineInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutDispatchLineInput;
    connect?: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementUpdateOneWithoutDispatchLineNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutDispatchLineInput;
    upsert?: Prisma.StoreMovementUpsertWithoutDispatchLineInput;
    disconnect?: Prisma.StoreMovementWhereInput | boolean;
    delete?: Prisma.StoreMovementWhereInput | boolean;
    connect?: Prisma.StoreMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreMovementUpdateToOneWithWhereWithoutDispatchLineInput, Prisma.StoreMovementUpdateWithoutDispatchLineInput>, Prisma.StoreMovementUncheckedUpdateWithoutDispatchLineInput>;
};
export type StoreMovementUncheckedUpdateOneWithoutDispatchLineNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedCreateWithoutDispatchLineInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutDispatchLineInput;
    upsert?: Prisma.StoreMovementUpsertWithoutDispatchLineInput;
    disconnect?: Prisma.StoreMovementWhereInput | boolean;
    delete?: Prisma.StoreMovementWhereInput | boolean;
    connect?: Prisma.StoreMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreMovementUpdateToOneWithWhereWithoutDispatchLineInput, Prisma.StoreMovementUpdateWithoutDispatchLineInput>, Prisma.StoreMovementUncheckedUpdateWithoutDispatchLineInput>;
};
export type StoreMovementCreateNestedOneWithoutAdjustmentInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedCreateWithoutAdjustmentInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutAdjustmentInput;
    connect?: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedCreateWithoutAdjustmentInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutAdjustmentInput;
    connect?: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementUpdateOneWithoutAdjustmentNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedCreateWithoutAdjustmentInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutAdjustmentInput;
    upsert?: Prisma.StoreMovementUpsertWithoutAdjustmentInput;
    disconnect?: Prisma.StoreMovementWhereInput | boolean;
    delete?: Prisma.StoreMovementWhereInput | boolean;
    connect?: Prisma.StoreMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreMovementUpdateToOneWithWhereWithoutAdjustmentInput, Prisma.StoreMovementUpdateWithoutAdjustmentInput>, Prisma.StoreMovementUncheckedUpdateWithoutAdjustmentInput>;
};
export type StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput = {
    create?: Prisma.XOR<Prisma.StoreMovementCreateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedCreateWithoutAdjustmentInput>;
    connectOrCreate?: Prisma.StoreMovementCreateOrConnectWithoutAdjustmentInput;
    upsert?: Prisma.StoreMovementUpsertWithoutAdjustmentInput;
    disconnect?: Prisma.StoreMovementWhereInput | boolean;
    delete?: Prisma.StoreMovementWhereInput | boolean;
    connect?: Prisma.StoreMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreMovementUpdateToOneWithWhereWithoutAdjustmentInput, Prisma.StoreMovementUpdateWithoutAdjustmentInput>, Prisma.StoreMovementUncheckedUpdateWithoutAdjustmentInput>;
};
export type StoreMovementCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutStoreMovementInput;
    saleLine?: Prisma.SaleLineCreateNestedOneWithoutStoreMovementInput;
    adjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutStoreMovementInput;
};
export type StoreMovementUncheckedCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    saleLineId?: string | null;
    adjustmentId?: string | null;
};
export type StoreMovementCreateOrConnectWithoutProductInput = {
    where: Prisma.StoreMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutProductInput, Prisma.StoreMovementUncheckedCreateWithoutProductInput>;
};
export type StoreMovementCreateManyProductInputEnvelope = {
    data: Prisma.StoreMovementCreateManyProductInput | Prisma.StoreMovementCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type StoreMovementUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.StoreMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreMovementUpdateWithoutProductInput, Prisma.StoreMovementUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutProductInput, Prisma.StoreMovementUncheckedCreateWithoutProductInput>;
};
export type StoreMovementUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.StoreMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreMovementUpdateWithoutProductInput, Prisma.StoreMovementUncheckedUpdateWithoutProductInput>;
};
export type StoreMovementUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.StoreMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreMovementUpdateManyMutationInput, Prisma.StoreMovementUncheckedUpdateManyWithoutProductInput>;
};
export type StoreMovementScalarWhereInput = {
    AND?: Prisma.StoreMovementScalarWhereInput | Prisma.StoreMovementScalarWhereInput[];
    OR?: Prisma.StoreMovementScalarWhereInput[];
    NOT?: Prisma.StoreMovementScalarWhereInput | Prisma.StoreMovementScalarWhereInput[];
    id?: Prisma.UuidFilter<"StoreMovement"> | string;
    productId?: Prisma.UuidFilter<"StoreMovement"> | string;
    quantity?: Prisma.DecimalFilter<"StoreMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"StoreMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"StoreMovement"> | Date | string;
    dispatchLineId?: Prisma.UuidNullableFilter<"StoreMovement"> | string | null;
    saleLineId?: Prisma.UuidNullableFilter<"StoreMovement"> | string | null;
    adjustmentId?: Prisma.UuidNullableFilter<"StoreMovement"> | string | null;
};
export type StoreMovementCreateWithoutSaleLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutStoreMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutStoreMovementInput;
    adjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutStoreMovementInput;
};
export type StoreMovementUncheckedCreateWithoutSaleLineInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    adjustmentId?: string | null;
};
export type StoreMovementCreateOrConnectWithoutSaleLineInput = {
    where: Prisma.StoreMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutSaleLineInput, Prisma.StoreMovementUncheckedCreateWithoutSaleLineInput>;
};
export type StoreMovementUpsertWithoutSaleLineInput = {
    update: Prisma.XOR<Prisma.StoreMovementUpdateWithoutSaleLineInput, Prisma.StoreMovementUncheckedUpdateWithoutSaleLineInput>;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutSaleLineInput, Prisma.StoreMovementUncheckedCreateWithoutSaleLineInput>;
    where?: Prisma.StoreMovementWhereInput;
};
export type StoreMovementUpdateToOneWithWhereWithoutSaleLineInput = {
    where?: Prisma.StoreMovementWhereInput;
    data: Prisma.XOR<Prisma.StoreMovementUpdateWithoutSaleLineInput, Prisma.StoreMovementUncheckedUpdateWithoutSaleLineInput>;
};
export type StoreMovementUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutStoreMovementNestedInput;
    adjustment?: Prisma.StoreAdjustmentUpdateOneWithoutStoreMovementNestedInput;
};
export type StoreMovementUncheckedUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreMovementCreateWithoutDispatchLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutStoreMovementsInput;
    saleLine?: Prisma.SaleLineCreateNestedOneWithoutStoreMovementInput;
    adjustment?: Prisma.StoreAdjustmentCreateNestedOneWithoutStoreMovementInput;
};
export type StoreMovementUncheckedCreateWithoutDispatchLineInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    saleLineId?: string | null;
    adjustmentId?: string | null;
};
export type StoreMovementCreateOrConnectWithoutDispatchLineInput = {
    where: Prisma.StoreMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedCreateWithoutDispatchLineInput>;
};
export type StoreMovementUpsertWithoutDispatchLineInput = {
    update: Prisma.XOR<Prisma.StoreMovementUpdateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedUpdateWithoutDispatchLineInput>;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedCreateWithoutDispatchLineInput>;
    where?: Prisma.StoreMovementWhereInput;
};
export type StoreMovementUpdateToOneWithWhereWithoutDispatchLineInput = {
    where?: Prisma.StoreMovementWhereInput;
    data: Prisma.XOR<Prisma.StoreMovementUpdateWithoutDispatchLineInput, Prisma.StoreMovementUncheckedUpdateWithoutDispatchLineInput>;
};
export type StoreMovementUpdateWithoutDispatchLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreMovementsNestedInput;
    saleLine?: Prisma.SaleLineUpdateOneWithoutStoreMovementNestedInput;
    adjustment?: Prisma.StoreAdjustmentUpdateOneWithoutStoreMovementNestedInput;
};
export type StoreMovementUncheckedUpdateWithoutDispatchLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreMovementCreateWithoutAdjustmentInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutStoreMovementsInput;
    dispatchLine?: Prisma.StoreDispatchLineCreateNestedOneWithoutStoreMovementInput;
    saleLine?: Prisma.SaleLineCreateNestedOneWithoutStoreMovementInput;
};
export type StoreMovementUncheckedCreateWithoutAdjustmentInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    saleLineId?: string | null;
};
export type StoreMovementCreateOrConnectWithoutAdjustmentInput = {
    where: Prisma.StoreMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedCreateWithoutAdjustmentInput>;
};
export type StoreMovementUpsertWithoutAdjustmentInput = {
    update: Prisma.XOR<Prisma.StoreMovementUpdateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedUpdateWithoutAdjustmentInput>;
    create: Prisma.XOR<Prisma.StoreMovementCreateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedCreateWithoutAdjustmentInput>;
    where?: Prisma.StoreMovementWhereInput;
};
export type StoreMovementUpdateToOneWithWhereWithoutAdjustmentInput = {
    where?: Prisma.StoreMovementWhereInput;
    data: Prisma.XOR<Prisma.StoreMovementUpdateWithoutAdjustmentInput, Prisma.StoreMovementUncheckedUpdateWithoutAdjustmentInput>;
};
export type StoreMovementUpdateWithoutAdjustmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreMovementsNestedInput;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutStoreMovementNestedInput;
    saleLine?: Prisma.SaleLineUpdateOneWithoutStoreMovementNestedInput;
};
export type StoreMovementUncheckedUpdateWithoutAdjustmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreMovementCreateManyProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    dispatchLineId?: string | null;
    saleLineId?: string | null;
    adjustmentId?: string | null;
};
export type StoreMovementUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLine?: Prisma.StoreDispatchLineUpdateOneWithoutStoreMovementNestedInput;
    saleLine?: Prisma.SaleLineUpdateOneWithoutStoreMovementNestedInput;
    adjustment?: Prisma.StoreAdjustmentUpdateOneWithoutStoreMovementNestedInput;
};
export type StoreMovementUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreMovementUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatchLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreMovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    dispatchLineId?: boolean;
    saleLineId?: boolean;
    adjustmentId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.StoreMovement$dispatchLineArgs<ExtArgs>;
    saleLine?: boolean | Prisma.StoreMovement$saleLineArgs<ExtArgs>;
    adjustment?: boolean | Prisma.StoreMovement$adjustmentArgs<ExtArgs>;
}, ExtArgs["result"]["storeMovement"]>;
export type StoreMovementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    dispatchLineId?: boolean;
    saleLineId?: boolean;
    adjustmentId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.StoreMovement$dispatchLineArgs<ExtArgs>;
    saleLine?: boolean | Prisma.StoreMovement$saleLineArgs<ExtArgs>;
    adjustment?: boolean | Prisma.StoreMovement$adjustmentArgs<ExtArgs>;
}, ExtArgs["result"]["storeMovement"]>;
export type StoreMovementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    dispatchLineId?: boolean;
    saleLineId?: boolean;
    adjustmentId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.StoreMovement$dispatchLineArgs<ExtArgs>;
    saleLine?: boolean | Prisma.StoreMovement$saleLineArgs<ExtArgs>;
    adjustment?: boolean | Prisma.StoreMovement$adjustmentArgs<ExtArgs>;
}, ExtArgs["result"]["storeMovement"]>;
export type StoreMovementSelectScalar = {
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    dispatchLineId?: boolean;
    saleLineId?: boolean;
    adjustmentId?: boolean;
};
export type StoreMovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "quantity" | "movementType" | "postedAt" | "dispatchLineId" | "saleLineId" | "adjustmentId", ExtArgs["result"]["storeMovement"]>;
export type StoreMovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.StoreMovement$dispatchLineArgs<ExtArgs>;
    saleLine?: boolean | Prisma.StoreMovement$saleLineArgs<ExtArgs>;
    adjustment?: boolean | Prisma.StoreMovement$adjustmentArgs<ExtArgs>;
};
export type StoreMovementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.StoreMovement$dispatchLineArgs<ExtArgs>;
    saleLine?: boolean | Prisma.StoreMovement$saleLineArgs<ExtArgs>;
    adjustment?: boolean | Prisma.StoreMovement$adjustmentArgs<ExtArgs>;
};
export type StoreMovementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    dispatchLine?: boolean | Prisma.StoreMovement$dispatchLineArgs<ExtArgs>;
    saleLine?: boolean | Prisma.StoreMovement$saleLineArgs<ExtArgs>;
    adjustment?: boolean | Prisma.StoreMovement$adjustmentArgs<ExtArgs>;
};
export type $StoreMovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StoreMovement";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        dispatchLine: Prisma.$StoreDispatchLinePayload<ExtArgs> | null;
        saleLine: Prisma.$SaleLinePayload<ExtArgs> | null;
        adjustment: Prisma.$StoreAdjustmentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        quantity: runtime.Decimal;
        movementType: string;
        postedAt: Date;
        dispatchLineId: string | null;
        saleLineId: string | null;
        adjustmentId: string | null;
    }, ExtArgs["result"]["storeMovement"]>;
    composites: {};
};
export type StoreMovementGetPayload<S extends boolean | null | undefined | StoreMovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload, S>;
export type StoreMovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StoreMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StoreMovementCountAggregateInputType | true;
};
export interface StoreMovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StoreMovement'];
        meta: {
            name: 'StoreMovement';
        };
    };
    findUnique<T extends StoreMovementFindUniqueArgs>(args: Prisma.SelectSubset<T, StoreMovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StoreMovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StoreMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StoreMovementFindFirstArgs>(args?: Prisma.SelectSubset<T, StoreMovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StoreMovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StoreMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StoreMovementFindManyArgs>(args?: Prisma.SelectSubset<T, StoreMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StoreMovementCreateArgs>(args: Prisma.SelectSubset<T, StoreMovementCreateArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StoreMovementCreateManyArgs>(args?: Prisma.SelectSubset<T, StoreMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StoreMovementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StoreMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StoreMovementDeleteArgs>(args: Prisma.SelectSubset<T, StoreMovementDeleteArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StoreMovementUpdateArgs>(args: Prisma.SelectSubset<T, StoreMovementUpdateArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StoreMovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, StoreMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StoreMovementUpdateManyArgs>(args: Prisma.SelectSubset<T, StoreMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StoreMovementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StoreMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StoreMovementUpsertArgs>(args: Prisma.SelectSubset<T, StoreMovementUpsertArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StoreMovementCountArgs>(args?: Prisma.Subset<T, StoreMovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StoreMovementCountAggregateOutputType> : number>;
    aggregate<T extends StoreMovementAggregateArgs>(args: Prisma.Subset<T, StoreMovementAggregateArgs>): Prisma.PrismaPromise<GetStoreMovementAggregateType<T>>;
    groupBy<T extends StoreMovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StoreMovementGroupByArgs['orderBy'];
    } : {
        orderBy?: StoreMovementGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StoreMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StoreMovementFieldRefs;
}
export interface Prisma__StoreMovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    dispatchLine<T extends Prisma.StoreMovement$dispatchLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreMovement$dispatchLineArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    saleLine<T extends Prisma.StoreMovement$saleLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreMovement$saleLineArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    adjustment<T extends Prisma.StoreMovement$adjustmentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreMovement$adjustmentArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StoreMovementFieldRefs {
    readonly id: Prisma.FieldRef<"StoreMovement", 'String'>;
    readonly productId: Prisma.FieldRef<"StoreMovement", 'String'>;
    readonly quantity: Prisma.FieldRef<"StoreMovement", 'Decimal'>;
    readonly movementType: Prisma.FieldRef<"StoreMovement", 'String'>;
    readonly postedAt: Prisma.FieldRef<"StoreMovement", 'DateTime'>;
    readonly dispatchLineId: Prisma.FieldRef<"StoreMovement", 'String'>;
    readonly saleLineId: Prisma.FieldRef<"StoreMovement", 'String'>;
    readonly adjustmentId: Prisma.FieldRef<"StoreMovement", 'String'>;
}
export type StoreMovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where?: Prisma.StoreMovementWhereInput;
    orderBy?: Prisma.StoreMovementOrderByWithRelationInput | Prisma.StoreMovementOrderByWithRelationInput[];
    cursor?: Prisma.StoreMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreMovementScalarFieldEnum | Prisma.StoreMovementScalarFieldEnum[];
};
export type StoreMovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where?: Prisma.StoreMovementWhereInput;
    orderBy?: Prisma.StoreMovementOrderByWithRelationInput | Prisma.StoreMovementOrderByWithRelationInput[];
    cursor?: Prisma.StoreMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreMovementScalarFieldEnum | Prisma.StoreMovementScalarFieldEnum[];
};
export type StoreMovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where?: Prisma.StoreMovementWhereInput;
    orderBy?: Prisma.StoreMovementOrderByWithRelationInput | Prisma.StoreMovementOrderByWithRelationInput[];
    cursor?: Prisma.StoreMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreMovementScalarFieldEnum | Prisma.StoreMovementScalarFieldEnum[];
};
export type StoreMovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreMovementCreateInput, Prisma.StoreMovementUncheckedCreateInput>;
};
export type StoreMovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StoreMovementCreateManyInput | Prisma.StoreMovementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StoreMovementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    data: Prisma.StoreMovementCreateManyInput | Prisma.StoreMovementCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StoreMovementIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StoreMovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreMovementUpdateInput, Prisma.StoreMovementUncheckedUpdateInput>;
    where: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StoreMovementUpdateManyMutationInput, Prisma.StoreMovementUncheckedUpdateManyInput>;
    where?: Prisma.StoreMovementWhereInput;
    limit?: number;
};
export type StoreMovementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreMovementUpdateManyMutationInput, Prisma.StoreMovementUncheckedUpdateManyInput>;
    where?: Prisma.StoreMovementWhereInput;
    limit?: number;
    include?: Prisma.StoreMovementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StoreMovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where: Prisma.StoreMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreMovementCreateInput, Prisma.StoreMovementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StoreMovementUpdateInput, Prisma.StoreMovementUncheckedUpdateInput>;
};
export type StoreMovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where: Prisma.StoreMovementWhereUniqueInput;
};
export type StoreMovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreMovementWhereInput;
    limit?: number;
};
export type StoreMovement$dispatchLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreMovement$saleLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where?: Prisma.SaleLineWhereInput;
};
export type StoreMovement$adjustmentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where?: Prisma.StoreAdjustmentWhereInput;
};
export type StoreMovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
};
