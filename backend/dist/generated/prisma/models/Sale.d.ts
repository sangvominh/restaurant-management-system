import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SaleModel = runtime.Types.Result.DefaultSelection<Prisma.$SalePayload>;
export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null;
    _min: SaleMinAggregateOutputType | null;
    _max: SaleMaxAggregateOutputType | null;
};
export type SaleMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    createdAt: Date | null;
    status: string | null;
    createdById: string | null;
};
export type SaleMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    createdAt: Date | null;
    status: string | null;
    createdById: string | null;
};
export type SaleCountAggregateOutputType = {
    id: number;
    code: number;
    createdAt: number;
    status: number;
    createdById: number;
    _all: number;
};
export type SaleMinAggregateInputType = {
    id?: true;
    code?: true;
    createdAt?: true;
    status?: true;
    createdById?: true;
};
export type SaleMaxAggregateInputType = {
    id?: true;
    code?: true;
    createdAt?: true;
    status?: true;
    createdById?: true;
};
export type SaleCountAggregateInputType = {
    id?: true;
    code?: true;
    createdAt?: true;
    status?: true;
    createdById?: true;
    _all?: true;
};
export type SaleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SaleCountAggregateInputType;
    _min?: SaleMinAggregateInputType;
    _max?: SaleMaxAggregateInputType;
};
export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
    [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSale[P]> : Prisma.GetScalarType<T[P], AggregateSale[P]>;
};
export type SaleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithAggregationInput | Prisma.SaleOrderByWithAggregationInput[];
    by: Prisma.SaleScalarFieldEnum[] | Prisma.SaleScalarFieldEnum;
    having?: Prisma.SaleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SaleCountAggregateInputType | true;
    _min?: SaleMinAggregateInputType;
    _max?: SaleMaxAggregateInputType;
};
export type SaleGroupByOutputType = {
    id: string;
    code: string;
    createdAt: Date;
    status: string;
    createdById: string;
    _count: SaleCountAggregateOutputType | null;
    _min: SaleMinAggregateOutputType | null;
    _max: SaleMaxAggregateOutputType | null;
};
export type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SaleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SaleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SaleGroupByOutputType[P]>;
}>>;
export type SaleWhereInput = {
    AND?: Prisma.SaleWhereInput | Prisma.SaleWhereInput[];
    OR?: Prisma.SaleWhereInput[];
    NOT?: Prisma.SaleWhereInput | Prisma.SaleWhereInput[];
    id?: Prisma.UuidFilter<"Sale"> | string;
    code?: Prisma.StringFilter<"Sale"> | string;
    createdAt?: Prisma.DateTimeFilter<"Sale"> | Date | string;
    status?: Prisma.StringFilter<"Sale"> | string;
    createdById?: Prisma.UuidFilter<"Sale"> | string;
    createdBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.SaleLineListRelationFilter;
    exports?: Prisma.ProductExportListRelationFilter;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
};
export type SaleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.SaleLineOrderByRelationAggregateInput;
    exports?: Prisma.ProductExportOrderByRelationAggregateInput;
    payment?: Prisma.PaymentOrderByWithRelationInput;
};
export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.SaleWhereInput | Prisma.SaleWhereInput[];
    OR?: Prisma.SaleWhereInput[];
    NOT?: Prisma.SaleWhereInput | Prisma.SaleWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Sale"> | Date | string;
    status?: Prisma.StringFilter<"Sale"> | string;
    createdById?: Prisma.UuidFilter<"Sale"> | string;
    createdBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.SaleLineListRelationFilter;
    exports?: Prisma.ProductExportListRelationFilter;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
}, "id" | "code">;
export type SaleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    _count?: Prisma.SaleCountOrderByAggregateInput;
    _max?: Prisma.SaleMaxOrderByAggregateInput;
    _min?: Prisma.SaleMinOrderByAggregateInput;
};
export type SaleScalarWhereWithAggregatesInput = {
    AND?: Prisma.SaleScalarWhereWithAggregatesInput | Prisma.SaleScalarWhereWithAggregatesInput[];
    OR?: Prisma.SaleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SaleScalarWhereWithAggregatesInput | Prisma.SaleScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Sale"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Sale"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Sale"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"Sale"> | string;
    createdById?: Prisma.UuidWithAggregatesFilter<"Sale"> | string;
};
export type SaleCreateInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedSalesInput;
    lines?: Prisma.SaleLineCreateNestedManyWithoutSaleInput;
    exports?: Prisma.ProductExportCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutSaleInput;
};
export type SaleUncheckedCreateInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdById: string;
    lines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutSaleInput;
    exports?: Prisma.ProductExportUncheckedCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutSaleInput;
};
export type SaleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedSalesNestedInput;
    lines?: Prisma.SaleLineUpdateManyWithoutSaleNestedInput;
    exports?: Prisma.ProductExportUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutSaleNestedInput;
};
export type SaleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.SaleLineUncheckedUpdateManyWithoutSaleNestedInput;
    exports?: Prisma.ProductExportUncheckedUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutSaleNestedInput;
};
export type SaleCreateManyInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdById: string;
};
export type SaleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleListRelationFilter = {
    every?: Prisma.SaleWhereInput;
    some?: Prisma.SaleWhereInput;
    none?: Prisma.SaleWhereInput;
};
export type SaleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SaleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type SaleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type SaleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type SaleScalarRelationFilter = {
    is?: Prisma.SaleWhereInput;
    isNot?: Prisma.SaleWhereInput;
};
export type SaleCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutCreatedByInput, Prisma.SaleUncheckedCreateWithoutCreatedByInput> | Prisma.SaleCreateWithoutCreatedByInput[] | Prisma.SaleUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutCreatedByInput | Prisma.SaleCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.SaleCreateManyCreatedByInputEnvelope;
    connect?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
};
export type SaleUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutCreatedByInput, Prisma.SaleUncheckedCreateWithoutCreatedByInput> | Prisma.SaleCreateWithoutCreatedByInput[] | Prisma.SaleUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutCreatedByInput | Prisma.SaleCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.SaleCreateManyCreatedByInputEnvelope;
    connect?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
};
export type SaleUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutCreatedByInput, Prisma.SaleUncheckedCreateWithoutCreatedByInput> | Prisma.SaleCreateWithoutCreatedByInput[] | Prisma.SaleUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutCreatedByInput | Prisma.SaleCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.SaleUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.SaleUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.SaleCreateManyCreatedByInputEnvelope;
    set?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    disconnect?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    delete?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    connect?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    update?: Prisma.SaleUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.SaleUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.SaleUpdateManyWithWhereWithoutCreatedByInput | Prisma.SaleUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.SaleScalarWhereInput | Prisma.SaleScalarWhereInput[];
};
export type SaleUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutCreatedByInput, Prisma.SaleUncheckedCreateWithoutCreatedByInput> | Prisma.SaleCreateWithoutCreatedByInput[] | Prisma.SaleUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutCreatedByInput | Prisma.SaleCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.SaleUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.SaleUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.SaleCreateManyCreatedByInputEnvelope;
    set?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    disconnect?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    delete?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    connect?: Prisma.SaleWhereUniqueInput | Prisma.SaleWhereUniqueInput[];
    update?: Prisma.SaleUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.SaleUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.SaleUpdateManyWithWhereWithoutCreatedByInput | Prisma.SaleUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.SaleScalarWhereInput | Prisma.SaleScalarWhereInput[];
};
export type SaleCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutLinesInput, Prisma.SaleUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutLinesInput;
    connect?: Prisma.SaleWhereUniqueInput;
};
export type SaleUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutLinesInput, Prisma.SaleUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.SaleUpsertWithoutLinesInput;
    connect?: Prisma.SaleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleUpdateToOneWithWhereWithoutLinesInput, Prisma.SaleUpdateWithoutLinesInput>, Prisma.SaleUncheckedUpdateWithoutLinesInput>;
};
export type SaleCreateNestedOneWithoutExportsInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutExportsInput, Prisma.SaleUncheckedCreateWithoutExportsInput>;
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutExportsInput;
    connect?: Prisma.SaleWhereUniqueInput;
};
export type SaleUpdateOneRequiredWithoutExportsNestedInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutExportsInput, Prisma.SaleUncheckedCreateWithoutExportsInput>;
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutExportsInput;
    upsert?: Prisma.SaleUpsertWithoutExportsInput;
    connect?: Prisma.SaleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleUpdateToOneWithWhereWithoutExportsInput, Prisma.SaleUpdateWithoutExportsInput>, Prisma.SaleUncheckedUpdateWithoutExportsInput>;
};
export type SaleCreateNestedOneWithoutPaymentInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutPaymentInput, Prisma.SaleUncheckedCreateWithoutPaymentInput>;
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutPaymentInput;
    connect?: Prisma.SaleWhereUniqueInput;
};
export type SaleUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: Prisma.XOR<Prisma.SaleCreateWithoutPaymentInput, Prisma.SaleUncheckedCreateWithoutPaymentInput>;
    connectOrCreate?: Prisma.SaleCreateOrConnectWithoutPaymentInput;
    upsert?: Prisma.SaleUpsertWithoutPaymentInput;
    connect?: Prisma.SaleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SaleUpdateToOneWithWhereWithoutPaymentInput, Prisma.SaleUpdateWithoutPaymentInput>, Prisma.SaleUncheckedUpdateWithoutPaymentInput>;
};
export type SaleCreateWithoutCreatedByInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    lines?: Prisma.SaleLineCreateNestedManyWithoutSaleInput;
    exports?: Prisma.ProductExportCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutSaleInput;
};
export type SaleUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    lines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutSaleInput;
    exports?: Prisma.ProductExportUncheckedCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutSaleInput;
};
export type SaleCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.SaleWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleCreateWithoutCreatedByInput, Prisma.SaleUncheckedCreateWithoutCreatedByInput>;
};
export type SaleCreateManyCreatedByInputEnvelope = {
    data: Prisma.SaleCreateManyCreatedByInput | Prisma.SaleCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type SaleUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.SaleWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleUpdateWithoutCreatedByInput, Prisma.SaleUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.SaleCreateWithoutCreatedByInput, Prisma.SaleUncheckedCreateWithoutCreatedByInput>;
};
export type SaleUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.SaleWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleUpdateWithoutCreatedByInput, Prisma.SaleUncheckedUpdateWithoutCreatedByInput>;
};
export type SaleUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.SaleScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleUpdateManyMutationInput, Prisma.SaleUncheckedUpdateManyWithoutCreatedByInput>;
};
export type SaleScalarWhereInput = {
    AND?: Prisma.SaleScalarWhereInput | Prisma.SaleScalarWhereInput[];
    OR?: Prisma.SaleScalarWhereInput[];
    NOT?: Prisma.SaleScalarWhereInput | Prisma.SaleScalarWhereInput[];
    id?: Prisma.UuidFilter<"Sale"> | string;
    code?: Prisma.StringFilter<"Sale"> | string;
    createdAt?: Prisma.DateTimeFilter<"Sale"> | Date | string;
    status?: Prisma.StringFilter<"Sale"> | string;
    createdById?: Prisma.UuidFilter<"Sale"> | string;
};
export type SaleCreateWithoutLinesInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedSalesInput;
    exports?: Prisma.ProductExportCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutSaleInput;
};
export type SaleUncheckedCreateWithoutLinesInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdById: string;
    exports?: Prisma.ProductExportUncheckedCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutSaleInput;
};
export type SaleCreateOrConnectWithoutLinesInput = {
    where: Prisma.SaleWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleCreateWithoutLinesInput, Prisma.SaleUncheckedCreateWithoutLinesInput>;
};
export type SaleUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.SaleUpdateWithoutLinesInput, Prisma.SaleUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.SaleCreateWithoutLinesInput, Prisma.SaleUncheckedCreateWithoutLinesInput>;
    where?: Prisma.SaleWhereInput;
};
export type SaleUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.SaleWhereInput;
    data: Prisma.XOR<Prisma.SaleUpdateWithoutLinesInput, Prisma.SaleUncheckedUpdateWithoutLinesInput>;
};
export type SaleUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedSalesNestedInput;
    exports?: Prisma.ProductExportUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutSaleNestedInput;
};
export type SaleUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    exports?: Prisma.ProductExportUncheckedUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutSaleNestedInput;
};
export type SaleCreateWithoutExportsInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedSalesInput;
    lines?: Prisma.SaleLineCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutSaleInput;
};
export type SaleUncheckedCreateWithoutExportsInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdById: string;
    lines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutSaleInput;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutSaleInput;
};
export type SaleCreateOrConnectWithoutExportsInput = {
    where: Prisma.SaleWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleCreateWithoutExportsInput, Prisma.SaleUncheckedCreateWithoutExportsInput>;
};
export type SaleUpsertWithoutExportsInput = {
    update: Prisma.XOR<Prisma.SaleUpdateWithoutExportsInput, Prisma.SaleUncheckedUpdateWithoutExportsInput>;
    create: Prisma.XOR<Prisma.SaleCreateWithoutExportsInput, Prisma.SaleUncheckedCreateWithoutExportsInput>;
    where?: Prisma.SaleWhereInput;
};
export type SaleUpdateToOneWithWhereWithoutExportsInput = {
    where?: Prisma.SaleWhereInput;
    data: Prisma.XOR<Prisma.SaleUpdateWithoutExportsInput, Prisma.SaleUncheckedUpdateWithoutExportsInput>;
};
export type SaleUpdateWithoutExportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedSalesNestedInput;
    lines?: Prisma.SaleLineUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutSaleNestedInput;
};
export type SaleUncheckedUpdateWithoutExportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.SaleLineUncheckedUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutSaleNestedInput;
};
export type SaleCreateWithoutPaymentInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedSalesInput;
    lines?: Prisma.SaleLineCreateNestedManyWithoutSaleInput;
    exports?: Prisma.ProductExportCreateNestedManyWithoutSaleInput;
};
export type SaleUncheckedCreateWithoutPaymentInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
    createdById: string;
    lines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutSaleInput;
    exports?: Prisma.ProductExportUncheckedCreateNestedManyWithoutSaleInput;
};
export type SaleCreateOrConnectWithoutPaymentInput = {
    where: Prisma.SaleWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleCreateWithoutPaymentInput, Prisma.SaleUncheckedCreateWithoutPaymentInput>;
};
export type SaleUpsertWithoutPaymentInput = {
    update: Prisma.XOR<Prisma.SaleUpdateWithoutPaymentInput, Prisma.SaleUncheckedUpdateWithoutPaymentInput>;
    create: Prisma.XOR<Prisma.SaleCreateWithoutPaymentInput, Prisma.SaleUncheckedCreateWithoutPaymentInput>;
    where?: Prisma.SaleWhereInput;
};
export type SaleUpdateToOneWithWhereWithoutPaymentInput = {
    where?: Prisma.SaleWhereInput;
    data: Prisma.XOR<Prisma.SaleUpdateWithoutPaymentInput, Prisma.SaleUncheckedUpdateWithoutPaymentInput>;
};
export type SaleUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedSalesNestedInput;
    lines?: Prisma.SaleLineUpdateManyWithoutSaleNestedInput;
    exports?: Prisma.ProductExportUpdateManyWithoutSaleNestedInput;
};
export type SaleUncheckedUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.SaleLineUncheckedUpdateManyWithoutSaleNestedInput;
    exports?: Prisma.ProductExportUncheckedUpdateManyWithoutSaleNestedInput;
};
export type SaleCreateManyCreatedByInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    status?: string;
};
export type SaleUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.SaleLineUpdateManyWithoutSaleNestedInput;
    exports?: Prisma.ProductExportUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutSaleNestedInput;
};
export type SaleUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.SaleLineUncheckedUpdateManyWithoutSaleNestedInput;
    exports?: Prisma.ProductExportUncheckedUpdateManyWithoutSaleNestedInput;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutSaleNestedInput;
};
export type SaleUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleCountOutputType = {
    lines: number;
    exports: number;
};
export type SaleCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | SaleCountOutputTypeCountLinesArgs;
    exports?: boolean | SaleCountOutputTypeCountExportsArgs;
};
export type SaleCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleCountOutputTypeSelect<ExtArgs> | null;
};
export type SaleCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineWhereInput;
};
export type SaleCountOutputTypeCountExportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportWhereInput;
};
export type SaleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    status?: boolean;
    createdById?: boolean;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Sale$linesArgs<ExtArgs>;
    exports?: boolean | Prisma.Sale$exportsArgs<ExtArgs>;
    payment?: boolean | Prisma.Sale$paymentArgs<ExtArgs>;
    _count?: boolean | Prisma.SaleCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sale"]>;
