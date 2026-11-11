import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WasteModel = runtime.Types.Result.DefaultSelection<Prisma.$WastePayload>;
export type AggregateWaste = {
    _count: WasteCountAggregateOutputType | null;
    _min: WasteMinAggregateOutputType | null;
    _max: WasteMaxAggregateOutputType | null;
};
export type WasteMinAggregateOutputType = {
    id: string | null;
    reportedAt: Date | null;
    approvedAt: Date | null;
    reason: string | null;
    status: string | null;
    reportedById: string | null;
    reviewedById: string | null;
};
export type WasteMaxAggregateOutputType = {
    id: string | null;
    reportedAt: Date | null;
    approvedAt: Date | null;
    reason: string | null;
    status: string | null;
    reportedById: string | null;
    reviewedById: string | null;
};
export type WasteCountAggregateOutputType = {
    id: number;
    reportedAt: number;
    approvedAt: number;
    reason: number;
    status: number;
    reportedById: number;
    reviewedById: number;
    _all: number;
};
export type WasteMinAggregateInputType = {
    id?: true;
    reportedAt?: true;
    approvedAt?: true;
    reason?: true;
    status?: true;
    reportedById?: true;
    reviewedById?: true;
};
export type WasteMaxAggregateInputType = {
    id?: true;
    reportedAt?: true;
    approvedAt?: true;
    reason?: true;
    status?: true;
    reportedById?: true;
    reviewedById?: true;
};
export type WasteCountAggregateInputType = {
    id?: true;
    reportedAt?: true;
    approvedAt?: true;
    reason?: true;
    status?: true;
    reportedById?: true;
    reviewedById?: true;
    _all?: true;
};
export type WasteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteWhereInput;
    orderBy?: Prisma.WasteOrderByWithRelationInput | Prisma.WasteOrderByWithRelationInput[];
    cursor?: Prisma.WasteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WasteCountAggregateInputType;
    _min?: WasteMinAggregateInputType;
    _max?: WasteMaxAggregateInputType;
};
export type GetWasteAggregateType<T extends WasteAggregateArgs> = {
    [P in keyof T & keyof AggregateWaste]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWaste[P]> : Prisma.GetScalarType<T[P], AggregateWaste[P]>;
};
export type WasteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteWhereInput;
    orderBy?: Prisma.WasteOrderByWithAggregationInput | Prisma.WasteOrderByWithAggregationInput[];
    by: Prisma.WasteScalarFieldEnum[] | Prisma.WasteScalarFieldEnum;
    having?: Prisma.WasteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WasteCountAggregateInputType | true;
    _min?: WasteMinAggregateInputType;
    _max?: WasteMaxAggregateInputType;
};
export type WasteGroupByOutputType = {
    id: string;
    reportedAt: Date;
    approvedAt: Date | null;
    reason: string;
    status: string;
    reportedById: string;
    reviewedById: string | null;
    _count: WasteCountAggregateOutputType | null;
    _min: WasteMinAggregateOutputType | null;
    _max: WasteMaxAggregateOutputType | null;
};
export type GetWasteGroupByPayload<T extends WasteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WasteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WasteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WasteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WasteGroupByOutputType[P]>;
}>>;
export type WasteWhereInput = {
    AND?: Prisma.WasteWhereInput | Prisma.WasteWhereInput[];
    OR?: Prisma.WasteWhereInput[];
    NOT?: Prisma.WasteWhereInput | Prisma.WasteWhereInput[];
    id?: Prisma.UuidFilter<"Waste"> | string;
    reportedAt?: Prisma.DateTimeFilter<"Waste"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"Waste"> | Date | string | null;
    reason?: Prisma.StringFilter<"Waste"> | string;
    status?: Prisma.StringFilter<"Waste"> | string;
    reportedById?: Prisma.UuidFilter<"Waste"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"Waste"> | string | null;
    reportedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.WasteLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
};
export type WasteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    reportedBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.WasteLineOrderByRelationAggregateInput;
    reviewedBy?: Prisma.EmployeeOrderByWithRelationInput;
};
export type WasteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WasteWhereInput | Prisma.WasteWhereInput[];
    OR?: Prisma.WasteWhereInput[];
    NOT?: Prisma.WasteWhereInput | Prisma.WasteWhereInput[];
    reportedAt?: Prisma.DateTimeFilter<"Waste"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"Waste"> | Date | string | null;
    reason?: Prisma.StringFilter<"Waste"> | string;
    status?: Prisma.StringFilter<"Waste"> | string;
    reportedById?: Prisma.UuidFilter<"Waste"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"Waste"> | string | null;
    reportedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.WasteLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
}, "id">;
export type WasteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WasteCountOrderByAggregateInput;
    _max?: Prisma.WasteMaxOrderByAggregateInput;
    _min?: Prisma.WasteMinOrderByAggregateInput;
};
export type WasteScalarWhereWithAggregatesInput = {
    AND?: Prisma.WasteScalarWhereWithAggregatesInput | Prisma.WasteScalarWhereWithAggregatesInput[];
    OR?: Prisma.WasteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WasteScalarWhereWithAggregatesInput | Prisma.WasteScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Waste"> | string;
    reportedAt?: Prisma.DateTimeWithAggregatesFilter<"Waste"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Waste"> | Date | string | null;
    reason?: Prisma.StringWithAggregatesFilter<"Waste"> | string;
    status?: Prisma.StringWithAggregatesFilter<"Waste"> | string;
    reportedById?: Prisma.UuidWithAggregatesFilter<"Waste"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"Waste"> | string | null;
};
export type WasteCreateInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedBy: Prisma.EmployeeCreateNestedOneWithoutReportedWastesInput;
    lines?: Prisma.WasteLineCreateNestedManyWithoutWasteInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedWastesInput;
};
export type WasteUncheckedCreateInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedById: string;
    reviewedById?: string | null;
    lines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutWasteInput;
};
export type WasteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedBy?: Prisma.EmployeeUpdateOneRequiredWithoutReportedWastesNestedInput;
    lines?: Prisma.WasteLineUpdateManyWithoutWasteNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedWastesNestedInput;
};
export type WasteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.WasteLineUncheckedUpdateManyWithoutWasteNestedInput;
};
export type WasteCreateManyInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedById: string;
    reviewedById?: string | null;
};
export type WasteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type WasteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteListRelationFilter = {
    every?: Prisma.WasteWhereInput;
    some?: Prisma.WasteWhereInput;
    none?: Prisma.WasteWhereInput;
};
export type WasteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WasteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type WasteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type WasteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type WasteScalarRelationFilter = {
    is?: Prisma.WasteWhereInput;
    isNot?: Prisma.WasteWhereInput;
};
export type WasteCreateNestedManyWithoutReportedByInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReportedByInput, Prisma.WasteUncheckedCreateWithoutReportedByInput> | Prisma.WasteCreateWithoutReportedByInput[] | Prisma.WasteUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReportedByInput | Prisma.WasteCreateOrConnectWithoutReportedByInput[];
    createMany?: Prisma.WasteCreateManyReportedByInputEnvelope;
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
};
export type WasteCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReviewedByInput, Prisma.WasteUncheckedCreateWithoutReviewedByInput> | Prisma.WasteCreateWithoutReviewedByInput[] | Prisma.WasteUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReviewedByInput | Prisma.WasteCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.WasteCreateManyReviewedByInputEnvelope;
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
};
export type WasteUncheckedCreateNestedManyWithoutReportedByInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReportedByInput, Prisma.WasteUncheckedCreateWithoutReportedByInput> | Prisma.WasteCreateWithoutReportedByInput[] | Prisma.WasteUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReportedByInput | Prisma.WasteCreateOrConnectWithoutReportedByInput[];
    createMany?: Prisma.WasteCreateManyReportedByInputEnvelope;
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
};
export type WasteUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReviewedByInput, Prisma.WasteUncheckedCreateWithoutReviewedByInput> | Prisma.WasteCreateWithoutReviewedByInput[] | Prisma.WasteUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReviewedByInput | Prisma.WasteCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.WasteCreateManyReviewedByInputEnvelope;
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
};
export type WasteUpdateManyWithoutReportedByNestedInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReportedByInput, Prisma.WasteUncheckedCreateWithoutReportedByInput> | Prisma.WasteCreateWithoutReportedByInput[] | Prisma.WasteUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReportedByInput | Prisma.WasteCreateOrConnectWithoutReportedByInput[];
    upsert?: Prisma.WasteUpsertWithWhereUniqueWithoutReportedByInput | Prisma.WasteUpsertWithWhereUniqueWithoutReportedByInput[];
    createMany?: Prisma.WasteCreateManyReportedByInputEnvelope;
    set?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    disconnect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    delete?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    update?: Prisma.WasteUpdateWithWhereUniqueWithoutReportedByInput | Prisma.WasteUpdateWithWhereUniqueWithoutReportedByInput[];
    updateMany?: Prisma.WasteUpdateManyWithWhereWithoutReportedByInput | Prisma.WasteUpdateManyWithWhereWithoutReportedByInput[];
    deleteMany?: Prisma.WasteScalarWhereInput | Prisma.WasteScalarWhereInput[];
};
export type WasteUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReviewedByInput, Prisma.WasteUncheckedCreateWithoutReviewedByInput> | Prisma.WasteCreateWithoutReviewedByInput[] | Prisma.WasteUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReviewedByInput | Prisma.WasteCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.WasteUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.WasteUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.WasteCreateManyReviewedByInputEnvelope;
    set?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    disconnect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    delete?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    update?: Prisma.WasteUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.WasteUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.WasteUpdateManyWithWhereWithoutReviewedByInput | Prisma.WasteUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.WasteScalarWhereInput | Prisma.WasteScalarWhereInput[];
};
export type WasteUncheckedUpdateManyWithoutReportedByNestedInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReportedByInput, Prisma.WasteUncheckedCreateWithoutReportedByInput> | Prisma.WasteCreateWithoutReportedByInput[] | Prisma.WasteUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReportedByInput | Prisma.WasteCreateOrConnectWithoutReportedByInput[];
    upsert?: Prisma.WasteUpsertWithWhereUniqueWithoutReportedByInput | Prisma.WasteUpsertWithWhereUniqueWithoutReportedByInput[];
    createMany?: Prisma.WasteCreateManyReportedByInputEnvelope;
    set?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    disconnect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    delete?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    update?: Prisma.WasteUpdateWithWhereUniqueWithoutReportedByInput | Prisma.WasteUpdateWithWhereUniqueWithoutReportedByInput[];
    updateMany?: Prisma.WasteUpdateManyWithWhereWithoutReportedByInput | Prisma.WasteUpdateManyWithWhereWithoutReportedByInput[];
    deleteMany?: Prisma.WasteScalarWhereInput | Prisma.WasteScalarWhereInput[];
};
export type WasteUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutReviewedByInput, Prisma.WasteUncheckedCreateWithoutReviewedByInput> | Prisma.WasteCreateWithoutReviewedByInput[] | Prisma.WasteUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutReviewedByInput | Prisma.WasteCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.WasteUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.WasteUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.WasteCreateManyReviewedByInputEnvelope;
    set?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    disconnect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    delete?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    connect?: Prisma.WasteWhereUniqueInput | Prisma.WasteWhereUniqueInput[];
    update?: Prisma.WasteUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.WasteUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.WasteUpdateManyWithWhereWithoutReviewedByInput | Prisma.WasteUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.WasteScalarWhereInput | Prisma.WasteScalarWhereInput[];
};
export type WasteCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutLinesInput, Prisma.WasteUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutLinesInput;
    connect?: Prisma.WasteWhereUniqueInput;
};
export type WasteUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.WasteCreateWithoutLinesInput, Prisma.WasteUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.WasteCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.WasteUpsertWithoutLinesInput;
    connect?: Prisma.WasteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WasteUpdateToOneWithWhereWithoutLinesInput, Prisma.WasteUpdateWithoutLinesInput>, Prisma.WasteUncheckedUpdateWithoutLinesInput>;
};
export type WasteCreateWithoutReportedByInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    lines?: Prisma.WasteLineCreateNestedManyWithoutWasteInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedWastesInput;
};
export type WasteUncheckedCreateWithoutReportedByInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reviewedById?: string | null;
    lines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutWasteInput;
};
export type WasteCreateOrConnectWithoutReportedByInput = {
    where: Prisma.WasteWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteCreateWithoutReportedByInput, Prisma.WasteUncheckedCreateWithoutReportedByInput>;
};
export type WasteCreateManyReportedByInputEnvelope = {
    data: Prisma.WasteCreateManyReportedByInput | Prisma.WasteCreateManyReportedByInput[];
    skipDuplicates?: boolean;
};
export type WasteCreateWithoutReviewedByInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedBy: Prisma.EmployeeCreateNestedOneWithoutReportedWastesInput;
    lines?: Prisma.WasteLineCreateNestedManyWithoutWasteInput;
};
export type WasteUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedById: string;
    lines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutWasteInput;
};
export type WasteCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.WasteWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteCreateWithoutReviewedByInput, Prisma.WasteUncheckedCreateWithoutReviewedByInput>;
};
export type WasteCreateManyReviewedByInputEnvelope = {
    data: Prisma.WasteCreateManyReviewedByInput | Prisma.WasteCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type WasteUpsertWithWhereUniqueWithoutReportedByInput = {
    where: Prisma.WasteWhereUniqueInput;
    update: Prisma.XOR<Prisma.WasteUpdateWithoutReportedByInput, Prisma.WasteUncheckedUpdateWithoutReportedByInput>;
    create: Prisma.XOR<Prisma.WasteCreateWithoutReportedByInput, Prisma.WasteUncheckedCreateWithoutReportedByInput>;
};
export type WasteUpdateWithWhereUniqueWithoutReportedByInput = {
    where: Prisma.WasteWhereUniqueInput;
    data: Prisma.XOR<Prisma.WasteUpdateWithoutReportedByInput, Prisma.WasteUncheckedUpdateWithoutReportedByInput>;
};
export type WasteUpdateManyWithWhereWithoutReportedByInput = {
    where: Prisma.WasteScalarWhereInput;
    data: Prisma.XOR<Prisma.WasteUpdateManyMutationInput, Prisma.WasteUncheckedUpdateManyWithoutReportedByInput>;
};
export type WasteScalarWhereInput = {
    AND?: Prisma.WasteScalarWhereInput | Prisma.WasteScalarWhereInput[];
    OR?: Prisma.WasteScalarWhereInput[];
    NOT?: Prisma.WasteScalarWhereInput | Prisma.WasteScalarWhereInput[];
    id?: Prisma.UuidFilter<"Waste"> | string;
    reportedAt?: Prisma.DateTimeFilter<"Waste"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"Waste"> | Date | string | null;
    reason?: Prisma.StringFilter<"Waste"> | string;
    status?: Prisma.StringFilter<"Waste"> | string;
    reportedById?: Prisma.UuidFilter<"Waste"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"Waste"> | string | null;
};
export type WasteUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.WasteWhereUniqueInput;
    update: Prisma.XOR<Prisma.WasteUpdateWithoutReviewedByInput, Prisma.WasteUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.WasteCreateWithoutReviewedByInput, Prisma.WasteUncheckedCreateWithoutReviewedByInput>;
};
export type WasteUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.WasteWhereUniqueInput;
    data: Prisma.XOR<Prisma.WasteUpdateWithoutReviewedByInput, Prisma.WasteUncheckedUpdateWithoutReviewedByInput>;
};
export type WasteUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.WasteScalarWhereInput;
    data: Prisma.XOR<Prisma.WasteUpdateManyMutationInput, Prisma.WasteUncheckedUpdateManyWithoutReviewedByInput>;
};
export type WasteCreateWithoutLinesInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedBy: Prisma.EmployeeCreateNestedOneWithoutReportedWastesInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedWastesInput;
};
export type WasteUncheckedCreateWithoutLinesInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedById: string;
    reviewedById?: string | null;
};
export type WasteCreateOrConnectWithoutLinesInput = {
    where: Prisma.WasteWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteCreateWithoutLinesInput, Prisma.WasteUncheckedCreateWithoutLinesInput>;
};
export type WasteUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.WasteUpdateWithoutLinesInput, Prisma.WasteUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.WasteCreateWithoutLinesInput, Prisma.WasteUncheckedCreateWithoutLinesInput>;
    where?: Prisma.WasteWhereInput;
};
export type WasteUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.WasteWhereInput;
    data: Prisma.XOR<Prisma.WasteUpdateWithoutLinesInput, Prisma.WasteUncheckedUpdateWithoutLinesInput>;
};
export type WasteUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedBy?: Prisma.EmployeeUpdateOneRequiredWithoutReportedWastesNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedWastesNestedInput;
};
export type WasteUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteCreateManyReportedByInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reviewedById?: string | null;
};
export type WasteCreateManyReviewedByInput = {
    id?: string;
    reportedAt?: Date | string;
    approvedAt?: Date | string | null;
    reason: string;
    status?: string;
    reportedById: string;
};
export type WasteUpdateWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.WasteLineUpdateManyWithoutWasteNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedWastesNestedInput;
};
export type WasteUncheckedUpdateWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.WasteLineUncheckedUpdateManyWithoutWasteNestedInput;
};
export type WasteUncheckedUpdateManyWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedBy?: Prisma.EmployeeUpdateOneRequiredWithoutReportedWastesNestedInput;
    lines?: Prisma.WasteLineUpdateManyWithoutWasteNestedInput;
};
export type WasteUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.WasteLineUncheckedUpdateManyWithoutWasteNestedInput;
};
export type WasteUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type WasteCountOutputType = {
    lines: number;
};
export type WasteCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | WasteCountOutputTypeCountLinesArgs;
};
export type WasteCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteCountOutputTypeSelect<ExtArgs> | null;
};
export type WasteCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteLineWhereInput;
};
export type WasteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reportedAt?: boolean;
    approvedAt?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedById?: boolean;
    reviewedById?: boolean;
    reportedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Waste$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.Waste$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.WasteCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["waste"]>;
