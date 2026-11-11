import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DiningAreaModel = runtime.Types.Result.DefaultSelection<Prisma.$DiningAreaPayload>;
export type AggregateDiningArea = {
    _count: DiningAreaCountAggregateOutputType | null;
    _avg: DiningAreaAvgAggregateOutputType | null;
    _sum: DiningAreaSumAggregateOutputType | null;
    _min: DiningAreaMinAggregateOutputType | null;
    _max: DiningAreaMaxAggregateOutputType | null;
};
export type DiningAreaAvgAggregateOutputType = {
    columns: number | null;
    rows: number | null;
};
export type DiningAreaSumAggregateOutputType = {
    columns: number | null;
    rows: number | null;
};
export type DiningAreaMinAggregateOutputType = {
    columns: number | null;
    rows: number | null;
    color: string | null;
    name: string | null;
};
export type DiningAreaMaxAggregateOutputType = {
    columns: number | null;
    rows: number | null;
    color: string | null;
    name: string | null;
};
export type DiningAreaCountAggregateOutputType = {
    columns: number;
    rows: number;
    color: number;
    name: number;
    _all: number;
};
export type DiningAreaAvgAggregateInputType = {
    columns?: true;
    rows?: true;
};
export type DiningAreaSumAggregateInputType = {
    columns?: true;
    rows?: true;
};
export type DiningAreaMinAggregateInputType = {
    columns?: true;
    rows?: true;
    color?: true;
    name?: true;
};
export type DiningAreaMaxAggregateInputType = {
    columns?: true;
    rows?: true;
    color?: true;
    name?: true;
};
export type DiningAreaCountAggregateInputType = {
    columns?: true;
    rows?: true;
    color?: true;
    name?: true;
    _all?: true;
};
export type DiningAreaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiningAreaWhereInput;
    orderBy?: Prisma.DiningAreaOrderByWithRelationInput | Prisma.DiningAreaOrderByWithRelationInput[];
    cursor?: Prisma.DiningAreaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DiningAreaCountAggregateInputType;
    _avg?: DiningAreaAvgAggregateInputType;
    _sum?: DiningAreaSumAggregateInputType;
    _min?: DiningAreaMinAggregateInputType;
    _max?: DiningAreaMaxAggregateInputType;
};
export type GetDiningAreaAggregateType<T extends DiningAreaAggregateArgs> = {
    [P in keyof T & keyof AggregateDiningArea]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiningArea[P]> : Prisma.GetScalarType<T[P], AggregateDiningArea[P]>;
};
export type DiningAreaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiningAreaWhereInput;
    orderBy?: Prisma.DiningAreaOrderByWithAggregationInput | Prisma.DiningAreaOrderByWithAggregationInput[];
    by: Prisma.DiningAreaScalarFieldEnum[] | Prisma.DiningAreaScalarFieldEnum;
    having?: Prisma.DiningAreaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiningAreaCountAggregateInputType | true;
    _avg?: DiningAreaAvgAggregateInputType;
    _sum?: DiningAreaSumAggregateInputType;
    _min?: DiningAreaMinAggregateInputType;
    _max?: DiningAreaMaxAggregateInputType;
};
export type DiningAreaGroupByOutputType = {
    columns: number;
    rows: number;
    color: string;
    name: string;
    _count: DiningAreaCountAggregateOutputType | null;
    _avg: DiningAreaAvgAggregateOutputType | null;
    _sum: DiningAreaSumAggregateOutputType | null;
    _min: DiningAreaMinAggregateOutputType | null;
    _max: DiningAreaMaxAggregateOutputType | null;
};
export type GetDiningAreaGroupByPayload<T extends DiningAreaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiningAreaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiningAreaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiningAreaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiningAreaGroupByOutputType[P]>;
}>>;
export type DiningAreaWhereInput = {
    AND?: Prisma.DiningAreaWhereInput | Prisma.DiningAreaWhereInput[];
    OR?: Prisma.DiningAreaWhereInput[];
    NOT?: Prisma.DiningAreaWhereInput | Prisma.DiningAreaWhereInput[];
    columns?: Prisma.IntFilter<"DiningArea"> | number;
    rows?: Prisma.IntFilter<"DiningArea"> | number;
    color?: Prisma.StringFilter<"DiningArea"> | string;
    name?: Prisma.StringFilter<"DiningArea"> | string;
    tables?: Prisma.DiningTableListRelationFilter;
};
export type DiningAreaOrderByWithRelationInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tables?: Prisma.DiningTableOrderByRelationAggregateInput;
};
export type DiningAreaWhereUniqueInput = Prisma.AtLeast<{
    name?: string;
    AND?: Prisma.DiningAreaWhereInput | Prisma.DiningAreaWhereInput[];
    OR?: Prisma.DiningAreaWhereInput[];
    NOT?: Prisma.DiningAreaWhereInput | Prisma.DiningAreaWhereInput[];
    columns?: Prisma.IntFilter<"DiningArea"> | number;
    rows?: Prisma.IntFilter<"DiningArea"> | number;
    color?: Prisma.StringFilter<"DiningArea"> | string;
    tables?: Prisma.DiningTableListRelationFilter;
}, "name">;
export type DiningAreaOrderByWithAggregationInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.DiningAreaCountOrderByAggregateInput;
    _avg?: Prisma.DiningAreaAvgOrderByAggregateInput;
    _max?: Prisma.DiningAreaMaxOrderByAggregateInput;
    _min?: Prisma.DiningAreaMinOrderByAggregateInput;
    _sum?: Prisma.DiningAreaSumOrderByAggregateInput;
};
export type DiningAreaScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiningAreaScalarWhereWithAggregatesInput | Prisma.DiningAreaScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiningAreaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiningAreaScalarWhereWithAggregatesInput | Prisma.DiningAreaScalarWhereWithAggregatesInput[];
    columns?: Prisma.IntWithAggregatesFilter<"DiningArea"> | number;
    rows?: Prisma.IntWithAggregatesFilter<"DiningArea"> | number;
    color?: Prisma.StringWithAggregatesFilter<"DiningArea"> | string;
    name?: Prisma.StringWithAggregatesFilter<"DiningArea"> | string;
};
export type DiningAreaCreateInput = {
    columns?: number;
    rows?: number;
    color?: string;
    name: string;
    tables?: Prisma.DiningTableCreateNestedManyWithoutDiningAreaInput;
};
export type DiningAreaUncheckedCreateInput = {
    columns?: number;
    rows?: number;
    color?: string;
    name: string;
    tables?: Prisma.DiningTableUncheckedCreateNestedManyWithoutDiningAreaInput;
};
export type DiningAreaUpdateInput = {
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tables?: Prisma.DiningTableUpdateManyWithoutDiningAreaNestedInput;
};
export type DiningAreaUncheckedUpdateInput = {
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tables?: Prisma.DiningTableUncheckedUpdateManyWithoutDiningAreaNestedInput;
};
export type DiningAreaCreateManyInput = {
    columns?: number;
    rows?: number;
    color?: string;
    name: string;
};
export type DiningAreaUpdateManyMutationInput = {
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningAreaUncheckedUpdateManyInput = {
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningAreaScalarRelationFilter = {
    is?: Prisma.DiningAreaWhereInput;
    isNot?: Prisma.DiningAreaWhereInput;
};
export type DiningAreaCountOrderByAggregateInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type DiningAreaAvgOrderByAggregateInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
};
export type DiningAreaMaxOrderByAggregateInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type DiningAreaMinOrderByAggregateInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type DiningAreaSumOrderByAggregateInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
};
export type DiningAreaCreateNestedOneWithoutTablesInput = {
    create?: Prisma.XOR<Prisma.DiningAreaCreateWithoutTablesInput, Prisma.DiningAreaUncheckedCreateWithoutTablesInput>;
    connectOrCreate?: Prisma.DiningAreaCreateOrConnectWithoutTablesInput;
    connect?: Prisma.DiningAreaWhereUniqueInput;
};
export type DiningAreaUpdateOneRequiredWithoutTablesNestedInput = {
    create?: Prisma.XOR<Prisma.DiningAreaCreateWithoutTablesInput, Prisma.DiningAreaUncheckedCreateWithoutTablesInput>;
    connectOrCreate?: Prisma.DiningAreaCreateOrConnectWithoutTablesInput;
    upsert?: Prisma.DiningAreaUpsertWithoutTablesInput;
    connect?: Prisma.DiningAreaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiningAreaUpdateToOneWithWhereWithoutTablesInput, Prisma.DiningAreaUpdateWithoutTablesInput>, Prisma.DiningAreaUncheckedUpdateWithoutTablesInput>;
};
export type DiningAreaCreateWithoutTablesInput = {
    columns?: number;
    rows?: number;
    color?: string;
    name: string;
};
export type DiningAreaUncheckedCreateWithoutTablesInput = {
    columns?: number;
    rows?: number;
    color?: string;
    name: string;
};
export type DiningAreaCreateOrConnectWithoutTablesInput = {
    where: Prisma.DiningAreaWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiningAreaCreateWithoutTablesInput, Prisma.DiningAreaUncheckedCreateWithoutTablesInput>;
};
export type DiningAreaUpsertWithoutTablesInput = {
    update: Prisma.XOR<Prisma.DiningAreaUpdateWithoutTablesInput, Prisma.DiningAreaUncheckedUpdateWithoutTablesInput>;
    create: Prisma.XOR<Prisma.DiningAreaCreateWithoutTablesInput, Prisma.DiningAreaUncheckedCreateWithoutTablesInput>;
    where?: Prisma.DiningAreaWhereInput;
};
export type DiningAreaUpdateToOneWithWhereWithoutTablesInput = {
    where?: Prisma.DiningAreaWhereInput;
    data: Prisma.XOR<Prisma.DiningAreaUpdateWithoutTablesInput, Prisma.DiningAreaUncheckedUpdateWithoutTablesInput>;
};
export type DiningAreaUpdateWithoutTablesInput = {
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningAreaUncheckedUpdateWithoutTablesInput = {
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiningAreaCountOutputType = {
    tables: number;
};
export type DiningAreaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tables?: boolean | DiningAreaCountOutputTypeCountTablesArgs;
};
export type DiningAreaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaCountOutputTypeSelect<ExtArgs> | null;
};
export type DiningAreaCountOutputTypeCountTablesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiningTableWhereInput;
};
export type DiningAreaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    columns?: boolean;
    rows?: boolean;
    color?: boolean;
    name?: boolean;
    tables?: boolean | Prisma.DiningArea$tablesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiningAreaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diningArea"]>;
