import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ConsumptionLineModel = runtime.Types.Result.DefaultSelection<Prisma.$ConsumptionLinePayload>;
export type AggregateConsumptionLine = {
    _count: ConsumptionLineCountAggregateOutputType | null;
    _avg: ConsumptionLineAvgAggregateOutputType | null;
    _sum: ConsumptionLineSumAggregateOutputType | null;
    _min: ConsumptionLineMinAggregateOutputType | null;
    _max: ConsumptionLineMaxAggregateOutputType | null;
};
export type ConsumptionLineAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ConsumptionLineSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ConsumptionLineMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    runId: string | null;
    issueLineId: string | null;
};
export type ConsumptionLineMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    runId: string | null;
    issueLineId: string | null;
};
export type ConsumptionLineCountAggregateOutputType = {
    id: number;
    quantity: number;
    runId: number;
    issueLineId: number;
    _all: number;
};
export type ConsumptionLineAvgAggregateInputType = {
    quantity?: true;
};
export type ConsumptionLineSumAggregateInputType = {
    quantity?: true;
};
export type ConsumptionLineMinAggregateInputType = {
    id?: true;
    quantity?: true;
    runId?: true;
    issueLineId?: true;
};
export type ConsumptionLineMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    runId?: true;
    issueLineId?: true;
};
export type ConsumptionLineCountAggregateInputType = {
    id?: true;
    quantity?: true;
    runId?: true;
    issueLineId?: true;
    _all?: true;
};
export type ConsumptionLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumptionLineWhereInput;
    orderBy?: Prisma.ConsumptionLineOrderByWithRelationInput | Prisma.ConsumptionLineOrderByWithRelationInput[];
    cursor?: Prisma.ConsumptionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConsumptionLineCountAggregateInputType;
    _avg?: ConsumptionLineAvgAggregateInputType;
    _sum?: ConsumptionLineSumAggregateInputType;
    _min?: ConsumptionLineMinAggregateInputType;
    _max?: ConsumptionLineMaxAggregateInputType;
};
export type GetConsumptionLineAggregateType<T extends ConsumptionLineAggregateArgs> = {
    [P in keyof T & keyof AggregateConsumptionLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConsumptionLine[P]> : Prisma.GetScalarType<T[P], AggregateConsumptionLine[P]>;
};
export type ConsumptionLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumptionLineWhereInput;
    orderBy?: Prisma.ConsumptionLineOrderByWithAggregationInput | Prisma.ConsumptionLineOrderByWithAggregationInput[];
    by: Prisma.ConsumptionLineScalarFieldEnum[] | Prisma.ConsumptionLineScalarFieldEnum;
    having?: Prisma.ConsumptionLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConsumptionLineCountAggregateInputType | true;
    _avg?: ConsumptionLineAvgAggregateInputType;
    _sum?: ConsumptionLineSumAggregateInputType;
    _min?: ConsumptionLineMinAggregateInputType;
    _max?: ConsumptionLineMaxAggregateInputType;
};
export type ConsumptionLineGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    runId: string;
    issueLineId: string;
    _count: ConsumptionLineCountAggregateOutputType | null;
    _avg: ConsumptionLineAvgAggregateOutputType | null;
    _sum: ConsumptionLineSumAggregateOutputType | null;
    _min: ConsumptionLineMinAggregateOutputType | null;
    _max: ConsumptionLineMaxAggregateOutputType | null;
};
export type GetConsumptionLineGroupByPayload<T extends ConsumptionLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConsumptionLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConsumptionLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConsumptionLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConsumptionLineGroupByOutputType[P]>;
}>>;
export type ConsumptionLineWhereInput = {
    AND?: Prisma.ConsumptionLineWhereInput | Prisma.ConsumptionLineWhereInput[];
    OR?: Prisma.ConsumptionLineWhereInput[];
    NOT?: Prisma.ConsumptionLineWhereInput | Prisma.ConsumptionLineWhereInput[];
    id?: Prisma.UuidFilter<"ConsumptionLine"> | string;
    quantity?: Prisma.DecimalFilter<"ConsumptionLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.UuidFilter<"ConsumptionLine"> | string;
    issueLineId?: Prisma.UuidFilter<"ConsumptionLine"> | string;
    run?: Prisma.XOR<Prisma.ProductionRunScalarRelationFilter, Prisma.ProductionRunWhereInput>;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineScalarRelationFilter, Prisma.MaterialIssueLineWhereInput>;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
};
export type ConsumptionLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    run?: Prisma.ProductionRunOrderByWithRelationInput;
    issueLine?: Prisma.MaterialIssueLineOrderByWithRelationInput;
    materialMovement?: Prisma.MaterialMovementOrderByWithRelationInput;
};
export type ConsumptionLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ConsumptionLineWhereInput | Prisma.ConsumptionLineWhereInput[];
    OR?: Prisma.ConsumptionLineWhereInput[];
    NOT?: Prisma.ConsumptionLineWhereInput | Prisma.ConsumptionLineWhereInput[];
    quantity?: Prisma.DecimalFilter<"ConsumptionLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.UuidFilter<"ConsumptionLine"> | string;
    issueLineId?: Prisma.UuidFilter<"ConsumptionLine"> | string;
    run?: Prisma.XOR<Prisma.ProductionRunScalarRelationFilter, Prisma.ProductionRunWhereInput>;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineScalarRelationFilter, Prisma.MaterialIssueLineWhereInput>;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
}, "id">;
export type ConsumptionLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    _count?: Prisma.ConsumptionLineCountOrderByAggregateInput;
    _avg?: Prisma.ConsumptionLineAvgOrderByAggregateInput;
    _max?: Prisma.ConsumptionLineMaxOrderByAggregateInput;
    _min?: Prisma.ConsumptionLineMinOrderByAggregateInput;
    _sum?: Prisma.ConsumptionLineSumOrderByAggregateInput;
};
export type ConsumptionLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConsumptionLineScalarWhereWithAggregatesInput | Prisma.ConsumptionLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConsumptionLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConsumptionLineScalarWhereWithAggregatesInput | Prisma.ConsumptionLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ConsumptionLine"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"ConsumptionLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.UuidWithAggregatesFilter<"ConsumptionLine"> | string;
    issueLineId?: Prisma.UuidWithAggregatesFilter<"ConsumptionLine"> | string;
};
export type ConsumptionLineCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    run: Prisma.ProductionRunCreateNestedOneWithoutConsumptionsInput;
    issueLine: Prisma.MaterialIssueLineCreateNestedOneWithoutConsumptionsInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutConsumptionLineInput;
};
export type ConsumptionLineUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId: string;
    issueLineId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutConsumptionLineInput;
};
export type ConsumptionLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    run?: Prisma.ProductionRunUpdateOneRequiredWithoutConsumptionsNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneRequiredWithoutConsumptionsNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutConsumptionLineNestedInput;
};
export type ConsumptionLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutConsumptionLineNestedInput;
};
export type ConsumptionLineCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId: string;
    issueLineId: string;
};
export type ConsumptionLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ConsumptionLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ConsumptionLineListRelationFilter = {
    every?: Prisma.ConsumptionLineWhereInput;
    some?: Prisma.ConsumptionLineWhereInput;
    none?: Prisma.ConsumptionLineWhereInput;
};
export type ConsumptionLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConsumptionLineNullableScalarRelationFilter = {
    is?: Prisma.ConsumptionLineWhereInput | null;
    isNot?: Prisma.ConsumptionLineWhereInput | null;
};
export type ConsumptionLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
};
export type ConsumptionLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ConsumptionLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
};
export type ConsumptionLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
};
export type ConsumptionLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ConsumptionLineCreateNestedManyWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput> | Prisma.ConsumptionLineCreateWithoutIssueLineInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput | Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput[];
    createMany?: Prisma.ConsumptionLineCreateManyIssueLineInputEnvelope;
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
};
export type ConsumptionLineUncheckedCreateNestedManyWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput> | Prisma.ConsumptionLineCreateWithoutIssueLineInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput | Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput[];
    createMany?: Prisma.ConsumptionLineCreateManyIssueLineInputEnvelope;
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
};
export type ConsumptionLineUpdateManyWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput> | Prisma.ConsumptionLineCreateWithoutIssueLineInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput | Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput[];
    upsert?: Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutIssueLineInput | Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutIssueLineInput[];
    createMany?: Prisma.ConsumptionLineCreateManyIssueLineInputEnvelope;
    set?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    disconnect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    delete?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    update?: Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutIssueLineInput | Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutIssueLineInput[];
    updateMany?: Prisma.ConsumptionLineUpdateManyWithWhereWithoutIssueLineInput | Prisma.ConsumptionLineUpdateManyWithWhereWithoutIssueLineInput[];
    deleteMany?: Prisma.ConsumptionLineScalarWhereInput | Prisma.ConsumptionLineScalarWhereInput[];
};
export type ConsumptionLineUncheckedUpdateManyWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput> | Prisma.ConsumptionLineCreateWithoutIssueLineInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput | Prisma.ConsumptionLineCreateOrConnectWithoutIssueLineInput[];
    upsert?: Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutIssueLineInput | Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutIssueLineInput[];
    createMany?: Prisma.ConsumptionLineCreateManyIssueLineInputEnvelope;
    set?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    disconnect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    delete?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    update?: Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutIssueLineInput | Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutIssueLineInput[];
    updateMany?: Prisma.ConsumptionLineUpdateManyWithWhereWithoutIssueLineInput | Prisma.ConsumptionLineUpdateManyWithWhereWithoutIssueLineInput[];
    deleteMany?: Prisma.ConsumptionLineScalarWhereInput | Prisma.ConsumptionLineScalarWhereInput[];
};
export type ConsumptionLineCreateNestedOneWithoutMaterialMovementInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutMaterialMovementInput, Prisma.ConsumptionLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutMaterialMovementInput;
    connect?: Prisma.ConsumptionLineWhereUniqueInput;
};
export type ConsumptionLineUpdateOneWithoutMaterialMovementNestedInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutMaterialMovementInput, Prisma.ConsumptionLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutMaterialMovementInput;
    upsert?: Prisma.ConsumptionLineUpsertWithoutMaterialMovementInput;
    disconnect?: Prisma.ConsumptionLineWhereInput | boolean;
    delete?: Prisma.ConsumptionLineWhereInput | boolean;
    connect?: Prisma.ConsumptionLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConsumptionLineUpdateToOneWithWhereWithoutMaterialMovementInput, Prisma.ConsumptionLineUpdateWithoutMaterialMovementInput>, Prisma.ConsumptionLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type ConsumptionLineCreateNestedManyWithoutRunInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutRunInput, Prisma.ConsumptionLineUncheckedCreateWithoutRunInput> | Prisma.ConsumptionLineCreateWithoutRunInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutRunInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutRunInput | Prisma.ConsumptionLineCreateOrConnectWithoutRunInput[];
    createMany?: Prisma.ConsumptionLineCreateManyRunInputEnvelope;
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
};
export type ConsumptionLineUncheckedCreateNestedManyWithoutRunInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutRunInput, Prisma.ConsumptionLineUncheckedCreateWithoutRunInput> | Prisma.ConsumptionLineCreateWithoutRunInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutRunInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutRunInput | Prisma.ConsumptionLineCreateOrConnectWithoutRunInput[];
    createMany?: Prisma.ConsumptionLineCreateManyRunInputEnvelope;
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
};
export type ConsumptionLineUpdateManyWithoutRunNestedInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutRunInput, Prisma.ConsumptionLineUncheckedCreateWithoutRunInput> | Prisma.ConsumptionLineCreateWithoutRunInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutRunInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutRunInput | Prisma.ConsumptionLineCreateOrConnectWithoutRunInput[];
    upsert?: Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutRunInput | Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutRunInput[];
    createMany?: Prisma.ConsumptionLineCreateManyRunInputEnvelope;
    set?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    disconnect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    delete?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    update?: Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutRunInput | Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutRunInput[];
    updateMany?: Prisma.ConsumptionLineUpdateManyWithWhereWithoutRunInput | Prisma.ConsumptionLineUpdateManyWithWhereWithoutRunInput[];
    deleteMany?: Prisma.ConsumptionLineScalarWhereInput | Prisma.ConsumptionLineScalarWhereInput[];
};
export type ConsumptionLineUncheckedUpdateManyWithoutRunNestedInput = {
    create?: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutRunInput, Prisma.ConsumptionLineUncheckedCreateWithoutRunInput> | Prisma.ConsumptionLineCreateWithoutRunInput[] | Prisma.ConsumptionLineUncheckedCreateWithoutRunInput[];
    connectOrCreate?: Prisma.ConsumptionLineCreateOrConnectWithoutRunInput | Prisma.ConsumptionLineCreateOrConnectWithoutRunInput[];
    upsert?: Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutRunInput | Prisma.ConsumptionLineUpsertWithWhereUniqueWithoutRunInput[];
    createMany?: Prisma.ConsumptionLineCreateManyRunInputEnvelope;
    set?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    disconnect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    delete?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    connect?: Prisma.ConsumptionLineWhereUniqueInput | Prisma.ConsumptionLineWhereUniqueInput[];
    update?: Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutRunInput | Prisma.ConsumptionLineUpdateWithWhereUniqueWithoutRunInput[];
    updateMany?: Prisma.ConsumptionLineUpdateManyWithWhereWithoutRunInput | Prisma.ConsumptionLineUpdateManyWithWhereWithoutRunInput[];
    deleteMany?: Prisma.ConsumptionLineScalarWhereInput | Prisma.ConsumptionLineScalarWhereInput[];
};
export type ConsumptionLineCreateWithoutIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    run: Prisma.ProductionRunCreateNestedOneWithoutConsumptionsInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutConsumptionLineInput;
};
export type ConsumptionLineUncheckedCreateWithoutIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutConsumptionLineInput;
};
export type ConsumptionLineCreateOrConnectWithoutIssueLineInput = {
    where: Prisma.ConsumptionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput>;
};
export type ConsumptionLineCreateManyIssueLineInputEnvelope = {
    data: Prisma.ConsumptionLineCreateManyIssueLineInput | Prisma.ConsumptionLineCreateManyIssueLineInput[];
    skipDuplicates?: boolean;
};
export type ConsumptionLineUpsertWithWhereUniqueWithoutIssueLineInput = {
    where: Prisma.ConsumptionLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConsumptionLineUpdateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedUpdateWithoutIssueLineInput>;
    create: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedCreateWithoutIssueLineInput>;
};
export type ConsumptionLineUpdateWithWhereUniqueWithoutIssueLineInput = {
    where: Prisma.ConsumptionLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateWithoutIssueLineInput, Prisma.ConsumptionLineUncheckedUpdateWithoutIssueLineInput>;
};
export type ConsumptionLineUpdateManyWithWhereWithoutIssueLineInput = {
    where: Prisma.ConsumptionLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateManyMutationInput, Prisma.ConsumptionLineUncheckedUpdateManyWithoutIssueLineInput>;
};
export type ConsumptionLineScalarWhereInput = {
    AND?: Prisma.ConsumptionLineScalarWhereInput | Prisma.ConsumptionLineScalarWhereInput[];
    OR?: Prisma.ConsumptionLineScalarWhereInput[];
    NOT?: Prisma.ConsumptionLineScalarWhereInput | Prisma.ConsumptionLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"ConsumptionLine"> | string;
    quantity?: Prisma.DecimalFilter<"ConsumptionLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.UuidFilter<"ConsumptionLine"> | string;
    issueLineId?: Prisma.UuidFilter<"ConsumptionLine"> | string;
};
export type ConsumptionLineCreateWithoutMaterialMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    run: Prisma.ProductionRunCreateNestedOneWithoutConsumptionsInput;
    issueLine: Prisma.MaterialIssueLineCreateNestedOneWithoutConsumptionsInput;
};
export type ConsumptionLineUncheckedCreateWithoutMaterialMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId: string;
    issueLineId: string;
};
export type ConsumptionLineCreateOrConnectWithoutMaterialMovementInput = {
    where: Prisma.ConsumptionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutMaterialMovementInput, Prisma.ConsumptionLineUncheckedCreateWithoutMaterialMovementInput>;
};
export type ConsumptionLineUpsertWithoutMaterialMovementInput = {
    update: Prisma.XOR<Prisma.ConsumptionLineUpdateWithoutMaterialMovementInput, Prisma.ConsumptionLineUncheckedUpdateWithoutMaterialMovementInput>;
    create: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutMaterialMovementInput, Prisma.ConsumptionLineUncheckedCreateWithoutMaterialMovementInput>;
    where?: Prisma.ConsumptionLineWhereInput;
};
export type ConsumptionLineUpdateToOneWithWhereWithoutMaterialMovementInput = {
    where?: Prisma.ConsumptionLineWhereInput;
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateWithoutMaterialMovementInput, Prisma.ConsumptionLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type ConsumptionLineUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    run?: Prisma.ProductionRunUpdateOneRequiredWithoutConsumptionsNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneRequiredWithoutConsumptionsNestedInput;
};
export type ConsumptionLineUncheckedUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ConsumptionLineCreateWithoutRunInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLine: Prisma.MaterialIssueLineCreateNestedOneWithoutConsumptionsInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutConsumptionLineInput;
};
export type ConsumptionLineUncheckedCreateWithoutRunInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutConsumptionLineInput;
};
export type ConsumptionLineCreateOrConnectWithoutRunInput = {
    where: Prisma.ConsumptionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutRunInput, Prisma.ConsumptionLineUncheckedCreateWithoutRunInput>;
};
export type ConsumptionLineCreateManyRunInputEnvelope = {
    data: Prisma.ConsumptionLineCreateManyRunInput | Prisma.ConsumptionLineCreateManyRunInput[];
    skipDuplicates?: boolean;
};
export type ConsumptionLineUpsertWithWhereUniqueWithoutRunInput = {
    where: Prisma.ConsumptionLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConsumptionLineUpdateWithoutRunInput, Prisma.ConsumptionLineUncheckedUpdateWithoutRunInput>;
    create: Prisma.XOR<Prisma.ConsumptionLineCreateWithoutRunInput, Prisma.ConsumptionLineUncheckedCreateWithoutRunInput>;
};
export type ConsumptionLineUpdateWithWhereUniqueWithoutRunInput = {
    where: Prisma.ConsumptionLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateWithoutRunInput, Prisma.ConsumptionLineUncheckedUpdateWithoutRunInput>;
};
export type ConsumptionLineUpdateManyWithWhereWithoutRunInput = {
    where: Prisma.ConsumptionLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateManyMutationInput, Prisma.ConsumptionLineUncheckedUpdateManyWithoutRunInput>;
};
export type ConsumptionLineCreateManyIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId: string;
};
export type ConsumptionLineUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    run?: Prisma.ProductionRunUpdateOneRequiredWithoutConsumptionsNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutConsumptionLineNestedInput;
};
export type ConsumptionLineUncheckedUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutConsumptionLineNestedInput;
};
export type ConsumptionLineUncheckedUpdateManyWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    runId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ConsumptionLineCreateManyRunInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId: string;
};
export type ConsumptionLineUpdateWithoutRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLine?: Prisma.MaterialIssueLineUpdateOneRequiredWithoutConsumptionsNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutConsumptionLineNestedInput;
};
export type ConsumptionLineUncheckedUpdateWithoutRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutConsumptionLineNestedInput;
};
export type ConsumptionLineUncheckedUpdateManyWithoutRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issueLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ConsumptionLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    runId?: boolean;
    issueLineId?: boolean;
    run?: boolean | Prisma.ProductionRunDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.ConsumptionLine$materialMovementArgs<ExtArgs>;
}, ExtArgs["result"]["consumptionLine"]>;
export type ConsumptionLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    runId?: boolean;
    issueLineId?: boolean;
    run?: boolean | Prisma.ProductionRunDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["consumptionLine"]>;
