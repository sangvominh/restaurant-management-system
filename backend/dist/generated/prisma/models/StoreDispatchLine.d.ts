import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StoreDispatchLineModel = runtime.Types.Result.DefaultSelection<Prisma.$StoreDispatchLinePayload>;
export type AggregateStoreDispatchLine = {
    _count: StoreDispatchLineCountAggregateOutputType | null;
    _avg: StoreDispatchLineAvgAggregateOutputType | null;
    _sum: StoreDispatchLineSumAggregateOutputType | null;
    _min: StoreDispatchLineMinAggregateOutputType | null;
    _max: StoreDispatchLineMaxAggregateOutputType | null;
};
export type StoreDispatchLineAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type StoreDispatchLineSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type StoreDispatchLineMinAggregateOutputType = {
    id: string | null;
    dispatchId: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
};
export type StoreDispatchLineMaxAggregateOutputType = {
    id: string | null;
    dispatchId: string | null;
    productId: string | null;
    quantity: runtime.Decimal | null;
};
export type StoreDispatchLineCountAggregateOutputType = {
    id: number;
    dispatchId: number;
    productId: number;
    quantity: number;
    _all: number;
};
export type StoreDispatchLineAvgAggregateInputType = {
    quantity?: true;
};
export type StoreDispatchLineSumAggregateInputType = {
    quantity?: true;
};
export type StoreDispatchLineMinAggregateInputType = {
    id?: true;
    dispatchId?: true;
    productId?: true;
    quantity?: true;
};
export type StoreDispatchLineMaxAggregateInputType = {
    id?: true;
    dispatchId?: true;
    productId?: true;
    quantity?: true;
};
export type StoreDispatchLineCountAggregateInputType = {
    id?: true;
    dispatchId?: true;
    productId?: true;
    quantity?: true;
    _all?: true;
};
export type StoreDispatchLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchLineWhereInput;
    orderBy?: Prisma.StoreDispatchLineOrderByWithRelationInput | Prisma.StoreDispatchLineOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StoreDispatchLineCountAggregateInputType;
    _avg?: StoreDispatchLineAvgAggregateInputType;
    _sum?: StoreDispatchLineSumAggregateInputType;
    _min?: StoreDispatchLineMinAggregateInputType;
    _max?: StoreDispatchLineMaxAggregateInputType;
};
export type GetStoreDispatchLineAggregateType<T extends StoreDispatchLineAggregateArgs> = {
    [P in keyof T & keyof AggregateStoreDispatchLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStoreDispatchLine[P]> : Prisma.GetScalarType<T[P], AggregateStoreDispatchLine[P]>;
};
export type StoreDispatchLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchLineWhereInput;
    orderBy?: Prisma.StoreDispatchLineOrderByWithAggregationInput | Prisma.StoreDispatchLineOrderByWithAggregationInput[];
    by: Prisma.StoreDispatchLineScalarFieldEnum[] | Prisma.StoreDispatchLineScalarFieldEnum;
    having?: Prisma.StoreDispatchLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StoreDispatchLineCountAggregateInputType | true;
    _avg?: StoreDispatchLineAvgAggregateInputType;
    _sum?: StoreDispatchLineSumAggregateInputType;
    _min?: StoreDispatchLineMinAggregateInputType;
    _max?: StoreDispatchLineMaxAggregateInputType;
};
export type StoreDispatchLineGroupByOutputType = {
    id: string;
    dispatchId: string;
    productId: string;
    quantity: runtime.Decimal;
    _count: StoreDispatchLineCountAggregateOutputType | null;
    _avg: StoreDispatchLineAvgAggregateOutputType | null;
    _sum: StoreDispatchLineSumAggregateOutputType | null;
    _min: StoreDispatchLineMinAggregateOutputType | null;
    _max: StoreDispatchLineMaxAggregateOutputType | null;
};
export type GetStoreDispatchLineGroupByPayload<T extends StoreDispatchLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StoreDispatchLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StoreDispatchLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StoreDispatchLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StoreDispatchLineGroupByOutputType[P]>;
}>>;
export type StoreDispatchLineWhereInput = {
    AND?: Prisma.StoreDispatchLineWhereInput | Prisma.StoreDispatchLineWhereInput[];
    OR?: Prisma.StoreDispatchLineWhereInput[];
    NOT?: Prisma.StoreDispatchLineWhereInput | Prisma.StoreDispatchLineWhereInput[];
    id?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    dispatchId?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    productId?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    quantity?: Prisma.DecimalFilter<"StoreDispatchLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotListRelationFilter;
    lotMovements?: Prisma.ProductLotMovementListRelationFilter;
    dispatch?: Prisma.XOR<Prisma.StoreDispatchScalarRelationFilter, Prisma.StoreDispatchWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    warehouseMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
    storeMovement?: Prisma.XOR<Prisma.StoreMovementNullableScalarRelationFilter, Prisma.StoreMovementWhereInput> | null;
};
export type StoreDispatchLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    dispatchId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    lotAllocations?: Prisma.StoreDispatchLotOrderByRelationAggregateInput;
    lotMovements?: Prisma.ProductLotMovementOrderByRelationAggregateInput;
    dispatch?: Prisma.StoreDispatchOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    warehouseMovement?: Prisma.ProductMovementOrderByWithRelationInput;
    storeMovement?: Prisma.StoreMovementOrderByWithRelationInput;
};
export type StoreDispatchLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    dispatchId_productId?: Prisma.StoreDispatchLineDispatchIdProductIdCompoundUniqueInput;
    AND?: Prisma.StoreDispatchLineWhereInput | Prisma.StoreDispatchLineWhereInput[];
    OR?: Prisma.StoreDispatchLineWhereInput[];
    NOT?: Prisma.StoreDispatchLineWhereInput | Prisma.StoreDispatchLineWhereInput[];
    dispatchId?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    productId?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    quantity?: Prisma.DecimalFilter<"StoreDispatchLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotListRelationFilter;
    lotMovements?: Prisma.ProductLotMovementListRelationFilter;
    dispatch?: Prisma.XOR<Prisma.StoreDispatchScalarRelationFilter, Prisma.StoreDispatchWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    warehouseMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
    storeMovement?: Prisma.XOR<Prisma.StoreMovementNullableScalarRelationFilter, Prisma.StoreMovementWhereInput> | null;
}, "id" | "dispatchId_productId">;
export type StoreDispatchLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    dispatchId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    _count?: Prisma.StoreDispatchLineCountOrderByAggregateInput;
    _avg?: Prisma.StoreDispatchLineAvgOrderByAggregateInput;
    _max?: Prisma.StoreDispatchLineMaxOrderByAggregateInput;
    _min?: Prisma.StoreDispatchLineMinOrderByAggregateInput;
    _sum?: Prisma.StoreDispatchLineSumOrderByAggregateInput;
};
export type StoreDispatchLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.StoreDispatchLineScalarWhereWithAggregatesInput | Prisma.StoreDispatchLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.StoreDispatchLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StoreDispatchLineScalarWhereWithAggregatesInput | Prisma.StoreDispatchLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"StoreDispatchLine"> | string;
    dispatchId?: Prisma.UuidWithAggregatesFilter<"StoreDispatchLine"> | string;
    productId?: Prisma.UuidWithAggregatesFilter<"StoreDispatchLine"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"StoreDispatchLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutDispatchLineInput;
    dispatch: Prisma.StoreDispatchCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreDispatchLinesInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUncheckedCreateInput = {
    id?: string;
    dispatchId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutDispatchLineInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutDispatchLineNestedInput;
    dispatch?: Prisma.StoreDispatchUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreDispatchLinesNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutDispatchLineNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineCreateManyInput = {
    id?: string;
    dispatchId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineListRelationFilter = {
    every?: Prisma.StoreDispatchLineWhereInput;
    some?: Prisma.StoreDispatchLineWhereInput;
    none?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreDispatchLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StoreDispatchLineScalarRelationFilter = {
    is?: Prisma.StoreDispatchLineWhereInput;
    isNot?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreDispatchLineNullableScalarRelationFilter = {
    is?: Prisma.StoreDispatchLineWhereInput | null;
    isNot?: Prisma.StoreDispatchLineWhereInput | null;
};
export type StoreDispatchLineDispatchIdProductIdCompoundUniqueInput = {
    dispatchId: string;
    productId: string;
};
export type StoreDispatchLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dispatchId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type StoreDispatchLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type StoreDispatchLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dispatchId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type StoreDispatchLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dispatchId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type StoreDispatchLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type StoreDispatchLineCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutProductInput, Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput> | Prisma.StoreDispatchLineCreateWithoutProductInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput | Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyProductInputEnvelope;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
};
export type StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutProductInput, Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput> | Prisma.StoreDispatchLineCreateWithoutProductInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput | Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyProductInputEnvelope;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
};
export type StoreDispatchLineUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutProductInput, Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput> | Prisma.StoreDispatchLineCreateWithoutProductInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput | Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutProductInput | Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyProductInputEnvelope;
    set?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    delete?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    update?: Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutProductInput | Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StoreDispatchLineUpdateManyWithWhereWithoutProductInput | Prisma.StoreDispatchLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StoreDispatchLineScalarWhereInput | Prisma.StoreDispatchLineScalarWhereInput[];
};
export type StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutProductInput, Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput> | Prisma.StoreDispatchLineCreateWithoutProductInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput | Prisma.StoreDispatchLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutProductInput | Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyProductInputEnvelope;
    set?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    delete?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    update?: Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutProductInput | Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.StoreDispatchLineUpdateManyWithWhereWithoutProductInput | Prisma.StoreDispatchLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.StoreDispatchLineScalarWhereInput | Prisma.StoreDispatchLineScalarWhereInput[];
};
export type StoreDispatchLineCreateNestedOneWithoutLotAllocationsInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotAllocationsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotAllocationsInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutLotAllocationsInput;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineUpdateOneRequiredWithoutLotAllocationsNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotAllocationsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotAllocationsInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutLotAllocationsInput;
    upsert?: Prisma.StoreDispatchLineUpsertWithoutLotAllocationsInput;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreDispatchLineUpdateToOneWithWhereWithoutLotAllocationsInput, Prisma.StoreDispatchLineUpdateWithoutLotAllocationsInput>, Prisma.StoreDispatchLineUncheckedUpdateWithoutLotAllocationsInput>;
};
export type StoreDispatchLineCreateNestedOneWithoutLotMovementsInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotMovementsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotMovementsInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutLotMovementsInput;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineUpdateOneWithoutLotMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotMovementsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotMovementsInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutLotMovementsInput;
    upsert?: Prisma.StoreDispatchLineUpsertWithoutLotMovementsInput;
    disconnect?: Prisma.StoreDispatchLineWhereInput | boolean;
    delete?: Prisma.StoreDispatchLineWhereInput | boolean;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreDispatchLineUpdateToOneWithWhereWithoutLotMovementsInput, Prisma.StoreDispatchLineUpdateWithoutLotMovementsInput>, Prisma.StoreDispatchLineUncheckedUpdateWithoutLotMovementsInput>;
};
export type StoreDispatchLineCreateNestedOneWithoutWarehouseMovementInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutWarehouseMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutWarehouseMovementInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutWarehouseMovementInput;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineUpdateOneWithoutWarehouseMovementNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutWarehouseMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutWarehouseMovementInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutWarehouseMovementInput;
    upsert?: Prisma.StoreDispatchLineUpsertWithoutWarehouseMovementInput;
    disconnect?: Prisma.StoreDispatchLineWhereInput | boolean;
    delete?: Prisma.StoreDispatchLineWhereInput | boolean;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreDispatchLineUpdateToOneWithWhereWithoutWarehouseMovementInput, Prisma.StoreDispatchLineUpdateWithoutWarehouseMovementInput>, Prisma.StoreDispatchLineUncheckedUpdateWithoutWarehouseMovementInput>;
};
export type StoreDispatchLineCreateNestedManyWithoutDispatchInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput> | Prisma.StoreDispatchLineCreateWithoutDispatchInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput | Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyDispatchInputEnvelope;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
};
export type StoreDispatchLineUncheckedCreateNestedManyWithoutDispatchInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput> | Prisma.StoreDispatchLineCreateWithoutDispatchInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput | Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyDispatchInputEnvelope;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
};
export type StoreDispatchLineUpdateManyWithoutDispatchNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput> | Prisma.StoreDispatchLineCreateWithoutDispatchInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput | Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput[];
    upsert?: Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutDispatchInput | Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutDispatchInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyDispatchInputEnvelope;
    set?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    delete?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    update?: Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutDispatchInput | Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutDispatchInput[];
    updateMany?: Prisma.StoreDispatchLineUpdateManyWithWhereWithoutDispatchInput | Prisma.StoreDispatchLineUpdateManyWithWhereWithoutDispatchInput[];
    deleteMany?: Prisma.StoreDispatchLineScalarWhereInput | Prisma.StoreDispatchLineScalarWhereInput[];
};
export type StoreDispatchLineUncheckedUpdateManyWithoutDispatchNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput> | Prisma.StoreDispatchLineCreateWithoutDispatchInput[] | Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput | Prisma.StoreDispatchLineCreateOrConnectWithoutDispatchInput[];
    upsert?: Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutDispatchInput | Prisma.StoreDispatchLineUpsertWithWhereUniqueWithoutDispatchInput[];
    createMany?: Prisma.StoreDispatchLineCreateManyDispatchInputEnvelope;
    set?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    disconnect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    delete?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    connect?: Prisma.StoreDispatchLineWhereUniqueInput | Prisma.StoreDispatchLineWhereUniqueInput[];
    update?: Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutDispatchInput | Prisma.StoreDispatchLineUpdateWithWhereUniqueWithoutDispatchInput[];
    updateMany?: Prisma.StoreDispatchLineUpdateManyWithWhereWithoutDispatchInput | Prisma.StoreDispatchLineUpdateManyWithWhereWithoutDispatchInput[];
    deleteMany?: Prisma.StoreDispatchLineScalarWhereInput | Prisma.StoreDispatchLineScalarWhereInput[];
};
export type StoreDispatchLineCreateNestedOneWithoutStoreMovementInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutStoreMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutStoreMovementInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutStoreMovementInput;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineUpdateOneWithoutStoreMovementNestedInput = {
    create?: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutStoreMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutStoreMovementInput>;
    connectOrCreate?: Prisma.StoreDispatchLineCreateOrConnectWithoutStoreMovementInput;
    upsert?: Prisma.StoreDispatchLineUpsertWithoutStoreMovementInput;
    disconnect?: Prisma.StoreDispatchLineWhereInput | boolean;
    delete?: Prisma.StoreDispatchLineWhereInput | boolean;
    connect?: Prisma.StoreDispatchLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreDispatchLineUpdateToOneWithWhereWithoutStoreMovementInput, Prisma.StoreDispatchLineUpdateWithoutStoreMovementInput>, Prisma.StoreDispatchLineUncheckedUpdateWithoutStoreMovementInput>;
};
export type StoreDispatchLineCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutDispatchLineInput;
    dispatch: Prisma.StoreDispatchCreateNestedOneWithoutLinesInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUncheckedCreateWithoutProductInput = {
    id?: string;
    dispatchId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutDispatchLineInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineCreateOrConnectWithoutProductInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutProductInput, Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput>;
};
export type StoreDispatchLineCreateManyProductInputEnvelope = {
    data: Prisma.StoreDispatchLineCreateManyProductInput | Prisma.StoreDispatchLineCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type StoreDispatchLineUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutProductInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutProductInput, Prisma.StoreDispatchLineUncheckedCreateWithoutProductInput>;
};
export type StoreDispatchLineUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutProductInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutProductInput>;
};
export type StoreDispatchLineUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.StoreDispatchLineScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateManyMutationInput, Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductInput>;
};
export type StoreDispatchLineScalarWhereInput = {
    AND?: Prisma.StoreDispatchLineScalarWhereInput | Prisma.StoreDispatchLineScalarWhereInput[];
    OR?: Prisma.StoreDispatchLineScalarWhereInput[];
    NOT?: Prisma.StoreDispatchLineScalarWhereInput | Prisma.StoreDispatchLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    dispatchId?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    productId?: Prisma.UuidFilter<"StoreDispatchLine"> | string;
    quantity?: Prisma.DecimalFilter<"StoreDispatchLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineCreateWithoutLotAllocationsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutDispatchLineInput;
    dispatch: Prisma.StoreDispatchCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreDispatchLinesInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUncheckedCreateWithoutLotAllocationsInput = {
    id?: string;
    dispatchId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutDispatchLineInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineCreateOrConnectWithoutLotAllocationsInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotAllocationsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotAllocationsInput>;
};
export type StoreDispatchLineUpsertWithoutLotAllocationsInput = {
    update: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutLotAllocationsInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutLotAllocationsInput>;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotAllocationsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotAllocationsInput>;
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreDispatchLineUpdateToOneWithWhereWithoutLotAllocationsInput = {
    where?: Prisma.StoreDispatchLineWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutLotAllocationsInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutLotAllocationsInput>;
};
export type StoreDispatchLineUpdateWithoutLotAllocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutDispatchLineNestedInput;
    dispatch?: Prisma.StoreDispatchUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreDispatchLinesNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateWithoutLotAllocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutDispatchLineNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineCreateWithoutLotMovementsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotCreateNestedManyWithoutDispatchLineInput;
    dispatch: Prisma.StoreDispatchCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreDispatchLinesInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUncheckedCreateWithoutLotMovementsInput = {
    id?: string;
    dispatchId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedCreateNestedManyWithoutDispatchLineInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineCreateOrConnectWithoutLotMovementsInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotMovementsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotMovementsInput>;
};
export type StoreDispatchLineUpsertWithoutLotMovementsInput = {
    update: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutLotMovementsInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutLotMovementsInput>;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutLotMovementsInput, Prisma.StoreDispatchLineUncheckedCreateWithoutLotMovementsInput>;
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreDispatchLineUpdateToOneWithWhereWithoutLotMovementsInput = {
    where?: Prisma.StoreDispatchLineWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutLotMovementsInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutLotMovementsInput>;
};
export type StoreDispatchLineUpdateWithoutLotMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUpdateManyWithoutDispatchLineNestedInput;
    dispatch?: Prisma.StoreDispatchUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreDispatchLinesNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateWithoutLotMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedUpdateManyWithoutDispatchLineNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineCreateWithoutWarehouseMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutDispatchLineInput;
    dispatch: Prisma.StoreDispatchCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreDispatchLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUncheckedCreateWithoutWarehouseMovementInput = {
    id?: string;
    dispatchId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineCreateOrConnectWithoutWarehouseMovementInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutWarehouseMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutWarehouseMovementInput>;
};
export type StoreDispatchLineUpsertWithoutWarehouseMovementInput = {
    update: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutWarehouseMovementInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutWarehouseMovementInput>;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutWarehouseMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutWarehouseMovementInput>;
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreDispatchLineUpdateToOneWithWhereWithoutWarehouseMovementInput = {
    where?: Prisma.StoreDispatchLineWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutWarehouseMovementInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutWarehouseMovementInput>;
};
export type StoreDispatchLineUpdateWithoutWarehouseMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutDispatchLineNestedInput;
    dispatch?: Prisma.StoreDispatchUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreDispatchLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateWithoutWarehouseMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineCreateWithoutDispatchInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutDispatchLineInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreDispatchLinesInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUncheckedCreateWithoutDispatchInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutDispatchLineInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineCreateOrConnectWithoutDispatchInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput>;
};
export type StoreDispatchLineCreateManyDispatchInputEnvelope = {
    data: Prisma.StoreDispatchLineCreateManyDispatchInput | Prisma.StoreDispatchLineCreateManyDispatchInput[];
    skipDuplicates?: boolean;
};
export type StoreDispatchLineUpsertWithWhereUniqueWithoutDispatchInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutDispatchInput>;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedCreateWithoutDispatchInput>;
};
export type StoreDispatchLineUpdateWithWhereUniqueWithoutDispatchInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutDispatchInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutDispatchInput>;
};
export type StoreDispatchLineUpdateManyWithWhereWithoutDispatchInput = {
    where: Prisma.StoreDispatchLineScalarWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateManyMutationInput, Prisma.StoreDispatchLineUncheckedUpdateManyWithoutDispatchInput>;
};
export type StoreDispatchLineCreateWithoutStoreMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutDispatchLineInput;
    dispatch: Prisma.StoreDispatchCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutStoreDispatchLinesInput;
    warehouseMovement?: Prisma.ProductMovementCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineUncheckedCreateWithoutStoreMovementInput = {
    id?: string;
    dispatchId: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedCreateNestedManyWithoutDispatchLineInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutDispatchLineInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutDispatchLineInput;
};
export type StoreDispatchLineCreateOrConnectWithoutStoreMovementInput = {
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutStoreMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutStoreMovementInput>;
};
export type StoreDispatchLineUpsertWithoutStoreMovementInput = {
    update: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutStoreMovementInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutStoreMovementInput>;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateWithoutStoreMovementInput, Prisma.StoreDispatchLineUncheckedCreateWithoutStoreMovementInput>;
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type StoreDispatchLineUpdateToOneWithWhereWithoutStoreMovementInput = {
    where?: Prisma.StoreDispatchLineWhereInput;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateWithoutStoreMovementInput, Prisma.StoreDispatchLineUncheckedUpdateWithoutStoreMovementInput>;
};
export type StoreDispatchLineUpdateWithoutStoreMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutDispatchLineNestedInput;
    dispatch?: Prisma.StoreDispatchUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreDispatchLinesNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateWithoutStoreMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutDispatchLineNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineCreateManyProductInput = {
    id?: string;
    dispatchId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutDispatchLineNestedInput;
    dispatch?: Prisma.StoreDispatchUpdateOneRequiredWithoutLinesNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutDispatchLineNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatchId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineCreateManyDispatchInput = {
    id?: string;
    productId: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineUpdateWithoutDispatchInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutDispatchLineNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutStoreDispatchLinesNestedInput;
    warehouseMovement?: Prisma.ProductMovementUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateWithoutDispatchInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lotAllocations?: Prisma.StoreDispatchLotUncheckedUpdateManyWithoutDispatchLineNestedInput;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutDispatchLineNestedInput;
    warehouseMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutDispatchLineNestedInput;
};
export type StoreDispatchLineUncheckedUpdateManyWithoutDispatchInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StoreDispatchLineCountOutputType = {
    lotAllocations: number;
    lotMovements: number;
};
export type StoreDispatchLineCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lotAllocations?: boolean | StoreDispatchLineCountOutputTypeCountLotAllocationsArgs;
    lotMovements?: boolean | StoreDispatchLineCountOutputTypeCountLotMovementsArgs;
};
export type StoreDispatchLineCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineCountOutputTypeSelect<ExtArgs> | null;
};
export type StoreDispatchLineCountOutputTypeCountLotAllocationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchLotWhereInput;
};
export type StoreDispatchLineCountOutputTypeCountLotMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductLotMovementWhereInput;
};
export type StoreDispatchLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dispatchId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    lotAllocations?: boolean | Prisma.StoreDispatchLine$lotAllocationsArgs<ExtArgs>;
    lotMovements?: boolean | Prisma.StoreDispatchLine$lotMovementsArgs<ExtArgs>;
    dispatch?: boolean | Prisma.StoreDispatchDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    warehouseMovement?: boolean | Prisma.StoreDispatchLine$warehouseMovementArgs<ExtArgs>;
    storeMovement?: boolean | Prisma.StoreDispatchLine$storeMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreDispatchLineCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["storeDispatchLine"]>;
