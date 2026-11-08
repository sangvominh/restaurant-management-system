import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductionRunModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductionRunPayload>;
export type AggregateProductionRun = {
    _count: ProductionRunCountAggregateOutputType | null;
    _avg: ProductionRunAvgAggregateOutputType | null;
    _sum: ProductionRunSumAggregateOutputType | null;
    _min: ProductionRunMinAggregateOutputType | null;
    _max: ProductionRunMaxAggregateOutputType | null;
};
export type ProductionRunAvgAggregateOutputType = {
    actualQuantity: runtime.Decimal | null;
    acceptedQuantity: runtime.Decimal | null;
};
export type ProductionRunSumAggregateOutputType = {
    actualQuantity: runtime.Decimal | null;
    acceptedQuantity: runtime.Decimal | null;
};
export type ProductionRunMinAggregateOutputType = {
    id: string | null;
    recordedAt: Date | null;
    actualQuantity: runtime.Decimal | null;
    acceptedQuantity: runtime.Decimal | null;
    status: string | null;
    inspectedAt: Date | null;
    inspectionNote: string | null;
    productionOrderId: string | null;
    performedById: string | null;
    inspectedById: string | null;
};
export type ProductionRunMaxAggregateOutputType = {
    id: string | null;
    recordedAt: Date | null;
    actualQuantity: runtime.Decimal | null;
    acceptedQuantity: runtime.Decimal | null;
    status: string | null;
    inspectedAt: Date | null;
    inspectionNote: string | null;
    productionOrderId: string | null;
    performedById: string | null;
    inspectedById: string | null;
};
export type ProductionRunCountAggregateOutputType = {
    id: number;
    recordedAt: number;
    actualQuantity: number;
    acceptedQuantity: number;
    status: number;
    inspectedAt: number;
    inspectionNote: number;
    productionOrderId: number;
    performedById: number;
    inspectedById: number;
    _all: number;
};
export type ProductionRunAvgAggregateInputType = {
    actualQuantity?: true;
    acceptedQuantity?: true;
};
export type ProductionRunSumAggregateInputType = {
    actualQuantity?: true;
    acceptedQuantity?: true;
};
export type ProductionRunMinAggregateInputType = {
    id?: true;
    recordedAt?: true;
    actualQuantity?: true;
    acceptedQuantity?: true;
    status?: true;
    inspectedAt?: true;
    inspectionNote?: true;
    productionOrderId?: true;
    performedById?: true;
    inspectedById?: true;
};
export type ProductionRunMaxAggregateInputType = {
    id?: true;
    recordedAt?: true;
    actualQuantity?: true;
    acceptedQuantity?: true;
    status?: true;
    inspectedAt?: true;
    inspectionNote?: true;
    productionOrderId?: true;
    performedById?: true;
    inspectedById?: true;
};
export type ProductionRunCountAggregateInputType = {
    id?: true;
    recordedAt?: true;
    actualQuantity?: true;
    acceptedQuantity?: true;
    status?: true;
    inspectedAt?: true;
    inspectionNote?: true;
    productionOrderId?: true;
    performedById?: true;
    inspectedById?: true;
    _all?: true;
};
export type ProductionRunAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionRunWhereInput;
    orderBy?: Prisma.ProductionRunOrderByWithRelationInput | Prisma.ProductionRunOrderByWithRelationInput[];
    cursor?: Prisma.ProductionRunWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductionRunCountAggregateInputType;
    _avg?: ProductionRunAvgAggregateInputType;
    _sum?: ProductionRunSumAggregateInputType;
    _min?: ProductionRunMinAggregateInputType;
    _max?: ProductionRunMaxAggregateInputType;
};
export type GetProductionRunAggregateType<T extends ProductionRunAggregateArgs> = {
    [P in keyof T & keyof AggregateProductionRun]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductionRun[P]> : Prisma.GetScalarType<T[P], AggregateProductionRun[P]>;
};
export type ProductionRunGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionRunWhereInput;
    orderBy?: Prisma.ProductionRunOrderByWithAggregationInput | Prisma.ProductionRunOrderByWithAggregationInput[];
    by: Prisma.ProductionRunScalarFieldEnum[] | Prisma.ProductionRunScalarFieldEnum;
    having?: Prisma.ProductionRunScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductionRunCountAggregateInputType | true;
    _avg?: ProductionRunAvgAggregateInputType;
    _sum?: ProductionRunSumAggregateInputType;
    _min?: ProductionRunMinAggregateInputType;
    _max?: ProductionRunMaxAggregateInputType;
};
export type ProductionRunGroupByOutputType = {
    id: string;
    recordedAt: Date;
    actualQuantity: runtime.Decimal;
    acceptedQuantity: runtime.Decimal | null;
    status: string;
    inspectedAt: Date | null;
    inspectionNote: string | null;
    productionOrderId: string;
    performedById: string;
    inspectedById: string | null;
    _count: ProductionRunCountAggregateOutputType | null;
    _avg: ProductionRunAvgAggregateOutputType | null;
    _sum: ProductionRunSumAggregateOutputType | null;
    _min: ProductionRunMinAggregateOutputType | null;
    _max: ProductionRunMaxAggregateOutputType | null;
};
export type GetProductionRunGroupByPayload<T extends ProductionRunGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductionRunGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductionRunGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductionRunGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductionRunGroupByOutputType[P]>;
}>>;
export type ProductionRunWhereInput = {
    AND?: Prisma.ProductionRunWhereInput | Prisma.ProductionRunWhereInput[];
    OR?: Prisma.ProductionRunWhereInput[];
    NOT?: Prisma.ProductionRunWhereInput | Prisma.ProductionRunWhereInput[];
    id?: Prisma.UuidFilter<"ProductionRun"> | string;
    recordedAt?: Prisma.DateTimeFilter<"ProductionRun"> | Date | string;
    actualQuantity?: Prisma.DecimalFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.DecimalNullableFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"ProductionRun"> | string;
    inspectedAt?: Prisma.DateTimeNullableFilter<"ProductionRun"> | Date | string | null;
    inspectionNote?: Prisma.StringNullableFilter<"ProductionRun"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"ProductionRun"> | string;
    performedById?: Prisma.UuidFilter<"ProductionRun"> | string;
    inspectedById?: Prisma.UuidNullableFilter<"ProductionRun"> | string | null;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderScalarRelationFilter, Prisma.ProductionOrderWhereInput>;
    performedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    consumptions?: Prisma.ConsumptionLineListRelationFilter;
    inspectedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    productMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
};
export type ProductionRunOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    recordedAt?: Prisma.SortOrder;
    actualQuantity?: Prisma.SortOrder;
    acceptedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    inspectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrder?: Prisma.ProductionOrderOrderByWithRelationInput;
    performedBy?: Prisma.EmployeeOrderByWithRelationInput;
    consumptions?: Prisma.ConsumptionLineOrderByRelationAggregateInput;
    inspectedBy?: Prisma.EmployeeOrderByWithRelationInput;
    productMovement?: Prisma.ProductMovementOrderByWithRelationInput;
};
export type ProductionRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductionRunWhereInput | Prisma.ProductionRunWhereInput[];
    OR?: Prisma.ProductionRunWhereInput[];
    NOT?: Prisma.ProductionRunWhereInput | Prisma.ProductionRunWhereInput[];
    recordedAt?: Prisma.DateTimeFilter<"ProductionRun"> | Date | string;
    actualQuantity?: Prisma.DecimalFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.DecimalNullableFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"ProductionRun"> | string;
    inspectedAt?: Prisma.DateTimeNullableFilter<"ProductionRun"> | Date | string | null;
    inspectionNote?: Prisma.StringNullableFilter<"ProductionRun"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"ProductionRun"> | string;
    performedById?: Prisma.UuidFilter<"ProductionRun"> | string;
    inspectedById?: Prisma.UuidNullableFilter<"ProductionRun"> | string | null;
    productionOrder?: Prisma.XOR<Prisma.ProductionOrderScalarRelationFilter, Prisma.ProductionOrderWhereInput>;
    performedBy?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
    consumptions?: Prisma.ConsumptionLineListRelationFilter;
    inspectedBy?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
    productMovement?: Prisma.XOR<Prisma.ProductMovementNullableScalarRelationFilter, Prisma.ProductMovementWhereInput> | null;
}, "id">;
export type ProductionRunOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    recordedAt?: Prisma.SortOrder;
    actualQuantity?: Prisma.SortOrder;
    acceptedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    inspectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProductionRunCountOrderByAggregateInput;
    _avg?: Prisma.ProductionRunAvgOrderByAggregateInput;
    _max?: Prisma.ProductionRunMaxOrderByAggregateInput;
    _min?: Prisma.ProductionRunMinOrderByAggregateInput;
    _sum?: Prisma.ProductionRunSumOrderByAggregateInput;
};
export type ProductionRunScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductionRunScalarWhereWithAggregatesInput | Prisma.ProductionRunScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductionRunScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductionRunScalarWhereWithAggregatesInput | Prisma.ProductionRunScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductionRun"> | string;
    recordedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductionRun"> | Date | string;
    actualQuantity?: Prisma.DecimalWithAggregatesFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.DecimalNullableWithAggregatesFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringWithAggregatesFilter<"ProductionRun"> | string;
    inspectedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductionRun"> | Date | string | null;
    inspectionNote?: Prisma.StringNullableWithAggregatesFilter<"ProductionRun"> | string | null;
    productionOrderId?: Prisma.UuidWithAggregatesFilter<"ProductionRun"> | string;
    performedById?: Prisma.UuidWithAggregatesFilter<"ProductionRun"> | string;
    inspectedById?: Prisma.UuidNullableWithAggregatesFilter<"ProductionRun"> | string | null;
};
export type ProductionRunCreateInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutRunsInput;
    performedBy: Prisma.EmployeeCreateNestedOneWithoutPerformedRunsInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutRunInput;
    inspectedBy?: Prisma.EmployeeCreateNestedOneWithoutInspectedRunsInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutRunInput;
};
export type ProductionRunUncheckedCreateInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    performedById: string;
    inspectedById?: string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutRunInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutRunInput;
};
export type ProductionRunUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutRunsNestedInput;
    performedBy?: Prisma.EmployeeUpdateOneRequiredWithoutPerformedRunsNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutRunNestedInput;
    inspectedBy?: Prisma.EmployeeUpdateOneWithoutInspectedRunsNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutRunNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutRunNestedInput;
};
export type ProductionRunCreateManyInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    performedById: string;
    inspectedById?: string | null;
};
export type ProductionRunUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionRunUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionRunListRelationFilter = {
    every?: Prisma.ProductionRunWhereInput;
    some?: Prisma.ProductionRunWhereInput;
    none?: Prisma.ProductionRunWhereInput;
};
export type ProductionRunOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductionRunCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recordedAt?: Prisma.SortOrder;
    actualQuantity?: Prisma.SortOrder;
    acceptedQuantity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrder;
    inspectionNote?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    inspectedById?: Prisma.SortOrder;
};
export type ProductionRunAvgOrderByAggregateInput = {
    actualQuantity?: Prisma.SortOrder;
    acceptedQuantity?: Prisma.SortOrder;
};
export type ProductionRunMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recordedAt?: Prisma.SortOrder;
    actualQuantity?: Prisma.SortOrder;
    acceptedQuantity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrder;
    inspectionNote?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    inspectedById?: Prisma.SortOrder;
};
export type ProductionRunMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recordedAt?: Prisma.SortOrder;
    actualQuantity?: Prisma.SortOrder;
    acceptedQuantity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrder;
    inspectionNote?: Prisma.SortOrder;
    productionOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    inspectedById?: Prisma.SortOrder;
};
export type ProductionRunSumOrderByAggregateInput = {
    actualQuantity?: Prisma.SortOrder;
    acceptedQuantity?: Prisma.SortOrder;
};
export type ProductionRunScalarRelationFilter = {
    is?: Prisma.ProductionRunWhereInput;
    isNot?: Prisma.ProductionRunWhereInput;
};
export type ProductionRunNullableScalarRelationFilter = {
    is?: Prisma.ProductionRunWhereInput | null;
    isNot?: Prisma.ProductionRunWhereInput | null;
};
export type ProductionRunCreateNestedManyWithoutPerformedByInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutPerformedByInput, Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput> | Prisma.ProductionRunCreateWithoutPerformedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput | Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput[];
    createMany?: Prisma.ProductionRunCreateManyPerformedByInputEnvelope;
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
};
export type ProductionRunCreateNestedManyWithoutInspectedByInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutInspectedByInput, Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput> | Prisma.ProductionRunCreateWithoutInspectedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput | Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput[];
    createMany?: Prisma.ProductionRunCreateManyInspectedByInputEnvelope;
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
};
export type ProductionRunUncheckedCreateNestedManyWithoutPerformedByInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutPerformedByInput, Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput> | Prisma.ProductionRunCreateWithoutPerformedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput | Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput[];
    createMany?: Prisma.ProductionRunCreateManyPerformedByInputEnvelope;
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
};
export type ProductionRunUncheckedCreateNestedManyWithoutInspectedByInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutInspectedByInput, Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput> | Prisma.ProductionRunCreateWithoutInspectedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput | Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput[];
    createMany?: Prisma.ProductionRunCreateManyInspectedByInputEnvelope;
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
};
export type ProductionRunUpdateManyWithoutPerformedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutPerformedByInput, Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput> | Prisma.ProductionRunCreateWithoutPerformedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput | Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput[];
    upsert?: Prisma.ProductionRunUpsertWithWhereUniqueWithoutPerformedByInput | Prisma.ProductionRunUpsertWithWhereUniqueWithoutPerformedByInput[];
    createMany?: Prisma.ProductionRunCreateManyPerformedByInputEnvelope;
    set?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    disconnect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    delete?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    update?: Prisma.ProductionRunUpdateWithWhereUniqueWithoutPerformedByInput | Prisma.ProductionRunUpdateWithWhereUniqueWithoutPerformedByInput[];
    updateMany?: Prisma.ProductionRunUpdateManyWithWhereWithoutPerformedByInput | Prisma.ProductionRunUpdateManyWithWhereWithoutPerformedByInput[];
    deleteMany?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
};
export type ProductionRunUpdateManyWithoutInspectedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutInspectedByInput, Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput> | Prisma.ProductionRunCreateWithoutInspectedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput | Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput[];
    upsert?: Prisma.ProductionRunUpsertWithWhereUniqueWithoutInspectedByInput | Prisma.ProductionRunUpsertWithWhereUniqueWithoutInspectedByInput[];
    createMany?: Prisma.ProductionRunCreateManyInspectedByInputEnvelope;
    set?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    disconnect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    delete?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    update?: Prisma.ProductionRunUpdateWithWhereUniqueWithoutInspectedByInput | Prisma.ProductionRunUpdateWithWhereUniqueWithoutInspectedByInput[];
    updateMany?: Prisma.ProductionRunUpdateManyWithWhereWithoutInspectedByInput | Prisma.ProductionRunUpdateManyWithWhereWithoutInspectedByInput[];
    deleteMany?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
};
export type ProductionRunUncheckedUpdateManyWithoutPerformedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutPerformedByInput, Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput> | Prisma.ProductionRunCreateWithoutPerformedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput | Prisma.ProductionRunCreateOrConnectWithoutPerformedByInput[];
    upsert?: Prisma.ProductionRunUpsertWithWhereUniqueWithoutPerformedByInput | Prisma.ProductionRunUpsertWithWhereUniqueWithoutPerformedByInput[];
    createMany?: Prisma.ProductionRunCreateManyPerformedByInputEnvelope;
    set?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    disconnect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    delete?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    update?: Prisma.ProductionRunUpdateWithWhereUniqueWithoutPerformedByInput | Prisma.ProductionRunUpdateWithWhereUniqueWithoutPerformedByInput[];
    updateMany?: Prisma.ProductionRunUpdateManyWithWhereWithoutPerformedByInput | Prisma.ProductionRunUpdateManyWithWhereWithoutPerformedByInput[];
    deleteMany?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
};
export type ProductionRunUncheckedUpdateManyWithoutInspectedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutInspectedByInput, Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput> | Prisma.ProductionRunCreateWithoutInspectedByInput[] | Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput | Prisma.ProductionRunCreateOrConnectWithoutInspectedByInput[];
    upsert?: Prisma.ProductionRunUpsertWithWhereUniqueWithoutInspectedByInput | Prisma.ProductionRunUpsertWithWhereUniqueWithoutInspectedByInput[];
    createMany?: Prisma.ProductionRunCreateManyInspectedByInputEnvelope;
    set?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    disconnect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    delete?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    update?: Prisma.ProductionRunUpdateWithWhereUniqueWithoutInspectedByInput | Prisma.ProductionRunUpdateWithWhereUniqueWithoutInspectedByInput[];
    updateMany?: Prisma.ProductionRunUpdateManyWithWhereWithoutInspectedByInput | Prisma.ProductionRunUpdateManyWithWhereWithoutInspectedByInput[];
    deleteMany?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
};
export type ProductionRunCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput> | Prisma.ProductionRunCreateWithoutProductionOrderInput[] | Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput | Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.ProductionRunCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
};
export type ProductionRunUncheckedCreateNestedManyWithoutProductionOrderInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput> | Prisma.ProductionRunCreateWithoutProductionOrderInput[] | Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput | Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput[];
    createMany?: Prisma.ProductionRunCreateManyProductionOrderInputEnvelope;
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
};
export type ProductionRunUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput> | Prisma.ProductionRunCreateWithoutProductionOrderInput[] | Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput | Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.ProductionRunUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.ProductionRunUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.ProductionRunCreateManyProductionOrderInputEnvelope;
    set?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    disconnect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    delete?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    update?: Prisma.ProductionRunUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.ProductionRunUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.ProductionRunUpdateManyWithWhereWithoutProductionOrderInput | Prisma.ProductionRunUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
};
export type ProductionRunUncheckedUpdateManyWithoutProductionOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput> | Prisma.ProductionRunCreateWithoutProductionOrderInput[] | Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput[];
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput | Prisma.ProductionRunCreateOrConnectWithoutProductionOrderInput[];
    upsert?: Prisma.ProductionRunUpsertWithWhereUniqueWithoutProductionOrderInput | Prisma.ProductionRunUpsertWithWhereUniqueWithoutProductionOrderInput[];
    createMany?: Prisma.ProductionRunCreateManyProductionOrderInputEnvelope;
    set?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    disconnect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    delete?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    connect?: Prisma.ProductionRunWhereUniqueInput | Prisma.ProductionRunWhereUniqueInput[];
    update?: Prisma.ProductionRunUpdateWithWhereUniqueWithoutProductionOrderInput | Prisma.ProductionRunUpdateWithWhereUniqueWithoutProductionOrderInput[];
    updateMany?: Prisma.ProductionRunUpdateManyWithWhereWithoutProductionOrderInput | Prisma.ProductionRunUpdateManyWithWhereWithoutProductionOrderInput[];
    deleteMany?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
};
export type ProductionRunCreateNestedOneWithoutConsumptionsInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutConsumptionsInput, Prisma.ProductionRunUncheckedCreateWithoutConsumptionsInput>;
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutConsumptionsInput;
    connect?: Prisma.ProductionRunWhereUniqueInput;
};
export type ProductionRunUpdateOneRequiredWithoutConsumptionsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutConsumptionsInput, Prisma.ProductionRunUncheckedCreateWithoutConsumptionsInput>;
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutConsumptionsInput;
    upsert?: Prisma.ProductionRunUpsertWithoutConsumptionsInput;
    connect?: Prisma.ProductionRunWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductionRunUpdateToOneWithWhereWithoutConsumptionsInput, Prisma.ProductionRunUpdateWithoutConsumptionsInput>, Prisma.ProductionRunUncheckedUpdateWithoutConsumptionsInput>;
};
export type ProductionRunCreateNestedOneWithoutProductMovementInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductMovementInput, Prisma.ProductionRunUncheckedCreateWithoutProductMovementInput>;
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutProductMovementInput;
    connect?: Prisma.ProductionRunWhereUniqueInput;
};
export type ProductionRunUpdateOneWithoutProductMovementNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductMovementInput, Prisma.ProductionRunUncheckedCreateWithoutProductMovementInput>;
    connectOrCreate?: Prisma.ProductionRunCreateOrConnectWithoutProductMovementInput;
    upsert?: Prisma.ProductionRunUpsertWithoutProductMovementInput;
    disconnect?: Prisma.ProductionRunWhereInput | boolean;
    delete?: Prisma.ProductionRunWhereInput | boolean;
    connect?: Prisma.ProductionRunWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductionRunUpdateToOneWithWhereWithoutProductMovementInput, Prisma.ProductionRunUpdateWithoutProductMovementInput>, Prisma.ProductionRunUncheckedUpdateWithoutProductMovementInput>;
};
export type ProductionRunCreateWithoutPerformedByInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutRunsInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutRunInput;
    inspectedBy?: Prisma.EmployeeCreateNestedOneWithoutInspectedRunsInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutRunInput;
};
export type ProductionRunUncheckedCreateWithoutPerformedByInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    inspectedById?: string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutRunInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutRunInput;
};
export type ProductionRunCreateOrConnectWithoutPerformedByInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutPerformedByInput, Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput>;
};
export type ProductionRunCreateManyPerformedByInputEnvelope = {
    data: Prisma.ProductionRunCreateManyPerformedByInput | Prisma.ProductionRunCreateManyPerformedByInput[];
    skipDuplicates?: boolean;
};
export type ProductionRunCreateWithoutInspectedByInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutRunsInput;
    performedBy: Prisma.EmployeeCreateNestedOneWithoutPerformedRunsInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutRunInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutRunInput;
};
export type ProductionRunUncheckedCreateWithoutInspectedByInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    performedById: string;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutRunInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutRunInput;
};
export type ProductionRunCreateOrConnectWithoutInspectedByInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutInspectedByInput, Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput>;
};
export type ProductionRunCreateManyInspectedByInputEnvelope = {
    data: Prisma.ProductionRunCreateManyInspectedByInput | Prisma.ProductionRunCreateManyInspectedByInput[];
    skipDuplicates?: boolean;
};
export type ProductionRunUpsertWithWhereUniqueWithoutPerformedByInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionRunUpdateWithoutPerformedByInput, Prisma.ProductionRunUncheckedUpdateWithoutPerformedByInput>;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutPerformedByInput, Prisma.ProductionRunUncheckedCreateWithoutPerformedByInput>;
};
export type ProductionRunUpdateWithWhereUniqueWithoutPerformedByInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateWithoutPerformedByInput, Prisma.ProductionRunUncheckedUpdateWithoutPerformedByInput>;
};
export type ProductionRunUpdateManyWithWhereWithoutPerformedByInput = {
    where: Prisma.ProductionRunScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateManyMutationInput, Prisma.ProductionRunUncheckedUpdateManyWithoutPerformedByInput>;
};
export type ProductionRunScalarWhereInput = {
    AND?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
    OR?: Prisma.ProductionRunScalarWhereInput[];
    NOT?: Prisma.ProductionRunScalarWhereInput | Prisma.ProductionRunScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductionRun"> | string;
    recordedAt?: Prisma.DateTimeFilter<"ProductionRun"> | Date | string;
    actualQuantity?: Prisma.DecimalFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.DecimalNullableFilter<"ProductionRun"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"ProductionRun"> | string;
    inspectedAt?: Prisma.DateTimeNullableFilter<"ProductionRun"> | Date | string | null;
    inspectionNote?: Prisma.StringNullableFilter<"ProductionRun"> | string | null;
    productionOrderId?: Prisma.UuidFilter<"ProductionRun"> | string;
    performedById?: Prisma.UuidFilter<"ProductionRun"> | string;
    inspectedById?: Prisma.UuidNullableFilter<"ProductionRun"> | string | null;
};
export type ProductionRunUpsertWithWhereUniqueWithoutInspectedByInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionRunUpdateWithoutInspectedByInput, Prisma.ProductionRunUncheckedUpdateWithoutInspectedByInput>;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutInspectedByInput, Prisma.ProductionRunUncheckedCreateWithoutInspectedByInput>;
};
export type ProductionRunUpdateWithWhereUniqueWithoutInspectedByInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateWithoutInspectedByInput, Prisma.ProductionRunUncheckedUpdateWithoutInspectedByInput>;
};
export type ProductionRunUpdateManyWithWhereWithoutInspectedByInput = {
    where: Prisma.ProductionRunScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateManyMutationInput, Prisma.ProductionRunUncheckedUpdateManyWithoutInspectedByInput>;
};
export type ProductionRunCreateWithoutProductionOrderInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    performedBy: Prisma.EmployeeCreateNestedOneWithoutPerformedRunsInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutRunInput;
    inspectedBy?: Prisma.EmployeeCreateNestedOneWithoutInspectedRunsInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutRunInput;
};
export type ProductionRunUncheckedCreateWithoutProductionOrderInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    performedById: string;
    inspectedById?: string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutRunInput;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutRunInput;
};
export type ProductionRunCreateOrConnectWithoutProductionOrderInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput>;
};
export type ProductionRunCreateManyProductionOrderInputEnvelope = {
    data: Prisma.ProductionRunCreateManyProductionOrderInput | Prisma.ProductionRunCreateManyProductionOrderInput[];
    skipDuplicates?: boolean;
};
export type ProductionRunUpsertWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionRunUpdateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedUpdateWithoutProductionOrderInput>;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedCreateWithoutProductionOrderInput>;
};
export type ProductionRunUpdateWithWhereUniqueWithoutProductionOrderInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateWithoutProductionOrderInput, Prisma.ProductionRunUncheckedUpdateWithoutProductionOrderInput>;
};
export type ProductionRunUpdateManyWithWhereWithoutProductionOrderInput = {
    where: Prisma.ProductionRunScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateManyMutationInput, Prisma.ProductionRunUncheckedUpdateManyWithoutProductionOrderInput>;
};
export type ProductionRunCreateWithoutConsumptionsInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutRunsInput;
    performedBy: Prisma.EmployeeCreateNestedOneWithoutPerformedRunsInput;
    inspectedBy?: Prisma.EmployeeCreateNestedOneWithoutInspectedRunsInput;
    productMovement?: Prisma.ProductMovementCreateNestedOneWithoutRunInput;
};
export type ProductionRunUncheckedCreateWithoutConsumptionsInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    performedById: string;
    inspectedById?: string | null;
    productMovement?: Prisma.ProductMovementUncheckedCreateNestedOneWithoutRunInput;
};
export type ProductionRunCreateOrConnectWithoutConsumptionsInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutConsumptionsInput, Prisma.ProductionRunUncheckedCreateWithoutConsumptionsInput>;
};
export type ProductionRunUpsertWithoutConsumptionsInput = {
    update: Prisma.XOR<Prisma.ProductionRunUpdateWithoutConsumptionsInput, Prisma.ProductionRunUncheckedUpdateWithoutConsumptionsInput>;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutConsumptionsInput, Prisma.ProductionRunUncheckedCreateWithoutConsumptionsInput>;
    where?: Prisma.ProductionRunWhereInput;
};
export type ProductionRunUpdateToOneWithWhereWithoutConsumptionsInput = {
    where?: Prisma.ProductionRunWhereInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateWithoutConsumptionsInput, Prisma.ProductionRunUncheckedUpdateWithoutConsumptionsInput>;
};
export type ProductionRunUpdateWithoutConsumptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutRunsNestedInput;
    performedBy?: Prisma.EmployeeUpdateOneRequiredWithoutPerformedRunsNestedInput;
    inspectedBy?: Prisma.EmployeeUpdateOneWithoutInspectedRunsNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateWithoutConsumptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutRunNestedInput;
};
export type ProductionRunCreateWithoutProductMovementInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrder: Prisma.ProductionOrderCreateNestedOneWithoutRunsInput;
    performedBy: Prisma.EmployeeCreateNestedOneWithoutPerformedRunsInput;
    consumptions?: Prisma.ConsumptionLineCreateNestedManyWithoutRunInput;
    inspectedBy?: Prisma.EmployeeCreateNestedOneWithoutInspectedRunsInput;
};
export type ProductionRunUncheckedCreateWithoutProductMovementInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    performedById: string;
    inspectedById?: string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedCreateNestedManyWithoutRunInput;
};
export type ProductionRunCreateOrConnectWithoutProductMovementInput = {
    where: Prisma.ProductionRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductMovementInput, Prisma.ProductionRunUncheckedCreateWithoutProductMovementInput>;
};
export type ProductionRunUpsertWithoutProductMovementInput = {
    update: Prisma.XOR<Prisma.ProductionRunUpdateWithoutProductMovementInput, Prisma.ProductionRunUncheckedUpdateWithoutProductMovementInput>;
    create: Prisma.XOR<Prisma.ProductionRunCreateWithoutProductMovementInput, Prisma.ProductionRunUncheckedCreateWithoutProductMovementInput>;
    where?: Prisma.ProductionRunWhereInput;
};
export type ProductionRunUpdateToOneWithWhereWithoutProductMovementInput = {
    where?: Prisma.ProductionRunWhereInput;
    data: Prisma.XOR<Prisma.ProductionRunUpdateWithoutProductMovementInput, Prisma.ProductionRunUncheckedUpdateWithoutProductMovementInput>;
};
export type ProductionRunUpdateWithoutProductMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutRunsNestedInput;
    performedBy?: Prisma.EmployeeUpdateOneRequiredWithoutPerformedRunsNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutRunNestedInput;
    inspectedBy?: Prisma.EmployeeUpdateOneWithoutInspectedRunsNestedInput;
};
export type ProductionRunUncheckedUpdateWithoutProductMovementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutRunNestedInput;
};
export type ProductionRunCreateManyPerformedByInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    inspectedById?: string | null;
};
export type ProductionRunCreateManyInspectedByInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    productionOrderId: string;
    performedById: string;
};
export type ProductionRunUpdateWithoutPerformedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutRunsNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutRunNestedInput;
    inspectedBy?: Prisma.EmployeeUpdateOneWithoutInspectedRunsNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateWithoutPerformedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutRunNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateManyWithoutPerformedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionRunUpdateWithoutInspectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrder?: Prisma.ProductionOrderUpdateOneRequiredWithoutRunsNestedInput;
    performedBy?: Prisma.EmployeeUpdateOneRequiredWithoutPerformedRunsNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutRunNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateWithoutInspectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutRunNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateManyWithoutInspectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductionRunCreateManyProductionOrderInput = {
    id?: string;
    recordedAt?: Date | string;
    actualQuantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    inspectedAt?: Date | string | null;
    inspectionNote?: string | null;
    performedById: string;
    inspectedById?: string | null;
};
export type ProductionRunUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedBy?: Prisma.EmployeeUpdateOneRequiredWithoutPerformedRunsNestedInput;
    consumptions?: Prisma.ConsumptionLineUpdateManyWithoutRunNestedInput;
    inspectedBy?: Prisma.EmployeeUpdateOneWithoutInspectedRunsNestedInput;
    productMovement?: Prisma.ProductMovementUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptions?: Prisma.ConsumptionLineUncheckedUpdateManyWithoutRunNestedInput;
    productMovement?: Prisma.ProductMovementUncheckedUpdateOneWithoutRunNestedInput;
};
export type ProductionRunUncheckedUpdateManyWithoutProductionOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actualQuantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    acceptedQuantity?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    inspectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionRunCountOutputType = {
    consumptions: number;
};
export type ProductionRunCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    consumptions?: boolean | ProductionRunCountOutputTypeCountConsumptionsArgs;
};
export type ProductionRunCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductionRunCountOutputTypeCountConsumptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumptionLineWhereInput;
};
export type ProductionRunSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recordedAt?: boolean;
    actualQuantity?: boolean;
    acceptedQuantity?: boolean;
    status?: boolean;
    inspectedAt?: boolean;
    inspectionNote?: boolean;
    productionOrderId?: boolean;
    performedById?: boolean;
    inspectedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    consumptions?: boolean | Prisma.ProductionRun$consumptionsArgs<ExtArgs>;
    inspectedBy?: boolean | Prisma.ProductionRun$inspectedByArgs<ExtArgs>;
    productMovement?: boolean | Prisma.ProductionRun$productMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductionRunCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productionRun"]>;
