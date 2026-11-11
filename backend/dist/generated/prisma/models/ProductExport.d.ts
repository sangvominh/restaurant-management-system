import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductExportModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductExportPayload>;
export type AggregateProductExport = {
    _count: ProductExportCountAggregateOutputType | null;
    _min: ProductExportMinAggregateOutputType | null;
    _max: ProductExportMaxAggregateOutputType | null;
};
export type ProductExportMinAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    saleId: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type ProductExportMaxAggregateOutputType = {
    id: string | null;
    requestedAt: Date | null;
    approvedAt: Date | null;
    status: string | null;
    reason: string | null;
    saleId: string | null;
    requestedById: string | null;
    reviewedById: string | null;
};
export type ProductExportCountAggregateOutputType = {
    id: number;
    requestedAt: number;
    approvedAt: number;
    status: number;
    reason: number;
    saleId: number;
    requestedById: number;
    reviewedById: number;
    _all: number;
};
export type ProductExportMinAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    saleId?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type ProductExportMaxAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    saleId?: true;
    requestedById?: true;
    reviewedById?: true;
};
export type ProductExportCountAggregateInputType = {
    id?: true;
    requestedAt?: true;
    approvedAt?: true;
    status?: true;
    reason?: true;
    saleId?: true;
    requestedById?: true;
    reviewedById?: true;
    _all?: true;
};
export type ProductExportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportWhereInput;
    orderBy?: Prisma.ProductExportOrderByWithRelationInput | Prisma.ProductExportOrderByWithRelationInput[];
    cursor?: Prisma.ProductExportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductExportCountAggregateInputType;
    _min?: ProductExportMinAggregateInputType;
    _max?: ProductExportMaxAggregateInputType;
};
export type GetProductExportAggregateType<T extends ProductExportAggregateArgs> = {
    [P in keyof T & keyof AggregateProductExport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductExport[P]> : Prisma.GetScalarType<T[P], AggregateProductExport[P]>;
};
export type ProductExportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportWhereInput;
    orderBy?: Prisma.ProductExportOrderByWithAggregationInput | Prisma.ProductExportOrderByWithAggregationInput[];
    by: Prisma.ProductExportScalarFieldEnum[] | Prisma.ProductExportScalarFieldEnum;
    having?: Prisma.ProductExportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductExportCountAggregateInputType | true;
    _min?: ProductExportMinAggregateInputType;
    _max?: ProductExportMaxAggregateInputType;
};
export type ProductExportGroupByOutputType = {
    id: string;
    requestedAt: Date;
    approvedAt: Date | null;
    status: string;
    reason: string | null;
    saleId: string;
    requestedById: string;
    reviewedById: string | null;
    _count: ProductExportCountAggregateOutputType | null;
    _min: ProductExportMinAggregateOutputType | null;
    _max: ProductExportMaxAggregateOutputType | null;
};
export type GetProductExportGroupByPayload<T extends ProductExportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductExportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductExportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductExportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductExportGroupByOutputType[P]>;
}>>;
export type ProductExportWhereInput = {
    AND?: Prisma.ProductExportWhereInput | Prisma.ProductExportWhereInput[];
    OR?: Prisma.ProductExportWhereInput[];
    NOT?: Prisma.ProductExportWhereInput | Prisma.ProductExportWhereInput[];
    id?: Prisma.UuidFilter<"ProductExport"> | string;
    requestedAt?: Prisma.DateTimeFilter<"ProductExport"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"ProductExport"> | Date | string | null;
    status?: Prisma.StringFilter<"ProductExport"> | string;
    reason?: Prisma.StringNullableFilter<"ProductExport"> | string | null;
    saleId?: Prisma.UuidFilter<"ProductExport"> | string;
    requestedById?: Prisma.UuidFilter<"ProductExport"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"ProductExport"> | string | null;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.ProductExportLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
};
export type ProductExportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    sale?: Prisma.SaleOrderByWithRelationInput;
    requestedBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.ProductExportLineOrderByRelationAggregateInput;
    reviewedBy?: Prisma.EmployeeOrderByWithRelationInput;
};
export type ProductExportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductExportWhereInput | Prisma.ProductExportWhereInput[];
    OR?: Prisma.ProductExportWhereInput[];
    NOT?: Prisma.ProductExportWhereInput | Prisma.ProductExportWhereInput[];
    requestedAt?: Prisma.DateTimeFilter<"ProductExport"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"ProductExport"> | Date | string | null;
    status?: Prisma.StringFilter<"ProductExport"> | string;
    reason?: Prisma.StringNullableFilter<"ProductExport"> | string | null;
    saleId?: Prisma.UuidFilter<"ProductExport"> | string;
    requestedById?: Prisma.UuidFilter<"ProductExport"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"ProductExport"> | string | null;
    sale?: Prisma.XOR<Prisma.SaleScalarRelationFilter, Prisma.SaleWhereInput>;
    requestedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.ProductExportLineListRelationFilter;
    reviewedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
}, "id">;
export type ProductExportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProductExportCountOrderByAggregateInput;
    _max?: Prisma.ProductExportMaxOrderByAggregateInput;
    _min?: Prisma.ProductExportMinOrderByAggregateInput;
};
export type ProductExportScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductExportScalarWhereWithAggregatesInput | Prisma.ProductExportScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductExportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductExportScalarWhereWithAggregatesInput | Prisma.ProductExportScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductExport"> | string;
    requestedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductExport"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductExport"> | Date | string | null;
    status?: Prisma.StringWithAggregatesFilter<"ProductExport"> | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"ProductExport"> | string | null;
    saleId?: Prisma.UuidWithAggregatesFilter<"ProductExport"> | string;
    requestedById?: Prisma.UuidWithAggregatesFilter<"ProductExport"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"ProductExport"> | string | null;
};
export type ProductExportCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    sale: Prisma.SaleCreateNestedOneWithoutExportsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedExportsInput;
    lines?: Prisma.ProductExportLineCreateNestedManyWithoutExportInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedExportsInput;
};
export type ProductExportUncheckedCreateInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    saleId: string;
    requestedById: string;
    reviewedById?: string | null;
    lines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutExportInput;
};
export type ProductExportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sale?: Prisma.SaleUpdateOneRequiredWithoutExportsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedExportsNestedInput;
    lines?: Prisma.ProductExportLineUpdateManyWithoutExportNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedExportsNestedInput;
};
export type ProductExportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutExportNestedInput;
};
export type ProductExportCreateManyInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    saleId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type ProductExportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductExportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductExportListRelationFilter = {
    every?: Prisma.ProductExportWhereInput;
    some?: Prisma.ProductExportWhereInput;
    none?: Prisma.ProductExportWhereInput;
};
export type ProductExportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductExportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type ProductExportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type ProductExportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestedAt?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleId?: Prisma.SortOrder;
    requestedById?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
};
export type ProductExportScalarRelationFilter = {
    is?: Prisma.ProductExportWhereInput;
    isNot?: Prisma.ProductExportWhereInput;
};
export type ProductExportCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutRequestedByInput, Prisma.ProductExportUncheckedCreateWithoutRequestedByInput> | Prisma.ProductExportCreateWithoutRequestedByInput[] | Prisma.ProductExportUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutRequestedByInput | Prisma.ProductExportCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.ProductExportCreateManyRequestedByInputEnvelope;
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
};
export type ProductExportCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutReviewedByInput, Prisma.ProductExportUncheckedCreateWithoutReviewedByInput> | Prisma.ProductExportCreateWithoutReviewedByInput[] | Prisma.ProductExportUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutReviewedByInput | Prisma.ProductExportCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.ProductExportCreateManyReviewedByInputEnvelope;
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
};
export type ProductExportUncheckedCreateNestedManyWithoutRequestedByInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutRequestedByInput, Prisma.ProductExportUncheckedCreateWithoutRequestedByInput> | Prisma.ProductExportCreateWithoutRequestedByInput[] | Prisma.ProductExportUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutRequestedByInput | Prisma.ProductExportCreateOrConnectWithoutRequestedByInput[];
    createMany?: Prisma.ProductExportCreateManyRequestedByInputEnvelope;
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
};
export type ProductExportUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutReviewedByInput, Prisma.ProductExportUncheckedCreateWithoutReviewedByInput> | Prisma.ProductExportCreateWithoutReviewedByInput[] | Prisma.ProductExportUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutReviewedByInput | Prisma.ProductExportCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.ProductExportCreateManyReviewedByInputEnvelope;
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
};
export type ProductExportUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutRequestedByInput, Prisma.ProductExportUncheckedCreateWithoutRequestedByInput> | Prisma.ProductExportCreateWithoutRequestedByInput[] | Prisma.ProductExportUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutRequestedByInput | Prisma.ProductExportCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.ProductExportUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.ProductExportUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.ProductExportCreateManyRequestedByInputEnvelope;
    set?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    disconnect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    delete?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    update?: Prisma.ProductExportUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.ProductExportUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.ProductExportUpdateManyWithWhereWithoutRequestedByInput | Prisma.ProductExportUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
};
export type ProductExportUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutReviewedByInput, Prisma.ProductExportUncheckedCreateWithoutReviewedByInput> | Prisma.ProductExportCreateWithoutReviewedByInput[] | Prisma.ProductExportUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutReviewedByInput | Prisma.ProductExportCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.ProductExportUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.ProductExportUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.ProductExportCreateManyReviewedByInputEnvelope;
    set?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    disconnect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    delete?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    update?: Prisma.ProductExportUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.ProductExportUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.ProductExportUpdateManyWithWhereWithoutReviewedByInput | Prisma.ProductExportUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
};
export type ProductExportUncheckedUpdateManyWithoutRequestedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutRequestedByInput, Prisma.ProductExportUncheckedCreateWithoutRequestedByInput> | Prisma.ProductExportCreateWithoutRequestedByInput[] | Prisma.ProductExportUncheckedCreateWithoutRequestedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutRequestedByInput | Prisma.ProductExportCreateOrConnectWithoutRequestedByInput[];
    upsert?: Prisma.ProductExportUpsertWithWhereUniqueWithoutRequestedByInput | Prisma.ProductExportUpsertWithWhereUniqueWithoutRequestedByInput[];
    createMany?: Prisma.ProductExportCreateManyRequestedByInputEnvelope;
    set?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    disconnect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    delete?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    update?: Prisma.ProductExportUpdateWithWhereUniqueWithoutRequestedByInput | Prisma.ProductExportUpdateWithWhereUniqueWithoutRequestedByInput[];
    updateMany?: Prisma.ProductExportUpdateManyWithWhereWithoutRequestedByInput | Prisma.ProductExportUpdateManyWithWhereWithoutRequestedByInput[];
    deleteMany?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
};
export type ProductExportUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutReviewedByInput, Prisma.ProductExportUncheckedCreateWithoutReviewedByInput> | Prisma.ProductExportCreateWithoutReviewedByInput[] | Prisma.ProductExportUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutReviewedByInput | Prisma.ProductExportCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.ProductExportUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.ProductExportUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.ProductExportCreateManyReviewedByInputEnvelope;
    set?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    disconnect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    delete?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    update?: Prisma.ProductExportUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.ProductExportUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.ProductExportUpdateManyWithWhereWithoutReviewedByInput | Prisma.ProductExportUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
};
export type ProductExportCreateNestedManyWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutSaleInput, Prisma.ProductExportUncheckedCreateWithoutSaleInput> | Prisma.ProductExportCreateWithoutSaleInput[] | Prisma.ProductExportUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutSaleInput | Prisma.ProductExportCreateOrConnectWithoutSaleInput[];
    createMany?: Prisma.ProductExportCreateManySaleInputEnvelope;
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
};
export type ProductExportUncheckedCreateNestedManyWithoutSaleInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutSaleInput, Prisma.ProductExportUncheckedCreateWithoutSaleInput> | Prisma.ProductExportCreateWithoutSaleInput[] | Prisma.ProductExportUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutSaleInput | Prisma.ProductExportCreateOrConnectWithoutSaleInput[];
    createMany?: Prisma.ProductExportCreateManySaleInputEnvelope;
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
};
export type ProductExportUpdateManyWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutSaleInput, Prisma.ProductExportUncheckedCreateWithoutSaleInput> | Prisma.ProductExportCreateWithoutSaleInput[] | Prisma.ProductExportUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutSaleInput | Prisma.ProductExportCreateOrConnectWithoutSaleInput[];
    upsert?: Prisma.ProductExportUpsertWithWhereUniqueWithoutSaleInput | Prisma.ProductExportUpsertWithWhereUniqueWithoutSaleInput[];
    createMany?: Prisma.ProductExportCreateManySaleInputEnvelope;
    set?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    disconnect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    delete?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    update?: Prisma.ProductExportUpdateWithWhereUniqueWithoutSaleInput | Prisma.ProductExportUpdateWithWhereUniqueWithoutSaleInput[];
    updateMany?: Prisma.ProductExportUpdateManyWithWhereWithoutSaleInput | Prisma.ProductExportUpdateManyWithWhereWithoutSaleInput[];
    deleteMany?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
};
export type ProductExportUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutSaleInput, Prisma.ProductExportUncheckedCreateWithoutSaleInput> | Prisma.ProductExportCreateWithoutSaleInput[] | Prisma.ProductExportUncheckedCreateWithoutSaleInput[];
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutSaleInput | Prisma.ProductExportCreateOrConnectWithoutSaleInput[];
    upsert?: Prisma.ProductExportUpsertWithWhereUniqueWithoutSaleInput | Prisma.ProductExportUpsertWithWhereUniqueWithoutSaleInput[];
    createMany?: Prisma.ProductExportCreateManySaleInputEnvelope;
    set?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    disconnect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    delete?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    connect?: Prisma.ProductExportWhereUniqueInput | Prisma.ProductExportWhereUniqueInput[];
    update?: Prisma.ProductExportUpdateWithWhereUniqueWithoutSaleInput | Prisma.ProductExportUpdateWithWhereUniqueWithoutSaleInput[];
    updateMany?: Prisma.ProductExportUpdateManyWithWhereWithoutSaleInput | Prisma.ProductExportUpdateManyWithWhereWithoutSaleInput[];
    deleteMany?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
};
export type ProductExportCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutLinesInput, Prisma.ProductExportUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutLinesInput;
    connect?: Prisma.ProductExportWhereUniqueInput;
};
export type ProductExportUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductExportCreateWithoutLinesInput, Prisma.ProductExportUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.ProductExportCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.ProductExportUpsertWithoutLinesInput;
    connect?: Prisma.ProductExportWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductExportUpdateToOneWithWhereWithoutLinesInput, Prisma.ProductExportUpdateWithoutLinesInput>, Prisma.ProductExportUncheckedUpdateWithoutLinesInput>;
};
export type ProductExportCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    sale: Prisma.SaleCreateNestedOneWithoutExportsInput;
    lines?: Prisma.ProductExportLineCreateNestedManyWithoutExportInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedExportsInput;
};
export type ProductExportUncheckedCreateWithoutRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    saleId: string;
    reviewedById?: string | null;
    lines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutExportInput;
};
export type ProductExportCreateOrConnectWithoutRequestedByInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutRequestedByInput, Prisma.ProductExportUncheckedCreateWithoutRequestedByInput>;
};
export type ProductExportCreateManyRequestedByInputEnvelope = {
    data: Prisma.ProductExportCreateManyRequestedByInput | Prisma.ProductExportCreateManyRequestedByInput[];
    skipDuplicates?: boolean;
};
export type ProductExportCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    sale: Prisma.SaleCreateNestedOneWithoutExportsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedExportsInput;
    lines?: Prisma.ProductExportLineCreateNestedManyWithoutExportInput;
};
export type ProductExportUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    saleId: string;
    requestedById: string;
    lines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutExportInput;
};
export type ProductExportCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutReviewedByInput, Prisma.ProductExportUncheckedCreateWithoutReviewedByInput>;
};
export type ProductExportCreateManyReviewedByInputEnvelope = {
    data: Prisma.ProductExportCreateManyReviewedByInput | Prisma.ProductExportCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type ProductExportUpsertWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductExportUpdateWithoutRequestedByInput, Prisma.ProductExportUncheckedUpdateWithoutRequestedByInput>;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutRequestedByInput, Prisma.ProductExportUncheckedCreateWithoutRequestedByInput>;
};
export type ProductExportUpdateWithWhereUniqueWithoutRequestedByInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductExportUpdateWithoutRequestedByInput, Prisma.ProductExportUncheckedUpdateWithoutRequestedByInput>;
};
export type ProductExportUpdateManyWithWhereWithoutRequestedByInput = {
    where: Prisma.ProductExportScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductExportUpdateManyMutationInput, Prisma.ProductExportUncheckedUpdateManyWithoutRequestedByInput>;
};
export type ProductExportScalarWhereInput = {
    AND?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
    OR?: Prisma.ProductExportScalarWhereInput[];
    NOT?: Prisma.ProductExportScalarWhereInput | Prisma.ProductExportScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductExport"> | string;
    requestedAt?: Prisma.DateTimeFilter<"ProductExport"> | Date | string;
    approvedAt?: Prisma.DateTimeNullableFilter<"ProductExport"> | Date | string | null;
    status?: Prisma.StringFilter<"ProductExport"> | string;
    reason?: Prisma.StringNullableFilter<"ProductExport"> | string | null;
    saleId?: Prisma.UuidFilter<"ProductExport"> | string;
    requestedById?: Prisma.UuidFilter<"ProductExport"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"ProductExport"> | string | null;
};
export type ProductExportUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductExportUpdateWithoutReviewedByInput, Prisma.ProductExportUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutReviewedByInput, Prisma.ProductExportUncheckedCreateWithoutReviewedByInput>;
};
export type ProductExportUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductExportUpdateWithoutReviewedByInput, Prisma.ProductExportUncheckedUpdateWithoutReviewedByInput>;
};
export type ProductExportUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.ProductExportScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductExportUpdateManyMutationInput, Prisma.ProductExportUncheckedUpdateManyWithoutReviewedByInput>;
};
export type ProductExportCreateWithoutSaleInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedExportsInput;
    lines?: Prisma.ProductExportLineCreateNestedManyWithoutExportInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedExportsInput;
};
export type ProductExportUncheckedCreateWithoutSaleInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    requestedById: string;
    reviewedById?: string | null;
    lines?: Prisma.ProductExportLineUncheckedCreateNestedManyWithoutExportInput;
};
export type ProductExportCreateOrConnectWithoutSaleInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutSaleInput, Prisma.ProductExportUncheckedCreateWithoutSaleInput>;
};
export type ProductExportCreateManySaleInputEnvelope = {
    data: Prisma.ProductExportCreateManySaleInput | Prisma.ProductExportCreateManySaleInput[];
    skipDuplicates?: boolean;
};
export type ProductExportUpsertWithWhereUniqueWithoutSaleInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductExportUpdateWithoutSaleInput, Prisma.ProductExportUncheckedUpdateWithoutSaleInput>;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutSaleInput, Prisma.ProductExportUncheckedCreateWithoutSaleInput>;
};
export type ProductExportUpdateWithWhereUniqueWithoutSaleInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductExportUpdateWithoutSaleInput, Prisma.ProductExportUncheckedUpdateWithoutSaleInput>;
};
export type ProductExportUpdateManyWithWhereWithoutSaleInput = {
    where: Prisma.ProductExportScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductExportUpdateManyMutationInput, Prisma.ProductExportUncheckedUpdateManyWithoutSaleInput>;
};
export type ProductExportCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    sale: Prisma.SaleCreateNestedOneWithoutExportsInput;
    requestedBy: Prisma.EmployeeCreateNestedOneWithoutRequestedExportsInput;
    reviewedBy?: Prisma.EmployeeCreateNestedOneWithoutReviewedExportsInput;
};
export type ProductExportUncheckedCreateWithoutLinesInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    saleId: string;
    requestedById: string;
    reviewedById?: string | null;
};
export type ProductExportCreateOrConnectWithoutLinesInput = {
    where: Prisma.ProductExportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutLinesInput, Prisma.ProductExportUncheckedCreateWithoutLinesInput>;
};
export type ProductExportUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.ProductExportUpdateWithoutLinesInput, Prisma.ProductExportUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.ProductExportCreateWithoutLinesInput, Prisma.ProductExportUncheckedCreateWithoutLinesInput>;
    where?: Prisma.ProductExportWhereInput;
};
export type ProductExportUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.ProductExportWhereInput;
    data: Prisma.XOR<Prisma.ProductExportUpdateWithoutLinesInput, Prisma.ProductExportUncheckedUpdateWithoutLinesInput>;
};
export type ProductExportUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sale?: Prisma.SaleUpdateOneRequiredWithoutExportsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedExportsNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedExportsNestedInput;
};
export type ProductExportUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductExportCreateManyRequestedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    saleId: string;
    reviewedById?: string | null;
};
export type ProductExportCreateManyReviewedByInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    saleId: string;
    requestedById: string;
};
export type ProductExportUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sale?: Prisma.SaleUpdateOneRequiredWithoutExportsNestedInput;
    lines?: Prisma.ProductExportLineUpdateManyWithoutExportNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedExportsNestedInput;
};
export type ProductExportUncheckedUpdateWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutExportNestedInput;
};
export type ProductExportUncheckedUpdateManyWithoutRequestedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductExportUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sale?: Prisma.SaleUpdateOneRequiredWithoutExportsNestedInput;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedExportsNestedInput;
    lines?: Prisma.ProductExportLineUpdateManyWithoutExportNestedInput;
};
export type ProductExportUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutExportNestedInput;
};
export type ProductExportUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    saleId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductExportCreateManySaleInput = {
    id?: string;
    requestedAt?: Date | string;
    approvedAt?: Date | string | null;
    status?: string;
    reason?: string | null;
    requestedById: string;
    reviewedById?: string | null;
};
export type ProductExportUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedBy?: Prisma.EmployeeUpdateOneRequiredWithoutRequestedExportsNestedInput;
    lines?: Prisma.ProductExportLineUpdateManyWithoutExportNestedInput;
    reviewedBy?: Prisma.EmployeeUpdateOneWithoutReviewedExportsNestedInput;
};
export type ProductExportUncheckedUpdateWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lines?: Prisma.ProductExportLineUncheckedUpdateManyWithoutExportNestedInput;
};
export type ProductExportUncheckedUpdateManyWithoutSaleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductExportCountOutputType = {
    lines: number;
};
export type ProductExportCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | ProductExportCountOutputTypeCountLinesArgs;
};
export type ProductExportCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductExportCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportLineWhereInput;
};
export type ProductExportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    saleId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.ProductExport$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ProductExport$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductExportCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productExport"]>;
export type ProductExportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    saleId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ProductExport$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["productExport"]>;
export type ProductExportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    saleId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ProductExport$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["productExport"]>;
export type ProductExportSelectScalar = {
    id?: boolean;
    requestedAt?: boolean;
    approvedAt?: boolean;
    status?: boolean;
    reason?: boolean;
    saleId?: boolean;
    requestedById?: boolean;
    reviewedById?: boolean;
};
export type ProductExportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestedAt" | "approvedAt" | "status" | "reason" | "saleId" | "requestedById" | "reviewedById", ExtArgs["result"]["productExport"]>;
export type ProductExportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.ProductExport$linesArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ProductExport$reviewedByArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductExportCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductExportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ProductExport$reviewedByArgs<ExtArgs>;
};
export type ProductExportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sale?: boolean | Prisma.SaleDefaultArgs<ExtArgs>;
    requestedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ProductExport$reviewedByArgs<ExtArgs>;
};
export type $ProductExportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductExport";
    objects: {
        sale: Prisma.$SalePayload<ExtArgs>;
        requestedBy: Prisma.$EmployeePayload<ExtArgs>;
        lines: Prisma.$ProductExportLinePayload<ExtArgs>[];
        reviewedBy: Prisma.$EmployeePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requestedAt: Date;
        approvedAt: Date | null;
        status: string;
        reason: string | null;
        saleId: string;
        requestedById: string;
        reviewedById: string | null;
    }, ExtArgs["result"]["productExport"]>;
    composites: {};
};
export type ProductExportGetPayload<S extends boolean | null | undefined | ProductExportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductExportPayload, S>;
export type ProductExportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductExportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductExportCountAggregateInputType | true;
};
export interface ProductExportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductExport'];
        meta: {
            name: 'ProductExport';
        };
    };
    findUnique<T extends ProductExportFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductExportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductExportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductExportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductExportFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductExportFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductExportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductExportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductExportFindManyArgs>(args?: Prisma.SelectSubset<T, ProductExportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductExportCreateArgs>(args: Prisma.SelectSubset<T, ProductExportCreateArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductExportCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductExportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductExportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductExportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductExportDeleteArgs>(args: Prisma.SelectSubset<T, ProductExportDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductExportUpdateArgs>(args: Prisma.SelectSubset<T, ProductExportUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductExportDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductExportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductExportUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductExportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductExportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductExportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductExportUpsertArgs>(args: Prisma.SelectSubset<T, ProductExportUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductExportClient<runtime.Types.Result.GetResult<Prisma.$ProductExportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductExportCountArgs>(args?: Prisma.Subset<T, ProductExportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductExportCountAggregateOutputType> : number>;
    aggregate<T extends ProductExportAggregateArgs>(args: Prisma.Subset<T, ProductExportAggregateArgs>): Prisma.PrismaPromise<GetProductExportAggregateType<T>>;
    groupBy<T extends ProductExportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductExportGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductExportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductExportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductExportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductExportFieldRefs;
}
export interface Prisma__ProductExportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sale<T extends Prisma.SaleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleClient<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requestedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.ProductExport$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductExport$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviewedBy<T extends Prisma.ProductExport$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductExport$reviewedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductExportFieldRefs {
    readonly id: Prisma.FieldRef<"ProductExport", 'String'>;
    readonly requestedAt: Prisma.FieldRef<"ProductExport", 'DateTime'>;
    readonly approvedAt: Prisma.FieldRef<"ProductExport", 'DateTime'>;
    readonly status: Prisma.FieldRef<"ProductExport", 'String'>;
    readonly reason: Prisma.FieldRef<"ProductExport", 'String'>;
    readonly saleId: Prisma.FieldRef<"ProductExport", 'String'>;
    readonly requestedById: Prisma.FieldRef<"ProductExport", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"ProductExport", 'String'>;
}
export type ProductExportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
    where: Prisma.ProductExportWhereUniqueInput;
};
export type ProductExportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
    where: Prisma.ProductExportWhereUniqueInput;
};
export type ProductExportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductExportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductExportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductExportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductExportCreateInput, Prisma.ProductExportUncheckedCreateInput>;
};
export type ProductExportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductExportCreateManyInput | Prisma.ProductExportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductExportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    data: Prisma.ProductExportCreateManyInput | Prisma.ProductExportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductExportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductExportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductExportUpdateInput, Prisma.ProductExportUncheckedUpdateInput>;
    where: Prisma.ProductExportWhereUniqueInput;
};
export type ProductExportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductExportUpdateManyMutationInput, Prisma.ProductExportUncheckedUpdateManyInput>;
    where?: Prisma.ProductExportWhereInput;
    limit?: number;
};
export type ProductExportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductExportUpdateManyMutationInput, Prisma.ProductExportUncheckedUpdateManyInput>;
    where?: Prisma.ProductExportWhereInput;
    limit?: number;
    include?: Prisma.ProductExportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductExportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
    where: Prisma.ProductExportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductExportCreateInput, Prisma.ProductExportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductExportUpdateInput, Prisma.ProductExportUncheckedUpdateInput>;
};
export type ProductExportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
    where: Prisma.ProductExportWhereUniqueInput;
};
export type ProductExportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductExportWhereInput;
    limit?: number;
};
export type ProductExport$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductExport$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type ProductExportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportOmit<ExtArgs> | null;
    include?: Prisma.ProductExportInclude<ExtArgs> | null;
};
