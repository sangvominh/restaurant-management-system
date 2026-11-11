import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RoleTemplateModel = runtime.Types.Result.DefaultSelection<Prisma.$RoleTemplatePayload>;
export type AggregateRoleTemplate = {
    _count: RoleTemplateCountAggregateOutputType | null;
    _min: RoleTemplateMinAggregateOutputType | null;
    _max: RoleTemplateMaxAggregateOutputType | null;
};
export type RoleTemplateMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    workspace: string | null;
    description: string | null;
    updatedAt: Date | null;
};
export type RoleTemplateMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    workspace: string | null;
    description: string | null;
    updatedAt: Date | null;
};
export type RoleTemplateCountAggregateOutputType = {
    id: number;
    name: number;
    workspace: number;
    description: number;
    permissions: number;
    updatedAt: number;
    _all: number;
};
export type RoleTemplateMinAggregateInputType = {
    id?: true;
    name?: true;
    workspace?: true;
    description?: true;
    updatedAt?: true;
};
export type RoleTemplateMaxAggregateInputType = {
    id?: true;
    name?: true;
    workspace?: true;
    description?: true;
    updatedAt?: true;
};
export type RoleTemplateCountAggregateInputType = {
    id?: true;
    name?: true;
    workspace?: true;
    description?: true;
    permissions?: true;
    updatedAt?: true;
    _all?: true;
};
export type RoleTemplateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoleTemplateWhereInput;
    orderBy?: Prisma.RoleTemplateOrderByWithRelationInput | Prisma.RoleTemplateOrderByWithRelationInput[];
    cursor?: Prisma.RoleTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RoleTemplateCountAggregateInputType;
    _min?: RoleTemplateMinAggregateInputType;
    _max?: RoleTemplateMaxAggregateInputType;
};
export type GetRoleTemplateAggregateType<T extends RoleTemplateAggregateArgs> = {
    [P in keyof T & keyof AggregateRoleTemplate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoleTemplate[P]> : Prisma.GetScalarType<T[P], AggregateRoleTemplate[P]>;
};
export type RoleTemplateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoleTemplateWhereInput;
    orderBy?: Prisma.RoleTemplateOrderByWithAggregationInput | Prisma.RoleTemplateOrderByWithAggregationInput[];
    by: Prisma.RoleTemplateScalarFieldEnum[] | Prisma.RoleTemplateScalarFieldEnum;
    having?: Prisma.RoleTemplateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoleTemplateCountAggregateInputType | true;
    _min?: RoleTemplateMinAggregateInputType;
    _max?: RoleTemplateMaxAggregateInputType;
};
export type RoleTemplateGroupByOutputType = {
    id: string;
    name: string;
    workspace: string;
    description: string;
    permissions: string[];
    updatedAt: Date;
    _count: RoleTemplateCountAggregateOutputType | null;
    _min: RoleTemplateMinAggregateOutputType | null;
    _max: RoleTemplateMaxAggregateOutputType | null;
};
export type GetRoleTemplateGroupByPayload<T extends RoleTemplateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoleTemplateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoleTemplateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoleTemplateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoleTemplateGroupByOutputType[P]>;
}>>;
export type RoleTemplateWhereInput = {
    AND?: Prisma.RoleTemplateWhereInput | Prisma.RoleTemplateWhereInput[];
    OR?: Prisma.RoleTemplateWhereInput[];
    NOT?: Prisma.RoleTemplateWhereInput | Prisma.RoleTemplateWhereInput[];
    id?: Prisma.StringFilter<"RoleTemplate"> | string;
    name?: Prisma.StringFilter<"RoleTemplate"> | string;
    workspace?: Prisma.StringFilter<"RoleTemplate"> | string;
    description?: Prisma.StringFilter<"RoleTemplate"> | string;
    permissions?: Prisma.StringNullableListFilter<"RoleTemplate">;
    updatedAt?: Prisma.DateTimeFilter<"RoleTemplate"> | Date | string;
};
export type RoleTemplateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    workspace?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    permissions?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoleTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RoleTemplateWhereInput | Prisma.RoleTemplateWhereInput[];
    OR?: Prisma.RoleTemplateWhereInput[];
    NOT?: Prisma.RoleTemplateWhereInput | Prisma.RoleTemplateWhereInput[];
    name?: Prisma.StringFilter<"RoleTemplate"> | string;
    workspace?: Prisma.StringFilter<"RoleTemplate"> | string;
    description?: Prisma.StringFilter<"RoleTemplate"> | string;
    permissions?: Prisma.StringNullableListFilter<"RoleTemplate">;
    updatedAt?: Prisma.DateTimeFilter<"RoleTemplate"> | Date | string;
}, "id">;
export type RoleTemplateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    workspace?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    permissions?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RoleTemplateCountOrderByAggregateInput;
    _max?: Prisma.RoleTemplateMaxOrderByAggregateInput;
    _min?: Prisma.RoleTemplateMinOrderByAggregateInput;
};
export type RoleTemplateScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoleTemplateScalarWhereWithAggregatesInput | Prisma.RoleTemplateScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoleTemplateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoleTemplateScalarWhereWithAggregatesInput | Prisma.RoleTemplateScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RoleTemplate"> | string;
    name?: Prisma.StringWithAggregatesFilter<"RoleTemplate"> | string;
    workspace?: Prisma.StringWithAggregatesFilter<"RoleTemplate"> | string;
    description?: Prisma.StringWithAggregatesFilter<"RoleTemplate"> | string;
    permissions?: Prisma.StringNullableListFilter<"RoleTemplate">;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RoleTemplate"> | Date | string;
};
export type RoleTemplateCreateInput = {
    id: string;
    name: string;
    workspace: string;
    description: string;
    permissions?: Prisma.RoleTemplateCreatepermissionsInput | string[];
    updatedAt?: Date | string;
};
export type RoleTemplateUncheckedCreateInput = {
    id: string;
    name: string;
    workspace: string;
    description: string;
    permissions?: Prisma.RoleTemplateCreatepermissionsInput | string[];
    updatedAt?: Date | string;
};
export type RoleTemplateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    workspace?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    permissions?: Prisma.RoleTemplateUpdatepermissionsInput | string[];
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoleTemplateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    workspace?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    permissions?: Prisma.RoleTemplateUpdatepermissionsInput | string[];
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoleTemplateCreateManyInput = {
    id: string;
    name: string;
    workspace: string;
    description: string;
    permissions?: Prisma.RoleTemplateCreatepermissionsInput | string[];
    updatedAt?: Date | string;
};
export type RoleTemplateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    workspace?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    permissions?: Prisma.RoleTemplateUpdatepermissionsInput | string[];
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoleTemplateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    workspace?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    permissions?: Prisma.RoleTemplateUpdatepermissionsInput | string[];
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type RoleTemplateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    workspace?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    permissions?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoleTemplateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    workspace?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoleTemplateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    workspace?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoleTemplateCreatepermissionsInput = {
    set: string[];
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type RoleTemplateUpdatepermissionsInput = {
    set?: string[];
    push?: string | string[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type RoleTemplateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    workspace?: boolean;
    description?: boolean;
    permissions?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["roleTemplate"]>;
export type RoleTemplateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    workspace?: boolean;
    description?: boolean;
    permissions?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["roleTemplate"]>;
export type RoleTemplateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    workspace?: boolean;
    description?: boolean;
    permissions?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["roleTemplate"]>;
export type RoleTemplateSelectScalar = {
    id?: boolean;
    name?: boolean;
    workspace?: boolean;
    description?: boolean;
    permissions?: boolean;
    updatedAt?: boolean;
};
export type RoleTemplateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "workspace" | "description" | "permissions" | "updatedAt", ExtArgs["result"]["roleTemplate"]>;
export type $RoleTemplatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RoleTemplate";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        workspace: string;
        description: string;
        permissions: string[];
        updatedAt: Date;
    }, ExtArgs["result"]["roleTemplate"]>;
    composites: {};
};
export type RoleTemplateGetPayload<S extends boolean | null | undefined | RoleTemplateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload, S>;
export type RoleTemplateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoleTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoleTemplateCountAggregateInputType | true;
};
export interface RoleTemplateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RoleTemplate'];
        meta: {
            name: 'RoleTemplate';
        };
    };
    findUnique<T extends RoleTemplateFindUniqueArgs>(args: Prisma.SelectSubset<T, RoleTemplateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RoleTemplateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoleTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RoleTemplateFindFirstArgs>(args?: Prisma.SelectSubset<T, RoleTemplateFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RoleTemplateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoleTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RoleTemplateFindManyArgs>(args?: Prisma.SelectSubset<T, RoleTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RoleTemplateCreateArgs>(args: Prisma.SelectSubset<T, RoleTemplateCreateArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RoleTemplateCreateManyArgs>(args?: Prisma.SelectSubset<T, RoleTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RoleTemplateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoleTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RoleTemplateDeleteArgs>(args: Prisma.SelectSubset<T, RoleTemplateDeleteArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RoleTemplateUpdateArgs>(args: Prisma.SelectSubset<T, RoleTemplateUpdateArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RoleTemplateDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoleTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RoleTemplateUpdateManyArgs>(args: Prisma.SelectSubset<T, RoleTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RoleTemplateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoleTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RoleTemplateUpsertArgs>(args: Prisma.SelectSubset<T, RoleTemplateUpsertArgs<ExtArgs>>): Prisma.Prisma__RoleTemplateClient<runtime.Types.Result.GetResult<Prisma.$RoleTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RoleTemplateCountArgs>(args?: Prisma.Subset<T, RoleTemplateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoleTemplateCountAggregateOutputType> : number>;
    aggregate<T extends RoleTemplateAggregateArgs>(args: Prisma.Subset<T, RoleTemplateAggregateArgs>): Prisma.PrismaPromise<GetRoleTemplateAggregateType<T>>;
    groupBy<T extends RoleTemplateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoleTemplateGroupByArgs['orderBy'];
    } : {
        orderBy?: RoleTemplateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoleTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RoleTemplateFieldRefs;
}
export interface Prisma__RoleTemplateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RoleTemplateFieldRefs {
    readonly id: Prisma.FieldRef<"RoleTemplate", 'String'>;
    readonly name: Prisma.FieldRef<"RoleTemplate", 'String'>;
    readonly workspace: Prisma.FieldRef<"RoleTemplate", 'String'>;
    readonly description: Prisma.FieldRef<"RoleTemplate", 'String'>;
    readonly permissions: Prisma.FieldRef<"RoleTemplate", 'String[]'>;
    readonly updatedAt: Prisma.FieldRef<"RoleTemplate", 'DateTime'>;
}
export type RoleTemplateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    where: Prisma.RoleTemplateWhereUniqueInput;
};
export type RoleTemplateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    where: Prisma.RoleTemplateWhereUniqueInput;
};
export type RoleTemplateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    where?: Prisma.RoleTemplateWhereInput;
    orderBy?: Prisma.RoleTemplateOrderByWithRelationInput | Prisma.RoleTemplateOrderByWithRelationInput[];
    cursor?: Prisma.RoleTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoleTemplateScalarFieldEnum | Prisma.RoleTemplateScalarFieldEnum[];
};
export type RoleTemplateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    where?: Prisma.RoleTemplateWhereInput;
    orderBy?: Prisma.RoleTemplateOrderByWithRelationInput | Prisma.RoleTemplateOrderByWithRelationInput[];
    cursor?: Prisma.RoleTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoleTemplateScalarFieldEnum | Prisma.RoleTemplateScalarFieldEnum[];
};
export type RoleTemplateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    where?: Prisma.RoleTemplateWhereInput;
    orderBy?: Prisma.RoleTemplateOrderByWithRelationInput | Prisma.RoleTemplateOrderByWithRelationInput[];
    cursor?: Prisma.RoleTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoleTemplateScalarFieldEnum | Prisma.RoleTemplateScalarFieldEnum[];
};
export type RoleTemplateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoleTemplateCreateInput, Prisma.RoleTemplateUncheckedCreateInput>;
};
export type RoleTemplateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RoleTemplateCreateManyInput | Prisma.RoleTemplateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RoleTemplateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    data: Prisma.RoleTemplateCreateManyInput | Prisma.RoleTemplateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RoleTemplateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoleTemplateUpdateInput, Prisma.RoleTemplateUncheckedUpdateInput>;
    where: Prisma.RoleTemplateWhereUniqueInput;
};
export type RoleTemplateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RoleTemplateUpdateManyMutationInput, Prisma.RoleTemplateUncheckedUpdateManyInput>;
    where?: Prisma.RoleTemplateWhereInput;
    limit?: number;
};
export type RoleTemplateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoleTemplateUpdateManyMutationInput, Prisma.RoleTemplateUncheckedUpdateManyInput>;
    where?: Prisma.RoleTemplateWhereInput;
    limit?: number;
};
export type RoleTemplateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    where: Prisma.RoleTemplateWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoleTemplateCreateInput, Prisma.RoleTemplateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RoleTemplateUpdateInput, Prisma.RoleTemplateUncheckedUpdateInput>;
};
export type RoleTemplateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
    where: Prisma.RoleTemplateWhereUniqueInput;
};
export type RoleTemplateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoleTemplateWhereInput;
    limit?: number;
};
export type RoleTemplateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoleTemplateSelect<ExtArgs> | null;
    omit?: Prisma.RoleTemplateOmit<ExtArgs> | null;
};
