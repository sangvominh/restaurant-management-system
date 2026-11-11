import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StoreDispatchModel = runtime.Types.Result.DefaultSelection<Prisma.$StoreDispatchPayload>;
export type AggregateStoreDispatch = {
    _count: StoreDispatchCountAggregateOutputType | null;
    _min: StoreDispatchMinAggregateOutputType | null;
    _max: StoreDispatchMaxAggregateOutputType | null;
};
export type StoreDispatchMinAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type StoreDispatchMaxAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type StoreDispatchCountAggregateOutputType = {
    id: number;
    requestedAt: number;
    approvedAt: number;
    status: number;
    reason: number;
    requestedById: number;
    reviewedById: number;
    _all: number;
};
export type StoreDispatchMinAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type StoreDispatchMaxAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type StoreDispatchCountAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    requestedById?: true;
    reviewedById?: true;
    _all?: true;
};
export type StoreDispatchAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchWhereInput;
    orderBy?: Prisma.StoreDispatchOrderByWithRelationInput | Prisma.StoreDispatchOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StoreDispatchCountAggregateInputType;
    _min?: StoreDispatchMinAggregateInputType;
    _max?: StoreDispatchMaxAggregateInputType;
};
export type GetStoreDispatchAggregateType<T extends StoreDispatchAggregateArgs> = {
    [P in keyof T & keyof AggregateStoreDispatch]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStoreDispatch[P]> : Prisma.GetScalarType<T[P], AggregateStoreDispatch[P]>;
};
export type StoreDispatchGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchWhereInput;
    orderBy?: Prisma.StoreDispatchOrderByWithAggregationInput | Prisma.StoreDispatchOrderByWithAggregationInput[];
    by: Prisma.StoreDispatchScalarFieldEnum[] | Prisma.StoreDispatchScalarFieldEnum;
    having?: Prisma.StoreDispatchScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StoreDispatchCountAggregateInputType | true;
    _min?: StoreDispatchMinAggregateInputType;
    _max?: StoreDispatchMaxAggregateInputType;
};
export type StoreDispatchGroupByOutputType = {
    id: string;
    requestedAt: Date;
    approvedAt: Date | null;
    status: string;
    reason: string;
    requestedById: string;
    reviewedById: string | null;
    _count: StoreDispatchCountAggregateOutputType | null;
    _min: StoreDispatchMinAggregateOutputType | null;
    _max: StoreDispatchMaxAggregateOutputType | null;
};
export type GetStoreDispatchGroupByPayload<T extends StoreDispatchGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StoreDispatchGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StoreDispatchGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StoreDispatchGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StoreDispatchGroupByOutputType[P]>;
}>>;
export type StoreDispatchWhereInput = {
    AND?: Prisma.StoreDispatchWhereInput | Prisma.StoreDispatchWhereInput[];
    OR?: Prisma.StoreDispatchWhereInput[];
    NOT?: Prisma.StoreDispatchWhereInput | Prisma.StoreDispatchWhereInput[];
    id?: Prisma.UuidFilter<"StoreDispatch"> | string;
    requestedAt?: Prisma.DateTimeFilter<"StoreDispatch"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"StoreDispatch"> | Date | string | null;
    status?: Prisma.StringFilter<"StoreDispatch"> | string;
    reason?: Prisma.StringFilter<"StoreDispatch"> | string;
    requestedById?: Prisma.UuidFilter<"StoreDispatch"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"StoreDispatch"> | string | null;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    lines?: Prisma.StoreDispatchLineListRelationFilter;
};
export type StoreDispatchOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestedBy?: Prisma.EmployeeOrderByWithRelationInput;
    reviewedBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.StoreDispatchLineOrderByRelationAggregateInput;
};
export type StoreDispatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StoreDispatchWhereInput | Prisma.StoreDispatchWhereInput[];
    OR?: Prisma.StoreDispatchWhereInput[];
    NOT?: Prisma.StoreDispatchWhereInput | Prisma.StoreDispatchWhereInput[];
    requestedAt?: Prisma.DateTimeFilter<"StoreDispatch"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"StoreDispatch"> | Date | string | null;
    status?: Prisma.StringFilter<"StoreDispatch"> | string;
    reason?: Prisma.StringFilter<"StoreDispatch"> | string;
    requestedById?: Prisma.UuidFilter<"StoreDispatch"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"StoreDispatch"> | string | null;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    lines?: Prisma.StoreDispatchLineListRelationFilter;
}, "id">;
export type StoreDispatchOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StoreDispatchCountOrderByAggregateInput;
    _max?: Prisma.StoreDispatchMaxOrderByAggregateInput;
    _min?: Prisma.StoreDispatchMinOrderByAggregateInput;
};
export type StoreDispatchScalarWhereWithAggregatesInput = {
    AND?: Prisma.StoreDispatchScalarWhereWithAggregatesInput | Prisma.StoreDispatchScalarWhereWithAggregatesInput[];
    OR?: Prisma.StoreDispatchScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StoreDispatchScalarWhereWithAggregatesInput | Prisma.StoreDispatchScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"StoreDispatch"> | string;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"StoreDispatch"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StoreDispatch"> | Date | string | null;
    status?: Prisma.StringWithAggregatesFilter<"StoreDispatch"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"StoreDispatch"> | string;
    requestedById?: Prisma.UuidWithAggregatesFilter<"StoreDispatch"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"StoreDispatch"> | string | null;
};
export type StoreDispatchCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedDispatchesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedDispatchesInput;
    lines?: Prisma.StoreDispatchLineCreateNestedManyWithoutDispatchInput;
};
export type StoreDispatchUncheckedCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    reviewedById?: string | null;
    lines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutDispatchInput;
};
export type StoreDispatchUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedDispatchesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedDispatchesNestedInput;
    lines?: Prisma.StoreDispatchLineUpdateManyWithoutDispatchNestedInput;
};
export type StoreDispatchUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type StoreDispatchCreateManyInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type StoreDispatchUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StoreDispatchUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreDispatchListRelationFilter = {
    every?: Prisma.StoreDispatchWhereInput;
    some?: Prisma.StoreDispatchWhereInput;
    none?: Prisma.StoreDispatchWhereInput;
};
export type StoreDispatchOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StoreDispatchCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type StoreDispatchMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type StoreDispatchMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type StoreDispatchScalarRelationFilter = {
    is?: Prisma.StoreDispatchWhereInput;
    isNot?: Prisma.StoreDispatchWhereInput;
};
export type StoreDispatchCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput> | Prisma.StoreDispatchCreateWithoutRequestedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput | Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyRequestedByInputEnvelope;
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
};
export type StoreDispatchCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput> | Prisma.StoreDispatchCreateWithoutReviewedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput | Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyReviewedByInputEnvelope;
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
};
export type StoreDispatchUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput> | Prisma.StoreDispatchCreateWithoutRequestedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput | Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyRequestedByInputEnvelope;
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
};
export type StoreDispatchUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput> | Prisma.StoreDispatchCreateWithoutReviewedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput | Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyReviewedByInputEnvelope;
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
};
export type StoreDispatchUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput> | Prisma.StoreDispatchCreateWithoutRequestedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput | Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.StoreDispatchUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.StoreDispatchUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyRequestedByInputEnvelope;
    set?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    delete?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    update?: Prisma.StoreDispatchUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.StoreDispatchUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.StoreDispatchUpdateManyWithWhereWithoutRequestedByInput | Prisma.StoreDispatchUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.StoreDispatchScalarWhereInput | Prisma.StoreDispatchScalarWhereInput[];
};
export type StoreDispatchUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput> | Prisma.StoreDispatchCreateWithoutReviewedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput | Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.StoreDispatchUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.StoreDispatchUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyReviewedByInputEnvelope;
    set?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    delete?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    update?: Prisma.StoreDispatchUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.StoreDispatchUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.StoreDispatchUpdateManyWithWhereWithoutReviewedByInput | Prisma.StoreDispatchUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.StoreDispatchScalarWhereInput | Prisma.StoreDispatchScalarWhereInput[];
};
export type StoreDispatchUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput> | Prisma.StoreDispatchCreateWithoutRequestedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput | Prisma.StoreDispatchCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.StoreDispatchUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.StoreDispatchUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyRequestedByInputEnvelope;
    set?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    delete?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    update?: Prisma.StoreDispatchUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.StoreDispatchUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.StoreDispatchUpdateManyWithWhereWithoutRequestedByInput | Prisma.StoreDispatchUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.StoreDispatchScalarWhereInput | Prisma.StoreDispatchScalarWhereInput[];
};
export type StoreDispatchUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput> | Prisma.StoreDispatchCreateWithoutReviewedByInput[] | Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput | Prisma.StoreDispatchCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.StoreDispatchUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.StoreDispatchUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.StoreDispatchCreateManyReviewedByInputEnvelope;
    set?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    delete?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    connect?: Prisma.StoreDispatchWhereUniqueInput | Prisma.StoreDispatchWhereUniqueInput[];
    update?: Prisma.StoreDispatchUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.StoreDispatchUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.StoreDispatchUpdateManyWithWhereWithoutReviewedByInput | Prisma.StoreDispatchUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.StoreDispatchScalarWhereInput | Prisma.StoreDispatchScalarWhereInput[];
};
export type StoreDispatchCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutLinesInput, Prisma.StoreDispatchUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutLinesInput;
    connect?: Prisma.StoreDispatchWhereUniqueInput;
};
export type StoreDispatchUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchCreateWithoutLinesInput, Prisma.StoreDispatchUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.StoreDispatchCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.StoreDispatchUpsertWithoutLinesInput;
    connect?: Prisma.StoreDispatchWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreDispatchUpdateToOneWithWhereWithoutLinesInput, Prisma.StoreDispatchUpdateWithoutLinesInput>, Prisma.StoreDispatchUncheckedUpdateWithoutLinesInput>;
};
export type StoreDispatchCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedDispatchesInput;
    lines?: Prisma.StoreDispatchLineCreateNestedManyWithoutDispatchInput;
};
export type StoreDispatchUncheckedCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    reviewedById?: string | null;
    lines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutDispatchInput;
};
export type StoreDispatchCreateOrConnectWithoutRequestedByInput = {
    where: Prisma.StoreDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchCreateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput>;
};
export type StoreDispatchCreateManyRequestedByInputEnvelope = {
    data: Prisma.StoreDispatchCreateManyRequestedByInput | Prisma.StoreDispatchCreateManyRequestedByInput[];
    skipDuplicates?: boolean;
};
export type StoreDispatchCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedDispatchesInput;
    lines?: Prisma.StoreDispatchLineCreateNestedManyWithoutDispatchInput;
};
export type StoreDispatchUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    lines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutDispatchInput;
};
export type StoreDispatchCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.StoreDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchCreateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput>;
};
export type StoreDispatchCreateManyReviewedByInputEnvelope = {
    data: Prisma.StoreDispatchCreateManyReviewedByInput | Prisma.StoreDispatchCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type StoreDispatchUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.StoreDispatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreDispatchUpdateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedUpdateWithoutRequestedByInput>;
    create: Prisma.XOR<Prisma.StoreDispatchCreateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedCreateWithoutRequestedByInput>;
};
export type StoreDispatchUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.StoreDispatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreDispatchUpdateWithoutRequestedByInput, Prisma.StoreDispatchUncheckedUpdateWithoutRequestedByInput>;
};
export type StoreDispatchUpdateManyWithWhereWithoutRequestedByInput = {
    where: Prisma.StoreDispatchScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchUpdateManyMutationInput, Prisma.StoreDispatchUncheckedUpdateManyWithoutRequestedByInput>;
};
export type StoreDispatchScalarWhereInput = {
    AND?: Prisma.StoreDispatchScalarWhereInput | Prisma.StoreDispatchScalarWhereInput[];
    OR?: Prisma.StoreDispatchScalarWhereInput[];
    NOT?: Prisma.StoreDispatchScalarWhereInput | Prisma.StoreDispatchScalarWhereInput[];
    id?: Prisma.UuidFilter<"StoreDispatch"> | string;
    requestedAt?: Prisma.DateTimeFilter<"StoreDispatch"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"StoreDispatch"> | Date | string | null;
    status?: Prisma.StringFilter<"StoreDispatch"> | string;
    reason?: Prisma.StringFilter<"StoreDispatch"> | string;
    requestedById?: Prisma.UuidFilter<"StoreDispatch"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"StoreDispatch"> | string | null;
};
export type StoreDispatchUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.StoreDispatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreDispatchUpdateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.StoreDispatchCreateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedCreateWithoutReviewedByInput>;
};
export type StoreDispatchUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.StoreDispatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreDispatchUpdateWithoutReviewedByInput, Prisma.StoreDispatchUncheckedUpdateWithoutReviewedByInput>;
};
export type StoreDispatchUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.StoreDispatchScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchUpdateManyMutationInput, Prisma.StoreDispatchUncheckedUpdateManyWithoutReviewedByInput>;
};
export type StoreDispatchCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedDispatchesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedDispatchesInput;
};
export type StoreDispatchUncheckedCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type StoreDispatchCreateOrConnectWithoutLinesInput = {
    where: Prisma.StoreDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchCreateWithoutLinesInput, Prisma.StoreDispatchUncheckedCreateWithoutLinesInput>;
};
export type StoreDispatchUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.StoreDispatchUpdateWithoutLinesInput, Prisma.StoreDispatchUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.StoreDispatchCreateWithoutLinesInput, Prisma.StoreDispatchUncheckedCreateWithoutLinesInput>;
    where?: Prisma.StoreDispatchWhereInput;
};
export type StoreDispatchUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.StoreDispatchWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchUpdateWithoutLinesInput, Prisma.StoreDispatchUncheckedUpdateWithoutLinesInput>;
};
export type StoreDispatchUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedDispatchesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedDispatchesNestedInput;
};
export type StoreDispatchUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreDispatchCreateManyRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    reviewedById?: string | null;
};
export type StoreDispatchCreateManyReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
};
export type StoreDispatchUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedDispatchesNestedInput;
    lines?: Prisma.StoreDispatchLineUpdateManyWithoutDispatchNestedInput;
};
export type StoreDispatchUncheckedUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type StoreDispatchUncheckedUpdateManyWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StoreDispatchUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedDispatchesNestedInput;
    lines?: Prisma.StoreDispatchLineUpdateManyWithoutDispatchNestedInput;
};
export type StoreDispatchUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type StoreDispatchUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StoreDispatchCountOutputType = {
    lines: number;
};
export type StoreDispatchCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | StoreDispatchCountOutputTypeCountLinesArgs;
};
export type StoreDispatchCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchCountOutputTypeSelect<ExtArgs> | null;
};
export type StoreDispatchCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreDispatchSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreDispatch$reviewedByArgs<ExtArgs>;
    lines?: boolean | Prisma.StoreDispatch$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreDispatchCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["storeDispatch"]>;
