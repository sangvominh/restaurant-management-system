import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BomModel = runtime.Types.Result.DefaultSelection<Prisma.$BomPayload>;
export type AggregateBom = {
    _count: BomCountAggregateOutputType | null;
    _avg: BomAvgAggregateOutputType | null;
    _sum: BomSumAggregateOutputType | null;
    _min: BomMinAggregateOutputType | null;
    _max: BomMaxAggregateOutputType | null;
};
export type BomAvgAggregateOutputType = {
    version: number | null;
    outputQuantity: runtime.Decimal | null;
};
export type BomSumAggregateOutputType = {
    version: number | null;
    outputQuantity: runtime.Decimal | null;
};
export type BomMinAggregateOutputType = {
    id: string | null;
    version: number | null;
    outputQuantity: runtime.Decimal | null;
    effectiveAt: Date | null;
    status: string | null;
    productId: string | null;
    createdById: string | null;
};
export type BomMaxAggregateOutputType = {
    id: string | null;
    version: number | null;
    outputQuantity: runtime.Decimal | null;
    effectiveAt: Date | null;
    status: string | null;
    productId: string | null;
    createdById: string | null;
};
export type BomCountAggregateOutputType = {
    id: number;
    version: number;
    outputQuantity: number;
    effectiveAt: number;
    status: number;
    productId: number;
    createdById: number;
    _all: number;
};
export type BomAvgAggregateInputType = {
    version?: true;
    outputQuantity?: true;
};
export type BomSumAggregateInputType = {
    version?: true;
    outputQuantity?: true;
};
export type BomMinAggregateInputType = {
    id?: true;
    version?: true;
    outputQuantity?: true;
    effectiveAt?: true;
    status?: true;
    productId?: true;
    createdById?: true;
};
export type BomMaxAggregateInputType = {
    id?: true;
    version?: true;
    outputQuantity?: true;
    effectiveAt?: true;
    status?: true;
    productId?: true;
    createdById?: true;
};
export type BomCountAggregateInputType = {
    id?: true;
    version?: true;
    outputQuantity?: true;
    effectiveAt?: true;
    status?: true;
    productId?: true;
    createdById?: true;
    _all?: true;
};
export type BomAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomWhereInput;
    orderBy?: Prisma.BomOrderByWithRelationInput | Prisma.BomOrderByWithRelationInput[];
    cursor?: Prisma.BomWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BomCountAggregateInputType;
    _avg?: BomAvgAggregateInputType;
    _sum?: BomSumAggregateInputType;
    _min?: BomMinAggregateInputType;
    _max?: BomMaxAggregateInputType;
};
export type GetBomAggregateType<T extends BomAggregateArgs> = {
    [P in keyof T & keyof AggregateBom]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBom[P]> : Prisma.GetScalarType<T[P], AggregateBom[P]>;
};
export type BomGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomWhereInput;
    orderBy?: Prisma.BomOrderByWithAggregationInput | Prisma.BomOrderByWithAggregationInput[];
    by: Prisma.BomScalarFieldEnum[] | Prisma.BomScalarFieldEnum;
    having?: Prisma.BomScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BomCountAggregateInputType | true;
    _avg?: BomAvgAggregateInputType;
    _sum?: BomSumAggregateInputType;
    _min?: BomMinAggregateInputType;
    _max?: BomMaxAggregateInputType;
};
export type BomGroupByOutputType = {
    id: string;
    version: number;
    outputQuantity: runtime.Decimal;
    effectiveAt: Date;
    status: string;
    productId: string;
    createdById: string;
    _count: BomCountAggregateOutputType | null;
    _avg: BomAvgAggregateOutputType | null;
    _sum: BomSumAggregateOutputType | null;
    _min: BomMinAggregateOutputType | null;
    _max: BomMaxAggregateOutputType | null;
};
export type GetBomGroupByPayload<T extends BomGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BomGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BomGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BomGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BomGroupByOutputType[P]>;
}>>;
export type BomWhereInput = {
    AND?: Prisma.BomWhereInput | Prisma.BomWhereInput[];
    OR?: Prisma.BomWhereInput[];
    NOT?: Prisma.BomWhereInput | Prisma.BomWhereInput[];
    id?: Prisma.UuidFilter<"Bom"> | string;
    version?: Prisma.IntFilter<"Bom"> | number;
    outputQuantity?: Prisma.DecimalFilter<"Bom"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFilter<"Bom"> | Date | string;
    status?: Prisma.StringFilter<"Bom"> | string;
    productId?: Prisma.UuidFilter<"Bom"> | string;
    createdById?: Prisma.UuidFilter<"Bom"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    createdBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.BomLineListRelationFilter;
    productionOrders?: Prisma.ProductionOrderListRelationFilter;
};
export type BomOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    outputQuantity?: Prisma.SortOrder;
    effectiveAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    createdBy?: Prisma.EmployeeOrderByWithRelationInput;
    lines?: Prisma.BomLineOrderByRelationAggregateInput;
    productionOrders?: Prisma.ProductionOrderOrderByRelationAggregateInput;
};
export type BomWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    productId_version?: Prisma.BomProductIdVersionCompoundUniqueInput;
    AND?: Prisma.BomWhereInput | Prisma.BomWhereInput[];
    OR?: Prisma.BomWhereInput[];
    NOT?: Prisma.BomWhereInput | Prisma.BomWhereInput[];
    version?: Prisma.IntFilter<"Bom"> | number;
    outputQuantity?: Prisma.DecimalFilter<"Bom"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFilter<"Bom"> | Date | string;
    status?: Prisma.StringFilter<"Bom"> | string;
    productId?: Prisma.UuidFilter<"Bom"> | string;
    createdById?: Prisma.UuidFilter<"Bom"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    createdBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    lines?: Prisma.BomLineListRelationFilter;
    productionOrders?: Prisma.ProductionOrderListRelationFilter;
}, "id" | "productId_version">;
export type BomOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    outputQuantity?: Prisma.SortOrder;
    effectiveAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    _count?: Prisma.BomCountOrderByAggregateInput;
    _avg?: Prisma.BomAvgOrderByAggregateInput;
    _max?: Prisma.BomMaxOrderByAggregateInput;
    _min?: Prisma.BomMinOrderByAggregateInput;
    _sum?: Prisma.BomSumOrderByAggregateInput;
};
export type BomScalarWhereWithAggregatesInput = {
    AND?: Prisma.BomScalarWhereWithAggregatesInput | Prisma.BomScalarWhereWithAggregatesInput[];
    OR?: Prisma.BomScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BomScalarWhereWithAggregatesInput | Prisma.BomScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Bom"> | string;
    version?: Prisma.IntWithAggregatesFilter<"Bom"> | number;
    outputQuantity?: Prisma.DecimalWithAggregatesFilter<"Bom"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeWithAggregatesFilter<"Bom"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"Bom"> | string;
    productId?: Prisma.UuidWithAggregatesFilter<"Bom"> | string;
    createdById?: Prisma.UuidWithAggregatesFilter<"Bom"> | string;
};
export type BomCreateInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    product: Prisma.ProductCreateNestedOneWithoutBomsInput;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedBomsInput;
    lines?: Prisma.BomLineCreateNestedManyWithoutBomInput;
    productionOrders?: Prisma.ProductionOrderCreateNestedManyWithoutBomInput;
};
export type BomUncheckedCreateInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    productId: string;
    createdById: string;
    lines?: Prisma.BomLineUncheckedCreateNestedManyWithoutBomInput;
    productionOrders?: Prisma.ProductionOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BomUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutBomsNestedInput;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedBomsNestedInput;
    lines?: Prisma.BomLineUpdateManyWithoutBomNestedInput;
    productionOrders?: Prisma.ProductionOrderUpdateManyWithoutBomNestedInput;
};
export type BomUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.BomLineUncheckedUpdateManyWithoutBomNestedInput;
    productionOrders?: Prisma.ProductionOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BomCreateManyInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    productId: string;
    createdById: string;
};
export type BomUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomListRelationFilter = {
    every?: Prisma.BomWhereInput;
    some?: Prisma.BomWhereInput;
    none?: Prisma.BomWhereInput;
};
export type BomOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BomProductIdVersionCompoundUniqueInput = {
    productId: string;
    version: number;
};
export type BomCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    outputQuantity?: Prisma.SortOrder;
    effectiveAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type BomAvgOrderByAggregateInput = {
    version?: Prisma.SortOrder;
    outputQuantity?: Prisma.SortOrder;
};
export type BomMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    outputQuantity?: Prisma.SortOrder;
    effectiveAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type BomMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    outputQuantity?: Prisma.SortOrder;
    effectiveAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
};
export type BomSumOrderByAggregateInput = {
    version?: Prisma.SortOrder;
    outputQuantity?: Prisma.SortOrder;
};
export type BomScalarRelationFilter = {
    is?: Prisma.BomWhereInput;
    isNot?: Prisma.BomWhereInput;
};
export type BomCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutCreatedByInput, Prisma.BomUncheckedCreateWithoutCreatedByInput> | Prisma.BomCreateWithoutCreatedByInput[] | Prisma.BomUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutCreatedByInput | Prisma.BomCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.BomCreateManyCreatedByInputEnvelope;
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
};
export type BomUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutCreatedByInput, Prisma.BomUncheckedCreateWithoutCreatedByInput> | Prisma.BomCreateWithoutCreatedByInput[] | Prisma.BomUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutCreatedByInput | Prisma.BomCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.BomCreateManyCreatedByInputEnvelope;
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
};
export type BomUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutCreatedByInput, Prisma.BomUncheckedCreateWithoutCreatedByInput> | Prisma.BomCreateWithoutCreatedByInput[] | Prisma.BomUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutCreatedByInput | Prisma.BomCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.BomUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.BomUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.BomCreateManyCreatedByInputEnvelope;
    set?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    disconnect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    delete?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    update?: Prisma.BomUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.BomUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.BomUpdateManyWithWhereWithoutCreatedByInput | Prisma.BomUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.BomScalarWhereInput | Prisma.BomScalarWhereInput[];
};
export type BomUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutCreatedByInput, Prisma.BomUncheckedCreateWithoutCreatedByInput> | Prisma.BomCreateWithoutCreatedByInput[] | Prisma.BomUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutCreatedByInput | Prisma.BomCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.BomUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.BomUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.BomCreateManyCreatedByInputEnvelope;
    set?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    disconnect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    delete?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    update?: Prisma.BomUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.BomUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.BomUpdateManyWithWhereWithoutCreatedByInput | Prisma.BomUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.BomScalarWhereInput | Prisma.BomScalarWhereInput[];
};
export type BomCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutProductInput, Prisma.BomUncheckedCreateWithoutProductInput> | Prisma.BomCreateWithoutProductInput[] | Prisma.BomUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutProductInput | Prisma.BomCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.BomCreateManyProductInputEnvelope;
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
};
export type BomUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutProductInput, Prisma.BomUncheckedCreateWithoutProductInput> | Prisma.BomCreateWithoutProductInput[] | Prisma.BomUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutProductInput | Prisma.BomCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.BomCreateManyProductInputEnvelope;
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
};
export type BomUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutProductInput, Prisma.BomUncheckedCreateWithoutProductInput> | Prisma.BomCreateWithoutProductInput[] | Prisma.BomUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutProductInput | Prisma.BomCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.BomUpsertWithWhereUniqueWithoutProductInput | Prisma.BomUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.BomCreateManyProductInputEnvelope;
    set?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    disconnect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    delete?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    update?: Prisma.BomUpdateWithWhereUniqueWithoutProductInput | Prisma.BomUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.BomUpdateManyWithWhereWithoutProductInput | Prisma.BomUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.BomScalarWhereInput | Prisma.BomScalarWhereInput[];
};
export type BomUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutProductInput, Prisma.BomUncheckedCreateWithoutProductInput> | Prisma.BomCreateWithoutProductInput[] | Prisma.BomUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutProductInput | Prisma.BomCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.BomUpsertWithWhereUniqueWithoutProductInput | Prisma.BomUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.BomCreateManyProductInputEnvelope;
    set?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    disconnect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    delete?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    connect?: Prisma.BomWhereUniqueInput | Prisma.BomWhereUniqueInput[];
    update?: Prisma.BomUpdateWithWhereUniqueWithoutProductInput | Prisma.BomUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.BomUpdateManyWithWhereWithoutProductInput | Prisma.BomUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.BomScalarWhereInput | Prisma.BomScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BomCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutLinesInput, Prisma.BomUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutLinesInput;
    connect?: Prisma.BomWhereUniqueInput;
};
export type BomUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutLinesInput, Prisma.BomUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.BomUpsertWithoutLinesInput;
    connect?: Prisma.BomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BomUpdateToOneWithWhereWithoutLinesInput, Prisma.BomUpdateWithoutLinesInput>, Prisma.BomUncheckedUpdateWithoutLinesInput>;
};
export type BomCreateNestedOneWithoutProductionOrdersInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutProductionOrdersInput, Prisma.BomUncheckedCreateWithoutProductionOrdersInput>;
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutProductionOrdersInput;
    connect?: Prisma.BomWhereUniqueInput;
};
export type BomUpdateOneRequiredWithoutProductionOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.BomCreateWithoutProductionOrdersInput, Prisma.BomUncheckedCreateWithoutProductionOrdersInput>;
    connectOrCreate?: Prisma.BomCreateOrConnectWithoutProductionOrdersInput;
    upsert?: Prisma.BomUpsertWithoutProductionOrdersInput;
    connect?: Prisma.BomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BomUpdateToOneWithWhereWithoutProductionOrdersInput, Prisma.BomUpdateWithoutProductionOrdersInput>, Prisma.BomUncheckedUpdateWithoutProductionOrdersInput>;
};
export type BomCreateWithoutCreatedByInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    product: Prisma.ProductCreateNestedOneWithoutBomsInput;
    lines?: Prisma.BomLineCreateNestedManyWithoutBomInput;
    productionOrders?: Prisma.ProductionOrderCreateNestedManyWithoutBomInput;
};
export type BomUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    productId: string;
    lines?: Prisma.BomLineUncheckedCreateNestedManyWithoutBomInput;
    productionOrders?: Prisma.ProductionOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BomCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.BomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomCreateWithoutCreatedByInput, Prisma.BomUncheckedCreateWithoutCreatedByInput>;
};
export type BomCreateManyCreatedByInputEnvelope = {
    data: Prisma.BomCreateManyCreatedByInput | Prisma.BomCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type BomUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.BomWhereUniqueInput;
    update: Prisma.XOR<Prisma.BomUpdateWithoutCreatedByInput, Prisma.BomUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.BomCreateWithoutCreatedByInput, Prisma.BomUncheckedCreateWithoutCreatedByInput>;
};
export type BomUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.BomWhereUniqueInput;
    data: Prisma.XOR<Prisma.BomUpdateWithoutCreatedByInput, Prisma.BomUncheckedUpdateWithoutCreatedByInput>;
};
export type BomUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.BomScalarWhereInput;
    data: Prisma.XOR<Prisma.BomUpdateManyMutationInput, Prisma.BomUncheckedUpdateManyWithoutCreatedByInput>;
};
export type BomScalarWhereInput = {
    AND?: Prisma.BomScalarWhereInput | Prisma.BomScalarWhereInput[];
    OR?: Prisma.BomScalarWhereInput[];
    NOT?: Prisma.BomScalarWhereInput | Prisma.BomScalarWhereInput[];
    id?: Prisma.UuidFilter<"Bom"> | string;
    version?: Prisma.IntFilter<"Bom"> | number;
    outputQuantity?: Prisma.DecimalFilter<"Bom"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFilter<"Bom"> | Date | string;
    status?: Prisma.StringFilter<"Bom"> | string;
    productId?: Prisma.UuidFilter<"Bom"> | string;
    createdById?: Prisma.UuidFilter<"Bom"> | string;
};
export type BomCreateWithoutProductInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedBomsInput;
    lines?: Prisma.BomLineCreateNestedManyWithoutBomInput;
    productionOrders?: Prisma.ProductionOrderCreateNestedManyWithoutBomInput;
};
export type BomUncheckedCreateWithoutProductInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    createdById: string;
    lines?: Prisma.BomLineUncheckedCreateNestedManyWithoutBomInput;
    productionOrders?: Prisma.ProductionOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BomCreateOrConnectWithoutProductInput = {
    where: Prisma.BomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomCreateWithoutProductInput, Prisma.BomUncheckedCreateWithoutProductInput>;
};
export type BomCreateManyProductInputEnvelope = {
    data: Prisma.BomCreateManyProductInput | Prisma.BomCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type BomUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.BomWhereUniqueInput;
    update: Prisma.XOR<Prisma.BomUpdateWithoutProductInput, Prisma.BomUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.BomCreateWithoutProductInput, Prisma.BomUncheckedCreateWithoutProductInput>;
};
export type BomUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.BomWhereUniqueInput;
    data: Prisma.XOR<Prisma.BomUpdateWithoutProductInput, Prisma.BomUncheckedUpdateWithoutProductInput>;
};
export type BomUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.BomScalarWhereInput;
    data: Prisma.XOR<Prisma.BomUpdateManyMutationInput, Prisma.BomUncheckedUpdateManyWithoutProductInput>;
};
export type BomCreateWithoutLinesInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    product: Prisma.ProductCreateNestedOneWithoutBomsInput;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedBomsInput;
    productionOrders?: Prisma.ProductionOrderCreateNestedManyWithoutBomInput;
};
export type BomUncheckedCreateWithoutLinesInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    productId: string;
    createdById: string;
    productionOrders?: Prisma.ProductionOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BomCreateOrConnectWithoutLinesInput = {
    where: Prisma.BomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomCreateWithoutLinesInput, Prisma.BomUncheckedCreateWithoutLinesInput>;
};
export type BomUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.BomUpdateWithoutLinesInput, Prisma.BomUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.BomCreateWithoutLinesInput, Prisma.BomUncheckedCreateWithoutLinesInput>;
    where?: Prisma.BomWhereInput;
};
export type BomUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.BomWhereInput;
    data: Prisma.XOR<Prisma.BomUpdateWithoutLinesInput, Prisma.BomUncheckedUpdateWithoutLinesInput>;
};
export type BomUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutBomsNestedInput;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedBomsNestedInput;
    productionOrders?: Prisma.ProductionOrderUpdateManyWithoutBomNestedInput;
};
export type BomUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    productionOrders?: Prisma.ProductionOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BomCreateWithoutProductionOrdersInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    product: Prisma.ProductCreateNestedOneWithoutBomsInput;
    createdBy: Prisma.EmployeeCreateNestedOneWithoutCreatedBomsInput;
    lines?: Prisma.BomLineCreateNestedManyWithoutBomInput;
};
export type BomUncheckedCreateWithoutProductionOrdersInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    productId: string;
    createdById: string;
    lines?: Prisma.BomLineUncheckedCreateNestedManyWithoutBomInput;
};
export type BomCreateOrConnectWithoutProductionOrdersInput = {
    where: Prisma.BomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomCreateWithoutProductionOrdersInput, Prisma.BomUncheckedCreateWithoutProductionOrdersInput>;
};
export type BomUpsertWithoutProductionOrdersInput = {
    update: Prisma.XOR<Prisma.BomUpdateWithoutProductionOrdersInput, Prisma.BomUncheckedUpdateWithoutProductionOrdersInput>;
    create: Prisma.XOR<Prisma.BomCreateWithoutProductionOrdersInput, Prisma.BomUncheckedCreateWithoutProductionOrdersInput>;
    where?: Prisma.BomWhereInput;
};
export type BomUpdateToOneWithWhereWithoutProductionOrdersInput = {
    where?: Prisma.BomWhereInput;
    data: Prisma.XOR<Prisma.BomUpdateWithoutProductionOrdersInput, Prisma.BomUncheckedUpdateWithoutProductionOrdersInput>;
};
export type BomUpdateWithoutProductionOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutBomsNestedInput;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedBomsNestedInput;
    lines?: Prisma.BomLineUpdateManyWithoutBomNestedInput;
};
export type BomUncheckedUpdateWithoutProductionOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.BomLineUncheckedUpdateManyWithoutBomNestedInput;
};
export type BomCreateManyCreatedByInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    productId: string;
};
export type BomUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutBomsNestedInput;
    lines?: Prisma.BomLineUpdateManyWithoutBomNestedInput;
    productionOrders?: Prisma.ProductionOrderUpdateManyWithoutBomNestedInput;
};
export type BomUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.BomLineUncheckedUpdateManyWithoutBomNestedInput;
    productionOrders?: Prisma.ProductionOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BomUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomCreateManyProductInput = {
    id?: string;
    version: number;
    outputQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt: Date | string;
    status?: string;
    createdById: string;
};
export type BomUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.EmployeeUpdateOneRequiredWithoutCreatedBomsNestedInput;
    lines?: Prisma.BomLineUpdateManyWithoutBomNestedInput;
    productionOrders?: Prisma.ProductionOrderUpdateManyWithoutBomNestedInput;
};
export type BomUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.BomLineUncheckedUpdateManyWithoutBomNestedInput;
    productionOrders?: Prisma.ProductionOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BomUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    outputQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    effectiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomCountOutputType = {
    lines: number;
    productionOrders: number;
};
export type BomCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | BomCountOutputTypeCountLinesArgs;
    productionOrders?: boolean | BomCountOutputTypeCountProductionOrdersArgs;
};
export type BomCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomCountOutputTypeSelect<ExtArgs> | null;
};
export type BomCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomLineWhereInput;
};
export type BomCountOutputTypeCountProductionOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionOrderWhereInput;
};
export type BomSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    outputQuantity?: boolean;
    effectiveAt?: boolean;
    status?: boolean;
    productId?: boolean;
    createdById?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Bom$linesArgs<ExtArgs>;
    productionOrders?: boolean | Prisma.Bom$productionOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.BomCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bom"]>;
