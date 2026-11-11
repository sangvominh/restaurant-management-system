import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DiningTableModel = runtime.Types.Result.DefaultSelection<Prisma.$DiningTablePayload>;
export type AggregateDiningTable = {
    _count: DiningTableCountAggregateOutputType | null;
    _avg: DiningTableAvgAggregateOutputType | null;
    _sum: DiningTableSumAggregateOutputType | null;
    _min: DiningTableMinAggregateOutputType | null;
    _max: DiningTableMaxAggregateOutputType | null;
};
export type DiningTableAvgAggregateOutputType = {
    x: number | null;
    y: number | null;
};
export type DiningTableSumAggregateOutputType = {
    x: number | null;
    y: number | null;
};
export type DiningTableMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    area: string | null;
    x: number | null;
    y: number | null;
    status: string | null;
};
export type DiningTableMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    area: string | null;
    x: number | null;
    y: number | null;
    status: string | null;
};
export type DiningTableCountAggregateOutputType = {
    id: number;
    name: number;
    area: number;
    x: number;
    y: number;
    status: number;
    _all: number;
};
export type DiningTableAvgAggregateInputType = {
    x?: true;
    y?: true;
};
export type DiningTableSumAggregateInputType = {
    x?: true;
    y?: true;
};
export type DiningTableMinAggregateInputType = {
    id?: true;
    name?: true;
    area?: true;
    x?: true;
    y?: true;
    status?: true;
};
export type DiningTableMaxAggregateInputType = {
    id?: true;
    name?: true;
    area?: true;
    x?: true;
    y?: true;
    status?: true;
};
export type DiningTableCountAggregateInputType = {
    id?: true;
    name?: true;
    area?: true;
    x?: true;
    y?: true;
    status?: true;
    _all?: true;
};
export type DiningTableAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiningTableWhereInput;
    orderBy?: Prisma.DiningTableOrderByWithRelationInput | Prisma.DiningTableOrderByWithRelationInput[];
    cursor?: Prisma.DiningTableWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DiningTableCountAggregateInputType;
    _avg?: DiningTableAvgAggregateInputType;
    _sum?: DiningTableSumAggregateInputType;
    _min?: DiningTableMinAggregateInputType;
    _max?: DiningTableMaxAggregateInputType;
};
export type GetDiningTableAggregateType<T extends DiningTableAggregateArgs> = {
    [P in keyof T & keyof AggregateDiningTable]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiningTable[P]> : Prisma.GetScalarType<T[P], AggregateDiningTable[P]>;
};
export type DiningTableGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiningTableWhereInput;
    orderBy?: Prisma.DiningTableOrderByWithAggregationInput | Prisma.DiningTableOrderByWithAggregationInput[];
    by: Prisma.DiningTableScalarFieldEnum[] | Prisma.DiningTableScalarFieldEnum;
    having?: Prisma.DiningTableScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiningTableCountAggregateInputType | true;
    _avg?: DiningTableAvgAggregateInputType;
    _sum?: DiningTableSumAggregateInputType;
    _min?: DiningTableMinAggregateInputType;
    _max?: DiningTableMaxAggregateInputType;
};
export type DiningTableGroupByOutputType = {
    id: string;
    name: string;
    area: string;
    x: number;
    y: number;
    status: string;
    _count: DiningTableCountAggregateOutputType | null;
    _avg: DiningTableAvgAggregateOutputType | null;
    _sum: DiningTableSumAggregateOutputType | null;
    _min: DiningTableMinAggregateOutputType | null;
    _max: DiningTableMaxAggregateOutputType | null;
};
export type GetDiningTableGroupByPayload<T extends DiningTableGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiningTableGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiningTableGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiningTableGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiningTableGroupByOutputType[P]>;
}>>;
export type DiningTableWhereInput = {
    AND?: Prisma.DiningTableWhereInput | Prisma.DiningTableWhereInput[];
    OR?: Prisma.DiningTableWhereInput[];
    NOT?: Prisma.DiningTableWhereInput | Prisma.DiningTableWhereInput[];
    id?: Prisma.UuidFilter<"DiningTable"> | string;
    name?: Prisma.StringFilter<"DiningTable"> | string;
    area?: Prisma.StringFilter<"DiningTable"> | string;
    x?: Prisma.IntFilter<"DiningTable"> | number;
    y?: Prisma.IntFilter<"DiningTable"> | number;
    status?: Prisma.StringFilter<"DiningTable"> | string;
    diningArea?: Prisma.XOR<Prisma.DiningAreaScalarRelationFilter, Prisma.DiningAreaWhereInput>;
    sales?: Prisma.SaleListRelationFilter;
};
export type DiningTableOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    diningArea?: Prisma.DiningAreaOrderByWithRelationInput;
    sales?: Prisma.SaleOrderByRelationAggregateInput;
};
export type DiningTableWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.DiningTableWhereInput | Prisma.DiningTableWhereInput[];
    OR?: Prisma.DiningTableWhereInput[];
    NOT?: Prisma.DiningTableWhereInput | Prisma.DiningTableWhereInput[];
    area?: Prisma.StringFilter<"DiningTable"> | string;
    x?: Prisma.IntFilter<"DiningTable"> | number;
    y?: Prisma.IntFilter<"DiningTable"> | number;
    status?: Prisma.StringFilter<"DiningTable"> | string;
    diningArea?: Prisma.XOR<Prisma.DiningAreaScalarRelationFilter, Prisma.DiningAreaWhereInput>;
    sales?: Prisma.SaleListRelationFilter;
}, "id" | "name">;
export type DiningTableOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    _count?: Prisma.DiningTableCountOrderByAggregateInput;
    _avg?: Prisma.DiningTableAvgOrderByAggregateInput;
    _max?: Prisma.DiningTableMaxOrderByAggregateInput;
    _min?: Prisma.DiningTableMinOrderByAggregateInput;
    _sum?: Prisma.DiningTableSumOrderByAggregateInput;
};
export type DiningTableScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiningTableScalarWhereWithAggregatesInput | Prisma.DiningTableScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiningTableScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiningTableScalarWhereWithAggregatesInput | Prisma.DiningTableScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DiningTable"> | string;
    name?: Prisma.StringWithAggregatesFilter<"DiningTable"> | string;
    area?: Prisma.StringWithAggregatesFilter<"DiningTable"> | string;
    x?: Prisma.IntWithAggregatesFilter<"DiningTable"> | number;
    y?: Prisma.IntWithAggregatesFilter<"DiningTable"> | number;
    status?: Prisma.StringWithAggregatesFilter<"DiningTable"> | string;
};
export type DiningTableCreateInput = {
    id?: string;
    name: string;
    x?: number;
    y?: number;
    status?: string;
    diningArea?: Prisma.DiningAreaCreateNestedOneWithoutTablesInput;
    sales?: Prisma.SaleCreateNestedManyWithoutTableInput;
};
export type DiningTableUncheckedCreateInput = {
    id?: string;
    name: string;
    area?: string;
    x?: number;
    y?: number;
    status?: string;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutTableInput;
};
export type DiningTableUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    diningArea?: Prisma.DiningAreaUpdateOneRequiredWithoutTablesNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutTableNestedInput;
};
export type DiningTableUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutTableNestedInput;
};
export type DiningTableCreateManyInput = {
    id?: string;
    name: string;
    area?: string;
    x?: number;
    y?: number;
    status?: string;
};
export type DiningTableUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningTableUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningTableNullableScalarRelationFilter = {
    is?: Prisma.DiningTableWhereInput | null;
    isNot?: Prisma.DiningTableWhereInput | null;
};
export type DiningTableCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type DiningTableAvgOrderByAggregateInput = {
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
};
export type DiningTableMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type DiningTableMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type DiningTableSumOrderByAggregateInput = {
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
};
export type DiningTableListRelationFilter = {
    every?: Prisma.DiningTableWhereInput;
    some?: Prisma.DiningTableWhereInput;
    none?: Prisma.DiningTableWhereInput;
};
export type DiningTableOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DiningTableCreateNestedOneWithoutSalesInput = {
    create?: Prisma.XOR<Prisma.DiningTableCreateWithoutSalesInput, Prisma.DiningTableUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.DiningTableCreateOrConnectWithoutSalesInput;
    connect?: Prisma.DiningTableWhereUniqueInput;
};
export type DiningTableUpdateOneWithoutSalesNestedInput = {
    create?: Prisma.XOR<Prisma.DiningTableCreateWithoutSalesInput, Prisma.DiningTableUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.DiningTableCreateOrConnectWithoutSalesInput;
    upsert?: Prisma.DiningTableUpsertWithoutSalesInput;
    disconnect?: Prisma.DiningTableWhereInput | boolean;
    delete?: Prisma.DiningTableWhereInput | boolean;
    connect?: Prisma.DiningTableWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiningTableUpdateToOneWithWhereWithoutSalesInput, Prisma.DiningTableUpdateWithoutSalesInput>, Prisma.DiningTableUncheckedUpdateWithoutSalesInput>;
};
export type DiningTableCreateNestedManyWithoutDiningAreaInput = {
    create?: Prisma.XOR<Prisma.DiningTableCreateWithoutDiningAreaInput, Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput> | Prisma.DiningTableCreateWithoutDiningAreaInput[] | Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput[];
    connectOrCreate?: Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput | Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput[];
    createMany?: Prisma.DiningTableCreateManyDiningAreaInputEnvelope;
    connect?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
};
export type DiningTableUncheckedCreateNestedManyWithoutDiningAreaInput = {
    create?: Prisma.XOR<Prisma.DiningTableCreateWithoutDiningAreaInput, Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput> | Prisma.DiningTableCreateWithoutDiningAreaInput[] | Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput[];
    connectOrCreate?: Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput | Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput[];
    createMany?: Prisma.DiningTableCreateManyDiningAreaInputEnvelope;
    connect?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
};
export type DiningTableUpdateManyWithoutDiningAreaNestedInput = {
    create?: Prisma.XOR<Prisma.DiningTableCreateWithoutDiningAreaInput, Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput> | Prisma.DiningTableCreateWithoutDiningAreaInput[] | Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput[];
    connectOrCreate?: Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput | Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput[];
    upsert?: Prisma.DiningTableUpsertWithWhereUniqueWithoutDiningAreaInput | Prisma.DiningTableUpsertWithWhereUniqueWithoutDiningAreaInput[];
    createMany?: Prisma.DiningTableCreateManyDiningAreaInputEnvelope;
    set?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    disconnect?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    delete?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    connect?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    update?: Prisma.DiningTableUpdateWithWhereUniqueWithoutDiningAreaInput | Prisma.DiningTableUpdateWithWhereUniqueWithoutDiningAreaInput[];
    updateMany?: Prisma.DiningTableUpdateManyWithWhereWithoutDiningAreaInput | Prisma.DiningTableUpdateManyWithWhereWithoutDiningAreaInput[];
    deleteMany?: Prisma.DiningTableScalarWhereInput | Prisma.DiningTableScalarWhereInput[];
};
export type DiningTableUncheckedUpdateManyWithoutDiningAreaNestedInput = {
    create?: Prisma.XOR<Prisma.DiningTableCreateWithoutDiningAreaInput, Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput> | Prisma.DiningTableCreateWithoutDiningAreaInput[] | Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput[];
    connectOrCreate?: Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput | Prisma.DiningTableCreateOrConnectWithoutDiningAreaInput[];
    upsert?: Prisma.DiningTableUpsertWithWhereUniqueWithoutDiningAreaInput | Prisma.DiningTableUpsertWithWhereUniqueWithoutDiningAreaInput[];
    createMany?: Prisma.DiningTableCreateManyDiningAreaInputEnvelope;
    set?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    disconnect?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    delete?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    connect?: Prisma.DiningTableWhereUniqueInput | Prisma.DiningTableWhereUniqueInput[];
    update?: Prisma.DiningTableUpdateWithWhereUniqueWithoutDiningAreaInput | Prisma.DiningTableUpdateWithWhereUniqueWithoutDiningAreaInput[];
    updateMany?: Prisma.DiningTableUpdateManyWithWhereWithoutDiningAreaInput | Prisma.DiningTableUpdateManyWithWhereWithoutDiningAreaInput[];
    deleteMany?: Prisma.DiningTableScalarWhereInput | Prisma.DiningTableScalarWhereInput[];
};
export type DiningTableCreateWithoutSalesInput = {
    id?: string;
    name: string;
    x?: number;
    y?: number;
    status?: string;
    diningArea?: Prisma.DiningAreaCreateNestedOneWithoutTablesInput;
};
export type DiningTableUncheckedCreateWithoutSalesInput = {
    id?: string;
    name: string;
    area?: string;
    x?: number;
    y?: number;
    status?: string;
};
export type DiningTableCreateOrConnectWithoutSalesInput = {
    where: Prisma.DiningTableWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiningTableCreateWithoutSalesInput, Prisma.DiningTableUncheckedCreateWithoutSalesInput>;
};
export type DiningTableUpsertWithoutSalesInput = {
    update: Prisma.XOR<Prisma.DiningTableUpdateWithoutSalesInput, Prisma.DiningTableUncheckedUpdateWithoutSalesInput>;
    create: Prisma.XOR<Prisma.DiningTableCreateWithoutSalesInput, Prisma.DiningTableUncheckedCreateWithoutSalesInput>;
    where?: Prisma.DiningTableWhereInput;
};
export type DiningTableUpdateToOneWithWhereWithoutSalesInput = {
    where?: Prisma.DiningTableWhereInput;
    data: Prisma.XOR<Prisma.DiningTableUpdateWithoutSalesInput, Prisma.DiningTableUncheckedUpdateWithoutSalesInput>;
};
export type DiningTableUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    diningArea?: Prisma.DiningAreaUpdateOneRequiredWithoutTablesNestedInput;
};
export type DiningTableUncheckedUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningTableCreateWithoutDiningAreaInput = {
    id?: string;
    name: string;
    x?: number;
    y?: number;
    status?: string;
    sales?: Prisma.SaleCreateNestedManyWithoutTableInput;
};
export type DiningTableUncheckedCreateWithoutDiningAreaInput = {
    id?: string;
    name: string;
    x?: number;
    y?: number;
    status?: string;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutTableInput;
};
export type DiningTableCreateOrConnectWithoutDiningAreaInput = {
    where: Prisma.DiningTableWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiningTableCreateWithoutDiningAreaInput, Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput>;
};
export type DiningTableCreateManyDiningAreaInputEnvelope = {
    data: Prisma.DiningTableCreateManyDiningAreaInput | Prisma.DiningTableCreateManyDiningAreaInput[];
    skipDuplicates?: boolean;
};
export type DiningTableUpsertWithWhereUniqueWithoutDiningAreaInput = {
    where: Prisma.DiningTableWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiningTableUpdateWithoutDiningAreaInput, Prisma.DiningTableUncheckedUpdateWithoutDiningAreaInput>;
    create: Prisma.XOR<Prisma.DiningTableCreateWithoutDiningAreaInput, Prisma.DiningTableUncheckedCreateWithoutDiningAreaInput>;
};
export type DiningTableUpdateWithWhereUniqueWithoutDiningAreaInput = {
    where: Prisma.DiningTableWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiningTableUpdateWithoutDiningAreaInput, Prisma.DiningTableUncheckedUpdateWithoutDiningAreaInput>;
};
export type DiningTableUpdateManyWithWhereWithoutDiningAreaInput = {
    where: Prisma.DiningTableScalarWhereInput;
    data: Prisma.XOR<Prisma.DiningTableUpdateManyMutationInput, Prisma.DiningTableUncheckedUpdateManyWithoutDiningAreaInput>;
};
export type DiningTableScalarWhereInput = {
    AND?: Prisma.DiningTableScalarWhereInput | Prisma.DiningTableScalarWhereInput[];
    OR?: Prisma.DiningTableScalarWhereInput[];
    NOT?: Prisma.DiningTableScalarWhereInput | Prisma.DiningTableScalarWhereInput[];
    id?: Prisma.UuidFilter<"DiningTable"> | string;
    name?: Prisma.StringFilter<"DiningTable"> | string;
    area?: Prisma.StringFilter<"DiningTable"> | string;
    x?: Prisma.IntFilter<"DiningTable"> | number;
    y?: Prisma.IntFilter<"DiningTable"> | number;
    status?: Prisma.StringFilter<"DiningTable"> | string;
};
export type DiningTableCreateManyDiningAreaInput = {
    id?: string;
    name: string;
    x?: number;
    y?: number;
    status?: string;
};
export type DiningTableUpdateWithoutDiningAreaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sales?: Prisma.SaleUpdateManyWithoutTableNestedInput;
};
export type DiningTableUncheckedUpdateWithoutDiningAreaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutTableNestedInput;
};
export type DiningTableUncheckedUpdateManyWithoutDiningAreaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    x?: Prisma.IntFieldUpdateOperationsInput | number;
    y?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningTableCountOutputType = {
    sales: number;
};
export type DiningTableCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sales?: boolean | DiningTableCountOutputTypeCountSalesArgs;
};
export type DiningTableCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableCountOutputTypeSelect<ExtArgs> | null;
};
export type DiningTableCountOutputTypeCountSalesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleWhereInput;
};
export type DiningTableSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    area?: boolean;
    x?: boolean;
    y?: boolean;
    status?: boolean;
    diningArea?: boolean | Prisma.DiningAreaDefaultArgs<ExtArgs>;
    sales?: boolean | Prisma.DiningTable$salesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiningTableCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diningTable"]>;