export type SaleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    status?: boolean;
    createdById?: boolean;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sale"]>;
export type SaleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    status?: boolean;
    createdById?: boolean;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sale"]>;
export type SaleSelectScalar = {
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    status?: boolean;
    createdById?: boolean;
};
export type SaleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "createdAt" | "status" | "createdById", ExtArgs["result"]["sale"]>;
export type SaleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Sale$linesArgs<ExtArgs>;
    exports?: boolean | Prisma.Sale$exportsArgs<ExtArgs>;
    payment?: boolean | Prisma.Sale$paymentArgs<ExtArgs>;
    _count?: boolean | Prisma.SaleCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SaleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type SaleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $SalePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sale";
    objects: {
        createdBy: Prisma.$EmployeePayload<ExtArgs>;
        lines: Prisma.$SaleLinePayload<ExtArgs>[];
        exports: Prisma.$ProductExportPayload<ExtArgs>[];
        payment: Prisma.$PaymentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        createdAt: Date;
        status: string;
        createdById: string;
    }, ExtArgs["result"]["sale"]>;
    composites: {};
};
export type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SalePayload, S>;
export type SaleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SaleCountAggregateInputType | true;
};
export interface SaleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sale'];
        meta: {
            name: 'Sale';
        };
    };
    findUnique<T extends SaleFindUniqueArgs>(args: Prisma.SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SaleFindFirstArgs>(args?: Prisma.SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SaleFindManyArgs>(args?: Prisma.SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SaleCreateArgs>(args: Prisma.SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SaleCreateManyArgs>(args?: Prisma.SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SaleDeleteArgs>(args: Prisma.SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SaleUpdateArgs>(args: Prisma.SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SaleDeleteManyArgs>(args?: Prisma.SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SaleUpdateManyArgs>(args: Prisma.SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SaleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SaleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SaleUpsertArgs>(args: Prisma.SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SaleCountArgs>(args?: Prisma.Subset<T, SaleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SaleCountAggregateOutputType> : number>;
    aggregate<T extends SaleAggregateArgs>(args: Prisma.Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>;
    groupBy<T extends SaleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SaleGroupByArgs['orderBy'];
    } : {
        orderBy?: SaleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SaleFieldRefs;
}
export interface Prisma__SaleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    createdBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.Sale$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Sale$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    exports<T extends Prisma.Sale$exportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Sale$exportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payment<T extends Prisma.Sale$paymentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Sale$paymentArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SaleFieldRefs {
    readonly id: Prisma.FieldRef<"Sale", 'String'>;
    readonly code: Prisma.FieldRef<"Sale", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Sale", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Sale", 'String'>;
    readonly createdById: Prisma.FieldRef<"Sale", 'String'>;
}
export type SaleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where: Prisma.SaleWhereUniqueInput;
};
export type SaleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where: Prisma.SaleWhereUniqueInput;
};
export type SaleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleScalarFieldEnum | Prisma.SaleScalarFieldEnum[];
};
export type SaleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleScalarFieldEnum | Prisma.SaleScalarFieldEnum[];
};
export type SaleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleScalarFieldEnum | Prisma.SaleScalarFieldEnum[];
};
export type SaleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleCreateInput, Prisma.SaleUncheckedCreateInput>;
};
export type SaleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SaleCreateManyInput | Prisma.SaleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SaleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    data: Prisma.SaleCreateManyInput | Prisma.SaleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SaleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SaleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleUpdateInput, Prisma.SaleUncheckedUpdateInput>;
    where: Prisma.SaleWhereUniqueInput;
};
export type SaleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SaleUpdateManyMutationInput, Prisma.SaleUncheckedUpdateManyInput>;
    where?: Prisma.SaleWhereInput;
    limit?: number;
};
export type SaleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleUpdateManyMutationInput, Prisma.SaleUncheckedUpdateManyInput>;
    where?: Prisma.SaleWhereInput;
    limit?: number;
    include?: Prisma.SaleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SaleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where: Prisma.SaleWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleCreateInput, Prisma.SaleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SaleUpdateInput, Prisma.SaleUncheckedUpdateInput>;
};
export type SaleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where: Prisma.SaleWhereUniqueInput;
};
export type SaleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleWhereInput;
    limit?: number;
};
export type Sale$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Sale$exportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
    where?: Prisma.ProductExportWhereInput;
    orderBy?: Prisma.ProductExportOrderByWithRelationInput | Prisma.ProductExportOrderByWithRelationInput[];
    cursor?: Prisma.ProductExportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductExportScalarFieldEnum | Prisma.ProductExportScalarFieldEnum[];
};
export type Sale$paymentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
};
export type SaleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
};
