import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StoreAdjustmentModel = runtime.Types.Result.DefaultSelection<Prisma.$StoreAdjustmentPayload>;
export type AggregateStoreAdjustment = {
    _count: StoreAdjustmentCountAggregateOutputType | null;
    _avg: StoreAdjustmentAvgAggregateOutputType | null;
    _sum: StoreAdjustmentSumAggregateOutputType | null;
    _min: StoreAdjustmentMinAggregateOutputType | null;
    _max: StoreAdjustmentMaxAggregateOutputType | null;
};
export type StoreAdjustmentAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type StoreAdjustmentSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type StoreAdjustmentMinAggregateOutputType = {
    lotId: string | null;
    id: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
    kind: string | null;
    reason: string | null;
    status: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type StoreAdjustmentMaxAggregateOutputType = {
    lotId: string | null;
    id: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
    kind: string | null;
    reason: string | null;
    status: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type StoreAdjustmentCountAggregateOutputType = {
    lotId: number;
    id: number;
    productId: number;
    quantity: number;
    kind: number;
    reason: number;
    status: number;
    requestedAt: number;
    approvedAt: number;
    requestedById: number;
    reviewedById: number;
    _all: number;
};
export type StoreAdjustmentAvgAggregateInputType = {
    quantity?: true;
};
export type StoreAdjustmentSumAggregateInputType = {
    quantity?: true;
};
export type StoreAdjustmentMinAggregateInputType = {
    lotId?: true;
    id?: true;
    productId?: true;
    quantity?: true;
    kind?: true;
    reason?: true;
    status?: true;
    requestedAt?: true;
    approvedAt?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type StoreAdjustmentMaxAggregateInputType = {
    lotId?: true;
    id?: true;
    productId?: true;
    quantity?: true;
    kind?: true;
    reason?: true;
    status?: true;
    requestedAt?: true;
    approvedAt?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type StoreAdjustmentCountAggregateInputType = {
    lotId?: true;
    id?: true;
    productId?: true;
    quantity?: true;
    kind?: true;
    reason?: true;
    status?: true;
    requestedAt?: true;
    approvedAt?: true;
    requestedById?: true;
    reviewedById?: true;
    _all?: true;
};
export type StoreAdjustmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreAdjustmentWhereInput;
    orderBy?: Prisma.StoreAdjustmentOrderByWithRelationInput | Prisma.StoreAdjustmentOrderByWithRelationInput[];
    cursor?: Prisma.StoreAdjustmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StoreAdjustmentCountAggregateInputType;
    _avg?: StoreAdjustmentAvgAggregateInputType;
    _sum?: StoreAdjustmentSumAggregateInputType;
    _min?: StoreAdjustmentMinAggregateInputType;
    _max?: StoreAdjustmentMaxAggregateInputType;
};
export type GetStoreAdjustmentAggregateType<T extends StoreAdjustmentAggregateArgs> = {
    [P in keyof T & keyof AggregateStoreAdjustment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStoreAdjustment[P]> : Prisma.GetScalarType<T[P], AggregateStoreAdjustment[P]>;
};
export type StoreAdjustmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreAdjustmentWhereInput;
    orderBy?: Prisma.StoreAdjustmentOrderByWithAggregationInput | Prisma.StoreAdjustmentOrderByWithAggregationInput[];
    by: Prisma.StoreAdjustmentScalarFieldEnum[] | Prisma.StoreAdjustmentScalarFieldEnum;
    having?: Prisma.StoreAdjustmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StoreAdjustmentCountAggregateInputType | true;
    _avg?: StoreAdjustmentAvgAggregateInputType;
    _sum?: StoreAdjustmentSumAggregateInputType;
    _min?: StoreAdjustmentMinAggregateInputType;
    _max?: StoreAdjustmentMaxAggregateInputType;
};
export type StoreAdjustmentGroupByOutputType = {
    lotId: string | null;
    id: string;
    productId: string;
    quantity: runtime.Decimal;
    kind: string;
    reason: string;
    status: string;
    requestedAt: Date;
    approvedAt: Date | null;
    requestedById: string;
    reviewedById: string | null;
    _count: StoreAdjustmentCountAggregateOutputType | null;
    _avg: StoreAdjustmentAvgAggregateOutputType | null;
    _sum: StoreAdjustmentSumAggregateOutputType | null;
    _min: StoreAdjustmentMinAggregateOutputType | null;
    _max: StoreAdjustmentMaxAggregateOutputType | null;
};
export type GetStoreAdjustmentGroupByPayload<T extends StoreAdjustmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StoreAdjustmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StoreAdjustmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StoreAdjustmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StoreAdjustmentGroupByOutputType[P]>;
}>>;
export type StoreAdjustmentWhereInput = {
    AND?: Prisma.StoreAdjustmentWhereInput | Prisma.StoreAdjustmentWhereInput[];
    OR?: Prisma.StoreAdjustmentWhereInput[];
    NOT?: Prisma.StoreAdjustmentWhereInput | Prisma.StoreAdjustmentWhereInput[];
    lotId?: Prisma.UuidNullableFilter<"StoreAdjustment"> | string | null;
    id?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    productId?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    quantity?: Prisma.DecimalFilter<"StoreAdjustment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFilter<"StoreAdjustment"> | string;
    reason?: Prisma.StringFilter<"StoreAdjustment"> | string;
    status?: Prisma.StringFilter<"StoreAdjustment"> | string;
    requestedAt?: Prisma.DateTimeFilter<"StoreAdjustment"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"StoreAdjustment"> | Date | string | null;
    requestedById?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"StoreAdjustment"> | string | null;
    lot?: Prisma.XOR<Prisma.ProductLotNullableScalarRelationFilter, Prisma.ProductLotWhereInput> | null;
    lotMovements?: Prisma.ProductLotMovementListRelationFilter;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    storeMovement?: Prisma.XOR<Prisma.StoreMovementNullableScalarRelationFilter, Prisma.StoreMovementWhereInput> | null;
    warehouseMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
};
export type StoreAdjustmentOrderByWithRelationInput = {
    lotId?: Prisma.SortOrderInput | Prisma.SortOrder;
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    lot?: Prisma.ProductLotOrderByWithRelationInput;
    lotMovements?: Prisma.ProductLotMovementOrderByRelationAggregateInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    requestedBy?: Prisma.EmployeeOrderByWithRelationInput;
    reviewedBy?: Prisma.EmployeeOrderByWithRelationInput;
    storeMovement?: Prisma.StoreMovementOrderByWithRelationInput;
    warehouseMovement?: Prisma.ProductMovementOrderByWithRelationInput;
};
export type StoreAdjustmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StoreAdjustmentWhereInput | Prisma.StoreAdjustmentWhereInput[];
    OR?: Prisma.StoreAdjustmentWhereInput[];
    NOT?: Prisma.StoreAdjustmentWhereInput | Prisma.StoreAdjustmentWhereInput[];
    lotId?: Prisma.UuidNullableFilter<"StoreAdjustment"> | string | null;
    productId?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    quantity?: Prisma.DecimalFilter<"StoreAdjustment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFilter<"StoreAdjustment"> | string;
    reason?: Prisma.StringFilter<"StoreAdjustment"> | string;
    status?: Prisma.StringFilter<"StoreAdjustment"> | string;
    requestedAt?: Prisma.DateTimeFilter<"StoreAdjustment"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"StoreAdjustment"> | Date | string | null;
    requestedById?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"StoreAdjustment"> | string | null;
    lot?: Prisma.XOR<Prisma.ProductLotNullableScalarRelationFilter, Prisma.ProductLotWhereInput> | null;
    lotMovements?: Prisma.ProductLotMovementListRelationFilter;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    storeMovement?: Prisma.XOR<Prisma.StoreMovementNullableScalarRelationFilter, Prisma.StoreMovementWhereInput> | null;
    warehouseMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
}, "id">;
export type StoreAdjustmentOrderByWithAggregationInput = {
    lotId?: Prisma.SortOrderInput | Prisma.SortOrder;
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StoreAdjustmentCountOrderByAggregateInput;
    _avg?: Prisma.StoreAdjustmentAvgOrderByAggregateInput;
    _max?: Prisma.StoreAdjustmentMaxOrderByAggregateInput;
    _min?: Prisma.StoreAdjustmentMinOrderByAggregateInput;
    _sum?: Prisma.StoreAdjustmentSumOrderByAggregateInput;
};
export type StoreAdjustmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.StoreAdjustmentScalarWhereWithAggregatesInput | Prisma.StoreAdjustmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.StoreAdjustmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StoreAdjustmentScalarWhereWithAggregatesInput | Prisma.StoreAdjustmentScalarWhereWithAggregatesInput[];
    lotId?: Prisma.UuidNullableWithAggregatesFilter<"StoreAdjustment"> | string | null;
    id?: Prisma.UuidWithAggregatesFilter<"StoreAdjustment"> | string;
    productId?: Prisma.UuidWithAggregatesFilter<"StoreAdjustment"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"StoreAdjustment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringWithAggregatesFilter<"StoreAdjustment"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"StoreAdjustment"> | string;
    status?: Prisma.StringWithAggregatesFilter<"StoreAdjustment"> | string;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"StoreAdjustment"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StoreAdjustment"> | Date | string | null;
    requestedById?: Prisma.UuidWithAggregatesFilter<"StoreAdjustment"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"StoreAdjustment"> | string | null;
};
export type StoreAdjustmentCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lot?: Prisma.ProductLotCreateNestedOneWithoutAdjustmentsInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutAdjustmentInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreAdjustmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedStoreAdjustmentsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedStoreAdjustmentsInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutAdjustmentInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lot?: Prisma.ProductLotUpdateOneWithoutAdjustmentsNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutAdjustmentNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedStoreAdjustmentsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedStoreAdjustmentsNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutAdjustmentNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentCreateManyInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
};
export type StoreAdjustmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StoreAdjustmentUncheckedUpdateManyInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreAdjustmentListRelationFilter = {
    every?: Prisma.StoreAdjustmentWhereInput;
    some?: Prisma.StoreAdjustmentWhereInput;
    none?: Prisma.StoreAdjustmentWhereInput;
};
export type StoreAdjustmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StoreAdjustmentNullableScalarRelationFilter = {
    is?: Prisma.StoreAdjustmentWhereInput | null;
    isNot?: Prisma.StoreAdjustmentWhereInput | null;
};
export type StoreAdjustmentCountOrderByAggregateInput = {
    lotId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type StoreAdjustmentAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type StoreAdjustmentMaxOrderByAggregateInput = {
    lotId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type StoreAdjustmentMinOrderByAggregateInput = {
    lotId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type StoreAdjustmentSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type StoreAdjustmentCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput> | Prisma.StoreAdjustmentCreateWithoutRequestedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyRequestedByInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput> | Prisma.StoreAdjustmentCreateWithoutReviewedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyReviewedByInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput> | Prisma.StoreAdjustmentCreateWithoutRequestedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyRequestedByInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput> | Prisma.StoreAdjustmentCreateWithoutReviewedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyReviewedByInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput> | Prisma.StoreAdjustmentCreateWithoutRequestedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyRequestedByInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutRequestedByInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput> | Prisma.StoreAdjustmentCreateWithoutReviewedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyReviewedByInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutReviewedByInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput> | Prisma.StoreAdjustmentCreateWithoutRequestedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyRequestedByInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutRequestedByInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput> | Prisma.StoreAdjustmentCreateWithoutReviewedByInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput | Prisma.StoreAdjustmentCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyReviewedByInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutReviewedByInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutProductInput, Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput> | Prisma.StoreAdjustmentCreateWithoutProductInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput | Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyProductInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutProductInput, Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput> | Prisma.StoreAdjustmentCreateWithoutProductInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput | Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyProductInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutProductInput, Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput> | Prisma.StoreAdjustmentCreateWithoutProductInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput | Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutProductInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyProductInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutProductInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutProductInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutProductInput, Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput> | Prisma.StoreAdjustmentCreateWithoutProductInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput | Prisma.StoreAdjustmentCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutProductInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyProductInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutProductInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutProductInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput> | Prisma.StoreAdjustmentCreateWithoutLotInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput | Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyLotInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentUncheckedCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput> | Prisma.StoreAdjustmentCreateWithoutLotInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput | Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyLotInputEnvelope;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
};
export type StoreAdjustmentUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput> | Prisma.StoreAdjustmentCreateWithoutLotInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput | Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutLotInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyLotInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutLotInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutLotInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentUncheckedUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput> | Prisma.StoreAdjustmentCreateWithoutLotInput[] | Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput | Prisma.StoreAdjustmentCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutLotInput | Prisma.StoreAdjustmentUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.StoreAdjustmentCreateManyLotInputEnvelope;
    set?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    disconnect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    delete?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    connect?: Prisma.StoreAdjustmentWhereUniqueInput | Prisma.StoreAdjustmentWhereUniqueInput[];
    update?: Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutLotInput | Prisma.StoreAdjustmentUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.StoreAdjustmentUpdateManyWithWhereWithoutLotInput | Prisma.StoreAdjustmentUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
};
export type StoreAdjustmentCreateNestedOneWithoutLotMovementsInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotMovementsInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotMovementsInput>;
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutLotMovementsInput;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput;
};
export type StoreAdjustmentUpdateOneWithoutLotMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotMovementsInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotMovementsInput>;
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutLotMovementsInput;
    upsert?: Prisma.StoreAdjustmentUpsertWithoutLotMovementsInput;
    disconnect?: Prisma.StoreAdjustmentWhereInput | boolean;
    delete?: Prisma.StoreAdjustmentWhereInput | boolean;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreAdjustmentUpdateToOneWithWhereWithoutLotMovementsInput, Prisma.StoreAdjustmentUpdateWithoutLotMovementsInput>, Prisma.StoreAdjustmentUncheckedUpdateWithoutLotMovementsInput>;
};
export type StoreAdjustmentCreateNestedOneWithoutWarehouseMovementInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutWarehouseMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutWarehouseMovementInput>;
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutWarehouseMovementInput;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput;
};
export type StoreAdjustmentUpdateOneWithoutWarehouseMovementNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutWarehouseMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutWarehouseMovementInput>;
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutWarehouseMovementInput;
    upsert?: Prisma.StoreAdjustmentUpsertWithoutWarehouseMovementInput;
    disconnect?: Prisma.StoreAdjustmentWhereInput | boolean;
    delete?: Prisma.StoreAdjustmentWhereInput | boolean;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreAdjustmentUpdateToOneWithWhereWithoutWarehouseMovementInput, Prisma.StoreAdjustmentUpdateWithoutWarehouseMovementInput>, Prisma.StoreAdjustmentUncheckedUpdateWithoutWarehouseMovementInput>;
};
export type StoreAdjustmentCreateNestedOneWithoutStoreMovementInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutStoreMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutStoreMovementInput>;
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutStoreMovementInput;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput;
};
export type StoreAdjustmentUpdateOneWithoutStoreMovementNestedInput = {
    create?: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutStoreMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutStoreMovementInput>;
    connectOrCreate?: Prisma.StoreAdjustmentCreateOrConnectWithoutStoreMovementInput;
    upsert?: Prisma.StoreAdjustmentUpsertWithoutStoreMovementInput;
    disconnect?: Prisma.StoreAdjustmentWhereInput | boolean;
    delete?: Prisma.StoreAdjustmentWhereInput | boolean;
    connect?: Prisma.StoreAdjustmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreAdjustmentUpdateToOneWithWhereWithoutStoreMovementInput, Prisma.StoreAdjustmentUpdateWithoutStoreMovementInput>, Prisma.StoreAdjustmentUncheckedUpdateWithoutStoreMovementInput>;
};
export type StoreAdjustmentCreateWithoutRequestedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lot?: Prisma.ProductLotCreateNestedOneWithoutAdjustmentsInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutAdjustmentInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreAdjustmentsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedStoreAdjustmentsInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateWithoutRequestedByInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    reviewedById?: string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutAdjustmentInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentCreateOrConnectWithoutRequestedByInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput>;
};
export type StoreAdjustmentCreateManyRequestedByInputEnvelope = {
    data: Prisma.StoreAdjustmentCreateManyRequestedByInput | Prisma.StoreAdjustmentCreateManyRequestedByInput[];
    skipDuplicates?: boolean;
};
export type StoreAdjustmentCreateWithoutReviewedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lot?: Prisma.ProductLotCreateNestedOneWithoutAdjustmentsInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutAdjustmentInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreAdjustmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedStoreAdjustmentsInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateWithoutReviewedByInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutAdjustmentInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput>;
};
export type StoreAdjustmentCreateManyReviewedByInputEnvelope = {
    data: Prisma.StoreAdjustmentCreateManyReviewedByInput | Prisma.StoreAdjustmentCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type StoreAdjustmentUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutRequestedByInput>;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutRequestedByInput>;
};
export type StoreAdjustmentUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutRequestedByInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutRequestedByInput>;
};
export type StoreAdjustmentUpdateManyWithWhereWithoutRequestedByInput = {
    where: Prisma.StoreAdjustmentScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateManyMutationInput, Prisma.StoreAdjustmentUncheckedUpdateManyWithoutRequestedByInput>;
};
export type StoreAdjustmentScalarWhereInput = {
    AND?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
    OR?: Prisma.StoreAdjustmentScalarWhereInput[];
    NOT?: Prisma.StoreAdjustmentScalarWhereInput | Prisma.StoreAdjustmentScalarWhereInput[];
    lotId?: Prisma.UuidNullableFilter<"StoreAdjustment"> | string | null;
    id?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    productId?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    quantity?: Prisma.DecimalFilter<"StoreAdjustment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFilter<"StoreAdjustment"> | string;
    reason?: Prisma.StringFilter<"StoreAdjustment"> | string;
    status?: Prisma.StringFilter<"StoreAdjustment"> | string;
    requestedAt?: Prisma.DateTimeFilter<"StoreAdjustment"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"StoreAdjustment"> | Date | string | null;
    requestedById?: Prisma.UuidFilter<"StoreAdjustment"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"StoreAdjustment"> | string | null;
};
export type StoreAdjustmentUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedCreateWithoutReviewedByInput>;
};
export type StoreAdjustmentUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutReviewedByInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutReviewedByInput>;
};
export type StoreAdjustmentUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.StoreAdjustmentScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateManyMutationInput, Prisma.StoreAdjustmentUncheckedUpdateManyWithoutReviewedByInput>;
};
export type StoreAdjustmentCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lot?: Prisma.ProductLotCreateNestedOneWithoutAdjustmentsInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutAdjustmentInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedStoreAdjustmentsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedStoreAdjustmentsInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateWithoutProductInput = {
    lotId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutAdjustmentInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentCreateOrConnectWithoutProductInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutProductInput, Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput>;
};
export type StoreAdjustmentCreateManyProductInputEnvelope = {
    data: Prisma.StoreAdjustmentCreateManyProductInput | Prisma.StoreAdjustmentCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type StoreAdjustmentUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutProductInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutProductInput, Prisma.StoreAdjustmentUncheckedCreateWithoutProductInput>;
};
export type StoreAdjustmentUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutProductInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutProductInput>;
};
export type StoreAdjustmentUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.StoreAdjustmentScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateManyMutationInput, Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductInput>;
};
export type StoreAdjustmentCreateWithoutLotInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutAdjustmentInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreAdjustmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedStoreAdjustmentsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedStoreAdjustmentsInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateWithoutLotInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutAdjustmentInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentCreateOrConnectWithoutLotInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput>;
};
export type StoreAdjustmentCreateManyLotInputEnvelope = {
    data: Prisma.StoreAdjustmentCreateManyLotInput | Prisma.StoreAdjustmentCreateManyLotInput[];
    skipDuplicates?: boolean;
};
export type StoreAdjustmentUpsertWithWhereUniqueWithoutLotInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutLotInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutLotInput>;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotInput>;
};
export type StoreAdjustmentUpdateWithWhereUniqueWithoutLotInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutLotInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutLotInput>;
};
export type StoreAdjustmentUpdateManyWithWhereWithoutLotInput = {
    where: Prisma.StoreAdjustmentScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateManyMutationInput, Prisma.StoreAdjustmentUncheckedUpdateManyWithoutLotInput>;
};
export type StoreAdjustmentCreateWithoutLotMovementsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lot?: Prisma.ProductLotCreateNestedOneWithoutAdjustmentsInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreAdjustmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedStoreAdjustmentsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedStoreAdjustmentsInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateWithoutLotMovementsInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentCreateOrConnectWithoutLotMovementsInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotMovementsInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotMovementsInput>;
};
export type StoreAdjustmentUpsertWithoutLotMovementsInput = {
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutLotMovementsInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutLotMovementsInput>;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutLotMovementsInput, Prisma.StoreAdjustmentUncheckedCreateWithoutLotMovementsInput>;
    where?: Prisma.StoreAdjustmentWhereInput;
};
export type StoreAdjustmentUpdateToOneWithWhereWithoutLotMovementsInput = {
    where?: Prisma.StoreAdjustmentWhereInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutLotMovementsInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutLotMovementsInput>;
};
export type StoreAdjustmentUpdateWithoutLotMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lot?: Prisma.ProductLotUpdateOneWithoutAdjustmentsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedStoreAdjustmentsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedStoreAdjustmentsNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateWithoutLotMovementsInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentCreateWithoutWarehouseMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lot?: Prisma.ProductLotCreateNestedOneWithoutAdjustmentsInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutAdjustmentInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreAdjustmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedStoreAdjustmentsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedStoreAdjustmentsInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateWithoutWarehouseMovementInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutAdjustmentInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutAdjustmentInput;
};
export type StoreAdjustmentCreateOrConnectWithoutWarehouseMovementInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutWarehouseMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutWarehouseMovementInput>;
};
export type StoreAdjustmentUpsertWithoutWarehouseMovementInput = {
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutWarehouseMovementInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutWarehouseMovementInput>;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutWarehouseMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutWarehouseMovementInput>;
    where?: Prisma.StoreAdjustmentWhereInput;
};
export type StoreAdjustmentUpdateToOneWithWhereWithoutWarehouseMovementInput = {
    where?: Prisma.StoreAdjustmentWhereInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutWarehouseMovementInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutWarehouseMovementInput>;
};
export type StoreAdjustmentUpdateWithoutWarehouseMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lot?: Prisma.ProductLotUpdateOneWithoutAdjustmentsNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutAdjustmentNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedStoreAdjustmentsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedStoreAdjustmentsNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateWithoutWarehouseMovementInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutAdjustmentNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput;
};
export type StoreAdjustmentCreateWithoutStoreMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    lot?: Prisma.ProductLotCreateNestedOneWithoutAdjustmentsInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutAdjustmentInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreAdjustmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedStoreAdjustmentsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedStoreAdjustmentsInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentUncheckedCreateWithoutStoreMovementInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutAdjustmentInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutStoreAdjustmentInput;
};
export type StoreAdjustmentCreateOrConnectWithoutStoreMovementInput = {
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutStoreMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutStoreMovementInput>;
};
export type StoreAdjustmentUpsertWithoutStoreMovementInput = {
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutStoreMovementInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutStoreMovementInput>;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateWithoutStoreMovementInput, Prisma.StoreAdjustmentUncheckedCreateWithoutStoreMovementInput>;
    where?: Prisma.StoreAdjustmentWhereInput;
};
export type StoreAdjustmentUpdateToOneWithWhereWithoutStoreMovementInput = {
    where?: Prisma.StoreAdjustmentWhereInput;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateWithoutStoreMovementInput, Prisma.StoreAdjustmentUncheckedUpdateWithoutStoreMovementInput>;
};
export type StoreAdjustmentUpdateWithoutStoreMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lot?: Prisma.ProductLotUpdateOneWithoutAdjustmentsNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutAdjustmentNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedStoreAdjustmentsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedStoreAdjustmentsNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateWithoutStoreMovementInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentCreateManyRequestedByInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    reviewedById?: string | null;
};
export type StoreAdjustmentCreateManyReviewedByInput = {
    lotId?: string | null;
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
};
export type StoreAdjustmentUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lot?: Prisma.ProductLotUpdateOneWithoutAdjustmentsNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutAdjustmentNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedStoreAdjustmentsNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateWithoutRequestedByInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutAdjustmentNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateManyWithoutRequestedByInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreAdjustmentUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lot?: Prisma.ProductLotUpdateOneWithoutAdjustmentsNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutAdjustmentNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedStoreAdjustmentsNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateWithoutReviewedByInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutAdjustmentNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateManyWithoutReviewedByInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StoreAdjustmentCreateManyProductInput = {
    lotId?: string | null;
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
};
export type StoreAdjustmentUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lot?: Prisma.ProductLotUpdateOneWithoutAdjustmentsNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutAdjustmentNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedStoreAdjustmentsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedStoreAdjustmentsNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateWithoutProductInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutAdjustmentNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateManyWithoutProductInput = {
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreAdjustmentCreateManyLotInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind: string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    requestedById: string;
    reviewedById?: string | null;
};
export type StoreAdjustmentUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutAdjustmentNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedStoreAdjustmentsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedStoreAdjustmentsNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutAdjustmentNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutAdjustmentNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutStoreAdjustmentNestedInput;
};
export type StoreAdjustmentUncheckedUpdateManyWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreAdjustmentCountOutputType = {
    lotMovements: number;
};
export type StoreAdjustmentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lotMovements?: boolean | StoreAdjustmentCountOutputTypeCountLotMovementsArgs;
};
export type StoreAdjustmentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentCountOutputTypeSelect<ExtArgs> | null;
};
export type StoreAdjustmentCountOutputTypeCountLotMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductLotMovementWhereInput;
};
export type StoreAdjustmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    lotId?: boolean;
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    kind?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    lot?: boolean | Prisma.StoreAdjustment$lotArgs<ExtArgs>;
    lotMovements?: boolean | Prisma.StoreAdjustment$lotMovementsArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreAdjustment$reviewedByArgs<ExtArgs>;
    storeMovement?: boolean | Prisma.StoreAdjustment$storeMovementArgs<ExtArgs>;
    warehouseMovement?: boolean | Prisma.StoreAdjustment$warehouseMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreAdjustmentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["storeAdjustment"]>;
