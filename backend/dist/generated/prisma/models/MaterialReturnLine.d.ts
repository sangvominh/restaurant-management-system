import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialReturnLineModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialReturnLinePayload>;
export type AggregateMaterialReturnLine = {
    _count: MaterialReturnLineCountAggregateOutputType | null;
    _avg: MaterialReturnLineAvgAggregateOutputType | null;
    _sum: MaterialReturnLineSumAggregateOutputType | null;
    _min: MaterialReturnLineMinAggregateOutputType | null;
    _max: MaterialReturnLineMaxAggregateOutputType | null;
};
export type MaterialReturnLineAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type MaterialReturnLineSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type MaterialReturnLineMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    returnId: string | null;
    issueLineId: string | null;
};
export type MaterialReturnLineMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    returnId: string | null;
    issueLineId: string | null;
};
export type MaterialReturnLineCountAggregateOutputType = {
    id: number;
    quantity: number;
    returnId: number;
    issueLineId: number;
    _all: number;
};
export type MaterialReturnLineAvgAggregateInputType = {
    quantity?: true;
};
export type MaterialReturnLineSumAggregateInputType = {
    quantity?: true;
};
export type MaterialReturnLineMinAggregateInputType = {
    id?: true;
    quantity?: true;
    returnId?: true;
    issueLineId?: true;
};
export type MaterialReturnLineMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    returnId?: true;
    issueLineId?: true;
};
export type MaterialReturnLineCountAggregateInputType = {
    id?: true;
    quantity?: true;
    returnId?: true;
    issueLineId?: true;
    _all?: true;
};
export type MaterialReturnLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnLineWhereInput;
    orderBy?: Prisma.MaterialReturnLineOrderByWithRelationInput | Prisma.MaterialReturnLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReturnLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialReturnLineCountAggregateInputType;
    _avg?: MaterialReturnLineAvgAggregateInputType;
    _sum?: MaterialReturnLineSumAggregateInputType;
    _min?: MaterialReturnLineMinAggregateInputType;
    _max?: MaterialReturnLineMaxAggregateInputType;
};
export type GetMaterialReturnLineAggregateType<T extends MaterialReturnLineAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialReturnLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialReturnLine[P]> : Prisma.GetScalarType<T[P], AggregateMaterialReturnLine[P]>;
};
export type MaterialReturnLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnLineWhereInput;
    orderBy?: Prisma.MaterialReturnLineOrderByWithAggregationInput | Prisma.MaterialReturnLineOrderByWithAggregationInput[];
    by: Prisma.MaterialReturnLineScalarFieldEnum[] | Prisma.MaterialReturnLineScalarFieldEnum;
    having?: Prisma.MaterialReturnLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialReturnLineCountAggregateInputType | true;
    _avg?: MaterialReturnLineAvgAggregateInputType;
    _sum?: MaterialReturnLineSumAggregateInputType;
    _min?: MaterialReturnLineMinAggregateInputType;
    _max?: MaterialReturnLineMaxAggregateInputType;
};
export type MaterialReturnLineGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    returnId: string;
    issueLineId: string;
    _count: MaterialReturnLineCountAggregateOutputType | null;
    _avg: MaterialReturnLineAvgAggregateOutputType | null;
    _sum: MaterialReturnLineSumAggregateOutputType | null;
    _min: MaterialReturnLineMinAggregateOutputType | null;
    _max: MaterialReturnLineMaxAggregateOutputType | null;
};
export type GetMaterialReturnLineGroupByPayload<T extends MaterialReturnLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialReturnLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialReturnLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialReturnLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialReturnLineGroupByOutputType[P]>;
}>>;
export type MaterialReturnLineWhereInput = {
    AND?: Prisma.MaterialReturnLineWhereInput | Prisma.MaterialReturnLineWhereInput[];
    OR?: Prisma.MaterialReturnLineWhereInput[];
    NOT?: Prisma.MaterialReturnLineWhereInput | Prisma.MaterialReturnLineWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialReturnLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
    issueLineId?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
    return?: Prisma.XOR<Prisma.MaterialReturnScalarRelationFilter, Prisma.MaterialReturnWhereInput>;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineScalarRelationFilter, Prisma.MaterialIssueLineWhereInput>;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
};
export type MaterialReturnLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    return?: Prisma.MaterialReturnOrderByWithRelationInput;
    issueLine?: Prisma.MaterialIssueLineOrderByWithRelationInput;
    materialMovement?: Prisma.MaterialMovementOrderByWithRelationInput;
};
export type MaterialReturnLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MaterialReturnLineWhereInput | Prisma.MaterialReturnLineWhereInput[];
    OR?: Prisma.MaterialReturnLineWhereInput[];
    NOT?: Prisma.MaterialReturnLineWhereInput | Prisma.MaterialReturnLineWhereInput[];
    quantity?: Prisma.DecimalFilter<"MaterialReturnLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
    issueLineId?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
    return?: Prisma.XOR<Prisma.MaterialReturnScalarRelationFilter, Prisma.MaterialReturnWhereInput>;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineScalarRelationFilter, Prisma.MaterialIssueLineWhereInput>;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
}, "id">;
export type MaterialReturnLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    _count?: Prisma.MaterialReturnLineCountOrderByAggregateInput;
    _avg?: Prisma.MaterialReturnLineAvgOrderByAggregateInput;
    _max?: Prisma.MaterialReturnLineMaxOrderByAggregateInput;
    _min?: Prisma.MaterialReturnLineMinOrderByAggregateInput;
    _sum?: Prisma.MaterialReturnLineSumOrderByAggregateInput;
};
export type MaterialReturnLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialReturnLineScalarWhereWithAggregatesInput | Prisma.MaterialReturnLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialReturnLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialReturnLineScalarWhereWithAggregatesInput | Prisma.MaterialReturnLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialReturnLine"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"MaterialReturnLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.UuidWithAggregatesFilter<"MaterialReturnLine"> | string;
    issueLineId?: Prisma.UuidWithAggregatesFilter<"MaterialReturnLine"> | string;
};
export type MaterialReturnLineCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    return: Prisma.MaterialReturnCreateNestedOneWithoutLinesInput;
    issueLine: Prisma.MaterialIssueLineCreateNestedOneWithoutReturnLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutReturnLineInput;
};
export type MaterialReturnLineUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId: string;
    issueLineId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutReturnLineInput;
};
export type MaterialReturnLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    return?: Prisma.MaterialReturnUpdateOneRequiredWithoutLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneRequiredWithoutReturnLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutReturnLineNestedInput;
};
export type MaterialReturnLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutReturnLineNestedInput;
};
export type MaterialReturnLineCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId: string;
    issueLineId: string;
};
export type MaterialReturnLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type MaterialReturnLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReturnLineListRelationFilter = {
    every?: Prisma.MaterialReturnLineWhereInput;
    some?: Prisma.MaterialReturnLineWhereInput;
    none?: Prisma.MaterialReturnLineWhereInput;
};
export type MaterialReturnLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialReturnLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
};
export type MaterialReturnLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MaterialReturnLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
};
export type MaterialReturnLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
};
export type MaterialReturnLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MaterialReturnLineNullableScalarRelationFilter = {
    is?: Prisma.MaterialReturnLineWhereInput | null;
    isNot?: Prisma.MaterialReturnLineWhereInput | null;
};
export type MaterialReturnLineCreateNestedManyWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput> | Prisma.MaterialReturnLineCreateWithoutIssueLineInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput | Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyIssueLineInputEnvelope;
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
};
export type MaterialReturnLineUncheckedCreateNestedManyWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput> | Prisma.MaterialReturnLineCreateWithoutIssueLineInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput | Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyIssueLineInputEnvelope;
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
};
export type MaterialReturnLineUpdateManyWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput> | Prisma.MaterialReturnLineCreateWithoutIssueLineInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput | Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput[];
    upsert?: Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutIssueLineInput | Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutIssueLineInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyIssueLineInputEnvelope;
    set?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    delete?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    update?: Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutIssueLineInput | Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutIssueLineInput[];
    updateMany?: Prisma.MaterialReturnLineUpdateManyWithWhereWithoutIssueLineInput | Prisma.MaterialReturnLineUpdateManyWithWhereWithoutIssueLineInput[];
    deleteMany?: Prisma.MaterialReturnLineScalarWhereInput | Prisma.MaterialReturnLineScalarWhereInput[];
};
export type MaterialReturnLineUncheckedUpdateManyWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput> | Prisma.MaterialReturnLineCreateWithoutIssueLineInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput | Prisma.MaterialReturnLineCreateOrConnectWithoutIssueLineInput[];
    upsert?: Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutIssueLineInput | Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutIssueLineInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyIssueLineInputEnvelope;
    set?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    delete?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    update?: Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutIssueLineInput | Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutIssueLineInput[];
    updateMany?: Prisma.MaterialReturnLineUpdateManyWithWhereWithoutIssueLineInput | Prisma.MaterialReturnLineUpdateManyWithWhereWithoutIssueLineInput[];
    deleteMany?: Prisma.MaterialReturnLineScalarWhereInput | Prisma.MaterialReturnLineScalarWhereInput[];
};
export type MaterialReturnLineCreateNestedManyWithoutReturnInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput> | Prisma.MaterialReturnLineCreateWithoutReturnInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput | Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyReturnInputEnvelope;
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
};
export type MaterialReturnLineUncheckedCreateNestedManyWithoutReturnInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput> | Prisma.MaterialReturnLineCreateWithoutReturnInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput | Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyReturnInputEnvelope;
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
};
export type MaterialReturnLineUpdateManyWithoutReturnNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput> | Prisma.MaterialReturnLineCreateWithoutReturnInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput | Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput[];
    upsert?: Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutReturnInput | Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutReturnInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyReturnInputEnvelope;
    set?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    delete?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    update?: Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutReturnInput | Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutReturnInput[];
    updateMany?: Prisma.MaterialReturnLineUpdateManyWithWhereWithoutReturnInput | Prisma.MaterialReturnLineUpdateManyWithWhereWithoutReturnInput[];
    deleteMany?: Prisma.MaterialReturnLineScalarWhereInput | Prisma.MaterialReturnLineScalarWhereInput[];
};
export type MaterialReturnLineUncheckedUpdateManyWithoutReturnNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput> | Prisma.MaterialReturnLineCreateWithoutReturnInput[] | Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput[];
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput | Prisma.MaterialReturnLineCreateOrConnectWithoutReturnInput[];
    upsert?: Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutReturnInput | Prisma.MaterialReturnLineUpsertWithWhereUniqueWithoutReturnInput[];
    createMany?: Prisma.MaterialReturnLineCreateManyReturnInputEnvelope;
    set?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    delete?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    connect?: Prisma.MaterialReturnLineWhereUniqueInput | Prisma.MaterialReturnLineWhereUniqueInput[];
    update?: Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutReturnInput | Prisma.MaterialReturnLineUpdateWithWhereUniqueWithoutReturnInput[];
    updateMany?: Prisma.MaterialReturnLineUpdateManyWithWhereWithoutReturnInput | Prisma.MaterialReturnLineUpdateManyWithWhereWithoutReturnInput[];
    deleteMany?: Prisma.MaterialReturnLineScalarWhereInput | Prisma.MaterialReturnLineScalarWhereInput[];
};
export type MaterialReturnLineCreateNestedOneWithoutMaterialMovementInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutMaterialMovementInput, Prisma.MaterialReturnLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutMaterialMovementInput;
    connect?: Prisma.MaterialReturnLineWhereUniqueInput;
};
export type MaterialReturnLineUpdateOneWithoutMaterialMovementNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutMaterialMovementInput, Prisma.MaterialReturnLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.MaterialReturnLineCreateOrConnectWithoutMaterialMovementInput;
    upsert?: Prisma.MaterialReturnLineUpsertWithoutMaterialMovementInput;
    disconnect?: Prisma.MaterialReturnLineWhereInput | boolean;
    delete?: Prisma.MaterialReturnLineWhereInput | boolean;
    connect?: Prisma.MaterialReturnLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialReturnLineUpdateToOneWithWhereWithoutMaterialMovementInput, Prisma.MaterialReturnLineUpdateWithoutMaterialMovementInput>, Prisma.MaterialReturnLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type MaterialReturnLineCreateWithoutIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    return: Prisma.MaterialReturnCreateNestedOneWithoutLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutReturnLineInput;
};
export type MaterialReturnLineUncheckedCreateWithoutIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutReturnLineInput;
};
export type MaterialReturnLineCreateOrConnectWithoutIssueLineInput = {
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput>;
};
export type MaterialReturnLineCreateManyIssueLineInputEnvelope = {
    data: Prisma.MaterialReturnLineCreateManyIssueLineInput | Prisma.MaterialReturnLineCreateManyIssueLineInput[];
    skipDuplicates?: boolean;
};
export type MaterialReturnLineUpsertWithWhereUniqueWithoutIssueLineInput = {
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReturnLineUpdateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedUpdateWithoutIssueLineInput>;
    create: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedCreateWithoutIssueLineInput>;
};
export type MaterialReturnLineUpdateWithWhereUniqueWithoutIssueLineInput = {
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateWithoutIssueLineInput, Prisma.MaterialReturnLineUncheckedUpdateWithoutIssueLineInput>;
};
export type MaterialReturnLineUpdateManyWithWhereWithoutIssueLineInput = {
    where: Prisma.MaterialReturnLineScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateManyMutationInput, Prisma.MaterialReturnLineUncheckedUpdateManyWithoutIssueLineInput>;
};
export type MaterialReturnLineScalarWhereInput = {
    AND?: Prisma.MaterialReturnLineScalarWhereInput | Prisma.MaterialReturnLineScalarWhereInput[];
    OR?: Prisma.MaterialReturnLineScalarWhereInput[];
    NOT?: Prisma.MaterialReturnLineScalarWhereInput | Prisma.MaterialReturnLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialReturnLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
    issueLineId?: Prisma.UuidFilter<"MaterialReturnLine"> | string;
};
export type MaterialReturnLineCreateWithoutReturnInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLine: Prisma.MaterialIssueLineCreateNestedOneWithoutReturnLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutReturnLineInput;
};
export type MaterialReturnLineUncheckedCreateWithoutReturnInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutReturnLineInput;
};
export type MaterialReturnLineCreateOrConnectWithoutReturnInput = {
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput>;
};
export type MaterialReturnLineCreateManyReturnInputEnvelope = {
    data: Prisma.MaterialReturnLineCreateManyReturnInput | Prisma.MaterialReturnLineCreateManyReturnInput[];
    skipDuplicates?: boolean;
};
export type MaterialReturnLineUpsertWithWhereUniqueWithoutReturnInput = {
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReturnLineUpdateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedUpdateWithoutReturnInput>;
    create: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedCreateWithoutReturnInput>;
};
export type MaterialReturnLineUpdateWithWhereUniqueWithoutReturnInput = {
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateWithoutReturnInput, Prisma.MaterialReturnLineUncheckedUpdateWithoutReturnInput>;
};
export type MaterialReturnLineUpdateManyWithWhereWithoutReturnInput = {
    where: Prisma.MaterialReturnLineScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateManyMutationInput, Prisma.MaterialReturnLineUncheckedUpdateManyWithoutReturnInput>;
};
export type MaterialReturnLineCreateWithoutMaterialMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    return: Prisma.MaterialReturnCreateNestedOneWithoutLinesInput;
    issueLine: Prisma.MaterialIssueLineCreateNestedOneWithoutReturnLinesInput;
};
export type MaterialReturnLineUncheckedCreateWithoutMaterialMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId: string;
    issueLineId: string;
};
export type MaterialReturnLineCreateOrConnectWithoutMaterialMovementInput = {
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutMaterialMovementInput, Prisma.MaterialReturnLineUncheckedCreateWithoutMaterialMovementInput>;
};
export type MaterialReturnLineUpsertWithoutMaterialMovementInput = {
    update: Prisma.XOR<Prisma.MaterialReturnLineUpdateWithoutMaterialMovementInput, Prisma.MaterialReturnLineUncheckedUpdateWithoutMaterialMovementInput>;
    create: Prisma.XOR<Prisma.MaterialReturnLineCreateWithoutMaterialMovementInput, Prisma.MaterialReturnLineUncheckedCreateWithoutMaterialMovementInput>;
    where?: Prisma.MaterialReturnLineWhereInput;
};
export type MaterialReturnLineUpdateToOneWithWhereWithoutMaterialMovementInput = {
    where?: Prisma.MaterialReturnLineWhereInput;
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateWithoutMaterialMovementInput, Prisma.MaterialReturnLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type MaterialReturnLineUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    return?: Prisma.MaterialReturnUpdateOneRequiredWithoutLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneRequiredWithoutReturnLinesNestedInput;
};
export type MaterialReturnLineUncheckedUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReturnLineCreateManyIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId: string;
};
export type MaterialReturnLineUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    return?: Prisma.MaterialReturnUpdateOneRequiredWithoutLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutReturnLineNestedInput;
};
export type MaterialReturnLineUncheckedUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutReturnLineNestedInput;
};
export type MaterialReturnLineUncheckedUpdateManyWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReturnLineCreateManyReturnInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId: string;
};
export type MaterialReturnLineUpdateWithoutReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLine?: Prisma.MaterialIssueLineUpdateOneRequiredWithoutReturnLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutReturnLineNestedInput;
};
export type MaterialReturnLineUncheckedUpdateWithoutReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutReturnLineNestedInput;
};
export type MaterialReturnLineUncheckedUpdateManyWithoutReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReturnLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    returnId?: boolean;
    issueLineId?: boolean;
    return?: boolean | Prisma.MaterialReturnDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.MaterialReturnLine$materialMovementArgs<ExtArgs>;
}, ExtArgs["result"]["materialReturnLine"]>;
export type MaterialReturnLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    returnId?: boolean;
    issueLineId?: boolean;
    return?: boolean | Prisma.MaterialReturnDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReturnLine"]>;
