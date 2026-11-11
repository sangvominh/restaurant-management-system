import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialMovementModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialMovementPayload>;
export type AggregateMaterialMovement = {
    _count: MaterialMovementCountAggregateOutputType | null;
    _avg: MaterialMovementAvgAggregateOutputType | null;
    _sum: MaterialMovementSumAggregateOutputType | null;
    _min: MaterialMovementMinAggregateOutputType | null;
    _max: MaterialMovementMaxAggregateOutputType | null;
};
export type MaterialMovementAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type MaterialMovementSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type MaterialMovementMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    fromSource: string | null;
    toSource: string | null;
    postedAt: Date | null;
    lotId: string | null;
    receiptLineId: string | null;
    issueLineId: string | null;
    consumptionLineId: string | null;
    returnLineId: string | null;
    wasteLineId: string | null;
};
export type MaterialMovementMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    fromSource: string | null;
    toSource: string | null;
    postedAt: Date | null;
    lotId: string | null;
    receiptLineId: string | null;
    issueLineId: string | null;
    consumptionLineId: string | null;
    returnLineId: string | null;
    wasteLineId: string | null;
};
export type MaterialMovementCountAggregateOutputType = {
    id: number;
    quantity: number;
    fromSource: number;
    toSource: number;
    postedAt: number;
    lotId: number;
    receiptLineId: number;
    issueLineId: number;
    consumptionLineId: number;
    returnLineId: number;
    wasteLineId: number;
    _all: number;
};
export type MaterialMovementAvgAggregateInputType = {
    quantity?: true;
};
export type MaterialMovementSumAggregateInputType = {
    quantity?: true;
};
export type MaterialMovementMinAggregateInputType = {
    id?: true;
    quantity?: true;
    fromSource?: true;
    toSource?: true;
    postedAt?: true;
    lotId?: true;
    receiptLineId?: true;
    issueLineId?: true;
    consumptionLineId?: true;
    returnLineId?: true;
    wasteLineId?: true;
};
export type MaterialMovementMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    fromSource?: true;
    toSource?: true;
    postedAt?: true;
    lotId?: true;
    receiptLineId?: true;
    issueLineId?: true;
    consumptionLineId?: true;
    returnLineId?: true;
    wasteLineId?: true;
};
export type MaterialMovementCountAggregateInputType = {
    id?: true;
    quantity?: true;
    fromSource?: true;
    toSource?: true;
    postedAt?: true;
    lotId?: true;
    receiptLineId?: true;
    issueLineId?: true;
    consumptionLineId?: true;
    returnLineId?: true;
    wasteLineId?: true;
    _all?: true;
};
export type MaterialMovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialMovementWhereInput;
    orderBy?: Prisma.MaterialMovementOrderByWithRelationInput | Prisma.MaterialMovementOrderByWithRelationInput[];
    cursor?: Prisma.MaterialMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialMovementCountAggregateInputType;
    _avg?: MaterialMovementAvgAggregateInputType;
    _sum?: MaterialMovementSumAggregateInputType;
    _min?: MaterialMovementMinAggregateInputType;
    _max?: MaterialMovementMaxAggregateInputType;
};
export type GetMaterialMovementAggregateType<T extends MaterialMovementAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialMovement[P]> : Prisma.GetScalarType<T[P], AggregateMaterialMovement[P]>;
};
export type MaterialMovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialMovementWhereInput;
    orderBy?: Prisma.MaterialMovementOrderByWithAggregationInput | Prisma.MaterialMovementOrderByWithAggregationInput[];
    by: Prisma.MaterialMovementScalarFieldEnum[] | Prisma.MaterialMovementScalarFieldEnum;
    having?: Prisma.MaterialMovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialMovementCountAggregateInputType | true;
    _avg?: MaterialMovementAvgAggregateInputType;
    _sum?: MaterialMovementSumAggregateInputType;
    _min?: MaterialMovementMinAggregateInputType;
    _max?: MaterialMovementMaxAggregateInputType;
};
export type MaterialMovementGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    fromSource: string;
    toSource: string;
    postedAt: Date;
    lotId: string;
    receiptLineId: string | null;
    issueLineId: string | null;
    consumptionLineId: string | null;
    returnLineId: string | null;
    wasteLineId: string | null;
    _count: MaterialMovementCountAggregateOutputType | null;
    _avg: MaterialMovementAvgAggregateOutputType | null;
    _sum: MaterialMovementSumAggregateOutputType | null;
    _min: MaterialMovementMinAggregateOutputType | null;
    _max: MaterialMovementMaxAggregateOutputType | null;
};
export type GetMaterialMovementGroupByPayload<T extends MaterialMovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialMovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialMovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialMovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialMovementGroupByOutputType[P]>;
}>>;
export type MaterialMovementWhereInput = {
    AND?: Prisma.MaterialMovementWhereInput | Prisma.MaterialMovementWhereInput[];
    OR?: Prisma.MaterialMovementWhereInput[];
    NOT?: Prisma.MaterialMovementWhereInput | Prisma.MaterialMovementWhereInput[];
    id?: Prisma.UuidFilter<"MaterialMovement"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFilter<"MaterialMovement"> | string;
    toSource?: Prisma.StringFilter<"MaterialMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"MaterialMovement"> | Date | string;
    lotId?: Prisma.UuidFilter<"MaterialMovement"> | string;
    receiptLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    issueLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    consumptionLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    returnLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    lot?: Prisma.XOR<Prisma.MaterialLotScalarRelationFilter, Prisma.MaterialLotWhereInput>;
    receiptLine?: Prisma.XOR<Prisma.MaterialReceiptLineNullableScalarRelationFilter, Prisma.MaterialReceiptLineWhereInput> | null;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineNullableScalarRelationFilter, Prisma.MaterialIssueLineWhereInput> | null;
    consumptionLine?: Prisma.XOR<Prisma.ConsumptionLineNullableScalarRelationFilter, Prisma.ConsumptionLineWhereInput> | null;
    returnLine?: Prisma.XOR<Prisma.MaterialReturnLineNullableScalarRelationFilter, Prisma.MaterialReturnLineWhereInput> | null;
    wasteLine?: Prisma.XOR<Prisma.WasteLineNullableScalarRelationFilter, Prisma.WasteLineWhereInput> | null;
};
export type MaterialMovementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    fromSource?: Prisma.SortOrder;
    toSource?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    receiptLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    consumptionLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    returnLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    lot?: Prisma.MaterialLotOrderByWithRelationInput;
    receiptLine?: Prisma.MaterialReceiptLineOrderByWithRelationInput;
    issueLine?: Prisma.MaterialIssueLineOrderByWithRelationInput;
    consumptionLine?: Prisma.ConsumptionLineOrderByWithRelationInput;
    returnLine?: Prisma.MaterialReturnLineOrderByWithRelationInput;
    wasteLine?: Prisma.WasteLineOrderByWithRelationInput;
};
export type MaterialMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    receiptLineId?: string;
    issueLineId?: string;
    consumptionLineId?: string;
    returnLineId?: string;
    wasteLineId?: string;
    AND?: Prisma.MaterialMovementWhereInput | Prisma.MaterialMovementWhereInput[];
    OR?: Prisma.MaterialMovementWhereInput[];
    NOT?: Prisma.MaterialMovementWhereInput | Prisma.MaterialMovementWhereInput[];
    quantity?: Prisma.DecimalFilter<"MaterialMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFilter<"MaterialMovement"> | string;
    toSource?: Prisma.StringFilter<"MaterialMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"MaterialMovement"> | Date | string;
    lotId?: Prisma.UuidFilter<"MaterialMovement"> | string;
    lot?: Prisma.XOR<Prisma.MaterialLotScalarRelationFilter, Prisma.MaterialLotWhereInput>;
    receiptLine?: Prisma.XOR<Prisma.MaterialReceiptLineNullableScalarRelationFilter, Prisma.MaterialReceiptLineWhereInput> | null;
    issueLine?: Prisma.XOR<Prisma.MaterialIssueLineNullableScalarRelationFilter, Prisma.MaterialIssueLineWhereInput> | null;
    consumptionLine?: Prisma.XOR<Prisma.ConsumptionLineNullableScalarRelationFilter, Prisma.ConsumptionLineWhereInput> | null;
    returnLine?: Prisma.XOR<Prisma.MaterialReturnLineNullableScalarRelationFilter, Prisma.MaterialReturnLineWhereInput> | null;
    wasteLine?: Prisma.XOR<Prisma.WasteLineNullableScalarRelationFilter, Prisma.WasteLineWhereInput> | null;
}, "id" | "receiptLineId" | "issueLineId" | "consumptionLineId" | "returnLineId" | "wasteLineId">;
export type MaterialMovementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    fromSource?: Prisma.SortOrder;
    toSource?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    receiptLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    consumptionLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    returnLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MaterialMovementCountOrderByAggregateInput;
    _avg?: Prisma.MaterialMovementAvgOrderByAggregateInput;
    _max?: Prisma.MaterialMovementMaxOrderByAggregateInput;
    _min?: Prisma.MaterialMovementMinOrderByAggregateInput;
    _sum?: Prisma.MaterialMovementSumOrderByAggregateInput;
};
export type MaterialMovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialMovementScalarWhereWithAggregatesInput | Prisma.MaterialMovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialMovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialMovementScalarWhereWithAggregatesInput | Prisma.MaterialMovementScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialMovement"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"MaterialMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringWithAggregatesFilter<"MaterialMovement"> | string;
    toSource?: Prisma.StringWithAggregatesFilter<"MaterialMovement"> | string;
    postedAt?: Prisma.DateTimeWithAggregatesFilter<"MaterialMovement"> | Date | string;
    lotId?: Prisma.UuidWithAggregatesFilter<"MaterialMovement"> | string;
    receiptLineId?: Prisma.UuidNullableWithAggregatesFilter<"MaterialMovement"> | string | null;
    issueLineId?: Prisma.UuidNullableWithAggregatesFilter<"MaterialMovement"> | string | null;
    consumptionLineId?: Prisma.UuidNullableWithAggregatesFilter<"MaterialMovement"> | string | null;
    returnLineId?: Prisma.UuidNullableWithAggregatesFilter<"MaterialMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableWithAggregatesFilter<"MaterialMovement"> | string | null;
};
export type MaterialMovementCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lot: Prisma.MaterialLotCreateNestedOneWithoutMovementsInput;
    receiptLine?: Prisma.MaterialReceiptLineCreateNestedOneWithoutMaterialMovementInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutMaterialMovementInput;
    consumptionLine?: Prisma.ConsumptionLineCreateNestedOneWithoutMaterialMovementInput;
    returnLine?: Prisma.MaterialReturnLineCreateNestedOneWithoutMaterialMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutMaterialMovementInput;
};
export type MaterialMovementUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lotId: string;
    receiptLineId?: string | null;
    issueLineId?: string | null;
    consumptionLineId?: string | null;
    returnLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutMovementsNestedInput;
    receiptLine?: Prisma.MaterialReceiptLineUpdateOneWithoutMaterialMovementNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutMaterialMovementNestedInput;
    consumptionLine?: Prisma.ConsumptionLineUpdateOneWithoutMaterialMovementNestedInput;
    returnLine?: Prisma.MaterialReturnLineUpdateOneWithoutMaterialMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutMaterialMovementNestedInput;
};
export type MaterialMovementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lotId: string;
    receiptLineId?: string | null;
    issueLineId?: string | null;
    consumptionLineId?: string | null;
    returnLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaterialMovementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementListRelationFilter = {
    every?: Prisma.MaterialMovementWhereInput;
    some?: Prisma.MaterialMovementWhereInput;
    none?: Prisma.MaterialMovementWhereInput;
};
export type MaterialMovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialMovementNullableScalarRelationFilter = {
    is?: Prisma.MaterialMovementWhereInput | null;
    isNot?: Prisma.MaterialMovementWhereInput | null;
};
export type MaterialMovementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    fromSource?: Prisma.SortOrder;
    toSource?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    receiptLineId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    consumptionLineId?: Prisma.SortOrder;
    returnLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type MaterialMovementAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MaterialMovementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    fromSource?: Prisma.SortOrder;
    toSource?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    receiptLineId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    consumptionLineId?: Prisma.SortOrder;
    returnLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type MaterialMovementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    fromSource?: Prisma.SortOrder;
    toSource?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    lotId?: Prisma.SortOrder;
    receiptLineId?: Prisma.SortOrder;
    issueLineId?: Prisma.SortOrder;
    consumptionLineId?: Prisma.SortOrder;
    returnLineId?: Prisma.SortOrder;
    wasteLineId?: Prisma.SortOrder;
};
export type MaterialMovementSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MaterialMovementCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutLotInput, Prisma.MaterialMovementUncheckedCreateWithoutLotInput> | Prisma.MaterialMovementCreateWithoutLotInput[] | Prisma.MaterialMovementUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutLotInput | Prisma.MaterialMovementCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.MaterialMovementCreateManyLotInputEnvelope;
    connect?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
};
export type MaterialMovementUncheckedCreateNestedManyWithoutLotInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutLotInput, Prisma.MaterialMovementUncheckedCreateWithoutLotInput> | Prisma.MaterialMovementCreateWithoutLotInput[] | Prisma.MaterialMovementUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutLotInput | Prisma.MaterialMovementCreateOrConnectWithoutLotInput[];
    createMany?: Prisma.MaterialMovementCreateManyLotInputEnvelope;
    connect?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
};
export type MaterialMovementUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutLotInput, Prisma.MaterialMovementUncheckedCreateWithoutLotInput> | Prisma.MaterialMovementCreateWithoutLotInput[] | Prisma.MaterialMovementUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutLotInput | Prisma.MaterialMovementCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.MaterialMovementUpsertWithWhereUniqueWithoutLotInput | Prisma.MaterialMovementUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.MaterialMovementCreateManyLotInputEnvelope;
    set?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    disconnect?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    delete?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    connect?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    update?: Prisma.MaterialMovementUpdateWithWhereUniqueWithoutLotInput | Prisma.MaterialMovementUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.MaterialMovementUpdateManyWithWhereWithoutLotInput | Prisma.MaterialMovementUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.MaterialMovementScalarWhereInput | Prisma.MaterialMovementScalarWhereInput[];
};
export type MaterialMovementUncheckedUpdateManyWithoutLotNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutLotInput, Prisma.MaterialMovementUncheckedCreateWithoutLotInput> | Prisma.MaterialMovementCreateWithoutLotInput[] | Prisma.MaterialMovementUncheckedCreateWithoutLotInput[];
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutLotInput | Prisma.MaterialMovementCreateOrConnectWithoutLotInput[];
    upsert?: Prisma.MaterialMovementUpsertWithWhereUniqueWithoutLotInput | Prisma.MaterialMovementUpsertWithWhereUniqueWithoutLotInput[];
    createMany?: Prisma.MaterialMovementCreateManyLotInputEnvelope;
    set?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    disconnect?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    delete?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    connect?: Prisma.MaterialMovementWhereUniqueInput | Prisma.MaterialMovementWhereUniqueInput[];
    update?: Prisma.MaterialMovementUpdateWithWhereUniqueWithoutLotInput | Prisma.MaterialMovementUpdateWithWhereUniqueWithoutLotInput[];
    updateMany?: Prisma.MaterialMovementUpdateManyWithWhereWithoutLotInput | Prisma.MaterialMovementUpdateManyWithWhereWithoutLotInput[];
    deleteMany?: Prisma.MaterialMovementScalarWhereInput | Prisma.MaterialMovementScalarWhereInput[];
};
export type MaterialMovementCreateNestedOneWithoutReceiptLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReceiptLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUncheckedCreateNestedOneWithoutReceiptLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReceiptLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUpdateOneWithoutReceiptLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReceiptLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutReceiptLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutReceiptLineInput, Prisma.MaterialMovementUpdateWithoutReceiptLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutReceiptLineInput>;
};
export type MaterialMovementUncheckedUpdateOneWithoutReceiptLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReceiptLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReceiptLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutReceiptLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutReceiptLineInput, Prisma.MaterialMovementUpdateWithoutReceiptLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutReceiptLineInput>;
};
export type MaterialMovementCreateNestedOneWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedCreateWithoutIssueLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutIssueLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUncheckedCreateNestedOneWithoutIssueLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedCreateWithoutIssueLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutIssueLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUpdateOneWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedCreateWithoutIssueLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutIssueLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutIssueLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutIssueLineInput, Prisma.MaterialMovementUpdateWithoutIssueLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutIssueLineInput>;
};
export type MaterialMovementUncheckedUpdateOneWithoutIssueLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedCreateWithoutIssueLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutIssueLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutIssueLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutIssueLineInput, Prisma.MaterialMovementUpdateWithoutIssueLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutIssueLineInput>;
};
export type MaterialMovementCreateNestedOneWithoutReturnLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReturnLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReturnLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUncheckedCreateNestedOneWithoutReturnLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReturnLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReturnLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUpdateOneWithoutReturnLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReturnLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReturnLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutReturnLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutReturnLineInput, Prisma.MaterialMovementUpdateWithoutReturnLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutReturnLineInput>;
};
export type MaterialMovementUncheckedUpdateOneWithoutReturnLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReturnLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutReturnLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutReturnLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutReturnLineInput, Prisma.MaterialMovementUpdateWithoutReturnLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutReturnLineInput>;
};
export type MaterialMovementCreateNestedOneWithoutWasteLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutWasteLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUncheckedCreateNestedOneWithoutWasteLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutWasteLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUpdateOneWithoutWasteLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutWasteLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutWasteLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutWasteLineInput, Prisma.MaterialMovementUpdateWithoutWasteLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type MaterialMovementUncheckedUpdateOneWithoutWasteLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedCreateWithoutWasteLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutWasteLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutWasteLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutWasteLineInput, Prisma.MaterialMovementUpdateWithoutWasteLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type MaterialMovementCreateNestedOneWithoutConsumptionLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedCreateWithoutConsumptionLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutConsumptionLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUncheckedCreateNestedOneWithoutConsumptionLineInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedCreateWithoutConsumptionLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutConsumptionLineInput;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUpdateOneWithoutConsumptionLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedCreateWithoutConsumptionLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutConsumptionLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutConsumptionLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutConsumptionLineInput, Prisma.MaterialMovementUpdateWithoutConsumptionLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutConsumptionLineInput>;
};
export type MaterialMovementUncheckedUpdateOneWithoutConsumptionLineNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialMovementCreateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedCreateWithoutConsumptionLineInput>;
    connectOrCreate?: Prisma.MaterialMovementCreateOrConnectWithoutConsumptionLineInput;
    upsert?: Prisma.MaterialMovementUpsertWithoutConsumptionLineInput;
    disconnect?: Prisma.MaterialMovementWhereInput | boolean;
    delete?: Prisma.MaterialMovementWhereInput | boolean;
    connect?: Prisma.MaterialMovementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialMovementUpdateToOneWithWhereWithoutConsumptionLineInput, Prisma.MaterialMovementUpdateWithoutConsumptionLineInput>, Prisma.MaterialMovementUncheckedUpdateWithoutConsumptionLineInput>;
};
export type MaterialMovementCreateWithoutLotInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    receiptLine?: Prisma.MaterialReceiptLineCreateNestedOneWithoutMaterialMovementInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutMaterialMovementInput;
    consumptionLine?: Prisma.ConsumptionLineCreateNestedOneWithoutMaterialMovementInput;
    returnLine?: Prisma.MaterialReturnLineCreateNestedOneWithoutMaterialMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutMaterialMovementInput;
};
export type MaterialMovementUncheckedCreateWithoutLotInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    receiptLineId?: string | null;
    issueLineId?: string | null;
    consumptionLineId?: string | null;
    returnLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementCreateOrConnectWithoutLotInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutLotInput, Prisma.MaterialMovementUncheckedCreateWithoutLotInput>;
};
export type MaterialMovementCreateManyLotInputEnvelope = {
    data: Prisma.MaterialMovementCreateManyLotInput | Prisma.MaterialMovementCreateManyLotInput[];
    skipDuplicates?: boolean;
};
export type MaterialMovementUpsertWithWhereUniqueWithoutLotInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutLotInput, Prisma.MaterialMovementUncheckedUpdateWithoutLotInput>;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutLotInput, Prisma.MaterialMovementUncheckedCreateWithoutLotInput>;
};
export type MaterialMovementUpdateWithWhereUniqueWithoutLotInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutLotInput, Prisma.MaterialMovementUncheckedUpdateWithoutLotInput>;
};
export type MaterialMovementUpdateManyWithWhereWithoutLotInput = {
    where: Prisma.MaterialMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateManyMutationInput, Prisma.MaterialMovementUncheckedUpdateManyWithoutLotInput>;
};
export type MaterialMovementScalarWhereInput = {
    AND?: Prisma.MaterialMovementScalarWhereInput | Prisma.MaterialMovementScalarWhereInput[];
    OR?: Prisma.MaterialMovementScalarWhereInput[];
    NOT?: Prisma.MaterialMovementScalarWhereInput | Prisma.MaterialMovementScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialMovement"> | string;
    quantity?: Prisma.DecimalFilter<"MaterialMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFilter<"MaterialMovement"> | string;
    toSource?: Prisma.StringFilter<"MaterialMovement"> | string;
    postedAt?: Prisma.DateTimeFilter<"MaterialMovement"> | Date | string;
    lotId?: Prisma.UuidFilter<"MaterialMovement"> | string;
    receiptLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    issueLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    consumptionLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    returnLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
    wasteLineId?: Prisma.UuidNullableFilter<"MaterialMovement"> | string | null;
};
export type MaterialMovementCreateWithoutReceiptLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lot: Prisma.MaterialLotCreateNestedOneWithoutMovementsInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutMaterialMovementInput;
    consumptionLine?: Prisma.ConsumptionLineCreateNestedOneWithoutMaterialMovementInput;
    returnLine?: Prisma.MaterialReturnLineCreateNestedOneWithoutMaterialMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutMaterialMovementInput;
};
export type MaterialMovementUncheckedCreateWithoutReceiptLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lotId: string;
    issueLineId?: string | null;
    consumptionLineId?: string | null;
    returnLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementCreateOrConnectWithoutReceiptLineInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReceiptLineInput>;
};
export type MaterialMovementUpsertWithoutReceiptLineInput = {
    update: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutReceiptLineInput>;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReceiptLineInput>;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialMovementUpdateToOneWithWhereWithoutReceiptLineInput = {
    where?: Prisma.MaterialMovementWhereInput;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutReceiptLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutReceiptLineInput>;
};
export type MaterialMovementUpdateWithoutReceiptLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutMovementsNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutMaterialMovementNestedInput;
    consumptionLine?: Prisma.ConsumptionLineUpdateOneWithoutMaterialMovementNestedInput;
    returnLine?: Prisma.MaterialReturnLineUpdateOneWithoutMaterialMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutMaterialMovementNestedInput;
};
export type MaterialMovementUncheckedUpdateWithoutReceiptLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementCreateWithoutIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lot: Prisma.MaterialLotCreateNestedOneWithoutMovementsInput;
    receiptLine?: Prisma.MaterialReceiptLineCreateNestedOneWithoutMaterialMovementInput;
    consumptionLine?: Prisma.ConsumptionLineCreateNestedOneWithoutMaterialMovementInput;
    returnLine?: Prisma.MaterialReturnLineCreateNestedOneWithoutMaterialMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutMaterialMovementInput;
};
export type MaterialMovementUncheckedCreateWithoutIssueLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lotId: string;
    receiptLineId?: string | null;
    consumptionLineId?: string | null;
    returnLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementCreateOrConnectWithoutIssueLineInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedCreateWithoutIssueLineInput>;
};
export type MaterialMovementUpsertWithoutIssueLineInput = {
    update: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutIssueLineInput>;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedCreateWithoutIssueLineInput>;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialMovementUpdateToOneWithWhereWithoutIssueLineInput = {
    where?: Prisma.MaterialMovementWhereInput;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutIssueLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutIssueLineInput>;
};
export type MaterialMovementUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutMovementsNestedInput;
    receiptLine?: Prisma.MaterialReceiptLineUpdateOneWithoutMaterialMovementNestedInput;
    consumptionLine?: Prisma.ConsumptionLineUpdateOneWithoutMaterialMovementNestedInput;
    returnLine?: Prisma.MaterialReturnLineUpdateOneWithoutMaterialMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutMaterialMovementNestedInput;
};
export type MaterialMovementUncheckedUpdateWithoutIssueLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementCreateWithoutReturnLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lot: Prisma.MaterialLotCreateNestedOneWithoutMovementsInput;
    receiptLine?: Prisma.MaterialReceiptLineCreateNestedOneWithoutMaterialMovementInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutMaterialMovementInput;
    consumptionLine?: Prisma.ConsumptionLineCreateNestedOneWithoutMaterialMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutMaterialMovementInput;
};
export type MaterialMovementUncheckedCreateWithoutReturnLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lotId: string;
    receiptLineId?: string | null;
    issueLineId?: string | null;
    consumptionLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementCreateOrConnectWithoutReturnLineInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReturnLineInput>;
};
export type MaterialMovementUpsertWithoutReturnLineInput = {
    update: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutReturnLineInput>;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedCreateWithoutReturnLineInput>;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialMovementUpdateToOneWithWhereWithoutReturnLineInput = {
    where?: Prisma.MaterialMovementWhereInput;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutReturnLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutReturnLineInput>;
};
export type MaterialMovementUpdateWithoutReturnLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutMovementsNestedInput;
    receiptLine?: Prisma.MaterialReceiptLineUpdateOneWithoutMaterialMovementNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutMaterialMovementNestedInput;
    consumptionLine?: Prisma.ConsumptionLineUpdateOneWithoutMaterialMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutMaterialMovementNestedInput;
};
export type MaterialMovementUncheckedUpdateWithoutReturnLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementCreateWithoutWasteLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lot: Prisma.MaterialLotCreateNestedOneWithoutMovementsInput;
    receiptLine?: Prisma.MaterialReceiptLineCreateNestedOneWithoutMaterialMovementInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutMaterialMovementInput;
    consumptionLine?: Prisma.ConsumptionLineCreateNestedOneWithoutMaterialMovementInput;
    returnLine?: Prisma.MaterialReturnLineCreateNestedOneWithoutMaterialMovementInput;
};
export type MaterialMovementUncheckedCreateWithoutWasteLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lotId: string;
    receiptLineId?: string | null;
    issueLineId?: string | null;
    consumptionLineId?: string | null;
    returnLineId?: string | null;
};
export type MaterialMovementCreateOrConnectWithoutWasteLineInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedCreateWithoutWasteLineInput>;
};
export type MaterialMovementUpsertWithoutWasteLineInput = {
    update: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutWasteLineInput>;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedCreateWithoutWasteLineInput>;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialMovementUpdateToOneWithWhereWithoutWasteLineInput = {
    where?: Prisma.MaterialMovementWhereInput;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutWasteLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutWasteLineInput>;
};
export type MaterialMovementUpdateWithoutWasteLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutMovementsNestedInput;
    receiptLine?: Prisma.MaterialReceiptLineUpdateOneWithoutMaterialMovementNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutMaterialMovementNestedInput;
    consumptionLine?: Prisma.ConsumptionLineUpdateOneWithoutMaterialMovementNestedInput;
    returnLine?: Prisma.MaterialReturnLineUpdateOneWithoutMaterialMovementNestedInput;
};
export type MaterialMovementUncheckedUpdateWithoutWasteLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementCreateWithoutConsumptionLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lot: Prisma.MaterialLotCreateNestedOneWithoutMovementsInput;
    receiptLine?: Prisma.MaterialReceiptLineCreateNestedOneWithoutMaterialMovementInput;
    issueLine?: Prisma.MaterialIssueLineCreateNestedOneWithoutMaterialMovementInput;
    returnLine?: Prisma.MaterialReturnLineCreateNestedOneWithoutMaterialMovementInput;
    wasteLine?: Prisma.WasteLineCreateNestedOneWithoutMaterialMovementInput;
};
export type MaterialMovementUncheckedCreateWithoutConsumptionLineInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    lotId: string;
    receiptLineId?: string | null;
    issueLineId?: string | null;
    returnLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementCreateOrConnectWithoutConsumptionLineInput = {
    where: Prisma.MaterialMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedCreateWithoutConsumptionLineInput>;
};
export type MaterialMovementUpsertWithoutConsumptionLineInput = {
    update: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutConsumptionLineInput>;
    create: Prisma.XOR<Prisma.MaterialMovementCreateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedCreateWithoutConsumptionLineInput>;
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialMovementUpdateToOneWithWhereWithoutConsumptionLineInput = {
    where?: Prisma.MaterialMovementWhereInput;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateWithoutConsumptionLineInput, Prisma.MaterialMovementUncheckedUpdateWithoutConsumptionLineInput>;
};
export type MaterialMovementUpdateWithoutConsumptionLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lot?: Prisma.MaterialLotUpdateOneRequiredWithoutMovementsNestedInput;
    receiptLine?: Prisma.MaterialReceiptLineUpdateOneWithoutMaterialMovementNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutMaterialMovementNestedInput;
    returnLine?: Prisma.MaterialReturnLineUpdateOneWithoutMaterialMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutMaterialMovementNestedInput;
};
export type MaterialMovementUncheckedUpdateWithoutConsumptionLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementCreateManyLotInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource: string;
    toSource: string;
    postedAt?: Date | string;
    receiptLineId?: string | null;
    issueLineId?: string | null;
    consumptionLineId?: string | null;
    returnLineId?: string | null;
    wasteLineId?: string | null;
};
export type MaterialMovementUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLine?: Prisma.MaterialReceiptLineUpdateOneWithoutMaterialMovementNestedInput;
    issueLine?: Prisma.MaterialIssueLineUpdateOneWithoutMaterialMovementNestedInput;
    consumptionLine?: Prisma.ConsumptionLineUpdateOneWithoutMaterialMovementNestedInput;
    returnLine?: Prisma.MaterialReturnLineUpdateOneWithoutMaterialMovementNestedInput;
    wasteLine?: Prisma.WasteLineUpdateOneWithoutMaterialMovementNestedInput;
};
export type MaterialMovementUncheckedUpdateWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementUncheckedUpdateManyWithoutLotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromSource?: Prisma.StringFieldUpdateOperationsInput | string;
    toSource?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consumptionLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    returnLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    wasteLineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MaterialMovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    fromSource?: boolean;
    toSource?: boolean;
    postedAt?: boolean;
    lotId?: boolean;
    receiptLineId?: boolean;
    issueLineId?: boolean;
    consumptionLineId?: boolean;
    returnLineId?: boolean;
    wasteLineId?: boolean;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    receiptLine?: boolean | Prisma.MaterialMovement$receiptLineArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialMovement$issueLineArgs<ExtArgs>;
    consumptionLine?: boolean | Prisma.MaterialMovement$consumptionLineArgs<ExtArgs>;
    returnLine?: boolean | Prisma.MaterialMovement$returnLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.MaterialMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["materialMovement"]>;
