import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BomLineModel = runtime.Types.Result.DefaultSelection<Prisma.$BomLinePayload>;
export type AggregateBomLine = {
    _count: BomLineCountAggregateOutputType | null;
    _avg: BomLineAvgAggregateOutputType | null;
    _sum: BomLineSumAggregateOutputType | null;
    _min: BomLineMinAggregateOutputType | null;
    _max: BomLineMaxAggregateOutputType | null;
};
export type BomLineAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type BomLineSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
};
export type BomLineMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    bomId: string | null;
    materialId: string | null;
};
export type BomLineMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    bomId: string | null;
    materialId: string | null;
};
export type BomLineCountAggregateOutputType = {
    id: number;
    quantity: number;
    bomId: number;
    materialId: number;
    _all: number;
};
export type BomLineAvgAggregateInputType = {
    quantity?: true;
};
export type BomLineSumAggregateInputType = {
    quantity?: true;
};
export type BomLineMinAggregateInputType = {
    id?: true;
    quantity?: true;
    bomId?: true;
    materialId?: true;
};
export type BomLineMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    bomId?: true;
    materialId?: true;
};
export type BomLineCountAggregateInputType = {
    id?: true;
    quantity?: true;
    bomId?: true;
    materialId?: true;
    _all?: true;
};
export type BomLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomLineWhereInput;
    orderBy?: Prisma.BomLineOrderByWithRelationInput | Prisma.BomLineOrderByWithRelationInput[];
    cursor?: Prisma.BomLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BomLineCountAggregateInputType;
    _avg?: BomLineAvgAggregateInputType;
    _sum?: BomLineSumAggregateInputType;
    _min?: BomLineMinAggregateInputType;
    _max?: BomLineMaxAggregateInputType;
};
export type GetBomLineAggregateType<T extends BomLineAggregateArgs> = {
    [P in keyof T & keyof AggregateBomLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBomLine[P]> : Prisma.GetScalarType<T[P], AggregateBomLine[P]>;
};
export type BomLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomLineWhereInput;
    orderBy?: Prisma.BomLineOrderByWithAggregationInput | Prisma.BomLineOrderByWithAggregationInput[];
    by: Prisma.BomLineScalarFieldEnum[] | Prisma.BomLineScalarFieldEnum;
    having?: Prisma.BomLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BomLineCountAggregateInputType | true;
    _avg?: BomLineAvgAggregateInputType;
    _sum?: BomLineSumAggregateInputType;
    _min?: BomLineMinAggregateInputType;
    _max?: BomLineMaxAggregateInputType;
};
export type BomLineGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    bomId: string;
    materialId: string;
    _count: BomLineCountAggregateOutputType | null;
    _avg: BomLineAvgAggregateOutputType | null;
    _sum: BomLineSumAggregateOutputType | null;
    _min: BomLineMinAggregateOutputType | null;
    _max: BomLineMaxAggregateOutputType | null;
};
export type GetBomLineGroupByPayload<T extends BomLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BomLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BomLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BomLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BomLineGroupByOutputType[P]>;
}>>;
export type BomLineWhereInput = {
    AND?: Prisma.BomLineWhereInput | Prisma.BomLineWhereInput[];
    OR?: Prisma.BomLineWhereInput[];
    NOT?: Prisma.BomLineWhereInput | Prisma.BomLineWhereInput[];
    id?: Prisma.UuidFilter<"BomLine"> | string;
    quantity?: Prisma.DecimalFilter<"BomLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.UuidFilter<"BomLine"> | string;
    materialId?: Prisma.UuidFilter<"BomLine"> | string;
    bom?: Prisma.XOR<Prisma.BomScalarRelationFilter, Prisma.BomWhereInput>;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
};
export type BomLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    bom?: Prisma.BomOrderByWithRelationInput;
    material?: Prisma.MaterialOrderByWithRelationInput;
};
export type BomLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BomLineWhereInput | Prisma.BomLineWhereInput[];
    OR?: Prisma.BomLineWhereInput[];
    NOT?: Prisma.BomLineWhereInput | Prisma.BomLineWhereInput[];
    quantity?: Prisma.DecimalFilter<"BomLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.UuidFilter<"BomLine"> | string;
    materialId?: Prisma.UuidFilter<"BomLine"> | string;
    bom?: Prisma.XOR<Prisma.BomScalarRelationFilter, Prisma.BomWhereInput>;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
}, "id">;
export type BomLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    _count?: Prisma.BomLineCountOrderByAggregateInput;
    _avg?: Prisma.BomLineAvgOrderByAggregateInput;
    _max?: Prisma.BomLineMaxOrderByAggregateInput;
    _min?: Prisma.BomLineMinOrderByAggregateInput;
    _sum?: Prisma.BomLineSumOrderByAggregateInput;
};
export type BomLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.BomLineScalarWhereWithAggregatesInput | Prisma.BomLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.BomLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BomLineScalarWhereWithAggregatesInput | Prisma.BomLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"BomLine"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"BomLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.UuidWithAggregatesFilter<"BomLine"> | string;
    materialId?: Prisma.UuidWithAggregatesFilter<"BomLine"> | string;
};
export type BomLineCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    bom: Prisma.BomCreateNestedOneWithoutLinesInput;
    material: Prisma.MaterialCreateNestedOneWithoutBomLinesInput;
};
export type BomLineUncheckedCreateInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId: string;
    materialId: string;
};
export type BomLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bom?: Prisma.BomUpdateOneRequiredWithoutLinesNestedInput;
    material?: Prisma.MaterialUpdateOneRequiredWithoutBomLinesNestedInput;
};
export type BomLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomLineCreateManyInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId: string;
    materialId: string;
};
export type BomLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BomLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomLineListRelationFilter = {
    every?: Prisma.BomLineWhereInput;
    some?: Prisma.BomLineWhereInput;
    none?: Prisma.BomLineWhereInput;
};
export type BomLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BomLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
};
export type BomLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type BomLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
};
export type BomLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    bomId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
};
export type BomLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type BomLineCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutMaterialInput, Prisma.BomLineUncheckedCreateWithoutMaterialInput> | Prisma.BomLineCreateWithoutMaterialInput[] | Prisma.BomLineUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutMaterialInput | Prisma.BomLineCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.BomLineCreateManyMaterialInputEnvelope;
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
};
export type BomLineUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutMaterialInput, Prisma.BomLineUncheckedCreateWithoutMaterialInput> | Prisma.BomLineCreateWithoutMaterialInput[] | Prisma.BomLineUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutMaterialInput | Prisma.BomLineCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.BomLineCreateManyMaterialInputEnvelope;
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
};
export type BomLineUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutMaterialInput, Prisma.BomLineUncheckedCreateWithoutMaterialInput> | Prisma.BomLineCreateWithoutMaterialInput[] | Prisma.BomLineUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutMaterialInput | Prisma.BomLineCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.BomLineUpsertWithWhereUniqueWithoutMaterialInput | Prisma.BomLineUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.BomLineCreateManyMaterialInputEnvelope;
    set?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    disconnect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    delete?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    update?: Prisma.BomLineUpdateWithWhereUniqueWithoutMaterialInput | Prisma.BomLineUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.BomLineUpdateManyWithWhereWithoutMaterialInput | Prisma.BomLineUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.BomLineScalarWhereInput | Prisma.BomLineScalarWhereInput[];
};
export type BomLineUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutMaterialInput, Prisma.BomLineUncheckedCreateWithoutMaterialInput> | Prisma.BomLineCreateWithoutMaterialInput[] | Prisma.BomLineUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutMaterialInput | Prisma.BomLineCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.BomLineUpsertWithWhereUniqueWithoutMaterialInput | Prisma.BomLineUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.BomLineCreateManyMaterialInputEnvelope;
    set?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    disconnect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    delete?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    update?: Prisma.BomLineUpdateWithWhereUniqueWithoutMaterialInput | Prisma.BomLineUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.BomLineUpdateManyWithWhereWithoutMaterialInput | Prisma.BomLineUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.BomLineScalarWhereInput | Prisma.BomLineScalarWhereInput[];
};
export type BomLineCreateNestedManyWithoutBomInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutBomInput, Prisma.BomLineUncheckedCreateWithoutBomInput> | Prisma.BomLineCreateWithoutBomInput[] | Prisma.BomLineUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutBomInput | Prisma.BomLineCreateOrConnectWithoutBomInput[];
    createMany?: Prisma.BomLineCreateManyBomInputEnvelope;
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
};
export type BomLineUncheckedCreateNestedManyWithoutBomInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutBomInput, Prisma.BomLineUncheckedCreateWithoutBomInput> | Prisma.BomLineCreateWithoutBomInput[] | Prisma.BomLineUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutBomInput | Prisma.BomLineCreateOrConnectWithoutBomInput[];
    createMany?: Prisma.BomLineCreateManyBomInputEnvelope;
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
};
export type BomLineUpdateManyWithoutBomNestedInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutBomInput, Prisma.BomLineUncheckedCreateWithoutBomInput> | Prisma.BomLineCreateWithoutBomInput[] | Prisma.BomLineUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutBomInput | Prisma.BomLineCreateOrConnectWithoutBomInput[];
    upsert?: Prisma.BomLineUpsertWithWhereUniqueWithoutBomInput | Prisma.BomLineUpsertWithWhereUniqueWithoutBomInput[];
    createMany?: Prisma.BomLineCreateManyBomInputEnvelope;
    set?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    disconnect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    delete?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    update?: Prisma.BomLineUpdateWithWhereUniqueWithoutBomInput | Prisma.BomLineUpdateWithWhereUniqueWithoutBomInput[];
    updateMany?: Prisma.BomLineUpdateManyWithWhereWithoutBomInput | Prisma.BomLineUpdateManyWithWhereWithoutBomInput[];
    deleteMany?: Prisma.BomLineScalarWhereInput | Prisma.BomLineScalarWhereInput[];
};
export type BomLineUncheckedUpdateManyWithoutBomNestedInput = {
    create?: Prisma.XOR<Prisma.BomLineCreateWithoutBomInput, Prisma.BomLineUncheckedCreateWithoutBomInput> | Prisma.BomLineCreateWithoutBomInput[] | Prisma.BomLineUncheckedCreateWithoutBomInput[];
    connectOrCreate?: Prisma.BomLineCreateOrConnectWithoutBomInput | Prisma.BomLineCreateOrConnectWithoutBomInput[];
    upsert?: Prisma.BomLineUpsertWithWhereUniqueWithoutBomInput | Prisma.BomLineUpsertWithWhereUniqueWithoutBomInput[];
    createMany?: Prisma.BomLineCreateManyBomInputEnvelope;
    set?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    disconnect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    delete?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    connect?: Prisma.BomLineWhereUniqueInput | Prisma.BomLineWhereUniqueInput[];
    update?: Prisma.BomLineUpdateWithWhereUniqueWithoutBomInput | Prisma.BomLineUpdateWithWhereUniqueWithoutBomInput[];
    updateMany?: Prisma.BomLineUpdateManyWithWhereWithoutBomInput | Prisma.BomLineUpdateManyWithWhereWithoutBomInput[];
    deleteMany?: Prisma.BomLineScalarWhereInput | Prisma.BomLineScalarWhereInput[];
};
export type BomLineCreateWithoutMaterialInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    bom: Prisma.BomCreateNestedOneWithoutLinesInput;
};
export type BomLineUncheckedCreateWithoutMaterialInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId: string;
};
export type BomLineCreateOrConnectWithoutMaterialInput = {
    where: Prisma.BomLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomLineCreateWithoutMaterialInput, Prisma.BomLineUncheckedCreateWithoutMaterialInput>;
};
export type BomLineCreateManyMaterialInputEnvelope = {
    data: Prisma.BomLineCreateManyMaterialInput | Prisma.BomLineCreateManyMaterialInput[];
    skipDuplicates?: boolean;
};
export type BomLineUpsertWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.BomLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.BomLineUpdateWithoutMaterialInput, Prisma.BomLineUncheckedUpdateWithoutMaterialInput>;
    create: Prisma.XOR<Prisma.BomLineCreateWithoutMaterialInput, Prisma.BomLineUncheckedCreateWithoutMaterialInput>;
};
export type BomLineUpdateWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.BomLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.BomLineUpdateWithoutMaterialInput, Prisma.BomLineUncheckedUpdateWithoutMaterialInput>;
};
export type BomLineUpdateManyWithWhereWithoutMaterialInput = {
    where: Prisma.BomLineScalarWhereInput;
    data: Prisma.XOR<Prisma.BomLineUpdateManyMutationInput, Prisma.BomLineUncheckedUpdateManyWithoutMaterialInput>;
};
export type BomLineScalarWhereInput = {
    AND?: Prisma.BomLineScalarWhereInput | Prisma.BomLineScalarWhereInput[];
    OR?: Prisma.BomLineScalarWhereInput[];
    NOT?: Prisma.BomLineScalarWhereInput | Prisma.BomLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"BomLine"> | string;
    quantity?: Prisma.DecimalFilter<"BomLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.UuidFilter<"BomLine"> | string;
    materialId?: Prisma.UuidFilter<"BomLine"> | string;
};
export type BomLineCreateWithoutBomInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    material: Prisma.MaterialCreateNestedOneWithoutBomLinesInput;
};
export type BomLineUncheckedCreateWithoutBomInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    materialId: string;
};
export type BomLineCreateOrConnectWithoutBomInput = {
    where: Prisma.BomLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomLineCreateWithoutBomInput, Prisma.BomLineUncheckedCreateWithoutBomInput>;
};
export type BomLineCreateManyBomInputEnvelope = {
    data: Prisma.BomLineCreateManyBomInput | Prisma.BomLineCreateManyBomInput[];
    skipDuplicates?: boolean;
};
export type BomLineUpsertWithWhereUniqueWithoutBomInput = {
    where: Prisma.BomLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.BomLineUpdateWithoutBomInput, Prisma.BomLineUncheckedUpdateWithoutBomInput>;
    create: Prisma.XOR<Prisma.BomLineCreateWithoutBomInput, Prisma.BomLineUncheckedCreateWithoutBomInput>;
};
export type BomLineUpdateWithWhereUniqueWithoutBomInput = {
    where: Prisma.BomLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.BomLineUpdateWithoutBomInput, Prisma.BomLineUncheckedUpdateWithoutBomInput>;
};
export type BomLineUpdateManyWithWhereWithoutBomInput = {
    where: Prisma.BomLineScalarWhereInput;
    data: Prisma.XOR<Prisma.BomLineUpdateManyMutationInput, Prisma.BomLineUncheckedUpdateManyWithoutBomInput>;
};
export type BomLineCreateManyMaterialInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId: string;
};
export type BomLineUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bom?: Prisma.BomUpdateOneRequiredWithoutLinesNestedInput;
};
export type BomLineUncheckedUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomLineUncheckedUpdateManyWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    bomId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomLineCreateManyBomInput = {
    id?: string;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    materialId: string;
};
export type BomLineUpdateWithoutBomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    material?: Prisma.MaterialUpdateOneRequiredWithoutBomLinesNestedInput;
};
export type BomLineUncheckedUpdateWithoutBomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomLineUncheckedUpdateManyWithoutBomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BomLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    bomId?: boolean;
    materialId?: boolean;
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bomLine"]>;
export type BomLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    bomId?: boolean;
    materialId?: boolean;
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bomLine"]>;
export type BomLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    bomId?: boolean;
    materialId?: boolean;
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bomLine"]>;
export type BomLineSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    bomId?: boolean;
    materialId?: boolean;
};
export type BomLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "bomId" | "materialId", ExtArgs["result"]["bomLine"]>;
export type BomLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type BomLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type BomLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bom?: boolean | Prisma.BomDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type $BomLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BomLine";
    objects: {
        bom: Prisma.$BomPayload<ExtArgs>;
        material: Prisma.$MaterialPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        bomId: string;
        materialId: string;
    }, ExtArgs["result"]["bomLine"]>;
    composites: {};
};
export type BomLineGetPayload<S extends boolean | null | undefined | BomLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BomLinePayload, S>;
export type BomLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BomLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BomLineCountAggregateInputType | true;
};
export interface BomLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BomLine'];
        meta: {
            name: 'BomLine';
        };
    };
    findUnique<T extends BomLineFindUniqueArgs>(args: Prisma.SelectSubset<T, BomLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BomLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BomLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BomLineFindFirstArgs>(args?: Prisma.SelectSubset<T, BomLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BomLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BomLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BomLineFindManyArgs>(args?: Prisma.SelectSubset<T, BomLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BomLineCreateArgs>(args: Prisma.SelectSubset<T, BomLineCreateArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BomLineCreateManyArgs>(args?: Prisma.SelectSubset<T, BomLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BomLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BomLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BomLineDeleteArgs>(args: Prisma.SelectSubset<T, BomLineDeleteArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BomLineUpdateArgs>(args: Prisma.SelectSubset<T, BomLineUpdateArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BomLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, BomLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BomLineUpdateManyArgs>(args: Prisma.SelectSubset<T, BomLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BomLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BomLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BomLineUpsertArgs>(args: Prisma.SelectSubset<T, BomLineUpsertArgs<ExtArgs>>): Prisma.Prisma__BomLineClient<runtime.Types.Result.GetResult<Prisma.$BomLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BomLineCountArgs>(args?: Prisma.Subset<T, BomLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BomLineCountAggregateOutputType> : number>;
    aggregate<T extends BomLineAggregateArgs>(args: Prisma.Subset<T, BomLineAggregateArgs>): Prisma.PrismaPromise<GetBomLineAggregateType<T>>;
    groupBy<T extends BomLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BomLineGroupByArgs['orderBy'];
    } : {
        orderBy?: BomLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BomLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBomLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BomLineFieldRefs;
}
export interface Prisma__BomLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bom<T extends Prisma.BomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BomDefaultArgs<ExtArgs>>): Prisma.Prisma__BomClient<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    material<T extends Prisma.MaterialDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BomLineFieldRefs {
    readonly id: Prisma.FieldRef<"BomLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"BomLine", 'Decimal'>;
    readonly bomId: Prisma.FieldRef<"BomLine", 'String'>;
    readonly materialId: Prisma.FieldRef<"BomLine", 'String'>;
}
export type BomLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
    where: Prisma.BomLineWhereUniqueInput;
};
export type BomLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
    where: Prisma.BomLineWhereUniqueInput;
};
export type BomLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BomLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BomLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BomLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BomLineCreateInput, Prisma.BomLineUncheckedCreateInput>;
};
export type BomLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BomLineCreateManyInput | Prisma.BomLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BomLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    data: Prisma.BomLineCreateManyInput | Prisma.BomLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BomLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BomLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BomLineUpdateInput, Prisma.BomLineUncheckedUpdateInput>;
    where: Prisma.BomLineWhereUniqueInput;
};
export type BomLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BomLineUpdateManyMutationInput, Prisma.BomLineUncheckedUpdateManyInput>;
    where?: Prisma.BomLineWhereInput;
    limit?: number;
};
export type BomLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BomLineUpdateManyMutationInput, Prisma.BomLineUncheckedUpdateManyInput>;
    where?: Prisma.BomLineWhereInput;
    limit?: number;
    include?: Prisma.BomLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BomLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
    where: Prisma.BomLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.BomLineCreateInput, Prisma.BomLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BomLineUpdateInput, Prisma.BomLineUncheckedUpdateInput>;
};
export type BomLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
    where: Prisma.BomLineWhereUniqueInput;
};
export type BomLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomLineWhereInput;
    limit?: number;
};
export type BomLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomLineSelect<ExtArgs> | null;
    omit?: Prisma.BomLineOmit<ExtArgs> | null;
    include?: Prisma.BomLineInclude<ExtArgs> | null;
};
