import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SaleLineChangeModel = runtime.Types.Result.DefaultSelection<Prisma.$SaleLineChangePayload>;
export type AggregateSaleLineChange = {
    _count: SaleLineChangeCountAggregateOutputType | null;
    _avg: SaleLineChangeAvgAggregateOutputType | null;
    _sum: SaleLineChangeSumAggregateOutputType | null;
    _min: SaleLineChangeMinAggregateOutputType | null;
    _max: SaleLineChangeMaxAggregateOutputType | null;
};
export type SaleLineChangeAvgAggregateOutputType = {
    previousQuantity: runtime.Decimal | null;
    quantity: runtime.Decimal | null;
};
export type SaleLineChangeSumAggregateOutputType = {
    previousQuantity: runtime.Decimal | null;
    quantity: runtime.Decimal | null;
};
export type SaleLineChangeMinAggregateOutputType = {
    id: string | null;
    changedAt: Date | null;
    previousQuantity: runtime.Decimal | null;
    quantity: runtime.Decimal | null;
    reason: string | null;
    saleLineId: string | null;
    replacementLineId: string | null;
    changedById: string | null;
};
export type SaleLineChangeMaxAggregateOutputType = {
    id: string | null;
    changedAt: Date | null;
    previousQuantity: runtime.Decimal | null;
    quantity: runtime.Decimal | null;
    reason: string | null;
    saleLineId: string | null;
    replacementLineId: string | null;
    changedById: string | null;
};
export type SaleLineChangeCountAggregateOutputType = {
    id: number;
    changedAt: number;
    previousQuantity: number;
    quantity: number;
    reason: number;
    saleLineId: number;
    replacementLineId: number;
    changedById: number;
    _all: number;
};
export type SaleLineChangeAvgAggregateInputType = {
    previousQuantity?: true;
    quantity?: true;
};
export type SaleLineChangeSumAggregateInputType = {
    previousQuantity?: true;
    quantity?: true;
};
export type SaleLineChangeMinAggregateInputType = {
    id?: true;
    changedAt?: true;
    previousQuantity?: true;
    quantity?: true;
    reason?: true;
    saleLineId?: true;
    replacementLineId?: true;
    changedById?: true;
};
export type SaleLineChangeMaxAggregateInputType = {
    id?: true;
    changedAt?: true;
    previousQuantity?: true;
    quantity?: true;
    reason?: true;
    saleLineId?: true;
    replacementLineId?: true;
    changedById?: true;
};
export type SaleLineChangeCountAggregateInputType = {
    id?: true;
    changedAt?: true;
    previousQuantity?: true;
    quantity?: true;
    reason?: true;
    saleLineId?: true;
    replacementLineId?: true;
    changedById?: true;
    _all?: true;
};
export type SaleLineChangeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineChangeWhereInput;
    orderBy?: Prisma.SaleLineChangeOrderByWithRelationInput | Prisma.SaleLineChangeOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SaleLineChangeCountAggregateInputType;
    _avg?: SaleLineChangeAvgAggregateInputType;
    _sum?: SaleLineChangeSumAggregateInputType;
    _min?: SaleLineChangeMinAggregateInputType;
    _max?: SaleLineChangeMaxAggregateInputType;
};
export type GetSaleLineChangeAggregateType<T extends SaleLineChangeAggregateArgs> = {
    [P in keyof T & keyof AggregateSaleLineChange]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSaleLineChange[P]> : Prisma.GetScalarType<T[P], AggregateSaleLineChange[P]>;
};
export type SaleLineChangeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineChangeWhereInput;
    orderBy?: Prisma.SaleLineChangeOrderByWithAggregationInput | Prisma.SaleLineChangeOrderByWithAggregationInput[];
    by: Prisma.SaleLineChangeScalarFieldEnum[] | Prisma.SaleLineChangeScalarFieldEnum;
    having?: Prisma.SaleLineChangeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SaleLineChangeCountAggregateInputType | true;
    _avg?: SaleLineChangeAvgAggregateInputType;
    _sum?: SaleLineChangeSumAggregateInputType;
    _min?: SaleLineChangeMinAggregateInputType;
    _max?: SaleLineChangeMaxAggregateInputType;
};
export type SaleLineChangeGroupByOutputType = {
    id: string;
    changedAt: Date;
    previousQuantity: runtime.Decimal;
    quantity: runtime.Decimal;
    reason: string;
    saleLineId: string;
    replacementLineId: string | null;
    changedById: string;
    _count: SaleLineChangeCountAggregateOutputType | null;
    _avg: SaleLineChangeAvgAggregateOutputType | null;
    _sum: SaleLineChangeSumAggregateOutputType | null;
    _min: SaleLineChangeMinAggregateOutputType | null;
    _max: SaleLineChangeMaxAggregateOutputType | null;
};
export type GetSaleLineChangeGroupByPayload<T extends SaleLineChangeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SaleLineChangeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SaleLineChangeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SaleLineChangeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SaleLineChangeGroupByOutputType[P]>;
}>>;
export type SaleLineChangeWhereInput = {
    AND?: Prisma.SaleLineChangeWhereInput | Prisma.SaleLineChangeWhereInput[];
    OR?: Prisma.SaleLineChangeWhereInput[];
    NOT?: Prisma.SaleLineChangeWhereInput | Prisma.SaleLineChangeWhereInput[];
    id?: Prisma.UuidFilter<"SaleLineChange"> | string;
    changedAt?: Prisma.DateTimeFilter<"SaleLineChange"> | Date | string;
    previousQuantity?: Prisma.DecimalFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFilter<"SaleLineChange"> | string;
    saleLineId?: Prisma.UuidFilter<"SaleLineChange"> | string;
    replacementLineId?: Prisma.UuidNullableFilter<"SaleLineChange"> | string | null;
    changedById?: Prisma.UuidFilter<"SaleLineChange"> | string;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    replacementLine?: Prisma.XOR<Prisma.SaleLineNullableScalarRelationFilter, Prisma.SaleLineWhereInput> | null;
    changedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
};
export type SaleLineChangeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
    previousQuantity?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    replacementLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    changedById?: Prisma.SortOrder;
    saleLine?: Prisma.SaleLineOrderByWithRelationInput;
    replacementLine?: Prisma.SaleLineOrderByWithRelationInput;
    changedBy?: Prisma.EmployeeOrderByWithRelationInput;
};
export type SaleLineChangeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SaleLineChangeWhereInput | Prisma.SaleLineChangeWhereInput[];
    OR?: Prisma.SaleLineChangeWhereInput[];
    NOT?: Prisma.SaleLineChangeWhereInput | Prisma.SaleLineChangeWhereInput[];
    changedAt?: Prisma.DateTimeFilter<"SaleLineChange"> | Date | string;
    previousQuantity?: Prisma.DecimalFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFilter<"SaleLineChange"> | string;
    saleLineId?: Prisma.UuidFilter<"SaleLineChange"> | string;
    replacementLineId?: Prisma.UuidNullableFilter<"SaleLineChange"> | string | null;
    changedById?: Prisma.UuidFilter<"SaleLineChange"> | string;
    saleLine?: Prisma.XOR<Prisma.SaleLineScalarRelationFilter, Prisma.SaleLineWhereInput>;
    replacementLine?: Prisma.XOR<Prisma.SaleLineNullableScalarRelationFilter, Prisma.SaleLineWhereInput> | null;
    changedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
}, "id">;
export type SaleLineChangeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
    previousQuantity?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    replacementLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    changedById?: Prisma.SortOrder;
    _count?: Prisma.SaleLineChangeCountOrderByAggregateInput;
    _avg?: Prisma.SaleLineChangeAvgOrderByAggregateInput;
    _max?: Prisma.SaleLineChangeMaxOrderByAggregateInput;
    _min?: Prisma.SaleLineChangeMinOrderByAggregateInput;
    _sum?: Prisma.SaleLineChangeSumOrderByAggregateInput;
};
export type SaleLineChangeScalarWhereWithAggregatesInput = {
    AND?: Prisma.SaleLineChangeScalarWhereWithAggregatesInput | Prisma.SaleLineChangeScalarWhereWithAggregatesInput[];
    OR?: Prisma.SaleLineChangeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SaleLineChangeScalarWhereWithAggregatesInput | Prisma.SaleLineChangeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"SaleLineChange"> | string;
    changedAt?: Prisma.DateTimeWithAggregatesFilter<"SaleLineChange"> | Date | string;
    previousQuantity?: Prisma.DecimalWithAggregatesFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringWithAggregatesFilter<"SaleLineChange"> | string;
    saleLineId?: Prisma.UuidWithAggregatesFilter<"SaleLineChange"> | string;
    replacementLineId?: Prisma.UuidNullableWithAggregatesFilter<"SaleLineChange"> | string | null;
    changedById?: Prisma.UuidWithAggregatesFilter<"SaleLineChange"> | string;
};
export type SaleLineChangeCreateInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutChangesInput;
    replacementLine?: Prisma.SaleLineCreateNestedOneWithoutReplacementChangesInput;
    changedBy: Prisma.EmployeeCreateNestedOneWithoutLineChangesInput;
};
export type SaleLineChangeUncheckedCreateInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLineId: string;
    replacementLineId?: string | null;
    changedById: string;
};
export type SaleLineChangeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutChangesNestedInput;
    replacementLine?: Prisma.SaleLineUpdateOneWithoutReplacementChangesNestedInput;
    changedBy?: Prisma.EmployeeUpdateOneRequiredWithoutLineChangesNestedInput;
};
export type SaleLineChangeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    replacementLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineChangeCreateManyInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLineId: string;
    replacementLineId?: string | null;
    changedById: string;
};
export type SaleLineChangeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineChangeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    replacementLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineChangeListRelationFilter = {
    every?: Prisma.SaleLineChangeWhereInput;
    some?: Prisma.SaleLineChangeWhereInput;
    none?: Prisma.SaleLineChangeWhereInput;
};
export type SaleLineChangeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SaleLineChangeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
    previousQuantity?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    replacementLineId?: Prisma.SortOrder;
    changedById?: Prisma.SortOrder;
};
export type SaleLineChangeAvgOrderByAggregateInput = {
    previousQuantity?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type SaleLineChangeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
    previousQuantity?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    replacementLineId?: Prisma.SortOrder;
    changedById?: Prisma.SortOrder;
};
export type SaleLineChangeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
    previousQuantity?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    saleLineId?: Prisma.SortOrder;
    replacementLineId?: Prisma.SortOrder;
    changedById?: Prisma.SortOrder;
};
export type SaleLineChangeSumOrderByAggregateInput = {
    previousQuantity?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type SaleLineChangeCreateNestedManyWithoutChangedByInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput> | Prisma.SaleLineChangeCreateWithoutChangedByInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput | Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput[];
    createMany?: Prisma.SaleLineChangeCreateManyChangedByInputEnvelope;
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
};
export type SaleLineChangeUncheckedCreateNestedManyWithoutChangedByInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput> | Prisma.SaleLineChangeCreateWithoutChangedByInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput | Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput[];
    createMany?: Prisma.SaleLineChangeCreateManyChangedByInputEnvelope;
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
};
export type SaleLineChangeUpdateManyWithoutChangedByNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput> | Prisma.SaleLineChangeCreateWithoutChangedByInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput | Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput[];
    upsert?: Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutChangedByInput | Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutChangedByInput[];
    createMany?: Prisma.SaleLineChangeCreateManyChangedByInputEnvelope;
    set?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    disconnect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    delete?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    update?: Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutChangedByInput | Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutChangedByInput[];
    updateMany?: Prisma.SaleLineChangeUpdateManyWithWhereWithoutChangedByInput | Prisma.SaleLineChangeUpdateManyWithWhereWithoutChangedByInput[];
    deleteMany?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
};
export type SaleLineChangeUncheckedUpdateManyWithoutChangedByNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput> | Prisma.SaleLineChangeCreateWithoutChangedByInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput | Prisma.SaleLineChangeCreateOrConnectWithoutChangedByInput[];
    upsert?: Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutChangedByInput | Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutChangedByInput[];
    createMany?: Prisma.SaleLineChangeCreateManyChangedByInputEnvelope;
    set?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    disconnect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    delete?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    update?: Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutChangedByInput | Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutChangedByInput[];
    updateMany?: Prisma.SaleLineChangeUpdateManyWithWhereWithoutChangedByInput | Prisma.SaleLineChangeUpdateManyWithWhereWithoutChangedByInput[];
    deleteMany?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
};
export type SaleLineChangeCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput> | Prisma.SaleLineChangeCreateWithoutSaleLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManySaleLineInputEnvelope;
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
};
export type SaleLineChangeCreateNestedManyWithoutReplacementLineInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput> | Prisma.SaleLineChangeCreateWithoutReplacementLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManyReplacementLineInputEnvelope;
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
};
export type SaleLineChangeUncheckedCreateNestedManyWithoutSaleLineInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput> | Prisma.SaleLineChangeCreateWithoutSaleLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManySaleLineInputEnvelope;
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
};
export type SaleLineChangeUncheckedCreateNestedManyWithoutReplacementLineInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput> | Prisma.SaleLineChangeCreateWithoutReplacementLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManyReplacementLineInputEnvelope;
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
};
export type SaleLineChangeUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput> | Prisma.SaleLineChangeCreateWithoutSaleLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManySaleLineInputEnvelope;
    set?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    disconnect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    delete?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    update?: Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.SaleLineChangeUpdateManyWithWhereWithoutSaleLineInput | Prisma.SaleLineChangeUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
};
export type SaleLineChangeUpdateManyWithoutReplacementLineNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput> | Prisma.SaleLineChangeCreateWithoutReplacementLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput[];
    upsert?: Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutReplacementLineInput | Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutReplacementLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManyReplacementLineInputEnvelope;
    set?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    disconnect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    delete?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    update?: Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutReplacementLineInput | Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutReplacementLineInput[];
    updateMany?: Prisma.SaleLineChangeUpdateManyWithWhereWithoutReplacementLineInput | Prisma.SaleLineChangeUpdateManyWithWhereWithoutReplacementLineInput[];
    deleteMany?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
};
export type SaleLineChangeUncheckedUpdateManyWithoutSaleLineNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput> | Prisma.SaleLineChangeCreateWithoutSaleLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutSaleLineInput[];
    upsert?: Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutSaleLineInput | Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutSaleLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManySaleLineInputEnvelope;
    set?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    disconnect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    delete?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    update?: Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutSaleLineInput | Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutSaleLineInput[];
    updateMany?: Prisma.SaleLineChangeUpdateManyWithWhereWithoutSaleLineInput | Prisma.SaleLineChangeUpdateManyWithWhereWithoutSaleLineInput[];
    deleteMany?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
};
export type SaleLineChangeUncheckedUpdateManyWithoutReplacementLineNestedInput = {
    create?: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput> | Prisma.SaleLineChangeCreateWithoutReplacementLineInput[] | Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput[];
    connectOrCreate?: Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput | Prisma.SaleLineChangeCreateOrConnectWithoutReplacementLineInput[];
    upsert?: Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutReplacementLineInput | Prisma.SaleLineChangeUpsertWithWhereUniqueWithoutReplacementLineInput[];
    createMany?: Prisma.SaleLineChangeCreateManyReplacementLineInputEnvelope;
    set?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    disconnect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    delete?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    connect?: Prisma.SaleLineChangeWhereUniqueInput | Prisma.SaleLineChangeWhereUniqueInput[];
    update?: Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutReplacementLineInput | Prisma.SaleLineChangeUpdateWithWhereUniqueWithoutReplacementLineInput[];
    updateMany?: Prisma.SaleLineChangeUpdateManyWithWhereWithoutReplacementLineInput | Prisma.SaleLineChangeUpdateManyWithWhereWithoutReplacementLineInput[];
    deleteMany?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
};
export type SaleLineChangeCreateWithoutChangedByInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutChangesInput;
    replacementLine?: Prisma.SaleLineCreateNestedOneWithoutReplacementChangesInput;
};
export type SaleLineChangeUncheckedCreateWithoutChangedByInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLineId: string;
    replacementLineId?: string | null;
};
export type SaleLineChangeCreateOrConnectWithoutChangedByInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput>;
};
export type SaleLineChangeCreateManyChangedByInputEnvelope = {
    data: Prisma.SaleLineChangeCreateManyChangedByInput | Prisma.SaleLineChangeCreateManyChangedByInput[];
    skipDuplicates?: boolean;
};
export type SaleLineChangeUpsertWithWhereUniqueWithoutChangedByInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleLineChangeUpdateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedUpdateWithoutChangedByInput>;
    create: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedCreateWithoutChangedByInput>;
};
export type SaleLineChangeUpdateWithWhereUniqueWithoutChangedByInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateWithoutChangedByInput, Prisma.SaleLineChangeUncheckedUpdateWithoutChangedByInput>;
};
export type SaleLineChangeUpdateManyWithWhereWithoutChangedByInput = {
    where: Prisma.SaleLineChangeScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateManyMutationInput, Prisma.SaleLineChangeUncheckedUpdateManyWithoutChangedByInput>;
};
export type SaleLineChangeScalarWhereInput = {
    AND?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
    OR?: Prisma.SaleLineChangeScalarWhereInput[];
    NOT?: Prisma.SaleLineChangeScalarWhereInput | Prisma.SaleLineChangeScalarWhereInput[];
    id?: Prisma.UuidFilter<"SaleLineChange"> | string;
    changedAt?: Prisma.DateTimeFilter<"SaleLineChange"> | Date | string;
    previousQuantity?: Prisma.DecimalFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFilter<"SaleLineChange"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFilter<"SaleLineChange"> | string;
    saleLineId?: Prisma.UuidFilter<"SaleLineChange"> | string;
    replacementLineId?: Prisma.UuidNullableFilter<"SaleLineChange"> | string | null;
    changedById?: Prisma.UuidFilter<"SaleLineChange"> | string;
};
export type SaleLineChangeCreateWithoutSaleLineInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    replacementLine?: Prisma.SaleLineCreateNestedOneWithoutReplacementChangesInput;
    changedBy: Prisma.EmployeeCreateNestedOneWithoutLineChangesInput;
};
export type SaleLineChangeUncheckedCreateWithoutSaleLineInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    replacementLineId?: string | null;
    changedById: string;
};
export type SaleLineChangeCreateOrConnectWithoutSaleLineInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput>;
};
export type SaleLineChangeCreateManySaleLineInputEnvelope = {
    data: Prisma.SaleLineChangeCreateManySaleLineInput | Prisma.SaleLineChangeCreateManySaleLineInput[];
    skipDuplicates?: boolean;
};
export type SaleLineChangeCreateWithoutReplacementLineInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLine: Prisma.SaleLineCreateNestedOneWithoutChangesInput;
    changedBy: Prisma.EmployeeCreateNestedOneWithoutLineChangesInput;
};
export type SaleLineChangeUncheckedCreateWithoutReplacementLineInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLineId: string;
    changedById: string;
};
export type SaleLineChangeCreateOrConnectWithoutReplacementLineInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput>;
};
export type SaleLineChangeCreateManyReplacementLineInputEnvelope = {
    data: Prisma.SaleLineChangeCreateManyReplacementLineInput | Prisma.SaleLineChangeCreateManyReplacementLineInput[];
    skipDuplicates?: boolean;
};
export type SaleLineChangeUpsertWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleLineChangeUpdateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedUpdateWithoutSaleLineInput>;
    create: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutSaleLineInput>;
};
export type SaleLineChangeUpdateWithWhereUniqueWithoutSaleLineInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateWithoutSaleLineInput, Prisma.SaleLineChangeUncheckedUpdateWithoutSaleLineInput>;
};
export type SaleLineChangeUpdateManyWithWhereWithoutSaleLineInput = {
    where: Prisma.SaleLineChangeScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateManyMutationInput, Prisma.SaleLineChangeUncheckedUpdateManyWithoutSaleLineInput>;
};
export type SaleLineChangeUpsertWithWhereUniqueWithoutReplacementLineInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleLineChangeUpdateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedUpdateWithoutReplacementLineInput>;
    create: Prisma.XOR<Prisma.SaleLineChangeCreateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedCreateWithoutReplacementLineInput>;
};
export type SaleLineChangeUpdateWithWhereUniqueWithoutReplacementLineInput = {
    where: Prisma.SaleLineChangeWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateWithoutReplacementLineInput, Prisma.SaleLineChangeUncheckedUpdateWithoutReplacementLineInput>;
};
export type SaleLineChangeUpdateManyWithWhereWithoutReplacementLineInput = {
    where: Prisma.SaleLineChangeScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateManyMutationInput, Prisma.SaleLineChangeUncheckedUpdateManyWithoutReplacementLineInput>;
};
export type SaleLineChangeCreateManyChangedByInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLineId: string;
    replacementLineId?: string | null;
};
export type SaleLineChangeUpdateWithoutChangedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutChangesNestedInput;
    replacementLine?: Prisma.SaleLineUpdateOneWithoutReplacementChangesNestedInput;
};
export type SaleLineChangeUncheckedUpdateWithoutChangedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    replacementLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SaleLineChangeUncheckedUpdateManyWithoutChangedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    replacementLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SaleLineChangeCreateManySaleLineInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    replacementLineId?: string | null;
    changedById: string;
};
export type SaleLineChangeCreateManyReplacementLineInput = {
    id?: string;
    changedAt?: Date | string;
    previousQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason: string;
    saleLineId: string;
    changedById: string;
};
export type SaleLineChangeUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    replacementLine?: Prisma.SaleLineUpdateOneWithoutReplacementChangesNestedInput;
    changedBy?: Prisma.EmployeeUpdateOneRequiredWithoutLineChangesNestedInput;
};
export type SaleLineChangeUncheckedUpdateWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    replacementLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineChangeUncheckedUpdateManyWithoutSaleLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    replacementLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineChangeUpdateWithoutReplacementLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLine?: Prisma.SaleLineUpdateOneRequiredWithoutChangesNestedInput;
    changedBy?: Prisma.EmployeeUpdateOneRequiredWithoutLineChangesNestedInput;
};
export type SaleLineChangeUncheckedUpdateWithoutReplacementLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    changedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineChangeUncheckedUpdateManyWithoutReplacementLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    previousQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    saleLineId?: Prisma.StringFieldUpdateOperationsInput | string;
    changedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SaleLineChangeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    changedAt?: boolean;
    previousQuantity?: boolean;
    quantity?: boolean;
    reason?: boolean;
    saleLineId?: boolean;
    replacementLineId?: boolean;
    changedById?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    replacementLine?: boolean | Prisma.SaleLineChange$replacementLineArgs<ExtArgs>;
    changedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleLineChange"]>;
