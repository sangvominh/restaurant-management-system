import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialShortageModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialShortagePayload>;
export type AggregateMaterialShortage = {
    _count: MaterialShortageCountAggregateOutputType | null;
    _avg: MaterialShortageAvgAggregateOutputType | null;
    _sum: MaterialShortageSumAggregateOutputType | null;
    _min: MaterialShortageMinAggregateOutputType | null;
    _max: MaterialShortageMaxAggregateOutputType | null;
};
export type MaterialShortageAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type MaterialShortageSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type MaterialShortageMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    reason: string | null;
    status: string | null;
    requestedAt: Date | null;
    updatedAt: Date | null;
    reviewNote: string | null;
    productionOrderId: string | null;
    materialId: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type MaterialShortageMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    reason: string | null;
    status: string | null;
    requestedAt: Date | null;
    updatedAt: Date | null;
    reviewNote: string | null;
    productionOrderId: string | null;
    materialId: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type MaterialShortageCountAggregateOutputType = {
    id: number;
    quantity: number;
    reason: number;
    status: number;
    requestedAt: number;
    updatedAt: number;
    reviewNote: number;
    productionOrderId: number;
    materialId: number;
    requestedById: number;
    reviewedById: number;
    _all: number;
};
export type MaterialShortageAvgAggregateInputType = {
    quantity?: true;
};
export type MaterialShortageSumAggregateInputType = {
    quantity?: true;
};
export type MaterialShortageMinAggregateInputType = {
    id?: true;
    quantity?: true;
    reason?: true;
    status?: true;
    requestedAt?: true;
    updatedAt?: true;
    reviewNote?: true;
    productionOrderId?: true;
    materialId?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type MaterialShortageMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    reason?: true;
    status?: true;
    requestedAt?: true;
    updatedAt?: true;
    reviewNote?: true;
    productionOrderId?: true;
    materialId?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type MaterialShortageCountAggregateInputType = {
    id?: true;
    quantity?: true;
    reason?: true;
    status?: true;
    requestedAt?: true;
    updatedAt?: true;
    reviewNote?: true;
    productionOrderId?: true;
    materialId?: true;
    requestedById?: true;
    reviewedById?: true;
    _all?: true;
};
export type MaterialShortageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialShortageWhereInput;
    orderBy?: Prisma.MaterialShortageOrderByWithRelationInput | Prisma.MaterialShortageOrderByWithRelationInput[];
    cursor?: Prisma.MaterialShortageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialShortageCountAggregateInputType;
    _avg?: MaterialShortageAvgAggregateInputType;
    _sum?: MaterialShortageSumAggregateInputType;
    _min?: MaterialShortageMinAggregateInputType;
    _max?: MaterialShortageMaxAggregateInputType;
};
export type GetMaterialShortageAggregateType<T extends MaterialShortageAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialShortage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialShortage[P]> : Prisma.GetScalarType<T[P], AggregateMaterialShortage[P]>;
};
export type MaterialShortageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialShortageWhereInput;
    orderBy?: Prisma.MaterialShortageOrderByWithAggregationInput | Prisma.MaterialShortageOrderByWithAggregationInput[];
    by: Prisma.MaterialShortageScalarFieldEnum[] | Prisma.MaterialShortageScalarFieldEnum;
    having?: Prisma.MaterialShortageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialShortageCountAggregateInputType | true;
    _avg?: MaterialShortageAvgAggregateInputType;
    _sum?: MaterialShortageSumAggregateInputType;
    _min?: MaterialShortageMinAggregateInputType;
    _max?: MaterialShortageMaxAggregateInputType;
};
export type MaterialShortageGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    reason: string;
    status: string;
    requestedAt: Date;
    updatedAt: Date;
    reviewNote: string | null;
    productionOrderId: string;
    materialId: string;
    requestedById: string;
    reviewedById: string | null;
    _count: MaterialShortageCountAggregateOutputType | null;
    _avg: MaterialShortageAvgAggregateOutputType | null;
    _sum: MaterialShortageSumAggregateOutputType | null;
    _min: MaterialShortageMinAggregateOutputType | null;
    _max: MaterialShortageMaxAggregateOutputType | null;
};
export type GetMaterialShortageGroupByPayload<T extends MaterialShortageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialShortageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialShortageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialShortageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialShortageGroupByOutputType[P]>;
}>>;
export type MaterialShortageWhereInput = {
    AND?: Prisma.MaterialShortageWhereInput | Prisma.MaterialShortageWhereInput[];
    OR?: Prisma.MaterialShortageWhereInput[];
    NOT?: Prisma.MaterialShortageWhereInput | Prisma.MaterialShortageWhereInput[];
    id?: Prisma.UuidFilter<"MaterialShortage"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialShortage"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFilter<"MaterialShortage"> | string;
    status?: Prisma.StringFilter<"MaterialShortage"> | string;
    requestedAt?: Prisma.DateTimeFilter<"MaterialShortage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaterialShortage"> | Date | string;
    reviewNote?: Prisma.StringNullableFilter<"MaterialShortage"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"MaterialShortage"> | string;
    materialId?: Prisma.UuidFilter<"MaterialShortage"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialShortage"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialShortage"> | string | null;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderScalarRelationFilter, Prisma.ProductionOrderWhereInput>;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
};
export type MaterialShortageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrder?: Prisma.ProductionOrderOrderByWithRelationInput;
    material?: Prisma.MaterialOrderByWithRelationInput;
    requestedBy?: Prisma.EmployeeOrderByWithRelationInput;
    reviewedBy?: Prisma.EmployeeOrderByWithRelationInput;
};
export type MaterialShortageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MaterialShortageWhereInput | Prisma.MaterialShortageWhereInput[];
    OR?: Prisma.MaterialShortageWhereInput[];
    NOT?: Prisma.MaterialShortageWhereInput | Prisma.MaterialShortageWhereInput[];
    quantity?: Prisma.DecimalFilter<"MaterialShortage"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFilter<"MaterialShortage"> | string;
    status?: Prisma.StringFilter<"MaterialShortage"> | string;
    requestedAt?: Prisma.DateTimeFilter<"MaterialShortage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaterialShortage"> | Date | string;
    reviewNote?: Prisma.StringNullableFilter<"MaterialShortage"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"MaterialShortage"> | string;
    materialId?: Prisma.UuidFilter<"MaterialShortage"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialShortage"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialShortage"> | string | null;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderScalarRelationFilter, Prisma.ProductionOrderWhereInput>;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
}, "id">;
export type MaterialShortageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MaterialShortageCountOrderByAggregateInput;
    _avg?: Prisma.MaterialShortageAvgOrderByAggregateInput;
    _max?: Prisma.MaterialShortageMaxOrderByAggregateInput;
    _min?: Prisma.MaterialShortageMinOrderByAggregateInput;
    _sum?: Prisma.MaterialShortageSumOrderByAggregateInput;
};
export type MaterialShortageScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialShortageScalarWhereWithAggregatesInput | Prisma.MaterialShortageScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialShortageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialShortageScalarWhereWithAggregatesInput | Prisma.MaterialShortageScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialShortage"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"MaterialShortage"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringWithAggregatesFilter<"MaterialShortage"> | string;
    status?: Prisma.StringWithAggregatesFilter<"MaterialShortage"> | string;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"MaterialShortage"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MaterialShortage"> | Date | string;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"MaterialShortage"> | string | null;
    productionOrderId?: Prisma.UuidWithAggregatesFilter<"MaterialShortage"> | string;
    materialId?: Prisma.UuidWithAggregatesFilter<"MaterialShortage"> | string;
    requestedById?: Prisma.UuidWithAggregatesFilter<"MaterialShortage"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"MaterialShortage"> | string | null;
};
export type MaterialShortageCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialShortagesInput;
    material: Prisma.MaterialCreateNestedOneWithoutShortagesInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedMaterialShortagesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedMaterialShortagesInput;
};
export type MaterialShortageUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    materialId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialShortageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialShortagesNestedInput;
    material?: Prisma.MaterialUpdateOneRequiredWithoutShortagesNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedMaterialShortagesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedMaterialShortagesNestedInput;
};
export type MaterialShortageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    materialId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialShortageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageListRelationFilter = {
    every?: Prisma.MaterialShortageWhereInput;
    some?: Prisma.MaterialShortageWhereInput;
    none?: Prisma.MaterialShortageWhereInput;
};
export type MaterialShortageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialShortageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialShortageAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MaterialShortageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialShortageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialShortageSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MaterialShortageCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialShortageCreateWithoutRequestedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput | Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyRequestedByInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialShortageCreateWithoutReviewedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput | Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyReviewedByInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialShortageCreateWithoutRequestedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput | Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyRequestedByInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialShortageCreateWithoutReviewedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput | Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyReviewedByInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialShortageCreateWithoutRequestedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput | Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyRequestedByInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutRequestedByInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialShortageCreateWithoutReviewedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput | Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyReviewedByInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutReviewedByInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialShortageCreateWithoutRequestedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput | Prisma.MaterialShortageCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyRequestedByInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutRequestedByInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialShortageCreateWithoutReviewedByInput[] | Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput | Prisma.MaterialShortageCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.MaterialShortageCreateManyReviewedByInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutReviewedByInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutMaterialInput, Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput> | Prisma.MaterialShortageCreateWithoutMaterialInput[] | Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput | Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.MaterialShortageCreateManyMaterialInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutMaterialInput, Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput> | Prisma.MaterialShortageCreateWithoutMaterialInput[] | Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput | Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.MaterialShortageCreateManyMaterialInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutMaterialInput, Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput> | Prisma.MaterialShortageCreateWithoutMaterialInput[] | Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput | Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutMaterialInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.MaterialShortageCreateManyMaterialInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutMaterialInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutMaterialInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutMaterialInput, Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput> | Prisma.MaterialShortageCreateWithoutMaterialInput[] | Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput | Prisma.MaterialShortageCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutMaterialInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.MaterialShortageCreateManyMaterialInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutMaterialInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutMaterialInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialShortageCreateWithoutProductionOrderInput[] | Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialShortageCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageUncheckedCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialShortageCreateWithoutProductionOrderInput[] | Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialShortageCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
};
export type MaterialShortageUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialShortageCreateWithoutProductionOrderInput[] | Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialShortageCreateManyProductionOrderInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutProductionOrderInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageUncheckedUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialShortageCreateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialShortageCreateWithoutProductionOrderInput[] | Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialShortageCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.MaterialShortageUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialShortageUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialShortageCreateManyProductionOrderInputEnvelope;
    set?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    disconnect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    delete?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    connect?: Prisma.MaterialShortageWhereUniqueInput | Prisma.MaterialShortageWhereUniqueInput[];
    update?: Prisma.MaterialShortageUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialShortageUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.MaterialShortageUpdateManyWithWhereWithoutProductionOrderInput | Prisma.MaterialShortageUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
};
export type MaterialShortageCreateWithoutRequestedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialShortagesInput;
    material: Prisma.MaterialCreateNestedOneWithoutShortagesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedMaterialShortagesInput;
};
export type MaterialShortageUncheckedCreateWithoutRequestedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    materialId: string;
    reviewedById?: string | null;
};
export type MaterialShortageCreateOrConnectWithoutRequestedByInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput>;
};
export type MaterialShortageCreateManyRequestedByInputEnvelope = {
    data: Prisma.MaterialShortageCreateManyRequestedByInput | Prisma.MaterialShortageCreateManyRequestedByInput[];
    skipDuplicates?: boolean;
};
export type MaterialShortageCreateWithoutReviewedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialShortagesInput;
    material: Prisma.MaterialCreateNestedOneWithoutShortagesInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedMaterialShortagesInput;
};
export type MaterialShortageUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    materialId: string;
    requestedById: string;
};
export type MaterialShortageCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput>;
};
export type MaterialShortageCreateManyReviewedByInputEnvelope = {
    data: Prisma.MaterialShortageCreateManyReviewedByInput | Prisma.MaterialShortageCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type MaterialShortageUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedUpdateWithoutRequestedByInput>;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedCreateWithoutRequestedByInput>;
};
export type MaterialShortageUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutRequestedByInput, Prisma.MaterialShortageUncheckedUpdateWithoutRequestedByInput>;
};
export type MaterialShortageUpdateManyWithWhereWithoutRequestedByInput = {
    where: Prisma.MaterialShortageScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateManyMutationInput, Prisma.MaterialShortageUncheckedUpdateManyWithoutRequestedByInput>;
};
export type MaterialShortageScalarWhereInput = {
    AND?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
    OR?: Prisma.MaterialShortageScalarWhereInput[];
    NOT?: Prisma.MaterialShortageScalarWhereInput | Prisma.MaterialShortageScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialShortage"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialShortage"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFilter<"MaterialShortage"> | string;
    status?: Prisma.StringFilter<"MaterialShortage"> | string;
    requestedAt?: Prisma.DateTimeFilter<"MaterialShortage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaterialShortage"> | Date | string;
    reviewNote?: Prisma.StringNullableFilter<"MaterialShortage"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"MaterialShortage"> | string;
    materialId?: Prisma.UuidFilter<"MaterialShortage"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialShortage"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialShortage"> | string | null;
};
export type MaterialShortageUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedCreateWithoutReviewedByInput>;
};
export type MaterialShortageUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutReviewedByInput, Prisma.MaterialShortageUncheckedUpdateWithoutReviewedByInput>;
};
export type MaterialShortageUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.MaterialShortageScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateManyMutationInput, Prisma.MaterialShortageUncheckedUpdateManyWithoutReviewedByInput>;
};
export type MaterialShortageCreateWithoutMaterialInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialShortagesInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedMaterialShortagesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedMaterialShortagesInput;
};
export type MaterialShortageUncheckedCreateWithoutMaterialInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialShortageCreateOrConnectWithoutMaterialInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutMaterialInput, Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput>;
};
export type MaterialShortageCreateManyMaterialInputEnvelope = {
    data: Prisma.MaterialShortageCreateManyMaterialInput | Prisma.MaterialShortageCreateManyMaterialInput[];
    skipDuplicates?: boolean;
};
export type MaterialShortageUpsertWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutMaterialInput, Prisma.MaterialShortageUncheckedUpdateWithoutMaterialInput>;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutMaterialInput, Prisma.MaterialShortageUncheckedCreateWithoutMaterialInput>;
};
export type MaterialShortageUpdateWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutMaterialInput, Prisma.MaterialShortageUncheckedUpdateWithoutMaterialInput>;
};
export type MaterialShortageUpdateManyWithWhereWithoutMaterialInput = {
    where: Prisma.MaterialShortageScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateManyMutationInput, Prisma.MaterialShortageUncheckedUpdateManyWithoutMaterialInput>;
};
export type MaterialShortageCreateWithoutProductionOrderInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    material: Prisma.MaterialCreateNestedOneWithoutShortagesInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedMaterialShortagesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedMaterialShortagesInput;
};
export type MaterialShortageUncheckedCreateWithoutProductionOrderInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    materialId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialShortageCreateOrConnectWithoutProductionOrderInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput>;
};
export type MaterialShortageCreateManyProductionOrderInputEnvelope = {
    data: Prisma.MaterialShortageCreateManyProductionOrderInput | Prisma.MaterialShortageCreateManyProductionOrderInput[];
    skipDuplicates?: boolean;
};
export type MaterialShortageUpsertWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedUpdateWithoutProductionOrderInput>;
    create: Prisma.XOR<Prisma.MaterialShortageCreateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedCreateWithoutProductionOrderInput>;
};
export type MaterialShortageUpdateWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.MaterialShortageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateWithoutProductionOrderInput, Prisma.MaterialShortageUncheckedUpdateWithoutProductionOrderInput>;
};
export type MaterialShortageUpdateManyWithWhereWithoutProductionOrderInput = {
    where: Prisma.MaterialShortageScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateManyMutationInput, Prisma.MaterialShortageUncheckedUpdateManyWithoutProductionOrderInput>;
};
export type MaterialShortageCreateManyRequestedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    materialId: string;
    reviewedById?: string | null;
};
export type MaterialShortageCreateManyReviewedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    materialId: string;
    requestedById: string;
};
export type MaterialShortageUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialShortagesNestedInput;
    material?: Prisma.MaterialUpdateOneRequiredWithoutShortagesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedMaterialShortagesNestedInput;
};
export type MaterialShortageUncheckedUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageUncheckedUpdateManyWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialShortagesNestedInput;
    material?: Prisma.MaterialUpdateOneRequiredWithoutShortagesNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedMaterialShortagesNestedInput;
};
export type MaterialShortageUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialShortageUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialShortageCreateManyMaterialInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    productionOrderId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialShortageUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialShortagesNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedMaterialShortagesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedMaterialShortagesNestedInput;
};
export type MaterialShortageUncheckedUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageUncheckedUpdateManyWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageCreateManyProductionOrderInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    status?: string;
    requestedAt?: Date | string;
    updatedAt?: Date | string;
    reviewNote?: string | null;
    materialId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialShortageUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    material?: Prisma.MaterialUpdateOneRequiredWithoutShortagesNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedMaterialShortagesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedMaterialShortagesNestedInput;
};
export type MaterialShortageUncheckedUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageUncheckedUpdateManyWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialShortageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    updatedAt?: boolean;
    reviewNote?: boolean;
    productionOrderId?: boolean;
    materialId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialShortage$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["materialShortage"]>;
