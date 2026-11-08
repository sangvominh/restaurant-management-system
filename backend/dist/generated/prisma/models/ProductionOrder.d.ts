import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductionOrderModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductionOrderPayload>;
export type AggregateProductionOrder = {
    _count: ProductionOrderCountAggregateOutputType | null;
    _avg: ProductionOrderAvgAggregateOutputType | null;
    _sum: ProductionOrderSumAggregateOutputType | null;
    _min: ProductionOrderMinAggregateOutputType | null;
    _max: ProductionOrderMaxAggregateOutputType | null;
};
export type ProductionOrderAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ProductionOrderSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ProductionOrderMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    assignedAt: Date | null;
    dueAt: Date | null;
    status: string | null;
    bomId: string | null;
    assignedById: string | null;
    assignedToId: string | null;
};
export type ProductionOrderMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    assignedAt: Date | null;
    dueAt: Date | null;
    status: string | null;
    bomId: string | null;
    assignedById: string | null;
    assignedToId: string | null;
};
export type ProductionOrderCountAggregateOutputType = {
    id: number;
    quantity: number;
    assignedAt: number;
    dueAt: number;
    status: number;
    bomId: number;
    assignedById: number;
    assignedToId: number;
    _all: number;
};
export type ProductionOrderAvgAggregateInputType = {
    quantity?: true;
};
export type ProductionOrderSumAggregateInputType = {
    quantity?: true;
};
export type ProductionOrderMinAggregateInputType = {
    id?: true;
    quantity?: true;
    assignedAt?: true;
    dueAt?: true;
    status?: true;
    bomId?: true;
    assignedById?: true;
    assignedToId?: true;
};
export type ProductionOrderMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    assignedAt?: true;
    dueAt?: true;
    status?: true;
    bomId?: true;
    assignedById?: true;
    assignedToId?: true;
};
export type ProductionOrderCountAggregateInputType = {
    id?: true;
    quantity?: true;
    assignedAt?: true;
    dueAt?: true;
    status?: true;
    bomId?: true;
    assignedById?: true;
    assignedToId?: true;
    _all?: true;
};
export type ProductionOrderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionOrderWhereInput;
    orderBy?: Prisma.ProductionOrderOrderByWithRelationInput | Prisma.ProductionOrderOrderByWithRelationInput[];
    cursor?: Prisma.ProductionOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductionOrderCountAggregateInputType;
    _avg?: ProductionOrderAvgAggregateInputType;
    _sum?: ProductionOrderSumAggregateInputType;
    _min?: ProductionOrderMinAggregateInputType;
    _max?: ProductionOrderMaxAggregateInputType;
};
export type GetProductionOrderAggregateType<T extends ProductionOrderAggregateArgs> = {
    [P in keyof T & keyof AggregateProductionOrder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductionOrder[P]> : Prisma.GetScalarType<T[P], AggregateProductionOrder[P]>;
};
export type ProductionOrderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionOrderWhereInput;
    orderBy?: Prisma.ProductionOrderOrderByWithAggregationInput | Prisma.ProductionOrderOrderByWithAggregationInput[];
    by: Prisma.ProductionOrderScalarFieldEnum[] | Prisma.ProductionOrderScalarFieldEnum;
    having?: Prisma.ProductionOrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductionOrderCountAggregateInputType | true;
    _avg?: ProductionOrderAvgAggregateInputType;
    _sum?: ProductionOrderSumAggregateInputType;
    _min?: ProductionOrderMinAggregateInputType;
    _max?: ProductionOrderMaxAggregateInputType;
};
export type ProductionOrderGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    assignedAt: Date;
    dueAt: Date | null;
    status: string;
    bomId: string;
    assignedById: string;
    assignedToId: string;
    _count: ProductionOrderCountAggregateOutputType | null;
    _avg: ProductionOrderAvgAggregateOutputType | null;
    _sum: ProductionOrderSumAggregateOutputType | null;
    _min: ProductionOrderMinAggregateOutputType | null;
    _max: ProductionOrderMaxAggregateOutputType | null;
};
export type GetProductionOrderGroupByPayload<T extends ProductionOrderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductionOrderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductionOrderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductionOrderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductionOrderGroupByOutputType[P]>;
}>>;
export type ProductionOrderWhereInput = {
    AND?: Prisma.ProductionOrderWhereInput | Prisma.ProductionOrderWhereInput[];
    OR?: Prisma.ProductionOrderWhereInput[];
    NOT?: Prisma.ProductionOrderWhereInput | Prisma.ProductionOrderWhereInput[];
    id?: Prisma.UuidFilter<"ProductionOrder"> | string;
    quantity?: Prisma.DecimalFilter<"ProductionOrder"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFilter<"ProductionOrder"> | Date | string;
    dueAt?: Prisma.DateTimeNullableFilter<"ProductionOrder"> | Date | string | null;
    status?: Prisma.StringFilter<"ProductionOrder"> | string;
    bomId?: Prisma.UuidFilter<"ProductionOrder"> | string;
    assignedById?: Prisma.UuidFilter<"ProductionOrder"> | string;
    assignedToId?: Prisma.UuidFilter<"ProductionOrder"> | string;
    bom?: Prisma.XOR<Prisma.BomScalarRelationFilter, Prisma.BomWhereInput>;
    assignedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    materialIssues?: Prisma.MaterialIssueListRelationFilter;
    runs?: Prisma.ProductionRunListRelationFilter;
};
export type ProductionOrderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    bom?: Prisma.BomOrderByWithRelationInput;
    assignedBy?: Prisma.EmployeeOrderByWithRelationInput;
    assignedTo?: Prisma.EmployeeOrderByWithRelationInput;
    materialIssues?: Prisma.MaterialIssueOrderByRelationAggregateInput;
    runs?: Prisma.ProductionRunOrderByRelationAggregateInput;
};
export type ProductionOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductionOrderWhereInput | Prisma.ProductionOrderWhereInput[];
    OR?: Prisma.ProductionOrderWhereInput[];
    NOT?: Prisma.ProductionOrderWhereInput | Prisma.ProductionOrderWhereInput[];
    quantity?: Prisma.DecimalFilter<"ProductionOrder"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFilter<"ProductionOrder"> | Date | string;
    dueAt?: Prisma.DateTimeNullableFilter<"ProductionOrder"> | Date | string | null;
    status?: Prisma.StringFilter<"ProductionOrder"> | string;
    bomId?: Prisma.UuidFilter<"ProductionOrder"> | string;
    assignedById?: Prisma.UuidFilter<"ProductionOrder"> | string;
    assignedToId?: Prisma.UuidFilter<"ProductionOrder"> | string;
    bom?: Prisma.XOR<Prisma.BomScalarRelationFilter, Prisma.BomWhereInput>;
    assignedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    materialIssues?: Prisma.MaterialIssueListRelationFilter;
    runs?: Prisma.ProductionRunListRelationFilter;
}, "id">;
export type ProductionOrderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    _count?: Prisma.ProductionOrderCountOrderByAggregateInput;
    _avg?: Prisma.ProductionOrderAvgOrderByAggregateInput;
    _max?: Prisma.ProductionOrderMaxOrderByAggregateInput;
    _min?: Prisma.ProductionOrderMinOrderByAggregateInput;
    _sum?: Prisma.ProductionOrderSumOrderByAggregateInput;
};
export type ProductionOrderScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductionOrderScalarWhereWithAggregatesInput | Prisma.ProductionOrderScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductionOrderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductionOrderScalarWhereWithAggregatesInput | Prisma.ProductionOrderScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductionOrder"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"ProductionOrder"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductionOrder"> | Date | string;
    dueAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductionOrder"> | Date | string | null;
    status?: Prisma.StringWithAggregatesFilter<"ProductionOrder"> | string;
    bomId?: Prisma.UuidWithAggregatesFilter<"ProductionOrder"> | string;
    assignedById?: Prisma.UuidWithAggregatesFilter<"ProductionOrder"> | string;
    assignedToId?: Prisma.UuidWithAggregatesFilter<"ProductionOrder"> | string;
};
export type ProductionOrderCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bom: Prisma.BomCreateNestedOneWithoutProductionOrdersInput;
    assignedBy: Prisma.EmployeeCreateNestedOneWithoutAssignedOrdersInput;
    assignedTo: Prisma.EmployeeCreateNestedOneWithoutReceivedOrdersInput;
    materialIssues?: Prisma.MaterialIssueCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedById: string;
    assignedToId: string;
    materialIssues?: Prisma.MaterialIssueUncheckedCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunUncheckedCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bom?: Prisma.BomUpdateOneRequiredWithoutProductionOrdersNestedInput;
    assignedBy?: Prisma.EmployeeUpdateOneRequiredWithoutAssignedOrdersNestedInput;
    assignedTo?: Prisma.EmployeeUpdateOneRequiredWithoutReceivedOrdersNestedInput;
    materialIssues?: Prisma.MaterialIssueUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialIssues?: Prisma.MaterialIssueUncheckedUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUncheckedUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedById: string;
    assignedToId: string;
};
export type ProductionOrderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductionOrderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductionOrderListRelationFilter = {
    every?: Prisma.ProductionOrderWhereInput;
    some?: Prisma.ProductionOrderWhereInput;
    none?: Prisma.ProductionOrderWhereInput;
};
export type ProductionOrderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductionOrderScalarRelationFilter = {
    is?: Prisma.ProductionOrderWhereInput;
    isNot?: Prisma.ProductionOrderWhereInput;
};
export type ProductionOrderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
};
export type ProductionOrderAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ProductionOrderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
};
export type ProductionOrderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
};
export type ProductionOrderSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ProductionOrderCreateNestedManyWithoutAssignedByInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput> | Prisma.ProductionOrderCreateWithoutAssignedByInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedByInputEnvelope;
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
};
export type ProductionOrderCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput> | Prisma.ProductionOrderCreateWithoutAssignedToInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedToInputEnvelope;
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
};
export type ProductionOrderUncheckedCreateNestedManyWithoutAssignedByInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput> | Prisma.ProductionOrderCreateWithoutAssignedByInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedByInputEnvelope;
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
};
export type ProductionOrderUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput> | Prisma.ProductionOrderCreateWithoutAssignedToInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedToInputEnvelope;
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
};
export type ProductionOrderUpdateManyWithoutAssignedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput> | Prisma.ProductionOrderCreateWithoutAssignedByInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput[];
    upsert?: Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedByInput | Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedByInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedByInputEnvelope;
    set?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    disconnect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    delete?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    update?: Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedByInput | Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedByInput[];
    updateMany?: Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedByInput | Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedByInput[];
    deleteMany?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
};
export type ProductionOrderUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput> | Prisma.ProductionOrderCreateWithoutAssignedToInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedToInputEnvelope;
    set?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    disconnect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    delete?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    update?: Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedToInput | Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
};
export type ProductionOrderUncheckedUpdateManyWithoutAssignedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput> | Prisma.ProductionOrderCreateWithoutAssignedByInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedByInput[];
    upsert?: Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedByInput | Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedByInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedByInputEnvelope;
    set?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    disconnect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    delete?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    update?: Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedByInput | Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedByInput[];
    updateMany?: Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedByInput | Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedByInput[];
    deleteMany?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
};
export type ProductionOrderUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput> | Prisma.ProductionOrderCreateWithoutAssignedToInput[] | Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput | Prisma.ProductionOrderCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.ProductionOrderUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.ProductionOrderCreateManyAssignedToInputEnvelope;
    set?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    disconnect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    delete?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    update?: Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.ProductionOrderUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedToInput | Prisma.ProductionOrderUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
};
export type ProductionOrderCreateNestedOneWithoutMaterialIssuesInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutMaterialIssuesInput, Prisma.ProductionOrderUncheckedCreateWithoutMaterialIssuesInput>;
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutMaterialIssuesInput;
    connect?: Prisma.ProductionOrderWhereUniqueInput;
};
export type ProductionOrderUpdateOneRequiredWithoutMaterialIssuesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutMaterialIssuesInput, Prisma.ProductionOrderUncheckedCreateWithoutMaterialIssuesInput>;
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutMaterialIssuesInput;
    upsert?: Prisma.ProductionOrderUpsertWithoutMaterialIssuesInput;
    connect?: Prisma.ProductionOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductionOrderUpdateToOneWithWhereWithoutMaterialIssuesInput, Prisma.ProductionOrderUpdateWithoutMaterialIssuesInput>, Prisma.ProductionOrderUncheckedUpdateWithoutMaterialIssuesInput>;
};
export type ProductionOrderCreateNestedManyWithoutBomInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutBomInput, Prisma.ProductionOrderUncheckedCreateWithoutBomInput> | Prisma.ProductionOrderCreateWithoutBomInput[] | Prisma.ProductionOrderUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutBomInput | Prisma.ProductionOrderCreateOrConnectWithoutBomInput[];
    createMany?: Prisma.ProductionOrderCreateManyBomInputEnvelope;
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
};
export type ProductionOrderUncheckedCreateNestedManyWithoutBomInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutBomInput, Prisma.ProductionOrderUncheckedCreateWithoutBomInput> | Prisma.ProductionOrderCreateWithoutBomInput[] | Prisma.ProductionOrderUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutBomInput | Prisma.ProductionOrderCreateOrConnectWithoutBomInput[];
    createMany?: Prisma.ProductionOrderCreateManyBomInputEnvelope;
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
};
export type ProductionOrderUpdateManyWithoutBomNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutBomInput, Prisma.ProductionOrderUncheckedCreateWithoutBomInput> | Prisma.ProductionOrderCreateWithoutBomInput[] | Prisma.ProductionOrderUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutBomInput | Prisma.ProductionOrderCreateOrConnectWithoutBomInput[];
    upsert?: Prisma.ProductionOrderUpsertWithWhereUniqueWithoutBomInput | Prisma.ProductionOrderUpsertWithWhereUniqueWithoutBomInput[];
    createMany?: Prisma.ProductionOrderCreateManyBomInputEnvelope;
    set?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    disconnect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    delete?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    update?: Prisma.ProductionOrderUpdateWithWhereUniqueWithoutBomInput | Prisma.ProductionOrderUpdateWithWhereUniqueWithoutBomInput[];
    updateMany?: Prisma.ProductionOrderUpdateManyWithWhereWithoutBomInput | Prisma.ProductionOrderUpdateManyWithWhereWithoutBomInput[];
    deleteMany?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
};
export type ProductionOrderUncheckedUpdateManyWithoutBomNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutBomInput, Prisma.ProductionOrderUncheckedCreateWithoutBomInput> | Prisma.ProductionOrderCreateWithoutBomInput[] | Prisma.ProductionOrderUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutBomInput | Prisma.ProductionOrderCreateOrConnectWithoutBomInput[];
    upsert?: Prisma.ProductionOrderUpsertWithWhereUniqueWithoutBomInput | Prisma.ProductionOrderUpsertWithWhereUniqueWithoutBomInput[];
    createMany?: Prisma.ProductionOrderCreateManyBomInputEnvelope;
    set?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    disconnect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    delete?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    connect?: Prisma.ProductionOrderWhereUniqueInput | Prisma.ProductionOrderWhereUniqueInput[];
    update?: Prisma.ProductionOrderUpdateWithWhereUniqueWithoutBomInput | Prisma.ProductionOrderUpdateWithWhereUniqueWithoutBomInput[];
    updateMany?: Prisma.ProductionOrderUpdateManyWithWhereWithoutBomInput | Prisma.ProductionOrderUpdateManyWithWhereWithoutBomInput[];
    deleteMany?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
};
export type ProductionOrderCreateNestedOneWithoutRunsInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutRunsInput, Prisma.ProductionOrderUncheckedCreateWithoutRunsInput>;
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutRunsInput;
    connect?: Prisma.ProductionOrderWhereUniqueInput;
};
export type ProductionOrderUpdateOneRequiredWithoutRunsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionOrderCreateWithoutRunsInput, Prisma.ProductionOrderUncheckedCreateWithoutRunsInput>;
    connectOrCreate?: Prisma.ProductionOrderCreateOrConnectWithoutRunsInput;
    upsert?: Prisma.ProductionOrderUpsertWithoutRunsInput;
    connect?: Prisma.ProductionOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductionOrderUpdateToOneWithWhereWithoutRunsInput, Prisma.ProductionOrderUpdateWithoutRunsInput>, Prisma.ProductionOrderUncheckedUpdateWithoutRunsInput>;
};
export type ProductionOrderCreateWithoutAssignedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bom: Prisma.BomCreateNestedOneWithoutProductionOrdersInput;
    assignedTo: Prisma.EmployeeCreateNestedOneWithoutReceivedOrdersInput;
    materialIssues?: Prisma.MaterialIssueCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderUncheckedCreateWithoutAssignedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedToId: string;
    materialIssues?: Prisma.MaterialIssueUncheckedCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunUncheckedCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderCreateOrConnectWithoutAssignedByInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput>;
};
export type ProductionOrderCreateManyAssignedByInputEnvelope = {
    data: Prisma.ProductionOrderCreateManyAssignedByInput | Prisma.ProductionOrderCreateManyAssignedByInput[];
    skipDuplicates?: boolean;
};
export type ProductionOrderCreateWithoutAssignedToInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bom: Prisma.BomCreateNestedOneWithoutProductionOrdersInput;
    assignedBy: Prisma.EmployeeCreateNestedOneWithoutAssignedOrdersInput;
    materialIssues?: Prisma.MaterialIssueCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderUncheckedCreateWithoutAssignedToInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedById: string;
    materialIssues?: Prisma.MaterialIssueUncheckedCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunUncheckedCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderCreateOrConnectWithoutAssignedToInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput>;
};
export type ProductionOrderCreateManyAssignedToInputEnvelope = {
    data: Prisma.ProductionOrderCreateManyAssignedToInput | Prisma.ProductionOrderCreateManyAssignedToInput[];
    skipDuplicates?: boolean;
};
export type ProductionOrderUpsertWithWhereUniqueWithoutAssignedByInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedUpdateWithoutAssignedByInput>;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedByInput>;
};
export type ProductionOrderUpdateWithWhereUniqueWithoutAssignedByInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutAssignedByInput, Prisma.ProductionOrderUncheckedUpdateWithoutAssignedByInput>;
};
export type ProductionOrderUpdateManyWithWhereWithoutAssignedByInput = {
    where: Prisma.ProductionOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateManyMutationInput, Prisma.ProductionOrderUncheckedUpdateManyWithoutAssignedByInput>;
};
export type ProductionOrderScalarWhereInput = {
    AND?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
    OR?: Prisma.ProductionOrderScalarWhereInput[];
    NOT?: Prisma.ProductionOrderScalarWhereInput | Prisma.ProductionOrderScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductionOrder"> | string;
    quantity?: Prisma.DecimalFilter<"ProductionOrder"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFilter<"ProductionOrder"> | Date | string;
    dueAt?: Prisma.DateTimeNullableFilter<"ProductionOrder"> | Date | string | null;
    status?: Prisma.StringFilter<"ProductionOrder"> | string;
    bomId?: Prisma.UuidFilter<"ProductionOrder"> | string;
    assignedById?: Prisma.UuidFilter<"ProductionOrder"> | string;
    assignedToId?: Prisma.UuidFilter<"ProductionOrder"> | string;
};
export type ProductionOrderUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedUpdateWithoutAssignedToInput>;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedCreateWithoutAssignedToInput>;
};
export type ProductionOrderUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutAssignedToInput, Prisma.ProductionOrderUncheckedUpdateWithoutAssignedToInput>;
};
export type ProductionOrderUpdateManyWithWhereWithoutAssignedToInput = {
    where: Prisma.ProductionOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateManyMutationInput, Prisma.ProductionOrderUncheckedUpdateManyWithoutAssignedToInput>;
};
export type ProductionOrderCreateWithoutMaterialIssuesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bom: Prisma.BomCreateNestedOneWithoutProductionOrdersInput;
    assignedBy: Prisma.EmployeeCreateNestedOneWithoutAssignedOrdersInput;
    assignedTo: Prisma.EmployeeCreateNestedOneWithoutReceivedOrdersInput;
    runs?: Prisma.ProductionRunCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderUncheckedCreateWithoutMaterialIssuesInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedById: string;
    assignedToId: string;
    runs?: Prisma.ProductionRunUncheckedCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderCreateOrConnectWithoutMaterialIssuesInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutMaterialIssuesInput, Prisma.ProductionOrderUncheckedCreateWithoutMaterialIssuesInput>;
};
export type ProductionOrderUpsertWithoutMaterialIssuesInput = {
    update: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutMaterialIssuesInput, Prisma.ProductionOrderUncheckedUpdateWithoutMaterialIssuesInput>;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutMaterialIssuesInput, Prisma.ProductionOrderUncheckedCreateWithoutMaterialIssuesInput>;
    where?: Prisma.ProductionOrderWhereInput;
};
export type ProductionOrderUpdateToOneWithWhereWithoutMaterialIssuesInput = {
    where?: Prisma.ProductionOrderWhereInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutMaterialIssuesInput, Prisma.ProductionOrderUncheckedUpdateWithoutMaterialIssuesInput>;
};
export type ProductionOrderUpdateWithoutMaterialIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bom?: Prisma.BomUpdateOneRequiredWithoutProductionOrdersNestedInput;
    assignedBy?: Prisma.EmployeeUpdateOneRequiredWithoutAssignedOrdersNestedInput;
    assignedTo?: Prisma.EmployeeUpdateOneRequiredWithoutReceivedOrdersNestedInput;
    runs?: Prisma.ProductionRunUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateWithoutMaterialIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
    runs?: Prisma.ProductionRunUncheckedUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderCreateWithoutBomInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    assignedBy: Prisma.EmployeeCreateNestedOneWithoutAssignedOrdersInput;
    assignedTo: Prisma.EmployeeCreateNestedOneWithoutReceivedOrdersInput;
    materialIssues?: Prisma.MaterialIssueCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderUncheckedCreateWithoutBomInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    assignedById: string;
    assignedToId: string;
    materialIssues?: Prisma.MaterialIssueUncheckedCreateNestedManyWithoutProductionOrderInput;
    runs?: Prisma.ProductionRunUncheckedCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderCreateOrConnectWithoutBomInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutBomInput, Prisma.ProductionOrderUncheckedCreateWithoutBomInput>;
};
export type ProductionOrderCreateManyBomInputEnvelope = {
    data: Prisma.ProductionOrderCreateManyBomInput | Prisma.ProductionOrderCreateManyBomInput[];
    skipDuplicates?: boolean;
};
export type ProductionOrderUpsertWithWhereUniqueWithoutBomInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutBomInput, Prisma.ProductionOrderUncheckedUpdateWithoutBomInput>;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutBomInput, Prisma.ProductionOrderUncheckedCreateWithoutBomInput>;
};
export type ProductionOrderUpdateWithWhereUniqueWithoutBomInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutBomInput, Prisma.ProductionOrderUncheckedUpdateWithoutBomInput>;
};
export type ProductionOrderUpdateManyWithWhereWithoutBomInput = {
    where: Prisma.ProductionOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateManyMutationInput, Prisma.ProductionOrderUncheckedUpdateManyWithoutBomInput>;
};
export type ProductionOrderCreateWithoutRunsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bom: Prisma.BomCreateNestedOneWithoutProductionOrdersInput;
    assignedBy: Prisma.EmployeeCreateNestedOneWithoutAssignedOrdersInput;
    assignedTo: Prisma.EmployeeCreateNestedOneWithoutReceivedOrdersInput;
    materialIssues?: Prisma.MaterialIssueCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderUncheckedCreateWithoutRunsInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedById: string;
    assignedToId: string;
    materialIssues?: Prisma.MaterialIssueUncheckedCreateNestedManyWithoutProductionOrderInput;
};
export type ProductionOrderCreateOrConnectWithoutRunsInput = {
    where: Prisma.ProductionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutRunsInput, Prisma.ProductionOrderUncheckedCreateWithoutRunsInput>;
};
export type ProductionOrderUpsertWithoutRunsInput = {
    update: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutRunsInput, Prisma.ProductionOrderUncheckedUpdateWithoutRunsInput>;
    create: Prisma.XOR<Prisma.ProductionOrderCreateWithoutRunsInput, Prisma.ProductionOrderUncheckedCreateWithoutRunsInput>;
    where?: Prisma.ProductionOrderWhereInput;
};
export type ProductionOrderUpdateToOneWithWhereWithoutRunsInput = {
    where?: Prisma.ProductionOrderWhereInput;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateWithoutRunsInput, Prisma.ProductionOrderUncheckedUpdateWithoutRunsInput>;
};
export type ProductionOrderUpdateWithoutRunsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bom?: Prisma.BomUpdateOneRequiredWithoutProductionOrdersNestedInput;
    assignedBy?: Prisma.EmployeeUpdateOneRequiredWithoutAssignedOrdersNestedInput;
    assignedTo?: Prisma.EmployeeUpdateOneRequiredWithoutReceivedOrdersNestedInput;
    materialIssues?: Prisma.MaterialIssueUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateWithoutRunsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialIssues?: Prisma.MaterialIssueUncheckedUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderCreateManyAssignedByInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedToId: string;
};
export type ProductionOrderCreateManyAssignedToInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    bomId: string;
    assignedById: string;
};
export type ProductionOrderUpdateWithoutAssignedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bom?: Prisma.BomUpdateOneRequiredWithoutProductionOrdersNestedInput;
    assignedTo?: Prisma.EmployeeUpdateOneRequiredWithoutReceivedOrdersNestedInput;
    materialIssues?: Prisma.MaterialIssueUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateWithoutAssignedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialIssues?: Prisma.MaterialIssueUncheckedUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUncheckedUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateManyWithoutAssignedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductionOrderUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bom?: Prisma.BomUpdateOneRequiredWithoutProductionOrdersNestedInput;
    assignedBy?: Prisma.EmployeeUpdateOneRequiredWithoutAssignedOrdersNestedInput;
    materialIssues?: Prisma.MaterialIssueUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
    materialIssues?: Prisma.MaterialIssueUncheckedUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUncheckedUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateManyWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductionOrderCreateManyBomInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Date | string;
    dueAt?: Date | string | null;
    status?: string;
    assignedById: string;
    assignedToId: string;
};
export type ProductionOrderUpdateWithoutBomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedBy?: Prisma.EmployeeUpdateOneRequiredWithoutAssignedOrdersNestedInput;
    assignedTo?: Prisma.EmployeeUpdateOneRequiredWithoutReceivedOrdersNestedInput;
    materialIssues?: Prisma.MaterialIssueUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateWithoutBomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialIssues?: Prisma.MaterialIssueUncheckedUpdateManyWithoutProductionOrderNestedInput;
    runs?: Prisma.ProductionRunUncheckedUpdateManyWithoutProductionOrderNestedInput;
};
export type ProductionOrderUncheckedUpdateManyWithoutBomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductionOrderCountOutputType = {
    materialIssues: number;
    runs: number;
};
export type ProductionOrderCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    materialIssues?: boolean | ProductionOrderCountOutputTypeCountMaterialIssuesArgs;
    runs?: boolean | ProductionOrderCountOutputTypeCountRunsArgs;
};
export type ProductionOrderCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductionOrderCountOutputTypeCountMaterialIssuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueWhereInput;
};
export type ProductionOrderCountOutputTypeCountRunsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionRunWhereInput;
};
export type ProductionOrderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    assignedAt?: boolean;
    dueAt?: boolean;
    status?: boolean;
    bomId?: boolean;
    assignedById?: boolean;
    assignedToId?: boolean;
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    materialIssues?: boolean | Prisma.ProductionOrder$materialIssuesArgs<ExtArgs>;
    runs?: boolean | Prisma.ProductionOrder$runsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductionOrderCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productionOrder"]>;
