import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReplenishmentRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$ReplenishmentRequestPayload>;
export type AggregateReplenishmentRequest = {
    _count: ReplenishmentRequestCountAggregateOutputType | null;
    _avg: ReplenishmentRequestAvgAggregateOutputType | null;
    _sum: ReplenishmentRequestSumAggregateOutputType | null;
    _min: ReplenishmentRequestMinAggregateOutputType | null;
    _max: ReplenishmentRequestMaxAggregateOutputType | null;
};
export type ReplenishmentRequestAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ReplenishmentRequestSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ReplenishmentRequestMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    requestedAt: Date | null;
    status: string | null;
    note: string | null;
    saleLineId: string | null;
    requestedById: string | null;
    productionOrderId: string | null;
};
export type ReplenishmentRequestMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    requestedAt: Date | null;
    status: string | null;
    note: string | null;
    saleLineId: string | null;
    requestedById: string | null;
    productionOrderId: string | null;
};
export type ReplenishmentRequestCountAggregateOutputType = {
    id: number;
    quantity: number;
    requestedAt: number;
    status: number;
    note: number;
    saleLineId: number;
    requestedById: number;
    productionOrderId: number;
    _all: number;
};
export type ReplenishmentRequestAvgAggregateInputType = {
    quantity?: true;
};
export type ReplenishmentRequestSumAggregateInputType = {
    quantity?: true;
};
export type ReplenishmentRequestMinAggregateInputType = {
    id?: true;
    quantity?: true;
    requestedAt?: true;
    status?: true;
    note?: true;
    saleLineId?: true;
    requestedById?: true;
    productionOrderId?: true;
};
export type ReplenishmentRequestMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    requestedAt?: true;
    status?: true;
    note?: true;
    saleLineId?: true;
    requestedById?: true;
    productionOrderId?: true;
};
export type ReplenishmentRequestCountAggregateInputType = {
    id?: true;
    quantity?: true;
    requestedAt?: true;
    status?: true;
    note?: true;
    saleLineId?: true;
    requestedById?: true;
    productionOrderId?: true;
    _all?: true;
};
export type ReplenishmentRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReplenishmentRequestWhereInput;
    orderBy?: Prisma.ReplenishmentRequestOrderByWithRelationInput | Prisma.ReplenishmentRequestOrderByWithRelationInput[];
    cursor?: Prisma.ReplenishmentRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReplenishmentRequestCountAggregateInputType;
    _avg?: ReplenishmentRequestAvgAggregateInputType;
    _sum?: ReplenishmentRequestSumAggregateInputType;
    _min?: ReplenishmentRequestMinAggregateInputType;
    _max?: ReplenishmentRequestMaxAggregateInputType;
};
export type GetReplenishmentRequestAggregateType<T extends ReplenishmentRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateReplenishmentRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReplenishmentRequest[P]> : Prisma.GetScalarType<T[P], AggregateReplenishmentRequest[P]>;
};
export type ReplenishmentRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReplenishmentRequestWhereInput;
    orderBy?: Prisma.ReplenishmentRequestOrderByWithAggregationInput | Prisma.ReplenishmentRequestOrderByWithAggregationInput[];
    by: Prisma.ReplenishmentRequestScalarFieldEnum[] | Prisma.ReplenishmentRequestScalarFieldEnum;
    having?: Prisma.ReplenishmentRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReplenishmentRequestCountAggregateInputType | true;
    _avg?: ReplenishmentRequestAvgAggregateInputType;
    _sum?: ReplenishmentRequestSumAggregateInputType;
    _min?: ReplenishmentRequestMinAggregateInputType;
    _max?: ReplenishmentRequestMaxAggregateInputType;
};
export type ReplenishmentRequestGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    requestedAt: Date;
    status: string;
    note: string;
    saleLineId: string;
    requestedById: string;
    productionOrderId: string | null;
    _count: ReplenishmentRequestCountAggregateOutputType | null;
    _avg: ReplenishmentRequestAvgAggregateOutputType | null;
    _sum: ReplenishmentRequestSumAggregateOutputType | null;
    _min: ReplenishmentRequestMinAggregateOutputType | null;
    _max: ReplenishmentRequestMaxAggregateOutputType | null;
};
export type GetReplenishmentRequestGroupByPayload<T extends ReplenishmentRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReplenishmentRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReplenishmentRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReplenishmentRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReplenishmentRequestGroupByOutputType[P]>;
}>>;
export type ReplenishmentRequestWhereInput = {
    AND?: Prisma.ReplenishmentRequestWhereInput | Prisma.ReplenishmentRequestWhereInput[];
    OR?: Prisma.ReplenishmentRequestWhereInput[];
    NOT?: Prisma.ReplenishmentRequestWhereInput | Prisma.ReplenishmentRequestWhereInput[];
    id?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    quantity?: Prisma.DecimalFilter<"ReplenishmentRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFilter<"ReplenishmentRequest"> | Date | string;
    status?: Prisma.StringFilter<"ReplenishmentRequest"> | string;
    note?: Prisma.StringFilter<"ReplenishmentRequest"> | string;
    saleLineId?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    requestedById?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    productionOrderId?: Prisma.UuidNullableFilter<"ReplenishmentRequest"> | string | null;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderNullableScalarRelationFilter, Prisma.ProductionOrderWhereInput> | null;
};
export type ReplenishmentRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    saleLine?: Prisma.SaleLineOrderByWithRelationInput;
    requestedBy?: Prisma.EmployeeOrderByWithRelationInput;
    productionOrder?: Prisma.ProductionOrderOrderByWithRelationInput;
};
export type ReplenishmentRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReplenishmentRequestWhereInput | Prisma.ReplenishmentRequestWhereInput[];
    OR?: Prisma.ReplenishmentRequestWhereInput[];
    NOT?: Prisma.ReplenishmentRequestWhereInput | Prisma.ReplenishmentRequestWhereInput[];
    quantity?: Prisma.DecimalFilter<"ReplenishmentRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFilter<"ReplenishmentRequest"> | Date | string;
    status?: Prisma.StringFilter<"ReplenishmentRequest"> | string;
    note?: Prisma.StringFilter<"ReplenishmentRequest"> | string;
    saleLineId?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    requestedById?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    productionOrderId?: Prisma.UuidNullableFilter<"ReplenishmentRequest"> | string | null;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderNullableScalarRelationFilter, Prisma.ProductionOrderWhereInput> | null;
}, "id">;
export type ReplenishmentRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ReplenishmentRequestCountOrderByAggregateInput;
    _avg?: Prisma.ReplenishmentRequestAvgOrderByAggregateInput;
    _max?: Prisma.ReplenishmentRequestMaxOrderByAggregateInput;
    _min?: Prisma.ReplenishmentRequestMinOrderByAggregateInput;
    _sum?: Prisma.ReplenishmentRequestSumOrderByAggregateInput;
};
export type ReplenishmentRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReplenishmentRequestScalarWhereWithAggregatesInput | Prisma.ReplenishmentRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReplenishmentRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReplenishmentRequestScalarWhereWithAggregatesInput | Prisma.ReplenishmentRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ReplenishmentRequest"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"ReplenishmentRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"ReplenishmentRequest"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"ReplenishmentRequest"> | string;
    note?: Prisma.StringWithAggregatesFilter<"ReplenishmentRequest"> | string;
    saleLineId?: Prisma.UuidWithAggregatesFilter<"ReplenishmentRequest"> | string;
    requestedById?: Prisma.UuidWithAggregatesFilter<"ReplenishmentRequest"> | string;
    productionOrderId?: Prisma.UuidNullableWithAggregatesFilter<"ReplenishmentRequest"> | string | null;
};
export type ReplenishmentRequestCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutReplenishmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutReplenishmentsInput;
    productionOrder?: Prisma.ProductionOrderCreateNestedOneWithoutReplenishmentsInput;
};
export type ReplenishmentRequestUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLineId: string;
    requestedById: string;
    productionOrderId?: string | null;
};
export type ReplenishmentRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutReplenishmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutReplenishmentsNestedInput;
    productionOrder?: Prisma.ProductionOrderUpdateOneWithoutReplenishmentsNestedInput;
};
export type ReplenishmentRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    productionOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReplenishmentRequestCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLineId: string;
    requestedById: string;
    productionOrderId?: string | null;
};
export type ReplenishmentRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReplenishmentRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    productionOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReplenishmentRequestListRelationFilter = {
    every?: Prisma.ReplenishmentRequestWhereInput;
    some?: Prisma.ReplenishmentRequestWhereInput;
    none?: Prisma.ReplenishmentRequestWhereInput;
};
export type ReplenishmentRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReplenishmentRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
};
export type ReplenishmentRequestAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ReplenishmentRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
};
export type ReplenishmentRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
};
export type ReplenishmentRequestSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ReplenishmentRequestCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput> | Prisma.ReplenishmentRequestCreateWithoutRequestedByInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyRequestedByInputEnvelope;
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
};
export type ReplenishmentRequestUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput> | Prisma.ReplenishmentRequestCreateWithoutRequestedByInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyRequestedByInputEnvelope;
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
};
export type ReplenishmentRequestUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput> | Prisma.ReplenishmentRequestCreateWithoutRequestedByInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyRequestedByInputEnvelope;
    set?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    disconnect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    delete?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    update?: Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutRequestedByInput | Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
};
export type ReplenishmentRequestUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput> | Prisma.ReplenishmentRequestCreateWithoutRequestedByInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyRequestedByInputEnvelope;
    set?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    disconnect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    delete?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    update?: Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutRequestedByInput | Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
};
export type ReplenishmentRequestCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput> | Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
};
export type ReplenishmentRequestUncheckedCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput> | Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
};
export type ReplenishmentRequestUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput> | Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyProductionOrderInputEnvelope;
    set?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    disconnect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    delete?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    update?: Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutProductionOrderInput | Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
};
export type ReplenishmentRequestUncheckedUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput> | Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManyProductionOrderInputEnvelope;
    set?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    disconnect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    delete?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    update?: Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutProductionOrderInput | Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
};
export type ReplenishmentRequestCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput> | Prisma.ReplenishmentRequestCreateWithoutSaleLineInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManySaleLineInputEnvelope;
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
};
export type ReplenishmentRequestUncheckedCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput> | Prisma.ReplenishmentRequestCreateWithoutSaleLineInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManySaleLineInputEnvelope;
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
};
export type ReplenishmentRequestUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput> | Prisma.ReplenishmentRequestCreateWithoutSaleLineInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManySaleLineInputEnvelope;
    set?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    disconnect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    delete?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    update?: Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutSaleLineInput | Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
};
export type ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput> | Prisma.ReplenishmentRequestCreateWithoutSaleLineInput[] | Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput | Prisma.ReplenishmentRequestCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.ReplenishmentRequestUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.ReplenishmentRequestCreateManySaleLineInputEnvelope;
    set?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    disconnect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    delete?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    connect?: Prisma.ReplenishmentRequestWhereUniqueInput | Prisma.ReplenishmentRequestWhereUniqueInput[];
    update?: Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.ReplenishmentRequestUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutSaleLineInput | Prisma.ReplenishmentRequestUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
};
export type ReplenishmentRequestCreateWithoutRequestedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutReplenishmentsInput;
    productionOrder?: Prisma.ProductionOrderCreateNestedOneWithoutReplenishmentsInput;
};
export type ReplenishmentRequestUncheckedCreateWithoutRequestedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLineId: string;
    productionOrderId?: string | null;
};
export type ReplenishmentRequestCreateOrConnectWithoutRequestedByInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput>;
};
export type ReplenishmentRequestCreateManyRequestedByInputEnvelope = {
    data: Prisma.ReplenishmentRequestCreateManyRequestedByInput | Prisma.ReplenishmentRequestCreateManyRequestedByInput[];
    skipDuplicates?: boolean;
};
export type ReplenishmentRequestUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReplenishmentRequestUpdateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedUpdateWithoutRequestedByInput>;
    create: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutRequestedByInput>;
};
export type ReplenishmentRequestUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateWithoutRequestedByInput, Prisma.ReplenishmentRequestUncheckedUpdateWithoutRequestedByInput>;
};
export type ReplenishmentRequestUpdateManyWithWhereWithoutRequestedByInput = {
    where: Prisma.ReplenishmentRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateManyMutationInput, Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutRequestedByInput>;
};
export type ReplenishmentRequestScalarWhereInput = {
    AND?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
    OR?: Prisma.ReplenishmentRequestScalarWhereInput[];
    NOT?: Prisma.ReplenishmentRequestScalarWhereInput | Prisma.ReplenishmentRequestScalarWhereInput[];
    id?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    quantity?: Prisma.DecimalFilter<"ReplenishmentRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFilter<"ReplenishmentRequest"> | Date | string;
    status?: Prisma.StringFilter<"ReplenishmentRequest"> | string;
    note?: Prisma.StringFilter<"ReplenishmentRequest"> | string;
    saleLineId?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    requestedById?: Prisma.UuidFilter<"ReplenishmentRequest"> | string;
    productionOrderId?: Prisma.UuidNullableFilter<"ReplenishmentRequest"> | string | null;
};
export type ReplenishmentRequestCreateWithoutProductionOrderInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutReplenishmentsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutReplenishmentsInput;
};
export type ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLineId: string;
    requestedById: string;
};
export type ReplenishmentRequestCreateOrConnectWithoutProductionOrderInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput>;
};
export type ReplenishmentRequestCreateManyProductionOrderInputEnvelope = {
    data: Prisma.ReplenishmentRequestCreateManyProductionOrderInput | Prisma.ReplenishmentRequestCreateManyProductionOrderInput[];
    skipDuplicates?: boolean;
};
export type ReplenishmentRequestUpsertWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReplenishmentRequestUpdateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedUpdateWithoutProductionOrderInput>;
    create: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutProductionOrderInput>;
};
export type ReplenishmentRequestUpdateWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateWithoutProductionOrderInput, Prisma.ReplenishmentRequestUncheckedUpdateWithoutProductionOrderInput>;
};
export type ReplenishmentRequestUpdateManyWithWhereWithoutProductionOrderInput = {
    where: Prisma.ReplenishmentRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateManyMutationInput, Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutProductionOrderInput>;
};
export type ReplenishmentRequestCreateWithoutSaleLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutReplenishmentsInput;
    productionOrder?: Prisma.ProductionOrderCreateNestedOneWithoutReplenishmentsInput;
};
export type ReplenishmentRequestUncheckedCreateWithoutSaleLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    requestedById: string;
    productionOrderId?: string | null;
};
export type ReplenishmentRequestCreateOrConnectWithoutSaleLineInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput>;
};
export type ReplenishmentRequestCreateManySaleLineInputEnvelope = {
    data: Prisma.ReplenishmentRequestCreateManySaleLineInput | Prisma.ReplenishmentRequestCreateManySaleLineInput[];
    skipDuplicates?: boolean;
};
export type ReplenishmentRequestUpsertWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReplenishmentRequestUpdateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedUpdateWithoutSaleLineInput>;
    create: Prisma.XOR<Prisma.ReplenishmentRequestCreateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedCreateWithoutSaleLineInput>;
};
export type ReplenishmentRequestUpdateWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateWithoutSaleLineInput, Prisma.ReplenishmentRequestUncheckedUpdateWithoutSaleLineInput>;
};
export type ReplenishmentRequestUpdateManyWithWhereWithoutSaleLineInput = {
    where: Prisma.ReplenishmentRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateManyMutationInput, Prisma.ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineInput>;
};
export type ReplenishmentRequestCreateManyRequestedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLineId: string;
    productionOrderId?: string | null;
};
export type ReplenishmentRequestUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutReplenishmentsNestedInput;
    productionOrder?: Prisma.ProductionOrderUpdateOneWithoutReplenishmentsNestedInput;
};
export type ReplenishmentRequestUncheckedUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    productionOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReplenishmentRequestUncheckedUpdateManyWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    productionOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReplenishmentRequestCreateManyProductionOrderInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    saleLineId: string;
    requestedById: string;
};
export type ReplenishmentRequestUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutReplenishmentsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutReplenishmentsNestedInput;
};
export type ReplenishmentRequestUncheckedUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReplenishmentRequestUncheckedUpdateManyWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReplenishmentRequestCreateManySaleLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Date | string;
    status?: string;
    note?: string;
    requestedById: string;
    productionOrderId?: string | null;
};
export type ReplenishmentRequestUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutReplenishmentsNestedInput;
    productionOrder?: Prisma.ProductionOrderUpdateOneWithoutReplenishmentsNestedInput;
};
export type ReplenishmentRequestUncheckedUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    productionOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReplenishmentRequestUncheckedUpdateManyWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    productionOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReplenishmentRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    requestedAt?: boolean;
    status?: boolean;
    note?: boolean;
    saleLineId?: boolean;
    requestedById?: boolean;
    productionOrderId?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    productionOrder?: boolean | Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs>;
}, ExtArgs["result"]["replenishmentRequest"]>;
export type ReplenishmentRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    requestedAt?: boolean;
    status?: boolean;
    note?: boolean;
    saleLineId?: boolean;
    requestedById?: boolean;
    productionOrderId?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    productionOrder?: boolean | Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs>;
}, ExtArgs["result"]["replenishmentRequest"]>;
export type ReplenishmentRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    requestedAt?: boolean;
    status?: boolean;
    note?: boolean;
    saleLineId?: boolean;
    requestedById?: boolean;
    productionOrderId?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    productionOrder?: boolean | Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs>;
}, ExtArgs["result"]["replenishmentRequest"]>;
export type ReplenishmentRequestSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    requestedAt?: boolean;
    status?: boolean;
    note?: boolean;
    saleLineId?: boolean;
    requestedById?: boolean;
    productionOrderId?: boolean;
};
export type ReplenishmentRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "requestedAt" | "status" | "note" | "saleLineId" | "requestedById" | "productionOrderId", ExtArgs["result"]["replenishmentRequest"]>;
export type ReplenishmentRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    productionOrder?: boolean | Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs>;
};
export type ReplenishmentRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    productionOrder?: boolean | Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs>;
};
export type ReplenishmentRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    productionOrder?: boolean | Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs>;
};
export type $ReplenishmentRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReplenishmentRequest";
    objects: {
        saleLine: Prisma.$SaleLinePayload<ExtArgs>;
        requestedBy: Prisma.$EmployeePayload<ExtArgs>;
        productionOrder: Prisma.$ProductionOrderPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        requestedAt: Date;
        status: string;
        note: string;
        saleLineId: string;
        requestedById: string;
        productionOrderId: string | null;
    }, ExtArgs["result"]["replenishmentRequest"]>;
    composites: {};
};
export type ReplenishmentRequestGetPayload<S extends boolean | null | undefined | ReplenishmentRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload, S>;
export type ReplenishmentRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReplenishmentRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReplenishmentRequestCountAggregateInputType | true;
};
export interface ReplenishmentRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReplenishmentRequest'];
        meta: {
            name: 'ReplenishmentRequest';
        };
    };
    findUnique<T extends ReplenishmentRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReplenishmentRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReplenishmentRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, ReplenishmentRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReplenishmentRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReplenishmentRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReplenishmentRequestFindManyArgs>(args?: Prisma.SelectSubset<T, ReplenishmentRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReplenishmentRequestCreateArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestCreateArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReplenishmentRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, ReplenishmentRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReplenishmentRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReplenishmentRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReplenishmentRequestDeleteArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReplenishmentRequestUpdateArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReplenishmentRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReplenishmentRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReplenishmentRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReplenishmentRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReplenishmentRequestUpsertArgs>(args: Prisma.SelectSubset<T, ReplenishmentRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__ReplenishmentRequestClient<runtime.Types.Result.GetResult<Prisma.$ReplenishmentRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReplenishmentRequestCountArgs>(args?: Prisma.Subset<T, ReplenishmentRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReplenishmentRequestCountAggregateOutputType> : number>;
    aggregate<T extends ReplenishmentRequestAggregateArgs>(args: Prisma.Subset<T, ReplenishmentRequestAggregateArgs>): Prisma.PrismaPromise<GetReplenishmentRequestAggregateType<T>>;
    groupBy<T extends ReplenishmentRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReplenishmentRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: ReplenishmentRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReplenishmentRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReplenishmentRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReplenishmentRequestFieldRefs;
}
export interface Prisma__ReplenishmentRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    saleLine<T extends Prisma.SaleLineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLineDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requestedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    productionOrder<T extends Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ReplenishmentRequest$productionOrderArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReplenishmentRequestFieldRefs {
    readonly id: Prisma.FieldRef<"ReplenishmentRequest", 'String'>;
    readonly quantity: Prisma.FieldRef<"ReplenishmentRequest", 'Decimal'>;
    readonly requestedAt: Prisma.FieldRef<"ReplenishmentRequest", 'DateTime'>;
    readonly status: Prisma.FieldRef<"ReplenishmentRequest", 'String'>;
    readonly note: Prisma.FieldRef<"ReplenishmentRequest", 'String'>;
    readonly saleLineId: Prisma.FieldRef<"ReplenishmentRequest", 'String'>;
    readonly requestedById: Prisma.FieldRef<"ReplenishmentRequest", 'String'>;
    readonly productionOrderId: Prisma.FieldRef<"ReplenishmentRequest", 'String'>;
}
export type ReplenishmentRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
};
export type ReplenishmentRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
};
export type ReplenishmentRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReplenishmentRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReplenishmentRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReplenishmentRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReplenishmentRequestCreateInput, Prisma.ReplenishmentRequestUncheckedCreateInput>;
};
export type ReplenishmentRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReplenishmentRequestCreateManyInput | Prisma.ReplenishmentRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReplenishmentRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    data: Prisma.ReplenishmentRequestCreateManyInput | Prisma.ReplenishmentRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReplenishmentRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReplenishmentRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateInput, Prisma.ReplenishmentRequestUncheckedUpdateInput>;
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
};
export type ReplenishmentRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateManyMutationInput, Prisma.ReplenishmentRequestUncheckedUpdateManyInput>;
    where?: Prisma.ReplenishmentRequestWhereInput;
    limit?: number;
};
export type ReplenishmentRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReplenishmentRequestUpdateManyMutationInput, Prisma.ReplenishmentRequestUncheckedUpdateManyInput>;
    where?: Prisma.ReplenishmentRequestWhereInput;
    limit?: number;
    include?: Prisma.ReplenishmentRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReplenishmentRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReplenishmentRequestCreateInput, Prisma.ReplenishmentRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReplenishmentRequestUpdateInput, Prisma.ReplenishmentRequestUncheckedUpdateInput>;
};
export type ReplenishmentRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
    where: Prisma.ReplenishmentRequestWhereUniqueInput;
};
export type ReplenishmentRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReplenishmentRequestWhereInput;
    limit?: number;
};
export type ReplenishmentRequest$productionOrderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    where?: Prisma.ProductionOrderWhereInput;
};
export type ReplenishmentRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReplenishmentRequestSelect<ExtArgs> | null;
    omit?: Prisma.ReplenishmentRequestOmit<ExtArgs> | null;
    include?: Prisma.ReplenishmentRequestInclude<ExtArgs> | null;
};
