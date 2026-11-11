import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductExportLineModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductExportLinePayload>;
export type AggregateProductExportLine = {
    _count: ProductExportLineCountAggregateOutputType | null;
    _avg: ProductExportLineAvgAggregateOutputType | null;
    _sum: ProductExportLineSumAggregateOutputType | null;
    _min: ProductExportLineMinAggregateOutputType | null;
    _max: ProductExportLineMaxAggregateOutputType | null;
};
export type ProductExportLineAvgAggregateOutputType = {
    requestedQuantity: runtime.Decimal | null;
    exportedQuantity: runtime.Decimal | null;
};
export type ProductExportLineSumAggregateOutputType = {
    requestedQuantity: runtime.Decimal | null;
    exportedQuantity: runtime.Decimal | null;
};
export type ProductExportLineMinAggregateOutputType = {
    id: string | null;
    requestedQuantity: runtime.Decimal | null;
    exportedQuantity: runtime.Decimal | null;
    exportId: string | null;
    saleLineId: string | null;
};
export type ProductExportLineMaxAggregateOutputType = {
    id: string | null;
    requestedQuantity: runtime.Decimal | null;
    exportedQuantity: runtime.Decimal | null;
    exportId: string | null;
    saleLineId: string | null;
};
export type ProductExportLineCountAggregateOutputType = {
    id: number;
    requestedQuantity: number;
    exportedQuantity: number;
    exportId: number;
    saleLineId: number;
    _all: number;
};
export type ProductExportLineAvgAggregateInputType = {
    requestedQuantity?: true;
    exportedQuantity?: true;
};
export type ProductExportLineSumAggregateInputType = {
    requestedQuantity?: true;
    exportedQuantity?: true;
};
export type ProductExportLineMinAggregateInputType = {
    id?: true;
    requestedQuantity?: true;
    exportedQuantity?: true;
    exportId?: true;
    saleLineId?: true;
};
export type ProductExportLineMaxAggregateInputType = {
    id?: true;
    requestedQuantity?: true;
    exportedQuantity?: true;
    exportId?: true;
    saleLineId?: true;
};
export type ProductExportLineCountAggregateInputType = {
    id?: true;
    requestedQuantity?: true;
    exportedQuantity?: true;
    exportId?: true;
    saleLineId?: true;
    _all?: true;
};
export type ProductExportLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportLineWhereInput;
    orderBy?: Prisma.ProductExportLineOrderByWithRelationInput | Prisma.ProductExportLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductExportLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductExportLineCountAggregateInputType;
    _avg?: ProductExportLineAvgAggregateInputType;
    _sum?: ProductExportLineSumAggregateInputType;
    _min?: ProductExportLineMinAggregateInputType;
    _max?: ProductExportLineMaxAggregateInputType;
};
export type GetProductExportLineAggregateType<T extends ProductExportLineAggregateArgs> = {
    [P in keyof T & keyof AggregateProductExportLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductExportLine[P]> : Prisma.GetScalarType<T[P], AggregateProductExportLine[P]>;
};
export type ProductExportLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportLineWhereInput;
    orderBy?: Prisma.ProductExportLineOrderByWithAggregationInput | Prisma.ProductExportLineOrderByWithAggregationInput[];
    by: Prisma.ProductExportLineScalarFieldEnum[] | Prisma.ProductExportLineScalarFieldEnum;
    having?: Prisma.ProductExportLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductExportLineCountAggregateInputType | true;
    _avg?: ProductExportLineAvgAggregateInputType;
    _sum?: ProductExportLineSumAggregateInputType;
    _min?: ProductExportLineMinAggregateInputType;
    _max?: ProductExportLineMaxAggregateInputType;
};
export type ProductExportLineGroupByOutputType = {
    id: string;
    requestedQuantity: runtime.Decimal;
    exportedQuantity: runtime.Decimal | null;
    exportId: string;
    saleLineId: string;
    _count: ProductExportLineCountAggregateOutputType | null;
    _avg: ProductExportLineAvgAggregateOutputType | null;
    _sum: ProductExportLineSumAggregateOutputType | null;
    _min: ProductExportLineMinAggregateOutputType | null;
    _max: ProductExportLineMaxAggregateOutputType | null;
};
export type GetProductExportLineGroupByPayload<T extends ProductExportLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductExportLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductExportLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductExportLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductExportLineGroupByOutputType[P]>;
}>>;
export type ProductExportLineWhereInput = {
    AND?: Prisma.ProductExportLineWhereInput | Prisma.ProductExportLineWhereInput[];
    OR?: Prisma.ProductExportLineWhereInput[];
    NOT?: Prisma.ProductExportLineWhereInput | Prisma.ProductExportLineWhereInput[];
    id?: Prisma.UuidFilter<"ProductExportLine"> | string;
    requestedQuantity?: Prisma.DecimalFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.DecimalNullableFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.UuidFilter<"ProductExportLine"> | string;
    saleLineId?: Prisma.UuidFilter<"ProductExportLine"> | string;
    export?: Prisma.XOR<Prisma.ProductExportScalarRelationFilter, Prisma.ProductExportWhereInput>;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    productMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
};
export type ProductExportLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    exportedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    export?: Prisma.ProductExportOrderByWithRelationInput;
    saleLine?: Prisma.SaleLineOrderByWithRelationInput;
    productMovement?: Prisma.ProductMovementOrderByWithRelationInput;
};
export type ProductExportLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductExportLineWhereInput | Prisma.ProductExportLineWhereInput[];
    OR?: Prisma.ProductExportLineWhereInput[];
    NOT?: Prisma.ProductExportLineWhereInput | Prisma.ProductExportLineWhereInput[];
    requestedQuantity?: Prisma.DecimalFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.DecimalNullableFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.UuidFilter<"ProductExportLine"> | string;
    saleLineId?: Prisma.UuidFilter<"ProductExportLine"> | string;
    export?: Prisma.XOR<Prisma.ProductExportScalarRelationFilter, Prisma.ProductExportWhereInput>;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    productMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
}, "id">;
export type ProductExportLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    exportedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    _count?: Prisma.ProductExportLineCountOrderByAggregateInput;
    _avg?: Prisma.ProductExportLineAvgOrderByAggregateInput;
    _max?: Prisma.ProductExportLineMaxOrderByAggregateInput;
    _min?: Prisma.ProductExportLineMinOrderByAggregateInput;
    _sum?: Prisma.ProductExportLineSumOrderByAggregateInput;
};
export type ProductExportLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductExportLineScalarWhereWithAggregatesInput | Prisma.ProductExportLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductExportLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductExportLineScalarWhereWithAggregatesInput | Prisma.ProductExportLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductExportLine"> | string;
    requestedQuantity?: Prisma.DecimalWithAggregatesFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.DecimalNullableWithAggregatesFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.UuidWithAggregatesFilter<"ProductExportLine"> | string;
    saleLineId?: Prisma.UuidWithAggregatesFilter<"ProductExportLine"> | string;
};
export type ProductExportLineCreateInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    export: Prisma.ProductExportCreateNestedOneWithoutLinesInput;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutExportLinesInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutExportLineInput;
};
export type ProductExportLineUncheckedCreateInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId: string;
    saleLineId: string;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutExportLineInput;
};
export type ProductExportLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    export?: Prisma.ProductExportUpdateOneRequiredWithoutLinesNestedInput;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutExportLinesNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutExportLineNestedInput;
};
export type ProductExportLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutExportLineNestedInput;
};
export type ProductExportLineCreateManyInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId: string;
    saleLineId: string;
};
export type ProductExportLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type ProductExportLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductExportLineListRelationFilter = {
    every?: Prisma.ProductExportLineWhereInput;
    some?: Prisma.ProductExportLineWhereInput;
    none?: Prisma.ProductExportLineWhereInput;
};
export type ProductExportLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductExportLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    exportedQuantity?: Prisma.SortOrder;
    exportId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
};
export type ProductExportLineAvgOrderByAggregateInput = {
    requestedQuantity?: Prisma.SortOrder;
    exportedQuantity?: Prisma.SortOrder;
};
export type ProductExportLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    exportedQuantity?: Prisma.SortOrder;
    exportId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
};
export type ProductExportLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedQuantity?: Prisma.SortOrder;
    exportedQuantity?: Prisma.SortOrder;
    exportId?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
};
export type ProductExportLineSumOrderByAggregateInput = {
    requestedQuantity?: Prisma.SortOrder;
    exportedQuantity?: Prisma.SortOrder;
};
export type ProductExportLineNullableScalarRelationFilter = {
    is?: Prisma.ProductExportLineWhereInput | null;
    isNot?: Prisma.ProductExportLineWhereInput | null;
};
export type ProductExportLineCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput> | Prisma.ProductExportLineCreateWithoutSaleLineInput[] | Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput | Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.ProductExportLineCreateManySaleLineInputEnvelope;
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
};
export type ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput> | Prisma.ProductExportLineCreateWithoutSaleLineInput[] | Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput | Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.ProductExportLineCreateManySaleLineInputEnvelope;
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
};
export type ProductExportLineUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput> | Prisma.ProductExportLineCreateWithoutSaleLineInput[] | Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput | Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.ProductExportLineUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.ProductExportLineUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.ProductExportLineCreateManySaleLineInputEnvelope;
    set?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    disconnect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    delete?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    update?: Prisma.ProductExportLineUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.ProductExportLineUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.ProductExportLineUpdateManyWithWhereWithoutSaleLineInput | Prisma.ProductExportLineUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.ProductExportLineScalarWhereInput | Prisma.ProductExportLineScalarWhereInput[];
};
export type ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput> | Prisma.ProductExportLineCreateWithoutSaleLineInput[] | Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput | Prisma.ProductExportLineCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.ProductExportLineUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.ProductExportLineUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.ProductExportLineCreateManySaleLineInputEnvelope;
    set?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    disconnect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    delete?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    update?: Prisma.ProductExportLineUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.ProductExportLineUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.ProductExportLineUpdateManyWithWhereWithoutSaleLineInput | Prisma.ProductExportLineUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.ProductExportLineScalarWhereInput | Prisma.ProductExportLineScalarWhereInput[];
};
export type ProductExportLineCreateNestedManyWithoutExportInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutExportInput, Prisma.ProductExportLineUncheckedCreateWithoutExportInput> | Prisma.ProductExportLineCreateWithoutExportInput[] | Prisma.ProductExportLineUncheckedCreateWithoutExportInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutExportInput | Prisma.ProductExportLineCreateOrConnectWithoutExportInput[];
    createMany?: Prisma.ProductExportLineCreateManyExportInputEnvelope;
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
};
export type ProductExportLineUncheckedCreateNestedManyWithoutExportInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutExportInput, Prisma.ProductExportLineUncheckedCreateWithoutExportInput> | Prisma.ProductExportLineCreateWithoutExportInput[] | Prisma.ProductExportLineUncheckedCreateWithoutExportInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutExportInput | Prisma.ProductExportLineCreateOrConnectWithoutExportInput[];
    createMany?: Prisma.ProductExportLineCreateManyExportInputEnvelope;
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
};
export type ProductExportLineUpdateManyWithoutExportNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutExportInput, Prisma.ProductExportLineUncheckedCreateWithoutExportInput> | Prisma.ProductExportLineCreateWithoutExportInput[] | Prisma.ProductExportLineUncheckedCreateWithoutExportInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutExportInput | Prisma.ProductExportLineCreateOrConnectWithoutExportInput[];
    upsert?: Prisma.ProductExportLineUpsertWithWhereUniqueWithoutExportInput | Prisma.ProductExportLineUpsertWithWhereUniqueWithoutExportInput[];
    createMany?: Prisma.ProductExportLineCreateManyExportInputEnvelope;
    set?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    disconnect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    delete?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    update?: Prisma.ProductExportLineUpdateWithWhereUniqueWithoutExportInput | Prisma.ProductExportLineUpdateWithWhereUniqueWithoutExportInput[];
    updateMany?: Prisma.ProductExportLineUpdateManyWithWhereWithoutExportInput | Prisma.ProductExportLineUpdateManyWithWhereWithoutExportInput[];
    deleteMany?: Prisma.ProductExportLineScalarWhereInput | Prisma.ProductExportLineScalarWhereInput[];
};
export type ProductExportLineUncheckedUpdateManyWithoutExportNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutExportInput, Prisma.ProductExportLineUncheckedCreateWithoutExportInput> | Prisma.ProductExportLineCreateWithoutExportInput[] | Prisma.ProductExportLineUncheckedCreateWithoutExportInput[];
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutExportInput | Prisma.ProductExportLineCreateOrConnectWithoutExportInput[];
    upsert?: Prisma.ProductExportLineUpsertWithWhereUniqueWithoutExportInput | Prisma.ProductExportLineUpsertWithWhereUniqueWithoutExportInput[];
    createMany?: Prisma.ProductExportLineCreateManyExportInputEnvelope;
    set?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    disconnect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    delete?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    connect?: Prisma.ProductExportLineWhereUniqueInput | Prisma.ProductExportLineWhereUniqueInput[];
    update?: Prisma.ProductExportLineUpdateWithWhereUniqueWithoutExportInput | Prisma.ProductExportLineUpdateWithWhereUniqueWithoutExportInput[];
    updateMany?: Prisma.ProductExportLineUpdateManyWithWhereWithoutExportInput | Prisma.ProductExportLineUpdateManyWithWhereWithoutExportInput[];
    deleteMany?: Prisma.ProductExportLineScalarWhereInput | Prisma.ProductExportLineScalarWhereInput[];
};
export type ProductExportLineCreateNestedOneWithoutProductMovementInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutProductMovementInput, Prisma.ProductExportLineUncheckedCreateWithoutProductMovementInput>;
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutProductMovementInput;
    connect?: Prisma.ProductExportLineWhereUniqueInput;
};
export type ProductExportLineUpdateOneWithoutProductMovementNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportLineCreateWithoutProductMovementInput, Prisma.ProductExportLineUncheckedCreateWithoutProductMovementInput>;
    connectOrCreate?: Prisma.ProductExportLineCreateOrConnectWithoutProductMovementInput;
    upsert?: Prisma.ProductExportLineUpsertWithoutProductMovementInput;
    disconnect?: Prisma.ProductExportLineWhereInput | boolean;
    delete?: Prisma.ProductExportLineWhereInput | boolean;
    connect?: Prisma.ProductExportLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductExportLineUpdateToOneWithWhereWithoutProductMovementInput, Prisma.ProductExportLineUpdateWithoutProductMovementInput>, Prisma.ProductExportLineUncheckedUpdateWithoutProductMovementInput>;
};
export type ProductExportLineCreateWithoutSaleLineInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    export: Prisma.ProductExportCreateNestedOneWithoutLinesInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutExportLineInput;
};
export type ProductExportLineUncheckedCreateWithoutSaleLineInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId: string;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutExportLineInput;
};
export type ProductExportLineCreateOrConnectWithoutSaleLineInput = {
    where: Prisma.ProductExportLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportLineCreateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput>;
};
export type ProductExportLineCreateManySaleLineInputEnvelope = {
    data: Prisma.ProductExportLineCreateManySaleLineInput | Prisma.ProductExportLineCreateManySaleLineInput[];
    skipDuplicates?: boolean;
};
export type ProductExportLineUpsertWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.ProductExportLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductExportLineUpdateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedUpdateWithoutSaleLineInput>;
    create: Prisma.XOR<Prisma.ProductExportLineCreateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedCreateWithoutSaleLineInput>;
};
export type ProductExportLineUpdateWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.ProductExportLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductExportLineUpdateWithoutSaleLineInput, Prisma.ProductExportLineUncheckedUpdateWithoutSaleLineInput>;
};
export type ProductExportLineUpdateManyWithWhereWithoutSaleLineInput = {
    where: Prisma.ProductExportLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductExportLineUpdateManyMutationInput, Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineInput>;
};
export type ProductExportLineScalarWhereInput = {
    AND?: Prisma.ProductExportLineScalarWhereInput | Prisma.ProductExportLineScalarWhereInput[];
    OR?: Prisma.ProductExportLineScalarWhereInput[];
    NOT?: Prisma.ProductExportLineScalarWhereInput | Prisma.ProductExportLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductExportLine"> | string;
    requestedQuantity?: Prisma.DecimalFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.DecimalNullableFilter<"ProductExportLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.UuidFilter<"ProductExportLine"> | string;
    saleLineId?: Prisma.UuidFilter<"ProductExportLine"> | string;
};
export type ProductExportLineCreateWithoutExportInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutExportLinesInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutExportLineInput;
};
export type ProductExportLineUncheckedCreateWithoutExportInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    saleLineId: string;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutExportLineInput;
};
export type ProductExportLineCreateOrConnectWithoutExportInput = {
    where: Prisma.ProductExportLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportLineCreateWithoutExportInput, Prisma.ProductExportLineUncheckedCreateWithoutExportInput>;
};
export type ProductExportLineCreateManyExportInputEnvelope = {
    data: Prisma.ProductExportLineCreateManyExportInput | Prisma.ProductExportLineCreateManyExportInput[];
    skipDuplicates?: boolean;
};
export type ProductExportLineUpsertWithWhereUniqueWithoutExportInput = {
    where: Prisma.ProductExportLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductExportLineUpdateWithoutExportInput, Prisma.ProductExportLineUncheckedUpdateWithoutExportInput>;
    create: Prisma.XOR<Prisma.ProductExportLineCreateWithoutExportInput, Prisma.ProductExportLineUncheckedCreateWithoutExportInput>;
};
export type ProductExportLineUpdateWithWhereUniqueWithoutExportInput = {
    where: Prisma.ProductExportLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductExportLineUpdateWithoutExportInput, Prisma.ProductExportLineUncheckedUpdateWithoutExportInput>;
};
export type ProductExportLineUpdateManyWithWhereWithoutExportInput = {
    where: Prisma.ProductExportLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductExportLineUpdateManyMutationInput, Prisma.ProductExportLineUncheckedUpdateManyWithoutExportInput>;
};
export type ProductExportLineCreateWithoutProductMovementInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    export: Prisma.ProductExportCreateNestedOneWithoutLinesInput;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutExportLinesInput;
};
export type ProductExportLineUncheckedCreateWithoutProductMovementInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId: string;
    saleLineId: string;
};
export type ProductExportLineCreateOrConnectWithoutProductMovementInput = {
    where: Prisma.ProductExportLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportLineCreateWithoutProductMovementInput, Prisma.ProductExportLineUncheckedCreateWithoutProductMovementInput>;
};
export type ProductExportLineUpsertWithoutProductMovementInput = {
    update: Prisma.XOR<Prisma.ProductExportLineUpdateWithoutProductMovementInput, Prisma.ProductExportLineUncheckedUpdateWithoutProductMovementInput>;
    create: Prisma.XOR<Prisma.ProductExportLineCreateWithoutProductMovementInput, Prisma.ProductExportLineUncheckedCreateWithoutProductMovementInput>;
    where?: Prisma.ProductExportLineWhereInput;
};
export type ProductExportLineUpdateToOneWithWhereWithoutProductMovementInput = {
    where?: Prisma.ProductExportLineWhereInput;
    data: Prisma.XOR<Prisma.ProductExportLineUpdateWithoutProductMovementInput, Prisma.ProductExportLineUncheckedUpdateWithoutProductMovementInput>;
};
export type ProductExportLineUpdateWithoutProductMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    export?: Prisma.ProductExportUpdateOneRequiredWithoutLinesNestedInput;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutExportLinesNestedInput;
};
export type ProductExportLineUncheckedUpdateWithoutProductMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductExportLineCreateManySaleLineInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId: string;
};
export type ProductExportLineUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    export?: Prisma.ProductExportUpdateOneRequiredWithoutLinesNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutExportLineNestedInput;
};
export type ProductExportLineUncheckedUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.StringFieldUpdateOperationsInput | string;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutExportLineNestedInput;
};
export type ProductExportLineUncheckedUpdateManyWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    exportId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductExportLineCreateManyExportInput = {
    id?: string;
    requestedQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    saleLineId: string;
};
export type ProductExportLineUpdateWithoutExportInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutExportLinesNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutExportLineNestedInput;
};
export type ProductExportLineUncheckedUpdateWithoutExportInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutExportLineNestedInput;
};
export type ProductExportLineUncheckedUpdateManyWithoutExportInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    exportedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductExportLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedQuantity?: boolean;
    exportedQuantity?: boolean;
    exportId?: boolean;
    saleLineId?: boolean;
    export?: boolean | Prisma.ProductExportDefaultArgs<ExtArgs>;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    productMovement?: boolean | Prisma.ProductExportLine$productMovementArgs<ExtArgs>;
}, ExtArgs["result"]["productExportLine"]>;
export type ProductExportLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedQuantity?: boolean;
    exportedQuantity?: boolean;
    exportId?: boolean;
    saleLineId?: boolean;
    export?: boolean | Prisma.ProductExportDefaultArgs<ExtArgs>;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productExportLine"]>;
