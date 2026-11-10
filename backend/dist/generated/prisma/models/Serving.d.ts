import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ServingModel = runtime.Types.Result.DefaultSelection<Prisma.$ServingPayload>;
export type AggregateServing = {
    _count: ServingCountAggregateOutputType | null;
    _avg: ServingAvgAggregateOutputType | null;
    _sum: ServingSumAggregateOutputType | null;
    _min: ServingMinAggregateOutputType | null;
    _max: ServingMaxAggregateOutputType | null;
};
export type ServingAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ServingSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ServingMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    servedAt: Date | null;
    saleLineId: string | null;
    servedById: string | null;
};
export type ServingMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    servedAt: Date | null;
    saleLineId: string | null;
    servedById: string | null;
};
export type ServingCountAggregateOutputType = {
    id: number;
    quantity: number;
    servedAt: number;
    saleLineId: number;
    servedById: number;
    _all: number;
};
export type ServingAvgAggregateInputType = {
    quantity?: true;
};
export type ServingSumAggregateInputType = {
    quantity?: true;
};
export type ServingMinAggregateInputType = {
    id?: true;
    quantity?: true;
    servedAt?: true;
    saleLineId?: true;
    servedById?: true;
};
export type ServingMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    servedAt?: true;
    saleLineId?: true;
    servedById?: true;
};
export type ServingCountAggregateInputType = {
    id?: true;
    quantity?: true;
    servedAt?: true;
    saleLineId?: true;
    servedById?: true;
    _all?: true;
};
export type ServingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServingWhereInput;
    orderBy?: Prisma.ServingOrderByWithRelationInput | Prisma.ServingOrderByWithRelationInput[];
    cursor?: Prisma.ServingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ServingCountAggregateInputType;
    _avg?: ServingAvgAggregateInputType;
    _sum?: ServingSumAggregateInputType;
    _min?: ServingMinAggregateInputType;
    _max?: ServingMaxAggregateInputType;
};
export type GetServingAggregateType<T extends ServingAggregateArgs> = {
    [P in keyof T & keyof AggregateServing]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateServing[P]> : Prisma.GetScalarType<T[P], AggregateServing[P]>;
};
export type ServingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServingWhereInput;
    orderBy?: Prisma.ServingOrderByWithAggregationInput | Prisma.ServingOrderByWithAggregationInput[];
    by: Prisma.ServingScalarFieldEnum[] | Prisma.ServingScalarFieldEnum;
    having?: Prisma.ServingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ServingCountAggregateInputType | true;
    _avg?: ServingAvgAggregateInputType;
    _sum?: ServingSumAggregateInputType;
    _min?: ServingMinAggregateInputType;
    _max?: ServingMaxAggregateInputType;
};
export type ServingGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    servedAt: Date;
    saleLineId: string;
    servedById: string;
    _count: ServingCountAggregateOutputType | null;
    _avg: ServingAvgAggregateOutputType | null;
    _sum: ServingSumAggregateOutputType | null;
    _min: ServingMinAggregateOutputType | null;
    _max: ServingMaxAggregateOutputType | null;
};
export type GetServingGroupByPayload<T extends ServingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ServingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ServingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ServingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ServingGroupByOutputType[P]>;
}>>;
export type ServingWhereInput = {
    AND?: Prisma.ServingWhereInput | Prisma.ServingWhereInput[];
    OR?: Prisma.ServingWhereInput[];
    NOT?: Prisma.ServingWhereInput | Prisma.ServingWhereInput[];
    id?: Prisma.UuidFilter<"Serving"> | string;
    quantity?: Prisma.DecimalFilter<"Serving"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFilter<"Serving"> | Date | string;
    saleLineId?: Prisma.UuidFilter<"Serving"> | string;
    servedById?: Prisma.UuidFilter<"Serving"> | string;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    servedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
};
export type ServingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    servedById?: Prisma.SortOrder;
    saleLine?: Prisma.SaleLineOrderByWithRelationInput;
    servedBy?: Prisma.EmployeeOrderByWithRelationInput;
};
export type ServingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ServingWhereInput | Prisma.ServingWhereInput[];
    OR?: Prisma.ServingWhereInput[];
    NOT?: Prisma.ServingWhereInput | Prisma.ServingWhereInput[];
    quantity?: Prisma.DecimalFilter<"Serving"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFilter<"Serving"> | Date | string;
    saleLineId?: Prisma.UuidFilter<"Serving"> | string;
    servedById?: Prisma.UuidFilter<"Serving"> | string;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    servedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
}, "id">;
export type ServingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    servedById?: Prisma.SortOrder;
    _count?: Prisma.ServingCountOrderByAggregateInput;
    _avg?: Prisma.ServingAvgOrderByAggregateInput;
    _max?: Prisma.ServingMaxOrderByAggregateInput;
    _min?: Prisma.ServingMinOrderByAggregateInput;
    _sum?: Prisma.ServingSumOrderByAggregateInput;
};
export type ServingScalarWhereWithAggregatesInput = {
    AND?: Prisma.ServingScalarWhereWithAggregatesInput | Prisma.ServingScalarWhereWithAggregatesInput[];
    OR?: Prisma.ServingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ServingScalarWhereWithAggregatesInput | Prisma.ServingScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Serving"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"Serving"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeWithAggregatesFilter<"Serving"> | Date | string;
    saleLineId?: Prisma.UuidWithAggregatesFilter<"Serving"> | string;
    servedById?: Prisma.UuidWithAggregatesFilter<"Serving"> | string;
};
export type ServingCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutServingsInput;
    servedBy: Prisma.EmployeeCreateNestedOneWithoutServingsInput;
};
export type ServingUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    saleLineId: string;
    servedById: string;
};
export type ServingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutServingsNestedInput;
    servedBy?: Prisma.EmployeeUpdateOneRequiredWithoutServingsNestedInput;
};
export type ServingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    servedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ServingCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    saleLineId: string;
    servedById: string;
};
export type ServingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    servedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ServingListRelationFilter = {
    every?: Prisma.ServingWhereInput;
    some?: Prisma.ServingWhereInput;
    none?: Prisma.ServingWhereInput;
};
export type ServingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ServingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    servedById?: Prisma.SortOrder;
};
export type ServingAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ServingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    servedById?: Prisma.SortOrder;
};
export type ServingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    servedById?: Prisma.SortOrder;
};
export type ServingSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ServingCreateNestedManyWithoutServedByInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutServedByInput, Prisma.ServingUncheckedCreateWithoutServedByInput> | Prisma.ServingCreateWithoutServedByInput[] | Prisma.ServingUncheckedCreateWithoutServedByInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutServedByInput | Prisma.ServingCreateOrConnectWithoutServedByInput[];
    createMany?: Prisma.ServingCreateManyServedByInputEnvelope;
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
};
export type ServingUncheckedCreateNestedManyWithoutServedByInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutServedByInput, Prisma.ServingUncheckedCreateWithoutServedByInput> | Prisma.ServingCreateWithoutServedByInput[] | Prisma.ServingUncheckedCreateWithoutServedByInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutServedByInput | Prisma.ServingCreateOrConnectWithoutServedByInput[];
    createMany?: Prisma.ServingCreateManyServedByInputEnvelope;
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
};
export type ServingUpdateManyWithoutServedByNestedInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutServedByInput, Prisma.ServingUncheckedCreateWithoutServedByInput> | Prisma.ServingCreateWithoutServedByInput[] | Prisma.ServingUncheckedCreateWithoutServedByInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutServedByInput | Prisma.ServingCreateOrConnectWithoutServedByInput[];
    upsert?: Prisma.ServingUpsertWithWhereUniqueWithoutServedByInput | Prisma.ServingUpsertWithWhereUniqueWithoutServedByInput[];
    createMany?: Prisma.ServingCreateManyServedByInputEnvelope;
    set?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    disconnect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    delete?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    update?: Prisma.ServingUpdateWithWhereUniqueWithoutServedByInput | Prisma.ServingUpdateWithWhereUniqueWithoutServedByInput[];
    updateMany?: Prisma.ServingUpdateManyWithWhereWithoutServedByInput | Prisma.ServingUpdateManyWithWhereWithoutServedByInput[];
    deleteMany?: Prisma.ServingScalarWhereInput | Prisma.ServingScalarWhereInput[];
};
export type ServingUncheckedUpdateManyWithoutServedByNestedInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutServedByInput, Prisma.ServingUncheckedCreateWithoutServedByInput> | Prisma.ServingCreateWithoutServedByInput[] | Prisma.ServingUncheckedCreateWithoutServedByInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutServedByInput | Prisma.ServingCreateOrConnectWithoutServedByInput[];
    upsert?: Prisma.ServingUpsertWithWhereUniqueWithoutServedByInput | Prisma.ServingUpsertWithWhereUniqueWithoutServedByInput[];
    createMany?: Prisma.ServingCreateManyServedByInputEnvelope;
    set?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    disconnect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    delete?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    update?: Prisma.ServingUpdateWithWhereUniqueWithoutServedByInput | Prisma.ServingUpdateWithWhereUniqueWithoutServedByInput[];
    updateMany?: Prisma.ServingUpdateManyWithWhereWithoutServedByInput | Prisma.ServingUpdateManyWithWhereWithoutServedByInput[];
    deleteMany?: Prisma.ServingScalarWhereInput | Prisma.ServingScalarWhereInput[];
};
export type ServingCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutSaleLineInput, Prisma.ServingUncheckedCreateWithoutSaleLineInput> | Prisma.ServingCreateWithoutSaleLineInput[] | Prisma.ServingUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutSaleLineInput | Prisma.ServingCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.ServingCreateManySaleLineInputEnvelope;
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
};
export type ServingUncheckedCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutSaleLineInput, Prisma.ServingUncheckedCreateWithoutSaleLineInput> | Prisma.ServingCreateWithoutSaleLineInput[] | Prisma.ServingUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutSaleLineInput | Prisma.ServingCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.ServingCreateManySaleLineInputEnvelope;
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
};
export type ServingUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutSaleLineInput, Prisma.ServingUncheckedCreateWithoutSaleLineInput> | Prisma.ServingCreateWithoutSaleLineInput[] | Prisma.ServingUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutSaleLineInput | Prisma.ServingCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.ServingUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.ServingUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.ServingCreateManySaleLineInputEnvelope;
    set?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    disconnect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    delete?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    update?: Prisma.ServingUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.ServingUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.ServingUpdateManyWithWhereWithoutSaleLineInput | Prisma.ServingUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.ServingScalarWhereInput | Prisma.ServingScalarWhereInput[];
};
export type ServingUncheckedUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.ServingCreateWithoutSaleLineInput, Prisma.ServingUncheckedCreateWithoutSaleLineInput> | Prisma.ServingCreateWithoutSaleLineInput[] | Prisma.ServingUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.ServingCreateOrConnectWithoutSaleLineInput | Prisma.ServingCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.ServingUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.ServingUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.ServingCreateManySaleLineInputEnvelope;
    set?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    disconnect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    delete?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    connect?: Prisma.ServingWhereUniqueInput | Prisma.ServingWhereUniqueInput[];
    update?: Prisma.ServingUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.ServingUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.ServingUpdateManyWithWhereWithoutSaleLineInput | Prisma.ServingUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.ServingScalarWhereInput | Prisma.ServingScalarWhereInput[];
};
export type ServingCreateWithoutServedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutServingsInput;
};
export type ServingUncheckedCreateWithoutServedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    saleLineId: string;
};
export type ServingCreateOrConnectWithoutServedByInput = {
    where: Prisma.ServingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServingCreateWithoutServedByInput, Prisma.ServingUncheckedCreateWithoutServedByInput>;
};
export type ServingCreateManyServedByInputEnvelope = {
    data: Prisma.ServingCreateManyServedByInput | Prisma.ServingCreateManyServedByInput[];
    skipDuplicates?: boolean;
};
export type ServingUpsertWithWhereUniqueWithoutServedByInput = {
    where: Prisma.ServingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ServingUpdateWithoutServedByInput, Prisma.ServingUncheckedUpdateWithoutServedByInput>;
    create: Prisma.XOR<Prisma.ServingCreateWithoutServedByInput, Prisma.ServingUncheckedCreateWithoutServedByInput>;
};
export type ServingUpdateWithWhereUniqueWithoutServedByInput = {
    where: Prisma.ServingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ServingUpdateWithoutServedByInput, Prisma.ServingUncheckedUpdateWithoutServedByInput>;
};
export type ServingUpdateManyWithWhereWithoutServedByInput = {
    where: Prisma.ServingScalarWhereInput;
    data: Prisma.XOR<Prisma.ServingUpdateManyMutationInput, Prisma.ServingUncheckedUpdateManyWithoutServedByInput>;
};
export type ServingScalarWhereInput = {
    AND?: Prisma.ServingScalarWhereInput | Prisma.ServingScalarWhereInput[];
    OR?: Prisma.ServingScalarWhereInput[];
    NOT?: Prisma.ServingScalarWhereInput | Prisma.ServingScalarWhereInput[];
    id?: Prisma.UuidFilter<"Serving"> | string;
    quantity?: Prisma.DecimalFilter<"Serving"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFilter<"Serving"> | Date | string;
    saleLineId?: Prisma.UuidFilter<"Serving"> | string;
    servedById?: Prisma.UuidFilter<"Serving"> | string;
};
export type ServingCreateWithoutSaleLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    servedBy: Prisma.EmployeeCreateNestedOneWithoutServingsInput;
};
export type ServingUncheckedCreateWithoutSaleLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    servedById: string;
};
export type ServingCreateOrConnectWithoutSaleLineInput = {
    where: Prisma.ServingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServingCreateWithoutSaleLineInput, Prisma.ServingUncheckedCreateWithoutSaleLineInput>;
};
export type ServingCreateManySaleLineInputEnvelope = {
    data: Prisma.ServingCreateManySaleLineInput | Prisma.ServingCreateManySaleLineInput[];
    skipDuplicates?: boolean;
};
export type ServingUpsertWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.ServingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ServingUpdateWithoutSaleLineInput, Prisma.ServingUncheckedUpdateWithoutSaleLineInput>;
    create: Prisma.XOR<Prisma.ServingCreateWithoutSaleLineInput, Prisma.ServingUncheckedCreateWithoutSaleLineInput>;
};
export type ServingUpdateWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.ServingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ServingUpdateWithoutSaleLineInput, Prisma.ServingUncheckedUpdateWithoutSaleLineInput>;
};
export type ServingUpdateManyWithWhereWithoutSaleLineInput = {
    where: Prisma.ServingScalarWhereInput;
    data: Prisma.XOR<Prisma.ServingUpdateManyMutationInput, Prisma.ServingUncheckedUpdateManyWithoutSaleLineInput>;
};
export type ServingCreateManyServedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    saleLineId: string;
};
export type ServingUpdateWithoutServedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutServingsNestedInput;
};
export type ServingUncheckedUpdateWithoutServedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ServingUncheckedUpdateManyWithoutServedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ServingCreateManySaleLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Date | string;
    servedById: string;
};
export type ServingUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    servedBy?: Prisma.EmployeeUpdateOneRequiredWithoutServingsNestedInput;
};
export type ServingUncheckedUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    servedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ServingUncheckedUpdateManyWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    servedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ServingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    servedAt?: boolean;
    saleLineId?: boolean;
    servedById?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    servedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["serving"]>;
