import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MaterialModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialPayload>;
export type AggregateMaterial = {
    _count: MaterialCountAggregateOutputType | null;
    _avg: MaterialAvgAggregateOutputType | null;
    _sum: MaterialSumAggregateOutputType | null;
    _min: MaterialMinAggregateOutputType | null;
    _max: MaterialMaxAggregateOutputType | null;
};
export type MaterialAvgAggregateOutputType = {
    minStock: runtime.Decimal | null;
};
export type MaterialSumAggregateOutputType = {
    minStock: runtime.Decimal | null;
};
export type MaterialMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    minStock: runtime.Decimal | null;
    status: string | null;
    unitId: string | null;
    categoryId: string | null;
};
export type MaterialMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    minStock: runtime.Decimal | null;
    status: string | null;
    unitId: string | null;
    categoryId: string | null;
};
export type MaterialCountAggregateOutputType = {
    id: number;
    code: number;
    name: number;
    minStock: number;
    status: number;
    unitId: number;
    categoryId: number;
    _all: number;
};
export type MaterialAvgAggregateInputType = {
    minStock?: true;
};
export type MaterialSumAggregateInputType = {
    minStock?: true;
};
export type MaterialMinAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    minStock?: true;
    status?: true;
    unitId?: true;
    categoryId?: true;
};
export type MaterialMaxAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    minStock?: true;
    status?: true;
    unitId?: true;
    categoryId?: true;
};
export type MaterialCountAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    minStock?: true;
    status?: true;
    unitId?: true;
    categoryId?: true;
    _all?: true;
};
export type MaterialAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialWhereInput;
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    cursor?: Prisma.MaterialWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MaterialCountAggregateInputType;
    _avg?: MaterialAvgAggregateInputType;
    _sum?: MaterialSumAggregateInputType;
    _min?: MaterialMinAggregateInputType;
    _max?: MaterialMaxAggregateInputType;
};
export type GetMaterialAggregateType<T extends MaterialAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterial]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterial[P]> : Prisma.GetScalarType<T[P], AggregateMaterial[P]>;
};
export type MaterialGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialWhereInput;
    orderBy?: Prisma.MaterialOrderByWithAggregationInput | Prisma.MaterialOrderByWithAggregationInput[];
    by: Prisma.MaterialScalarFieldEnum[] | Prisma.MaterialScalarFieldEnum;
    having?: Prisma.MaterialScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialCountAggregateInputType | true;
    _avg?: MaterialAvgAggregateInputType;
    _sum?: MaterialSumAggregateInputType;
    _min?: MaterialMinAggregateInputType;
    _max?: MaterialMaxAggregateInputType;
};
export type MaterialGroupByOutputType = {
    id: string;
    code: string;
    name: string;
    minStock: runtime.Decimal;
    status: string;
    unitId: string;
    categoryId: string;
    _count: MaterialCountAggregateOutputType | null;
    _avg: MaterialAvgAggregateOutputType | null;
    _sum: MaterialSumAggregateOutputType | null;
    _min: MaterialMinAggregateOutputType | null;
    _max: MaterialMaxAggregateOutputType | null;
};
export type GetMaterialGroupByPayload<T extends MaterialGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialGroupByOutputType[P]>;
}>>;
export type MaterialWhereInput = {
    AND?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    OR?: Prisma.MaterialWhereInput[];
    NOT?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    id?: Prisma.UuidFilter<"Material"> | string;
    code?: Prisma.StringFilter<"Material"> | string;
    name?: Prisma.StringFilter<"Material"> | string;
    minStock?: Prisma.DecimalFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"Material"> | string;
    unitId?: Prisma.UuidFilter<"Material"> | string;
    categoryId?: Prisma.UuidFilter<"Material"> | string;
    unit?: Prisma.XOR<Prisma.UnitScalarRelationFilter, Prisma.UnitWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    lots?: Prisma.MaterialLotListRelationFilter;
    bomLines?: Prisma.BomLineListRelationFilter;
};
export type MaterialOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    unit?: Prisma.UnitOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
    lots?: Prisma.MaterialLotOrderByRelationAggregateInput;
    bomLines?: Prisma.BomLineOrderByRelationAggregateInput;
};
export type MaterialWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    OR?: Prisma.MaterialWhereInput[];
    NOT?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    name?: Prisma.StringFilter<"Material"> | string;
    minStock?: Prisma.DecimalFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"Material"> | string;
    unitId?: Prisma.UuidFilter<"Material"> | string;
    categoryId?: Prisma.UuidFilter<"Material"> | string;
    unit?: Prisma.XOR<Prisma.UnitScalarRelationFilter, Prisma.UnitWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    lots?: Prisma.MaterialLotListRelationFilter;
    bomLines?: Prisma.BomLineListRelationFilter;
}, "id" | "code">;
export type MaterialOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    _count?: Prisma.MaterialCountOrderByAggregateInput;
    _avg?: Prisma.MaterialAvgOrderByAggregateInput;
    _max?: Prisma.MaterialMaxOrderByAggregateInput;
    _min?: Prisma.MaterialMinOrderByAggregateInput;
    _sum?: Prisma.MaterialSumOrderByAggregateInput;
};
export type MaterialScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialScalarWhereWithAggregatesInput | Prisma.MaterialScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialScalarWhereWithAggregatesInput | Prisma.MaterialScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Material"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Material"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Material"> | string;
    minStock?: Prisma.DecimalWithAggregatesFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringWithAggregatesFilter<"Material"> | string;
    unitId?: Prisma.UuidWithAggregatesFilter<"Material"> | string;
    categoryId?: Prisma.UuidWithAggregatesFilter<"Material"> | string;
};
export type MaterialCreateInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unit: Prisma.UnitCreateNestedOneWithoutMaterialsInput;
    category: Prisma.CategoryCreateNestedOneWithoutMaterialsInput;
    lots?: Prisma.MaterialLotCreateNestedManyWithoutMaterialInput;
    bomLines?: Prisma.BomLineCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.MaterialLotUncheckedCreateNestedManyWithoutMaterialInput;
    bomLines?: Prisma.BomLineUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.UnitUpdateOneRequiredWithoutMaterialsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutMaterialsNestedInput;
    lots?: Prisma.MaterialLotUpdateManyWithoutMaterialNestedInput;
    bomLines?: Prisma.BomLineUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.MaterialLotUncheckedUpdateManyWithoutMaterialNestedInput;
    bomLines?: Prisma.BomLineUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateManyInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
};
export type MaterialUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialListRelationFilter = {
    every?: Prisma.MaterialWhereInput;
    some?: Prisma.MaterialWhereInput;
    none?: Prisma.MaterialWhereInput;
};
export type MaterialOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaterialCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type MaterialAvgOrderByAggregateInput = {
    minStock?: Prisma.SortOrder;
};
export type MaterialMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type MaterialMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type MaterialSumOrderByAggregateInput = {
    minStock?: Prisma.SortOrder;
};
export type MaterialScalarRelationFilter = {
    is?: Prisma.MaterialWhereInput;
    isNot?: Prisma.MaterialWhereInput;
};
export type MaterialCreateNestedManyWithoutUnitInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutUnitInput, Prisma.MaterialUncheckedCreateWithoutUnitInput> | Prisma.MaterialCreateWithoutUnitInput[] | Prisma.MaterialUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutUnitInput | Prisma.MaterialCreateOrConnectWithoutUnitInput[];
    createMany?: Prisma.MaterialCreateManyUnitInputEnvelope;
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
};
export type MaterialUncheckedCreateNestedManyWithoutUnitInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutUnitInput, Prisma.MaterialUncheckedCreateWithoutUnitInput> | Prisma.MaterialCreateWithoutUnitInput[] | Prisma.MaterialUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutUnitInput | Prisma.MaterialCreateOrConnectWithoutUnitInput[];
    createMany?: Prisma.MaterialCreateManyUnitInputEnvelope;
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
};
export type MaterialUpdateManyWithoutUnitNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutUnitInput, Prisma.MaterialUncheckedCreateWithoutUnitInput> | Prisma.MaterialCreateWithoutUnitInput[] | Prisma.MaterialUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutUnitInput | Prisma.MaterialCreateOrConnectWithoutUnitInput[];
    upsert?: Prisma.MaterialUpsertWithWhereUniqueWithoutUnitInput | Prisma.MaterialUpsertWithWhereUniqueWithoutUnitInput[];
    createMany?: Prisma.MaterialCreateManyUnitInputEnvelope;
    set?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    disconnect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    delete?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    update?: Prisma.MaterialUpdateWithWhereUniqueWithoutUnitInput | Prisma.MaterialUpdateWithWhereUniqueWithoutUnitInput[];
    updateMany?: Prisma.MaterialUpdateManyWithWhereWithoutUnitInput | Prisma.MaterialUpdateManyWithWhereWithoutUnitInput[];
    deleteMany?: Prisma.MaterialScalarWhereInput | Prisma.MaterialScalarWhereInput[];
};
export type MaterialUncheckedUpdateManyWithoutUnitNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutUnitInput, Prisma.MaterialUncheckedCreateWithoutUnitInput> | Prisma.MaterialCreateWithoutUnitInput[] | Prisma.MaterialUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutUnitInput | Prisma.MaterialCreateOrConnectWithoutUnitInput[];
    upsert?: Prisma.MaterialUpsertWithWhereUniqueWithoutUnitInput | Prisma.MaterialUpsertWithWhereUniqueWithoutUnitInput[];
    createMany?: Prisma.MaterialCreateManyUnitInputEnvelope;
    set?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    disconnect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    delete?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    update?: Prisma.MaterialUpdateWithWhereUniqueWithoutUnitInput | Prisma.MaterialUpdateWithWhereUniqueWithoutUnitInput[];
    updateMany?: Prisma.MaterialUpdateManyWithWhereWithoutUnitInput | Prisma.MaterialUpdateManyWithWhereWithoutUnitInput[];
    deleteMany?: Prisma.MaterialScalarWhereInput | Prisma.MaterialScalarWhereInput[];
};
export type MaterialCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutCategoryInput, Prisma.MaterialUncheckedCreateWithoutCategoryInput> | Prisma.MaterialCreateWithoutCategoryInput[] | Prisma.MaterialUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutCategoryInput | Prisma.MaterialCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.MaterialCreateManyCategoryInputEnvelope;
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
};
export type MaterialUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutCategoryInput, Prisma.MaterialUncheckedCreateWithoutCategoryInput> | Prisma.MaterialCreateWithoutCategoryInput[] | Prisma.MaterialUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutCategoryInput | Prisma.MaterialCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.MaterialCreateManyCategoryInputEnvelope;
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
};
export type MaterialUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutCategoryInput, Prisma.MaterialUncheckedCreateWithoutCategoryInput> | Prisma.MaterialCreateWithoutCategoryInput[] | Prisma.MaterialUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutCategoryInput | Prisma.MaterialCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.MaterialUpsertWithWhereUniqueWithoutCategoryInput | Prisma.MaterialUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.MaterialCreateManyCategoryInputEnvelope;
    set?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    disconnect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    delete?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    update?: Prisma.MaterialUpdateWithWhereUniqueWithoutCategoryInput | Prisma.MaterialUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.MaterialUpdateManyWithWhereWithoutCategoryInput | Prisma.MaterialUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.MaterialScalarWhereInput | Prisma.MaterialScalarWhereInput[];
};
export type MaterialUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutCategoryInput, Prisma.MaterialUncheckedCreateWithoutCategoryInput> | Prisma.MaterialCreateWithoutCategoryInput[] | Prisma.MaterialUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutCategoryInput | Prisma.MaterialCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.MaterialUpsertWithWhereUniqueWithoutCategoryInput | Prisma.MaterialUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.MaterialCreateManyCategoryInputEnvelope;
    set?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    disconnect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    delete?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    connect?: Prisma.MaterialWhereUniqueInput | Prisma.MaterialWhereUniqueInput[];
    update?: Prisma.MaterialUpdateWithWhereUniqueWithoutCategoryInput | Prisma.MaterialUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.MaterialUpdateManyWithWhereWithoutCategoryInput | Prisma.MaterialUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.MaterialScalarWhereInput | Prisma.MaterialScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type MaterialCreateNestedOneWithoutLotsInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutLotsInput, Prisma.MaterialUncheckedCreateWithoutLotsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutLotsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateOneRequiredWithoutLotsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutLotsInput, Prisma.MaterialUncheckedCreateWithoutLotsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutLotsInput;
    upsert?: Prisma.MaterialUpsertWithoutLotsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialUpdateToOneWithWhereWithoutLotsInput, Prisma.MaterialUpdateWithoutLotsInput>, Prisma.MaterialUncheckedUpdateWithoutLotsInput>;
};
export type MaterialCreateNestedOneWithoutBomLinesInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutBomLinesInput, Prisma.MaterialUncheckedCreateWithoutBomLinesInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutBomLinesInput;
    connect?: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateOneRequiredWithoutBomLinesNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutBomLinesInput, Prisma.MaterialUncheckedCreateWithoutBomLinesInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutBomLinesInput;
    upsert?: Prisma.MaterialUpsertWithoutBomLinesInput;
    connect?: Prisma.MaterialWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialUpdateToOneWithWhereWithoutBomLinesInput, Prisma.MaterialUpdateWithoutBomLinesInput>, Prisma.MaterialUncheckedUpdateWithoutBomLinesInput>;
};
export type MaterialCreateWithoutUnitInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    category: Prisma.CategoryCreateNestedOneWithoutMaterialsInput;
    lots?: Prisma.MaterialLotCreateNestedManyWithoutMaterialInput;
    bomLines?: Prisma.BomLineCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutUnitInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    categoryId: string;
    lots?: Prisma.MaterialLotUncheckedCreateNestedManyWithoutMaterialInput;
    bomLines?: Prisma.BomLineUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutUnitInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutUnitInput, Prisma.MaterialUncheckedCreateWithoutUnitInput>;
};
export type MaterialCreateManyUnitInputEnvelope = {
    data: Prisma.MaterialCreateManyUnitInput | Prisma.MaterialCreateManyUnitInput[];
    skipDuplicates?: boolean;
};
export type MaterialUpsertWithWhereUniqueWithoutUnitInput = {
    where: Prisma.MaterialWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutUnitInput, Prisma.MaterialUncheckedUpdateWithoutUnitInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutUnitInput, Prisma.MaterialUncheckedCreateWithoutUnitInput>;
};
export type MaterialUpdateWithWhereUniqueWithoutUnitInput = {
    where: Prisma.MaterialWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutUnitInput, Prisma.MaterialUncheckedUpdateWithoutUnitInput>;
};
export type MaterialUpdateManyWithWhereWithoutUnitInput = {
    where: Prisma.MaterialScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateManyMutationInput, Prisma.MaterialUncheckedUpdateManyWithoutUnitInput>;
};
export type MaterialScalarWhereInput = {
    AND?: Prisma.MaterialScalarWhereInput | Prisma.MaterialScalarWhereInput[];
    OR?: Prisma.MaterialScalarWhereInput[];
    NOT?: Prisma.MaterialScalarWhereInput | Prisma.MaterialScalarWhereInput[];
    id?: Prisma.UuidFilter<"Material"> | string;
    code?: Prisma.StringFilter<"Material"> | string;
    name?: Prisma.StringFilter<"Material"> | string;
    minStock?: Prisma.DecimalFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"Material"> | string;
    unitId?: Prisma.UuidFilter<"Material"> | string;
    categoryId?: Prisma.UuidFilter<"Material"> | string;
};
export type MaterialCreateWithoutCategoryInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unit: Prisma.UnitCreateNestedOneWithoutMaterialsInput;
    lots?: Prisma.MaterialLotCreateNestedManyWithoutMaterialInput;
    bomLines?: Prisma.BomLineCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutCategoryInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    lots?: Prisma.MaterialLotUncheckedCreateNestedManyWithoutMaterialInput;
    bomLines?: Prisma.BomLineUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutCategoryInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutCategoryInput, Prisma.MaterialUncheckedCreateWithoutCategoryInput>;
};
export type MaterialCreateManyCategoryInputEnvelope = {
    data: Prisma.MaterialCreateManyCategoryInput | Prisma.MaterialCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type MaterialUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.MaterialWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutCategoryInput, Prisma.MaterialUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutCategoryInput, Prisma.MaterialUncheckedCreateWithoutCategoryInput>;
};
export type MaterialUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.MaterialWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutCategoryInput, Prisma.MaterialUncheckedUpdateWithoutCategoryInput>;
};
export type MaterialUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.MaterialScalarWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateManyMutationInput, Prisma.MaterialUncheckedUpdateManyWithoutCategoryInput>;
};
export type MaterialCreateWithoutLotsInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unit: Prisma.UnitCreateNestedOneWithoutMaterialsInput;
    category: Prisma.CategoryCreateNestedOneWithoutMaterialsInput;
    bomLines?: Prisma.BomLineCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutLotsInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    bomLines?: Prisma.BomLineUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutLotsInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutLotsInput, Prisma.MaterialUncheckedCreateWithoutLotsInput>;
};
export type MaterialUpsertWithoutLotsInput = {
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutLotsInput, Prisma.MaterialUncheckedUpdateWithoutLotsInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutLotsInput, Prisma.MaterialUncheckedCreateWithoutLotsInput>;
    where?: Prisma.MaterialWhereInput;
};
export type MaterialUpdateToOneWithWhereWithoutLotsInput = {
    where?: Prisma.MaterialWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutLotsInput, Prisma.MaterialUncheckedUpdateWithoutLotsInput>;
};
export type MaterialUpdateWithoutLotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.UnitUpdateOneRequiredWithoutMaterialsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutMaterialsNestedInput;
    bomLines?: Prisma.BomLineUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutLotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    bomLines?: Prisma.BomLineUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateWithoutBomLinesInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unit: Prisma.UnitCreateNestedOneWithoutMaterialsInput;
    category: Prisma.CategoryCreateNestedOneWithoutMaterialsInput;
    lots?: Prisma.MaterialLotCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutBomLinesInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.MaterialLotUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutBomLinesInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutBomLinesInput, Prisma.MaterialUncheckedCreateWithoutBomLinesInput>;
};
export type MaterialUpsertWithoutBomLinesInput = {
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutBomLinesInput, Prisma.MaterialUncheckedUpdateWithoutBomLinesInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutBomLinesInput, Prisma.MaterialUncheckedCreateWithoutBomLinesInput>;
    where?: Prisma.MaterialWhereInput;
};
export type MaterialUpdateToOneWithWhereWithoutBomLinesInput = {
    where?: Prisma.MaterialWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutBomLinesInput, Prisma.MaterialUncheckedUpdateWithoutBomLinesInput>;
};
export type MaterialUpdateWithoutBomLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.UnitUpdateOneRequiredWithoutMaterialsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutMaterialsNestedInput;
    lots?: Prisma.MaterialLotUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutBomLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.MaterialLotUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateManyUnitInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    categoryId: string;
};
export type MaterialUpdateWithoutUnitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutMaterialsNestedInput;
    lots?: Prisma.MaterialLotUpdateManyWithoutMaterialNestedInput;
    bomLines?: Prisma.BomLineUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutUnitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.MaterialLotUncheckedUpdateManyWithoutMaterialNestedInput;
    bomLines?: Prisma.BomLineUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateManyWithoutUnitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialCreateManyCategoryInput = {
    id?: string;
    code: string;
    name: string;
    minStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
};
export type MaterialUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.UnitUpdateOneRequiredWithoutMaterialsNestedInput;
    lots?: Prisma.MaterialLotUpdateManyWithoutMaterialNestedInput;
    bomLines?: Prisma.BomLineUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.MaterialLotUncheckedUpdateManyWithoutMaterialNestedInput;
    bomLines?: Prisma.BomLineUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    minStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MaterialCountOutputType = {
    lots: number;
    bomLines: number;
};
export type MaterialCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lots?: boolean | MaterialCountOutputTypeCountLotsArgs;
    bomLines?: boolean | MaterialCountOutputTypeCountBomLinesArgs;
};
export type MaterialCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialCountOutputTypeSelect<ExtArgs> | null;
};
export type MaterialCountOutputTypeCountLotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialLotWhereInput;
};
export type MaterialCountOutputTypeCountBomLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomLineWhereInput;
};
export type MaterialSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    minStock?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    lots?: boolean | Prisma.Material$lotsArgs<ExtArgs>;
    bomLines?: boolean | Prisma.Material$bomLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["material"]>;