export type StoreDispatchLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dispatchId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    dispatch?: boolean | Prisma.StoreDispatchDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["storeDispatchLine"]>;
export type StoreDispatchLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dispatchId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    dispatch?: boolean | Prisma.StoreDispatchDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["storeDispatchLine"]>;
export type StoreDispatchLineSelectScalar = {
    id?: boolean;
    dispatchId?: boolean;
    productId?: boolean;
    quantity?: boolean;
};
export type StoreDispatchLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "dispatchId" | "productId" | "quantity", ExtArgs["result"]["storeDispatchLine"]>;
export type StoreDispatchLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lotAllocations?: boolean | Prisma.StoreDispatchLine$lotAllocationsArgs<ExtArgs>;
    lotMovements?: boolean | Prisma.StoreDispatchLine$lotMovementsArgs<ExtArgs>;
    dispatch?: boolean | Prisma.StoreDispatchDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    warehouseMovement?: boolean | Prisma.StoreDispatchLine$warehouseMovementArgs<ExtArgs>;
    storeMovement?: boolean | Prisma.StoreDispatchLine$storeMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreDispatchLineCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StoreDispatchLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.StoreDispatchDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type StoreDispatchLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.StoreDispatchDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $StoreDispatchLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StoreDispatchLine";
    objects: {
        lotAllocations: Prisma.$StoreDispatchLotPayload<ExtArgs>[];
        lotMovements: Prisma.$ProductLotMovementPayload<ExtArgs>[];
        dispatch: Prisma.$StoreDispatchPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        warehouseMovement: Prisma.$ProductMovementPayload<ExtArgs> | null;
        storeMovement: Prisma.$StoreMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        dispatchId: string;
        productId: string;
        quantity: runtime.Decimal;
    }, ExtArgs["result"]["storeDispatchLine"]>;
    composites: {};
};
export type StoreDispatchLineGetPayload<S extends boolean | null | undefined | StoreDispatchLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload, S>;
export type StoreDispatchLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StoreDispatchLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StoreDispatchLineCountAggregateInputType | true;
};
export interface StoreDispatchLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StoreDispatchLine'];
        meta: {
            name: 'StoreDispatchLine';
        };
    };
    findUnique<T extends StoreDispatchLineFindUniqueArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StoreDispatchLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StoreDispatchLineFindFirstArgs>(args?: Prisma.SelectSubset<T, StoreDispatchLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StoreDispatchLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StoreDispatchLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StoreDispatchLineFindManyArgs>(args?: Prisma.SelectSubset<T, StoreDispatchLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StoreDispatchLineCreateArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineCreateArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StoreDispatchLineCreateManyArgs>(args?: Prisma.SelectSubset<T, StoreDispatchLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StoreDispatchLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StoreDispatchLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StoreDispatchLineDeleteArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineDeleteArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StoreDispatchLineUpdateArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineUpdateArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StoreDispatchLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, StoreDispatchLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StoreDispatchLineUpdateManyArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StoreDispatchLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StoreDispatchLineUpsertArgs>(args: Prisma.SelectSubset<T, StoreDispatchLineUpsertArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchLineClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StoreDispatchLineCountArgs>(args?: Prisma.Subset<T, StoreDispatchLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StoreDispatchLineCountAggregateOutputType> : number>;
    aggregate<T extends StoreDispatchLineAggregateArgs>(args: Prisma.Subset<T, StoreDispatchLineAggregateArgs>): Prisma.PrismaPromise<GetStoreDispatchLineAggregateType<T>>;
    groupBy<T extends StoreDispatchLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StoreDispatchLineGroupByArgs['orderBy'];
    } : {
        orderBy?: StoreDispatchLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StoreDispatchLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreDispatchLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StoreDispatchLineFieldRefs;
}
export interface Prisma__StoreDispatchLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lotAllocations<T extends Prisma.StoreDispatchLine$lotAllocationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreDispatchLine$lotAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    lotMovements<T extends Prisma.StoreDispatchLine$lotMovementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreDispatchLine$lotMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductLotMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    dispatch<T extends Prisma.StoreDispatchDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreDispatchDefaultArgs<ExtArgs>>): Prisma.Prisma__StoreDispatchClient<runtime.Types.Result.GetResult<Prisma.$StoreDispatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    warehouseMovement<T extends Prisma.StoreDispatchLine$warehouseMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreDispatchLine$warehouseMovementArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    storeMovement<T extends Prisma.StoreDispatchLine$storeMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StoreDispatchLine$storeMovementArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StoreDispatchLineFieldRefs {
    readonly id: Prisma.FieldRef<"StoreDispatchLine", 'String'>;
    readonly dispatchId: Prisma.FieldRef<"StoreDispatchLine", 'String'>;
    readonly productId: Prisma.FieldRef<"StoreDispatchLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"StoreDispatchLine", 'Decimal'>;
}
export type StoreDispatchLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StoreDispatchLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StoreDispatchLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StoreDispatchLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreDispatchLineCreateInput, Prisma.StoreDispatchLineUncheckedCreateInput>;
};
export type StoreDispatchLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StoreDispatchLineCreateManyInput | Prisma.StoreDispatchLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StoreDispatchLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    data: Prisma.StoreDispatchLineCreateManyInput | Prisma.StoreDispatchLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StoreDispatchLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StoreDispatchLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateInput, Prisma.StoreDispatchLineUncheckedUpdateInput>;
    where: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateManyMutationInput, Prisma.StoreDispatchLineUncheckedUpdateManyInput>;
    where?: Prisma.StoreDispatchLineWhereInput;
    limit?: number;
};
export type StoreDispatchLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreDispatchLineUpdateManyMutationInput, Prisma.StoreDispatchLineUncheckedUpdateManyInput>;
    where?: Prisma.StoreDispatchLineWhereInput;
    limit?: number;
    include?: Prisma.StoreDispatchLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StoreDispatchLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreDispatchLineCreateInput, Prisma.StoreDispatchLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StoreDispatchLineUpdateInput, Prisma.StoreDispatchLineUncheckedUpdateInput>;
};
export type StoreDispatchLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where: Prisma.StoreDispatchLineWhereUniqueInput;
};
export type StoreDispatchLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchLineWhereInput;
    limit?: number;
};
export type StoreDispatchLine$lotAllocationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLotSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLotOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLotInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchLotWhereInput;
    orderBy?: Prisma.StoreDispatchLotOrderByWithRelationInput | Prisma.StoreDispatchLotOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchLotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreDispatchLotScalarFieldEnum | Prisma.StoreDispatchLotScalarFieldEnum[];
};
export type StoreDispatchLine$lotMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductLotMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductLotMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductLotMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductLotMovementWhereInput;
    orderBy?: Prisma.ProductLotMovementOrderByWithRelationInput | Prisma.ProductLotMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductLotMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductLotMovementScalarFieldEnum | Prisma.ProductLotMovementScalarFieldEnum[];
};
export type StoreDispatchLine$warehouseMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
};
export type StoreDispatchLine$storeMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where?: Prisma.StoreMovementWhereInput;
};
export type StoreDispatchLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
};
