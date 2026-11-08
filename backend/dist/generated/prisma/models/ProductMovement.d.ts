import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductMovementModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductMovementPayload>;
export type AggregateProductMovement = {
    _count: ProductMovementCountAggregateOutputType | null;
    _avg: ProductMovementAvgAggregateOutputType | null;
    _sum: ProductMovementSumAggregateOutputType | null;
    _min: ProductMovementMinAggregateOutputType | null;
    _max: ProductMovementMaxAggregateOutputType | null;
};
export type ProductMovementAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ProductMovementSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type ProductMovementMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    movementType: string | null;
    postedAt: Date | null;
    productId: string | null;
    runId: string | null;
    exportLineId: string | null;
    wasteLineId: string | null;
};
export type ProductMovementMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    movementType: string | null;
    postedAt: Date | null;
    productId: string | null;
    runId: string | null;
    exportLineId: string | null;
    wasteLineId: string | null;
};
export type ProductMovementCountAggregateOutputType = {
    id: number;
    quantity: number;
    movementType: number;
    postedAt: number;
    productId: number;
    runId: number;
    exportLineId: number;
    wasteLineId: number;
    _all: number;
};
export type ProductMovementAvgAggregateInputType = {
    quantity?: true;
};
export type ProductMovementSumAggregateInputType = {
    quantity?: true;
};
export type ProductMovementMinAggregateInputType = {
    id?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    productId?: true;
    runId?: true;
    exportLineId?: true;
    wasteLineId?: true;
};
export type ProductMovementMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    productId?: true;
    runId?: true;
    exportLineId?: true;
    wasteLineId?: true;
};
export type ProductMovementCountAggregateInputType = {
    id?: true;
    quantity?: true;
    movementType?: true;
    postedAt?: true;
    productId?: true;
    runId?: true;
    exportLineId?: true;
    wasteLineId?: true;
    _all?: true;
};
export type ProductMovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductMovementCountAggregateInputType;
    _avg?: ProductMovementAvgAggregateInputType;
    _sum?: ProductMovementSumAggregateInputType;
    _min?: ProductMovementMinAggregateInputType;
    _max?: ProductMovementMaxAggregateInputType;
};
export type GetProductMovementAggregateType<T extends ProductMovementAggregateArgs> = {
    [P in keyof T & keyof AggregateProductMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductMovement[P]> : Prisma.GetScalarType<T[P], AggregateProductMovement[P]>;
};
export type ProductMovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithAggregationInput | Prisma.ProductMovementOrderByWithAggregationInput[];
    by: Prisma.ProductMovementScalarFieldEnum[] | Prisma.ProductMovementScalarFieldEnum;
    having?: Prisma.ProductMovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductMovementCountAggregateInputType | true;
    _avg?: ProductMovementAvgAggregateInputType;
    _sum?: ProductMovementSumAggregateInputType;
    _min?: ProductMovementMinAggregateInputType;
    _max?: ProductMovementMaxAggregateInputType;
};
export type ProductMovementGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    movementType: string;
    postedAt: Date;
    productId: string;
    runId: string | null;
    exportLineId: string | null;
    wasteLineId: string | null;
    _count: ProductMovementCountAggregateOutputType | null;
    _avg: ProductMovementAvgAggregateOutputType | null;
    _sum: ProductMovementSumAggregateOutputType | null;
    _min: ProductMovementMinAggregateOutputType | null;
    _max: ProductMovementMaxAggregateOutputType | null;
};
export type GetProductMovementGroupByPayload<T extends ProductMovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductMovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductMovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductMovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductMovementGroupByOutputType[P]>;
}>>;
export type ProductMovementWhereInput = {
    AND?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    OR?: Prisma.ProductMovementWhereInput[];
    NOT?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    id?: Prisma.UuidFilter<"ProductMovement"> | string;
    quantity?: Prisma.DecimalFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidFilter<"ProductMovement"> | string;
    runId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    exportLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    run?: Prisma.XOR<Prisma.ProductionRunNullableScalarRelationFilter, Prisma.ProductionRunWhereInput> | null;
    exportLine?: Prisma.XOR<Prisma.ProductExportLineNullableScalarRelationFilter, Prisma.ProductExportLineWhereInput> | null;
    wasteLine?: Prisma.XOR<Prisma.WasteLineNullableScalarRelationFilter, Prisma.WasteLineWhereInput> | null;
};
export type ProductMovementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    runId?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    run?: Prisma.ProductionRunOrderByWithRelationInput;
    exportLine?: Prisma.ProductExportLineOrderByWithRelationInput;
    wasteLine?: Prisma.WasteLineOrderByWithRelationInput;
};
export type ProductMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    runId?: string;
    exportLineId?: string;
    wasteLineId?: string;
    AND?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    OR?: Prisma.ProductMovementWhereInput[];
    NOT?: Prisma.ProductMovementWhereInput | Prisma.ProductMovementWhereInput[];
    quantity?: Prisma.DecimalFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidFilter<"ProductMovement"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    run?: Prisma.XOR<Prisma.ProductionRunNullableScalarRelationFilter, Prisma.ProductionRunWhereInput> | null;
    exportLine?: Prisma.XOR<Prisma.ProductExportLineNullableScalarRelationFilter, Prisma.ProductExportLineWhereInput> | null;
    wasteLine?: Prisma.XOR<Prisma.WasteLineNullableScalarRelationFilter, Prisma.WasteLineWhereInput> | null;
}, "id" | "runId" | "exportLineId" | "wasteLineId">;
export type ProductMovementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    runId?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProductMovementCountOrderByAggregateInput;
    _avg?: Prisma.ProductMovementAvgOrderByAggregateInput;
    _max?: Prisma.ProductMovementMaxOrderByAggregateInput;
    _min?: Prisma.ProductMovementMinOrderByAggregateInput;
    _sum?: Prisma.ProductMovementSumOrderByAggregateInput;
};
export type ProductMovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductMovementScalarWhereWithAggregatesInput | Prisma.ProductMovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductMovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductMovementScalarWhereWithAggregatesInput | Prisma.ProductMovementScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductMovement"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringWithAggregatesFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidWithAggregatesFilter<"ProductMovement"> | string;
    runId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    exportLineId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableWithAggregatesFilter<"ProductMovement"> | string | null;
};
export type ProductMovementCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductMovementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementListRelationFilter = {
    every?: Prisma.ProductMovementWhereInput;
    some?: Prisma.ProductMovementWhereInput;
    none?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductMovementNullableScalarRelationFilter = {
    is?: Prisma.ProductMovementWhereInput | null;
    isNot?: Prisma.ProductMovementWhereInput | null;
};
export type ProductMovementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    exportLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type ProductMovementAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ProductMovementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    exportLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type ProductMovementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    runId?: Prisma.SortOrder;
    exportLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type ProductMovementSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type ProductMovementCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
};
export type ProductMovementUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
};
export type ProductMovementUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    set?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    disconnect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    delete?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    update?: Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput | Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
};
export type ProductMovementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput> | Prisma.ProductMovementCreateWithoutProductInput[] | Prisma.ProductMovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutProductInput | Prisma.ProductMovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductMovementCreateManyProductInputEnvelope;
    set?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    disconnect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    delete?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    connect?: Prisma.ProductMovementWhereUniqueInput | Prisma.ProductMovementWhereUniqueInput[];
    update?: Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductMovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput | Prisma.ProductMovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
};
export type ProductMovementCreateNestedOneWithoutWasteLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutWasteLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutWasteLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutWasteLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutWasteLineInput, Prisma.ProductMovementUpdateWithoutWasteLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutWasteLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutWasteLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutWasteLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutWasteLineInput, Prisma.ProductMovementUpdateWithoutWasteLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type ProductMovementCreateNestedOneWithoutRunInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutRunInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutRunNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    upsert?: Prisma.ProductMovementUpsertWithoutRunInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutRunInput, Prisma.ProductMovementUpdateWithoutRunInput>, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutRunNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutRunInput;
    upsert?: Prisma.ProductMovementUpsertWithoutRunInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutRunInput, Prisma.ProductMovementUpdateWithoutRunInput>, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
};
export type ProductMovementCreateNestedOneWithoutExportLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUncheckedCreateNestedOneWithoutExportLineInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    connect?: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateOneWithoutExportLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutExportLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutExportLineInput, Prisma.ProductMovementUpdateWithoutExportLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
};
export type ProductMovementUncheckedUpdateOneWithoutExportLineNestedInput = {
    create?: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    connectOrCreate?: Prisma.ProductMovementCreateOrConnectWithoutExportLineInput;
    upsert?: Prisma.ProductMovementUpsertWithoutExportLineInput;
    disconnect?: Prisma.ProductMovementWhereInput | boolean;
    delete?: Prisma.ProductMovementWhereInput | boolean;
    connect?: Prisma.ProductMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductMovementUpdateToOneWithWhereWithoutExportLineInput, Prisma.ProductMovementUpdateWithoutExportLineInput>, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
};
export type ProductMovementCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput>;
};
export type ProductMovementCreateManyProductInputEnvelope = {
    data: Prisma.ProductMovementCreateManyProductInput | Prisma.ProductMovementCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductMovementUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutProductInput, Prisma.ProductMovementUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutProductInput, Prisma.ProductMovementUncheckedCreateWithoutProductInput>;
};
export type ProductMovementUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutProductInput, Prisma.ProductMovementUncheckedUpdateWithoutProductInput>;
};
export type ProductMovementUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateManyMutationInput, Prisma.ProductMovementUncheckedUpdateManyWithoutProductInput>;
};
export type ProductMovementScalarWhereInput = {
    AND?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
    OR?: Prisma.ProductMovementScalarWhereInput[];
    NOT?: Prisma.ProductMovementScalarWhereInput | Prisma.ProductMovementScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductMovement"> | string;
    quantity?: Prisma.DecimalFilter<"ProductMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFilter<"ProductMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"ProductMovement"> | Date | string;
    productId?: Prisma.UuidFilter<"ProductMovement"> | string;
    runId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    exportLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableFilter<"ProductMovement"> | string | null;
};
export type ProductMovementCreateWithoutWasteLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutWasteLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    runId?: string | null;
    exportLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutWasteLineInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
};
export type ProductMovementUpsertWithoutWasteLineInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutWasteLineInput, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutWasteLineInput, Prisma.ProductMovementUncheckedCreateWithoutWasteLineInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutWasteLineInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutWasteLineInput, Prisma.ProductMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type ProductMovementUpdateWithoutWasteLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutWasteLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutRunInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    exportLine?: Prisma.ProductExportLineCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutRunInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutRunInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
};
export type ProductMovementUpsertWithoutRunInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutRunInput, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutRunInput, Prisma.ProductMovementUncheckedCreateWithoutRunInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutRunInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutRunInput, Prisma.ProductMovementUncheckedUpdateWithoutRunInput>;
};
export type ProductMovementUpdateWithoutRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateWithoutExportLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    run?: Prisma.ProductionRunCreateNestedOneWithoutProductMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutProductMovementInput;
};
export type ProductMovementUncheckedCreateWithoutExportLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    productId: string;
    runId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementCreateOrConnectWithoutExportLineInput = {
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
};
export type ProductMovementUpsertWithoutExportLineInput = {
    update: Prisma.XOR<Prisma.ProductMovementUpdateWithoutExportLineInput, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
    create: Prisma.XOR<Prisma.ProductMovementCreateWithoutExportLineInput, Prisma.ProductMovementUncheckedCreateWithoutExportLineInput>;
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductMovementUpdateToOneWithWhereWithoutExportLineInput = {
    where?: Prisma.ProductMovementWhereInput;
    data: Prisma.XOR<Prisma.ProductMovementUpdateWithoutExportLineInput, Prisma.ProductMovementUncheckedUpdateWithoutExportLineInput>;
};
export type ProductMovementUpdateWithoutExportLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutExportLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementCreateManyProductInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType: string;
    postedAt?: Date | string;
    runId?: string | null;
    exportLineId?: string | null;
    wasteLineId?: string | null;
};
export type ProductMovementUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    run?: Prisma.ProductionRunUpdateOneWithoutProductMovementNestedInput;
    exportLine?: Prisma.ProductExportLineUpdateOneWithoutProductMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutProductMovementNestedInput;
};
export type ProductMovementUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    movementType?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    runId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exportLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductMovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["productMovement"]>;
export type ProductMovementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["productMovement"]>;
export type ProductMovementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["productMovement"]>;
export type ProductMovementSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    movementType?: boolean;
    postedAt?: boolean;
    productId?: boolean;
    runId?: boolean;
    exportLineId?: boolean;
    wasteLineId?: boolean;
};
export type ProductMovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "movementType" | "postedAt" | "productId" | "runId" | "exportLineId" | "wasteLineId", ExtArgs["result"]["productMovement"]>;
export type ProductMovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
};
export type ProductMovementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
};
export type ProductMovementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    run?: boolean | Prisma.ProductMovement$runArgs<ExtArgs>;
    exportLine?: boolean | Prisma.ProductMovement$exportLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.ProductMovement$wasteLineArgs<ExtArgs>;
};
export type $ProductMovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductMovement";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        run: Prisma.$ProductionRunPayload<ExtArgs> | null;
        exportLine: Prisma.$ProductExportLinePayload<ExtArgs> | null;
        wasteLine: Prisma.$WasteLinePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        movementType: string;
        postedAt: Date;
        productId: string;
        runId: string | null;
        exportLineId: string | null;
        wasteLineId: string | null;
    }, ExtArgs["result"]["productMovement"]>;
    composites: {};
};
export type ProductMovementGetPayload<S extends boolean | null | undefined | ProductMovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload, S>;
export type ProductMovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductMovementCountAggregateInputType | true;
};
export interface ProductMovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductMovement'];
        meta: {
            name: 'ProductMovement';
        };
    };
    findUnique<T extends ProductMovementFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductMovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductMovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductMovementFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductMovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductMovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductMovementFindManyArgs>(args?: Prisma.SelectSubset<T, ProductMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductMovementCreateArgs>(args: Prisma.SelectSubset<T, ProductMovementCreateArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductMovementCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductMovementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductMovementDeleteArgs>(args: Prisma.SelectSubset<T, ProductMovementDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductMovementUpdateArgs>(args: Prisma.SelectSubset<T, ProductMovementUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductMovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductMovementUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductMovementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductMovementUpsertArgs>(args: Prisma.SelectSubset<T, ProductMovementUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductMovementClient<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductMovementCountArgs>(args?: Prisma.Subset<T, ProductMovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductMovementCountAggregateOutputType> : number>;
    aggregate<T extends ProductMovementAggregateArgs>(args: Prisma.Subset<T, ProductMovementAggregateArgs>): Prisma.PrismaPromise<GetProductMovementAggregateType<T>>;
    groupBy<T extends ProductMovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductMovementGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductMovementGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductMovementFieldRefs;
}
export interface Prisma__ProductMovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    run<T extends Prisma.ProductMovement$runArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$runArgs<ExtArgs>>): Prisma.Prisma__ProductionRunClient<runtime.Types.Result.GetResult<Prisma.$ProductionRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    exportLine<T extends Prisma.ProductMovement$exportLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$exportLineArgs<ExtArgs>>): Prisma.Prisma__ProductExportLineClient<runtime.Types.Result.GetResult<Prisma.$ProductExportLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    wasteLine<T extends Prisma.ProductMovement$wasteLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductMovement$wasteLineArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductMovementFieldRefs {
    readonly id: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly quantity: Prisma.FieldRef<"ProductMovement", 'Decimal'>;
    readonly movementType: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly postedAt: Prisma.FieldRef<"ProductMovement", 'DateTime'>;
    readonly productId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly runId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly exportLineId: Prisma.FieldRef<"ProductMovement", 'String'>;
    readonly wasteLineId: Prisma.FieldRef<"ProductMovement", 'String'>;
}
export type ProductMovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductMovementScalarFieldEnum | Prisma.ProductMovementScalarFieldEnum[];
};
export type ProductMovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductMovementScalarFieldEnum | Prisma.ProductMovementScalarFieldEnum[];
};
export type ProductMovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductMovementScalarFieldEnum | Prisma.ProductMovementScalarFieldEnum[];
};
export type ProductMovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductMovementCreateInput, Prisma.ProductMovementUncheckedCreateInput>;
};
export type ProductMovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductMovementCreateManyInput | Prisma.ProductMovementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductMovementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    data: Prisma.ProductMovementCreateManyInput | Prisma.ProductMovementCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductMovementIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductMovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductMovementUpdateInput, Prisma.ProductMovementUncheckedUpdateInput>;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductMovementUpdateManyMutationInput, Prisma.ProductMovementUncheckedUpdateManyInput>;
    where?: Prisma.ProductMovementWhereInput;
    limit?: number;
};
export type ProductMovementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductMovementUpdateManyMutationInput, Prisma.ProductMovementUncheckedUpdateManyInput>;
    where?: Prisma.ProductMovementWhereInput;
    limit?: number;
    include?: Prisma.ProductMovementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductMovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductMovementCreateInput, Prisma.ProductMovementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductMovementUpdateInput, Prisma.ProductMovementUncheckedUpdateInput>;
};
export type ProductMovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where: Prisma.ProductMovementWhereUniqueInput;
};
export type ProductMovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductMovementWhereInput;
    limit?: number;
};
export type ProductMovement$runArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionRunSelect<ExtArgs> | null;
    omit?: Prisma.ProductionRunOmit<ExtArgs> | null;
    include?: Prisma.ProductionRunInclude<ExtArgs> | null;
    where?: Prisma.ProductionRunWhereInput;
};
export type ProductMovement$exportLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductExportLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductExportLineOmit<ExtArgs> | null;
    include?: Prisma.ProductExportLineInclude<ExtArgs> | null;
    where?: Prisma.ProductExportLineWhereInput;
};
export type ProductMovement$wasteLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where?: Prisma.WasteLineWhereInput;
};
export type ProductMovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
};
