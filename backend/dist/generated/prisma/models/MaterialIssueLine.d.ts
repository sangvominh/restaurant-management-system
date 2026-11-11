import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialIssueLineModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialIssueLinePayload>;
export type AggregateMaterialIssueLine = {
    _count: MaterialIssueLineCountAggregateOutputType | null;
    _avg: MaterialIssueLineAvgAggregateOutputType | null;
    _sum: MaterialIssueLineSumAggregateOutputType | null;
    _min: MaterialIssueLineMinAggregateOutputType | null;
    _max: MaterialIssueLineMaxAggregateOutputType | null;
};
export type MaterialIssueLineAvgAggregateOutputType = {
    requestedQuantity: runtime.Decimal | null;
    issuedQuantity: runtime.Decimal | null;
};
export type MaterialIssueLineSumAggregateOutputType = {
    requestedQuantity: runtime.Decimal | null;
    issuedQuantity: runtime.Decimal | null;
};
export type MaterialIssueLineMinAggregateOutputType = {
    id: string | null;
    requestedQuantity: runtime.Decimal | null;
    issuedQuantity: runtime.Decimal | null;
    issueId: string | null;
    lotId: string | null;
};
export type MaterialIssueLineMaxAggregateOutputType = {
    id: string | null;
    requestedQuantity: runtime.Decimal | null;
    issuedQuantity: runtime.Decimal | null;
    issueId: string | null;
    lotId: string | null;
};
export type MaterialIssueLineCountAggregateOutputType = {
    id: number;
    requestedQuantity: number;
    issuedQuantity: number;
    issueId: number;
    lotId: number;
    _all: number;
};
export type MaterialIssueLineAvgAggregateInputType = {
    requestedQuantity?: true;
    issuedQuantity?: true;
};
export type MaterialIssueLineSumAggregateInputType = {
    requestedQuantity?: true;
    issuedQuantity?: true;
};
export type MaterialIssueLineMinAggregateInputType = {
    id?: true;
    requestedQuantity?: true;
    issuedQuantity?: true;
    issueId?: true;
    lotId?: true;
};
export type MaterialIssueLineMaxAggregateInputType = {
    id?: true;
    requestedQuantity?: true;
    issuedQuantity?: true;
    issueId?: true;
    lotId?: true;
};
export type MaterialIssueLineCountAggregateInputType = {
    id?: true;
    requestedQuantity?: true;
    issuedQuantity?: true;
    issueId?: true;
    lotId?: true;
    _all?: true;
};
export type MaterialIssueLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueLineWhereInput;
    orderBy?: Prisma.MaterialIssueLineOrderByWithRelationInput | Prisma.MaterialIssueLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialIssueLineCountAggregateInputType;
    _avg?: MaterialIssueLineAvgAggregateInputType;
    _sum?: MaterialIssueLineSumAggregateInputType;
    _min?: MaterialIssueLineMinAggregateInputType;
    _max?: MaterialIssueLineMaxAggregateInputType;
};
export type GetMaterialIssueLineAggregateType<T extends MaterialIssueLineAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialIssueLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialIssueLine[P]> : Prisma.GetScalarType<T[P], AggregateMaterialIssueLine[P]>;
};
export type MaterialIssueLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueLineWhereInput;
    orderBy?: Prisma.MaterialIssueLineOrderByWithAggregationInput | Prisma.MaterialIssueLineOrderByWithAggregationInput[];
    by: Prisma.MaterialIssueLineScalarFieldEnum[] | Prisma.MaterialIssueLineScalarFieldEnum;
    having?: Prisma.MaterialIssueLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialIssueLineCountAggregateInputType | true;
    _avg?: MaterialIssueLineAvgAggregateInputType;
    _sum?: MaterialIssueLineSumAggregateInputType;
    _min?: MaterialIssueLineMinAggregateInputType;
    _max?: MaterialIssueLineMaxAggregateInputType;
};
export type MaterialIssueLineGroupByOutputType = {
    id: string;
    requestedQuantity: runtime.Decimal;
    issuedQuantity: runtime.Decimal | null;
    issueId: string;
    lotId: string;
    _count: MaterialIssueLineCountAggregateOutputType | null;
    _avg: MaterialIssueLineAvgAggregateOutputType | null;
    _sum: MaterialIssueLineSumAggregateOutputType | null;
    _min: MaterialIssueLineMinAggregateOutputType | null;
    _max: MaterialIssueLineMaxAggregateOutputType | null;
};
export type GetMaterialIssueLineGroupByPayload<T extends MaterialIssueLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialIssueLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialIssueLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialIssueLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialIssueLineGroupByOutputType[P]>;
}>>;
export type MaterialIssueLineWhereInput = {
    AND?: Prisma.MaterialIssueLineWhereInput | Prisma.MaterialIssueLineWhereInput[];
    OR?: Prisma.MaterialIssueLineWhereInput[];
    NOT?: Prisma.MaterialIssueLineWhereInput | Prisma.MaterialIssueLineWhereInput[];
    id?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
    requestedQuantity?: Prisma.DecimalFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.DecimalNullableFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
    lotId?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
    issue?: Prisma.XOR<Prisma.MaterialIssueScalarRelationFilter, Prisma.MaterialIssueWhereInput>;
    lot?: Prisma.XOR<Prisma.MaterialLotScalarRelationFilter, Prisma.MaterialLotWhereInput>;
    consumptions?: Prisma.ConsumptionLineListRelationFilter;
    returnLines?: Prisma.MaterialReturnLineListRelationFilter;
    wasteLines?: Prisma.WasteLineListRelationFilter;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
};
export type MaterialIssueLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    issuedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    issue?: Prisma.MaterialIssueOrderByWithRelationInput;
    lot?: Prisma.MaterialLotOrderByWithRelationInput;
    consumptions?: Prisma.ConsumptionLineOrderByRelationAggregateInput;
    returnLines?: Prisma.MaterialReturnLineOrderByRelationAggregateInput;
    wasteLines?: Prisma.WasteLineOrderByRelationAggregateInput;
    materialMovement?: Prisma.MaterialMovementOrderByWithRelationInput;
};
export type MaterialIssueLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MaterialIssueLineWhereInput | Prisma.MaterialIssueLineWhereInput[];
    OR?: Prisma.MaterialIssueLineWhereInput[];
    NOT?: Prisma.MaterialIssueLineWhereInput | Prisma.MaterialIssueLineWhereInput[];
    requestedQuantity?: Prisma.DecimalFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.DecimalNullableFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
    lotId?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
    issue?: Prisma.XOR<Prisma.MaterialIssueScalarRelationFilter, Prisma.MaterialIssueWhereInput>;
    lot?: Prisma.XOR<Prisma.MaterialLotScalarRelationFilter, Prisma.MaterialLotWhereInput>;
    consumptions?: Prisma.ConsumptionLineListRelationFilter;
    returnLines?: Prisma.MaterialReturnLineListRelationFilter;
    wasteLines?: Prisma.WasteLineListRelationFilter;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
}, "id">;
export type MaterialIssueLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    issuedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    _count?: Prisma.MaterialIssueLineCountOrderByAggregateInput;
    _avg?: Prisma.MaterialIssueLineAvgOrderByAggregateInput;
    _max?: Prisma.MaterialIssueLineMaxOrderByAggregateInput;
    _min?: Prisma.MaterialIssueLineMinOrderByAggregateInput;
    _sum?: Prisma.MaterialIssueLineSumOrderByAggregateInput;
};
export type MaterialIssueLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialIssueLineScalarWhereWithAggregatesInput | Prisma.MaterialIssueLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialIssueLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialIssueLineScalarWhereWithAggregatesInput | Prisma.MaterialIssueLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialIssueLine"> | string;
    requestedQuantity?: Prisma.DecimalWithAggregatesFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.DecimalNullableWithAggregatesFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.UuidWithAggregatesFilter<"MaterialIssueLine"> | string;
    lotId?: Prisma.UuidWithAggregatesFilter<"MaterialIssueLine"> | string;
};
export type MaterialIssueLineCreateInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue: Prisma.MaterialIssueCreateNestedOneWithoutLinesInput;
    lot: Prisma.MaterialLotCreateNestedOneWithoutIssueLinesInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineUncheckedCreateInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
    lotId: string;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue?: Prisma.MaterialIssueUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutIssueLinesNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineCreateManyInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
    lotId: string;
};
export type MaterialIssueLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type MaterialIssueLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialIssueLineListRelationFilter = {
    every?: Prisma.MaterialIssueLineWhereInput;
    some?: Prisma.MaterialIssueLineWhereInput;
    none?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialIssueLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialIssueLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    issuedQuantity?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type MaterialIssueLineAvgOrderByAggregateInput = {
    requestedQuantity?: Prisma.SortOrder;
    issuedQuantity?: Prisma.SortOrder;
};
export type MaterialIssueLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    issuedQuantity?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type MaterialIssueLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    issuedQuantity?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type MaterialIssueLineSumOrderByAggregateInput = {
    requestedQuantity?: Prisma.SortOrder;
    issuedQuantity?: Prisma.SortOrder;
};
export type MaterialIssueLineScalarRelationFilter = {
    is?: Prisma.MaterialIssueLineWhereInput;
    isNot?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialIssueLineNullableScalarRelationFilter = {
    is?: Prisma.MaterialIssueLineWhereInput | null;
    isNot?: Prisma.MaterialIssueLineWhereInput | null;
};
export type MaterialIssueLineCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutLotInput, Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput> | Prisma.MaterialIssueLineCreateWithoutLotInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput | Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyLotInputEnvelope;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
};
export type MaterialIssueLineUncheckedCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutLotInput, Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput> | Prisma.MaterialIssueLineCreateWithoutLotInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput | Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyLotInputEnvelope;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
};
export type MaterialIssueLineUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutLotInput, Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput> | Prisma.MaterialIssueLineCreateWithoutLotInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput | Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutLotInput | Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyLotInputEnvelope;
    set?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    delete?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    update?: Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutLotInput | Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.MaterialIssueLineUpdateManyWithWhereWithoutLotInput | Prisma.MaterialIssueLineUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.MaterialIssueLineScalarWhereInput | Prisma.MaterialIssueLineScalarWhereInput[];
};
export type MaterialIssueLineUncheckedUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutLotInput, Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput> | Prisma.MaterialIssueLineCreateWithoutLotInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput | Prisma.MaterialIssueLineCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutLotInput | Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyLotInputEnvelope;
    set?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    delete?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    update?: Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutLotInput | Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.MaterialIssueLineUpdateManyWithWhereWithoutLotInput | Prisma.MaterialIssueLineUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.MaterialIssueLineScalarWhereInput | Prisma.MaterialIssueLineScalarWhereInput[];
};
export type MaterialIssueLineCreateNestedManyWithoutIssueInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput> | Prisma.MaterialIssueLineCreateWithoutIssueInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput | Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyIssueInputEnvelope;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
};
export type MaterialIssueLineUncheckedCreateNestedManyWithoutIssueInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput> | Prisma.MaterialIssueLineCreateWithoutIssueInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput | Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyIssueInputEnvelope;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
};
export type MaterialIssueLineUpdateManyWithoutIssueNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput> | Prisma.MaterialIssueLineCreateWithoutIssueInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput | Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput[];
    upsert?: Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutIssueInput | Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutIssueInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyIssueInputEnvelope;
    set?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    delete?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    update?: Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutIssueInput | Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutIssueInput[];
    updateMany?: Prisma.MaterialIssueLineUpdateManyWithWhereWithoutIssueInput | Prisma.MaterialIssueLineUpdateManyWithWhereWithoutIssueInput[];
    deleteMany?: Prisma.MaterialIssueLineScalarWhereInput | Prisma.MaterialIssueLineScalarWhereInput[];
};
export type MaterialIssueLineUncheckedUpdateManyWithoutIssueNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput> | Prisma.MaterialIssueLineCreateWithoutIssueInput[] | Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput[];
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput | Prisma.MaterialIssueLineCreateOrConnectWithoutIssueInput[];
    upsert?: Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutIssueInput | Prisma.MaterialIssueLineUpsertWithWhereUniqueWithoutIssueInput[];
    createMany?: Prisma.MaterialIssueLineCreateManyIssueInputEnvelope;
    set?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    delete?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    connect?: Prisma.MaterialIssueLineWhereUniqueInput | Prisma.MaterialIssueLineWhereUniqueInput[];
    update?: Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutIssueInput | Prisma.MaterialIssueLineUpdateWithWhereUniqueWithoutIssueInput[];
    updateMany?: Prisma.MaterialIssueLineUpdateManyWithWhereWithoutIssueInput | Prisma.MaterialIssueLineUpdateManyWithWhereWithoutIssueInput[];
    deleteMany?: Prisma.MaterialIssueLineScalarWhereInput | Prisma.MaterialIssueLineScalarWhereInput[];
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type MaterialIssueLineCreateNestedOneWithoutReturnLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutReturnLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutReturnLinesInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutReturnLinesInput;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineUpdateOneRequiredWithoutReturnLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutReturnLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutReturnLinesInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutReturnLinesInput;
    upsert?: Prisma.MaterialIssueLineUpsertWithoutReturnLinesInput;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialIssueLineUpdateToOneWithWhereWithoutReturnLinesInput, Prisma.MaterialIssueLineUpdateWithoutReturnLinesInput>, Prisma.MaterialIssueLineUncheckedUpdateWithoutReturnLinesInput>;
};
export type MaterialIssueLineCreateNestedOneWithoutWasteLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutWasteLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutWasteLinesInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutWasteLinesInput;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineUpdateOneWithoutWasteLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutWasteLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutWasteLinesInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutWasteLinesInput;
    upsert?: Prisma.MaterialIssueLineUpsertWithoutWasteLinesInput;
    disconnect?: Prisma.MaterialIssueLineWhereInput | boolean;
    delete?: Prisma.MaterialIssueLineWhereInput | boolean;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialIssueLineUpdateToOneWithWhereWithoutWasteLinesInput, Prisma.MaterialIssueLineUpdateWithoutWasteLinesInput>, Prisma.MaterialIssueLineUncheckedUpdateWithoutWasteLinesInput>;
};
export type MaterialIssueLineCreateNestedOneWithoutMaterialMovementInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutMaterialMovementInput, Prisma.MaterialIssueLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutMaterialMovementInput;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineUpdateOneWithoutMaterialMovementNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutMaterialMovementInput, Prisma.MaterialIssueLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutMaterialMovementInput;
    upsert?: Prisma.MaterialIssueLineUpsertWithoutMaterialMovementInput;
    disconnect?: Prisma.MaterialIssueLineWhereInput | boolean;
    delete?: Prisma.MaterialIssueLineWhereInput | boolean;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialIssueLineUpdateToOneWithWhereWithoutMaterialMovementInput, Prisma.MaterialIssueLineUpdateWithoutMaterialMovementInput>, Prisma.MaterialIssueLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type MaterialIssueLineCreateNestedOneWithoutConsumptionsInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutConsumptionsInput, Prisma.MaterialIssueLineUncheckedCreateWithoutConsumptionsInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutConsumptionsInput;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineUpdateOneRequiredWithoutConsumptionsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutConsumptionsInput, Prisma.MaterialIssueLineUncheckedCreateWithoutConsumptionsInput>;
    connectOrCreate?: Prisma.MaterialIssueLineCreateOrConnectWithoutConsumptionsInput;
    upsert?: Prisma.MaterialIssueLineUpsertWithoutConsumptionsInput;
    connect?: Prisma.MaterialIssueLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialIssueLineUpdateToOneWithWhereWithoutConsumptionsInput, Prisma.MaterialIssueLineUpdateWithoutConsumptionsInput>, Prisma.MaterialIssueLineUncheckedUpdateWithoutConsumptionsInput>;
};
export type MaterialIssueLineCreateWithoutLotInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue: Prisma.MaterialIssueCreateNestedOneWithoutLinesInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineUncheckedCreateWithoutLotInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineCreateOrConnectWithoutLotInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutLotInput, Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput>;
};
export type MaterialIssueLineCreateManyLotInputEnvelope = {
    data: Prisma.MaterialIssueLineCreateManyLotInput | Prisma.MaterialIssueLineCreateManyLotInput[];
    skipDuplicates?: boolean;
};
export type MaterialIssueLineUpsertWithWhereUniqueWithoutLotInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutLotInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutLotInput>;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutLotInput, Prisma.MaterialIssueLineUncheckedCreateWithoutLotInput>;
};
export type MaterialIssueLineUpdateWithWhereUniqueWithoutLotInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutLotInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutLotInput>;
};
export type MaterialIssueLineUpdateManyWithWhereWithoutLotInput = {
    where: Prisma.MaterialIssueLineScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateManyMutationInput, Prisma.MaterialIssueLineUncheckedUpdateManyWithoutLotInput>;
};
export type MaterialIssueLineScalarWhereInput = {
    AND?: Prisma.MaterialIssueLineScalarWhereInput | Prisma.MaterialIssueLineScalarWhereInput[];
    OR?: Prisma.MaterialIssueLineScalarWhereInput[];
    NOT?: Prisma.MaterialIssueLineScalarWhereInput | Prisma.MaterialIssueLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
    requestedQuantity?: Prisma.DecimalFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.DecimalNullableFilter<"MaterialIssueLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
    lotId?: Prisma.UuidFilter<"MaterialIssueLine"> | string;
};
export type MaterialIssueLineCreateWithoutIssueInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lot: Prisma.MaterialLotCreateNestedOneWithoutIssueLinesInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineUncheckedCreateWithoutIssueInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lotId: string;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineCreateOrConnectWithoutIssueInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput>;
};
export type MaterialIssueLineCreateManyIssueInputEnvelope = {
    data: Prisma.MaterialIssueLineCreateManyIssueInput | Prisma.MaterialIssueLineCreateManyIssueInput[];
    skipDuplicates?: boolean;
};
export type MaterialIssueLineUpsertWithWhereUniqueWithoutIssueInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutIssueInput>;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedCreateWithoutIssueInput>;
};
export type MaterialIssueLineUpdateWithWhereUniqueWithoutIssueInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutIssueInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutIssueInput>;
};
export type MaterialIssueLineUpdateManyWithWhereWithoutIssueInput = {
    where: Prisma.MaterialIssueLineScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateManyMutationInput, Prisma.MaterialIssueLineUncheckedUpdateManyWithoutIssueInput>;
};
export type MaterialIssueLineCreateWithoutReturnLinesInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue: Prisma.MaterialIssueCreateNestedOneWithoutLinesInput;
    lot: Prisma.MaterialLotCreateNestedOneWithoutIssueLinesInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineUncheckedCreateWithoutReturnLinesInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
    lotId: string;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineCreateOrConnectWithoutReturnLinesInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutReturnLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutReturnLinesInput>;
};
export type MaterialIssueLineUpsertWithoutReturnLinesInput = {
    update: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutReturnLinesInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutReturnLinesInput>;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutReturnLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutReturnLinesInput>;
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialIssueLineUpdateToOneWithWhereWithoutReturnLinesInput = {
    where?: Prisma.MaterialIssueLineWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutReturnLinesInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutReturnLinesInput>;
};
export type MaterialIssueLineUpdateWithoutReturnLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue?: Prisma.MaterialIssueUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutIssueLinesNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateWithoutReturnLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineCreateWithoutWasteLinesInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue: Prisma.MaterialIssueCreateNestedOneWithoutLinesInput;
    lot: Prisma.MaterialLotCreateNestedOneWithoutIssueLinesInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineUncheckedCreateWithoutWasteLinesInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
    lotId: string;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineCreateOrConnectWithoutWasteLinesInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutWasteLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutWasteLinesInput>;
};
export type MaterialIssueLineUpsertWithoutWasteLinesInput = {
    update: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutWasteLinesInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutWasteLinesInput>;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutWasteLinesInput, Prisma.MaterialIssueLineUncheckedCreateWithoutWasteLinesInput>;
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialIssueLineUpdateToOneWithWhereWithoutWasteLinesInput = {
    where?: Prisma.MaterialIssueLineWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutWasteLinesInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutWasteLinesInput>;
};
export type MaterialIssueLineUpdateWithoutWasteLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue?: Prisma.MaterialIssueUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutIssueLinesNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateWithoutWasteLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineCreateWithoutMaterialMovementInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue: Prisma.MaterialIssueCreateNestedOneWithoutLinesInput;
    lot: Prisma.MaterialLotCreateNestedOneWithoutIssueLinesInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutIssueLineInput;
};
export type MaterialIssueLineUncheckedCreateWithoutMaterialMovementInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
    lotId: string;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutIssueLineInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutIssueLineInput;
};
export type MaterialIssueLineCreateOrConnectWithoutMaterialMovementInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutMaterialMovementInput, Prisma.MaterialIssueLineUncheckedCreateWithoutMaterialMovementInput>;
};
export type MaterialIssueLineUpsertWithoutMaterialMovementInput = {
    update: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutMaterialMovementInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutMaterialMovementInput>;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutMaterialMovementInput, Prisma.MaterialIssueLineUncheckedCreateWithoutMaterialMovementInput>;
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialIssueLineUpdateToOneWithWhereWithoutMaterialMovementInput = {
    where?: Prisma.MaterialIssueLineWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutMaterialMovementInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type MaterialIssueLineUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue?: Prisma.MaterialIssueUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutIssueLinesNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutIssueLineNestedInput;
};
export type MaterialIssueLineCreateWithoutConsumptionsInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue: Prisma.MaterialIssueCreateNestedOneWithoutLinesInput;
    lot: Prisma.MaterialLotCreateNestedOneWithoutIssueLinesInput;
    returnLines?: Prisma.MaterialReturnLineCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineUncheckedCreateWithoutConsumptionsInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
    lotId: string;
    returnLines?: Prisma.MaterialReturnLineUncheckedCreateNestedManyWithoutIssueLineInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutIssueLineInput;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutIssueLineInput;
};
export type MaterialIssueLineCreateOrConnectWithoutConsumptionsInput = {
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutConsumptionsInput, Prisma.MaterialIssueLineUncheckedCreateWithoutConsumptionsInput>;
};
export type MaterialIssueLineUpsertWithoutConsumptionsInput = {
    update: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutConsumptionsInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutConsumptionsInput>;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateWithoutConsumptionsInput, Prisma.MaterialIssueLineUncheckedCreateWithoutConsumptionsInput>;
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialIssueLineUpdateToOneWithWhereWithoutConsumptionsInput = {
    where?: Prisma.MaterialIssueLineWhereInput;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateWithoutConsumptionsInput, Prisma.MaterialIssueLineUncheckedUpdateWithoutConsumptionsInput>;
};
export type MaterialIssueLineUpdateWithoutConsumptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue?: Prisma.MaterialIssueUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutIssueLinesNestedInput;
    returnLines?: Prisma.MaterialReturnLineUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateWithoutConsumptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnLines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineCreateManyLotInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId: string;
};
export type MaterialIssueLineUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issue?: Prisma.MaterialIssueUpdateOneRequiredWithoutLinesNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateManyWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialIssueLineCreateManyIssueInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lotId: string;
};
export type MaterialIssueLineUpdateWithoutIssueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutIssueLinesNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateWithoutIssueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    returnLines?: Prisma.MaterialReturnLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutIssueLineNestedInput;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutIssueLineNestedInput;
};
export type MaterialIssueLineUncheckedUpdateManyWithoutIssueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    issuedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialIssueLineCountOutputType = {
    consumptions: number;
    returnLines: number;
    wasteLines: number;
};
export type MaterialIssueLineCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    consumptions?: boolean | MaterialIssueLineCountOutputTypeCountConsumptionsArgs;
    returnLines?: boolean | MaterialIssueLineCountOutputTypeCountReturnLinesArgs;
    wasteLines?: boolean | MaterialIssueLineCountOutputTypeCountWasteLinesArgs;
};
export type MaterialIssueLineCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineCountOutputTypeSelect<ExtArgs> | null;
};
export type MaterialIssueLineCountOutputTypeCountConsumptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumptionLineWhereInput;
};
export type MaterialIssueLineCountOutputTypeCountReturnLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReturnLineWhereInput;
};
export type MaterialIssueLineCountOutputTypeCountWasteLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteLineWhereInput;
};
export type MaterialIssueLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedQuantity?: boolean;
    issuedQuantity?: boolean;
    issueId?: boolean;
    lotId?: boolean;
    issue?: boolean | Prisma.MaterialIssueDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    consumptions?: boolean | Prisma.MaterialIssueLine$consumptionsArgs<ExtArgs>;
    returnLines?: boolean | Prisma.MaterialIssueLine$returnLinesArgs<ExtArgs>;
    wasteLines?: boolean | Prisma.MaterialIssueLine$wasteLinesArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.MaterialIssueLine$materialMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialIssueLineCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialIssueLine"]>;
