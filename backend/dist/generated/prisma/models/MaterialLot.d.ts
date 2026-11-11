import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialLotModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialLotPayload>;
export type AggregateMaterialLot = {
    _count: MaterialLotCountAggregateOutputType | null;
    _min: MaterialLotMinAggregateOutputType | null;
    _max: MaterialLotMaxAggregateOutputType | null;
};
export type MaterialLotMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    expiryDate: Date | null;
    materialId: string | null;
};
export type MaterialLotMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    expiryDate: Date | null;
    materialId: string | null;
};
export type MaterialLotCountAggregateOutputType = {
    id: number;
    code: number;
    expiryDate: number;
    materialId: number;
    _all: number;
};
export type MaterialLotMinAggregateInputType = {
    id?: true;
    code?: true;
    expiryDate?: true;
    materialId?: true;
};
export type MaterialLotMaxAggregateInputType = {
    id?: true;
    code?: true;
    expiryDate?: true;
    materialId?: true;
};
export type MaterialLotCountAggregateInputType = {
    id?: true;
    code?: true;
    expiryDate?: true;
    materialId?: true;
    _all?: true;
};
export type MaterialLotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialLotWhereInput;
    orderBy?: Prisma.MaterialLotOrderByWithRelationInput | Prisma.MaterialLotOrderByWithRelationInput[];
    cursor?: Prisma.MaterialLotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialLotCountAggregateInputType;
    _min?: MaterialLotMinAggregateInputType;
    _max?: MaterialLotMaxAggregateInputType;
};
export type GetMaterialLotAggregateType<T extends MaterialLotAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterialLot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterialLot[P]> : Prisma.GetScalarType<T[P], AggregateMaterialLot[P]>;
};
export type MaterialLotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialLotWhereInput;
    orderBy?: Prisma.MaterialLotOrderByWithAggregationInput | Prisma.MaterialLotOrderByWithAggregationInput[];
    by: Prisma.MaterialLotScalarFieldEnum[] | Prisma.MaterialLotScalarFieldEnum;
    having?: Prisma.MaterialLotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialLotCountAggregateInputType | true;
    _min?: MaterialLotMinAggregateInputType;
    _max?: MaterialLotMaxAggregateInputType;
};
export type MaterialLotGroupByOutputType = {
    id: string;
    code: string;
    expiryDate: Date | null;
    materialId: string;
    _count: MaterialLotCountAggregateOutputType | null;
    _min: MaterialLotMinAggregateOutputType | null;
    _max: MaterialLotMaxAggregateOutputType | null;
};
export type GetMaterialLotGroupByPayload<T extends MaterialLotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialLotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialLotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialLotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialLotGroupByOutputType[P]>;
}>>;
export type MaterialLotWhereInput = {
    AND?: Prisma.MaterialLotWhereInput | Prisma.MaterialLotWhereInput[];
    OR?: Prisma.MaterialLotWhereInput[];
    NOT?: Prisma.MaterialLotWhereInput | Prisma.MaterialLotWhereInput[];
    id?: Prisma.UuidFilter<"MaterialLot"> | string;
    code?: Prisma.StringFilter<"MaterialLot"> | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"MaterialLot"> | Date | string | null;
    materialId?: Prisma.UuidFilter<"MaterialLot"> | string;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
    receiptLines?: Prisma.MaterialReceiptLineListRelationFilter;
    issueLines?: Prisma.MaterialIssueLineListRelationFilter;
    movements?: Prisma.MaterialMovementListRelationFilter;
    wasteLines?: Prisma.WasteLineListRelationFilter;
};
export type MaterialLotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    material?: Prisma.MaterialOrderByWithRelationInput;
    receiptLines?: Prisma.MaterialReceiptLineOrderByRelationAggregateInput;
    issueLines?: Prisma.MaterialIssueLineOrderByRelationAggregateInput;
    movements?: Prisma.MaterialMovementOrderByRelationAggregateInput;
    wasteLines?: Prisma.WasteLineOrderByRelationAggregateInput;
};
export type MaterialLotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    materialId_code?: Prisma.MaterialLotMaterialIdCodeCompoundUniqueInput;
    AND?: Prisma.MaterialLotWhereInput | Prisma.MaterialLotWhereInput[];
    OR?: Prisma.MaterialLotWhereInput[];
    NOT?: Prisma.MaterialLotWhereInput | Prisma.MaterialLotWhereInput[];
    code?: Prisma.StringFilter<"MaterialLot"> | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"MaterialLot"> | Date | string | null;
    materialId?: Prisma.UuidFilter<"MaterialLot"> | string;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
    receiptLines?: Prisma.MaterialReceiptLineListRelationFilter;
    issueLines?: Prisma.MaterialIssueLineListRelationFilter;
    movements?: Prisma.MaterialMovementListRelationFilter;
    wasteLines?: Prisma.WasteLineListRelationFilter;
}, "id" | "materialId_code">;
export type MaterialLotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    _count?: Prisma.MaterialLotCountOrderByAggregateInput;
    _max?: Prisma.MaterialLotMaxOrderByAggregateInput;
    _min?: Prisma.MaterialLotMinOrderByAggregateInput;
};
export type MaterialLotScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialLotScalarWhereWithAggregatesInput | Prisma.MaterialLotScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialLotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialLotScalarWhereWithAggregatesInput | Prisma.MaterialLotScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MaterialLot"> | string;
    code?: Prisma.StringWithAggregatesFilter<"MaterialLot"> | string;
    expiryDate?: Prisma.DateTimeNullableWithAggregatesFilter<"MaterialLot"> | Date | string | null;
    materialId?: Prisma.UuidWithAggregatesFilter<"MaterialLot"> | string;
};
export type MaterialLotCreateInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    material: Prisma.MaterialCreateNestedOneWithoutLotsInput;
    receiptLines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutLotInput;
};
export type MaterialLotUncheckedCreateInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    materialId: string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementUncheckedCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutLotInput;
};
export type MaterialLotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    material?: Prisma.MaterialUpdateOneRequiredWithoutLotsNestedInput;
    receiptLines?: Prisma.MaterialReceiptLineUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutLotNestedInput;
};
export type MaterialLotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUncheckedUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutLotNestedInput;
};
export type MaterialLotCreateManyInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    materialId: string;
};
export type MaterialLotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MaterialLotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialLotListRelationFilter = {
    every?: Prisma.MaterialLotWhereInput;
    some?: Prisma.MaterialLotWhereInput;
    none?: Prisma.MaterialLotWhereInput;
};
export type MaterialLotOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialLotMaterialIdCodeCompoundUniqueInput = {
    materialId: string;
    code: string;
};
export type MaterialLotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
};
export type MaterialLotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
};
export type MaterialLotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
};
export type MaterialLotScalarRelationFilter = {
    is?: Prisma.MaterialLotWhereInput;
    isNot?: Prisma.MaterialLotWhereInput;
};
export type MaterialLotNullableScalarRelationFilter = {
    is?: Prisma.MaterialLotWhereInput | null;
    isNot?: Prisma.MaterialLotWhereInput | null;
};
export type MaterialLotCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutMaterialInput, Prisma.MaterialLotUncheckedCreateWithoutMaterialInput> | Prisma.MaterialLotCreateWithoutMaterialInput[] | Prisma.MaterialLotUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutMaterialInput | Prisma.MaterialLotCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.MaterialLotCreateManyMaterialInputEnvelope;
    connect?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
};
export type MaterialLotUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutMaterialInput, Prisma.MaterialLotUncheckedCreateWithoutMaterialInput> | Prisma.MaterialLotCreateWithoutMaterialInput[] | Prisma.MaterialLotUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutMaterialInput | Prisma.MaterialLotCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.MaterialLotCreateManyMaterialInputEnvelope;
    connect?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
};
export type MaterialLotUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutMaterialInput, Prisma.MaterialLotUncheckedCreateWithoutMaterialInput> | Prisma.MaterialLotCreateWithoutMaterialInput[] | Prisma.MaterialLotUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutMaterialInput | Prisma.MaterialLotCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.MaterialLotUpsertWithWhereUniqueWithoutMaterialInput | Prisma.MaterialLotUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.MaterialLotCreateManyMaterialInputEnvelope;
    set?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    disconnect?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    delete?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    connect?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    update?: Prisma.MaterialLotUpdateWithWhereUniqueWithoutMaterialInput | Prisma.MaterialLotUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.MaterialLotUpdateManyWithWhereWithoutMaterialInput | Prisma.MaterialLotUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.MaterialLotScalarWhereInput | Prisma.MaterialLotScalarWhereInput[];
};
export type MaterialLotUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutMaterialInput, Prisma.MaterialLotUncheckedCreateWithoutMaterialInput> | Prisma.MaterialLotCreateWithoutMaterialInput[] | Prisma.MaterialLotUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutMaterialInput | Prisma.MaterialLotCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.MaterialLotUpsertWithWhereUniqueWithoutMaterialInput | Prisma.MaterialLotUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.MaterialLotCreateManyMaterialInputEnvelope;
    set?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    disconnect?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    delete?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    connect?: Prisma.MaterialLotWhereUniqueInput | Prisma.MaterialLotWhereUniqueInput[];
    update?: Prisma.MaterialLotUpdateWithWhereUniqueWithoutMaterialInput | Prisma.MaterialLotUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.MaterialLotUpdateManyWithWhereWithoutMaterialInput | Prisma.MaterialLotUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.MaterialLotScalarWhereInput | Prisma.MaterialLotScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type MaterialLotCreateNestedOneWithoutReceiptLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutReceiptLinesInput, Prisma.MaterialLotUncheckedCreateWithoutReceiptLinesInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutReceiptLinesInput;
    connect?: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotUpdateOneRequiredWithoutReceiptLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutReceiptLinesInput, Prisma.MaterialLotUncheckedCreateWithoutReceiptLinesInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutReceiptLinesInput;
    upsert?: Prisma.MaterialLotUpsertWithoutReceiptLinesInput;
    connect?: Prisma.MaterialLotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialLotUpdateToOneWithWhereWithoutReceiptLinesInput, Prisma.MaterialLotUpdateWithoutReceiptLinesInput>, Prisma.MaterialLotUncheckedUpdateWithoutReceiptLinesInput>;
};
export type MaterialLotCreateNestedOneWithoutIssueLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutIssueLinesInput, Prisma.MaterialLotUncheckedCreateWithoutIssueLinesInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutIssueLinesInput;
    connect?: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotUpdateOneRequiredWithoutIssueLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutIssueLinesInput, Prisma.MaterialLotUncheckedCreateWithoutIssueLinesInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutIssueLinesInput;
    upsert?: Prisma.MaterialLotUpsertWithoutIssueLinesInput;
    connect?: Prisma.MaterialLotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialLotUpdateToOneWithWhereWithoutIssueLinesInput, Prisma.MaterialLotUpdateWithoutIssueLinesInput>, Prisma.MaterialLotUncheckedUpdateWithoutIssueLinesInput>;
};
export type MaterialLotCreateNestedOneWithoutWasteLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutWasteLinesInput, Prisma.MaterialLotUncheckedCreateWithoutWasteLinesInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutWasteLinesInput;
    connect?: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotUpdateOneWithoutWasteLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutWasteLinesInput, Prisma.MaterialLotUncheckedCreateWithoutWasteLinesInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutWasteLinesInput;
    upsert?: Prisma.MaterialLotUpsertWithoutWasteLinesInput;
    disconnect?: Prisma.MaterialLotWhereInput | boolean;
    delete?: Prisma.MaterialLotWhereInput | boolean;
    connect?: Prisma.MaterialLotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialLotUpdateToOneWithWhereWithoutWasteLinesInput, Prisma.MaterialLotUpdateWithoutWasteLinesInput>, Prisma.MaterialLotUncheckedUpdateWithoutWasteLinesInput>;
};
export type MaterialLotCreateNestedOneWithoutMovementsInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutMovementsInput, Prisma.MaterialLotUncheckedCreateWithoutMovementsInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutMovementsInput;
    connect?: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialLotCreateWithoutMovementsInput, Prisma.MaterialLotUncheckedCreateWithoutMovementsInput>;
    connectOrCreate?: Prisma.MaterialLotCreateOrConnectWithoutMovementsInput;
    upsert?: Prisma.MaterialLotUpsertWithoutMovementsInput;
    connect?: Prisma.MaterialLotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialLotUpdateToOneWithWhereWithoutMovementsInput, Prisma.MaterialLotUpdateWithoutMovementsInput>, Prisma.MaterialLotUncheckedUpdateWithoutMovementsInput>;
};
export type MaterialLotCreateWithoutMaterialInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    receiptLines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutLotInput;
};
export type MaterialLotUncheckedCreateWithoutMaterialInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementUncheckedCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutLotInput;
};
export type MaterialLotCreateOrConnectWithoutMaterialInput = {
    where: Prisma.MaterialLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutMaterialInput, Prisma.MaterialLotUncheckedCreateWithoutMaterialInput>;
};
export type MaterialLotCreateManyMaterialInputEnvelope = {
    data: Prisma.MaterialLotCreateManyMaterialInput | Prisma.MaterialLotCreateManyMaterialInput[];
    skipDuplicates?: boolean;
};
export type MaterialLotUpsertWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.MaterialLotWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialLotUpdateWithoutMaterialInput, Prisma.MaterialLotUncheckedUpdateWithoutMaterialInput>;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutMaterialInput, Prisma.MaterialLotUncheckedCreateWithoutMaterialInput>;
};
export type MaterialLotUpdateWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.MaterialLotWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialLotUpdateWithoutMaterialInput, Prisma.MaterialLotUncheckedUpdateWithoutMaterialInput>;
};
export type MaterialLotUpdateManyWithWhereWithoutMaterialInput = {
    where: Prisma.MaterialLotScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialLotUpdateManyMutationInput, Prisma.MaterialLotUncheckedUpdateManyWithoutMaterialInput>;
};
export type MaterialLotScalarWhereInput = {
    AND?: Prisma.MaterialLotScalarWhereInput | Prisma.MaterialLotScalarWhereInput[];
    OR?: Prisma.MaterialLotScalarWhereInput[];
    NOT?: Prisma.MaterialLotScalarWhereInput | Prisma.MaterialLotScalarWhereInput[];
    id?: Prisma.UuidFilter<"MaterialLot"> | string;
    code?: Prisma.StringFilter<"MaterialLot"> | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"MaterialLot"> | Date | string | null;
    materialId?: Prisma.UuidFilter<"MaterialLot"> | string;
};
export type MaterialLotCreateWithoutReceiptLinesInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    material: Prisma.MaterialCreateNestedOneWithoutLotsInput;
    issueLines?: Prisma.MaterialIssueLineCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutLotInput;
};
export type MaterialLotUncheckedCreateWithoutReceiptLinesInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    materialId: string;
    issueLines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementUncheckedCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutLotInput;
};
export type MaterialLotCreateOrConnectWithoutReceiptLinesInput = {
    where: Prisma.MaterialLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutReceiptLinesInput, Prisma.MaterialLotUncheckedCreateWithoutReceiptLinesInput>;
};
export type MaterialLotUpsertWithoutReceiptLinesInput = {
    update: Prisma.XOR<Prisma.MaterialLotUpdateWithoutReceiptLinesInput, Prisma.MaterialLotUncheckedUpdateWithoutReceiptLinesInput>;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutReceiptLinesInput, Prisma.MaterialLotUncheckedCreateWithoutReceiptLinesInput>;
    where?: Prisma.MaterialLotWhereInput;
};
export type MaterialLotUpdateToOneWithWhereWithoutReceiptLinesInput = {
    where?: Prisma.MaterialLotWhereInput;
    data: Prisma.XOR<Prisma.MaterialLotUpdateWithoutReceiptLinesInput, Prisma.MaterialLotUncheckedUpdateWithoutReceiptLinesInput>;
};
export type MaterialLotUpdateWithoutReceiptLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    material?: Prisma.MaterialUpdateOneRequiredWithoutLotsNestedInput;
    issueLines?: Prisma.MaterialIssueLineUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutLotNestedInput;
};
export type MaterialLotUncheckedUpdateWithoutReceiptLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    issueLines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUncheckedUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutLotNestedInput;
};
export type MaterialLotCreateWithoutIssueLinesInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    material: Prisma.MaterialCreateNestedOneWithoutLotsInput;
    receiptLines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutLotInput;
};
export type MaterialLotUncheckedCreateWithoutIssueLinesInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    materialId: string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementUncheckedCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutLotInput;
};
export type MaterialLotCreateOrConnectWithoutIssueLinesInput = {
    where: Prisma.MaterialLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutIssueLinesInput, Prisma.MaterialLotUncheckedCreateWithoutIssueLinesInput>;
};
export type MaterialLotUpsertWithoutIssueLinesInput = {
    update: Prisma.XOR<Prisma.MaterialLotUpdateWithoutIssueLinesInput, Prisma.MaterialLotUncheckedUpdateWithoutIssueLinesInput>;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutIssueLinesInput, Prisma.MaterialLotUncheckedCreateWithoutIssueLinesInput>;
    where?: Prisma.MaterialLotWhereInput;
};
export type MaterialLotUpdateToOneWithWhereWithoutIssueLinesInput = {
    where?: Prisma.MaterialLotWhereInput;
    data: Prisma.XOR<Prisma.MaterialLotUpdateWithoutIssueLinesInput, Prisma.MaterialLotUncheckedUpdateWithoutIssueLinesInput>;
};
export type MaterialLotUpdateWithoutIssueLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    material?: Prisma.MaterialUpdateOneRequiredWithoutLotsNestedInput;
    receiptLines?: Prisma.MaterialReceiptLineUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutLotNestedInput;
};
export type MaterialLotUncheckedUpdateWithoutIssueLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUncheckedUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutLotNestedInput;
};
export type MaterialLotCreateWithoutWasteLinesInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    material: Prisma.MaterialCreateNestedOneWithoutLotsInput;
    receiptLines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementCreateNestedManyWithoutLotInput;
};
export type MaterialLotUncheckedCreateWithoutWasteLinesInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    materialId: string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutLotInput;
    movements?: Prisma.MaterialMovementUncheckedCreateNestedManyWithoutLotInput;
};
export type MaterialLotCreateOrConnectWithoutWasteLinesInput = {
    where: Prisma.MaterialLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutWasteLinesInput, Prisma.MaterialLotUncheckedCreateWithoutWasteLinesInput>;
};
export type MaterialLotUpsertWithoutWasteLinesInput = {
    update: Prisma.XOR<Prisma.MaterialLotUpdateWithoutWasteLinesInput, Prisma.MaterialLotUncheckedUpdateWithoutWasteLinesInput>;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutWasteLinesInput, Prisma.MaterialLotUncheckedCreateWithoutWasteLinesInput>;
    where?: Prisma.MaterialLotWhereInput;
};
export type MaterialLotUpdateToOneWithWhereWithoutWasteLinesInput = {
    where?: Prisma.MaterialLotWhereInput;
    data: Prisma.XOR<Prisma.MaterialLotUpdateWithoutWasteLinesInput, Prisma.MaterialLotUncheckedUpdateWithoutWasteLinesInput>;
};
export type MaterialLotUpdateWithoutWasteLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    material?: Prisma.MaterialUpdateOneRequiredWithoutLotsNestedInput;
    receiptLines?: Prisma.MaterialReceiptLineUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUpdateManyWithoutLotNestedInput;
};
export type MaterialLotUncheckedUpdateWithoutWasteLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUncheckedUpdateManyWithoutLotNestedInput;
};
export type MaterialLotCreateWithoutMovementsInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    material: Prisma.MaterialCreateNestedOneWithoutLotsInput;
    receiptLines?: Prisma.MaterialReceiptLineCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutLotInput;
};
export type MaterialLotUncheckedCreateWithoutMovementsInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
    materialId: string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedCreateNestedManyWithoutLotInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedCreateNestedManyWithoutLotInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutLotInput;
};
export type MaterialLotCreateOrConnectWithoutMovementsInput = {
    where: Prisma.MaterialLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutMovementsInput, Prisma.MaterialLotUncheckedCreateWithoutMovementsInput>;
};
export type MaterialLotUpsertWithoutMovementsInput = {
    update: Prisma.XOR<Prisma.MaterialLotUpdateWithoutMovementsInput, Prisma.MaterialLotUncheckedUpdateWithoutMovementsInput>;
    create: Prisma.XOR<Prisma.MaterialLotCreateWithoutMovementsInput, Prisma.MaterialLotUncheckedCreateWithoutMovementsInput>;
    where?: Prisma.MaterialLotWhereInput;
};
export type MaterialLotUpdateToOneWithWhereWithoutMovementsInput = {
    where?: Prisma.MaterialLotWhereInput;
    data: Prisma.XOR<Prisma.MaterialLotUpdateWithoutMovementsInput, Prisma.MaterialLotUncheckedUpdateWithoutMovementsInput>;
};
export type MaterialLotUpdateWithoutMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    material?: Prisma.MaterialUpdateOneRequiredWithoutLotsNestedInput;
    receiptLines?: Prisma.MaterialReceiptLineUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutLotNestedInput;
};
export type MaterialLotUncheckedUpdateWithoutMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutLotNestedInput;
};
export type MaterialLotCreateManyMaterialInput = {
    id?: string;
    code: string;
    expiryDate?: Date | string | null;
};
export type MaterialLotUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receiptLines?: Prisma.MaterialReceiptLineUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutLotNestedInput;
};
export type MaterialLotUncheckedUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receiptLines?: Prisma.MaterialReceiptLineUncheckedUpdateManyWithoutLotNestedInput;
    issueLines?: Prisma.MaterialIssueLineUncheckedUpdateManyWithoutLotNestedInput;
    movements?: Prisma.MaterialMovementUncheckedUpdateManyWithoutLotNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutLotNestedInput;
};
export type MaterialLotUncheckedUpdateManyWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MaterialLotCountOutputType = {
    receiptLines: number;
    issueLines: number;
    movements: number;
    wasteLines: number;
};
export type MaterialLotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receiptLines?: boolean | MaterialLotCountOutputTypeCountReceiptLinesArgs;
    issueLines?: boolean | MaterialLotCountOutputTypeCountIssueLinesArgs;
    movements?: boolean | MaterialLotCountOutputTypeCountMovementsArgs;
    wasteLines?: boolean | MaterialLotCountOutputTypeCountWasteLinesArgs;
};
export type MaterialLotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotCountOutputTypeSelect<ExtArgs> | null;
};
export type MaterialLotCountOutputTypeCountReceiptLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptLineWhereInput;
};
export type MaterialLotCountOutputTypeCountIssueLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialIssueLineWhereInput;
};
export type MaterialLotCountOutputTypeCountMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialMovementWhereInput;
};
export type MaterialLotCountOutputTypeCountWasteLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteLineWhereInput;
};
export type MaterialLotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    expiryDate?: boolean;
    materialId?: boolean;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    receiptLines?: boolean | Prisma.MaterialLot$receiptLinesArgs<ExtArgs>;
    issueLines?: boolean | Prisma.MaterialLot$issueLinesArgs<ExtArgs>;
    movements?: boolean | Prisma.MaterialLot$movementsArgs<ExtArgs>;
    wasteLines?: boolean | Prisma.MaterialLot$wasteLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialLotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialLot"]>;
