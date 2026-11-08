import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialReceiptLineModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialReceiptLinePayload>;
export type AggregateMaterialReceiptLine = {
    _count: MaterialReceiptLineCountAggregateOutputType | null;
    _avg: MaterialReceiptLineAvgAggregateOutputType | null;
    _sum: MaterialReceiptLineSumAggregateOutputType | null;
    _min: MaterialReceiptLineMinAggregateOutputType | null;
    _max: MaterialReceiptLineMaxAggregateOutputType | null;
};
export type MaterialReceiptLineAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
};
export type MaterialReceiptLineSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
};
export type MaterialReceiptLineMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    receiptId: string | null;
    lotId: string | null;
};
export type MaterialReceiptLineMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    receiptId: string | null;
    lotId: string | null;
};
export type MaterialReceiptLineCountAggregateOutputType = {
    id: number;
    quantity: number;
    unitPrice: number;
    receiptId: number;
    lotId: number;
    _all: number;
};
export type MaterialReceiptLineAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type MaterialReceiptLineSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type MaterialReceiptLineMinAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    receiptId?: true;
    lotId?: true;
};
export type MaterialReceiptLineMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    receiptId?: true;
    lotId?: true;
};
export type MaterialReceiptLineCountAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    receiptId?: true;
    lotId?: true;
    _all?: true;
};
export type MaterialReceiptLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptLineWhereInput;
    orderBy?: Prisma.MaterialReceiptLineOrderByWithRelationInput | Prisma.MaterialReceiptLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialReceiptLineCountAggregateInputType;
    _avg?: MaterialReceiptLineAvgAggregateInputType;
    _sum?: MaterialReceiptLineSumAggregateInputType;
    _min?: MaterialReceiptLineMinAggregateInputType;
    _max?: MaterialReceiptLineMaxAggregateInputType;
};
export type GetMaterialReceiptLineAggregateType<T extends MaterialReceiptLineAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialReceiptLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialReceiptLine[P]> : Prisma.GetScalarType<T[P], AggregateMaterialReceiptLine[P]>;
};
export type MaterialReceiptLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptLineWhereInput;
    orderBy?: Prisma.MaterialReceiptLineOrderByWithAggregationInput | Prisma.MaterialReceiptLineOrderByWithAggregationInput[];
    by: Prisma.MaterialReceiptLineScalarFieldEnum[] | Prisma.MaterialReceiptLineScalarFieldEnum;
    having?: Prisma.MaterialReceiptLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialReceiptLineCountAggregateInputType | true;
    _avg?: MaterialReceiptLineAvgAggregateInputType;
    _sum?: MaterialReceiptLineSumAggregateInputType;
    _min?: MaterialReceiptLineMinAggregateInputType;
    _max?: MaterialReceiptLineMaxAggregateInputType;
};
export type MaterialReceiptLineGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    unitPrice: runtime.Decimal;
    receiptId: string;
    lotId: string;
    _count: MaterialReceiptLineCountAggregateOutputType | null;
    _avg: MaterialReceiptLineAvgAggregateOutputType | null;
    _sum: MaterialReceiptLineSumAggregateOutputType | null;
    _min: MaterialReceiptLineMinAggregateOutputType | null;
    _max: MaterialReceiptLineMaxAggregateOutputType | null;
};
export type GetMaterialReceiptLineGroupByPayload<T extends MaterialReceiptLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialReceiptLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialReceiptLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialReceiptLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialReceiptLineGroupByOutputType[P]>;
}>>;
export type MaterialReceiptLineWhereInput = {
    AND?: Prisma.MaterialReceiptLineWhereInput | Prisma.MaterialReceiptLineWhereInput[];
    OR?: Prisma.MaterialReceiptLineWhereInput[];
    NOT?: Prisma.MaterialReceiptLineWhereInput | Prisma.MaterialReceiptLineWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
    lotId?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
    receipt?: Prisma.XOR<Prisma.MaterialReceiptScalarRelationFilter, Prisma.MaterialReceiptWhereInput>;
    lot?: Prisma.XOR<Prisma.MaterialLotScalarRelationFilter, Prisma.MaterialLotWhereInput>;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
};
export type MaterialReceiptLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    receipt?: Prisma.MaterialReceiptOrderByWithRelationInput;
    lot?: Prisma.MaterialLotOrderByWithRelationInput;
    materialMovement?: Prisma.MaterialMovementOrderByWithRelationInput;
};
export type MaterialReceiptLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MaterialReceiptLineWhereInput | Prisma.MaterialReceiptLineWhereInput[];
    OR?: Prisma.MaterialReceiptLineWhereInput[];
    NOT?: Prisma.MaterialReceiptLineWhereInput | Prisma.MaterialReceiptLineWhereInput[];
    quantity?: Prisma.DecimalFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
    lotId?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
    receipt?: Prisma.XOR<Prisma.MaterialReceiptScalarRelationFilter, Prisma.MaterialReceiptWhereInput>;
    lot?: Prisma.XOR<Prisma.MaterialLotScalarRelationFilter, Prisma.MaterialLotWhereInput>;
    materialMovement?: Prisma.XOR<Prisma.MaterialMovementNullableScalarRelationFilter, Prisma.MaterialMovementWhereInput> | null;
}, "id">;
export type MaterialReceiptLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    _count?: Prisma.MaterialReceiptLineCountOrderByAggregateInput;
    _avg?: Prisma.MaterialReceiptLineAvgOrderByAggregateInput;
    _max?: Prisma.MaterialReceiptLineMaxOrderByAggregateInput;
    _min?: Prisma.MaterialReceiptLineMinOrderByAggregateInput;
    _sum?: Prisma.MaterialReceiptLineSumOrderByAggregateInput;
};
export type MaterialReceiptLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialReceiptLineScalarWhereWithAggregatesInput | Prisma.MaterialReceiptLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialReceiptLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialReceiptLineScalarWhereWithAggregatesInput | Prisma.MaterialReceiptLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialReceiptLine"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalWithAggregatesFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.UuidWithAggregatesFilter<"MaterialReceiptLine"> | string;
    lotId?: Prisma.UuidWithAggregatesFilter<"MaterialReceiptLine"> | string;
};
export type MaterialReceiptLineCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receipt: Prisma.MaterialReceiptCreateNestedOneWithoutLinesInput;
    lot: Prisma.MaterialLotCreateNestedOneWithoutReceiptLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutReceiptLineInput;
};
export type MaterialReceiptLineUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId: string;
    lotId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutReceiptLineInput;
};
export type MaterialReceiptLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receipt?: Prisma.MaterialReceiptUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutReceiptLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutReceiptLineNestedInput;
};
export type MaterialReceiptLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutReceiptLineNestedInput;
};
export type MaterialReceiptLineCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId: string;
    lotId: string;
};
export type MaterialReceiptLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type MaterialReceiptLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptLineListRelationFilter = {
    every?: Prisma.MaterialReceiptLineWhereInput;
    some?: Prisma.MaterialReceiptLineWhereInput;
    none?: Prisma.MaterialReceiptLineWhereInput;
};
export type MaterialReceiptLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialReceiptLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type MaterialReceiptLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type MaterialReceiptLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type MaterialReceiptLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
};
export type MaterialReceiptLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type MaterialReceiptLineNullableScalarRelationFilter = {
    is?: Prisma.MaterialReceiptLineWhereInput | null;
    isNot?: Prisma.MaterialReceiptLineWhereInput | null;
};
export type MaterialReceiptLineCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput> | Prisma.MaterialReceiptLineCreateWithoutLotInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyLotInputEnvelope;
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
};
export type MaterialReceiptLineUncheckedCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput> | Prisma.MaterialReceiptLineCreateWithoutLotInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyLotInputEnvelope;
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
};
export type MaterialReceiptLineUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput> | Prisma.MaterialReceiptLineCreateWithoutLotInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutLotInput | Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyLotInputEnvelope;
    set?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    update?: Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutLotInput | Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutLotInput | Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.MaterialReceiptLineScalarWhereInput | Prisma.MaterialReceiptLineScalarWhereInput[];
};
export type MaterialReceiptLineUncheckedUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput> | Prisma.MaterialReceiptLineCreateWithoutLotInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutLotInput | Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyLotInputEnvelope;
    set?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    update?: Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutLotInput | Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutLotInput | Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.MaterialReceiptLineScalarWhereInput | Prisma.MaterialReceiptLineScalarWhereInput[];
};
export type MaterialReceiptLineCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput> | Prisma.MaterialReceiptLineCreateWithoutReceiptInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyReceiptInputEnvelope;
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
};
export type MaterialReceiptLineUncheckedCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput> | Prisma.MaterialReceiptLineCreateWithoutReceiptInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyReceiptInputEnvelope;
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
};
export type MaterialReceiptLineUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput> | Prisma.MaterialReceiptLineCreateWithoutReceiptInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutReceiptInput | Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyReceiptInputEnvelope;
    set?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    update?: Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutReceiptInput | Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutReceiptInput | Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.MaterialReceiptLineScalarWhereInput | Prisma.MaterialReceiptLineScalarWhereInput[];
};
export type MaterialReceiptLineUncheckedUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput> | Prisma.MaterialReceiptLineCreateWithoutReceiptInput[] | Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput | Prisma.MaterialReceiptLineCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutReceiptInput | Prisma.MaterialReceiptLineUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.MaterialReceiptLineCreateManyReceiptInputEnvelope;
    set?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput | Prisma.MaterialReceiptLineWhereUniqueInput[];
    update?: Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutReceiptInput | Prisma.MaterialReceiptLineUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutReceiptInput | Prisma.MaterialReceiptLineUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.MaterialReceiptLineScalarWhereInput | Prisma.MaterialReceiptLineScalarWhereInput[];
};
export type MaterialReceiptLineCreateNestedOneWithoutMaterialMovementInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutMaterialMovementInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutMaterialMovementInput;
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput;
};
export type MaterialReceiptLineUpdateOneWithoutMaterialMovementNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutMaterialMovementInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutMaterialMovementInput>;
    connectOrCreate?: Prisma.MaterialReceiptLineCreateOrConnectWithoutMaterialMovementInput;
    upsert?: Prisma.MaterialReceiptLineUpsertWithoutMaterialMovementInput;
    disconnect?: Prisma.MaterialReceiptLineWhereInput | boolean;
    delete?: Prisma.MaterialReceiptLineWhereInput | boolean;
    connect?: Prisma.MaterialReceiptLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialReceiptLineUpdateToOneWithWhereWithoutMaterialMovementInput, Prisma.MaterialReceiptLineUpdateWithoutMaterialMovementInput>, Prisma.MaterialReceiptLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type MaterialReceiptLineCreateWithoutLotInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receipt: Prisma.MaterialReceiptCreateNestedOneWithoutLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutReceiptLineInput;
};
export type MaterialReceiptLineUncheckedCreateWithoutLotInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutReceiptLineInput;
};
export type MaterialReceiptLineCreateOrConnectWithoutLotInput = {
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput>;
};
export type MaterialReceiptLineCreateManyLotInputEnvelope = {
    data: Prisma.MaterialReceiptLineCreateManyLotInput | Prisma.MaterialReceiptLineCreateManyLotInput[];
    skipDuplicates?: boolean;
};
export type MaterialReceiptLineUpsertWithWhereUniqueWithoutLotInput = {
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReceiptLineUpdateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedUpdateWithoutLotInput>;
    create: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutLotInput>;
};
export type MaterialReceiptLineUpdateWithWhereUniqueWithoutLotInput = {
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateWithoutLotInput, Prisma.MaterialReceiptLineUncheckedUpdateWithoutLotInput>;
};
export type MaterialReceiptLineUpdateManyWithWhereWithoutLotInput = {
    where: Prisma.MaterialReceiptLineScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateManyMutationInput, Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutLotInput>;
};
export type MaterialReceiptLineScalarWhereInput = {
    AND?: Prisma.MaterialReceiptLineScalarWhereInput | Prisma.MaterialReceiptLineScalarWhereInput[];
    OR?: Prisma.MaterialReceiptLineScalarWhereInput[];
    NOT?: Prisma.MaterialReceiptLineScalarWhereInput | Prisma.MaterialReceiptLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"MaterialReceiptLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
    lotId?: Prisma.UuidFilter<"MaterialReceiptLine"> | string;
};
export type MaterialReceiptLineCreateWithoutReceiptInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lot: Prisma.MaterialLotCreateNestedOneWithoutReceiptLinesInput;
    materialMovement?: Prisma.MaterialMovementCreateNestedOneWithoutReceiptLineInput;
};
export type MaterialReceiptLineUncheckedCreateWithoutReceiptInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotId: string;
    materialMovement?: Prisma.MaterialMovementUncheckedCreateNestedOneWithoutReceiptLineInput;
};
export type MaterialReceiptLineCreateOrConnectWithoutReceiptInput = {
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput>;
};
export type MaterialReceiptLineCreateManyReceiptInputEnvelope = {
    data: Prisma.MaterialReceiptLineCreateManyReceiptInput | Prisma.MaterialReceiptLineCreateManyReceiptInput[];
    skipDuplicates?: boolean;
};
export type MaterialReceiptLineUpsertWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReceiptLineUpdateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedUpdateWithoutReceiptInput>;
    create: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutReceiptInput>;
};
export type MaterialReceiptLineUpdateWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateWithoutReceiptInput, Prisma.MaterialReceiptLineUncheckedUpdateWithoutReceiptInput>;
};
export type MaterialReceiptLineUpdateManyWithWhereWithoutReceiptInput = {
    where: Prisma.MaterialReceiptLineScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateManyMutationInput, Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutReceiptInput>;
};
export type MaterialReceiptLineCreateWithoutMaterialMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receipt: Prisma.MaterialReceiptCreateNestedOneWithoutLinesInput;
    lot: Prisma.MaterialLotCreateNestedOneWithoutReceiptLinesInput;
};
export type MaterialReceiptLineUncheckedCreateWithoutMaterialMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId: string;
    lotId: string;
};
export type MaterialReceiptLineCreateOrConnectWithoutMaterialMovementInput = {
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutMaterialMovementInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutMaterialMovementInput>;
};
export type MaterialReceiptLineUpsertWithoutMaterialMovementInput = {
    update: Prisma.XOR<Prisma.MaterialReceiptLineUpdateWithoutMaterialMovementInput, Prisma.MaterialReceiptLineUncheckedUpdateWithoutMaterialMovementInput>;
    create: Prisma.XOR<Prisma.MaterialReceiptLineCreateWithoutMaterialMovementInput, Prisma.MaterialReceiptLineUncheckedCreateWithoutMaterialMovementInput>;
    where?: Prisma.MaterialReceiptLineWhereInput;
};
export type MaterialReceiptLineUpdateToOneWithWhereWithoutMaterialMovementInput = {
    where?: Prisma.MaterialReceiptLineWhereInput;
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateWithoutMaterialMovementInput, Prisma.MaterialReceiptLineUncheckedUpdateWithoutMaterialMovementInput>;
};
export type MaterialReceiptLineUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receipt?: Prisma.MaterialReceiptUpdateOneRequiredWithoutLinesNestedInput;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutReceiptLinesNestedInput;
};
export type MaterialReceiptLineUncheckedUpdateWithoutMaterialMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptLineCreateManyLotInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId: string;
};
export type MaterialReceiptLineUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receipt?: Prisma.MaterialReceiptUpdateOneRequiredWithoutLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutReceiptLineNestedInput;
};
export type MaterialReceiptLineUncheckedUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutReceiptLineNestedInput;
};
export type MaterialReceiptLineUncheckedUpdateManyWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptLineCreateManyReceiptInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotId: string;
};
export type MaterialReceiptLineUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutReceiptLinesNestedInput;
    materialMovement?: Prisma.MaterialMovementUpdateOneWithoutReceiptLineNestedInput;
};
export type MaterialReceiptLineUncheckedUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialMovement?: Prisma.MaterialMovementUncheckedUpdateOneWithoutReceiptLineNestedInput;
};
export type MaterialReceiptLineUncheckedUpdateManyWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    receiptId?: boolean;
    lotId?: boolean;
    receipt?: boolean | Prisma.MaterialReceiptDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.MaterialReceiptLine$materialMovementArgs<ExtArgs>;
}, ExtArgs["result"]["materialReceiptLine"]>;
export type MaterialReceiptLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    receiptId?: boolean;
    lotId?: boolean;
    receipt?: boolean | Prisma.MaterialReceiptDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReceiptLine"]>;