export type DiningTableSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    area?: boolean;
    x?: boolean;
    y?: boolean;
    status?: boolean;
    diningArea?: boolean | Prisma.DiningAreaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diningTable"]>;
export type DiningTableSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    area?: boolean;
    x?: boolean;
    y?: boolean;
    status?: boolean;
    diningArea?: boolean | Prisma.DiningAreaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diningTable"]>;
export type DiningTableSelectScalar = {
    id?: boolean;
    name?: boolean;
    area?: boolean;
    x?: boolean;
    y?: boolean;
    status?: boolean;
};
export type DiningTableOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "area" | "x" | "y" | "status", ExtArgs["result"]["diningTable"]>;
export type DiningTableInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    diningArea?: boolean | Prisma.DiningAreaDefaultArgs<ExtArgs>;
    sales?: boolean | Prisma.DiningTable$salesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiningTableCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DiningTableIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    diningArea?: boolean | Prisma.DiningAreaDefaultArgs<ExtArgs>;
};
export type DiningTableIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    diningArea?: boolean | Prisma.DiningAreaDefaultArgs<ExtArgs>;
};
export type $DiningTablePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiningTable";
    objects: {
        diningArea: Prisma.$DiningAreaPayload<ExtArgs>;
        sales: Prisma.$SalePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        area: string;
        x: number;
        y: number;
        status: string;
    }, ExtArgs["result"]["diningTable"]>;
    composites: {};
};
export type DiningTableGetPayload<S extends boolean | null | undefined | DiningTableDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiningTablePayload, S>;
export type DiningTableCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiningTableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiningTableCountAggregateInputType | true;
};
export interface DiningTableDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiningTable'];
        meta: {
            name: 'DiningTable';
        };
    };
    findUnique<T extends DiningTableFindUniqueArgs>(args: Prisma.SelectSubset<T, DiningTableFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DiningTableFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiningTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DiningTableFindFirstArgs>(args?: Prisma.SelectSubset<T, DiningTableFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DiningTableFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiningTableFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DiningTableFindManyArgs>(args?: Prisma.SelectSubset<T, DiningTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DiningTableCreateArgs>(args: Prisma.SelectSubset<T, DiningTableCreateArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DiningTableCreateManyArgs>(args?: Prisma.SelectSubset<T, DiningTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DiningTableCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiningTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DiningTableDeleteArgs>(args: Prisma.SelectSubset<T, DiningTableDeleteArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DiningTableUpdateArgs>(args: Prisma.SelectSubset<T, DiningTableUpdateArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DiningTableDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiningTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DiningTableUpdateManyArgs>(args: Prisma.SelectSubset<T, DiningTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DiningTableUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiningTableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DiningTableUpsertArgs>(args: Prisma.SelectSubset<T, DiningTableUpsertArgs<ExtArgs>>): Prisma.Prisma__DiningTableClient<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DiningTableCountArgs>(args?: Prisma.Subset<T, DiningTableCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiningTableCountAggregateOutputType> : number>;
    aggregate<T extends DiningTableAggregateArgs>(args: Prisma.Subset<T, DiningTableAggregateArgs>): Prisma.PrismaPromise<GetDiningTableAggregateType<T>>;
    groupBy<T extends DiningTableGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiningTableGroupByArgs['orderBy'];
    } : {
        orderBy?: DiningTableGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiningTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiningTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DiningTableFieldRefs;
}
export interface Prisma__DiningTableClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    diningArea<T extends Prisma.DiningAreaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiningAreaDefaultArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sales<T extends Prisma.DiningTable$salesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiningTable$salesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DiningTableFieldRefs {
    readonly id: Prisma.FieldRef<"DiningTable", 'String'>;
    readonly name: Prisma.FieldRef<"DiningTable", 'String'>;
    readonly area: Prisma.FieldRef<"DiningTable", 'String'>;
    readonly x: Prisma.FieldRef<"DiningTable", 'Int'>;
    readonly y: Prisma.FieldRef<"DiningTable", 'Int'>;
    readonly status: Prisma.FieldRef<"DiningTable", 'String'>;
}
export type DiningTableFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    where: Prisma.DiningTableWhereUniqueInput;
};
export type DiningTableFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    where: Prisma.DiningTableWhereUniqueInput;
};
export type DiningTableFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    where?: Prisma.DiningTableWhereInput;
    orderBy?: Prisma.DiningTableOrderByWithRelationInput | Prisma.DiningTableOrderByWithRelationInput[];
    cursor?: Prisma.DiningTableWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiningTableScalarFieldEnum | Prisma.DiningTableScalarFieldEnum[];
};
export type DiningTableFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    where?: Prisma.DiningTableWhereInput;
    orderBy?: Prisma.DiningTableOrderByWithRelationInput | Prisma.DiningTableOrderByWithRelationInput[];
    cursor?: Prisma.DiningTableWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiningTableScalarFieldEnum | Prisma.DiningTableScalarFieldEnum[];
};
export type DiningTableFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    where?: Prisma.DiningTableWhereInput;
    orderBy?: Prisma.DiningTableOrderByWithRelationInput | Prisma.DiningTableOrderByWithRelationInput[];
    cursor?: Prisma.DiningTableWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiningTableScalarFieldEnum | Prisma.DiningTableScalarFieldEnum[];
};
export type DiningTableCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiningTableCreateInput, Prisma.DiningTableUncheckedCreateInput>;
};
export type DiningTableCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DiningTableCreateManyInput | Prisma.DiningTableCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DiningTableCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    data: Prisma.DiningTableCreateManyInput | Prisma.DiningTableCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DiningTableIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DiningTableUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiningTableUpdateInput, Prisma.DiningTableUncheckedUpdateInput>;
    where: Prisma.DiningTableWhereUniqueInput;
};
export type DiningTableUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DiningTableUpdateManyMutationInput, Prisma.DiningTableUncheckedUpdateManyInput>;
    where?: Prisma.DiningTableWhereInput;
    limit?: number;
};
export type DiningTableUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiningTableUpdateManyMutationInput, Prisma.DiningTableUncheckedUpdateManyInput>;
    where?: Prisma.DiningTableWhereInput;
    limit?: number;
    include?: Prisma.DiningTableIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DiningTableUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    where: Prisma.DiningTableWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiningTableCreateInput, Prisma.DiningTableUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DiningTableUpdateInput, Prisma.DiningTableUncheckedUpdateInput>;
};
export type DiningTableDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
    where: Prisma.DiningTableWhereUniqueInput;
};
export type DiningTableDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiningTableWhereInput;
    limit?: number;
};
export type DiningTable$salesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleScalarFieldEnum | Prisma.SaleScalarFieldEnum[];
};
export type DiningTableDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningTableSelect<ExtArgs> | null;
    omit?: Prisma.DiningTableOmit<ExtArgs> | null;
    include?: Prisma.DiningTableInclude<ExtArgs> | null;
};