export type MaterialLotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    expiryDate?: boolean;
    materialId?: boolean;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialLot"]>;
export type MaterialLotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    expiryDate?: boolean;
    materialId?: boolean;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["materialLot"]>;
export type MaterialLotSelectScalar = {
    id?: boolean;
    code?: boolean;
    expiryDate?: boolean;
    materialId?: boolean;
};
export type MaterialLotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "expiryDate" | "materialId", ExtArgs["result"]["materialLot"]>;
export type MaterialLotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
    receiptLines?: boolean | Prisma.MaterialLot$receiptLinesArgs<ExtArgs>;
    issueLines?: boolean | Prisma.MaterialLot$issueLinesArgs<ExtArgs>;
    movements?: boolean | Prisma.MaterialLot$movementsArgs<ExtArgs>;
    wasteLines?: boolean | Prisma.MaterialLot$wasteLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialLotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaterialLotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type MaterialLotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type $MaterialLotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaterialLot";
    objects: {
        material: Prisma.$MaterialPayload<ExtArgs>;
        receiptLines: Prisma.$MaterialReceiptLinePayload<ExtArgs>[];
        issueLines: Prisma.$MaterialIssueLinePayload<ExtArgs>[];
        movements: Prisma.$MaterialMovementPayload<ExtArgs>[];
        wasteLines: Prisma.$WasteLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        expiryDate: Date | null;
        materialId: string;
    }, ExtArgs["result"]["materialLot"]>;
    composites: {};
};
export type MaterialLotGetPayload<S extends boolean | null | undefined | MaterialLotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload, S>;
export type MaterialLotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialLotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialLotCountAggregateInputType | true;
};
export interface MaterialLotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaterialLot'];
        meta: {
            name: 'MaterialLot';
        };
    };
    findUnique<T extends MaterialLotFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialLotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialLotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialLotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialLotFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialLotFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialLotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialLotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialLotFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialLotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialLotCreateArgs>(args: Prisma.SelectSubset<T, MaterialLotCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialLotCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialLotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialLotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialLotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialLotDeleteArgs>(args: Prisma.SelectSubset<T, MaterialLotDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialLotUpdateArgs>(args: Prisma.SelectSubset<T, MaterialLotUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialLotDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialLotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialLotUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialLotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialLotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialLotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialLotUpsertArgs>(args: Prisma.SelectSubset<T, MaterialLotUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialLotClient<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialLotCountArgs>(args?: Prisma.Subset<T, MaterialLotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialLotCountAggregateOutputType> : number>;
    aggregate<T extends MaterialLotAggregateArgs>(args: Prisma.Subset<T, MaterialLotAggregateArgs>): Prisma.PrismaPromise<GetMaterialLotAggregateType<T>>;
    groupBy<T extends MaterialLotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialLotGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialLotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialLotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialLotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialLotFieldRefs;
}
export interface Prisma__MaterialLotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    material<T extends Prisma.MaterialDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    receiptLines<T extends Prisma.MaterialLot$receiptLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialLot$receiptLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    issueLines<T extends Prisma.MaterialLot$issueLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialLot$issueLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialIssueLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    movements<T extends Prisma.MaterialLot$movementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialLot$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    wasteLines<T extends Prisma.MaterialLot$wasteLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialLot$wasteLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialLotFieldRefs {
    readonly id: Prisma.FieldRef<"MaterialLot", 'String'>;
    readonly code: Prisma.FieldRef<"MaterialLot", 'String'>;
    readonly expiryDate: Prisma.FieldRef<"MaterialLot", 'DateTime'>;
    readonly materialId: Prisma.FieldRef<"MaterialLot", 'String'>;
}
export type MaterialLotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where?: Prisma.MaterialLotWhereInput;
    orderBy?: Prisma.MaterialLotOrderByWithRelationInput | Prisma.MaterialLotOrderByWithRelationInput[];
    cursor?: Prisma.MaterialLotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialLotScalarFieldEnum | Prisma.MaterialLotScalarFieldEnum[];
};
export type MaterialLotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where?: Prisma.MaterialLotWhereInput;
    orderBy?: Prisma.MaterialLotOrderByWithRelationInput | Prisma.MaterialLotOrderByWithRelationInput[];
    cursor?: Prisma.MaterialLotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialLotScalarFieldEnum | Prisma.MaterialLotScalarFieldEnum[];
};
export type MaterialLotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where?: Prisma.MaterialLotWhereInput;
    orderBy?: Prisma.MaterialLotOrderByWithRelationInput | Prisma.MaterialLotOrderByWithRelationInput[];
    cursor?: Prisma.MaterialLotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialLotScalarFieldEnum | Prisma.MaterialLotScalarFieldEnum[];
};
export type MaterialLotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialLotCreateInput, Prisma.MaterialLotUncheckedCreateInput>;
};
export type MaterialLotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialLotCreateManyInput | Prisma.MaterialLotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialLotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    data: Prisma.MaterialLotCreateManyInput | Prisma.MaterialLotCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialLotIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialLotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialLotUpdateInput, Prisma.MaterialLotUncheckedUpdateInput>;
    where: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialLotUpdateManyMutationInput, Prisma.MaterialLotUncheckedUpdateManyInput>;
    where?: Prisma.MaterialLotWhereInput;
    limit?: number;
};
export type MaterialLotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialLotUpdateManyMutationInput, Prisma.MaterialLotUncheckedUpdateManyInput>;
    where?: Prisma.MaterialLotWhereInput;
    limit?: number;
    include?: Prisma.MaterialLotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialLotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where: Prisma.MaterialLotWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialLotCreateInput, Prisma.MaterialLotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialLotUpdateInput, Prisma.MaterialLotUncheckedUpdateInput>;
};
export type MaterialLotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
    where: Prisma.MaterialLotWhereUniqueInput;
};
export type MaterialLotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialLotWhereInput;
    limit?: number;
};
export type MaterialLot$receiptLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialLot$issueLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialIssueLineSelect<ExtArgs> | null;
    omit?: Prisma.MaterialIssueLineOmit<ExtArgs> | null;
    include?: Prisma.MaterialIssueLineInclude<ExtArgs> | null;
    where?: Prisma.MaterialIssueLineWhereInput;
    orderBy?: Prisma.MaterialIssueLineOrderByWithRelationInput | Prisma.MaterialIssueLineOrderByWithRelationInput[];
    cursor?: Prisma.MaterialIssueLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialIssueLineScalarFieldEnum | Prisma.MaterialIssueLineScalarFieldEnum[];
};
export type MaterialLot$movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialLot$wasteLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where?: Prisma.WasteLineWhereInput;
    orderBy?: Prisma.WasteLineOrderByWithRelationInput | Prisma.WasteLineOrderByWithRelationInput[];
    cursor?: Prisma.WasteLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasteLineScalarFieldEnum | Prisma.WasteLineScalarFieldEnum[];
};
export type MaterialLotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialLotSelect<ExtArgs> | null;
    omit?: Prisma.MaterialLotOmit<ExtArgs> | null;
    include?: Prisma.MaterialLotInclude<ExtArgs> | null;
};