export type MaterialReceiptLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    receiptId?: boolean;
    lotId?: boolean;
    receipt?: boolean | Prisma.MaterialReceiptDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReceiptLine"]>;
export type MaterialReceiptLineSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    receiptId?: boolean;
    lotId?: boolean;
};
export type MaterialReceiptLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "unitPrice" | "receiptId" | "lotId", ExtArgs["result"]["materialReceiptLine"]>;
export type MaterialReceiptLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.MaterialReceiptDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    materialMovement?: boolean | Prisma.MaterialReceiptLine$materialMovementArgs<ExtArgs>;
};
export type MaterialReceiptLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.MaterialReceiptDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
};
export type MaterialReceiptLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.MaterialReceiptDefaultArgs<ExtArgs>;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
};
export type $MaterialReceiptLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialReceiptLine";
    objects: {
        receipt: Prisma.$MaterialReceiptPayload<ExtArgs>;
        lot: Prisma.$MaterialLotPayload<ExtArgs>;
        materialMovement: Prisma.$MaterialMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        unitPrice: runtime.Decimal;
        receiptId: string;
        lotId: string;
    }, ExtArgs["result"]["materialReceiptLine"]>;
    composites: {};
};
export type MaterialReceiptLineGetPayload<S extends boolean | null | undefined | MaterialReceiptLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload, S>;
export type MaterialReceiptLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialReceiptLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialReceiptLineCountAggregateInputType | true;
};
export interface MaterialReceiptLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialReceiptLine'];
        meta: {
            name: 'MaterialReceiptLine';
        };
    };
    findUnique<T extends MaterialReceiptLineFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialReceiptLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialReceiptLineFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialReceiptLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialReceiptLineFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialReceiptLineCreateArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialReceiptLineCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialReceiptLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialReceiptLineDeleteArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialReceiptLineUpdateArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialReceiptLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialReceiptLineUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialReceiptLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialReceiptLineUpsertArgs>(args: Prisma.SelectSubset<T, MaterialReceiptLineUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialReceiptLineCountArgs>(args?: Prisma.Subset<T, MaterialReceiptLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialReceiptLineCountAggregateOutputType> : number>;
    aggregate<T extends MaterialReceiptLineAggregateArgs>(args: Prisma.Subset<T, MaterialReceiptLineAggregateArgs>): Prisma.PrismaPromise<GetMaterialReceiptLineAggregateType<T>>;
    groupBy<T extends MaterialReceiptLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialReceiptLineGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialReceiptLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialReceiptLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialReceiptLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialReceiptLineFieldRefs;
}
export interface Prisma__MaterialReceiptLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    receipt<T extends Prisma.MaterialReceiptDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialReceiptDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lot<T extends Prisma.MaterialLotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialLotDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    materialMovement<T extends Prisma.MaterialReceiptLine$materialMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialReceiptLine$materialMovementArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialReceiptLineFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialReceiptLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"MaterialReceiptLine", 'Decimal'>;
    readonly unitPrice: Prisma.FieldRef<"MaterialReceiptLine", 'Decimal'>;
    readonly receiptId: Prisma.FieldRef<"MaterialReceiptLine", 'String'>;
    readonly lotId: Prisma.FieldRef<"MaterialReceiptLine", 'String'>;
}
export type MaterialReceiptLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
};
export type MaterialReceiptLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
};
export type MaterialReceiptLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptLineWhereInput;
    orderBy?: Prisma.MaterialReceiptLineOrderByWithRelationInput | Prisma.MaterialReceiptLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReceiptLineScalarFieldEnum | Prisma.MaterialReceiptLineScalarFieldEnum[];
};
export type MaterialReceiptLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptLineWhereInput;
    orderBy?: Prisma.MaterialReceiptLineOrderByWithRelationInput | Prisma.MaterialReceiptLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReceiptLineScalarFieldEnum | Prisma.MaterialReceiptLineScalarFieldEnum[];
};
export type MaterialReceiptLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptLineWhereInput;
    orderBy?: Prisma.MaterialReceiptLineOrderByWithRelationInput | Prisma.MaterialReceiptLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReceiptLineScalarFieldEnum | Prisma.MaterialReceiptLineScalarFieldEnum[];
};
export type MaterialReceiptLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReceiptLineCreateInput, Prisma.MaterialReceiptLineUncheckedCreateInput>;
};
export type MaterialReceiptLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialReceiptLineCreateManyInput | Prisma.MaterialReceiptLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialReceiptLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    data: Prisma.MaterialReceiptLineCreateManyInput | Prisma.MaterialReceiptLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialReceiptLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialReceiptLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateInput, Prisma.MaterialReceiptLineUncheckedUpdateInput>;
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
};
export type MaterialReceiptLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateManyMutationInput, Prisma.MaterialReceiptLineUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReceiptLineWhereInput;
    limit?: number;
};
export type MaterialReceiptLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReceiptLineUpdateManyMutationInput, Prisma.MaterialReceiptLineUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReceiptLineWhereInput;
    limit?: number;
    include?: Prisma.MaterialReceiptLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialReceiptLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptLineCreateInput, Prisma.MaterialReceiptLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialReceiptLineUpdateInput, Prisma.MaterialReceiptLineUncheckedUpdateInput>;
};
export type MaterialReceiptLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptLineWhereUniqueInput;
};
export type MaterialReceiptLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptLineWhereInput;
    limit?: number;
};
export type MaterialReceiptLine$materialMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialReceiptLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
};