export type ProductionRunSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recordedAt?: boolean;
    actualQuantity?: boolean;
    acceptedQuantity?: boolean;
    status?: boolean;
    inspectedAt?: boolean;
    inspectionNote?: boolean;
    productionOrderId?: boolean;
    performedById?: boolean;
    inspectedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    inspectedBy?: boolean | Prisma.ProductionRun$inspectedByArgs<ExtArgs>;
}, ExtArgs["result"]["productionRun"]>;
export type ProductionRunSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recordedAt?: boolean;
    actualQuantity?: boolean;
    acceptedQuantity?: boolean;
    status?: boolean;
    inspectedAt?: boolean;
    inspectionNote?: boolean;
    productionOrderId?: boolean;
    performedById?: boolean;
    inspectedById?: boolean;
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    inspectedBy?: boolean | Prisma.ProductionRun$inspectedByArgs<ExtArgs>;
}, ExtArgs["result"]["productionRun"]>;
export type ProductionRunSelectScalar = {
    id?: boolean;
    recordedAt?: boolean;
    actualQuantity?: boolean;
    acceptedQuantity?: boolean;
    status?: boolean;
    inspectedAt?: boolean;
    inspectionNote?: boolean;
    productionOrderId?: boolean;
    performedById?: boolean;
    inspectedById?: boolean;
};
export type ProductionRunOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "recordedAt" | "actualQuantity" | "acceptedQuantity" | "status" | "inspectedAt" | "inspectionNote" | "productionOrderId" | "performedById" | "inspectedById", ExtArgs["result"]["productionRun"]>;
export type ProductionRunInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    consumptions?: boolean | Prisma.ProductionRun$consumptionsArgs<ExtArgs>;
    inspectedBy?: boolean | Prisma.ProductionRun$inspectedByArgs<ExtArgs>;
    productMovement?: boolean | Prisma.ProductionRun$productMovementArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductionRunCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductionRunIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    inspectedBy?: boolean | Prisma.ProductionRun$inspectedByArgs<ExtArgs>;
};
export type ProductionRunIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productionOrder?: boolean | Prisma.ProductionOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
    inspectedBy?: boolean | Prisma.ProductionRun$inspectedByArgs<ExtArgs>;
};
export type $ProductionRunPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductionRun";
    objects: {
        productionOrder: Prisma.$ProductionOrderPayload<ExtArgs>;
        performedBy: Prisma.$EmployeePayload<ExtArgs>;
        consumptions: Prisma.$ConsumptionLinePayload<ExtArgs>[];
        inspectedBy: Prisma.$EmployeePayload<ExtArgs> | null;
        productMovement: Prisma.$ProductMovementPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        recordedAt: Date;
        actualQuantity: runtime.Decimal;
        acceptedQuantity: runtime.Decimal | null;
        status: string;
        inspectedAt: Date | null;
        inspectionNote: string | null;
        productionOrderId: string;
        performedById: string;
        inspectedById: string | null;
    }, ExtArgs["result"]["productionRun"]>;
    composites: {};
};
export type ProductionRunGetPayload<S extends boolean | null | undefined | ProductionRunDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload, S>;
export type ProductionRunCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductionRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductionRunCountAggregateInputType | true;
};
export interface ProductionRunDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductionRun'];
        meta: {
            name: 'ProductionRun';
        };
    };
    findUnique<T extends ProductionRunFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductionRunFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductionRunFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductionRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductionRunFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductionRunFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductionRunFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductionRunFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductionRunFindManyArgs>(args?: Prisma.SelectSubset<T, ProductionRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductionRunCreateArgs>(args: Prisma.SelectSubset<T, ProductionRunCreateArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductionRunCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductionRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductionRunCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductionRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductionRunDeleteArgs>(args: Prisma.SelectSubset<T, ProductionRunDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductionRunUpdateArgs>(args: Prisma.SelectSubset<T, ProductionRunUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductionRunDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductionRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductionRunUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductionRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductionRunUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductionRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductionRunUpsertArgs>(args: Prisma.SelectSubset<T, ProductionRunUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductionRunCountArgs>(args?: Prisma.Subset<T, ProductionRunCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductionRunCountAggregateOutputType> : number>;
    aggregate<T extends ProductionRunAggregateArgs>(args: Prisma.Subset<T, ProductionRunAggregateArgs>): Prisma.PrismaPromise<GetProductionRunAggregateType<T>>;
    groupBy<T extends ProductionRunGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductionRunGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductionRunGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductionRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductionRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductionRunFieldRefs;
}
export interface Prisma__ProductionRunClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    productionOrder<T extends Prisma.ProductionOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductionOrderClient<runtime.Types.Result.GetResult<Prisma.$ProductionOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    performedBy<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    consumptions<T extends Prisma.ProductionRun$consumptionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionRun$consumptionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inspectedBy<T extends Prisma.ProductionRun$inspectedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionRun$inspectedByArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    productMovement<T extends Prisma.ProductionRun$productMovementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionRun$productMovementArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductionRunFieldRefs {
    readonly id: Prisma.FieldRef<"ProductionRun", 'String'>;
    readonly recordedAt: Prisma.FieldRef<"ProductionRun", 'DateTime'>;
    readonly actualQuantity: Prisma.FieldRef<"ProductionRun", 'Decimal'>;
    readonly acceptedQuantity: Prisma.FieldRef<"ProductionRun", 'Decimal'>;
    readonly status: Prisma.FieldRef<"ProductionRun", 'String'>;
    readonly inspectedAt: Prisma.FieldRef<"ProductionRun", 'DateTime'>;
    readonly inspectionNote: Prisma.FieldRef<"ProductionRun", 'String'>;
    readonly productionOrderId: Prisma.FieldRef<"ProductionRun", 'String'>;
    readonly performedById: Prisma.FieldRef<"ProductionRun", 'String'>;
    readonly inspectedById: Prisma.FieldRef<"ProductionRun", 'String'>;
}
export type ProductionRunFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    where: Prisma.ProductionRunWhereUniqueInput;
};
export type ProductionRunFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    where: Prisma.ProductionRunWhereUniqueInput;
};
export type ProductionRunFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductionRunFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductionRunFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductionRunCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionRunCreateInput, Prisma.ProductionRunUncheckedCreateInput>;
};
export type ProductionRunCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductionRunCreateManyInput | Prisma.ProductionRunCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductionRunCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    data: Prisma.ProductionRunCreateManyInput | Prisma.ProductionRunCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductionRunIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductionRunUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionRunUpdateInput, Prisma.ProductionRunUncheckedUpdateInput>;
    where: Prisma.ProductionRunWhereUniqueInput;
};
export type ProductionRunUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductionRunUpdateManyMutationInput, Prisma.ProductionRunUncheckedUpdateManyInput>;
    where?: Prisma.ProductionRunWhereInput;
    limit?: number;
};
export type ProductionRunUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionRunUpdateManyMutationInput, Prisma.ProductionRunUncheckedUpdateManyInput>;
    where?: Prisma.ProductionRunWhereInput;
    limit?: number;
    include?: Prisma.ProductionRunIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductionRunUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    where: Prisma.ProductionRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionRunCreateInput, Prisma.ProductionRunUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductionRunUpdateInput, Prisma.ProductionRunUncheckedUpdateInput>;
};
export type ProductionRunDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    where: Prisma.ProductionRunWhereUniqueInput;
};
export type ProductionRunDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionRunWhereInput;
    limit?: number;
};
export type ProductionRun$consumptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where?: Prisma.ConsumptionLineWhereInput;
    orderBy?: Prisma.ConsumptionLineOrderByWithRelationInput | Prisma.ConsumptionLineOrderByWithRelationInput[];
    cursor?: Prisma.ConsumptionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsumptionLineScalarFieldEnum | Prisma.ConsumptionLineScalarFieldEnum[];
};
export type ProductionRun$inspectedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type ProductionRun$productMovementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductionRunDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
};
