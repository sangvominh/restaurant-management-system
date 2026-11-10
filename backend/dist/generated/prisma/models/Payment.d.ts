import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentPayload>;
export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type PaymentAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type PaymentSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type PaymentMinAggregateOutputType = {
    id: string | null;
    amount: runtime.Decimal | null;
    receivedById: string | null;
    method: string | null;
    status: string | null;
    paidAt: Date | null;
    saleId: string | null;
};
export type PaymentMaxAggregateOutputType = {
    id: string | null;
    amount: runtime.Decimal | null;
    receivedById: string | null;
    method: string | null;
    status: string | null;
    paidAt: Date | null;
    saleId: string | null;
};
export type PaymentCountAggregateOutputType = {
    id: number;
    amount: number;
    receivedById: number;
    method: number;
    status: number;
    paidAt: number;
    saleId: number;
    _all: number;
};
export type PaymentAvgAggregateInputType = {
    amount?: true;
};
export type PaymentSumAggregateInputType = {
    amount?: true;
};
export type PaymentMinAggregateInputType = {
    id?: true;
    amount?: true;
    receivedById?: true;
    method?: true;
    status?: true;
    paidAt?: true;
    saleId?: true;
};
export type PaymentMaxAggregateInputType = {
    id?: true;
    amount?: true;
    receivedById?: true;
    method?: true;
    status?: true;
    paidAt?: true;
    saleId?: true;
};
export type PaymentCountAggregateInputType = {
    id?: true;
    amount?: true;
    receivedById?: true;
    method?: true;
    status?: true;
    paidAt?: true;
    saleId?: true;
    _all?: true;
};
export type PaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentCountAggregateInputType;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
    [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayment[P]> : Prisma.GetScalarType<T[P], AggregatePayment[P]>;
};
export type PaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithAggregationInput | Prisma.PaymentOrderByWithAggregationInput[];
    by: Prisma.PaymentScalarFieldEnum[] | Prisma.PaymentScalarFieldEnum;
    having?: Prisma.PaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentCountAggregateInputType | true;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type PaymentGroupByOutputType = {
    id: string;
    amount: runtime.Decimal;
    receivedById: string | null;
    method: string;
    status: string;
    paidAt: Date | null;
    saleId: string;
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]>;
}>>;
export type PaymentWhereInput = {
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    id?: Prisma.UuidFilter<"Payment"> | string;
    amount?: Prisma.DecimalFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: Prisma.UuidNullableFilter<"Payment"> | string | null;
    method?: Prisma.StringFilter<"Payment"> | string;
    status?: Prisma.StringFilter<"Payment"> | string;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    saleId?: Prisma.UuidFilter<"Payment"> | string;
    receivedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
};
export type PaymentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    receivedBy?: Prisma.EmployeeOrderByWithRelationInput;
    sale?: Prisma.SaleOrderByWithRelationInput;
};
export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    saleId?: string;
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    amount?: Prisma.DecimalFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: Prisma.UuidNullableFilter<"Payment"> | string | null;
    method?: Prisma.StringFilter<"Payment"> | string;
    status?: Prisma.StringFilter<"Payment"> | string;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    receivedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
}, "id" | "saleId">;
export type PaymentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    _count?: Prisma.PaymentCountOrderByAggregateInput;
    _avg?: Prisma.PaymentAvgOrderByAggregateInput;
    _max?: Prisma.PaymentMaxOrderByAggregateInput;
    _min?: Prisma.PaymentMinOrderByAggregateInput;
    _sum?: Prisma.PaymentSumOrderByAggregateInput;
};
export type PaymentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Payment"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: Prisma.UuidNullableWithAggregatesFilter<"Payment"> | string | null;
    method?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    status?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null;
    saleId?: Prisma.UuidWithAggregatesFilter<"Payment"> | string;
};
export type PaymentCreateInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
    receivedBy?: Prisma.EmployeeCreateNestedOneWithoutReceivedPaymentsInput;
    sale: Prisma.SaleCreateNestedOneWithoutPaymentInput;
};
export type PaymentUncheckedCreateInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: string | null;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
    saleId: string;
};
export type PaymentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedBy?: Prisma.EmployeeUpdateOneWithoutReceivedPaymentsNestedInput;
    sale?: Prisma.SaleUpdateOneRequiredWithoutPaymentNestedInput;
};
export type PaymentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaymentCreateManyInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: string | null;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
    saleId: string;
};
export type PaymentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PaymentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaymentListRelationFilter = {
    every?: Prisma.PaymentWhereInput;
    some?: Prisma.PaymentWhereInput;
    none?: Prisma.PaymentWhereInput;
};
export type PaymentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PaymentNullableScalarRelationFilter = {
    is?: Prisma.PaymentWhereInput | null;
    isNot?: Prisma.PaymentWhereInput | null;
};
export type PaymentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
};
export type PaymentAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PaymentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
};
export type PaymentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
};
export type PaymentSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PaymentCreateNestedManyWithoutReceivedByInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutReceivedByInput, Prisma.PaymentUncheckedCreateWithoutReceivedByInput> | Prisma.PaymentCreateWithoutReceivedByInput[] | Prisma.PaymentUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutReceivedByInput | Prisma.PaymentCreateOrConnectWithoutReceivedByInput[];
    createMany?: Prisma.PaymentCreateManyReceivedByInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutReceivedByInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutReceivedByInput, Prisma.PaymentUncheckedCreateWithoutReceivedByInput> | Prisma.PaymentCreateWithoutReceivedByInput[] | Prisma.PaymentUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutReceivedByInput | Prisma.PaymentCreateOrConnectWithoutReceivedByInput[];
    createMany?: Prisma.PaymentCreateManyReceivedByInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUpdateManyWithoutReceivedByNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutReceivedByInput, Prisma.PaymentUncheckedCreateWithoutReceivedByInput> | Prisma.PaymentCreateWithoutReceivedByInput[] | Prisma.PaymentUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutReceivedByInput | Prisma.PaymentCreateOrConnectWithoutReceivedByInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutReceivedByInput | Prisma.PaymentUpsertWithWhereUniqueWithoutReceivedByInput[];
    createMany?: Prisma.PaymentCreateManyReceivedByInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutReceivedByInput | Prisma.PaymentUpdateWithWhereUniqueWithoutReceivedByInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutReceivedByInput | Prisma.PaymentUpdateManyWithWhereWithoutReceivedByInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutReceivedByNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutReceivedByInput, Prisma.PaymentUncheckedCreateWithoutReceivedByInput> | Prisma.PaymentCreateWithoutReceivedByInput[] | Prisma.PaymentUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutReceivedByInput | Prisma.PaymentCreateOrConnectWithoutReceivedByInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutReceivedByInput | Prisma.PaymentUpsertWithWhereUniqueWithoutReceivedByInput[];
    createMany?: Prisma.PaymentCreateManyReceivedByInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutReceivedByInput | Prisma.PaymentUpdateWithWhereUniqueWithoutReceivedByInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutReceivedByInput | Prisma.PaymentUpdateManyWithWhereWithoutReceivedByInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentCreateNestedOneWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSaleInput, Prisma.PaymentUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSaleInput;
    connect?: Prisma.PaymentWhereUniqueInput;
};
export type PaymentUncheckedCreateNestedOneWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSaleInput, Prisma.PaymentUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSaleInput;
    connect?: Prisma.PaymentWhereUniqueInput;
};
export type PaymentUpdateOneWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSaleInput, Prisma.PaymentUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSaleInput;
    upsert?: Prisma.PaymentUpsertWithoutSaleInput;
    disconnect?: Prisma.PaymentWhereInput | boolean;
    delete?: Prisma.PaymentWhereInput | boolean;
    connect?: Prisma.PaymentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaymentUpdateToOneWithWhereWithoutSaleInput, Prisma.PaymentUpdateWithoutSaleInput>, Prisma.PaymentUncheckedUpdateWithoutSaleInput>;
};
export type PaymentUncheckedUpdateOneWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSaleInput, Prisma.PaymentUncheckedCreateWithoutSaleInput>;
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSaleInput;
    upsert?: Prisma.PaymentUpsertWithoutSaleInput;
    disconnect?: Prisma.PaymentWhereInput | boolean;
    delete?: Prisma.PaymentWhereInput | boolean;
    connect?: Prisma.PaymentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaymentUpdateToOneWithWhereWithoutSaleInput, Prisma.PaymentUpdateWithoutSaleInput>, Prisma.PaymentUncheckedUpdateWithoutSaleInput>;
};
export type PaymentCreateWithoutReceivedByInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
    sale: Prisma.SaleCreateNestedOneWithoutPaymentInput;
};
export type PaymentUncheckedCreateWithoutReceivedByInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
    saleId: string;
};
export type PaymentCreateOrConnectWithoutReceivedByInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutReceivedByInput, Prisma.PaymentUncheckedCreateWithoutReceivedByInput>;
};
export type PaymentCreateManyReceivedByInputEnvelope = {
    data: Prisma.PaymentCreateManyReceivedByInput | Prisma.PaymentCreateManyReceivedByInput[];
    skipDuplicates?: boolean;
};
export type PaymentUpsertWithWhereUniqueWithoutReceivedByInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutReceivedByInput, Prisma.PaymentUncheckedUpdateWithoutReceivedByInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutReceivedByInput, Prisma.PaymentUncheckedCreateWithoutReceivedByInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutReceivedByInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutReceivedByInput, Prisma.PaymentUncheckedUpdateWithoutReceivedByInput>;
};
export type PaymentUpdateManyWithWhereWithoutReceivedByInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutReceivedByInput>;
};
export type PaymentScalarWhereInput = {
    AND?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    OR?: Prisma.PaymentScalarWhereInput[];
    NOT?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    id?: Prisma.UuidFilter<"Payment"> | string;
    amount?: Prisma.DecimalFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: Prisma.UuidNullableFilter<"Payment"> | string | null;
    method?: Prisma.StringFilter<"Payment"> | string;
    status?: Prisma.StringFilter<"Payment"> | string;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    saleId?: Prisma.UuidFilter<"Payment"> | string;
};
export type PaymentCreateWithoutSaleInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
    receivedBy?: Prisma.EmployeeCreateNestedOneWithoutReceivedPaymentsInput;
};
export type PaymentUncheckedCreateWithoutSaleInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: string | null;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
};
export type PaymentCreateOrConnectWithoutSaleInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutSaleInput, Prisma.PaymentUncheckedCreateWithoutSaleInput>;
};
export type PaymentUpsertWithoutSaleInput = {
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutSaleInput, Prisma.PaymentUncheckedUpdateWithoutSaleInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutSaleInput, Prisma.PaymentUncheckedCreateWithoutSaleInput>;
    where?: Prisma.PaymentWhereInput;
};
export type PaymentUpdateToOneWithWhereWithoutSaleInput = {
    where?: Prisma.PaymentWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutSaleInput, Prisma.PaymentUncheckedUpdateWithoutSaleInput>;
};
export type PaymentUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedBy?: Prisma.EmployeeUpdateOneWithoutReceivedPaymentsNestedInput;
};
export type PaymentUncheckedUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PaymentCreateManyReceivedByInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: string;
    status?: string;
    paidAt?: Date | string | null;
    saleId: string;
};
export type PaymentUpdateWithoutReceivedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sale?: Prisma.SaleUpdateOneRequiredWithoutPaymentNestedInput;
};
export type PaymentUncheckedUpdateWithoutReceivedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaymentUncheckedUpdateManyWithoutReceivedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    amount?: boolean;
    receivedById?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    saleId?: boolean;
    receivedBy?: boolean | Prisma.Payment$receivedByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    amount?: boolean;
    receivedById?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    saleId?: boolean;
    receivedBy?: boolean | Prisma.Payment$receivedByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    amount?: boolean;
    receivedById?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    saleId?: boolean;
    receivedBy?: boolean | Prisma.Payment$receivedByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectScalar = {
    id?: boolean;
    amount?: boolean;
    receivedById?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    saleId?: boolean;
};
export type PaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "amount" | "receivedById" | "method" | "status" | "paidAt" | "saleId", ExtArgs["result"]["payment"]>;
export type PaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receivedBy?: boolean | Prisma.Payment$receivedByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
};
export type PaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receivedBy?: boolean | Prisma.Payment$receivedByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
};
export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receivedBy?: boolean | Prisma.Payment$receivedByArgs<ExtArgs>;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
};
export type $PaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Payment";
    objects: {
        receivedBy: Prisma.$EmployeePayload<ExtArgs> | null;
        sale: Prisma.$SalePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        amount: runtime.Decimal;
        receivedById: string | null;
        method: string;
        status: string;
        paidAt: Date | null;
        saleId: string;
    }, ExtArgs["result"]["payment"]>;
    composites: {};
};
export type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentPayload, S>;
export type PaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentCountAggregateInputType | true;
};
export interface PaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Payment'];
        meta: {
            name: 'Payment';
        };
    };
    findUnique<T extends PaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentCreateArgs>(args: Prisma.SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PaymentDeleteArgs>(args: Prisma.SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentUpdateArgs>(args: Prisma.SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PaymentUpsertArgs>(args: Prisma.SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentCountArgs>(args?: Prisma.Subset<T, PaymentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaymentCountAggregateOutputType> : number>;
    aggregate<T extends PaymentAggregateArgs>(args: Prisma.Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>;
    groupBy<T extends PaymentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentGroupByArgs['orderBy'];
    } : {
        orderBy?: PaymentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentFieldRefs;
}
export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    receivedBy<T extends Prisma.Payment$receivedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Payment$receivedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    sale<T extends Prisma.SaleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentFieldRefs {
    readonly id: Prisma.FieldRef<"Payment", 'String'>;
    readonly amount: Prisma.FieldRef<"Payment", 'Decimal'>;
    readonly receivedById: Prisma.FieldRef<"Payment", 'String'>;
    readonly method: Prisma.FieldRef<"Payment", 'String'>;
    readonly status: Prisma.FieldRef<"Payment", 'String'>;
    readonly paidAt: Prisma.FieldRef<"Payment", 'DateTime'>;
    readonly saleId: Prisma.FieldRef<"Payment", 'String'>;
}
export type PaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type PaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type PaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type PaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
};
export type PaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PaymentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type PaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
    include?: Prisma.PaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
};
export type PaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type Payment$receivedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type PaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
};