export type MaterialShortageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    updatedAt?: boolean;
    reviewNote?: boolean;
    productionOrderId?: boolean;
    materialId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialShortage$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["materialShortage"]>;
export type MaterialShortageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    updatedAt?: boolean;
    reviewNote?: boolean;
    productionOrderId?: boolean;
    materialId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialShortage$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["materialShortage"]>;
export type MaterialShortageSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    reason?: boolean;
    status?: boolean;
    requestedAt?: boolean;
    updatedAt?: boolean;
    reviewNote?: boolean;
    productionOrderId?: boolean;
    materialId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
};
export type MaterialShortageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "reason" | "status" | "requestedAt" | "updatedAt" | "reviewNote" | "productionOrderId" | "materialId" | "requestedById" | "reviewedById", ExtArgs["result"]["materialShortage"]>;
export type MaterialShortageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialShortage$reviewedByArgs<ExtArgs>;
};
export type MaterialShortageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialShortage$reviewedByArgs<ExtArgs>;
};
export type MaterialShortageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialShortage$reviewedByArgs<ExtArgs>;
};
export type $MaterialShortagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialShortage";
    objects: {
        productionOrder: Prisma.$ProductionOrderPayload<ExtArgs>;
        material: Prisma.$MaterialPayload<ExtArgs>;
        requestedBy: Prisma.$EmployeePayload<ExtArgs>;
        reviewedBy: Prisma.$EmployeePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        reason: string;
        status: string;
        requestedAt: Date;
        updatedAt: Date;
        reviewNote: string | null;
        productionOrderId: string;
        materialId: string;
        requestedById: string;
        reviewedById: string | null;
    }, ExtArgs["result"]["materialShortage"]>;
    composites: {};
};
export type MaterialShortageGetPayload<S extends boolean | null | undefined | MaterialShortageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload, S>;
export type MaterialShortageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialShortageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialShortageCountAggregateInputType | true;
};
export interface MaterialShortageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialShortage'];
        meta: {
            name: 'MaterialShortage';
        };
    };
    findUnique<T extends MaterialShortageFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialShortageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialShortageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialShortageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialShortageFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialShortageFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialShortageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialShortageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialShortageFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialShortageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialShortageCreateArgs>(args: Prisma.SelectSubset<T, MaterialShortageCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialShortageCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialShortageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialShortageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialShortageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialShortageDeleteArgs>(args: Prisma.SelectSubset<T, MaterialShortageDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialShortageUpdateArgs>(args: Prisma.SelectSubset<T, MaterialShortageUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialShortageDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialShortageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialShortageUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialShortageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialShortageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialShortageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialShortageUpsertArgs>(args: Prisma.SelectSubset<T, MaterialShortageUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialShortageClient<runtime.Types.Result.GetResult<Prisma.$MaterialShortagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialShortageCountArgs>(args?: Prisma.Subset<T, MaterialShortageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialShortageCountAggregateOutputType> : number>;
    aggregate<T extends MaterialShortageAggregateArgs>(args: Prisma.Subset<T, MaterialShortageAggregateArgs>): Prisma.PrismaPromise<GetMaterialShortageAggregateType<T>>;
    groupBy<T extends MaterialShortageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialShortageGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialShortageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialShortageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialShortageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialShortageFieldRefs;
}
export interface Prisma__MaterialShortageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    productionOrder<T extends Prisma.ProductionOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    material<T extends Prisma.MaterialDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requestedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewedBy<T extends Prisma.MaterialShortage$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialShortage$reviewedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialShortageFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialShortage", 'String'>;
    readonly quantity: Prisma.FieldRef<"MaterialShortage", 'Decimal'>;
    readonly reason: Prisma.FieldRef<"MaterialShortage", 'String'>;
    readonly status: Prisma.FieldRef<"MaterialShortage", 'String'>;
    readonly requestedAt: Prisma.FieldRef<"MaterialShortage", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MaterialShortage", 'DateTime'>;
    readonly reviewNote: Prisma.FieldRef<"MaterialShortage", 'String'>;
    readonly productionOrderId: Prisma.FieldRef<"MaterialShortage", 'String'>;
    readonly materialId: Prisma.FieldRef<"MaterialShortage", 'String'>;
    readonly requestedById: Prisma.FieldRef<"MaterialShortage", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"MaterialShortage", 'String'>;
}
export type MaterialShortageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    where: Prisma.MaterialShortageWhereUniqueInput;
};
export type MaterialShortageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    where: Prisma.MaterialShortageWhereUniqueInput;
};
export type MaterialShortageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    where?: Prisma.MaterialShortageWhereInput;
    orderBy?: Prisma.MaterialShortageOrderByWithRelationInput | Prisma.MaterialShortageOrderByWithRelationInput[];
    cursor?: Prisma.MaterialShortageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialShortageScalarFieldEnum | Prisma.MaterialShortageScalarFieldEnum[];
};
export type MaterialShortageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    where?: Prisma.MaterialShortageWhereInput;
    orderBy?: Prisma.MaterialShortageOrderByWithRelationInput | Prisma.MaterialShortageOrderByWithRelationInput[];
    cursor?: Prisma.MaterialShortageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialShortageScalarFieldEnum | Prisma.MaterialShortageScalarFieldEnum[];
};
export type MaterialShortageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    where?: Prisma.MaterialShortageWhereInput;
    orderBy?: Prisma.MaterialShortageOrderByWithRelationInput | Prisma.MaterialShortageOrderByWithRelationInput[];
    cursor?: Prisma.MaterialShortageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialShortageScalarFieldEnum | Prisma.MaterialShortageScalarFieldEnum[];
};
export type MaterialShortageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialShortageCreateInput, Prisma.MaterialShortageUncheckedCreateInput>;
};
export type MaterialShortageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialShortageCreateManyInput | Prisma.MaterialShortageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialShortageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    data: Prisma.MaterialShortageCreateManyInput | Prisma.MaterialShortageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialShortageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialShortageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateInput, Prisma.MaterialShortageUncheckedUpdateInput>;
    where: Prisma.MaterialShortageWhereUniqueInput;
};
export type MaterialShortageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialShortageUpdateManyMutationInput, Prisma.MaterialShortageUncheckedUpdateManyInput>;
    where?: Prisma.MaterialShortageWhereInput;
    limit?: number;
};
export type MaterialShortageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialShortageUpdateManyMutationInput, Prisma.MaterialShortageUncheckedUpdateManyInput>;
    where?: Prisma.MaterialShortageWhereInput;
    limit?: number;
    include?: Prisma.MaterialShortageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialShortageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    where: Prisma.MaterialShortageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialShortageCreateInput, Prisma.MaterialShortageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialShortageUpdateInput, Prisma.MaterialShortageUncheckedUpdateInput>;
};
export type MaterialShortageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
    where: Prisma.MaterialShortageWhereUniqueInput;
};
export type MaterialShortageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialShortageWhereInput;
    limit?: number;
};
export type MaterialShortage$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type MaterialShortageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialShortageSelect<ExtArgs> | null;
    omit?: Prisma.MaterialShortageOmit<ExtArgs> | null;
    include?: Prisma.MaterialShortageInclude<ExtArgs> | null;
};