export type StoreDispatchSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreDispatch$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["storeDispatch"]>;
export type StoreDispatchSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreDispatch$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["storeDispatch"]>;
export type StoreDispatchSelectScalar = {
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
};
export type StoreDispatchOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestedAt" | "approvedAt" | "status" | "reason" | "requestedById" | "reviewedById", ExtArgs["result"]["storeDispatch"]>;
export type StoreDispatchInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreDispatch$reviewedByArgs<ExtArgs>;
    lines?: boolean | Prisma.StoreDispatch$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreDispatchCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StoreDispatchIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreDispatch$reviewedByArgs<ExtArgs>;
};
export type StoreDispatchIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.StoreDispatch$reviewedByArgs<ExtArgs>;
};
export type $StoreDispatchPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StoreDispatch";
    objects: {
        requestedBy: Prisma.$EmployeePayload<ExtArgs>;
        reviewedBy: Prisma.$EmployeePayload<ExtArgs> | null;
        lines: Prisma.$StoreDispatchLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requestedAt: Date;
        approvedAt: Date | null;
        status: string;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    }, ExtArgs["result"]["storeDispatch"]>;
    composites: {};
};
export type StoreDispatchGetPayload<S extends boolean | null | undefined | StoreDispatchDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload, S>;
export type StoreDispatchCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StoreDispatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StoreDispatchCountAggregateInputType | true;
};
export interface StoreDispatchDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StoreDispatch'];
        meta: {
            name: 'StoreDispatch';
        };
    };
    findUnique<T extends StoreDispatchFindUniqueArgs>(args: Prisma.SelectSubset<T, StoreDispatchFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StoreDispatchFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StoreDispatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StoreDispatchFindFirstArgs>(args?: Prisma.SelectSubset<T, StoreDispatchFindFirstArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StoreDispatchFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StoreDispatchFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StoreDispatchFindManyArgs>(args?: Prisma.SelectSubset<T, StoreDispatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StoreDispatchCreateArgs>(args: Prisma.SelectSubset<T, StoreDispatchCreateArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StoreDispatchCreateManyArgs>(args?: Prisma.SelectSubset<T, StoreDispatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StoreDispatchCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StoreDispatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StoreDispatchDeleteArgs>(args: Prisma.SelectSubset<T, StoreDispatchDeleteArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StoreDispatchUpdateArgs>(args: Prisma.SelectSubset<T, StoreDispatchUpdateArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StoreDispatchDeleteManyArgs>(args?: Prisma.SelectSubset<T, StoreDispatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StoreDispatchUpdateManyArgs>(args: Prisma.SelectSubset<T, StoreDispatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StoreDispatchUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StoreDispatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StoreDispatchUpsertArgs>(args: Prisma.SelectSubset<T, StoreDispatchUpsertArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StoreDispatchCountArgs>(args?: Prisma.Subset<T, StoreDispatchCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StoreDispatchCountAggregateOutputType> : number>;
    aggregate<T extends StoreDispatchAggregateArgs>(args: Prisma.Subset<T, StoreDispatchAggregateArgs>): Prisma.PrismaPromise<GetStoreDispatchAggregateType<T>>;
    groupBy<T extends StoreDispatchGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StoreDispatchGroupByArgs['orderBy'];
    } : {
        orderBy?: StoreDispatchGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StoreDispatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreDispatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StoreDispatchFieldRefs;
}
export interface Prisma__StoreDispatchClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    requestedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewedBy<T extends Prisma.StoreDispatch$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreDispatch$reviewedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.StoreDispatch$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreDispatch$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StoreDispatchFieldRefs {
    readonly id: Prisma.FieldRef<"StoreDispatch", 'String'>;
    readonly requestedAt: Prisma.FieldRef<"StoreDispatch", 'DateTime'>;
    readonly approvedAt: Prisma.FieldRef<"StoreDispatch", 'DateTime'>;
    readonly status: Prisma.FieldRef<"StoreDispatch", 'String'>;
    readonly reason: Prisma.FieldRef<"StoreDispatch", 'String'>;
    readonly requestedById: Prisma.FieldRef<"StoreDispatch", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"StoreDispatch", 'String'>;
}
export type StoreDispatchFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchWhereUniqueInput;
};
export type StoreDispatchFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchWhereUniqueInput;
};
export type StoreDispatchFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchWhereInput;
    orderBy?: Prisma.StoreDispatchOrderByWithRelationInput | Prisma.StoreDispatchOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreDispatchScalarFieldEnum | Prisma.StoreDispatchScalarFieldEnum[];
};
export type StoreDispatchFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchWhereInput;
    orderBy?: Prisma.StoreDispatchOrderByWithRelationInput | Prisma.StoreDispatchOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreDispatchScalarFieldEnum | Prisma.StoreDispatchScalarFieldEnum[];
};
export type StoreDispatchFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchWhereInput;
    orderBy?: Prisma.StoreDispatchOrderByWithRelationInput | Prisma.StoreDispatchOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreDispatchScalarFieldEnum | Prisma.StoreDispatchScalarFieldEnum[];
};
export type StoreDispatchCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreDispatchCreateInput, Prisma.StoreDispatchUncheckedCreateInput>;
};
export type StoreDispatchCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StoreDispatchCreateManyInput | Prisma.StoreDispatchCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StoreDispatchCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    data: Prisma.StoreDispatchCreateManyInput | Prisma.StoreDispatchCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StoreDispatchIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StoreDispatchUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreDispatchUpdateInput, Prisma.StoreDispatchUncheckedUpdateInput>;
    where: Prisma.StoreDispatchWhereUniqueInput;
};
export type StoreDispatchUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StoreDispatchUpdateManyMutationInput, Prisma.StoreDispatchUncheckedUpdateManyInput>;
    where?: Prisma.StoreDispatchWhereInput;
    limit?: number;
};
export type StoreDispatchUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreDispatchUpdateManyMutationInput, Prisma.StoreDispatchUncheckedUpdateManyInput>;
    where?: Prisma.StoreDispatchWhereInput;
    limit?: number;
    include?: Prisma.StoreDispatchIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StoreDispatchUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchCreateInput, Prisma.StoreDispatchUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StoreDispatchUpdateInput, Prisma.StoreDispatchUncheckedUpdateInput>;
};
export type StoreDispatchDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchWhereUniqueInput;
};
export type StoreDispatchDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchWhereInput;
    limit?: number;
};
export type StoreDispatch$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type StoreDispatch$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchLineWhereInput;
    orderBy?: Prisma.StoreDispatchLineOrderByWithRelationInput | Prisma.StoreDispatchLineOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreDispatchLineScalarFieldEnum | Prisma.StoreDispatchLineScalarFieldEnum[];
};
export type StoreDispatchDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchInclude<ExtArgs> | null;
};