export type DiningAreaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    columns?: boolean;
    rows?: boolean;
    color?: boolean;
    name?: boolean;
}, ExtArgs["result"]["diningArea"]>;
export type DiningAreaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    columns?: boolean;
    rows?: boolean;
    color?: boolean;
    name?: boolean;
}, ExtArgs["result"]["diningArea"]>;
export type DiningAreaSelectScalar = {
    columns?: boolean;
    rows?: boolean;
    color?: boolean;
    name?: boolean;
};
export type DiningAreaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"columns" | "rows" | "color" | "name", ExtArgs["result"]["diningArea"]>;
export type DiningAreaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tables?: boolean | Prisma.DiningArea$tablesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiningAreaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DiningAreaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DiningAreaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DiningAreaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiningArea";
    objects: {
        tables: Prisma.$DiningTablePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        columns: number;
        rows: number;
        color: string;
        name: string;
    }, ExtArgs["result"]["diningArea"]>;
    composites: {};
};
export type DiningAreaGetPayload<S extends boolean | null | undefined | DiningAreaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload, S>;
export type DiningAreaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiningAreaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiningAreaCountAggregateInputType | true;
};
export interface DiningAreaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiningArea'];
        meta: {
            name: 'DiningArea';
        };
    };
    findUnique<T extends DiningAreaFindUniqueArgs>(args: Prisma.SelectSubset<T, DiningAreaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DiningAreaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiningAreaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DiningAreaFindFirstArgs>(args?: Prisma.SelectSubset<T, DiningAreaFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DiningAreaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiningAreaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DiningAreaFindManyArgs>(args?: Prisma.SelectSubset<T, DiningAreaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DiningAreaCreateArgs>(args: Prisma.SelectSubset<T, DiningAreaCreateArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DiningAreaCreateManyArgs>(args?: Prisma.SelectSubset<T, DiningAreaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DiningAreaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiningAreaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DiningAreaDeleteArgs>(args: Prisma.SelectSubset<T, DiningAreaDeleteArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DiningAreaUpdateArgs>(args: Prisma.SelectSubset<T, DiningAreaUpdateArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DiningAreaDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiningAreaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DiningAreaUpdateManyArgs>(args: Prisma.SelectSubset<T, DiningAreaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DiningAreaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiningAreaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DiningAreaUpsertArgs>(args: Prisma.SelectSubset<T, DiningAreaUpsertArgs<ExtArgs>>): Prisma.Prisma__DiningAreaClient<runtime.Types.Result.GetResult<Prisma.$DiningAreaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DiningAreaCountArgs>(args?: Prisma.Subset<T, DiningAreaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiningAreaCountAggregateOutputType> : number>;
    aggregate<T extends DiningAreaAggregateArgs>(args: Prisma.Subset<T, DiningAreaAggregateArgs>): Prisma.PrismaPromise<GetDiningAreaAggregateType<T>>;
    groupBy<T extends DiningAreaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiningAreaGroupByArgs['orderBy'];
    } : {
        orderBy?: DiningAreaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiningAreaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiningAreaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DiningAreaFieldRefs;
}
export interface Prisma__DiningAreaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tables<T extends Prisma.DiningArea$tablesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiningArea$tablesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiningTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DiningAreaFieldRefs {
    readonly columns: Prisma.FieldRef<"DiningArea", 'Int'>;
    readonly rows: Prisma.FieldRef<"DiningArea", 'Int'>;
    readonly color: Prisma.FieldRef<"DiningArea", 'String'>;
    readonly name: Prisma.FieldRef<"DiningArea", 'String'>;
}
export type DiningAreaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    where: Prisma.DiningAreaWhereUniqueInput;
};
export type DiningAreaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    where: Prisma.DiningAreaWhereUniqueInput;
};
export type DiningAreaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    where?: Prisma.DiningAreaWhereInput;
    orderBy?: Prisma.DiningAreaOrderByWithRelationInput | Prisma.DiningAreaOrderByWithRelationInput[];
    cursor?: Prisma.DiningAreaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiningAreaScalarFieldEnum | Prisma.DiningAreaScalarFieldEnum[];
};
export type DiningAreaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    where?: Prisma.DiningAreaWhereInput;
    orderBy?: Prisma.DiningAreaOrderByWithRelationInput | Prisma.DiningAreaOrderByWithRelationInput[];
    cursor?: Prisma.DiningAreaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiningAreaScalarFieldEnum | Prisma.DiningAreaScalarFieldEnum[];
};
export type DiningAreaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    where?: Prisma.DiningAreaWhereInput;
    orderBy?: Prisma.DiningAreaOrderByWithRelationInput | Prisma.DiningAreaOrderByWithRelationInput[];
    cursor?: Prisma.DiningAreaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiningAreaScalarFieldEnum | Prisma.DiningAreaScalarFieldEnum[];
};
export type DiningAreaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiningAreaCreateInput, Prisma.DiningAreaUncheckedCreateInput>;
};
export type DiningAreaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DiningAreaCreateManyInput | Prisma.DiningAreaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DiningAreaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    data: Prisma.DiningAreaCreateManyInput | Prisma.DiningAreaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DiningAreaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiningAreaUpdateInput, Prisma.DiningAreaUncheckedUpdateInput>;
    where: Prisma.DiningAreaWhereUniqueInput;
};
export type DiningAreaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DiningAreaUpdateManyMutationInput, Prisma.DiningAreaUncheckedUpdateManyInput>;
    where?: Prisma.DiningAreaWhereInput;
    limit?: number;
};
export type DiningAreaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiningAreaUpdateManyMutationInput, Prisma.DiningAreaUncheckedUpdateManyInput>;
    where?: Prisma.DiningAreaWhereInput;
    limit?: number;
};
export type DiningAreaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    where: Prisma.DiningAreaWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiningAreaCreateInput, Prisma.DiningAreaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DiningAreaUpdateInput, Prisma.DiningAreaUncheckedUpdateInput>;
};
export type DiningAreaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
    where: Prisma.DiningAreaWhereUniqueInput;
};
export type DiningAreaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiningAreaWhereInput;
    limit?: number;
};
export type DiningArea$tablesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type DiningAreaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiningAreaSelect<ExtArgs> | null;
    omit?: Prisma.DiningAreaOmit<ExtArgs> | null;
    include?: Prisma.DiningAreaInclude<ExtArgs> | null;
};