export type ProductExportLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedQuantity?: boolean;
    exportedQuantity?: boolean;
    exportId?: boolean;
    saleLineId?: boolean;
    export?: boolean | Prisma.ProductExportDefaultArgs<ExtArgs>;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productExportLine"]>;
export type ProductExportLineSelectScalar = {
    id?: boolean;
    requestedQuantity?: boolean;
    exportedQuantity?: boolean;
    exportId?: boolean;
    saleLineId?: boolean;
};
export type ProductExportLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestedQuantity" | "exportedQuantity" | "exportId" | "saleLineId", ExtArgs["result"]["productExportLine"]>;
export type ProductExportLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    export?: boolean | Prisma.ProductExportDefaultArgs<ExtArgs>;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    productMovement?: boolean | Prisma.ProductExportLine$productMovementArgs<ExtArgs>;
};
export type ProductExportLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    export?: boolean | Prisma.ProductExportDefaultArgs<ExtArgs>;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
};
export type ProductExportLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    export?: boolean | Prisma.ProductExportDefaultArgs<ExtArgs>;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
};
export type $ProductExportLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductExportLine";
    objects: {
        export: Prisma.$ProductExportPayload<ExtArgs>;
        saleLine: Prisma.$SaleLinePayload<ExtArgs>;
        productMovement: Prisma.$ProductMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requestedQuantity: runtime.Decimal;
        exportedQuantity: runtime.Decimal | null;
        exportId: string;
        saleLineId: string;
    }, ExtArgs["result"]["productExportLine"]>;
    composites: {};
};
export type ProductExportLineGetPayload<S extends boolean | null | undefined | ProductExportLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload, S>;
export type ProductExportLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductExportLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductExportLineCountAggregateInputType | true;
};
export interface ProductExportLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductExportLine'];
        meta: {
            name: 'ProductExportLine';
        };
    };
    findUnique<T extends ProductExportLineFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductExportLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductExportLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductExportLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductExportLineFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductExportLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductExportLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductExportLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductExportLineFindManyArgs>(args?: Prisma.SelectSubset<T, ProductExportLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductExportLineCreateArgs>(args: Prisma.SelectSubset<T, ProductExportLineCreateArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductExportLineCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductExportLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductExportLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductExportLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductExportLineDeleteArgs>(args: Prisma.SelectSubset<T, ProductExportLineDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductExportLineUpdateArgs>(args: Prisma.SelectSubset<T, ProductExportLineUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductExportLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductExportLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductExportLineUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductExportLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductExportLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductExportLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductExportLineUpsertArgs>(args: Prisma.SelectSubset<T, ProductExportLineUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductExportLineCountArgs>(args?: Prisma.Subset<T, ProductExportLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductExportLineCountAggregateOutputType> : number>;
    aggregate<T extends ProductExportLineAggregateArgs>(args: Prisma.Subset<T, ProductExportLineAggregateArgs>): Prisma.PrismaPromise<GetProductExportLineAggregateType<T>>;
    groupBy<T extends ProductExportLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductExportLineGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductExportLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductExportLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductExportLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductExportLineFieldRefs;
}
export interface Prisma__ProductExportLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    export<T extends Prisma.ProductExportDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductExportDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    saleLine<T extends Prisma.SaleLineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLineDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    productMovement<T extends Prisma.ProductExportLine$productMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductExportLine$productMovementArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductExportLineFieldRefs {
    readonly id: Prisma.FieldRef<"ProductExportLine", 'String'>;
    readonly requestedQuantity: Prisma.FieldRef<"ProductExportLine", 'Decimal'>;
    readonly exportedQuantity: Prisma.FieldRef<"ProductExportLine", 'Decimal'>;
    readonly exportId: Prisma.FieldRef<"ProductExportLine", 'String'>;
    readonly saleLineId: Prisma.FieldRef<"ProductExportLine", 'String'>;
}
export type ProductExportLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where: Prisma.ProductExportLineWhereUniqueInput;
};
export type ProductExportLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where: Prisma.ProductExportLineWhereUniqueInput;
};
export type ProductExportLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where?: Prisma.ProductExportLineWhereInput;
    orderBy?: Prisma.ProductExportLineOrderByWithRelationInput | Prisma.ProductExportLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductExportLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductExportLineScalarFieldEnum | Prisma.ProductExportLineScalarFieldEnum[];
};
export type ProductExportLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where?: Prisma.ProductExportLineWhereInput;
    orderBy?: Prisma.ProductExportLineOrderByWithRelationInput | Prisma.ProductExportLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductExportLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductExportLineScalarFieldEnum | Prisma.ProductExportLineScalarFieldEnum[];
};
export type ProductExportLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where?: Prisma.ProductExportLineWhereInput;
    orderBy?: Prisma.ProductExportLineOrderByWithRelationInput | Prisma.ProductExportLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductExportLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductExportLineScalarFieldEnum | Prisma.ProductExportLineScalarFieldEnum[];
};
export type ProductExportLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductExportLineCreateInput, Prisma.ProductExportLineUncheckedCreateInput>;
};
export type ProductExportLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductExportLineCreateManyInput | Prisma.ProductExportLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductExportLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    data: Prisma.ProductExportLineCreateManyInput | Prisma.ProductExportLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductExportLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductExportLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductExportLineUpdateInput, Prisma.ProductExportLineUncheckedUpdateInput>;
    where: Prisma.ProductExportLineWhereUniqueInput;
};
export type ProductExportLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductExportLineUpdateManyMutationInput, Prisma.ProductExportLineUncheckedUpdateManyInput>;
    where?: Prisma.ProductExportLineWhereInput;
    limit?: number;
};
export type ProductExportLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductExportLineUpdateManyMutationInput, Prisma.ProductExportLineUncheckedUpdateManyInput>;
    where?: Prisma.ProductExportLineWhereInput;
    limit?: number;
    include?: Prisma.ProductExportLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductExportLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where: Prisma.ProductExportLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportLineCreateInput, Prisma.ProductExportLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductExportLineUpdateInput, Prisma.ProductExportLineUncheckedUpdateInput>;
};
export type ProductExportLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where: Prisma.ProductExportLineWhereUniqueInput;
};
export type ProductExportLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportLineWhereInput;
    limit?: number;
};
export type ProductExportLine$productMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductExportLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
};