export type ProductionOrderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    assignedAt?: boolean;
    dueAt?: boolean;
    status?: boolean;
    bomId?: boolean;
    assignedById?: boolean;
    assignedToId?: boolean;
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productionOrder"]>;
export type ProductionOrderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    assignedAt?: boolean;
    dueAt?: boolean;
    status?: boolean;
    bomId?: boolean;
    assignedById?: boolean;
    assignedToId?: boolean;
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productionOrder"]>;
export type ProductionOrderSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    assignedAt?: boolean;
    dueAt?: boolean;
    status?: boolean;
    bomId?: boolean;
    assignedById?: boolean;
    assignedToId?: boolean;
};
export type ProductionOrderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "assignedAt" | "dueAt" | "status" | "bomId" | "assignedById" | "assignedToId", ExtArgs["result"]["productionOrder"]>;
export type ProductionOrderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    materialIssues?: boolean | Prisma.ProductionOrder$materialIssuesArgs<ExtArgs>;
    runs?: boolean | Prisma.ProductionOrder$runsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductionOrderCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductionOrderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type ProductionOrderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $ProductionOrderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductionOrder";
    objects: {
        bom: Prisma.$BomPayload<ExtArgs>;
        assignedBy: Prisma.$EmployeePayload<ExtArgs>;
        assignedTo: Prisma.$EmployeePayload<ExtArgs>;
        materialIssues: Prisma.$MaterialIssuePayload<ExtArgs>[];
        runs: Prisma.$ProductionRunPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        assignedAt: Date;
        dueAt: Date | null;
        status: string;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }, ExtArgs["result"]["productionOrder"]>;
    composites: {};
};
export type ProductionOrderGetPayload<S extends boolean | null | undefined | ProductionOrderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload, S>;
export type ProductionOrderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductionOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductionOrderCountAggregateInputType | true;
};
export interface ProductionOrderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductionOrder'];
        meta: {
            name: 'ProductionOrder';
        };
    };
    findUnique<T extends ProductionOrderFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductionOrderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductionOrderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductionOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductionOrderFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductionOrderFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductionOrderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductionOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductionOrderFindManyArgs>(args?: Prisma.SelectSubset<T, ProductionOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductionOrderCreateArgs>(args: Prisma.SelectSubset<T, ProductionOrderCreateArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductionOrderCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductionOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductionOrderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductionOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductionOrderDeleteArgs>(args: Prisma.SelectSubset<T, ProductionOrderDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductionOrderUpdateArgs>(args: Prisma.SelectSubset<T, ProductionOrderUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductionOrderDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductionOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductionOrderUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductionOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductionOrderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductionOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductionOrderUpsertArgs>(args: Prisma.SelectSubset<T, ProductionOrderUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductionOrderCountArgs>(args?: Prisma.Subset<T, ProductionOrderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductionOrderCountAggregateOutputType> : number>;
    aggregate<T extends ProductionOrderAggregateArgs>(args: Prisma.Subset<T, ProductionOrderAggregateArgs>): Prisma.PrismaPromise<GetProductionOrderAggregateType<T>>;
    groupBy<T extends ProductionOrderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductionOrderGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductionOrderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductionOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductionOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductionOrderFieldRefs;
}
export interface Prisma__ProductionOrderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bom<T extends Prisma.BomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BomDefaultArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedTo<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    materialIssues<T extends Prisma.ProductionOrder$materialIssuesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionOrder$materialIssuesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    runs<T extends Prisma.ProductionOrder$runsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionOrder$runsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductionOrderFieldRefs {
    readonly id: Prisma.FieldRef<"ProductionOrder", 'String'>;
    readonly quantity: Prisma.FieldRef<"ProductionOrder", 'Decimal'>;
    readonly assignedAt: Prisma.FieldRef<"ProductionOrder", 'DateTime'>;
    readonly dueAt: Prisma.FieldRef<"ProductionOrder", 'DateTime'>;
    readonly status: Prisma.FieldRef<"ProductionOrder", 'String'>;
    readonly bomId: Prisma.FieldRef<"ProductionOrder", 'String'>;
    readonly assignedById: Prisma.FieldRef<"ProductionOrder", 'String'>;
    readonly assignedToId: Prisma.FieldRef<"ProductionOrder", 'String'>;
}
export type ProductionOrderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    where: Prisma.ProductionOrderWhereUniqueInput;
};
export type ProductionOrderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    where: Prisma.ProductionOrderWhereUniqueInput;
};
export type ProductionOrderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductionOrderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductionOrderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductionOrderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionOrderCreateInput, Prisma.ProductionOrderUncheckedCreateInput>;
};
export type ProductionOrderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductionOrderCreateManyInput | Prisma.ProductionOrderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductionOrderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    data: Prisma.ProductionOrderCreateManyInput | Prisma.ProductionOrderCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductionOrderIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductionOrderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateInput, Prisma.ProductionOrderUncheckedUpdateInput>;
    where: Prisma.ProductionOrderWhereUniqueInput;
};
export type ProductionOrderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductionOrderUpdateManyMutationInput, Prisma.ProductionOrderUncheckedUpdateManyInput>;
    where?: Prisma.ProductionOrderWhereInput;
    limit?: number;
};
export type ProductionOrderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionOrderUpdateManyMutationInput, Prisma.ProductionOrderUncheckedUpdateManyInput>;
    where?: Prisma.ProductionOrderWhereInput;
    limit?: number;
    include?: Prisma.ProductionOrderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductionOrderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    where: Prisma.ProductionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionOrderCreateInput, Prisma.ProductionOrderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductionOrderUpdateInput, Prisma.ProductionOrderUncheckedUpdateInput>;
};
export type ProductionOrderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
    where: Prisma.ProductionOrderWhereUniqueInput;
};
export type ProductionOrderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionOrderWhereInput;
    limit?: number;
};
export type ProductionOrder$materialIssuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueWhereInput;
    orderBy?: Prisma.MaterialIssueOrderByWithRelationInput | Prisma.MaterialIssueOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialIssueScalarFieldEnum | Prisma.MaterialIssueScalarFieldEnum[];
};
export type ProductionOrder$runsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    where?: Prisma.ProductionRunWhereInput;
    orderBy?: Prisma.ProductionRunOrderByWithRelationInput | Prisma.ProductionRunOrderByWithRelationInput[];
    cursor?: Prisma.ProductionRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductionRunScalarFieldEnum | Prisma.ProductionRunScalarFieldEnum[];
};
export type ProductionOrderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionOrderSelect<ExtArgs> | null;
    omit?: Prisma.ProductionOrderOmit<ExtArgs> | null;
    include?: Prisma.ProductionOrderInclude<ExtArgs> | null;
};
