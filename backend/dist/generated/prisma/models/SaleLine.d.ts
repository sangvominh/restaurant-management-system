import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SaleLineModel = runtime.Types.Result.DefaultSelection<Prisma.$SaleLinePayload>;
export type AggregateSaleLine = {
    _count: SaleLineCountAggregateOutputType | null;
    _avg: SaleLineAvgAggregateOutputType | null;
    _sum: SaleLineSumAggregateOutputType | null;
    _min: SaleLineMinAggregateOutputType | null;
    _max: SaleLineMaxAggregateOutputType | null;
};
export type SaleLineAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    batch: number | null;
};
export type SaleLineSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    batch: number | null;
};
export type SaleLineMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    sentById: string | null;
    note: string | null;
    sentAt: Date | null;
    batch: number | null;
    productName: string | null;
    saleId: string | null;
    productId: string | null;
};
export type SaleLineMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    sentById: string | null;
    note: string | null;
    sentAt: Date | null;
    batch: number | null;
    productName: string | null;
    saleId: string | null;
    productId: string | null;
};
export type SaleLineCountAggregateOutputType = {
    id: number;
    quantity: number;
    unitPrice: number;
    sentById: number;
    note: number;
    sentAt: number;
    batch: number;
    productName: number;
    saleId: number;
    productId: number;
    _all: number;
};
export type SaleLineAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    batch?: true;
};
export type SaleLineSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    batch?: true;
};
export type SaleLineMinAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    sentById?: true;
    note?: true;
    sentAt?: true;
    batch?: true;
    productName?: true;
    saleId?: true;
    productId?: true;
};
export type SaleLineMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    sentById?: true;
    note?: true;
    sentAt?: true;
    batch?: true;
    productName?: true;
    saleId?: true;
    productId?: true;
};
export type SaleLineCountAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    sentById?: true;
    note?: true;
    sentAt?: true;
    batch?: true;
    productName?: true;
    saleId?: true;
    productId?: true;
    _all?: true;
};
export type SaleLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineWhereInput;
    orderBy?: Prisma.SaleLineOrderByWithRelationInput | Prisma.SaleLineOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SaleLineCountAggregateInputType;
    _avg?: SaleLineAvgAggregateInputType;
    _sum?: SaleLineSumAggregateInputType;
    _min?: SaleLineMinAggregateInputType;
    _max?: SaleLineMaxAggregateInputType;
};
export type GetSaleLineAggregateType<T extends SaleLineAggregateArgs> = {
    [P in keyof T & keyof AggregateSaleLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSaleLine[P]> : Prisma.GetScalarType<T[P], AggregateSaleLine[P]>;
};
export type SaleLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineWhereInput;
    orderBy?: Prisma.SaleLineOrderByWithAggregationInput | Prisma.SaleLineOrderByWithAggregationInput[];
    by: Prisma.SaleLineScalarFieldEnum[] | Prisma.SaleLineScalarFieldEnum;
    having?: Prisma.SaleLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SaleLineCountAggregateInputType | true;
    _avg?: SaleLineAvgAggregateInputType;
    _sum?: SaleLineSumAggregateInputType;
    _min?: SaleLineMinAggregateInputType;
    _max?: SaleLineMaxAggregateInputType;
};
export type SaleLineGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    unitPrice: runtime.Decimal;
    sentById: string | null;
    note: string;
    sentAt: Date | null;
    batch: number | null;
    productName: string;
    saleId: string;
    productId: string;
    _count: SaleLineCountAggregateOutputType | null;
    _avg: SaleLineAvgAggregateOutputType | null;
    _sum: SaleLineSumAggregateOutputType | null;
    _min: SaleLineMinAggregateOutputType | null;
    _max: SaleLineMaxAggregateOutputType | null;
};
export type GetSaleLineGroupByPayload<T extends SaleLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SaleLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SaleLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SaleLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SaleLineGroupByOutputType[P]>;
}>>;
export type SaleLineWhereInput = {
    AND?: Prisma.SaleLineWhereInput | Prisma.SaleLineWhereInput[];
    OR?: Prisma.SaleLineWhereInput[];
    NOT?: Prisma.SaleLineWhereInput | Prisma.SaleLineWhereInput[];
    id?: Prisma.UuidFilter<"SaleLine"> | string;
    quantity?: Prisma.DecimalFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.UuidNullableFilter<"SaleLine"> | string | null;
    note?: Prisma.StringFilter<"SaleLine"> | string;
    sentAt?: Prisma.DateTimeNullableFilter<"SaleLine"> | Date | string | null;
    batch?: Prisma.IntNullableFilter<"SaleLine"> | number | null;
    productName?: Prisma.StringFilter<"SaleLine"> | string;
    saleId?: Prisma.UuidFilter<"SaleLine"> | string;
    productId?: Prisma.UuidFilter<"SaleLine"> | string;
    lotMovements?: Prisma.ProductLotMovementListRelationFilter;
    changes?: Prisma.SaleLineChangeListRelationFilter;
    replacementChanges?: Prisma.SaleLineChangeListRelationFilter;
    sentBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    storeMovement?: Prisma.XOR<Prisma.StoreMovementNullableScalarRelationFilter, Prisma.StoreMovementWhereInput> | null;
    servings?: Prisma.ServingListRelationFilter;
    replenishments?: Prisma.ReplenishmentRequestListRelationFilter;
    exportLines?: Prisma.ProductExportLineListRelationFilter;
};
export type SaleLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sentById?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    batch?: Prisma.SortOrderInput | Prisma.SortOrder;
    productName?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    lotMovements?: Prisma.ProductLotMovementOrderByRelationAggregateInput;
    changes?: Prisma.SaleLineChangeOrderByRelationAggregateInput;
    replacementChanges?: Prisma.SaleLineChangeOrderByRelationAggregateInput;
    sentBy?: Prisma.EmployeeOrderByWithRelationInput;
    sale?: Prisma.SaleOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    storeMovement?: Prisma.StoreMovementOrderByWithRelationInput;
    servings?: Prisma.ServingOrderByRelationAggregateInput;
    replenishments?: Prisma.ReplenishmentRequestOrderByRelationAggregateInput;
    exportLines?: Prisma.ProductExportLineOrderByRelationAggregateInput;
};
export type SaleLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SaleLineWhereInput | Prisma.SaleLineWhereInput[];
    OR?: Prisma.SaleLineWhereInput[];
    NOT?: Prisma.SaleLineWhereInput | Prisma.SaleLineWhereInput[];
    quantity?: Prisma.DecimalFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.UuidNullableFilter<"SaleLine"> | string | null;
    note?: Prisma.StringFilter<"SaleLine"> | string;
    sentAt?: Prisma.DateTimeNullableFilter<"SaleLine"> | Date | string | null;
    batch?: Prisma.IntNullableFilter<"SaleLine"> | number | null;
    productName?: Prisma.StringFilter<"SaleLine"> | string;
    saleId?: Prisma.UuidFilter<"SaleLine"> | string;
    productId?: Prisma.UuidFilter<"SaleLine"> | string;
    lotMovements?: Prisma.ProductLotMovementListRelationFilter;
    changes?: Prisma.SaleLineChangeListRelationFilter;
    replacementChanges?: Prisma.SaleLineChangeListRelationFilter;
    sentBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    storeMovement?: Prisma.XOR<Prisma.StoreMovementNullableScalarRelationFilter, Prisma.StoreMovementWhereInput> | null;
    servings?: Prisma.ServingListRelationFilter;
    replenishments?: Prisma.ReplenishmentRequestListRelationFilter;
    exportLines?: Prisma.ProductExportLineListRelationFilter;
}, "id">;
export type SaleLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sentById?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    batch?: Prisma.SortOrderInput | Prisma.SortOrder;
    productName?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    _count?: Prisma.SaleLineCountOrderByAggregateInput;
    _avg?: Prisma.SaleLineAvgOrderByAggregateInput;
    _max?: Prisma.SaleLineMaxOrderByAggregateInput;
    _min?: Prisma.SaleLineMinOrderByAggregateInput;
    _sum?: Prisma.SaleLineSumOrderByAggregateInput;
};
export type SaleLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.SaleLineScalarWhereWithAggregatesInput | Prisma.SaleLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.SaleLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SaleLineScalarWhereWithAggregatesInput | Prisma.SaleLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"SaleLine"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalWithAggregatesFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.UuidNullableWithAggregatesFilter<"SaleLine"> | string | null;
    note?: Prisma.StringWithAggregatesFilter<"SaleLine"> | string;
    sentAt?: Prisma.DateTimeNullableWithAggregatesFilter<"SaleLine"> | Date | string | null;
    batch?: Prisma.IntNullableWithAggregatesFilter<"SaleLine"> | number | null;
    productName?: Prisma.StringWithAggregatesFilter<"SaleLine"> | string;
    saleId?: Prisma.UuidWithAggregatesFilter<"SaleLine"> | string;
    productId?: Prisma.UuidWithAggregatesFilter<"SaleLine"> | string;
};
export type SaleLineCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
};
export type SaleLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineListRelationFilter = {
    every?: Prisma.SaleLineWhereInput;
    some?: Prisma.SaleLineWhereInput;
    none?: Prisma.SaleLineWhereInput;
};
export type SaleLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SaleLineNullableScalarRelationFilter = {
    is?: Prisma.SaleLineWhereInput | null;
    isNot?: Prisma.SaleLineWhereInput | null;
};
export type SaleLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
    productName?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type SaleLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type SaleLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
    productName?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type SaleLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
    productName?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type SaleLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type SaleLineScalarRelationFilter = {
    is?: Prisma.SaleLineWhereInput;
    isNot?: Prisma.SaleLineWhereInput;
};
export type SaleLineCreateNestedManyWithoutSentByInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSentByInput, Prisma.SaleLineUncheckedCreateWithoutSentByInput> | Prisma.SaleLineCreateWithoutSentByInput[] | Prisma.SaleLineUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSentByInput | Prisma.SaleLineCreateOrConnectWithoutSentByInput[];
    createMany?: Prisma.SaleLineCreateManySentByInputEnvelope;
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
};
export type SaleLineUncheckedCreateNestedManyWithoutSentByInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSentByInput, Prisma.SaleLineUncheckedCreateWithoutSentByInput> | Prisma.SaleLineCreateWithoutSentByInput[] | Prisma.SaleLineUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSentByInput | Prisma.SaleLineCreateOrConnectWithoutSentByInput[];
    createMany?: Prisma.SaleLineCreateManySentByInputEnvelope;
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
};
export type SaleLineUpdateManyWithoutSentByNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSentByInput, Prisma.SaleLineUncheckedCreateWithoutSentByInput> | Prisma.SaleLineCreateWithoutSentByInput[] | Prisma.SaleLineUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSentByInput | Prisma.SaleLineCreateOrConnectWithoutSentByInput[];
    upsert?: Prisma.SaleLineUpsertWithWhereUniqueWithoutSentByInput | Prisma.SaleLineUpsertWithWhereUniqueWithoutSentByInput[];
    createMany?: Prisma.SaleLineCreateManySentByInputEnvelope;
    set?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    disconnect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    delete?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    update?: Prisma.SaleLineUpdateWithWhereUniqueWithoutSentByInput | Prisma.SaleLineUpdateWithWhereUniqueWithoutSentByInput[];
    updateMany?: Prisma.SaleLineUpdateManyWithWhereWithoutSentByInput | Prisma.SaleLineUpdateManyWithWhereWithoutSentByInput[];
    deleteMany?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
};
export type SaleLineUncheckedUpdateManyWithoutSentByNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSentByInput, Prisma.SaleLineUncheckedCreateWithoutSentByInput> | Prisma.SaleLineCreateWithoutSentByInput[] | Prisma.SaleLineUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSentByInput | Prisma.SaleLineCreateOrConnectWithoutSentByInput[];
    upsert?: Prisma.SaleLineUpsertWithWhereUniqueWithoutSentByInput | Prisma.SaleLineUpsertWithWhereUniqueWithoutSentByInput[];
    createMany?: Prisma.SaleLineCreateManySentByInputEnvelope;
    set?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    disconnect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    delete?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    update?: Prisma.SaleLineUpdateWithWhereUniqueWithoutSentByInput | Prisma.SaleLineUpdateWithWhereUniqueWithoutSentByInput[];
    updateMany?: Prisma.SaleLineUpdateManyWithWhereWithoutSentByInput | Prisma.SaleLineUpdateManyWithWhereWithoutSentByInput[];
    deleteMany?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
};
export type SaleLineCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutProductInput, Prisma.SaleLineUncheckedCreateWithoutProductInput> | Prisma.SaleLineCreateWithoutProductInput[] | Prisma.SaleLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutProductInput | Prisma.SaleLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.SaleLineCreateManyProductInputEnvelope;
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
};
export type SaleLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutProductInput, Prisma.SaleLineUncheckedCreateWithoutProductInput> | Prisma.SaleLineCreateWithoutProductInput[] | Prisma.SaleLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutProductInput | Prisma.SaleLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.SaleLineCreateManyProductInputEnvelope;
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
};
export type SaleLineUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutProductInput, Prisma.SaleLineUncheckedCreateWithoutProductInput> | Prisma.SaleLineCreateWithoutProductInput[] | Prisma.SaleLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutProductInput | Prisma.SaleLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.SaleLineUpsertWithWhereUniqueWithoutProductInput | Prisma.SaleLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.SaleLineCreateManyProductInputEnvelope;
    set?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    disconnect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    delete?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    update?: Prisma.SaleLineUpdateWithWhereUniqueWithoutProductInput | Prisma.SaleLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.SaleLineUpdateManyWithWhereWithoutProductInput | Prisma.SaleLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
};
export type SaleLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutProductInput, Prisma.SaleLineUncheckedCreateWithoutProductInput> | Prisma.SaleLineCreateWithoutProductInput[] | Prisma.SaleLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutProductInput | Prisma.SaleLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.SaleLineUpsertWithWhereUniqueWithoutProductInput | Prisma.SaleLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.SaleLineCreateManyProductInputEnvelope;
    set?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    disconnect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    delete?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    update?: Prisma.SaleLineUpdateWithWhereUniqueWithoutProductInput | Prisma.SaleLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.SaleLineUpdateManyWithWhereWithoutProductInput | Prisma.SaleLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
};
export type SaleLineCreateNestedOneWithoutLotMovementsInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutLotMovementsInput, Prisma.SaleLineUncheckedCreateWithoutLotMovementsInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutLotMovementsInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineUpdateOneWithoutLotMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutLotMovementsInput, Prisma.SaleLineUncheckedCreateWithoutLotMovementsInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutLotMovementsInput;
    upsert?: Prisma.SaleLineUpsertWithoutLotMovementsInput;
    disconnect?: Prisma.SaleLineWhereInput | boolean;
    delete?: Prisma.SaleLineWhereInput | boolean;
    connect?: Prisma.SaleLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleLineUpdateToOneWithWhereWithoutLotMovementsInput, Prisma.SaleLineUpdateWithoutLotMovementsInput>, Prisma.SaleLineUncheckedUpdateWithoutLotMovementsInput>;
};
export type SaleLineCreateNestedManyWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSaleInput, Prisma.SaleLineUncheckedCreateWithoutSaleInput> | Prisma.SaleLineCreateWithoutSaleInput[] | Prisma.SaleLineUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSaleInput | Prisma.SaleLineCreateOrConnectWithoutSaleInput[];
    createMany?: Prisma.SaleLineCreateManySaleInputEnvelope;
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
};
export type SaleLineUncheckedCreateNestedManyWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSaleInput, Prisma.SaleLineUncheckedCreateWithoutSaleInput> | Prisma.SaleLineCreateWithoutSaleInput[] | Prisma.SaleLineUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSaleInput | Prisma.SaleLineCreateOrConnectWithoutSaleInput[];
    createMany?: Prisma.SaleLineCreateManySaleInputEnvelope;
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
};
export type SaleLineUpdateManyWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSaleInput, Prisma.SaleLineUncheckedCreateWithoutSaleInput> | Prisma.SaleLineCreateWithoutSaleInput[] | Prisma.SaleLineUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSaleInput | Prisma.SaleLineCreateOrConnectWithoutSaleInput[];
    upsert?: Prisma.SaleLineUpsertWithWhereUniqueWithoutSaleInput | Prisma.SaleLineUpsertWithWhereUniqueWithoutSaleInput[];
    createMany?: Prisma.SaleLineCreateManySaleInputEnvelope;
    set?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    disconnect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    delete?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    update?: Prisma.SaleLineUpdateWithWhereUniqueWithoutSaleInput | Prisma.SaleLineUpdateWithWhereUniqueWithoutSaleInput[];
    updateMany?: Prisma.SaleLineUpdateManyWithWhereWithoutSaleInput | Prisma.SaleLineUpdateManyWithWhereWithoutSaleInput[];
    deleteMany?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
};
export type SaleLineUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutSaleInput, Prisma.SaleLineUncheckedCreateWithoutSaleInput> | Prisma.SaleLineCreateWithoutSaleInput[] | Prisma.SaleLineUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutSaleInput | Prisma.SaleLineCreateOrConnectWithoutSaleInput[];
    upsert?: Prisma.SaleLineUpsertWithWhereUniqueWithoutSaleInput | Prisma.SaleLineUpsertWithWhereUniqueWithoutSaleInput[];
    createMany?: Prisma.SaleLineCreateManySaleInputEnvelope;
    set?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    disconnect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    delete?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    connect?: Prisma.SaleLineWhereUniqueInput | Prisma.SaleLineWhereUniqueInput[];
    update?: Prisma.SaleLineUpdateWithWhereUniqueWithoutSaleInput | Prisma.SaleLineUpdateWithWhereUniqueWithoutSaleInput[];
    updateMany?: Prisma.SaleLineUpdateManyWithWhereWithoutSaleInput | Prisma.SaleLineUpdateManyWithWhereWithoutSaleInput[];
    deleteMany?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type SaleLineCreateNestedOneWithoutExportLinesInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutExportLinesInput, Prisma.SaleLineUncheckedCreateWithoutExportLinesInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutExportLinesInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineUpdateOneRequiredWithoutExportLinesNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutExportLinesInput, Prisma.SaleLineUncheckedCreateWithoutExportLinesInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutExportLinesInput;
    upsert?: Prisma.SaleLineUpsertWithoutExportLinesInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleLineUpdateToOneWithWhereWithoutExportLinesInput, Prisma.SaleLineUpdateWithoutExportLinesInput>, Prisma.SaleLineUncheckedUpdateWithoutExportLinesInput>;
};
export type SaleLineCreateNestedOneWithoutServingsInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutServingsInput, Prisma.SaleLineUncheckedCreateWithoutServingsInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutServingsInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineUpdateOneRequiredWithoutServingsNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutServingsInput, Prisma.SaleLineUncheckedCreateWithoutServingsInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutServingsInput;
    upsert?: Prisma.SaleLineUpsertWithoutServingsInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleLineUpdateToOneWithWhereWithoutServingsInput, Prisma.SaleLineUpdateWithoutServingsInput>, Prisma.SaleLineUncheckedUpdateWithoutServingsInput>;
};
export type SaleLineCreateNestedOneWithoutReplenishmentsInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutReplenishmentsInput, Prisma.SaleLineUncheckedCreateWithoutReplenishmentsInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutReplenishmentsInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineUpdateOneRequiredWithoutReplenishmentsNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutReplenishmentsInput, Prisma.SaleLineUncheckedCreateWithoutReplenishmentsInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutReplenishmentsInput;
    upsert?: Prisma.SaleLineUpsertWithoutReplenishmentsInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleLineUpdateToOneWithWhereWithoutReplenishmentsInput, Prisma.SaleLineUpdateWithoutReplenishmentsInput>, Prisma.SaleLineUncheckedUpdateWithoutReplenishmentsInput>;
};
export type SaleLineCreateNestedOneWithoutChangesInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutChangesInput, Prisma.SaleLineUncheckedCreateWithoutChangesInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutChangesInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineCreateNestedOneWithoutReplacementChangesInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutReplacementChangesInput, Prisma.SaleLineUncheckedCreateWithoutReplacementChangesInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutReplacementChangesInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineUpdateOneRequiredWithoutChangesNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutChangesInput, Prisma.SaleLineUncheckedCreateWithoutChangesInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutChangesInput;
    upsert?: Prisma.SaleLineUpsertWithoutChangesInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleLineUpdateToOneWithWhereWithoutChangesInput, Prisma.SaleLineUpdateWithoutChangesInput>, Prisma.SaleLineUncheckedUpdateWithoutChangesInput>;
};
export type SaleLineUpdateOneWithoutReplacementChangesNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutReplacementChangesInput, Prisma.SaleLineUncheckedCreateWithoutReplacementChangesInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutReplacementChangesInput;
    upsert?: Prisma.SaleLineUpsertWithoutReplacementChangesInput;
    disconnect?: Prisma.SaleLineWhereInput | boolean;
    delete?: Prisma.SaleLineWhereInput | boolean;
    connect?: Prisma.SaleLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleLineUpdateToOneWithWhereWithoutReplacementChangesInput, Prisma.SaleLineUpdateWithoutReplacementChangesInput>, Prisma.SaleLineUncheckedUpdateWithoutReplacementChangesInput>;
};
export type SaleLineCreateNestedOneWithoutStoreMovementInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutStoreMovementInput, Prisma.SaleLineUncheckedCreateWithoutStoreMovementInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutStoreMovementInput;
    connect?: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineUpdateOneWithoutStoreMovementNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineCreateWithoutStoreMovementInput, Prisma.SaleLineUncheckedCreateWithoutStoreMovementInput>;
    connectOrCreate?: Prisma.SaleLineCreateOrConnectWithoutStoreMovementInput;
    upsert?: Prisma.SaleLineUpsertWithoutStoreMovementInput;
    disconnect?: Prisma.SaleLineWhereInput | boolean;
    delete?: Prisma.SaleLineWhereInput | boolean;
    connect?: Prisma.SaleLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleLineUpdateToOneWithWhereWithoutStoreMovementInput, Prisma.SaleLineUpdateWithoutStoreMovementInput>, Prisma.SaleLineUncheckedUpdateWithoutStoreMovementInput>;
};
export type SaleLineCreateWithoutSentByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutSentByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutSentByInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutSentByInput, Prisma.SaleLineUncheckedCreateWithoutSentByInput>;
};
export type SaleLineCreateManySentByInputEnvelope = {
    data: Prisma.SaleLineCreateManySentByInput | Prisma.SaleLineCreateManySentByInput[];
    skipDuplicates?: boolean;
};
export type SaleLineUpsertWithWhereUniqueWithoutSentByInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutSentByInput, Prisma.SaleLineUncheckedUpdateWithoutSentByInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutSentByInput, Prisma.SaleLineUncheckedCreateWithoutSentByInput>;
};
export type SaleLineUpdateWithWhereUniqueWithoutSentByInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutSentByInput, Prisma.SaleLineUncheckedUpdateWithoutSentByInput>;
};
export type SaleLineUpdateManyWithWhereWithoutSentByInput = {
    where: Prisma.SaleLineScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateManyMutationInput, Prisma.SaleLineUncheckedUpdateManyWithoutSentByInput>;
};
export type SaleLineScalarWhereInput = {
    AND?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
    OR?: Prisma.SaleLineScalarWhereInput[];
    NOT?: Prisma.SaleLineScalarWhereInput | Prisma.SaleLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"SaleLine"> | string;
    quantity?: Prisma.DecimalFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFilter<"SaleLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.UuidNullableFilter<"SaleLine"> | string | null;
    note?: Prisma.StringFilter<"SaleLine"> | string;
    sentAt?: Prisma.DateTimeNullableFilter<"SaleLine"> | Date | string | null;
    batch?: Prisma.IntNullableFilter<"SaleLine"> | number | null;
    productName?: Prisma.StringFilter<"SaleLine"> | string;
    saleId?: Prisma.UuidFilter<"SaleLine"> | string;
    productId?: Prisma.UuidFilter<"SaleLine"> | string;
};
export type SaleLineCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutProductInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutProductInput, Prisma.SaleLineUncheckedCreateWithoutProductInput>;
};
export type SaleLineCreateManyProductInputEnvelope = {
    data: Prisma.SaleLineCreateManyProductInput | Prisma.SaleLineCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type SaleLineUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutProductInput, Prisma.SaleLineUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutProductInput, Prisma.SaleLineUncheckedCreateWithoutProductInput>;
};
export type SaleLineUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutProductInput, Prisma.SaleLineUncheckedUpdateWithoutProductInput>;
};
export type SaleLineUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.SaleLineScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateManyMutationInput, Prisma.SaleLineUncheckedUpdateManyWithoutProductInput>;
};
export type SaleLineCreateWithoutLotMovementsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutLotMovementsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutLotMovementsInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutLotMovementsInput, Prisma.SaleLineUncheckedCreateWithoutLotMovementsInput>;
};
export type SaleLineUpsertWithoutLotMovementsInput = {
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutLotMovementsInput, Prisma.SaleLineUncheckedUpdateWithoutLotMovementsInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutLotMovementsInput, Prisma.SaleLineUncheckedCreateWithoutLotMovementsInput>;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineUpdateToOneWithWhereWithoutLotMovementsInput = {
    where?: Prisma.SaleLineWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutLotMovementsInput, Prisma.SaleLineUncheckedUpdateWithoutLotMovementsInput>;
};
export type SaleLineUpdateWithoutLotMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutLotMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineCreateWithoutSaleInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutSaleInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutSaleInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutSaleInput, Prisma.SaleLineUncheckedCreateWithoutSaleInput>;
};
export type SaleLineCreateManySaleInputEnvelope = {
    data: Prisma.SaleLineCreateManySaleInput | Prisma.SaleLineCreateManySaleInput[];
    skipDuplicates?: boolean;
};
export type SaleLineUpsertWithWhereUniqueWithoutSaleInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutSaleInput, Prisma.SaleLineUncheckedUpdateWithoutSaleInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutSaleInput, Prisma.SaleLineUncheckedCreateWithoutSaleInput>;
};
export type SaleLineUpdateWithWhereUniqueWithoutSaleInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutSaleInput, Prisma.SaleLineUncheckedUpdateWithoutSaleInput>;
};
export type SaleLineUpdateManyWithWhereWithoutSaleInput = {
    where: Prisma.SaleLineScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateManyMutationInput, Prisma.SaleLineUncheckedUpdateManyWithoutSaleInput>;
};
export type SaleLineCreateWithoutExportLinesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutExportLinesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutExportLinesInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutExportLinesInput, Prisma.SaleLineUncheckedCreateWithoutExportLinesInput>;
};
export type SaleLineUpsertWithoutExportLinesInput = {
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutExportLinesInput, Prisma.SaleLineUncheckedUpdateWithoutExportLinesInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutExportLinesInput, Prisma.SaleLineUncheckedCreateWithoutExportLinesInput>;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineUpdateToOneWithWhereWithoutExportLinesInput = {
    where?: Prisma.SaleLineWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutExportLinesInput, Prisma.SaleLineUncheckedUpdateWithoutExportLinesInput>;
};
export type SaleLineUpdateWithoutExportLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutExportLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineCreateWithoutServingsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutServingsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutServingsInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutServingsInput, Prisma.SaleLineUncheckedCreateWithoutServingsInput>;
};
export type SaleLineUpsertWithoutServingsInput = {
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutServingsInput, Prisma.SaleLineUncheckedUpdateWithoutServingsInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutServingsInput, Prisma.SaleLineUncheckedCreateWithoutServingsInput>;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineUpdateToOneWithWhereWithoutServingsInput = {
    where?: Prisma.SaleLineWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutServingsInput, Prisma.SaleLineUncheckedUpdateWithoutServingsInput>;
};
export type SaleLineUpdateWithoutServingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutServingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineCreateWithoutReplenishmentsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutReplenishmentsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutReplenishmentsInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutReplenishmentsInput, Prisma.SaleLineUncheckedCreateWithoutReplenishmentsInput>;
};
export type SaleLineUpsertWithoutReplenishmentsInput = {
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutReplenishmentsInput, Prisma.SaleLineUncheckedUpdateWithoutReplenishmentsInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutReplenishmentsInput, Prisma.SaleLineUncheckedCreateWithoutReplenishmentsInput>;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineUpdateToOneWithWhereWithoutReplenishmentsInput = {
    where?: Prisma.SaleLineWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutReplenishmentsInput, Prisma.SaleLineUncheckedUpdateWithoutReplenishmentsInput>;
};
export type SaleLineUpdateWithoutReplenishmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutReplenishmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineCreateWithoutChangesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutChangesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutChangesInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutChangesInput, Prisma.SaleLineUncheckedCreateWithoutChangesInput>;
};
export type SaleLineCreateWithoutReplacementChangesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    storeMovement?: Prisma.StoreMovementCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutReplacementChangesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    storeMovement?: Prisma.StoreMovementUncheckedCreateNestedOneWithoutSaleLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutReplacementChangesInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutReplacementChangesInput, Prisma.SaleLineUncheckedCreateWithoutReplacementChangesInput>;
};
export type SaleLineUpsertWithoutChangesInput = {
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutChangesInput, Prisma.SaleLineUncheckedUpdateWithoutChangesInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutChangesInput, Prisma.SaleLineUncheckedCreateWithoutChangesInput>;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineUpdateToOneWithWhereWithoutChangesInput = {
    where?: Prisma.SaleLineWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutChangesInput, Prisma.SaleLineUncheckedUpdateWithoutChangesInput>;
};
export type SaleLineUpdateWithoutChangesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutChangesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUpsertWithoutReplacementChangesInput = {
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutReplacementChangesInput, Prisma.SaleLineUncheckedUpdateWithoutReplacementChangesInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutReplacementChangesInput, Prisma.SaleLineUncheckedCreateWithoutReplacementChangesInput>;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineUpdateToOneWithWhereWithoutReplacementChangesInput = {
    where?: Prisma.SaleLineWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutReplacementChangesInput, Prisma.SaleLineUncheckedUpdateWithoutReplacementChangesInput>;
};
export type SaleLineUpdateWithoutReplacementChangesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutReplacementChangesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineCreateWithoutStoreMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    lotMovements?: Prisma.ProductLotMovementCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeCreateNestedManyWithoutReplacementLineInput;
    sentBy?: Prisma.EmployeeCreateNestedOneWithoutSentLinesInput;
    sale: Prisma.SaleCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutSaleLinesInput;
    servings?: Prisma.ServingCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineUncheckedCreateWithoutStoreMovementInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
    lotMovements?: Prisma.ProductLotMovementUncheckedCreateNestedManyWithoutSaleLineInput;
    changes?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput;
    servings?: Prisma.ServingUncheckedCreateNestedManyWithoutSaleLineInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput;
    exportLines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutSaleLineInput;
};
export type SaleLineCreateOrConnectWithoutStoreMovementInput = {
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutStoreMovementInput, Prisma.SaleLineUncheckedCreateWithoutStoreMovementInput>;
};
export type SaleLineUpsertWithoutStoreMovementInput = {
    update: Prisma.XOR<Prisma.SaleLineUpdateWithoutStoreMovementInput, Prisma.SaleLineUncheckedUpdateWithoutStoreMovementInput>;
    create: Prisma.XOR<Prisma.SaleLineCreateWithoutStoreMovementInput, Prisma.SaleLineUncheckedCreateWithoutStoreMovementInput>;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineUpdateToOneWithWhereWithoutStoreMovementInput = {
    where?: Prisma.SaleLineWhereInput;
    data: Prisma.XOR<Prisma.SaleLineUpdateWithoutStoreMovementInput, Prisma.SaleLineUncheckedUpdateWithoutStoreMovementInput>;
};
export type SaleLineUpdateWithoutStoreMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutStoreMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineCreateManySentByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
    productId: string;
};
export type SaleLineUpdateWithoutSentByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutSentByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateManyWithoutSentByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineCreateManyProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    saleId: string;
};
export type SaleLineUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineCreateManySaleInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: string | null;
    note?: string;
    sentAt?: Date | string | null;
    batch?: number | null;
    productName: string;
    productId: string;
};
export type SaleLineUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUpdateManyWithoutReplacementLineNestedInput;
    sentBy?: Prisma.EmployeeUpdateOneWithoutSentLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSaleLinesNestedInput;
    storeMovement?: Prisma.StoreMovementUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lotMovements?: Prisma.ProductLotMovementUncheckedUpdateManyWithoutSaleLineNestedInput;
    changes?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput;
    replacementChanges?: Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput;
    storeMovement?: Prisma.StoreMovementUncheckedUpdateOneWithoutSaleLineNestedInput;
    servings?: Prisma.ServingUncheckedUpdateManyWithoutSaleLineNestedInput;
    replenishments?: Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput;
    exportLines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutSaleLineNestedInput;
};
export type SaleLineUncheckedUpdateManyWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sentById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    productName?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineCountOutputType = {
    lotMovements: number;
    changes: number;
    replacementChanges: number;
    servings: number;
    replenishments: number;
    exportLines: number;
};
export type SaleLineCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lotMovements?: boolean | SaleLineCountOutputTypeCountLotMovementsArgs;
    changes?: boolean | SaleLineCountOutputTypeCountChangesArgs;
    replacementChanges?: boolean | SaleLineCountOutputTypeCountReplacementChangesArgs;
    servings?: boolean | SaleLineCountOutputTypeCountServingsArgs;
    replenishments?: boolean | SaleLineCountOutputTypeCountReplenishmentsArgs;
    exportLines?: boolean | SaleLineCountOutputTypeCountExportLinesArgs;
};
export type SaleLineCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineCountOutputTypeSelect<ExtArgs> | null;
};
export type SaleLineCountOutputTypeCountLotMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductLotMovementWhereInput;
};
export type SaleLineCountOutputTypeCountChangesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineChangeWhereInput;
};
export type SaleLineCountOutputTypeCountReplacementChangesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineChangeWhereInput;
};
export type SaleLineCountOutputTypeCountServingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServingWhereInput;
};
export type SaleLineCountOutputTypeCountReplenishmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReplenishmentRequestWhereInput;
};
export type SaleLineCountOutputTypeCountExportLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportLineWhereInput;
};
export type SaleLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    sentById?: boolean;
    note?: boolean;
    sentAt?: boolean;
    batch?: boolean;
    productName?: boolean;
    saleId?: boolean;
    productId?: boolean;
    lotMovements?: boolean | Prisma.SaleLine$lotMovementsArgs<ExtArgs>;
    changes?: boolean | Prisma.SaleLine$changesArgs<ExtArgs>;
    replacementChanges?: boolean | Prisma.SaleLine$replacementChangesArgs<ExtArgs>;
    sentBy?: boolean | Prisma.SaleLine$sentByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    storeMovement?: boolean | Prisma.SaleLine$storeMovementArgs<ExtArgs>;
    servings?: boolean | Prisma.SaleLine$servingsArgs<ExtArgs>;
    replenishments?: boolean | Prisma.SaleLine$replenishmentsArgs<ExtArgs>;
    exportLines?: boolean | Prisma.SaleLine$exportLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.SaleLineCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleLine"]>;
