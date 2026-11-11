import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WasteLineModel = runtime.Types.Result.DefaultSelection<Prisma.$WasteLinePayload>;
export type AggregateWasteLine = {
    _count: WasteLineCountAggregateOutputType | null;
    _avg: WasteLineAvgAggregateOutputType | null;
    _sum: WasteLineSumAggregateOutputType | null;
    _min: WasteLineMinAggregateOutputType | null;
    _max: WasteLineMaxAggregateOutputType | null;
};
export type WasteLineAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type WasteLineSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type WasteLineMinAggregateOutputType = {
    id: string | null;
    sourceType: string | null;
    quantity: runtime.Decimal | null;
    note: string | null;
    wasteId: string | null;
    lotId: string | null;
    issueLineId: string | null;
    productId: string | null;
};
export type WasteLineMaxAggregateOutputType = {
    id: string | null;
    sourceType: string | null;
    quantity: runtime.Decimal | null;
    note: string | null;
    wasteId: string | null;
    lotId: string | null;
    issueLineId: string | null;
    productId: string | null;
};
export type WasteLineCountAggregateOutputType = {
    id: number;
    sourceType: number;
    quantity: number;
    note: number;
    wasteId: number;
    lotId: number;
    issueLineId: number;
    productId: number;
    _all: number;
};
export type WasteLineAvgAggregateInputType = {
    quantity?: true;
};
export type WasteLineSumAggregateInputType = {
    quantity?: true;
};
export type WasteLineMinAggregateInputType = {
    id?: true;
    sourceType?: true;
    quantity?: true;
    note?: true;
    wasteId?: true;
    lotId?: true;
    issueLineId?: true;
    productId?: true;
};
export type WasteLineMaxAggregateInputType = {
    id?: true;
    sourceType?: true;
    quantity?: true;
    note?: true;
    wasteId?: true;
    lotId?: true;
    issueLineId?: true;
    productId?: true;
};
export type WasteLineCountAggregateInputType = {
    id?: true;
    sourceType?: true;
    quantity?: true;
    note?: true;
    wasteId?: true;
    lotId?: true;
    issueLineId?: true;
    productId?: true;
    _all?: true;
};
export type WasteLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteLineWhereInput;
    orderBy?: Prisma.WasteLineOrderByWithRelationInput | Prisma.WasteLineOrderByWithRelationInput[];
    cursor?: Prisma.WasteLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WasteLineCountAggregateInputType;
    _avg?: WasteLineAvgAggregateInputType;
    _sum?: WasteLineSumAggregateInputType;
    _min?: WasteLineMinAggregateInputType;
    _max?: WasteLineMaxAggregateInputType;
};
export type GetWasteLineAggregateType<T extends WasteLineAggregateArgs> = {
    [P in keyof T & keyof AggregateWasteLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWasteLine[P]> : Prisma.GetScalarType<T[P], AggregateWasteLine[P]>;
};
export type WasteLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteLineWhereInput;
    orderBy?: Prisma.WasteLineOrderByWithAggregationInput | Prisma.WasteLineOrderByWithAggregationInput[];
    by: Prisma.WasteLineScalarFieldEnum[] | Prisma.WasteLineScalarFieldEnum;
    having?: Prisma.WasteLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WasteLineCountAggregateInputType | true;
    _avg?: WasteLineAvgAggregateInputType;
    _sum?: WasteLineSumAggregateInputType;
    _min?: WasteLineMinAggregateInputType;
    _max?: WasteLineMaxAggregateInputType;
};
export type WasteLineGroupByOutputType = {
    id: string;
    sourceType: string;
    quantity: runtime.Decimal;
    note: string | null;
    wasteId: string;
    lotId: string | null;
    issueLineId: string | null;
    productId: string | null;
    _count: WasteLineCountAggregateOutputType | null;
    _avg: WasteLineAvgAggregateOutputType | null;
    _sum: WasteLineSumAggregateOutputType | null;
    _min: WasteLineMinAggregateOutputType | null;
    _max: WasteLineMaxAggregateOutputType | null;
};
export type GetWasteLineGroupByPayload<T extends WasteLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WasteLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WasteLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WasteLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WasteLineGroupByOutputType[P]>;
}>>;
export type WasteLineWhereInput = {
    AND?: Prisma.WasteLineWhereInput | Prisma.WasteLineWhereInput[];
    OR?: Prisma.WasteLineWhereInput[];
    NOT?: Prisma.WasteLineWhereInput | Prisma.WasteLineWhereInput[];
    id?: Prisma.UuidFilter<"WasteLine"> | string;
    sourceType?: Prisma.StringFilter<"WasteLine"> | string;
    quantity?: Prisma.DecimalFilter<"WasteLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringNullableFilter<"WasteLine"> | string | null;
    wasteId?: Prisma.UuidFilter<"WasteLine"> | string;
    lotId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    issueLineId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    productId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    waste?: Prisma.XOR<Prisma.WasteScalarRelationFilter, Prisma.WasteWhereInput>;
    lot?: Prisma.XOR<Prisma.MaterialLotNullableScalarRelationFilter, Prisma.MaterialLotWhereInput> | null;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineNullableScalarRelationFilter, Prisma.MaterialIssueLineWhereInput> | null;
    product?: Prisma.XOR<Prisma.ProductNullableScalarRelationFilter, Prisma.ProductWhereInput> | null;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
    productMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
};
export type WasteLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    productId?: Prisma.SortOrderInput | Prisma.SortOrder;
    waste?: Prisma.WasteOrderByWithRelationInput;
    lot?: Prisma.MaterialLotOrderByWithRelationInput;
    issueLine?: Prisma.MaterialIssueLineOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    materialMovement?: Prisma.MaterialMovementOrderByWithRelationInput;
    productMovement?: Prisma.ProductMovementOrderByWithRelationInput;
};
export type WasteLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WasteLineWhereInput | Prisma.WasteLineWhereInput[];
    OR?: Prisma.WasteLineWhereInput[];
    NOT?: Prisma.WasteLineWhereInput | Prisma.WasteLineWhereInput[];
    sourceType?: Prisma.StringFilter<"WasteLine"> | string;
    quantity?: Prisma.DecimalFilter<"WasteLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringNullableFilter<"WasteLine"> | string | null;
    wasteId?: Prisma.UuidFilter<"WasteLine"> | string;
    lotId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    issueLineId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    productId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    waste?: Prisma.XOR<Prisma.WasteScalarRelationFilter, Prisma.WasteWhereInput>;
    lot?: Prisma.XOR<Prisma.MaterialLotNullableScalarRelationFilter, Prisma.MaterialLotWhereInput> | null;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineNullableScalarRelationFilter, Prisma.MaterialIssueLineWhereInput> | null;
    product?: Prisma.XOR<Prisma.ProductNullableScalarRelationFilter, Prisma.ProductWhereInput> | null;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
    productMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
}, "id">;
export type WasteLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    productId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WasteLineCountOrderByAggregateInput;
    _avg?: Prisma.WasteLineAvgOrderByAggregateInput;
    _max?: Prisma.WasteLineMaxOrderByAggregateInput;
    _min?: Prisma.WasteLineMinOrderByAggregateInput;
    _sum?: Prisma.WasteLineSumOrderByAggregateInput;
};
export type WasteLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.WasteLineScalarWhereWithAggregatesInput | Prisma.WasteLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.WasteLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WasteLineScalarWhereWithAggregatesInput | Prisma.WasteLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"WasteLine"> | string;
    sourceType?: Prisma.StringWithAggregatesFilter<"WasteLine"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"WasteLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringNullableWithAggregatesFilter<"WasteLine"> | string | null;
    wasteId?: Prisma.UuidWithAggregatesFilter<"WasteLine"> | string;
    lotId?: Prisma.UuidNullableWithAggregatesFilter<"WasteLine"> | string | null;
    issueLineId?: Prisma.UuidNullableWithAggregatesFilter<"WasteLine"> | string | null;
    productId?: Prisma.UuidNullableWithAggregatesFilter<"WasteLine"> | string | null;
};
export type WasteLineCreateInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    waste: Prisma.WasteCreateNestedOneWithoutLinesInput;
    lot?: Prisma.MaterialLotCreateNestedOneWithoutWasteLinesInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutWasteLinesInput;
    product?: Prisma.ProductCreateNestedOneWithoutWasteLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUncheckedCreateInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    issueLineId?: string | null;
    productId?: string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    waste?: Prisma.WasteUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneWithoutWasteLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutWasteLinesNestedInput;
    product?: Prisma.ProductUpdateOneWithoutWasteLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineCreateManyInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    issueLineId?: string | null;
    productId?: string | null;
};
export type WasteLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteLineListRelationFilter = {
    every?: Prisma.WasteLineWhereInput;
    some?: Prisma.WasteLineWhereInput;
    none?: Prisma.WasteLineWhereInput;
};
export type WasteLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WasteLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    wasteId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type WasteLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type WasteLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    wasteId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type WasteLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    wasteId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type WasteLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type WasteLineNullableScalarRelationFilter = {
    is?: Prisma.WasteLineWhereInput | null;
    isNot?: Prisma.WasteLineWhereInput | null;
};
export type WasteLineCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutProductInput, Prisma.WasteLineUncheckedCreateWithoutProductInput> | Prisma.WasteLineCreateWithoutProductInput[] | Prisma.WasteLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutProductInput | Prisma.WasteLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.WasteLineCreateManyProductInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutProductInput, Prisma.WasteLineUncheckedCreateWithoutProductInput> | Prisma.WasteLineCreateWithoutProductInput[] | Prisma.WasteLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutProductInput | Prisma.WasteLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.WasteLineCreateManyProductInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutProductInput, Prisma.WasteLineUncheckedCreateWithoutProductInput> | Prisma.WasteLineCreateWithoutProductInput[] | Prisma.WasteLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutProductInput | Prisma.WasteLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutProductInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.WasteLineCreateManyProductInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutProductInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutProductInput | Prisma.WasteLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutProductInput, Prisma.WasteLineUncheckedCreateWithoutProductInput> | Prisma.WasteLineCreateWithoutProductInput[] | Prisma.WasteLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutProductInput | Prisma.WasteLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutProductInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.WasteLineCreateManyProductInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutProductInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutProductInput | Prisma.WasteLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutLotInput, Prisma.WasteLineUncheckedCreateWithoutLotInput> | Prisma.WasteLineCreateWithoutLotInput[] | Prisma.WasteLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutLotInput | Prisma.WasteLineCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.WasteLineCreateManyLotInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUncheckedCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutLotInput, Prisma.WasteLineUncheckedCreateWithoutLotInput> | Prisma.WasteLineCreateWithoutLotInput[] | Prisma.WasteLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutLotInput | Prisma.WasteLineCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.WasteLineCreateManyLotInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutLotInput, Prisma.WasteLineUncheckedCreateWithoutLotInput> | Prisma.WasteLineCreateWithoutLotInput[] | Prisma.WasteLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutLotInput | Prisma.WasteLineCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutLotInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.WasteLineCreateManyLotInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutLotInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutLotInput | Prisma.WasteLineUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineUncheckedUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutLotInput, Prisma.WasteLineUncheckedCreateWithoutLotInput> | Prisma.WasteLineCreateWithoutLotInput[] | Prisma.WasteLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutLotInput | Prisma.WasteLineCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutLotInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.WasteLineCreateManyLotInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutLotInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutLotInput | Prisma.WasteLineUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineCreateNestedManyWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutIssueLineInput, Prisma.WasteLineUncheckedCreateWithoutIssueLineInput> | Prisma.WasteLineCreateWithoutIssueLineInput[] | Prisma.WasteLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutIssueLineInput | Prisma.WasteLineCreateOrConnectWithoutIssueLineInput[];
    createMany?: Prisma.WasteLineCreateManyIssueLineInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUncheckedCreateNestedManyWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutIssueLineInput, Prisma.WasteLineUncheckedCreateWithoutIssueLineInput> | Prisma.WasteLineCreateWithoutIssueLineInput[] | Prisma.WasteLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutIssueLineInput | Prisma.WasteLineCreateOrConnectWithoutIssueLineInput[];
    createMany?: Prisma.WasteLineCreateManyIssueLineInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUpdateManyWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutIssueLineInput, Prisma.WasteLineUncheckedCreateWithoutIssueLineInput> | Prisma.WasteLineCreateWithoutIssueLineInput[] | Prisma.WasteLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutIssueLineInput | Prisma.WasteLineCreateOrConnectWithoutIssueLineInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutIssueLineInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutIssueLineInput[];
    createMany?: Prisma.WasteLineCreateManyIssueLineInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutIssueLineInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutIssueLineInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutIssueLineInput | Prisma.WasteLineUpdateManyWithWhereWithoutIssueLineInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineUncheckedUpdateManyWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutIssueLineInput, Prisma.WasteLineUncheckedCreateWithoutIssueLineInput> | Prisma.WasteLineCreateWithoutIssueLineInput[] | Prisma.WasteLineUncheckedCreateWithoutIssueLineInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutIssueLineInput | Prisma.WasteLineCreateOrConnectWithoutIssueLineInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutIssueLineInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutIssueLineInput[];
    createMany?: Prisma.WasteLineCreateManyIssueLineInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutIssueLineInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutIssueLineInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutIssueLineInput | Prisma.WasteLineUpdateManyWithWhereWithoutIssueLineInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineCreateNestedManyWithoutWasteInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutWasteInput, Prisma.WasteLineUncheckedCreateWithoutWasteInput> | Prisma.WasteLineCreateWithoutWasteInput[] | Prisma.WasteLineUncheckedCreateWithoutWasteInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutWasteInput | Prisma.WasteLineCreateOrConnectWithoutWasteInput[];
    createMany?: Prisma.WasteLineCreateManyWasteInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUncheckedCreateNestedManyWithoutWasteInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutWasteInput, Prisma.WasteLineUncheckedCreateWithoutWasteInput> | Prisma.WasteLineCreateWithoutWasteInput[] | Prisma.WasteLineUncheckedCreateWithoutWasteInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutWasteInput | Prisma.WasteLineCreateOrConnectWithoutWasteInput[];
    createMany?: Prisma.WasteLineCreateManyWasteInputEnvelope;
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
};
export type WasteLineUpdateManyWithoutWasteNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutWasteInput, Prisma.WasteLineUncheckedCreateWithoutWasteInput> | Prisma.WasteLineCreateWithoutWasteInput[] | Prisma.WasteLineUncheckedCreateWithoutWasteInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutWasteInput | Prisma.WasteLineCreateOrConnectWithoutWasteInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutWasteInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutWasteInput[];
    createMany?: Prisma.WasteLineCreateManyWasteInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutWasteInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutWasteInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutWasteInput | Prisma.WasteLineUpdateManyWithWhereWithoutWasteInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineUncheckedUpdateManyWithoutWasteNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutWasteInput, Prisma.WasteLineUncheckedCreateWithoutWasteInput> | Prisma.WasteLineCreateWithoutWasteInput[] | Prisma.WasteLineUncheckedCreateWithoutWasteInput[];
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutWasteInput | Prisma.WasteLineCreateOrConnectWithoutWasteInput[];
    upsert?: Prisma.WasteLineUpsertWithWhereUniqueWithoutWasteInput | Prisma.WasteLineUpsertWithWhereUniqueWithoutWasteInput[];
    createMany?: Prisma.WasteLineCreateManyWasteInputEnvelope;
    set?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    disconnect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    delete?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    connect?: Prisma.WasteLineWhereUniqueInput | Prisma.WasteLineWhereUniqueInput[];
    update?: Prisma.WasteLineUpdateWithWhereUniqueWithoutWasteInput | Prisma.WasteLineUpdateWithWhereUniqueWithoutWasteInput[];
    updateMany?: Prisma.WasteLineUpdateManyWithWhereWithoutWasteInput | Prisma.WasteLineUpdateManyWithWhereWithoutWasteInput[];
    deleteMany?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
};
export type WasteLineCreateNestedOneWithoutMaterialMovementInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutMaterialMovementInput, Prisma.WasteLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutMaterialMovementInput;
    connect?: Prisma.WasteLineWhereUniqueInput;
};
export type WasteLineUpdateOneWithoutMaterialMovementNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutMaterialMovementInput, Prisma.WasteLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutMaterialMovementInput;
    upsert?: Prisma.WasteLineUpsertWithoutMaterialMovementInput;
    disconnect?: Prisma.WasteLineWhereInput | boolean;
    delete?: Prisma.WasteLineWhereInput | boolean;
    connect?: Prisma.WasteLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WasteLineUpdateToOneWithWhereWithoutMaterialMovementInput, Prisma.WasteLineUpdateWithoutMaterialMovementInput>, Prisma.WasteLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type WasteLineCreateNestedOneWithoutProductMovementInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutProductMovementInput, Prisma.WasteLineUncheckedCreateWithoutProductMovementInput>;
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutProductMovementInput;
    connect?: Prisma.WasteLineWhereUniqueInput;
};
export type WasteLineUpdateOneWithoutProductMovementNestedInput = {
    create?: Prisma.XOR<Prisma.WasteLineCreateWithoutProductMovementInput, Prisma.WasteLineUncheckedCreateWithoutProductMovementInput>;
    connectOrCreate?: Prisma.WasteLineCreateOrConnectWithoutProductMovementInput;
    upsert?: Prisma.WasteLineUpsertWithoutProductMovementInput;
    disconnect?: Prisma.WasteLineWhereInput | boolean;
    delete?: Prisma.WasteLineWhereInput | boolean;
    connect?: Prisma.WasteLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WasteLineUpdateToOneWithWhereWithoutProductMovementInput, Prisma.WasteLineUpdateWithoutProductMovementInput>, Prisma.WasteLineUncheckedUpdateWithoutProductMovementInput>;
};
export type WasteLineCreateWithoutProductInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    waste: Prisma.WasteCreateNestedOneWithoutLinesInput;
    lot?: Prisma.MaterialLotCreateNestedOneWithoutWasteLinesInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutWasteLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUncheckedCreateWithoutProductInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    issueLineId?: string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineCreateOrConnectWithoutProductInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutProductInput, Prisma.WasteLineUncheckedCreateWithoutProductInput>;
};
export type WasteLineCreateManyProductInputEnvelope = {
    data: Prisma.WasteLineCreateManyProductInput | Prisma.WasteLineCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type WasteLineUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.WasteLineUpdateWithoutProductInput, Prisma.WasteLineUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutProductInput, Prisma.WasteLineUncheckedCreateWithoutProductInput>;
};
export type WasteLineUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateWithoutProductInput, Prisma.WasteLineUncheckedUpdateWithoutProductInput>;
};
export type WasteLineUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.WasteLineScalarWhereInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateManyMutationInput, Prisma.WasteLineUncheckedUpdateManyWithoutProductInput>;
};
export type WasteLineScalarWhereInput = {
    AND?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
    OR?: Prisma.WasteLineScalarWhereInput[];
    NOT?: Prisma.WasteLineScalarWhereInput | Prisma.WasteLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"WasteLine"> | string;
    sourceType?: Prisma.StringFilter<"WasteLine"> | string;
    quantity?: Prisma.DecimalFilter<"WasteLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringNullableFilter<"WasteLine"> | string | null;
    wasteId?: Prisma.UuidFilter<"WasteLine"> | string;
    lotId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    issueLineId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
    productId?: Prisma.UuidNullableFilter<"WasteLine"> | string | null;
};
export type WasteLineCreateWithoutLotInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    waste: Prisma.WasteCreateNestedOneWithoutLinesInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutWasteLinesInput;
    product?: Prisma.ProductCreateNestedOneWithoutWasteLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUncheckedCreateWithoutLotInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    issueLineId?: string | null;
    productId?: string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineCreateOrConnectWithoutLotInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutLotInput, Prisma.WasteLineUncheckedCreateWithoutLotInput>;
};
export type WasteLineCreateManyLotInputEnvelope = {
    data: Prisma.WasteLineCreateManyLotInput | Prisma.WasteLineCreateManyLotInput[];
    skipDuplicates?: boolean;
};
export type WasteLineUpsertWithWhereUniqueWithoutLotInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.WasteLineUpdateWithoutLotInput, Prisma.WasteLineUncheckedUpdateWithoutLotInput>;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutLotInput, Prisma.WasteLineUncheckedCreateWithoutLotInput>;
};
export type WasteLineUpdateWithWhereUniqueWithoutLotInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateWithoutLotInput, Prisma.WasteLineUncheckedUpdateWithoutLotInput>;
};
export type WasteLineUpdateManyWithWhereWithoutLotInput = {
    where: Prisma.WasteLineScalarWhereInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateManyMutationInput, Prisma.WasteLineUncheckedUpdateManyWithoutLotInput>;
};
export type WasteLineCreateWithoutIssueLineInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    waste: Prisma.WasteCreateNestedOneWithoutLinesInput;
    lot?: Prisma.MaterialLotCreateNestedOneWithoutWasteLinesInput;
    product?: Prisma.ProductCreateNestedOneWithoutWasteLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUncheckedCreateWithoutIssueLineInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    productId?: string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineCreateOrConnectWithoutIssueLineInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutIssueLineInput, Prisma.WasteLineUncheckedCreateWithoutIssueLineInput>;
};
export type WasteLineCreateManyIssueLineInputEnvelope = {
    data: Prisma.WasteLineCreateManyIssueLineInput | Prisma.WasteLineCreateManyIssueLineInput[];
    skipDuplicates?: boolean;
};
export type WasteLineUpsertWithWhereUniqueWithoutIssueLineInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.WasteLineUpdateWithoutIssueLineInput, Prisma.WasteLineUncheckedUpdateWithoutIssueLineInput>;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutIssueLineInput, Prisma.WasteLineUncheckedCreateWithoutIssueLineInput>;
};
export type WasteLineUpdateWithWhereUniqueWithoutIssueLineInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateWithoutIssueLineInput, Prisma.WasteLineUncheckedUpdateWithoutIssueLineInput>;
};
export type WasteLineUpdateManyWithWhereWithoutIssueLineInput = {
    where: Prisma.WasteLineScalarWhereInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateManyMutationInput, Prisma.WasteLineUncheckedUpdateManyWithoutIssueLineInput>;
};
export type WasteLineCreateWithoutWasteInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    lot?: Prisma.MaterialLotCreateNestedOneWithoutWasteLinesInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutWasteLinesInput;
    product?: Prisma.ProductCreateNestedOneWithoutWasteLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUncheckedCreateWithoutWasteInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    lotId?: string | null;
    issueLineId?: string | null;
    productId?: string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutWasteLineInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineCreateOrConnectWithoutWasteInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutWasteInput, Prisma.WasteLineUncheckedCreateWithoutWasteInput>;
};
export type WasteLineCreateManyWasteInputEnvelope = {
    data: Prisma.WasteLineCreateManyWasteInput | Prisma.WasteLineCreateManyWasteInput[];
    skipDuplicates?: boolean;
};
export type WasteLineUpsertWithWhereUniqueWithoutWasteInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.WasteLineUpdateWithoutWasteInput, Prisma.WasteLineUncheckedUpdateWithoutWasteInput>;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutWasteInput, Prisma.WasteLineUncheckedCreateWithoutWasteInput>;
};
export type WasteLineUpdateWithWhereUniqueWithoutWasteInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateWithoutWasteInput, Prisma.WasteLineUncheckedUpdateWithoutWasteInput>;
};
export type WasteLineUpdateManyWithWhereWithoutWasteInput = {
    where: Prisma.WasteLineScalarWhereInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateManyMutationInput, Prisma.WasteLineUncheckedUpdateManyWithoutWasteInput>;
};
export type WasteLineCreateWithoutMaterialMovementInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    waste: Prisma.WasteCreateNestedOneWithoutLinesInput;
    lot?: Prisma.MaterialLotCreateNestedOneWithoutWasteLinesInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutWasteLinesInput;
    product?: Prisma.ProductCreateNestedOneWithoutWasteLinesInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUncheckedCreateWithoutMaterialMovementInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    issueLineId?: string | null;
    productId?: string | null;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineCreateOrConnectWithoutMaterialMovementInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutMaterialMovementInput, Prisma.WasteLineUncheckedCreateWithoutMaterialMovementInput>;
};
export type WasteLineUpsertWithoutMaterialMovementInput = {
    update: Prisma.XOR<Prisma.WasteLineUpdateWithoutMaterialMovementInput, Prisma.WasteLineUncheckedUpdateWithoutMaterialMovementInput>;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutMaterialMovementInput, Prisma.WasteLineUncheckedCreateWithoutMaterialMovementInput>;
    where?: Prisma.WasteLineWhereInput;
};
export type WasteLineUpdateToOneWithWhereWithoutMaterialMovementInput = {
    where?: Prisma.WasteLineWhereInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateWithoutMaterialMovementInput, Prisma.WasteLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type WasteLineUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    waste?: Prisma.WasteUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneWithoutWasteLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutWasteLinesNestedInput;
    product?: Prisma.ProductUpdateOneWithoutWasteLinesNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineCreateWithoutProductMovementInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    waste: Prisma.WasteCreateNestedOneWithoutLinesInput;
    lot?: Prisma.MaterialLotCreateNestedOneWithoutWasteLinesInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutWasteLinesInput;
    product?: Prisma.ProductCreateNestedOneWithoutWasteLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineUncheckedCreateWithoutProductMovementInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    issueLineId?: string | null;
    productId?: string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutWasteLineInput;
};
export type WasteLineCreateOrConnectWithoutProductMovementInput = {
    where: Prisma.WasteLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutProductMovementInput, Prisma.WasteLineUncheckedCreateWithoutProductMovementInput>;
};
export type WasteLineUpsertWithoutProductMovementInput = {
    update: Prisma.XOR<Prisma.WasteLineUpdateWithoutProductMovementInput, Prisma.WasteLineUncheckedUpdateWithoutProductMovementInput>;
    create: Prisma.XOR<Prisma.WasteLineCreateWithoutProductMovementInput, Prisma.WasteLineUncheckedCreateWithoutProductMovementInput>;
    where?: Prisma.WasteLineWhereInput;
};
export type WasteLineUpdateToOneWithWhereWithoutProductMovementInput = {
    where?: Prisma.WasteLineWhereInput;
    data: Prisma.XOR<Prisma.WasteLineUpdateWithoutProductMovementInput, Prisma.WasteLineUncheckedUpdateWithoutProductMovementInput>;
};
export type WasteLineUpdateWithoutProductMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    waste?: Prisma.WasteUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneWithoutWasteLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutWasteLinesNestedInput;
    product?: Prisma.ProductUpdateOneWithoutWasteLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateWithoutProductMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineCreateManyProductInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    issueLineId?: string | null;
};
export type WasteLineUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    waste?: Prisma.WasteUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneWithoutWasteLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutWasteLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteLineCreateManyLotInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    issueLineId?: string | null;
    productId?: string | null;
};
export type WasteLineUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    waste?: Prisma.WasteUpdateOneRequiredWithoutLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutWasteLinesNestedInput;
    product?: Prisma.ProductUpdateOneWithoutWasteLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateManyWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteLineCreateManyIssueLineInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    wasteId: string;
    lotId?: string | null;
    productId?: string | null;
};
export type WasteLineUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    waste?: Prisma.WasteUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneWithoutWasteLinesNestedInput;
    product?: Prisma.ProductUpdateOneWithoutWasteLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateManyWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteLineCreateManyWasteInput = {
    id?: string;
    sourceType: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string | null;
    lotId?: string | null;
    issueLineId?: string | null;
    productId?: string | null;
};
export type WasteLineUpdateWithoutWasteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.MaterialLotUpdateOneWithoutWasteLinesNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutWasteLinesNestedInput;
    product?: Prisma.ProductUpdateOneWithoutWasteLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateWithoutWasteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput;
};
export type WasteLineUncheckedUpdateManyWithoutWasteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WasteLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceType?: boolean;
    quantity?: boolean;
    note?: boolean;
    wasteId?: boolean;
    lotId?: boolean;
    issueLineId?: boolean;
    productId?: boolean;
    waste?: boolean | Prisma.WasteDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.WasteLine$lotArgs<ExtArgs>;
    issueLine?: boolean | Prisma.WasteLine$issueLineArgs<ExtArgs>;
    product?: boolean | Prisma.WasteLine$productArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.WasteLine$materialMovementArgs<ExtArgs>;
    productMovement?: boolean | Prisma.WasteLine$productMovementArgs<ExtArgs>;
}, ExtArgs["result"]["wasteLine"]>;
export type WasteLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceType?: boolean;
    quantity?: boolean;
    note?: boolean;
    wasteId?: boolean;
    lotId?: boolean;
    issueLineId?: boolean;
    productId?: boolean;
    waste?: boolean | Prisma.WasteDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.WasteLine$lotArgs<ExtArgs>;
    issueLine?: boolean | Prisma.WasteLine$issueLineArgs<ExtArgs>;
    product?: boolean | Prisma.WasteLine$productArgs<ExtArgs>;
}, ExtArgs["result"]["wasteLine"]>;
export type WasteLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceType?: boolean;
    quantity?: boolean;
    note?: boolean;
    wasteId?: boolean;
    lotId?: boolean;
    issueLineId?: boolean;
    productId?: boolean;
    waste?: boolean | Prisma.WasteDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.WasteLine$lotArgs<ExtArgs>;
    issueLine?: boolean | Prisma.WasteLine$issueLineArgs<ExtArgs>;
    product?: boolean | Prisma.WasteLine$productArgs<ExtArgs>;
}, ExtArgs["result"]["wasteLine"]>;
export type WasteLineSelectScalar = {
    id?: boolean;
    sourceType?: boolean;
    quantity?: boolean;
    note?: boolean;
    wasteId?: boolean;
    lotId?: boolean;
    issueLineId?: boolean;
    productId?: boolean;
};
export type WasteLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sourceType" | "quantity" | "note" | "wasteId" | "lotId" | "issueLineId" | "productId", ExtArgs["result"]["wasteLine"]>;
export type WasteLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    waste?: boolean | Prisma.WasteDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.WasteLine$lotArgs<ExtArgs>;
    issueLine?: boolean | Prisma.WasteLine$issueLineArgs<ExtArgs>;
    product?: boolean | Prisma.WasteLine$productArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.WasteLine$materialMovementArgs<ExtArgs>;
    productMovement?: boolean | Prisma.WasteLine$productMovementArgs<ExtArgs>;
};
export type WasteLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    waste?: boolean | Prisma.WasteDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.WasteLine$lotArgs<ExtArgs>;
    issueLine?: boolean | Prisma.WasteLine$issueLineArgs<ExtArgs>;
    product?: boolean | Prisma.WasteLine$productArgs<ExtArgs>;
};
export type WasteLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    waste?: boolean | Prisma.WasteDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.WasteLine$lotArgs<ExtArgs>;
    issueLine?: boolean | Prisma.WasteLine$issueLineArgs<ExtArgs>;
    product?: boolean | Prisma.WasteLine$productArgs<ExtArgs>;
};
export type $WasteLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WasteLine";
    objects: {
        waste: Prisma.$WastePayload<ExtArgs>;
        lot: Prisma.$MaterialLotPayload<ExtArgs> | null;
        issueLine: Prisma.$MaterialIssueLinePayload<ExtArgs> | null;
        product: Prisma.$ProductPayload<ExtArgs> | null;
        materialMovement: Prisma.$MaterialMovementPayload<ExtArgs> | null;
        productMovement: Prisma.$ProductMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sourceType: string;
        quantity: runtime.Decimal;
        note: string | null;
        wasteId: string;
        lotId: string | null;
        issueLineId: string | null;
        productId: string | null;
    }, ExtArgs["result"]["wasteLine"]>;
    composites: {};
};
export type WasteLineGetPayload<S extends boolean | null | undefined | WasteLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WasteLinePayload, S>;
export type WasteLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WasteLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WasteLineCountAggregateInputType | true;
};
export interface WasteLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WasteLine'];
        meta: {
            name: 'WasteLine';
        };
    };
    findUnique<T extends WasteLineFindUniqueArgs>(args: Prisma.SelectSubset<T, WasteLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WasteLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WasteLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WasteLineFindFirstArgs>(args?: Prisma.SelectSubset<T, WasteLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WasteLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WasteLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WasteLineFindManyArgs>(args?: Prisma.SelectSubset<T, WasteLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WasteLineCreateArgs>(args: Prisma.SelectSubset<T, WasteLineCreateArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WasteLineCreateManyArgs>(args?: Prisma.SelectSubset<T, WasteLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WasteLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WasteLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WasteLineDeleteArgs>(args: Prisma.SelectSubset<T, WasteLineDeleteArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WasteLineUpdateArgs>(args: Prisma.SelectSubset<T, WasteLineUpdateArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WasteLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, WasteLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WasteLineUpdateManyArgs>(args: Prisma.SelectSubset<T, WasteLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WasteLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WasteLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WasteLineUpsertArgs>(args: Prisma.SelectSubset<T, WasteLineUpsertArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WasteLineCountArgs>(args?: Prisma.Subset<T, WasteLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WasteLineCountAggregateOutputType> : number>;
    aggregate<T extends WasteLineAggregateArgs>(args: Prisma.Subset<T, WasteLineAggregateArgs>): Prisma.PrismaPromise<GetWasteLineAggregateType<T>>;
    groupBy<T extends WasteLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WasteLineGroupByArgs['orderBy'];
    } : {
        orderBy?: WasteLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WasteLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWasteLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WasteLineFieldRefs;
}
export interface Prisma__WasteLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    waste<T extends Prisma.WasteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WasteDefaultArgs<ExtArgs>>): Prisma.Prisma__WasteClient<runtime.Types.Result.GetResult<Prisma.$WastePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lot<T extends Prisma.WasteLine$lotArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WasteLine$lotArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    issueLine<T extends Prisma.WasteLine$issueLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WasteLine$issueLineArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.WasteLine$productArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WasteLine$productArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    materialMovement<T extends Prisma.WasteLine$materialMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WasteLine$materialMovementArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    productMovement<T extends Prisma.WasteLine$productMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WasteLine$productMovementArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WasteLineFieldRefs {
    readonly id: Prisma.FieldRef<"WasteLine", 'String'>;
    readonly sourceType: Prisma.FieldRef<"WasteLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"WasteLine", 'Decimal'>;
    readonly note: Prisma.FieldRef<"WasteLine", 'String'>;
    readonly wasteId: Prisma.FieldRef<"WasteLine", 'String'>;
    readonly lotId: Prisma.FieldRef<"WasteLine", 'String'>;
    readonly issueLineId: Prisma.FieldRef<"WasteLine", 'String'>;
    readonly productId: Prisma.FieldRef<"WasteLine", 'String'>;
}
export type WasteLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where: Prisma.WasteLineWhereUniqueInput;
};
export type WasteLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where: Prisma.WasteLineWhereUniqueInput;
};
export type WasteLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WasteLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WasteLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WasteLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasteLineCreateInput, Prisma.WasteLineUncheckedCreateInput>;
};
export type WasteLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WasteLineCreateManyInput | Prisma.WasteLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WasteLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    data: Prisma.WasteLineCreateManyInput | Prisma.WasteLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WasteLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WasteLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasteLineUpdateInput, Prisma.WasteLineUncheckedUpdateInput>;
    where: Prisma.WasteLineWhereUniqueInput;
};
export type WasteLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WasteLineUpdateManyMutationInput, Prisma.WasteLineUncheckedUpdateManyInput>;
    where?: Prisma.WasteLineWhereInput;
    limit?: number;
};
export type WasteLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasteLineUpdateManyMutationInput, Prisma.WasteLineUncheckedUpdateManyInput>;
    where?: Prisma.WasteLineWhereInput;
    limit?: number;
    include?: Prisma.WasteLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WasteLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where: Prisma.WasteLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasteLineCreateInput, Prisma.WasteLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WasteLineUpdateInput, Prisma.WasteLineUncheckedUpdateInput>;
};
export type WasteLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where: Prisma.WasteLineWhereUniqueInput;
};
export type WasteLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteLineWhereInput;
    limit?: number;
};
export type WasteLine$lotArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where?: Prisma.MaterialLotWhereInput;
};
export type WasteLine$issueLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type WasteLine$productArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
};
export type WasteLine$materialMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
};
export type WasteLine$productMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
};
export type WasteLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
};