export type WasteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reportedAt?: boolean;
    approvedAt?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedById?: boolean;
    reviewedById?: boolean;
    reportedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.Waste$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["waste"]>;
export type WasteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reportedAt?: boolean;
    approvedAt?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedById?: boolean;
    reviewedById?: boolean;
    reportedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.Waste$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["waste"]>;
export type WasteSelectScalar = {
    id?: boolean;
    reportedAt?: boolean;
    approvedAt?: boolean;
    reason?: boolean;
    status?: boolean;
    reportedById?: boolean;
    reviewedById?: boolean;
};
export type WasteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reportedAt" | "approvedAt" | "reason" | "status" | "reportedById" | "reviewedById", ExtArgs["result"]["waste"]>;
export type WasteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reportedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Waste$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.Waste$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.WasteCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WasteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reportedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.Waste$reviewedByArgs<ExtArgs>;
};
export type WasteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reportedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.Waste$reviewedByArgs<ExtArgs>;
};
export type $WastePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Waste";
    objects: {
        reportedBy: Prisma.$EmployeePayload<ExtArgs>;
        lines: Prisma.$WasteLinePayload<ExtArgs>[];
        reviewedBy: Prisma.$EmployeePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reportedAt: Date;
        approvedAt: Date | null;
        reason: string;
        status: string;
        reportedById: string;
        reviewedById: string | null;
    }, ExtArgs["result"]["waste"]>;
    composites: {};
};
export type WasteGetPayload<S extends boolean | null | undefined | WasteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WastePayload, S>;
export type WasteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WasteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WasteCountAggregateInputType | true;
};
export interface WasteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Waste'];
        meta: {
            name: 'Waste';
        };
    };
    findUnique<T extends WasteFindUniqueArgs>(args: Prisma.SelectSubset<T, WasteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WasteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WasteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WasteFindFirstArgs>(args?: Prisma.SelectSubset<T, WasteFindFirstArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WasteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WasteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WasteFindManyArgs>(args?: Prisma.SelectSubset<T, WasteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WasteCreateArgs>(args: Prisma.SelectSubset<T, WasteCreateArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WasteCreateManyArgs>(args?: Prisma.SelectSubset<T, WasteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WasteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WasteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WasteDeleteArgs>(args: Prisma.SelectSubset<T, WasteDeleteArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WasteUpdateArgs>(args: Prisma.SelectSubset<T, WasteUpdateArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WasteDeleteManyArgs>(args?: Prisma.SelectSubset<T, WasteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WasteUpdateManyArgs>(args: Prisma.SelectSubset<T, WasteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WasteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WasteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WasteUpsertArgs>(args: Prisma.SelectSubset<T, WasteUpsertArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WasteCountArgs>(args?: Prisma.Subset<T, WasteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WasteCountAggregateOutputType> : number>;
    aggregate<T extends WasteAggregateArgs>(args: Prisma.Subset<T, WasteAggregateArgs>): Prisma.PrismaPromise<GetWasteAggregateType<T>>;
    groupBy<T extends WasteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WasteGroupByArgs['orderBy'];
    } : {
        orderBy?: WasteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WasteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWasteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WasteFieldRefs;
}
export interface Prisma__WasteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    reportedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.Waste$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Waste$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviewedBy<T extends Prisma.Waste$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Waste$reviewedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WasteFieldRefs {
    readonly id: Prisma.FieldRef<"Waste", 'String'>;
    readonly reportedAt: Prisma.FieldRef<"Waste", 'DateTime'>;
    readonly approvedAt: Prisma.FieldRef<"Waste", 'DateTime'>;
    readonly reason: Prisma.FieldRef<"Waste", 'String'>;
    readonly status: Prisma.FieldRef<"Waste", 'String'>;
    readonly reportedById: Prisma.FieldRef<"Waste", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"Waste", 'String'>;
}
export type WasteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    where: Prisma.WasteWhereUniqueInput;
};
export type WasteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    where: Prisma.WasteWhereUniqueInput;
};
export type WasteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    where?: Prisma.WasteWhereInput;
    orderBy?: Prisma.WasteOrderByWithRelationInput | Prisma.WasteOrderByWithRelationInput[];
    cursor?: Prisma.WasteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasteScalarFieldEnum | Prisma.WasteScalarFieldEnum[];
};
export type WasteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    where?: Prisma.WasteWhereInput;
    orderBy?: Prisma.WasteOrderByWithRelationInput | Prisma.WasteOrderByWithRelationInput[];
    cursor?: Prisma.WasteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasteScalarFieldEnum | Prisma.WasteScalarFieldEnum[];
};
export type WasteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    where?: Prisma.WasteWhereInput;
    orderBy?: Prisma.WasteOrderByWithRelationInput | Prisma.WasteOrderByWithRelationInput[];
    cursor?: Prisma.WasteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasteScalarFieldEnum | Prisma.WasteScalarFieldEnum[];
};
export type WasteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasteCreateInput, Prisma.WasteUncheckedCreateInput>;
};
export type WasteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WasteCreateManyInput | Prisma.WasteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WasteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    data: Prisma.WasteCreateManyInput | Prisma.WasteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WasteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WasteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasteUpdateInput, Prisma.WasteUncheckedUpdateInput>;
    where: Prisma.WasteWhereUniqueInput;
};
export type WasteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WasteUpdateManyMutationInput, Prisma.WasteUncheckedUpdateManyInput>;
    where?: Prisma.WasteWhereInput;
    limit?: number;
};
export type WasteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasteUpdateManyMutationInput, Prisma.WasteUncheckedUpdateManyInput>;
    where?: Prisma.WasteWhereInput;
    limit?: number;
    include?: Prisma.WasteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WasteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    where: Prisma.WasteWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteCreateInput, Prisma.WasteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WasteUpdateInput, Prisma.WasteUncheckedUpdateInput>;
};
export type WasteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
    where: Prisma.WasteWhereUniqueInput;
};
export type WasteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteWhereInput;
    limit?: number;
};
export type Waste$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where?: Prisma.WasteLineWhereInput;
    orderBy?: Prisma.WasteLineOrderByWithRelationInput | Prisma.WasteLineOrderByWithRelationInput[];
    cursor?: Prisma.WasteLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasteLineScalarFieldEnum | Prisma.WasteLineScalarFieldEnum[];
};
export type Waste$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type WasteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteSelect<ExtArgs> | null;
    omit?: Prisma.WasteOmit<ExtArgs> | null;
    include?: Prisma.WasteInclude<ExtArgs> | null;
};
