import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialReceiptModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialReceiptPayload>;
export type AggregateMaterialReceipt = {
    _count: MaterialReceiptCountAggregateOutputType | null;
    _min: MaterialReceiptMinAggregateOutputType | null;
    _max: MaterialReceiptMaxAggregateOutputType | null;
};
export type MaterialReceiptMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    receivedAt: Date | null;
    status: string | null;
    note: string | null;
    supplierId: string | null;
    createdById: string | null;
};
export type MaterialReceiptMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    receivedAt: Date | null;
    status: string | null;
    note: string | null;
    supplierId: string | null;
    createdById: string | null;
};
export type MaterialReceiptCountAggregateOutputType = {
    id: number;
    code: number;
    receivedAt: number;
    status: number;
    note: number;
    supplierId: number;
    createdById: number;
    _all: number;
};
export type MaterialReceiptMinAggregateInputType = {
    id?: true;
    code?: true;
    receivedAt?: true;
    status?: true;
    note?: true;
    supplierId?: true;
    createdById?: true;
};
export type MaterialReceiptMaxAggregateInputType = {
    id?: true;
    code?: true;
    receivedAt?: true;
    status?: true;
    note?: true;
    supplierId?: true;
    createdById?: true;
};
export type MaterialReceiptCountAggregateInputType = {
    id?: true;
    code?: true;
    receivedAt?: true;
    status?: true;
    note?: true;
    supplierId?: true;
    createdById?: true;
    _all?: true;
};
export type MaterialReceiptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptWhereInput;
    orderBy?: Prisma.MaterialReceiptOrderByWithRelationInput | Prisma.MaterialReceiptOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialReceiptCountAggregateInputType;
    _min?: MaterialReceiptMinAggregateInputType;
    _max?: MaterialReceiptMaxAggregateInputType;
};
export type GetMaterialReceiptAggregateType<T extends MaterialReceiptAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialReceipt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialReceipt[P]> : Prisma.GetScalarType<T[P], AggregateMaterialReceipt[P]>;
};
export type MaterialReceiptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptWhereInput;
    orderBy?: Prisma.MaterialReceiptOrderByWithAggregationInput | Prisma.MaterialReceiptOrderByWithAggregationInput[];
    by: Prisma.MaterialReceiptScalarFieldEnum[] | Prisma.MaterialReceiptScalarFieldEnum;
    having?: Prisma.MaterialReceiptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialReceiptCountAggregateInputType | true;
    _min?: MaterialReceiptMinAggregateInputType;
    _max?: MaterialReceiptMaxAggregateInputType;
};
export type MaterialReceiptGroupByOutputType = {
    id: string;
    code: string;
    receivedAt: Date;
    status: string;
    note: string | null;
    supplierId: string;
    createdById: string;
    _count: MaterialReceiptCountAggregateOutputType | null;
    _min: MaterialReceiptMinAggregateOutputType | null;
    _max: MaterialReceiptMaxAggregateOutputType | null;
};
export type GetMaterialReceiptGroupByPayload<T extends MaterialReceiptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialReceiptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialReceiptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialReceiptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialReceiptGroupByOutputType[P]>;
}>>;
export type MaterialReceiptWhereInput = {
    AND?: Prisma.MaterialReceiptWhereInput | Prisma.MaterialReceiptWhereInput[];
    OR?: Prisma.MaterialReceiptWhereInput[];
    NOT?: Prisma.MaterialReceiptWhereInput | Prisma.MaterialReceiptWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReceipt"> | string;
    code?: Prisma.StringFilter<"MaterialReceipt"> | string;
    receivedAt?: Prisma.DateTimeFilter<"MaterialReceipt"> | Date | string;
    status?: Prisma.StringFilter<"MaterialReceipt"> | string;
    note?: Prisma.StringNullableFilter<"MaterialReceipt"> | string | null;
    supplierId?: Prisma.UuidFilter<"MaterialReceipt"> | string;
    createdById?: Prisma.UuidFilter<"MaterialReceipt"> | string;
    supplier?: Prisma.XOR<Prisma.SupplierScalarRelationFilter, Prisma.SupplierWhereInput>;
    createdBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.MaterialReceiptLineListRelationFilter;
};
export type MaterialReceiptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    supplier?: Prisma.SupplierOrderByWithRelationInput;
    createdBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.MaterialReceiptLineOrderByRelationAggregateInput;
};
export type MaterialReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.MaterialReceiptWhereInput | Prisma.MaterialReceiptWhereInput[];
    OR?: Prisma.MaterialReceiptWhereInput[];
    NOT?: Prisma.MaterialReceiptWhereInput | Prisma.MaterialReceiptWhereInput[];
    receivedAt?: Prisma.DateTimeFilter<"MaterialReceipt"> | Date | string;
    status?: Prisma.StringFilter<"MaterialReceipt"> | string;
    note?: Prisma.StringNullableFilter<"MaterialReceipt"> | string | null;
    supplierId?: Prisma.UuidFilter<"MaterialReceipt"> | string;
    createdById?: Prisma.UuidFilter<"MaterialReceipt"> | string;
    supplier?: Prisma.XOR<Prisma.SupplierScalarRelationFilter, Prisma.SupplierWhereInput>;
    createdBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.MaterialReceiptLineListRelationFilter;
}, "id" | "code">;
export type MaterialReceiptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    _count?: Prisma.MaterialReceiptCountOrderByAggregateInput;
    _max?: Prisma.MaterialReceiptMaxOrderByAggregateInput;
    _min?: Prisma.MaterialReceiptMinOrderByAggregateInput;
};
export type MaterialReceiptScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialReceiptScalarWhereWithAggregatesInput | Prisma.MaterialReceiptScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialReceiptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialReceiptScalarWhereWithAggregatesInput | Prisma.MaterialReceiptScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialReceipt"> | string;
    code?: Prisma.StringWithAggregatesFilter<"MaterialReceipt"> | string;
    receivedAt?: Prisma.DateTimeWithAggregatesFilter<"MaterialReceipt"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"MaterialReceipt"> | string;
    note?: Prisma.StringNullableWithAggregatesFilter<"MaterialReceipt"> | string | null;
    supplierId?: Prisma.UuidWithAggregatesFilter<"MaterialReceipt"> | string;
    createdById?: Prisma.UuidWithAggregatesFilter<"MaterialReceipt"> | string;
};
export type MaterialReceiptCreateInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplier: Prisma.SupplierCreateNestedOneWithoutReceiptsInput;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedReceiptsInput;
    lines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutReceiptInput;
};
export type MaterialReceiptUncheckedCreateInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplierId: string;
    createdById: string;
    lines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutReceiptInput;
};
export type MaterialReceiptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutReceiptsNestedInput;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedReceiptsNestedInput;
    lines?: Prisma.MaterialReceiptLineUpdateManyWithoutReceiptNestedInput;
};
export type MaterialReceiptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type MaterialReceiptCreateManyInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplierId: string;
    createdById: string;
};
export type MaterialReceiptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialReceiptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptListRelationFilter = {
    every?: Prisma.MaterialReceiptWhereInput;
    some?: Prisma.MaterialReceiptWhereInput;
    none?: Prisma.MaterialReceiptWhereInput;
};
export type MaterialReceiptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialReceiptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type MaterialReceiptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type MaterialReceiptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type MaterialReceiptScalarRelationFilter = {
    is?: Prisma.MaterialReceiptWhereInput;
    isNot?: Prisma.MaterialReceiptWhereInput;
};
export type MaterialReceiptCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput> | Prisma.MaterialReceiptCreateWithoutCreatedByInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput | Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.MaterialReceiptCreateManyCreatedByInputEnvelope;
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
};
export type MaterialReceiptUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput> | Prisma.MaterialReceiptCreateWithoutCreatedByInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput | Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.MaterialReceiptCreateManyCreatedByInputEnvelope;
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
};
export type MaterialReceiptUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput> | Prisma.MaterialReceiptCreateWithoutCreatedByInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput | Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.MaterialReceiptCreateManyCreatedByInputEnvelope;
    set?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    update?: Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.MaterialReceiptUpdateManyWithWhereWithoutCreatedByInput | Prisma.MaterialReceiptUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.MaterialReceiptScalarWhereInput | Prisma.MaterialReceiptScalarWhereInput[];
};
export type MaterialReceiptUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput> | Prisma.MaterialReceiptCreateWithoutCreatedByInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput | Prisma.MaterialReceiptCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.MaterialReceiptCreateManyCreatedByInputEnvelope;
    set?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    update?: Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.MaterialReceiptUpdateManyWithWhereWithoutCreatedByInput | Prisma.MaterialReceiptUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.MaterialReceiptScalarWhereInput | Prisma.MaterialReceiptScalarWhereInput[];
};
export type MaterialReceiptCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput> | Prisma.MaterialReceiptCreateWithoutSupplierInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput | Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.MaterialReceiptCreateManySupplierInputEnvelope;
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
};
export type MaterialReceiptUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput> | Prisma.MaterialReceiptCreateWithoutSupplierInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput | Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.MaterialReceiptCreateManySupplierInputEnvelope;
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
};
export type MaterialReceiptUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput> | Prisma.MaterialReceiptCreateWithoutSupplierInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput | Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutSupplierInput | Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.MaterialReceiptCreateManySupplierInputEnvelope;
    set?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    update?: Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutSupplierInput | Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.MaterialReceiptUpdateManyWithWhereWithoutSupplierInput | Prisma.MaterialReceiptUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.MaterialReceiptScalarWhereInput | Prisma.MaterialReceiptScalarWhereInput[];
};
export type MaterialReceiptUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput> | Prisma.MaterialReceiptCreateWithoutSupplierInput[] | Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput | Prisma.MaterialReceiptCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutSupplierInput | Prisma.MaterialReceiptUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.MaterialReceiptCreateManySupplierInputEnvelope;
    set?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    disconnect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    delete?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    connect?: Prisma.MaterialReceiptWhereUniqueInput | Prisma.MaterialReceiptWhereUniqueInput[];
    update?: Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutSupplierInput | Prisma.MaterialReceiptUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.MaterialReceiptUpdateManyWithWhereWithoutSupplierInput | Prisma.MaterialReceiptUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.MaterialReceiptScalarWhereInput | Prisma.MaterialReceiptScalarWhereInput[];
};
export type MaterialReceiptCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutLinesInput, Prisma.MaterialReceiptUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutLinesInput;
    connect?: Prisma.MaterialReceiptWhereUniqueInput;
};
export type MaterialReceiptUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutLinesInput, Prisma.MaterialReceiptUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.MaterialReceiptCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.MaterialReceiptUpsertWithoutLinesInput;
    connect?: Prisma.MaterialReceiptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialReceiptUpdateToOneWithWhereWithoutLinesInput, Prisma.MaterialReceiptUpdateWithoutLinesInput>, Prisma.MaterialReceiptUncheckedUpdateWithoutLinesInput>;
};
export type MaterialReceiptCreateWithoutCreatedByInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplier: Prisma.SupplierCreateNestedOneWithoutReceiptsInput;
    lines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutReceiptInput;
};
export type MaterialReceiptUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplierId: string;
    lines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutReceiptInput;
};
export type MaterialReceiptCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.MaterialReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput>;
};
export type MaterialReceiptCreateManyCreatedByInputEnvelope = {
    data: Prisma.MaterialReceiptCreateManyCreatedByInput | Prisma.MaterialReceiptCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type MaterialReceiptUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.MaterialReceiptWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReceiptUpdateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedCreateWithoutCreatedByInput>;
};
export type MaterialReceiptUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.MaterialReceiptWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateWithoutCreatedByInput, Prisma.MaterialReceiptUncheckedUpdateWithoutCreatedByInput>;
};
export type MaterialReceiptUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.MaterialReceiptScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateManyMutationInput, Prisma.MaterialReceiptUncheckedUpdateManyWithoutCreatedByInput>;
};
export type MaterialReceiptScalarWhereInput = {
    AND?: Prisma.MaterialReceiptScalarWhereInput | Prisma.MaterialReceiptScalarWhereInput[];
    OR?: Prisma.MaterialReceiptScalarWhereInput[];
    NOT?: Prisma.MaterialReceiptScalarWhereInput | Prisma.MaterialReceiptScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialReceipt"> | string;
    code?: Prisma.StringFilter<"MaterialReceipt"> | string;
    receivedAt?: Prisma.DateTimeFilter<"MaterialReceipt"> | Date | string;
    status?: Prisma.StringFilter<"MaterialReceipt"> | string;
    note?: Prisma.StringNullableFilter<"MaterialReceipt"> | string | null;
    supplierId?: Prisma.UuidFilter<"MaterialReceipt"> | string;
    createdById?: Prisma.UuidFilter<"MaterialReceipt"> | string;
};
export type MaterialReceiptCreateWithoutSupplierInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedReceiptsInput;
    lines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutReceiptInput;
};
export type MaterialReceiptUncheckedCreateWithoutSupplierInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    createdById: string;
    lines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutReceiptInput;
};
export type MaterialReceiptCreateOrConnectWithoutSupplierInput = {
    where: Prisma.MaterialReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput>;
};
export type MaterialReceiptCreateManySupplierInputEnvelope = {
    data: Prisma.MaterialReceiptCreateManySupplierInput | Prisma.MaterialReceiptCreateManySupplierInput[];
    skipDuplicates?: boolean;
};
export type MaterialReceiptUpsertWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.MaterialReceiptWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialReceiptUpdateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedUpdateWithoutSupplierInput>;
    create: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedCreateWithoutSupplierInput>;
};
export type MaterialReceiptUpdateWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.MaterialReceiptWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateWithoutSupplierInput, Prisma.MaterialReceiptUncheckedUpdateWithoutSupplierInput>;
};
export type MaterialReceiptUpdateManyWithWhereWithoutSupplierInput = {
    where: Prisma.MaterialReceiptScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateManyMutationInput, Prisma.MaterialReceiptUncheckedUpdateManyWithoutSupplierInput>;
};
export type MaterialReceiptCreateWithoutLinesInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplier: Prisma.SupplierCreateNestedOneWithoutReceiptsInput;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedReceiptsInput;
};
export type MaterialReceiptUncheckedCreateWithoutLinesInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplierId: string;
    createdById: string;
};
export type MaterialReceiptCreateOrConnectWithoutLinesInput = {
    where: Prisma.MaterialReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutLinesInput, Prisma.MaterialReceiptUncheckedCreateWithoutLinesInput>;
};
export type MaterialReceiptUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.MaterialReceiptUpdateWithoutLinesInput, Prisma.MaterialReceiptUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.MaterialReceiptCreateWithoutLinesInput, Prisma.MaterialReceiptUncheckedCreateWithoutLinesInput>;
    where?: Prisma.MaterialReceiptWhereInput;
};
export type MaterialReceiptUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.MaterialReceiptWhereInput;
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateWithoutLinesInput, Prisma.MaterialReceiptUncheckedUpdateWithoutLinesInput>;
};
export type MaterialReceiptUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutReceiptsNestedInput;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedReceiptsNestedInput;
};
export type MaterialReceiptUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptCreateManyCreatedByInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    supplierId: string;
};
export type MaterialReceiptUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutReceiptsNestedInput;
    lines?: Prisma.MaterialReceiptLineUpdateManyWithoutReceiptNestedInput;
};
export type MaterialReceiptUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type MaterialReceiptUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptCreateManySupplierInput = {
    id?: string;
    code: string;
    receivedAt?: Date | string;
    status?: string;
    note?: string | null;
    createdById: string;
};
export type MaterialReceiptUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedReceiptsNestedInput;
    lines?: Prisma.MaterialReceiptLineUpdateManyWithoutReceiptNestedInput;
};
export type MaterialReceiptUncheckedUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type MaterialReceiptUncheckedUpdateManyWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialReceiptCountOutputType = {
    lines: number;
};
export type MaterialReceiptCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | MaterialReceiptCountOutputTypeCountLinesArgs;
};
export type MaterialReceiptCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptCountOutputTypeSelect<ExtArgs> | null;
};
export type MaterialReceiptCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptLineWhereInput;
};
export type MaterialReceiptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    receivedAt?: boolean;
    status?: boolean;
    note?: boolean;
    supplierId?: boolean;
    createdById?: boolean;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.MaterialReceipt$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialReceiptCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReceipt"]>;