export type ConsumptionLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    runId?: boolean;
    issueLineId?: boolean;
    run?: boolean | Prisma.ProductionRunDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["consumptionLine"]>;
export type ConsumptionLineSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    runId?: boolean;
    issueLineId?: boolean;
};
export type ConsumptionLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "runId" | "issueLineId", ExtArgs["result"]["consumptionLine"]>;
export type ConsumptionLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    run?: boolean | Prisma.ProductionRunDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.ConsumptionLine$materialMovementArgs<ExtArgs>;
};
export type ConsumptionLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    run?: boolean | Prisma.ProductionRunDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
};
export type ConsumptionLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    run?: boolean | Prisma.ProductionRunDefaultArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialIssueLineDefaultArgs<ExtArgs>;
};
export type $ConsumptionLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ConsumptionLine";
    objects: {
        run: Prisma.$ProductionRunPayload<ExtArgs>;
        issueLine: Prisma.$MaterialIssueLinePayload<ExtArgs>;
        materialMovement: Prisma.$MaterialMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        runId: string;
        issueLineId: string;
    }, ExtArgs["result"]["consumptionLine"]>;
    composites: {};
};
export type ConsumptionLineGetPayload<S extends boolean | null | undefined | ConsumptionLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload, S>;
export type ConsumptionLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConsumptionLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConsumptionLineCountAggregateInputType | true;
};
export interface ConsumptionLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ConsumptionLine'];
        meta: {
            name: 'ConsumptionLine';
        };
    };
    findUnique<T extends ConsumptionLineFindUniqueArgs>(args: Prisma.SelectSubset<T, ConsumptionLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConsumptionLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConsumptionLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConsumptionLineFindFirstArgs>(args?: Prisma.SelectSubset<T, ConsumptionLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConsumptionLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConsumptionLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConsumptionLineFindManyArgs>(args?: Prisma.SelectSubset<T, ConsumptionLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConsumptionLineCreateArgs>(args: Prisma.SelectSubset<T, ConsumptionLineCreateArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConsumptionLineCreateManyArgs>(args?: Prisma.SelectSubset<T, ConsumptionLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConsumptionLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConsumptionLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConsumptionLineDeleteArgs>(args: Prisma.SelectSubset<T, ConsumptionLineDeleteArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConsumptionLineUpdateArgs>(args: Prisma.SelectSubset<T, ConsumptionLineUpdateArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConsumptionLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConsumptionLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConsumptionLineUpdateManyArgs>(args: Prisma.SelectSubset<T, ConsumptionLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConsumptionLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConsumptionLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConsumptionLineUpsertArgs>(args: Prisma.SelectSubset<T, ConsumptionLineUpsertArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConsumptionLineCountArgs>(args?: Prisma.Subset<T, ConsumptionLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConsumptionLineCountAggregateOutputType> : number>;
    aggregate<T extends ConsumptionLineAggregateArgs>(args: Prisma.Subset<T, ConsumptionLineAggregateArgs>): Prisma.PrismaPromise<GetConsumptionLineAggregateType<T>>;
    groupBy<T extends ConsumptionLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConsumptionLineGroupByArgs['orderBy'];
    } : {
        orderBy?: ConsumptionLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConsumptionLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsumptionLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConsumptionLineFieldRefs;
}
export interface Prisma__ConsumptionLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    run<T extends Prisma.ProductionRunDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionRunDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    issueLine<T extends Prisma.MaterialIssueLineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssueLineDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    materialMovement<T extends Prisma.ConsumptionLine$materialMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConsumptionLine$materialMovementArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConsumptionLineFieldRefs {
    readonly id: Prisma.FieldRef<"ConsumptionLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"ConsumptionLine", 'Decimal'>;
    readonly runId: Prisma.FieldRef<"ConsumptionLine", 'String'>;
    readonly issueLineId: Prisma.FieldRef<"ConsumptionLine", 'String'>;
}
export type ConsumptionLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where: Prisma.ConsumptionLineWhereUniqueInput;
};
export type ConsumptionLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where: Prisma.ConsumptionLineWhereUniqueInput;
};
export type ConsumptionLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where?: Prisma.ConsumptionLineWhereInput;
    orderBy?: Prisma.ConsumptionLineOrderByWithRelationInput | Prisma.ConsumptionLineOrderByWithRelationInput[];
    cursor?: Prisma.ConsumptionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsumptionLineScalarFieldEnum | Prisma.ConsumptionLineScalarFieldEnum[];
};
export type ConsumptionLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where?: Prisma.ConsumptionLineWhereInput;
    orderBy?: Prisma.ConsumptionLineOrderByWithRelationInput | Prisma.ConsumptionLineOrderByWithRelationInput[];
    cursor?: Prisma.ConsumptionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsumptionLineScalarFieldEnum | Prisma.ConsumptionLineScalarFieldEnum[];
};
export type ConsumptionLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where?: Prisma.ConsumptionLineWhereInput;
    orderBy?: Prisma.ConsumptionLineOrderByWithRelationInput | Prisma.ConsumptionLineOrderByWithRelationInput[];
    cursor?: Prisma.ConsumptionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsumptionLineScalarFieldEnum | Prisma.ConsumptionLineScalarFieldEnum[];
};
export type ConsumptionLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsumptionLineCreateInput, Prisma.ConsumptionLineUncheckedCreateInput>;
};
export type ConsumptionLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConsumptionLineCreateManyInput | Prisma.ConsumptionLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConsumptionLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    data: Prisma.ConsumptionLineCreateManyInput | Prisma.ConsumptionLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConsumptionLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConsumptionLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateInput, Prisma.ConsumptionLineUncheckedUpdateInput>;
    where: Prisma.ConsumptionLineWhereUniqueInput;
};
export type ConsumptionLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateManyMutationInput, Prisma.ConsumptionLineUncheckedUpdateManyInput>;
    where?: Prisma.ConsumptionLineWhereInput;
    limit?: number;
};
export type ConsumptionLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsumptionLineUpdateManyMutationInput, Prisma.ConsumptionLineUncheckedUpdateManyInput>;
    where?: Prisma.ConsumptionLineWhereInput;
    limit?: number;
    include?: Prisma.ConsumptionLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConsumptionLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where: Prisma.ConsumptionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsumptionLineCreateInput, Prisma.ConsumptionLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConsumptionLineUpdateInput, Prisma.ConsumptionLineUncheckedUpdateInput>;
};
export type ConsumptionLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where: Prisma.ConsumptionLineWhereUniqueInput;
};
export type ConsumptionLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumptionLineWhereInput;
    limit?: number;
};
export type ConsumptionLine$materialMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
};
export type ConsumptionLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
};