export type ServingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    servedAt?: boolean;
    saleLineId?: boolean;
    servedById?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    servedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["serving"]>;
export type ServingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    servedAt?: boolean;
    saleLineId?: boolean;
    servedById?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    servedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["serving"]>;
export type ServingSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    servedAt?: boolean;
    saleLineId?: boolean;
    servedById?: boolean;
};
export type ServingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "servedAt" | "saleLineId" | "servedById", ExtArgs["result"]["serving"]>;
export type ServingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    servedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type ServingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    servedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type ServingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    servedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $ServingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Serving";
    objects: {
        saleLine: Prisma.$SaleLinePayload<ExtArgs>;
        servedBy: Prisma.$EmployeePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        servedAt: Date;
        saleLineId: string;
        servedById: string;
    }, ExtArgs["result"]["serving"]>;
    composites: {};
};
export type ServingGetPayload<S extends boolean | null | undefined | ServingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ServingPayload, S>;
export type ServingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ServingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ServingCountAggregateInputType | true;
};
export interface ServingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Serving'];
        meta: {
            name: 'Serving';
        };
    };
    findUnique<T extends ServingFindUniqueArgs>(args: Prisma.SelectSubset<T, ServingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ServingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ServingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ServingFindFirstArgs>(args?: Prisma.SelectSubset<T, ServingFindFirstArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ServingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ServingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ServingFindManyArgs>(args?: Prisma.SelectSubset<T, ServingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ServingCreateArgs>(args: Prisma.SelectSubset<T, ServingCreateArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ServingCreateManyArgs>(args?: Prisma.SelectSubset<T, ServingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ServingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ServingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ServingDeleteArgs>(args: Prisma.SelectSubset<T, ServingDeleteArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ServingUpdateArgs>(args: Prisma.SelectSubset<T, ServingUpdateArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ServingDeleteManyArgs>(args?: Prisma.SelectSubset<T, ServingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ServingUpdateManyArgs>(args: Prisma.SelectSubset<T, ServingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ServingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ServingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ServingUpsertArgs>(args: Prisma.SelectSubset<T, ServingUpsertArgs<ExtArgs>>): Prisma.Prisma__ServingClient<runtime.Types.Result.GetResult<Prisma.$ServingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ServingCountArgs>(args?: Prisma.Subset<T, ServingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ServingCountAggregateOutputType> : number>;
    aggregate<T extends ServingAggregateArgs>(args: Prisma.Subset<T, ServingAggregateArgs>): Prisma.PrismaPromise<GetServingAggregateType<T>>;
    groupBy<T extends ServingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ServingGroupByArgs['orderBy'];
    } : {
        orderBy?: ServingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ServingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ServingFieldRefs;
}
export interface Prisma__ServingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    saleLine<T extends Prisma.SaleLineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLineDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    servedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ServingFieldRefs {
    readonly id: Prisma.FieldRef<"Serving", 'String'>;
    readonly quantity: Prisma.FieldRef<"Serving", 'Decimal'>;
    readonly servedAt: Prisma.FieldRef<"Serving", 'DateTime'>;
    readonly saleLineId: Prisma.FieldRef<"Serving", 'String'>;
    readonly servedById: Prisma.FieldRef<"Serving", 'String'>;
}
export type ServingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
    where: Prisma.ServingWhereUniqueInput;
};
export type ServingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
    where: Prisma.ServingWhereUniqueInput;
};
export type ServingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServingCreateInput, Prisma.ServingUncheckedCreateInput>;
};
export type ServingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ServingCreateManyInput | Prisma.ServingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ServingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    data: Prisma.ServingCreateManyInput | Prisma.ServingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ServingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ServingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServingUpdateInput, Prisma.ServingUncheckedUpdateInput>;
    where: Prisma.ServingWhereUniqueInput;
};
export type ServingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ServingUpdateManyMutationInput, Prisma.ServingUncheckedUpdateManyInput>;
    where?: Prisma.ServingWhereInput;
    limit?: number;
};
export type ServingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServingUpdateManyMutationInput, Prisma.ServingUncheckedUpdateManyInput>;
    where?: Prisma.ServingWhereInput;
    limit?: number;
    include?: Prisma.ServingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ServingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
    where: Prisma.ServingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServingCreateInput, Prisma.ServingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ServingUpdateInput, Prisma.ServingUncheckedUpdateInput>;
};
export type ServingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
    where: Prisma.ServingWhereUniqueInput;
};
export type ServingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServingWhereInput;
    limit?: number;
};
export type ServingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServingSelect<ExtArgs> | null;
    omit?: Prisma.ServingOmit<ExtArgs> | null;
    include?: Prisma.ServingInclude<ExtArgs> | null;
};