export type MaterialMovementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    fromSource?: boolean;
    toSource?: boolean;
    postedAt?: boolean;
    lotId?: boolean;
    receiptLineId?: boolean;
    issueLineId?: boolean;
    consumptionLineId?: boolean;
    returnLineId?: boolean;
    wasteLineId?: boolean;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    receiptLine?: boolean | Prisma.MaterialMovement$receiptLineArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialMovement$issueLineArgs<ExtArgs>;
    consumptionLine?: boolean | Prisma.MaterialMovement$consumptionLineArgs<ExtArgs>;
    returnLine?: boolean | Prisma.MaterialMovement$returnLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.MaterialMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["materialMovement"]>;
export type MaterialMovementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    fromSource?: boolean;
    toSource?: boolean;
    postedAt?: boolean;
    lotId?: boolean;
    receiptLineId?: boolean;
    issueLineId?: boolean;
    consumptionLineId?: boolean;
    returnLineId?: boolean;
    wasteLineId?: boolean;
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    receiptLine?: boolean | Prisma.MaterialMovement$receiptLineArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialMovement$issueLineArgs<ExtArgs>;
    consumptionLine?: boolean | Prisma.MaterialMovement$consumptionLineArgs<ExtArgs>;
    returnLine?: boolean | Prisma.MaterialMovement$returnLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.MaterialMovement$wasteLineArgs<ExtArgs>;
}, ExtArgs["result"]["materialMovement"]>;
export type MaterialMovementSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    fromSource?: boolean;
    toSource?: boolean;
    postedAt?: boolean;
    lotId?: boolean;
    receiptLineId?: boolean;
    issueLineId?: boolean;
    consumptionLineId?: boolean;
    returnLineId?: boolean;
    wasteLineId?: boolean;
};
export type MaterialMovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "fromSource" | "toSource" | "postedAt" | "lotId" | "receiptLineId" | "issueLineId" | "consumptionLineId" | "returnLineId" | "wasteLineId", ExtArgs["result"]["materialMovement"]>;
export type MaterialMovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    receiptLine?: boolean | Prisma.MaterialMovement$receiptLineArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialMovement$issueLineArgs<ExtArgs>;
    consumptionLine?: boolean | Prisma.MaterialMovement$consumptionLineArgs<ExtArgs>;
    returnLine?: boolean | Prisma.MaterialMovement$returnLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.MaterialMovement$wasteLineArgs<ExtArgs>;
};
export type MaterialMovementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    receiptLine?: boolean | Prisma.MaterialMovement$receiptLineArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialMovement$issueLineArgs<ExtArgs>;
    consumptionLine?: boolean | Prisma.MaterialMovement$consumptionLineArgs<ExtArgs>;
    returnLine?: boolean | Prisma.MaterialMovement$returnLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.MaterialMovement$wasteLineArgs<ExtArgs>;
};
export type MaterialMovementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lot?: boolean | Prisma.MaterialLotDefaultArgs<ExtArgs>;
    receiptLine?: boolean | Prisma.MaterialMovement$receiptLineArgs<ExtArgs>;
    issueLine?: boolean | Prisma.MaterialMovement$issueLineArgs<ExtArgs>;
    consumptionLine?: boolean | Prisma.MaterialMovement$consumptionLineArgs<ExtArgs>;
    returnLine?: boolean | Prisma.MaterialMovement$returnLineArgs<ExtArgs>;
    wasteLine?: boolean | Prisma.MaterialMovement$wasteLineArgs<ExtArgs>;
};
export type $MaterialMovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialMovement";
    objects: {
        lot: Prisma.$MaterialLotPayload<ExtArgs>;
        receiptLine: Prisma.$MaterialReceiptLinePayload<ExtArgs> | null;
        issueLine: Prisma.$MaterialIssueLinePayload<ExtArgs> | null;
        consumptionLine: Prisma.$ConsumptionLinePayload<ExtArgs> | null;
        returnLine: Prisma.$MaterialReturnLinePayload<ExtArgs> | null;
        wasteLine: Prisma.$WasteLinePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        fromSource: string;
        toSource: string;
        postedAt: Date;
        lotId: string;
        receiptLineId: string | null;
        issueLineId: string | null;
        consumptionLineId: string | null;
        returnLineId: string | null;
        wasteLineId: string | null;
    }, ExtArgs["result"]["materialMovement"]>;
    composites: {};
};
export type MaterialMovementGetPayload<S extends boolean | null | undefined | MaterialMovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload, S>;
export type MaterialMovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialMovementCountAggregateInputType | true;
};
export interface MaterialMovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialMovement'];
        meta: {
            name: 'MaterialMovement';
        };
    };
    findUnique<T extends MaterialMovementFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialMovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialMovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialMovementFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialMovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialMovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialMovementFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialMovementCreateArgs>(args: Prisma.SelectSubset<T, MaterialMovementCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialMovementCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialMovementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialMovementDeleteArgs>(args: Prisma.SelectSubset<T, MaterialMovementDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialMovementUpdateArgs>(args: Prisma.SelectSubset<T, MaterialMovementUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialMovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialMovementUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialMovementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialMovementUpsertArgs>(args: Prisma.SelectSubset<T, MaterialMovementUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialMovementClient<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialMovementCountArgs>(args?: Prisma.Subset<T, MaterialMovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialMovementCountAggregateOutputType> : number>;
    aggregate<T extends MaterialMovementAggregateArgs>(args: Prisma.Subset<T, MaterialMovementAggregateArgs>): Prisma.PrismaPromise<GetMaterialMovementAggregateType<T>>;
    groupBy<T extends MaterialMovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialMovementGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialMovementGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialMovementFieldRefs;
}
export interface Prisma__MaterialMovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lot<T extends Prisma.MaterialLotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialLotDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    receiptLine<T extends Prisma.MaterialMovement$receiptLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialMovement$receiptLineArgs<ExtArgs>>): Prisma.Prisma__MaterialReceiptLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    issueLine<T extends Prisma.MaterialMovement$issueLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialMovement$issueLineArgs<ExtArgs>>): Prisma.Prisma__MaterialIssueLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    consumptionLine<T extends Prisma.MaterialMovement$consumptionLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialMovement$consumptionLineArgs<ExtArgs>>): Prisma.Prisma__ConsumptionLineClient<runtime.Types.Result.GetResult<Prisma.$ConsumptionLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    returnLine<T extends Prisma.MaterialMovement$returnLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialMovement$returnLineArgs<ExtArgs>>): Prisma.Prisma__MaterialReturnLineClient<runtime.Types.Result.GetResult<Prisma.$MaterialReturnLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    wasteLine<T extends Prisma.MaterialMovement$wasteLineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialMovement$wasteLineArgs<ExtArgs>>): Prisma.Prisma__WasteLineClient<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialMovementFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly quantity: Prisma.FieldRef<"MaterialMovement", 'Decimal'>;
    readonly fromSource: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly toSource: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly postedAt: Prisma.FieldRef<"MaterialMovement", 'DateTime'>;
    readonly lotId: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly receiptLineId: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly issueLineId: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly consumptionLineId: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly returnLineId: Prisma.FieldRef<"MaterialMovement", 'String'>;
    readonly wasteLineId: Prisma.FieldRef<"MaterialMovement", 'String'>;
}
export type MaterialMovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
    orderBy?: Prisma.MaterialMovementOrderByWithRelationInput | Prisma.MaterialMovementOrderByWithRelationInput[];
    cursor?: Prisma.MaterialMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialMovementScalarFieldEnum | Prisma.MaterialMovementScalarFieldEnum[];
};
export type MaterialMovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
    orderBy?: Prisma.MaterialMovementOrderByWithRelationInput | Prisma.MaterialMovementOrderByWithRelationInput[];
    cursor?: Prisma.MaterialMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialMovementScalarFieldEnum | Prisma.MaterialMovementScalarFieldEnum[];
};
export type MaterialMovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where?: Prisma.MaterialMovementWhereInput;
    orderBy?: Prisma.MaterialMovementOrderByWithRelationInput | Prisma.MaterialMovementOrderByWithRelationInput[];
    cursor?: Prisma.MaterialMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialMovementScalarFieldEnum | Prisma.MaterialMovementScalarFieldEnum[];
};
export type MaterialMovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialMovementCreateInput, Prisma.MaterialMovementUncheckedCreateInput>;
};
export type MaterialMovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialMovementCreateManyInput | Prisma.MaterialMovementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialMovementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    data: Prisma.MaterialMovementCreateManyInput | Prisma.MaterialMovementCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialMovementIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialMovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateInput, Prisma.MaterialMovementUncheckedUpdateInput>;
    where: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialMovementUpdateManyMutationInput, Prisma.MaterialMovementUncheckedUpdateManyInput>;
    where?: Prisma.MaterialMovementWhereInput;
    limit?: number;
};
export type MaterialMovementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialMovementUpdateManyMutationInput, Prisma.MaterialMovementUncheckedUpdateManyInput>;
    where?: Prisma.MaterialMovementWhereInput;
    limit?: number;
    include?: Prisma.MaterialMovementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialMovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where: Prisma.MaterialMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialMovementCreateInput, Prisma.MaterialMovementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialMovementUpdateInput, Prisma.MaterialMovementUncheckedUpdateInput>;
};
export type MaterialMovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
    where: Prisma.MaterialMovementWhereUniqueInput;
};
export type MaterialMovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialMovementWhereInput;
    limit?: number;
};
export type MaterialMovement$receiptLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptLineWhereInput;
};
export type MaterialMovement$issueLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialMovement$consumptionLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumptionLineSelect<ExtArgs> | null;
    omit?: Prisma.ConsumptionLineOmit<ExtArgs> | null;
    include?: Prisma.ConsumptionLineInclude<ExtArgs> | null;
    where?: Prisma.ConsumptionLineWhereInput;
};
export type MaterialMovement$returnLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReturnLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReturnLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialReturnLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialReturnLineWhereInput;
};
export type MaterialMovement$wasteLineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where?: Prisma.WasteLineWhereInput;
};
export type MaterialMovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialMovementSelect<ExtArgs> | null;
    omit?: Prisma.MaterialMovementOmit<ExtArgs> | null;
    include?: Prisma.MaterialMovementInclude<ExtArgs> | null;
};