export type MaterialSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    minStock?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["material"]>;
export type MaterialSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    minStock?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["material"]>;
export type MaterialSelectScalar = {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    minStock?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
};
export type MaterialOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "name" | "minStock" | "status" | "unitId" | "categoryId", ExtArgs["result"]["material"]>;
export type MaterialInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    lots?: boolean | Prisma.Material$lotsArgs<ExtArgs>;
    bomLines?: boolean | Prisma.Material$bomLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaterialIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type MaterialIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $MaterialPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Material";
    objects: {
        unit: Prisma.$UnitPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs>;
        lots: Prisma.$MaterialLotPayload<ExtArgs>[];
        bomLines: Prisma.$BomLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        name: string;
        minStock: runtime.Decimal;
        status: string;
        unitId: string;
        categoryId: string;
    }, ExtArgs["result"]["material"]>;
    composites: {};
};
export type MaterialGetPayload<S extends boolean | null | undefined | MaterialDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialPayload, S>;
export type MaterialCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialCountAggregateInputType | true;
};
export interface MaterialDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Material'];
        meta: {
            name: 'Material';
        };
    };
    findUnique<T extends MaterialFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MaterialFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MaterialFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MaterialFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MaterialFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MaterialCreateArgs>(args: Prisma.SelectSubset<T, MaterialCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MaterialCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MaterialCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MaterialDeleteArgs>(args: Prisma.SelectSubset<T, MaterialDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MaterialUpdateArgs>(args: Prisma.SelectSubset<T, MaterialUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MaterialDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MaterialUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MaterialUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MaterialUpsertArgs>(args: Prisma.SelectSubset<T, MaterialUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MaterialCountArgs>(args?: Prisma.Subset<T, MaterialCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialCountAggregateOutputType> : number>;
    aggregate<T extends MaterialAggregateArgs>(args: Prisma.Subset<T, MaterialAggregateArgs>): Prisma.PrismaPromise<GetMaterialAggregateType<T>>;
    groupBy<T extends MaterialGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MaterialFieldRefs;
}
export interface Prisma__MaterialClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    unit<T extends Prisma.UnitDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UnitDefaultArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lots<T extends Prisma.Material$lotsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Material$lotsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialLotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bomLines<T extends Prisma.Material$bomLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Material$bomLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MaterialFieldRefs {
    readonly id: Prisma.FieldRef<"Material", 'String'>;
    readonly code: Prisma.FieldRef<"Material", 'String'>;
    readonly name: Prisma.FieldRef<"Material", 'String'>;
    readonly minStock: Prisma.FieldRef<"Material", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Material", 'String'>;
    readonly unitId: Prisma.FieldRef<"Material", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Material", 'String'>;
}
export type MaterialFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where: Prisma.MaterialWhereUniqueInput;
};
export type MaterialFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where: Prisma.MaterialWhereUniqueInput;
};
export type MaterialFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where?: Prisma.MaterialWhereInput;
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    cursor?: Prisma.MaterialWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialScalarFieldEnum | Prisma.MaterialScalarFieldEnum[];
};
export type MaterialFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where?: Prisma.MaterialWhereInput;
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    cursor?: Prisma.MaterialWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialScalarFieldEnum | Prisma.MaterialScalarFieldEnum[];
};
export type MaterialFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where?: Prisma.MaterialWhereInput;
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    cursor?: Prisma.MaterialWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialScalarFieldEnum | Prisma.MaterialScalarFieldEnum[];
};
export type MaterialCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialCreateInput, Prisma.MaterialUncheckedCreateInput>;
};
export type MaterialCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MaterialCreateManyInput | Prisma.MaterialCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MaterialCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    data: Prisma.MaterialCreateManyInput | Prisma.MaterialCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MaterialIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MaterialUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialUpdateInput, Prisma.MaterialUncheckedUpdateInput>;
    where: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MaterialUpdateManyMutationInput, Prisma.MaterialUncheckedUpdateManyInput>;
    where?: Prisma.MaterialWhereInput;
    limit?: number;
};
export type MaterialUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MaterialUpdateManyMutationInput, Prisma.MaterialUncheckedUpdateManyInput>;
    where?: Prisma.MaterialWhereInput;
    limit?: number;
    include?: Prisma.MaterialIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MaterialUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateInput, Prisma.MaterialUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MaterialUpdateInput, Prisma.MaterialUncheckedUpdateInput>;
};
export type MaterialDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where: Prisma.MaterialWhereUniqueInput;
};
export type MaterialDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialWhereInput;
    limit?: number;
};
export type Material$lotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Material$bomLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MaterialDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    include?: Prisma.MaterialInclude<ExtArgs> | null;
};