export type BomSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    outputQuantity?: boolean;
    effectiveAt?: boolean;
    status?: boolean;
    productId?: boolean;
    createdById?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bom"]>;
export type BomSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    outputQuantity?: boolean;
    effectiveAt?: boolean;
    status?: boolean;
    productId?: boolean;
    createdById?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bom"]>;
export type BomSelectScalar = {
    id?: boolean;
    version?: boolean;
    outputQuantity?: boolean;
    effectiveAt?: boolean;
    status?: boolean;
    productId?: boolean;
    createdById?: boolean;
};
export type BomOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "version" | "outputQuantity" | "effectiveAt" | "status" | "productId" | "createdById", ExtArgs["result"]["bom"]>;
export type BomInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Bom$linesArgs<ExtArgs>;
    productionOrders?: boolean | Prisma.Bom$productionOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.BomCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BomIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type BomIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $BomPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bom";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        createdBy: Prisma.$EmployeePayload<ExtArgs>;
        lines: Prisma.$BomLinePayload<ExtArgs>[];
        productionOrders: Prisma.$ProductionOrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        version: number;
        outputQuantity: runtime.Decimal;
        effectiveAt: Date;
        status: string;
        productId: string;
        createdById: string;
    }, ExtArgs["result"]["bom"]>;
    composites: {};
};
export type BomGetPayload<S extends boolean | null | undefined | BomDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BomPayload, S>;
export type BomCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BomCountAggregateInputType | true;
};
export interface BomDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bom'];
        meta: {
            name: 'Bom';
        };
    };
    findUnique<T extends BomFindUniqueArgs>(args: Prisma.SelectSubset<T, BomFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BomFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BomFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BomFindFirstArgs>(args?: Prisma.SelectSubset<T, BomFindFirstArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BomFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BomFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BomFindManyArgs>(args?: Prisma.SelectSubset<T, BomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BomCreateArgs>(args: Prisma.SelectSubset<T, BomCreateArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BomCreateManyArgs>(args?: Prisma.SelectSubset<T, BomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BomCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BomDeleteArgs>(args: Prisma.SelectSubset<T, BomDeleteArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BomUpdateArgs>(args: Prisma.SelectSubset<T, BomUpdateArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BomDeleteManyArgs>(args?: Prisma.SelectSubset<T, BomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BomUpdateManyArgs>(args: Prisma.SelectSubset<T, BomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BomUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BomUpsertArgs>(args: Prisma.SelectSubset<T, BomUpsertArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BomCountArgs>(args?: Prisma.Subset<T, BomCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BomCountAggregateOutputType> : number>;
    aggregate<T extends BomAggregateArgs>(args: Prisma.Subset<T, BomAggregateArgs>): Prisma.PrismaPromise<GetBomAggregateType<T>>;
    groupBy<T extends BomGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BomGroupByArgs['orderBy'];
    } : {
        orderBy?: BomGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BomFieldRefs;
}
export interface Prisma__BomClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.Bom$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bom$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    productionOrders<T extends Prisma.Bom$productionOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bom$productionOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BomFieldRefs {
    readonly id: Prisma.FieldRef<"Bom", 'String'>;
    readonly version: Prisma.FieldRef<"Bom", 'Int'>;
    readonly outputQuantity: Prisma.FieldRef<"Bom", 'Decimal'>;
    readonly effectiveAt: Prisma.FieldRef<"Bom", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Bom", 'String'>;
    readonly productId: Prisma.FieldRef<"Bom", 'String'>;
    readonly createdById: Prisma.FieldRef<"Bom", 'String'>;
}
export type BomFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where: Prisma.BomWhereUniqueInput;
};
export type BomFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where: Prisma.BomWhereUniqueInput;
};
export type BomFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where?: Prisma.BomWhereInput;
    orderBy?: Prisma.BomOrderByWithRelationInput | Prisma.BomOrderByWithRelationInput[];
    cursor?: Prisma.BomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BomScalarFieldEnum | Prisma.BomScalarFieldEnum[];
};
export type BomFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where?: Prisma.BomWhereInput;
    orderBy?: Prisma.BomOrderByWithRelationInput | Prisma.BomOrderByWithRelationInput[];
    cursor?: Prisma.BomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BomScalarFieldEnum | Prisma.BomScalarFieldEnum[];
};
export type BomFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where?: Prisma.BomWhereInput;
    orderBy?: Prisma.BomOrderByWithRelationInput | Prisma.BomOrderByWithRelationInput[];
    cursor?: Prisma.BomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BomScalarFieldEnum | Prisma.BomScalarFieldEnum[];
};
export type BomCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BomCreateInput, Prisma.BomUncheckedCreateInput>;
};
export type BomCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BomCreateManyInput | Prisma.BomCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BomCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    data: Prisma.BomCreateManyInput | Prisma.BomCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BomIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BomUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BomUpdateInput, Prisma.BomUncheckedUpdateInput>;
    where: Prisma.BomWhereUniqueInput;
};
export type BomUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BomUpdateManyMutationInput, Prisma.BomUncheckedUpdateManyInput>;
    where?: Prisma.BomWhereInput;
    limit?: number;
};
export type BomUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BomUpdateManyMutationInput, Prisma.BomUncheckedUpdateManyInput>;
    where?: Prisma.BomWhereInput;
    limit?: number;
    include?: Prisma.BomIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BomUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where: Prisma.BomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomCreateInput, Prisma.BomUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BomUpdateInput, Prisma.BomUncheckedUpdateInput>;
};
export type BomDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where: Prisma.BomWhereUniqueInput;
};
export type BomDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomWhereInput;
    limit?: number;
};
export type Bom$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
    where?: Prisma.BomLineWhereInput;
    orderBy?: Prisma.BomLineOrderByWithRelationInput | Prisma.BomLineOrderByWithRelationInput[];
    cursor?: Prisma.BomLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BomLineScalarFieldEnum | Prisma.BomLineScalarFieldEnum[];
};
export type Bom$productionOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    where?: Prisma.ProductionOrderWhereInput;
    orderBy?: Prisma.ProductionOrderOrderByWithRelationInput | Prisma.ProductionOrderOrderByWithRelationInput[];
    cursor?: Prisma.ProductionOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductionOrderScalarFieldEnum | Prisma.ProductionOrderScalarFieldEnum[];
};
export type BomDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
};