export type SaleLineChangeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    changedAt?: boolean;
    previousQuantity?: boolean;
    quantity?: boolean;
    reason?: boolean;
    saleLineId?: boolean;
    replacementLineId?: boolean;
    changedById?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    replacementLine?: boolean | Prisma.SaleLineChange$replacementLineArgs<ExtArgs>;
    changedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleLineChange"]>;
export type SaleLineChangeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    changedAt?: boolean;
    previousQuantity?: boolean;
    quantity?: boolean;
    reason?: boolean;
    saleLineId?: boolean;
    replacementLineId?: boolean;
    changedById?: boolean;
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    replacementLine?: boolean | Prisma.SaleLineChange$replacementLineArgs<ExtArgs>;
    changedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleLineChange"]>;
export type SaleLineChangeSelectScalar = {
    id?: boolean;
    changedAt?: boolean;
    previousQuantity?: boolean;
    quantity?: boolean;
    reason?: boolean;
    saleLineId?: boolean;
    replacementLineId?: boolean;
    changedById?: boolean;
};
export type SaleLineChangeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "changedAt" | "previousQuantity" | "quantity" | "reason" | "saleLineId" | "replacementLineId" | "changedById", ExtArgs["result"]["saleLineChange"]>;
export type SaleLineChangeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    replacementLine?: boolean | Prisma.SaleLineChange$replacementLineArgs<ExtArgs>;
    changedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type SaleLineChangeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    replacementLine?: boolean | Prisma.SaleLineChange$replacementLineArgs<ExtArgs>;
    changedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type SaleLineChangeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    saleLine?: boolean | Prisma.SaleLineDefaultArgs<ExtArgs>;
    replacementLine?: boolean | Prisma.SaleLineChange$replacementLineArgs<ExtArgs>;
    changedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $SaleLineChangePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SaleLineChange";
    objects: {
        saleLine: Prisma.$SaleLinePayload<ExtArgs>;
        replacementLine: Prisma.$SaleLinePayload<ExtArgs> | null;
        changedBy: Prisma.$EmployeePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        changedAt: Date;
        previousQuantity: runtime.Decimal;
        quantity: runtime.Decimal;
        reason: string;
        saleLineId: string;
        replacementLineId: string | null;
        changedById: string;
    }, ExtArgs["result"]["saleLineChange"]>;
    composites: {};
};
export type SaleLineChangeGetPayload<S extends boolean | null | undefined | SaleLineChangeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload, S>;
export type SaleLineChangeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SaleLineChangeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SaleLineChangeCountAggregateInputType | true;
};
export interface SaleLineChangeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SaleLineChange'];
        meta: {
            name: 'SaleLineChange';
        };
    };
    findUnique<T extends SaleLineChangeFindUniqueArgs>(args: Prisma.SelectSubset<T, SaleLineChangeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SaleLineChangeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SaleLineChangeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SaleLineChangeFindFirstArgs>(args?: Prisma.SelectSubset<T, SaleLineChangeFindFirstArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SaleLineChangeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SaleLineChangeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SaleLineChangeFindManyArgs>(args?: Prisma.SelectSubset<T, SaleLineChangeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SaleLineChangeCreateArgs>(args: Prisma.SelectSubset<T, SaleLineChangeCreateArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SaleLineChangeCreateManyArgs>(args?: Prisma.SelectSubset<T, SaleLineChangeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SaleLineChangeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SaleLineChangeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SaleLineChangeDeleteArgs>(args: Prisma.SelectSubset<T, SaleLineChangeDeleteArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SaleLineChangeUpdateArgs>(args: Prisma.SelectSubset<T, SaleLineChangeUpdateArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SaleLineChangeDeleteManyArgs>(args?: Prisma.SelectSubset<T, SaleLineChangeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SaleLineChangeUpdateManyArgs>(args: Prisma.SelectSubset<T, SaleLineChangeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SaleLineChangeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SaleLineChangeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SaleLineChangeUpsertArgs>(args: Prisma.SelectSubset<T, SaleLineChangeUpsertArgs<ExtArgs>>): Prisma.Prisma__SaleLineChangeClient<runtime.Types.Result.GetResult<Prisma.$SaleLineChangePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SaleLineChangeCountArgs>(args?: Prisma.Subset<T, SaleLineChangeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SaleLineChangeCountAggregateOutputType> : number>;
    aggregate<T extends SaleLineChangeAggregateArgs>(args: Prisma.Subset<T, SaleLineChangeAggregateArgs>): Prisma.PrismaPromise<GetSaleLineChangeAggregateType<T>>;
    groupBy<T extends SaleLineChangeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SaleLineChangeGroupByArgs['orderBy'];
    } : {
        orderBy?: SaleLineChangeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SaleLineChangeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleLineChangeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SaleLineChangeFieldRefs;
}
export interface Prisma__SaleLineChangeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    saleLine<T extends Prisma.SaleLineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLineDefaultArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    replacementLine<T extends Prisma.SaleLineChange$replacementLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SaleLineChange$replacementLineArgs<ExtArgs>>): Prisma.Prisma__SaleLineClient<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    changedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SaleLineChangeFieldRefs {
    readonly id: Prisma.FieldRef<"SaleLineChange", 'String'>;
    readonly changedAt: Prisma.FieldRef<"SaleLineChange", 'DateTime'>;
    readonly previousQuantity: Prisma.FieldRef<"SaleLineChange", 'Decimal'>;
    readonly quantity: Prisma.FieldRef<"SaleLineChange", 'Decimal'>;
    readonly reason: Prisma.FieldRef<"SaleLineChange", 'String'>;
    readonly saleLineId: Prisma.FieldRef<"SaleLineChange", 'String'>;
    readonly replacementLineId: Prisma.FieldRef<"SaleLineChange", 'String'>;
    readonly changedById: Prisma.FieldRef<"SaleLineChange", 'String'>;
}
export type SaleLineChangeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    where: Prisma.SaleLineChangeWhereUniqueInput;
};
export type SaleLineChangeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    where: Prisma.SaleLineChangeWhereUniqueInput;
};
export type SaleLineChangeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SaleLineChangeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SaleLineChangeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SaleLineChangeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleLineChangeCreateInput, Prisma.SaleLineChangeUncheckedCreateInput>;
};
export type SaleLineChangeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SaleLineChangeCreateManyInput | Prisma.SaleLineChangeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SaleLineChangeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    data: Prisma.SaleLineChangeCreateManyInput | Prisma.SaleLineChangeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SaleLineChangeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SaleLineChangeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateInput, Prisma.SaleLineChangeUncheckedUpdateInput>;
    where: Prisma.SaleLineChangeWhereUniqueInput;
};
export type SaleLineChangeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateManyMutationInput, Prisma.SaleLineChangeUncheckedUpdateManyInput>;
    where?: Prisma.SaleLineChangeWhereInput;
    limit?: number;
};
export type SaleLineChangeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SaleLineChangeUpdateManyMutationInput, Prisma.SaleLineChangeUncheckedUpdateManyInput>;
    where?: Prisma.SaleLineChangeWhereInput;
    limit?: number;
    include?: Prisma.SaleLineChangeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SaleLineChangeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    where: Prisma.SaleLineChangeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleLineChangeCreateInput, Prisma.SaleLineChangeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SaleLineChangeUpdateInput, Prisma.SaleLineChangeUncheckedUpdateInput>;
};
export type SaleLineChangeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
    where: Prisma.SaleLineChangeWhereUniqueInput;
};
export type SaleLineChangeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineChangeWhereInput;
    limit?: number;
};
export type SaleLineChange$replacementLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where?: Prisma.SaleLineWhereInput;
};
export type SaleLineChangeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineChangeSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineChangeOmit<ExtArgs> | null;
    include?: Prisma.SaleLineChangeInclude<ExtArgs> | null;
};
