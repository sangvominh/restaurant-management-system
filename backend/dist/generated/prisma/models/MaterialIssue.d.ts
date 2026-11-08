import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialIssueModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialIssuePayload>;
export type AggregateMaterialIssue = {
    _count: MaterialIssueCountAggregateOutputType | null;
    _min: MaterialIssueMinAggregateOutputType | null;
    _max: MaterialIssueMaxAggregateOutputType | null;
};
export type MaterialIssueMinAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    productionOrderId: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type MaterialIssueMaxAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    productionOrderId: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type MaterialIssueCountAggregateOutputType = {
    id: number;
    requestedAt: number;
    approvedAt: number;
    status: number;
    reason: number;
    productionOrderId: number;
    requestedById: number;
    reviewedById: number;
    _all: number;
};
export type MaterialIssueMinAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    productionOrderId?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type MaterialIssueMaxAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    productionOrderId?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type MaterialIssueCountAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    productionOrderId?: true;
    requestedById?: true;
    reviewedById?: true;
    _all?: true;
};
export type MaterialIssueAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueWhereInput;
    orderBy?: Prisma.MaterialIssueOrderByWithRelationInput | Prisma.MaterialIssueOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialIssueCountAggregateInputType;
    _min?: MaterialIssueMinAggregateInputType;
    _max?: MaterialIssueMaxAggregateInputType;
};
export type GetMaterialIssueAggregateType<T extends MaterialIssueAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialIssue]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialIssue[P]> : Prisma.GetScalarType<T[P], AggregateMaterialIssue[P]>;
};
export type MaterialIssueGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueWhereInput;
    orderBy?: Prisma.MaterialIssueOrderByWithAggregationInput | Prisma.MaterialIssueOrderByWithAggregationInput[];
    by: Prisma.MaterialIssueScalarFieldEnum[] | Prisma.MaterialIssueScalarFieldEnum;
    having?: Prisma.MaterialIssueScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialIssueCountAggregateInputType | true;
    _min?: MaterialIssueMinAggregateInputType;
    _max?: MaterialIssueMaxAggregateInputType;
};
export type MaterialIssueGroupByOutputType = {
    id: string;
    requestedAt: Date;
    approvedAt: Date | null;
    status: string;
    reason: string | null;
    productionOrderId: string;
    requestedById: string;
    reviewedById: string | null;
    _count: MaterialIssueCountAggregateOutputType | null;
    _min: MaterialIssueMinAggregateOutputType | null;
    _max: MaterialIssueMaxAggregateOutputType | null;
};
export type GetMaterialIssueGroupByPayload<T extends MaterialIssueGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialIssueGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialIssueGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialIssueGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialIssueGroupByOutputType[P]>;
}>>;
export type MaterialIssueWhereInput = {
    AND?: Prisma.MaterialIssueWhereInput | Prisma.MaterialIssueWhereInput[];
    OR?: Prisma.MaterialIssueWhereInput[];
    NOT?: Prisma.MaterialIssueWhereInput | Prisma.MaterialIssueWhereInput[];
    id?: Prisma.UuidFilter<"MaterialIssue"> | string;
    requestedAt?: Prisma.DateTimeFilter<"MaterialIssue"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"MaterialIssue"> | Date | string | null;
    status?: Prisma.StringFilter<"MaterialIssue"> | string;
    reason?: Prisma.StringNullableFilter<"MaterialIssue"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"MaterialIssue"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialIssue"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialIssue"> | string | null;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderScalarRelationFilter, Prisma.ProductionOrderWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.MaterialIssueLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
};
export type MaterialIssueOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrder?: Prisma.ProductionOrderOrderByWithRelationInput;
    requestedBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.MaterialIssueLineOrderByRelationAggregateInput;
    reviewedBy?: Prisma.EmployeeOrderByWithRelationInput;
};
export type MaterialIssueWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MaterialIssueWhereInput | Prisma.MaterialIssueWhereInput[];
    OR?: Prisma.MaterialIssueWhereInput[];
    NOT?: Prisma.MaterialIssueWhereInput | Prisma.MaterialIssueWhereInput[];
    requestedAt?: Prisma.DateTimeFilter<"MaterialIssue"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"MaterialIssue"> | Date | string | null;
    status?: Prisma.StringFilter<"MaterialIssue"> | string;
    reason?: Prisma.StringNullableFilter<"MaterialIssue"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"MaterialIssue"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialIssue"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialIssue"> | string | null;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderScalarRelationFilter, Prisma.ProductionOrderWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.MaterialIssueLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
}, "id">;
export type MaterialIssueOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MaterialIssueCountOrderByAggregateInput;
    _max?: Prisma.MaterialIssueMaxOrderByAggregateInput;
    _min?: Prisma.MaterialIssueMinOrderByAggregateInput;
};
export type MaterialIssueScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialIssueScalarWhereWithAggregatesInput | Prisma.MaterialIssueScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialIssueScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialIssueScalarWhereWithAggregatesInput | Prisma.MaterialIssueScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialIssue"> | string;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"MaterialIssue"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MaterialIssue"> | Date | string | null;
    status?: Prisma.StringWithAggregatesFilter<"MaterialIssue"> | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"MaterialIssue"> | string | null;
    productionOrderId?: Prisma.UuidWithAggregatesFilter<"MaterialIssue"> | string;
    requestedById?: Prisma.UuidWithAggregatesFilter<"MaterialIssue"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"MaterialIssue"> | string | null;
};
export type MaterialIssueCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialIssuesInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedIssuesInput;
    lines?: Prisma.MaterialIssueLineCreateNestedManyWithoutIssueInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedIssuesInput;
};
export type MaterialIssueUncheckedCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrderId: string;
    requestedById: string;
    reviewedById?: string | null;
    lines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutIssueInput;
};
export type MaterialIssueUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialIssuesNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedIssuesNestedInput;
    lines?: Prisma.MaterialIssueLineUpdateManyWithoutIssueNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedIssuesNestedInput;
};
export type MaterialIssueUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutIssueNestedInput;
};
export type MaterialIssueCreateManyInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrderId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialIssueUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialIssueUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialIssueListRelationFilter = {
    every?: Prisma.MaterialIssueWhereInput;
    some?: Prisma.MaterialIssueWhereInput;
    none?: Prisma.MaterialIssueWhereInput;
};
export type MaterialIssueOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialIssueCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialIssueMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialIssueMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialIssueScalarRelationFilter = {
    is?: Prisma.MaterialIssueWhereInput;
    isNot?: Prisma.MaterialIssueWhereInput;
};
export type MaterialIssueCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialIssueCreateWithoutRequestedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput | Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyRequestedByInputEnvelope;
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
};
export type MaterialIssueCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialIssueCreateWithoutReviewedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput | Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyReviewedByInputEnvelope;
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
};
export type MaterialIssueUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialIssueCreateWithoutRequestedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput | Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyRequestedByInputEnvelope;
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
};
export type MaterialIssueUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialIssueCreateWithoutReviewedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput | Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyReviewedByInputEnvelope;
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
};
export type MaterialIssueUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialIssueCreateWithoutRequestedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput | Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.MaterialIssueUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialIssueUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyRequestedByInputEnvelope;
    set?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    delete?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    update?: Prisma.MaterialIssueUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialIssueUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.MaterialIssueUpdateManyWithWhereWithoutRequestedByInput | Prisma.MaterialIssueUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
};
export type MaterialIssueUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialIssueCreateWithoutReviewedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput | Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.MaterialIssueUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialIssueUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyReviewedByInputEnvelope;
    set?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    delete?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    update?: Prisma.MaterialIssueUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialIssueUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.MaterialIssueUpdateManyWithWhereWithoutReviewedByInput | Prisma.MaterialIssueUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
};
export type MaterialIssueUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialIssueCreateWithoutRequestedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput | Prisma.MaterialIssueCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.MaterialIssueUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialIssueUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyRequestedByInputEnvelope;
    set?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    delete?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    update?: Prisma.MaterialIssueUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialIssueUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.MaterialIssueUpdateManyWithWhereWithoutRequestedByInput | Prisma.MaterialIssueUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
};
export type MaterialIssueUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialIssueCreateWithoutReviewedByInput[] | Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput | Prisma.MaterialIssueCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.MaterialIssueUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialIssueUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.MaterialIssueCreateManyReviewedByInputEnvelope;
    set?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    delete?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    update?: Prisma.MaterialIssueUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialIssueUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.MaterialIssueUpdateManyWithWhereWithoutReviewedByInput | Prisma.MaterialIssueUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
};
export type MaterialIssueCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutLinesInput, Prisma.MaterialIssueUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutLinesInput;
    connect?: Prisma.MaterialIssueWhereUniqueInput;
};
export type MaterialIssueUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutLinesInput, Prisma.MaterialIssueUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.MaterialIssueUpsertWithoutLinesInput;
    connect?: Prisma.MaterialIssueWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialIssueUpdateToOneWithWhereWithoutLinesInput, Prisma.MaterialIssueUpdateWithoutLinesInput>, Prisma.MaterialIssueUncheckedUpdateWithoutLinesInput>;
};
export type MaterialIssueCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialIssueCreateWithoutProductionOrderInput[] | Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialIssueCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
};
export type MaterialIssueUncheckedCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialIssueCreateWithoutProductionOrderInput[] | Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialIssueCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
};
export type MaterialIssueUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialIssueCreateWithoutProductionOrderInput[] | Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.MaterialIssueUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialIssueUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialIssueCreateManyProductionOrderInputEnvelope;
    set?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    delete?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    update?: Prisma.MaterialIssueUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialIssueUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.MaterialIssueUpdateManyWithWhereWithoutProductionOrderInput | Prisma.MaterialIssueUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
};
export type MaterialIssueUncheckedUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueCreateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput> | Prisma.MaterialIssueCreateWithoutProductionOrderInput[] | Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput | Prisma.MaterialIssueCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.MaterialIssueUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialIssueUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.MaterialIssueCreateManyProductionOrderInputEnvelope;
    set?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    delete?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    connect?: Prisma.MaterialIssueWhereUniqueInput | Prisma.MaterialIssueWhereUniqueInput[];
    update?: Prisma.MaterialIssueUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.MaterialIssueUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.MaterialIssueUpdateManyWithWhereWithoutProductionOrderInput | Prisma.MaterialIssueUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
};
export type MaterialIssueCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialIssuesInput;
    lines?: Prisma.MaterialIssueLineCreateNestedManyWithoutIssueInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedIssuesInput;
};
export type MaterialIssueUncheckedCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrderId: string;
    reviewedById?: string | null;
    lines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutIssueInput;
};
export type MaterialIssueCreateOrConnectWithoutRequestedByInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput>;
};
export type MaterialIssueCreateManyRequestedByInputEnvelope = {
    data: Prisma.MaterialIssueCreateManyRequestedByInput | Prisma.MaterialIssueCreateManyRequestedByInput[];
    skipDuplicates?: boolean;
};
export type MaterialIssueCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialIssuesInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedIssuesInput;
    lines?: Prisma.MaterialIssueLineCreateNestedManyWithoutIssueInput;
};
export type MaterialIssueUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrderId: string;
    requestedById: string;
    lines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutIssueInput;
};
export type MaterialIssueCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput>;
};
export type MaterialIssueCreateManyReviewedByInputEnvelope = {
    data: Prisma.MaterialIssueCreateManyReviewedByInput | Prisma.MaterialIssueCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type MaterialIssueUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedUpdateWithoutRequestedByInput>;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedCreateWithoutRequestedByInput>;
};
export type MaterialIssueUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutRequestedByInput, Prisma.MaterialIssueUncheckedUpdateWithoutRequestedByInput>;
};
export type MaterialIssueUpdateManyWithWhereWithoutRequestedByInput = {
    where: Prisma.MaterialIssueScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateManyMutationInput, Prisma.MaterialIssueUncheckedUpdateManyWithoutRequestedByInput>;
};
export type MaterialIssueScalarWhereInput = {
    AND?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
    OR?: Prisma.MaterialIssueScalarWhereInput[];
    NOT?: Prisma.MaterialIssueScalarWhereInput | Prisma.MaterialIssueScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialIssue"> | string;
    requestedAt?: Prisma.DateTimeFilter<"MaterialIssue"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"MaterialIssue"> | Date | string | null;
    status?: Prisma.StringFilter<"MaterialIssue"> | string;
    reason?: Prisma.StringNullableFilter<"MaterialIssue"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"MaterialIssue"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialIssue"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialIssue"> | string | null;
};
export type MaterialIssueUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedCreateWithoutReviewedByInput>;
};
export type MaterialIssueUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutReviewedByInput, Prisma.MaterialIssueUncheckedUpdateWithoutReviewedByInput>;
};
export type MaterialIssueUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.MaterialIssueScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateManyMutationInput, Prisma.MaterialIssueUncheckedUpdateManyWithoutReviewedByInput>;
};
export type MaterialIssueCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutMaterialIssuesInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedIssuesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedIssuesInput;
};
export type MaterialIssueUncheckedCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrderId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialIssueCreateOrConnectWithoutLinesInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutLinesInput, Prisma.MaterialIssueUncheckedCreateWithoutLinesInput>;
};
export type MaterialIssueUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutLinesInput, Prisma.MaterialIssueUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutLinesInput, Prisma.MaterialIssueUncheckedCreateWithoutLinesInput>;
    where?: Prisma.MaterialIssueWhereInput;
};
export type MaterialIssueUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.MaterialIssueWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutLinesInput, Prisma.MaterialIssueUncheckedUpdateWithoutLinesInput>;
};
export type MaterialIssueUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialIssuesNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedIssuesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedIssuesNestedInput;
};
export type MaterialIssueUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialIssueCreateWithoutProductionOrderInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedIssuesInput;
    lines?: Prisma.MaterialIssueLineCreateNestedManyWithoutIssueInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedIssuesInput;
};
export type MaterialIssueUncheckedCreateWithoutProductionOrderInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    requestedById: string;
    reviewedById?: string | null;
    lines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutIssueInput;
};
export type MaterialIssueCreateOrConnectWithoutProductionOrderInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput>;
};
export type MaterialIssueCreateManyProductionOrderInputEnvelope = {
    data: Prisma.MaterialIssueCreateManyProductionOrderInput | Prisma.MaterialIssueCreateManyProductionOrderInput[];
    skipDuplicates?: boolean;
};
export type MaterialIssueUpsertWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedUpdateWithoutProductionOrderInput>;
    create: Prisma.XOR<Prisma.MaterialIssueCreateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedCreateWithoutProductionOrderInput>;
};
export type MaterialIssueUpdateWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.MaterialIssueWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateWithoutProductionOrderInput, Prisma.MaterialIssueUncheckedUpdateWithoutProductionOrderInput>;
};
export type MaterialIssueUpdateManyWithWhereWithoutProductionOrderInput = {
    where: Prisma.MaterialIssueScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateManyMutationInput, Prisma.MaterialIssueUncheckedUpdateManyWithoutProductionOrderInput>;
};
export type MaterialIssueCreateManyRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrderId: string;
    reviewedById?: string | null;
};
export type MaterialIssueCreateManyReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    productionOrderId: string;
    requestedById: string;
};
export type MaterialIssueUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialIssuesNestedInput;
    lines?: Prisma.MaterialIssueLineUpdateManyWithoutIssueNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedIssuesNestedInput;
};
export type MaterialIssueUncheckedUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutIssueNestedInput;
};
export type MaterialIssueUncheckedUpdateManyWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialIssueUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutMaterialIssuesNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedIssuesNestedInput;
    lines?: Prisma.MaterialIssueLineUpdateManyWithoutIssueNestedInput;
};
export type MaterialIssueUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutIssueNestedInput;
};
export type MaterialIssueUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialIssueCreateManyProductionOrderInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialIssueUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedIssuesNestedInput;
    lines?: Prisma.MaterialIssueLineUpdateManyWithoutIssueNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedIssuesNestedInput;
};
export type MaterialIssueUncheckedUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutIssueNestedInput;
};
export type MaterialIssueUncheckedUpdateManyWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialIssueCountOutputType = {
    lines: number;
};
export type MaterialIssueCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | MaterialIssueCountOutputTypeCountLinesArgs;
};
export type MaterialIssueCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueCountOutputTypeSelect<ExtArgs> | null;
};
export type MaterialIssueCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialIssueSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    productionOrderId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.MaterialIssue$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialIssue$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialIssueCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialIssue"]>;
export type MaterialIssueSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    productionOrderId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialIssue$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["materialIssue"]>;
export type MaterialIssueSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    productionOrderId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialIssue$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["materialIssue"]>;
export type MaterialIssueSelectScalar = {
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    productionOrderId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
};
export type MaterialIssueOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestedAt" | "approvedAt" | "status" | "reason" | "productionOrderId" | "requestedById" | "reviewedById", ExtArgs["result"]["materialIssue"]>;
export type MaterialIssueInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.MaterialIssue$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialIssue$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialIssueCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaterialIssueIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialIssue$reviewedByArgs<ExtArgs>;
};
export type MaterialIssueIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialIssue$reviewedByArgs<ExtArgs>;
};
export type $MaterialIssuePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialIssue";
    objects: {
        productionOrder: Prisma.$ProductionOrderPayload<ExtArgs>;
        requestedBy: Prisma.$EmployeePayload<ExtArgs>;
        lines: Prisma.$MaterialIssueLinePayload<ExtArgs>[];
        reviewedBy: Prisma.$EmployeePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requestedAt: Date;
        approvedAt: Date | null;
        status: string;
        reason: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
    }, ExtArgs["result"]["materialIssue"]>;
    composites: {};
};
export type MaterialIssueGetPayload<S extends boolean | null | undefined | MaterialIssueDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload, S>;
export type MaterialIssueCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialIssueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialIssueCountAggregateInputType | true;
};
export interface MaterialIssueDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialIssue'];
        meta: {
            name: 'MaterialIssue';
        };
    };
    findUnique<T extends MaterialIssueFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialIssueFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialIssueFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialIssueFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialIssueFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialIssueFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialIssueFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialIssueFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialIssueFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialIssueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialIssueCreateArgs>(args: Prisma.SelectSubset<T, MaterialIssueCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialIssueCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialIssueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialIssueCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialIssueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialIssueDeleteArgs>(args: Prisma.SelectSubset<T, MaterialIssueDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialIssueUpdateArgs>(args: Prisma.SelectSubset<T, MaterialIssueUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialIssueDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialIssueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialIssueUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialIssueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialIssueUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialIssueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialIssueUpsertArgs>(args: Prisma.SelectSubset<T, MaterialIssueUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialIssueCountArgs>(args?: Prisma.Subset<T, MaterialIssueCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialIssueCountAggregateOutputType> : number>;
    aggregate<T extends MaterialIssueAggregateArgs>(args: Prisma.Subset<T, MaterialIssueAggregateArgs>): Prisma.PrismaPromise<GetMaterialIssueAggregateType<T>>;
    groupBy<T extends MaterialIssueGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialIssueGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialIssueGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialIssueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialIssueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialIssueFieldRefs;
}
export interface Prisma__MaterialIssueClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    productionOrder<T extends Prisma.ProductionOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requestedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.MaterialIssue$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssue$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviewedBy<T extends Prisma.MaterialIssue$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssue$reviewedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialIssueFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialIssue", 'String'>;
    readonly requestedAt: Prisma.FieldRef<"MaterialIssue", 'DateTime'>;
    readonly approvedAt: Prisma.FieldRef<"MaterialIssue", 'DateTime'>;
    readonly status: Prisma.FieldRef<"MaterialIssue", 'String'>;
    readonly reason: Prisma.FieldRef<"MaterialIssue", 'String'>;
    readonly productionOrderId: Prisma.FieldRef<"MaterialIssue", 'String'>;
    readonly requestedById: Prisma.FieldRef<"MaterialIssue", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"MaterialIssue", 'String'>;
}
export type MaterialIssueFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueWhereUniqueInput;
};
export type MaterialIssueFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueWhereUniqueInput;
};
export type MaterialIssueFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueWhereInput;
    orderBy?: Prisma.MaterialIssueOrderByWithRelationInput | Prisma.MaterialIssueOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialIssueScalarFieldEnum | Prisma.MaterialIssueScalarFieldEnum[];
};
export type MaterialIssueFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueWhereInput;
    orderBy?: Prisma.MaterialIssueOrderByWithRelationInput | Prisma.MaterialIssueOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialIssueScalarFieldEnum | Prisma.MaterialIssueScalarFieldEnum[];
};
export type MaterialIssueFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueWhereInput;
    orderBy?: Prisma.MaterialIssueOrderByWithRelationInput | Prisma.MaterialIssueOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialIssueScalarFieldEnum | Prisma.MaterialIssueScalarFieldEnum[];
};
export type MaterialIssueCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialIssueCreateInput, Prisma.MaterialIssueUncheckedCreateInput>;
};
export type MaterialIssueCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialIssueCreateManyInput | Prisma.MaterialIssueCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialIssueCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    data: Prisma.MaterialIssueCreateManyInput | Prisma.MaterialIssueCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialIssueIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialIssueUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateInput, Prisma.MaterialIssueUncheckedUpdateInput>;
    where: Prisma.MaterialIssueWhereUniqueInput;
};
export type MaterialIssueUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialIssueUpdateManyMutationInput, Prisma.MaterialIssueUncheckedUpdateManyInput>;
    where?: Prisma.MaterialIssueWhereInput;
    limit?: number;
};
export type MaterialIssueUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialIssueUpdateManyMutationInput, Prisma.MaterialIssueUncheckedUpdateManyInput>;
    where?: Prisma.MaterialIssueWhereInput;
    limit?: number;
    include?: Prisma.MaterialIssueIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialIssueUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueCreateInput, Prisma.MaterialIssueUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialIssueUpdateInput, Prisma.MaterialIssueUncheckedUpdateInput>;
};
export type MaterialIssueDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueWhereUniqueInput;
};
export type MaterialIssueDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueWhereInput;
    limit?: number;
};
export type MaterialIssue$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueLineWhereInput;
    orderBy?: Prisma.MaterialIssueLineOrderByWithRelationInput | Prisma.MaterialIssueLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialIssueLineScalarFieldEnum | Prisma.MaterialIssueLineScalarFieldEnum[];
};
export type MaterialIssue$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type MaterialIssueDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
};