export type MaterialReceiptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    receivedAt?: boolean;
    status?: boolean;
    note?: boolean;
    supplierId?: boolean;
    createdById?: boolean;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReceipt"]>;
export type MaterialReceiptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    receivedAt?: boolean;
    status?: boolean;
    note?: boolean;
    supplierId?: boolean;
    createdById?: boolean;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialReceipt"]>;
export type MaterialReceiptSelectScalar = {
    id?: boolean;
    code?: boolean;
    receivedAt?: boolean;
    status?: boolean;
    note?: boolean;
    supplierId?: boolean;
    createdById?: boolean;
};
export type MaterialReceiptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "receivedAt" | "status" | "note" | "supplierId" | "createdById", ExtArgs["result"]["materialReceipt"]>;
export type MaterialReceiptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.MaterialReceipt$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialReceiptCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaterialReceiptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type MaterialReceiptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $MaterialReceiptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialReceipt";
    objects: {
        supplier: Prisma.$SupplierPayload<ExtArgs>;
        createdBy: Prisma.$EmployeePayload<ExtArgs>;
        lines: Prisma.$MaterialReceiptLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        receivedAt: Date;
        status: string;
        note: string | null;
        supplierId: string;
        createdById: string;
    }, ExtArgs["result"]["materialReceipt"]>;
    composites: {};
};
export type MaterialReceiptGetPayload<S extends boolean | null | undefined | MaterialReceiptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload, S>;
export type MaterialReceiptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialReceiptCountAggregateInputType | true;
};
export interface MaterialReceiptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialReceipt'];
        meta: {
            name: 'MaterialReceipt';
        };
    };
    findUnique<T extends MaterialReceiptFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialReceiptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialReceiptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialReceiptFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialReceiptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialReceiptFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialReceiptCreateArgs>(args: Prisma.SelectSubset<T, MaterialReceiptCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialReceiptCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialReceiptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialReceiptDeleteArgs>(args: Prisma.SelectSubset<T, MaterialReceiptDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialReceiptUpdateArgs>(args: Prisma.SelectSubset<T, MaterialReceiptUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialReceiptDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialReceiptUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialReceiptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialReceiptUpsertArgs>(args: Prisma.SelectSubset<T, MaterialReceiptUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialReceiptCountArgs>(args?: Prisma.Subset<T, MaterialReceiptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialReceiptCountAggregateOutputType> : number>;
    aggregate<T extends MaterialReceiptAggregateArgs>(args: Prisma.Subset<T, MaterialReceiptAggregateArgs>): Prisma.PrismaPromise<GetMaterialReceiptAggregateType<T>>;
    groupBy<T extends MaterialReceiptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialReceiptGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialReceiptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialReceiptFieldRefs;
}
export interface Prisma__MaterialReceiptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    supplier<T extends Prisma.SupplierDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SupplierDefaultArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.MaterialReceipt$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialReceipt$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialReceiptFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialReceipt", 'String'>;
    readonly code: Prisma.FieldRef<"MaterialReceipt", 'String'>;
    readonly receivedAt: Prisma.FieldRef<"MaterialReceipt", 'DateTime'>;
    readonly status: Prisma.FieldRef<"MaterialReceipt", 'String'>;
    readonly note: Prisma.FieldRef<"MaterialReceipt", 'String'>;
    readonly supplierId: Prisma.FieldRef<"MaterialReceipt", 'String'>;
    readonly createdById: Prisma.FieldRef<"MaterialReceipt", 'String'>;
}
export type MaterialReceiptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptWhereUniqueInput;
};
export type MaterialReceiptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptWhereUniqueInput;
};
export type MaterialReceiptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptWhereInput;
    orderBy?: Prisma.MaterialReceiptOrderByWithRelationInput | Prisma.MaterialReceiptOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReceiptScalarFieldEnum | Prisma.MaterialReceiptScalarFieldEnum[];
};
export type MaterialReceiptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptWhereInput;
    orderBy?: Prisma.MaterialReceiptOrderByWithRelationInput | Prisma.MaterialReceiptOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReceiptScalarFieldEnum | Prisma.MaterialReceiptScalarFieldEnum[];
};
export type MaterialReceiptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptWhereInput;
    orderBy?: Prisma.MaterialReceiptOrderByWithRelationInput | Prisma.MaterialReceiptOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReceiptScalarFieldEnum | Prisma.MaterialReceiptScalarFieldEnum[];
};
export type MaterialReceiptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReceiptCreateInput, Prisma.MaterialReceiptUncheckedCreateInput>;
};
export type MaterialReceiptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialReceiptCreateManyInput | Prisma.MaterialReceiptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialReceiptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    data: Prisma.MaterialReceiptCreateManyInput | Prisma.MaterialReceiptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialReceiptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialReceiptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateInput, Prisma.MaterialReceiptUncheckedUpdateInput>;
    where: Prisma.MaterialReceiptWhereUniqueInput;
};
export type MaterialReceiptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateManyMutationInput, Prisma.MaterialReceiptUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReceiptWhereInput;
    limit?: number;
};
export type MaterialReceiptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialReceiptUpdateManyMutationInput, Prisma.MaterialReceiptUncheckedUpdateManyInput>;
    where?: Prisma.MaterialReceiptWhereInput;
    limit?: number;
    include?: Prisma.MaterialReceiptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialReceiptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialReceiptCreateInput, Prisma.MaterialReceiptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialReceiptUpdateInput, Prisma.MaterialReceiptUncheckedUpdateInput>;
};
export type MaterialReceiptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where: Prisma.MaterialReceiptWhereUniqueInput;
};
export type MaterialReceiptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptWhereInput;
    limit?: number;
};
export type MaterialReceipt$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialReceiptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
};