export type StoreAdjustmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    lotId?: boolean;
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    kind?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    lot?: boolean | Prisma.StoreAdjustment$lotArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreAdjustment$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["storeAdjustment"]>;
export type StoreAdjustmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    lotId?: boolean;
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    kind?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    lot?: boolean | Prisma.StoreAdjustment$lotArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreAdjustment$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["storeAdjustment"]>;
export type StoreAdjustmentSelectScalar = {
    lotId?: boolean;
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    kind?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
};
export type StoreAdjustmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"lotId" | "id" | "productId" | "quantity" | "kind" | "reason" | "status" | "requestedAt" | "approvedAt" | "requestedById" | "reviewedById", ExtArgs["result"]["storeAdjustment"]>;
export type StoreAdjustmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.StoreAdjustment$lotArgs<ExtArgs>;
    lotMovements?: boolean | Prisma.StoreAdjustment$lotMovementsArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreAdjustment$reviewedByArgs<ExtArgs>;
    storeMovement?: boolean | Prisma.StoreAdjustment$storeMovementArgs<ExtArgs>;
    warehouseMovement?: boolean | Prisma.StoreAdjustment$warehouseMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreAdjustmentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StoreAdjustmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.StoreAdjustment$lotArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreAdjustment$reviewedByArgs<ExtArgs>;
};
export type StoreAdjustmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.StoreAdjustment$lotArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreAdjustment$reviewedByArgs<ExtArgs>;
};
export type $StoreAdjustmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StoreAdjustment";
    objects: {
        lot: Prisma.$ProductLotPayload<ExtArgs> | null;
        lotMovements: Prisma.$ProductLotMovementPayload<ExtArgs>[];
        product: Prisma.$ProductPayload<ExtArgs>;
        requestedBy: Prisma.$EmployeePayload<ExtArgs>;
        reviewedBy: Prisma.$EmployeePayload<ExtArgs> | null;
        storeMovement: Prisma.$StoreMovementPayload<ExtArgs> | null;
        warehouseMovement: Prisma.$ProductMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        lotId: string | null;
        id: string;
        productId: string;
        quantity: runtime.Decimal;
        kind: string;
        reason: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
    }, ExtArgs["result"]["storeAdjustment"]>;
    composites: {};
};
export type StoreAdjustmentGetPayload<S extends boolean | null | undefined | StoreAdjustmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload, S>;
export type StoreAdjustmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StoreAdjustmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StoreAdjustmentCountAggregateInputType | true;
};
export interface StoreAdjustmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StoreAdjustment'];
        meta: {
            name: 'StoreAdjustment';
        };
    };
    findUnique<T extends StoreAdjustmentFindUniqueArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StoreAdjustmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StoreAdjustmentFindFirstArgs>(args?: Prisma.SelectSubset<T, StoreAdjustmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StoreAdjustmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StoreAdjustmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StoreAdjustmentFindManyArgs>(args?: Prisma.SelectSubset<T, StoreAdjustmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StoreAdjustmentCreateArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentCreateArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StoreAdjustmentCreateManyArgs>(args?: Prisma.SelectSubset<T, StoreAdjustmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StoreAdjustmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StoreAdjustmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StoreAdjustmentDeleteArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentDeleteArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StoreAdjustmentUpdateArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentUpdateArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StoreAdjustmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, StoreAdjustmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StoreAdjustmentUpdateManyArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StoreAdjustmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StoreAdjustmentUpsertArgs>(args: Prisma.SelectSubset<T, StoreAdjustmentUpsertArgs<ExtArgs>>): Prisma.Prisma__StoreAdjustmentClient<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StoreAdjustmentCountArgs>(args?: Prisma.Subset<T, StoreAdjustmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StoreAdjustmentCountAggregateOutputType> : number>;
    aggregate<T extends StoreAdjustmentAggregateArgs>(args: Prisma.Subset<T, StoreAdjustmentAggregateArgs>): Prisma.PrismaPromise<GetStoreAdjustmentAggregateType<T>>;
    groupBy<T extends StoreAdjustmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StoreAdjustmentGroupByArgs['orderBy'];
    } : {
        orderBy?: StoreAdjustmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StoreAdjustmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreAdjustmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StoreAdjustmentFieldRefs;
}
export interface Prisma__StoreAdjustmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lot<T extends Prisma.StoreAdjustment$lotArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreAdjustment$lotArgs<ExtArgs>>): Prisma.Prisma__ProductLotClient<runtime.Types.Result.GetResult<Prisma.$ProductLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    lotMovements<T extends Prisma.StoreAdjustment$lotMovementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreAdjustment$lotMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductLotMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requestedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewedBy<T extends Prisma.StoreAdjustment$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreAdjustment$reviewedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    storeMovement<T extends Prisma.StoreAdjustment$storeMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreAdjustment$storeMovementArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    warehouseMovement<T extends Prisma.StoreAdjustment$warehouseMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreAdjustment$warehouseMovementArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StoreAdjustmentFieldRefs {
    readonly lotId: Prisma.FieldRef<"StoreAdjustment", 'String'>;
    readonly id: Prisma.FieldRef<"StoreAdjustment", 'String'>;
    readonly productId: Prisma.FieldRef<"StoreAdjustment", 'String'>;
    readonly quantity: Prisma.FieldRef<"StoreAdjustment", 'Decimal'>;
    readonly kind: Prisma.FieldRef<"StoreAdjustment", 'String'>;
    readonly reason: Prisma.FieldRef<"StoreAdjustment", 'String'>;
    readonly status: Prisma.FieldRef<"StoreAdjustment", 'String'>;
    readonly requestedAt: Prisma.FieldRef<"StoreAdjustment", 'DateTime'>;
    readonly approvedAt: Prisma.FieldRef<"StoreAdjustment", 'DateTime'>;
    readonly requestedById: Prisma.FieldRef<"StoreAdjustment", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"StoreAdjustment", 'String'>;
}
export type StoreAdjustmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where: Prisma.StoreAdjustmentWhereUniqueInput;
};
export type StoreAdjustmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where: Prisma.StoreAdjustmentWhereUniqueInput;
};
export type StoreAdjustmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where?: Prisma.StoreAdjustmentWhereInput;
    orderBy?: Prisma.StoreAdjustmentOrderByWithRelationInput | Prisma.StoreAdjustmentOrderByWithRelationInput[];
    cursor?: Prisma.StoreAdjustmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreAdjustmentScalarFieldEnum | Prisma.StoreAdjustmentScalarFieldEnum[];
};
export type StoreAdjustmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where?: Prisma.StoreAdjustmentWhereInput;
    orderBy?: Prisma.StoreAdjustmentOrderByWithRelationInput | Prisma.StoreAdjustmentOrderByWithRelationInput[];
    cursor?: Prisma.StoreAdjustmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreAdjustmentScalarFieldEnum | Prisma.StoreAdjustmentScalarFieldEnum[];
};
export type StoreAdjustmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where?: Prisma.StoreAdjustmentWhereInput;
    orderBy?: Prisma.StoreAdjustmentOrderByWithRelationInput | Prisma.StoreAdjustmentOrderByWithRelationInput[];
    cursor?: Prisma.StoreAdjustmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreAdjustmentScalarFieldEnum | Prisma.StoreAdjustmentScalarFieldEnum[];
};
export type StoreAdjustmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreAdjustmentCreateInput, Prisma.StoreAdjustmentUncheckedCreateInput>;
};
export type StoreAdjustmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StoreAdjustmentCreateManyInput | Prisma.StoreAdjustmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StoreAdjustmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    data: Prisma.StoreAdjustmentCreateManyInput | Prisma.StoreAdjustmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StoreAdjustmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StoreAdjustmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateInput, Prisma.StoreAdjustmentUncheckedUpdateInput>;
    where: Prisma.StoreAdjustmentWhereUniqueInput;
};
export type StoreAdjustmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateManyMutationInput, Prisma.StoreAdjustmentUncheckedUpdateManyInput>;
    where?: Prisma.StoreAdjustmentWhereInput;
    limit?: number;
};
export type StoreAdjustmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreAdjustmentUpdateManyMutationInput, Prisma.StoreAdjustmentUncheckedUpdateManyInput>;
    where?: Prisma.StoreAdjustmentWhereInput;
    limit?: number;
    include?: Prisma.StoreAdjustmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StoreAdjustmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where: Prisma.StoreAdjustmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreAdjustmentCreateInput, Prisma.StoreAdjustmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StoreAdjustmentUpdateInput, Prisma.StoreAdjustmentUncheckedUpdateInput>;
};
export type StoreAdjustmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where: Prisma.StoreAdjustmentWhereUniqueInput;
};
export type StoreAdjustmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreAdjustmentWhereInput;
    limit?: number;
};
export type StoreAdjustment$lotArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductLotSelect<ExtArgs> | null;
    omit?: Prisma.ProductLotOmit<ExtArgs> | null;
    include?: Prisma.ProductLotInclude<ExtArgs> | null;
    where?: Prisma.ProductLotWhereInput;
};
export type StoreAdjustment$lotMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductLotMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductLotMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductLotMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductLotMovementWhereInput;
    orderBy?: Prisma.ProductLotMovementOrderByWithRelationInput | Prisma.ProductLotMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductLotMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductLotMovementScalarFieldEnum | Prisma.ProductLotMovementScalarFieldEnum[];
};
export type StoreAdjustment$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type StoreAdjustment$storeMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where?: Prisma.StoreMovementWhereInput;
};
export type StoreAdjustment$warehouseMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
};
export type StoreAdjustmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
};