export type SaleLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    sentById?: boolean;
    note?: boolean;
    sentAt?: boolean;
    batch?: boolean;
    productName?: boolean;
    saleId?: boolean;
    productId?: boolean;
    sentBy?: boolean | Prisma.SaleLine$sentByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleLine"]>;
export type SaleLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    sentById?: boolean;
    note?: boolean;
    sentAt?: boolean;
    batch?: boolean;
    productName?: boolean;
    saleId?: boolean;
    productId?: boolean;
    sentBy?: boolean | Prisma.SaleLine$sentByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleLine"]>;
export type SaleLineSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    sentById?: boolean;
    note?: boolean;
    sentAt?: boolean;
    batch?: boolean;
    productName?: boolean;
    saleId?: boolean;
    productId?: boolean;
};
export type SaleLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "unitPrice" | "sentById" | "note" | "sentAt" | "batch" | "productName" | "saleId" | "productId", ExtArgs["result"]["saleLine"]>;
export type SaleLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lotMovements?: boolean | Prisma.SaleLine$lotMovementsArgs<ExtArgs>;
    changes?: boolean | Prisma.SaleLine$changesArgs<ExtArgs>;
    replacementChanges?: boolean | Prisma.SaleLine$replacementChangesArgs<ExtArgs>;
    sentBy?: boolean | Prisma.SaleLine$sentByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    storeMovement?: boolean | Prisma.SaleLine$storeMovementArgs<ExtArgs>;
    servings?: boolean | Prisma.SaleLine$servingsArgs<ExtArgs>;
    replenishments?: boolean | Prisma.SaleLine$replenishmentsArgs<ExtArgs>;
    exportLines?: boolean | Prisma.SaleLine$exportLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.SaleLineCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SaleLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sentBy?: boolean | Prisma.SaleLine$sentByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type SaleLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sentBy?: boolean | Prisma.SaleLine$sentByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $SaleLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SaleLine";
    objects: {
        lotMovements: Prisma.$ProductLotMovementPayload<ExtArgs>[];
        changes: Prisma.$SaleLineChangePayload<ExtArgs>[];
        replacementChanges: Prisma.$SaleLineChangePayload<ExtArgs>[];
        sentBy: Prisma.$EmployeePayload<ExtArgs> | null;
        sale: Prisma.$SalePayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        storeMovement: Prisma.$StoreMovementPayload<ExtArgs> | null;
        servings: Prisma.$ServingPayload<ExtArgs>[];
        replenishments: Prisma.$ReplenishmentRequestPayload<ExtArgs>[];
        exportLines: Prisma.$ProductExportLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        unitPrice: runtime.Decimal;
        sentById: string | null;
        note: string;
        sentAt: Date | null;
        batch: number | null;
        productName: string;
        saleId: string;
        productId: string;
    }, ExtArgs["result"]["saleLine"]>;
    composites: {};
};
export type SaleLineGetPayload<S extends boolean | null | undefined | SaleLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SaleLinePayload, S>;
export type SaleLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SaleLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SaleLineCountAggregateInputType | true;
};
export interface SaleLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SaleLine'];
        meta: {
            name: 'SaleLine';
        };
    };
    findUnique<T extends SaleLineFindUniqueArgs>(args: Prisma.SelectSubset<T, SaleLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SaleLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SaleLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SaleLineFindFirstArgs>(args?: Prisma.SelectSubset<T, SaleLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SaleLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SaleLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SaleLineFindManyArgs>(args?: Prisma.SelectSubset<T, SaleLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SaleLineCreateArgs>(args: Prisma.SelectSubset<T, SaleLineCreateArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SaleLineCreateManyArgs>(args?: Prisma.SelectSubset<T, SaleLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SaleLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SaleLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SaleLineDeleteArgs>(args: Prisma.SelectSubset<T, SaleLineDeleteArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SaleLineUpdateArgs>(args: Prisma.SelectSubset<T, SaleLineUpdateArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SaleLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, SaleLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SaleLineUpdateManyArgs>(args: Prisma.SelectSubset<T, SaleLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SaleLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SaleLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SaleLineUpsertArgs>(args: Prisma.SelectSubset<T, SaleLineUpsertArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SaleLineCountArgs>(args?: Prisma.Subset<T, SaleLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SaleLineCountAggregateOutputType> : number>;
    aggregate<T extends SaleLineAggregateArgs>(args: Prisma.Subset<T, SaleLineAggregateArgs>): Prisma.PrismaPromise<GetSaleLineAggregateType<T>>;
    groupBy<T extends SaleLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SaleLineGroupByArgs['orderBy'];
    } : {
        orderBy?: SaleLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SaleLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SaleLineFieldRefs;
}
export interface Prisma__SaleLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lotMovements<T extends Prisma.SaleLine$lotMovementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$lotMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductLotMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    changes<T extends Prisma.SaleLine$changesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$changesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    replacementChanges<T extends Prisma.SaleLine$replacementChangesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$replacementChangesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sentBy<T extends Prisma.SaleLine$sentByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$sentByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    sale<T extends Prisma.SaleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    storeMovement<T extends Prisma.SaleLine$storeMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$storeMovementArgs<ExtArgs>>): Prisma.Prisma__StoreMovementClient<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    servings<T extends Prisma.SaleLine$servingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$servingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    replenishments<T extends Prisma.SaleLine$replenishmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$replenishmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    exportLines<T extends Prisma.SaleLine$exportLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLine$exportLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SaleLineFieldRefs {
    readonly id: Prisma.FieldRef<"SaleLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"SaleLine", 'Decimal'>;
    readonly unitPrice: Prisma.FieldRef<"SaleLine", 'Decimal'>;
    readonly sentById: Prisma.FieldRef<"SaleLine", 'String'>;
    readonly note: Prisma.FieldRef<"SaleLine", 'String'>;
    readonly sentAt: Prisma.FieldRef<"SaleLine", 'DateTime'>;
    readonly batch: Prisma.FieldRef<"SaleLine", 'Int'>;
    readonly productName: Prisma.FieldRef<"SaleLine", 'String'>;
    readonly saleId: Prisma.FieldRef<"SaleLine", 'String'>;
    readonly productId: Prisma.FieldRef<"SaleLine", 'String'>;
}
export type SaleLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where?: Prisma.SaleLineWhereInput;
    orderBy?: Prisma.SaleLineOrderByWithRelationInput | Prisma.SaleLineOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleLineScalarFieldEnum | Prisma.SaleLineScalarFieldEnum[];
};
export type SaleLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where?: Prisma.SaleLineWhereInput;
    orderBy?: Prisma.SaleLineOrderByWithRelationInput | Prisma.SaleLineOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleLineScalarFieldEnum | Prisma.SaleLineScalarFieldEnum[];
};
export type SaleLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where?: Prisma.SaleLineWhereInput;
    orderBy?: Prisma.SaleLineOrderByWithRelationInput | Prisma.SaleLineOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleLineScalarFieldEnum | Prisma.SaleLineScalarFieldEnum[];
};
export type SaleLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleLineCreateInput, Prisma.SaleLineUncheckedCreateInput>;
};
export type SaleLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SaleLineCreateManyInput | Prisma.SaleLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SaleLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    data: Prisma.SaleLineCreateManyInput | Prisma.SaleLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SaleLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SaleLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleLineUpdateInput, Prisma.SaleLineUncheckedUpdateInput>;
    where: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SaleLineUpdateManyMutationInput, Prisma.SaleLineUncheckedUpdateManyInput>;
    where?: Prisma.SaleLineWhereInput;
    limit?: number;
};
export type SaleLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleLineUpdateManyMutationInput, Prisma.SaleLineUncheckedUpdateManyInput>;
    where?: Prisma.SaleLineWhereInput;
    limit?: number;
    include?: Prisma.SaleLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SaleLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where: Prisma.SaleLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineCreateInput, Prisma.SaleLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SaleLineUpdateInput, Prisma.SaleLineUncheckedUpdateInput>;
};
export type SaleLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where: Prisma.SaleLineWhereUniqueInput;
};
export type SaleLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineWhereInput;
    limit?: number;
};
export type SaleLine$lotMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SaleLine$changesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    where?: Prisma.SaleLineChangeWhereInput;
    orderBy?: Prisma.SaleLineChangeOrderByWithRelationInput | Prisma.SaleLineChangeOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleLineChangeScalarFieldEnum | Prisma.SaleLineChangeScalarFieldEnum[];
};
export type SaleLine$replacementChangesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    where?: Prisma.SaleLineChangeWhereInput;
    orderBy?: Prisma.SaleLineChangeOrderByWithRelationInput | Prisma.SaleLineChangeOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleLineChangeScalarFieldEnum | Prisma.SaleLineChangeScalarFieldEnum[];
};
export type SaleLine$sentByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type SaleLine$storeMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where?: Prisma.StoreMovementWhereInput;
};
export type SaleLine$servingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
    where?: Prisma.ServingWhereInput;
    orderBy?: Prisma.ServingOrderByWithRelationInput | Prisma.ServingOrderByWithRelationInput[];
    cursor?: Prisma.ServingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServingScalarFieldEnum | Prisma.ServingScalarFieldEnum[];
};
export type SaleLine$replenishmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
    where?: Prisma.ReplenishmentRequestWhereInput;
    orderBy?: Prisma.ReplenishmentRequestOrderByWithRelationInput | Prisma.ReplenishmentRequestOrderByWithRelationInput[];
    cursor?: Prisma.ReplenishmentRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReplenishmentRequestScalarFieldEnum | Prisma.ReplenishmentRequestScalarFieldEnum[];
};
export type SaleLine$exportLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SaleLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
};
