import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialReturnModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialReturnPayload>;
export type AggregateMaterialReturn = {
    _count: MaterialReturnCountAggregateOutputType | null;
    _min: MaterialReturnMinAggregateOutputType | null;
    _max: MaterialReturnMaxAggregateOutputType | null;
};
export type MaterialReturnMinAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type MaterialReturnMaxAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type MaterialReturnCountAggregateOutputType = {
    id: number;
    requestedAt: number;
    approvedAt: number;
    status: number;
    reason: number;
    requestedById: number;
    reviewedById: number;
    _all: number;
};
export type MaterialReturnMinAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type MaterialReturnMaxAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type MaterialReturnCountAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    requestedById?: true;
    reviewedById?: true;
    _all?: true;
};
export type MaterialReturnAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnWhereInput;
    orderBy?: Prisma.MaterialReturnOrderByWithRelationInput | Prisma.MaterialReturnOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialReturnCountAggregateInputType;
    _min?: MaterialReturnMinAggregateInputType;
    _max?: MaterialReturnMaxAggregateInputType;
};
export type GetMaterialReturnAggregateType<T extends MaterialReturnAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialReturn]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialReturn[P]> : Prisma.GetScalarType<T[P], AggregateMaterialReturn[P]>;
};
export type MaterialReturnGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnWhereInput;
    orderBy?: Prisma.MaterialReturnOrderByWithAggregationInput | Prisma.MaterialReturnOrderByWithAggregationInput[];
    by: Prisma.MaterialReturnScalarFieldEnum[] | Prisma.MaterialReturnScalarFieldEnum;
    having?: Prisma.MaterialReturnScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialReturnCountAggregateInputType | true;
    _min?: MaterialReturnMinAggregateInputType;
    _max?: MaterialReturnMaxAggregateInputType;
};
export type MaterialReturnGroupByOutputType = {
    id: string;
    requestedAt: Date;
    approvedAt: Date | null;
    status: string;
    reason: string;
    requestedById: string;
    reviewedById: string | null;
    _count: MaterialReturnCountAggregateOutputType | null;
    _min: MaterialReturnMinAggregateOutputType | null;
    _max: MaterialReturnMaxAggregateOutputType | null;
};
export type GetMaterialReturnGroupByPayload<T extends MaterialReturnGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialReturnGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialReturnGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialReturnGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialReturnGroupByOutputType[P]>;
}>>;
export type MaterialReturnWhereInput = {
    AND?: Prisma.MaterialReturnWhereInput | Prisma.MaterialReturnWhereInput[];
    OR?: Prisma.MaterialReturnWhereInput[];
    NOT?: Prisma.MaterialReturnWhereInput | Prisma.MaterialReturnWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReturn"> | string;
    requestedAt?: Prisma.DateTimeFilter<"MaterialReturn"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"MaterialReturn"> | Date | string | null;
    status?: Prisma.StringFilter<"MaterialReturn"> | string;
    reason?: Prisma.StringFilter<"MaterialReturn"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialReturn"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialReturn"> | string | null;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.MaterialReturnLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
};
export type MaterialReturnOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestedBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.MaterialReturnLineOrderByRelationAggregateInput;
    reviewedBy?: Prisma.EmployeeOrderByWithRelationInput;
};
export type MaterialReturnWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MaterialReturnWhereInput | Prisma.MaterialReturnWhereInput[];
    OR?: Prisma.MaterialReturnWhereInput[];
    NOT?: Prisma.MaterialReturnWhereInput | Prisma.MaterialReturnWhereInput[];
    requestedAt?: Prisma.DateTimeFilter<"MaterialReturn"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"MaterialReturn"> | Date | string | null;
    status?: Prisma.StringFilter<"MaterialReturn"> | string;
    reason?: Prisma.StringFilter<"MaterialReturn"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialReturn"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialReturn"> | string | null;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.MaterialReturnLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
}, "id">;
export type MaterialReturnOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MaterialReturnCountOrderByAggregateInput;
    _max?: Prisma.MaterialReturnMaxOrderByAggregateInput;
    _min?: Prisma.MaterialReturnMinOrderByAggregateInput;
};
export type MaterialReturnScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialReturnScalarWhereWithAggregatesInput | Prisma.MaterialReturnScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialReturnScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialReturnScalarWhereWithAggregatesInput | Prisma.MaterialReturnScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialReturn"> | string;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"MaterialReturn"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MaterialReturn"> | Date | string | null;
    status?: Prisma.StringWithAggregatesFilter<"MaterialReturn"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"MaterialReturn"> | string;
    requestedById?: Prisma.UuidWithAggregatesFilter<"MaterialReturn"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"MaterialReturn"> | string | null;
};
export type MaterialReturnCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedReturnsInput;
    lines?: Prisma.MaterialReturnLineCreateNestedManyWithoutReturnInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedReturnsInput;
};
export type MaterialReturnUncheckedCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    reviewedById?: string | null;
    lines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutReturnInput;
};
export type MaterialReturnUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedReturnsNestedInput;
    lines?: Prisma.MaterialReturnLineUpdateManyWithoutReturnNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedReturnsNestedInput;
};
export type MaterialReturnUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutReturnNestedInput;
};
export type MaterialReturnCreateManyInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialReturnUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReturnUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialReturnListRelationFilter = {
    every?: Prisma.MaterialReturnWhereInput;
    some?: Prisma.MaterialReturnWhereInput;
    none?: Prisma.MaterialReturnWhereInput;
};
export type MaterialReturnOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialReturnCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialReturnMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialReturnMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type MaterialReturnScalarRelationFilter = {
    is?: Prisma.MaterialReturnWhereInput;
    isNot?: Prisma.MaterialReturnWhereInput;
};
export type MaterialReturnCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialReturnCreateWithoutRequestedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput | Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyRequestedByInputEnvelope;
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
};
export type MaterialReturnCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialReturnCreateWithoutReviewedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput | Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyReviewedByInputEnvelope;
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
};
export type MaterialReturnUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialReturnCreateWithoutRequestedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput | Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyRequestedByInputEnvelope;
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
};
export type MaterialReturnUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialReturnCreateWithoutReviewedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput | Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyReviewedByInputEnvelope;
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
};
export type MaterialReturnUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialReturnCreateWithoutRequestedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput | Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.MaterialReturnUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialReturnUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyRequestedByInputEnvelope;
    set?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    delete?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    update?: Prisma.MaterialReturnUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialReturnUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.MaterialReturnUpdateManyWithWhereWithoutRequestedByInput | Prisma.MaterialReturnUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.MaterialReturnScalarWhereInput | Prisma.MaterialReturnScalarWhereInput[];
};
export type MaterialReturnUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialReturnCreateWithoutReviewedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput | Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.MaterialReturnUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialReturnUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyReviewedByInputEnvelope;
    set?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    delete?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    update?: Prisma.MaterialReturnUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialReturnUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.MaterialReturnUpdateManyWithWhereWithoutReviewedByInput | Prisma.MaterialReturnUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.MaterialReturnScalarWhereInput | Prisma.MaterialReturnScalarWhereInput[];
};
export type MaterialReturnUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput> | Prisma.MaterialReturnCreateWithoutRequestedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput | Prisma.MaterialReturnCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.MaterialReturnUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialReturnUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyRequestedByInputEnvelope;
    set?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    delete?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    update?: Prisma.MaterialReturnUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.MaterialReturnUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.MaterialReturnUpdateManyWithWhereWithoutRequestedByInput | Prisma.MaterialReturnUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.MaterialReturnScalarWhereInput | Prisma.MaterialReturnScalarWhereInput[];
};
export type MaterialReturnUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput> | Prisma.MaterialReturnCreateWithoutReviewedByInput[] | Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput | Prisma.MaterialReturnCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.MaterialReturnUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialReturnUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.MaterialReturnCreateManyReviewedByInputEnvelope;
    set?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    delete?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    connect?: Prisma.MaterialReturnWhereUniqueInput | Prisma.MaterialReturnWhereUniqueInput[];
    update?: Prisma.MaterialReturnUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.MaterialReturnUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.MaterialReturnUpdateManyWithWhereWithoutReviewedByInput | Prisma.MaterialReturnUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.MaterialReturnScalarWhereInput | Prisma.MaterialReturnScalarWhereInput[];
};
export type MaterialReturnCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutLinesInput, Prisma.MaterialReturnUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutLinesInput;
    connect?: Prisma.MaterialReturnWhereUniqueInput;
};
export type MaterialReturnUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnCreateWithoutLinesInput, Prisma.MaterialReturnUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.MaterialReturnCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.MaterialReturnUpsertWithoutLinesInput;
    connect?: Prisma.MaterialReturnWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialReturnUpdateToOneWithWhereWithoutLinesInput, Prisma.MaterialReturnUpdateWithoutLinesInput>, Prisma.MaterialReturnUncheckedUpdateWithoutLinesInput>;
};
export type MaterialReturnCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    lines?: Prisma.MaterialReturnLineCreateNestedManyWithoutReturnInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedReturnsInput;
};
export type MaterialReturnUncheckedCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    reviewedById?: string | null;
    lines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutReturnInput;
};
export type MaterialReturnCreateOrConnectWithoutRequestedByInput = {
    where: Prisma.MaterialReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnCreateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput>;
};
export type MaterialReturnCreateManyRequestedByInputEnvelope = {
    data: Prisma.MaterialReturnCreateManyRequestedByInput | Prisma.MaterialReturnCreateManyRequestedByInput[];
    skipDuplicates?: boolean;
};
export type MaterialReturnCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedReturnsInput;
    lines?: Prisma.MaterialReturnLineCreateNestedManyWithoutReturnInput;
};
export type MaterialReturnUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    lines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutReturnInput;
};
export type MaterialReturnCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.MaterialReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnCreateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput>;
};
export type MaterialReturnCreateManyReviewedByInputEnvelope = {
    data: Prisma.MaterialReturnCreateManyReviewedByInput | Prisma.MaterialReturnCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type MaterialReturnUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.MaterialReturnWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReturnUpdateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedUpdateWithoutRequestedByInput>;
    create: Prisma.XOR<Prisma.MaterialReturnCreateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedCreateWithoutRequestedByInput>;
};
export type MaterialReturnUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.MaterialReturnWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReturnUpdateWithoutRequestedByInput, Prisma.MaterialReturnUncheckedUpdateWithoutRequestedByInput>;
};
export type MaterialReturnUpdateManyWithWhereWithoutRequestedByInput = {
    where: Prisma.MaterialReturnScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReturnUpdateManyMutationInput, Prisma.MaterialReturnUncheckedUpdateManyWithoutRequestedByInput>;
};
export type MaterialReturnScalarWhereInput = {
    AND?: Prisma.MaterialReturnScalarWhereInput | Prisma.MaterialReturnScalarWhereInput[];
    OR?: Prisma.MaterialReturnScalarWhereInput[];
    NOT?: Prisma.MaterialReturnScalarWhereInput | Prisma.MaterialReturnScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReturn"> | string;
    requestedAt?: Prisma.DateTimeFilter<"MaterialReturn"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"MaterialReturn"> | Date | string | null;
    status?: Prisma.StringFilter<"MaterialReturn"> | string;
    reason?: Prisma.StringFilter<"MaterialReturn"> | string;
    requestedById?: Prisma.UuidFilter<"MaterialReturn"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"MaterialReturn"> | string | null;
};
export type MaterialReturnUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.MaterialReturnWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReturnUpdateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.MaterialReturnCreateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedCreateWithoutReviewedByInput>;
};
export type MaterialReturnUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.MaterialReturnWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReturnUpdateWithoutReviewedByInput, Prisma.MaterialReturnUncheckedUpdateWithoutReviewedByInput>;
};
export type MaterialReturnUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.MaterialReturnScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReturnUpdateManyMutationInput, Prisma.MaterialReturnUncheckedUpdateManyWithoutReviewedByInput>;
};
export type MaterialReturnCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedReturnsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedReturnsInput;
};
export type MaterialReturnUncheckedCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type MaterialReturnCreateOrConnectWithoutLinesInput = {
    where: Prisma.MaterialReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnCreateWithoutLinesInput, Prisma.MaterialReturnUncheckedCreateWithoutLinesInput>;
};
export type MaterialReturnUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.MaterialReturnUpdateWithoutLinesInput, Prisma.MaterialReturnUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.MaterialReturnCreateWithoutLinesInput, Prisma.MaterialReturnUncheckedCreateWithoutLinesInput>;
    where?: Prisma.MaterialReturnWhereInput;
};
export type MaterialReturnUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.MaterialReturnWhereInput;
    data: Prisma.XOR<Prisma.MaterialReturnUpdateWithoutLinesInput, Prisma.MaterialReturnUncheckedUpdateWithoutLinesInput>;
};
export type MaterialReturnUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedReturnsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedReturnsNestedInput;
};
export type MaterialReturnUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialReturnCreateManyRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    reviewedById?: string | null;
};
export type MaterialReturnCreateManyReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason: string;
    requestedById: string;
};
export type MaterialReturnUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.MaterialReturnLineUpdateManyWithoutReturnNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedReturnsNestedInput;
};
export type MaterialReturnUncheckedUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutReturnNestedInput;
};
export type MaterialReturnUncheckedUpdateManyWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialReturnUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedReturnsNestedInput;
    lines?: Prisma.MaterialReturnLineUpdateManyWithoutReturnNestedInput;
};
export type MaterialReturnUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutReturnNestedInput;
};
export type MaterialReturnUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReturnCountOutputType = {
    lines: number;
};
export type MaterialReturnCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | MaterialReturnCountOutputTypeCountLinesArgs;
};
export type MaterialReturnCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnCountOutputTypeSelect<ExtArgs> | null;
};
export type MaterialReturnCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnLineWhereInput;
};
export type MaterialReturnSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.MaterialReturn$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialReturn$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialReturnCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReturn"]>;
export type MaterialReturnSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialReturn$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["materialReturn"]>;
export type MaterialReturnSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialReturn$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["materialReturn"]>;
export type MaterialReturnSelectScalar = {
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
};
export type MaterialReturnOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestedAt" | "approvedAt" | "status" | "reason" | "requestedById" | "reviewedById", ExtArgs["result"]["materialReturn"]>;
export type MaterialReturnInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.MaterialReturn$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialReturn$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialReturnCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaterialReturnIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialReturn$reviewedByArgs<ExtArgs>;
};
export type MaterialReturnIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.MaterialReturn$reviewedByArgs<ExtArgs>;
};
export type $MaterialReturnPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialReturn";
    objects: {
        requestedBy: Prisma.$EmployeePayload<ExtArgs>;
        lines: Prisma.$MaterialReturnLinePayload<ExtArgs>[];
        reviewedBy: Prisma.$EmployeePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requestedAt: Date;
        approvedAt: Date | null;
        status: string;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    }, ExtArgs["result"]["materialReturn"]>;
    composites: {};
};
export type MaterialReturnGetPayload<S extends boolean | null | undefined | MaterialReturnDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload, S>;
export type MaterialReturnCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialReturnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialReturnCountAggregateInputType | true;
};
export interface MaterialReturnDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialReturn'];
        meta: {
            name: 'MaterialReturn';
        };
    };
    findUnique<T extends MaterialReturnFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialReturnFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialReturnFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialReturnFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialReturnFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialReturnFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialReturnFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialReturnFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialReturnFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialReturnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialReturnCreateArgs>(args: Prisma.SelectSubset<T, MaterialReturnCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialReturnCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialReturnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialReturnCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialReturnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialReturnDeleteArgs>(args: Prisma.SelectSubset<T, MaterialReturnDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialReturnUpdateArgs>(args: Prisma.SelectSubset<T, MaterialReturnUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialReturnDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialReturnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialReturnUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialReturnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialReturnUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialReturnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialReturnUpsertArgs>(args: Prisma.SelectSubset<T, MaterialReturnUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialReturnCountArgs>(args?: Prisma.Subset<T, MaterialReturnCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialReturnCountAggregateOutputType> : number>;
    aggregate<T extends MaterialReturnAggregateArgs>(args: Prisma.Subset<T, MaterialReturnAggregateArgs>): Prisma.PrismaPromise<GetMaterialReturnAggregateType<T>>;
    groupBy<T extends MaterialReturnGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialReturnGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialReturnGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialReturnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialReturnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialReturnFieldRefs;
}
export interface Prisma__MaterialReturnClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    requestedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.MaterialReturn$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialReturn$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviewedBy<T extends Prisma.MaterialReturn$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialReturn$reviewedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialReturnFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialReturn", 'String'>;
    readonly requestedAt: Prisma.FieldRef<"MaterialReturn", 'DateTime'>;
    readonly approvedAt: Prisma.FieldRef<"MaterialReturn", 'DateTime'>;
    readonly status: Prisma.FieldRef<"MaterialReturn", 'String'>;
    readonly reason: Prisma.FieldRef<"MaterialReturn", 'String'>;
    readonly requestedById: Prisma.FieldRef<"MaterialReturn", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"MaterialReturn", 'String'>;
}
export type MaterialReturnFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnWhereUniqueInput;
};
export type MaterialReturnFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnWhereUniqueInput;
};
export type MaterialReturnFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    where?: Prisma.MaterialReturnWhereInput;
    orderBy?: Prisma.MaterialReturnOrderByWithRelationInput | Prisma.MaterialReturnOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReturnScalarFieldEnum | Prisma.MaterialReturnScalarFieldEnum[];
};
export type MaterialReturnFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    where?: Prisma.MaterialReturnWhereInput;
    orderBy?: Prisma.MaterialReturnOrderByWithRelationInput | Prisma.MaterialReturnOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReturnScalarFieldEnum | Prisma.MaterialReturnScalarFieldEnum[];
};
export type MaterialReturnFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    where?: Prisma.MaterialReturnWhereInput;
    orderBy?: Prisma.MaterialReturnOrderByWithRelationInput | Prisma.MaterialReturnOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReturnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReturnScalarFieldEnum | Prisma.MaterialReturnScalarFieldEnum[];
};
export type MaterialReturnCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReturnCreateInput, Prisma.MaterialReturnUncheckedCreateInput>;
};
export type MaterialReturnCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialReturnCreateManyInput | Prisma.MaterialReturnCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialReturnCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    data: Prisma.MaterialReturnCreateManyInput | Prisma.MaterialReturnCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialReturnIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialReturnUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReturnUpdateInput, Prisma.MaterialReturnUncheckedUpdateInput>;
    where: Prisma.MaterialReturnWhereUniqueInput;
};
export type MaterialReturnUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialReturnUpdateManyMutationInput, Prisma.MaterialReturnUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReturnWhereInput;
    limit?: number;
};
export type MaterialReturnUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReturnUpdateManyMutationInput, Prisma.MaterialReturnUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReturnWhereInput;
    limit?: number;
    include?: Prisma.MaterialReturnIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialReturnUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnCreateInput, Prisma.MaterialReturnUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialReturnUpdateInput, Prisma.MaterialReturnUncheckedUpdateInput>;
};
export type MaterialReturnDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnWhereUniqueInput;
};
export type MaterialReturnDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnWhereInput;
    limit?: number;
};
export type MaterialReturn$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialReturnLineWhereInput;
    orderBy?: Prisma.MaterialReturnLineOrderByWithRelationInput | Prisma.MaterialReturnLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReturnLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReturnLineScalarFieldEnum | Prisma.MaterialReturnLineScalarFieldEnum[];
};
export type MaterialReturn$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type MaterialReturnDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnInclude<ExtArgs> | null;
};