export type MaterialIssueLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedQuantity?: boolean;
    issuedQuantity?: boolean;
    issueId?: boolean;
    lotId?: boolean;
    issue?: boolean | Prisma.MaterialIssueDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialIssueLine"]>;
export type MaterialIssueLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedQuantity?: boolean;
    issuedQuantity?: boolean;
    issueId?: boolean;
    lotId?: boolean;
    issue?: boolean | Prisma.MaterialIssueDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialIssueLine"]>;
export type MaterialIssueLineSelectScalar = {
    id?: boolean;
    requestedQuantity?: boolean;
    issuedQuantity?: boolean;
    issueId?: boolean;
    lotId?: boolean;
};
export type MaterialIssueLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestedQuantity" | "issuedQuantity" | "issueId" | "lotId", ExtArgs["result"]["materialIssueLine"]>;
export type MaterialIssueLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    issue?: boolean | Prisma.MaterialIssueDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    consumptions?: boolean | Prisma.MaterialIssueLine$consumptionsArgs<ExtArgs>;
    returnLines?: boolean | Prisma.MaterialIssueLine$returnLinesArgs<ExtArgs>;
    wasteLines?: boolean | Prisma.MaterialIssueLine$wasteLinesArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.MaterialIssueLine$materialMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialIssueLineCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaterialIssueLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    issue?: boolean | Prisma.MaterialIssueDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
};
export type MaterialIssueLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    issue?: boolean | Prisma.MaterialIssueDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
};
export type $MaterialIssueLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialIssueLine";
    objects: {
        issue: Prisma.$MaterialIssuePayload<ExtArgs>;
        lot: Prisma.$MaterialLotPayload<ExtArgs>;
        consumptions: Prisma.$ConsumptionLinePayload<ExtArgs>[];
        returnLines: Prisma.$MaterialReturnLinePayload<ExtArgs>[];
        wasteLines: Prisma.$WasteLinePayload<ExtArgs>[];
        materialMovement: Prisma.$MaterialMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requestedQuantity: runtime.Decimal;
        issuedQuantity: runtime.Decimal | null;
        issueId: string;
        lotId: string;
    }, ExtArgs["result"]["materialIssueLine"]>;
    composites: {};
};
export type MaterialIssueLineGetPayload<S extends boolean | null | undefined | MaterialIssueLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload, S>;
export type MaterialIssueLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialIssueLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialIssueLineCountAggregateInputType | true;
};
export interface MaterialIssueLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialIssueLine'];
        meta: {
            name: 'MaterialIssueLine';
        };
    };
    findUnique<T extends MaterialIssueLineFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialIssueLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialIssueLineFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialIssueLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialIssueLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialIssueLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialIssueLineFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialIssueLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialIssueLineCreateArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialIssueLineCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialIssueLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialIssueLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialIssueLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialIssueLineDeleteArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialIssueLineUpdateArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialIssueLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialIssueLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialIssueLineUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialIssueLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialIssueLineUpsertArgs>(args: Prisma.SelectSubset<T, MaterialIssueLineUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialIssueLineCountArgs>(args?: Prisma.Subset<T, MaterialIssueLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialIssueLineCountAggregateOutputType> : number>;
    aggregate<T extends MaterialIssueLineAggregateArgs>(args: Prisma.Subset<T, MaterialIssueLineAggregateArgs>): Prisma.PrismaPromise<GetMaterialIssueLineAggregateType<T>>;
    groupBy<T extends MaterialIssueLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialIssueLineGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialIssueLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialIssueLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialIssueLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialIssueLineFieldRefs;
}
export interface Prisma__MaterialIssueLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    issue<T extends Prisma.MaterialIssueDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssueDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lot<T extends Prisma.MaterialLotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialLotDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    consumptions<T extends Prisma.MaterialIssueLine$consumptionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssueLine$consumptionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    returnLines<T extends Prisma.MaterialIssueLine$returnLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssueLine$returnLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    wasteLines<T extends Prisma.MaterialIssueLine$wasteLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssueLine$wasteLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    materialMovement<T extends Prisma.MaterialIssueLine$materialMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialIssueLine$materialMovementArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialIssueLineFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialIssueLine", 'String'>;
    readonly requestedQuantity: Prisma.FieldRef<"MaterialIssueLine", 'Decimal'>;
    readonly issuedQuantity: Prisma.FieldRef<"MaterialIssueLine", 'Decimal'>;
    readonly issueId: Prisma.FieldRef<"MaterialIssueLine", 'String'>;
    readonly lotId: Prisma.FieldRef<"MaterialIssueLine", 'String'>;
}
export type MaterialIssueLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialIssueLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialIssueLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialIssueLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialIssueLineCreateInput, Prisma.MaterialIssueLineUncheckedCreateInput>;
};
export type MaterialIssueLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialIssueLineCreateManyInput | Prisma.MaterialIssueLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialIssueLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    data: Prisma.MaterialIssueLineCreateManyInput | Prisma.MaterialIssueLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialIssueLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialIssueLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateInput, Prisma.MaterialIssueLineUncheckedUpdateInput>;
    where: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateManyMutationInput, Prisma.MaterialIssueLineUncheckedUpdateManyInput>;
    where?: Prisma.MaterialIssueLineWhereInput;
    limit?: number;
};
export type MaterialIssueLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialIssueLineUpdateManyMutationInput, Prisma.MaterialIssueLineUncheckedUpdateManyInput>;
    where?: Prisma.MaterialIssueLineWhereInput;
    limit?: number;
    include?: Prisma.MaterialIssueLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialIssueLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialIssueLineCreateInput, Prisma.MaterialIssueLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialIssueLineUpdateInput, Prisma.MaterialIssueLineUncheckedUpdateInput>;
};
export type MaterialIssueLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where: Prisma.MaterialIssueLineWhereUniqueInput;
};
export type MaterialIssueLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueLineWhereInput;
    limit?: number;
};
export type MaterialIssueLine$consumptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialIssueLine$returnLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialIssueLine$wasteLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialIssueLine$materialMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialIssueLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
};