export type MaterialReturnLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    returnId?: boolean;
    issueLineId?: boolean;
    return?: boolean | Prisma.MaterialReturnDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReturnLine"]>;
export type MaterialReturnLineSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    returnId?: boolean;
    issueLineId?: boolean;
};
export type MaterialReturnLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "returnId" | "issueLineId", ExtArgs["result"]["materialReturnLine"]>;
export type MaterialReturnLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    return?: boolean | Prisma.MaterialReturnDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.MaterialReturnLine$materialMovementArgs<ExtArgs>;
};
export type MaterialReturnLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    return?: boolean | Prisma.MaterialReturnDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
};
export type MaterialReturnLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    return?: boolean | Prisma.MaterialReturnDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
};
export type $MaterialReturnLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialReturnLine";
    objects: {
        return: Prisma.$MaterialReturnPayload<ExtArgs>;
        issueLine: Prisma.$MaterialIssueLinePayload<ExtArgs>;
        materialMovement: Prisma.$MaterialMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        returnId: string;
        issueLineId: string;
    }, ExtArgs["result"]["materialReturnLine"]>;
    composites: {};
};
export type MaterialReturnLineGetPayload<S extends boolean | null | undefined | MaterialReturnLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload, S>;
export type MaterialReturnLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialReturnLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialReturnLineCountAggregateInputType | true;
};
export interface MaterialReturnLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialReturnLine'];
        meta: {
            name: 'MaterialReturnLine';
        };
    };
    findUnique<T extends MaterialReturnLineFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialReturnLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialReturnLineFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialReturnLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialReturnLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialReturnLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialReturnLineFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialReturnLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialReturnLineCreateArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialReturnLineCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialReturnLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialReturnLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialReturnLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialReturnLineDeleteArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialReturnLineUpdateArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialReturnLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialReturnLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialReturnLineUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialReturnLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialReturnLineUpsertArgs>(args: Prisma.SelectSubset<T, MaterialReturnLineUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialReturnLineCountArgs>(args?: Prisma.Subset<T, MaterialReturnLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialReturnLineCountAggregateOutputType> : number>;
    aggregate<T extends MaterialReturnLineAggregateArgs>(args: Prisma.Subset<T, MaterialReturnLineAggregateArgs>): Prisma.PrismaPromise<GetMaterialReturnLineAggregateType<T>>;
    groupBy<T extends MaterialReturnLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialReturnLineGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialReturnLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialReturnLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialReturnLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialReturnLineFieldRefs;
}
export interface Prisma__MaterialReturnLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    return<T extends Prisma.MaterialReturnDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialReturnDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    issueLine<T extends Prisma.MaterialIssueLineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssueLineDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    materialMovement<T extends Prisma.MaterialReturnLine$materialMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialReturnLine$materialMovementArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialReturnLineFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialReturnLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"MaterialReturnLine", 'Decimal'>;
    readonly returnId: Prisma.FieldRef<"MaterialReturnLine", 'String'>;
    readonly issueLineId: Prisma.FieldRef<"MaterialReturnLine", 'String'>;
}
export type MaterialReturnLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnLineWhereUniqueInput;
};
export type MaterialReturnLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnLineWhereUniqueInput;
};
export type MaterialReturnLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialReturnLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialReturnLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialReturnLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReturnLineCreateInput, Prisma.MaterialReturnLineUncheckedCreateInput>;
};
export type MaterialReturnLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialReturnLineCreateManyInput | Prisma.MaterialReturnLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialReturnLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    data: Prisma.MaterialReturnLineCreateManyInput | Prisma.MaterialReturnLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialReturnLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialReturnLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateInput, Prisma.MaterialReturnLineUncheckedUpdateInput>;
    where: Prisma.MaterialReturnLineWhereUniqueInput;
};
export type MaterialReturnLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateManyMutationInput, Prisma.MaterialReturnLineUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReturnLineWhereInput;
    limit?: number;
};
export type MaterialReturnLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReturnLineUpdateManyMutationInput, Prisma.MaterialReturnLineUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReturnLineWhereInput;
    limit?: number;
    include?: Prisma.MaterialReturnLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialReturnLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReturnLineCreateInput, Prisma.MaterialReturnLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialReturnLineUpdateInput, Prisma.MaterialReturnLineUncheckedUpdateInput>;
};
export type MaterialReturnLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReturnLineWhereUniqueInput;
};
export type MaterialReturnLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnLineWhereInput;
    limit?: number;
};
export type MaterialReturnLine$materialMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialReturnLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
};
