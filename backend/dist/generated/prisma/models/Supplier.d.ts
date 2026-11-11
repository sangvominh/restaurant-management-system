import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SupplierModel = runtime.Types.Result.DefaultSelection<Prisma.$SupplierPayload>;
export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null;
    _min: SupplierMinAggregateOutputType | null;
    _max: SupplierMaxAggregateOutputType | null;
};
export type SupplierMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    phone: string | null;
    address: string | null;
    status: string | null;
};
export type SupplierMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    phone: string | null;
    address: string | null;
    status: string | null;
};
export type SupplierCountAggregateOutputType = {
    id: number;
    code: number;
    name: number;
    phone: number;
    address: number;
    status: number;
    _all: number;
};
export type SupplierMinAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    phone?: true;
    address?: true;
    status?: true;
};
export type SupplierMaxAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    phone?: true;
    address?: true;
    status?: true;
};
export type SupplierCountAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    phone?: true;
    address?: true;
    status?: true;
    _all?: true;
};
export type SupplierAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SupplierWhereInput;
    orderBy?: Prisma.SupplierOrderByWithRelationInput | Prisma.SupplierOrderByWithRelationInput[];
    cursor?: Prisma.SupplierWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SupplierCountAggregateInputType;
    _min?: SupplierMinAggregateInputType;
    _max?: SupplierMaxAggregateInputType;
};
export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
    [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSupplier[P]> : Prisma.GetScalarType<T[P], AggregateSupplier[P]>;
};
export type SupplierGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SupplierWhereInput;
    orderBy?: Prisma.SupplierOrderByWithAggregationInput | Prisma.SupplierOrderByWithAggregationInput[];
    by: Prisma.SupplierScalarFieldEnum[] | Prisma.SupplierScalarFieldEnum;
    having?: Prisma.SupplierScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SupplierCountAggregateInputType | true;
    _min?: SupplierMinAggregateInputType;
    _max?: SupplierMaxAggregateInputType;
};
export type SupplierGroupByOutputType = {
    id: string;
    code: string;
    name: string;
    phone: string | null;
    address: string | null;
    status: string;
    _count: SupplierCountAggregateOutputType | null;
    _min: SupplierMinAggregateOutputType | null;
    _max: SupplierMaxAggregateOutputType | null;
};
export type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SupplierGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SupplierGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SupplierGroupByOutputType[P]>;
}>>;
export type SupplierWhereInput = {
    AND?: Prisma.SupplierWhereInput | Prisma.SupplierWhereInput[];
    OR?: Prisma.SupplierWhereInput[];
    NOT?: Prisma.SupplierWhereInput | Prisma.SupplierWhereInput[];
    id?: Prisma.UuidFilter<"Supplier"> | string;
    code?: Prisma.StringFilter<"Supplier"> | string;
    name?: Prisma.StringFilter<"Supplier"> | string;
    phone?: Prisma.StringNullableFilter<"Supplier"> | string | null;
    address?: Prisma.StringNullableFilter<"Supplier"> | string | null;
    status?: Prisma.StringFilter<"Supplier"> | string;
    productReceipts?: Prisma.ProductReceiptListRelationFilter;
    receipts?: Prisma.MaterialReceiptListRelationFilter;
};
export type SupplierOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    productReceipts?: Prisma.ProductReceiptOrderByRelationAggregateInput;
    receipts?: Prisma.MaterialReceiptOrderByRelationAggregateInput;
};
export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.SupplierWhereInput | Prisma.SupplierWhereInput[];
    OR?: Prisma.SupplierWhereInput[];
    NOT?: Prisma.SupplierWhereInput | Prisma.SupplierWhereInput[];
    name?: Prisma.StringFilter<"Supplier"> | string;
    phone?: Prisma.StringNullableFilter<"Supplier"> | string | null;
    address?: Prisma.StringNullableFilter<"Supplier"> | string | null;
    status?: Prisma.StringFilter<"Supplier"> | string;
    productReceipts?: Prisma.ProductReceiptListRelationFilter;
    receipts?: Prisma.MaterialReceiptListRelationFilter;
}, "id" | "code">;
export type SupplierOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    _count?: Prisma.SupplierCountOrderByAggregateInput;
    _max?: Prisma.SupplierMaxOrderByAggregateInput;
    _min?: Prisma.SupplierMinOrderByAggregateInput;
};
export type SupplierScalarWhereWithAggregatesInput = {
    AND?: Prisma.SupplierScalarWhereWithAggregatesInput | Prisma.SupplierScalarWhereWithAggregatesInput[];
    OR?: Prisma.SupplierScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SupplierScalarWhereWithAggregatesInput | Prisma.SupplierScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Supplier"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Supplier"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Supplier"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Supplier"> | string | null;
    address?: Prisma.StringNullableWithAggregatesFilter<"Supplier"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"Supplier"> | string;
};
export type SupplierCreateInput = {
    id?: string;
    code: string;
    name: string;
    phone?: string | null;
    address?: string | null;
    status?: string;
    productReceipts?: Prisma.ProductReceiptCreateNestedManyWithoutSupplierInput;
    receipts?: Prisma.MaterialReceiptCreateNestedManyWithoutSupplierInput;
};
export type SupplierUncheckedCreateInput = {
    id?: string;
    code: string;
    name: string;
    phone?: string | null;
    address?: string | null;
    status?: string;
    productReceipts?: Prisma.ProductReceiptUncheckedCreateNestedManyWithoutSupplierInput;
    receipts?: Prisma.MaterialReceiptUncheckedCreateNestedManyWithoutSupplierInput;
};
export type SupplierUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productReceipts?: Prisma.ProductReceiptUpdateManyWithoutSupplierNestedInput;
    receipts?: Prisma.MaterialReceiptUpdateManyWithoutSupplierNestedInput;
};
export type SupplierUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productReceipts?: Prisma.ProductReceiptUncheckedUpdateManyWithoutSupplierNestedInput;
    receipts?: Prisma.MaterialReceiptUncheckedUpdateManyWithoutSupplierNestedInput;
};
export type SupplierCreateManyInput = {
    id?: string;
    code: string;
    name: string;
    phone?: string | null;
    address?: string | null;
    status?: string;
};
export type SupplierUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SupplierUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SupplierCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type SupplierMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type SupplierMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type SupplierScalarRelationFilter = {
    is?: Prisma.SupplierWhereInput;
    isNot?: Prisma.SupplierWhereInput;
};
export type SupplierCreateNestedOneWithoutReceiptsInput = {
    create?: Prisma.XOR<Prisma.SupplierCreateWithoutReceiptsInput, Prisma.SupplierUncheckedCreateWithoutReceiptsInput>;
    connectOrCreate?: Prisma.SupplierCreateOrConnectWithoutReceiptsInput;
    connect?: Prisma.SupplierWhereUniqueInput;
};
export type SupplierUpdateOneRequiredWithoutReceiptsNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierCreateWithoutReceiptsInput, Prisma.SupplierUncheckedCreateWithoutReceiptsInput>;
    connectOrCreate?: Prisma.SupplierCreateOrConnectWithoutReceiptsInput;
    upsert?: Prisma.SupplierUpsertWithoutReceiptsInput;
    connect?: Prisma.SupplierWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SupplierUpdateToOneWithWhereWithoutReceiptsInput, Prisma.SupplierUpdateWithoutReceiptsInput>, Prisma.SupplierUncheckedUpdateWithoutReceiptsInput>;
};
export type SupplierCreateNestedOneWithoutProductReceiptsInput = {
    create?: Prisma.XOR<Prisma.SupplierCreateWithoutProductReceiptsInput, Prisma.SupplierUncheckedCreateWithoutProductReceiptsInput>;
    connectOrCreate?: Prisma.SupplierCreateOrConnectWithoutProductReceiptsInput;
    connect?: Prisma.SupplierWhereUniqueInput;
};
export type SupplierUpdateOneRequiredWithoutProductReceiptsNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierCreateWithoutProductReceiptsInput, Prisma.SupplierUncheckedCreateWithoutProductReceiptsInput>;
    connectOrCreate?: Prisma.SupplierCreateOrConnectWithoutProductReceiptsInput;
    upsert?: Prisma.SupplierUpsertWithoutProductReceiptsInput;
    connect?: Prisma.SupplierWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SupplierUpdateToOneWithWhereWithoutProductReceiptsInput, Prisma.SupplierUpdateWithoutProductReceiptsInput>, Prisma.SupplierUncheckedUpdateWithoutProductReceiptsInput>;
};
export type SupplierCreateWithoutReceiptsInput = {
    id?: string;
    code: string;
    name: string;
    phone?: string | null;
    address?: string | null;
    status?: string;
    productReceipts?: Prisma.ProductReceiptCreateNestedManyWithoutSupplierInput;
};
export type SupplierUncheckedCreateWithoutReceiptsInput = {
    id?: string;
    code: string;
    name: string;
    phone?: string | null;
    address?: string | null;
    status?: string;
    productReceipts?: Prisma.ProductReceiptUncheckedCreateNestedManyWithoutSupplierInput;
};
export type SupplierCreateOrConnectWithoutReceiptsInput = {
    where: Prisma.SupplierWhereUniqueInput;
    create: Prisma.XOR<Prisma.SupplierCreateWithoutReceiptsInput, Prisma.SupplierUncheckedCreateWithoutReceiptsInput>;
};
export type SupplierUpsertWithoutReceiptsInput = {
    update: Prisma.XOR<Prisma.SupplierUpdateWithoutReceiptsInput, Prisma.SupplierUncheckedUpdateWithoutReceiptsInput>;
    create: Prisma.XOR<Prisma.SupplierCreateWithoutReceiptsInput, Prisma.SupplierUncheckedCreateWithoutReceiptsInput>;
    where?: Prisma.SupplierWhereInput;
};
export type SupplierUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: Prisma.SupplierWhereInput;
    data: Prisma.XOR<Prisma.SupplierUpdateWithoutReceiptsInput, Prisma.SupplierUncheckedUpdateWithoutReceiptsInput>;
};
export type SupplierUpdateWithoutReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productReceipts?: Prisma.ProductReceiptUpdateManyWithoutSupplierNestedInput;
};
export type SupplierUncheckedUpdateWithoutReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productReceipts?: Prisma.ProductReceiptUncheckedUpdateManyWithoutSupplierNestedInput;
};
export type SupplierCreateWithoutProductReceiptsInput = {
    id?: string;
    code: string;
    name: string;
    phone?: string | null;
    address?: string | null;
    status?: string;
    receipts?: Prisma.MaterialReceiptCreateNestedManyWithoutSupplierInput;
};
export type SupplierUncheckedCreateWithoutProductReceiptsInput = {
    id?: string;
    code: string;
    name: string;
    phone?: string | null;
    address?: string | null;
    status?: string;
    receipts?: Prisma.MaterialReceiptUncheckedCreateNestedManyWithoutSupplierInput;
};
export type SupplierCreateOrConnectWithoutProductReceiptsInput = {
    where: Prisma.SupplierWhereUniqueInput;
    create: Prisma.XOR<Prisma.SupplierCreateWithoutProductReceiptsInput, Prisma.SupplierUncheckedCreateWithoutProductReceiptsInput>;
};
export type SupplierUpsertWithoutProductReceiptsInput = {
    update: Prisma.XOR<Prisma.SupplierUpdateWithoutProductReceiptsInput, Prisma.SupplierUncheckedUpdateWithoutProductReceiptsInput>;
    create: Prisma.XOR<Prisma.SupplierCreateWithoutProductReceiptsInput, Prisma.SupplierUncheckedCreateWithoutProductReceiptsInput>;
    where?: Prisma.SupplierWhereInput;
};
export type SupplierUpdateToOneWithWhereWithoutProductReceiptsInput = {
    where?: Prisma.SupplierWhereInput;
    data: Prisma.XOR<Prisma.SupplierUpdateWithoutProductReceiptsInput, Prisma.SupplierUncheckedUpdateWithoutProductReceiptsInput>;
};
export type SupplierUpdateWithoutProductReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    receipts?: Prisma.MaterialReceiptUpdateManyWithoutSupplierNestedInput;
};
export type SupplierUncheckedUpdateWithoutProductReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    receipts?: Prisma.MaterialReceiptUncheckedUpdateManyWithoutSupplierNestedInput;
};
export type SupplierCountOutputType = {
    productReceipts: number;
    receipts: number;
};
export type SupplierCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productReceipts?: boolean | SupplierCountOutputTypeCountProductReceiptsArgs;
    receipts?: boolean | SupplierCountOutputTypeCountReceiptsArgs;
};
export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierCountOutputTypeSelect<ExtArgs> | null;
};
export type SupplierCountOutputTypeCountProductReceiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReceiptWhereInput;
};
export type SupplierCountOutputTypeCountReceiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialReceiptWhereInput;
};
export type SupplierSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    phone?: boolean;
    address?: boolean;
    status?: boolean;
    productReceipts?: boolean | Prisma.Supplier$productReceiptsArgs<ExtArgs>;
    receipts?: boolean | Prisma.Supplier$receiptsArgs<ExtArgs>;
    _count?: boolean | Prisma.SupplierCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["supplier"]>;
export type SupplierSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    phone?: boolean;
    address?: boolean;
    status?: boolean;
}, ExtArgs["result"]["supplier"]>;
export type SupplierSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    phone?: boolean;
    address?: boolean;
    status?: boolean;
}, ExtArgs["result"]["supplier"]>;
export type SupplierSelectScalar = {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    phone?: boolean;
    address?: boolean;
    status?: boolean;
};
export type SupplierOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "name" | "phone" | "address" | "status", ExtArgs["result"]["supplier"]>;
export type SupplierInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productReceipts?: boolean | Prisma.Supplier$productReceiptsArgs<ExtArgs>;
    receipts?: boolean | Prisma.Supplier$receiptsArgs<ExtArgs>;
    _count?: boolean | Prisma.SupplierCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SupplierIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type SupplierIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $SupplierPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Supplier";
    objects: {
        productReceipts: Prisma.$ProductReceiptPayload<ExtArgs>[];
        receipts: Prisma.$MaterialReceiptPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        name: string;
        phone: string | null;
        address: string | null;
        status: string;
    }, ExtArgs["result"]["supplier"]>;
    composites: {};
};
export type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SupplierPayload, S>;
export type SupplierCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SupplierCountAggregateInputType | true;
};
export interface SupplierDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Supplier'];
        meta: {
            name: 'Supplier';
        };
    };
    findUnique<T extends SupplierFindUniqueArgs>(args: Prisma.SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SupplierFindFirstArgs>(args?: Prisma.SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SupplierFindManyArgs>(args?: Prisma.SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SupplierCreateArgs>(args: Prisma.SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SupplierCreateManyArgs>(args?: Prisma.SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SupplierCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SupplierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SupplierDeleteArgs>(args: Prisma.SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SupplierUpdateArgs>(args: Prisma.SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SupplierDeleteManyArgs>(args?: Prisma.SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SupplierUpdateManyArgs>(args: Prisma.SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SupplierUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SupplierUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SupplierUpsertArgs>(args: Prisma.SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SupplierCountArgs>(args?: Prisma.Subset<T, SupplierCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SupplierCountAggregateOutputType> : number>;
    aggregate<T extends SupplierAggregateArgs>(args: Prisma.Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>;
    groupBy<T extends SupplierGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SupplierGroupByArgs['orderBy'];
    } : {
        orderBy?: SupplierGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SupplierFieldRefs;
}
export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    productReceipts<T extends Prisma.Supplier$productReceiptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Supplier$productReceiptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    receipts<T extends Prisma.Supplier$receiptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Supplier$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SupplierFieldRefs {
    readonly id: Prisma.FieldRef<"Supplier", 'String'>;
    readonly code: Prisma.FieldRef<"Supplier", 'String'>;
    readonly name: Prisma.FieldRef<"Supplier", 'String'>;
    readonly phone: Prisma.FieldRef<"Supplier", 'String'>;
    readonly address: Prisma.FieldRef<"Supplier", 'String'>;
    readonly status: Prisma.FieldRef<"Supplier", 'String'>;
}
export type SupplierFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where: Prisma.SupplierWhereUniqueInput;
};
export type SupplierFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where: Prisma.SupplierWhereUniqueInput;
};
export type SupplierFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where?: Prisma.SupplierWhereInput;
    orderBy?: Prisma.SupplierOrderByWithRelationInput | Prisma.SupplierOrderByWithRelationInput[];
    cursor?: Prisma.SupplierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SupplierScalarFieldEnum | Prisma.SupplierScalarFieldEnum[];
};
export type SupplierFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where?: Prisma.SupplierWhereInput;
    orderBy?: Prisma.SupplierOrderByWithRelationInput | Prisma.SupplierOrderByWithRelationInput[];
    cursor?: Prisma.SupplierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SupplierScalarFieldEnum | Prisma.SupplierScalarFieldEnum[];
};
export type SupplierFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where?: Prisma.SupplierWhereInput;
    orderBy?: Prisma.SupplierOrderByWithRelationInput | Prisma.SupplierOrderByWithRelationInput[];
    cursor?: Prisma.SupplierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SupplierScalarFieldEnum | Prisma.SupplierScalarFieldEnum[];
};
export type SupplierCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SupplierCreateInput, Prisma.SupplierUncheckedCreateInput>;
};
export type SupplierCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SupplierCreateManyInput | Prisma.SupplierCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SupplierCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    data: Prisma.SupplierCreateManyInput | Prisma.SupplierCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SupplierUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SupplierUpdateInput, Prisma.SupplierUncheckedUpdateInput>;
    where: Prisma.SupplierWhereUniqueInput;
};
export type SupplierUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SupplierUpdateManyMutationInput, Prisma.SupplierUncheckedUpdateManyInput>;
    where?: Prisma.SupplierWhereInput;
    limit?: number;
};
export type SupplierUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SupplierUpdateManyMutationInput, Prisma.SupplierUncheckedUpdateManyInput>;
    where?: Prisma.SupplierWhereInput;
    limit?: number;
};
export type SupplierUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where: Prisma.SupplierWhereUniqueInput;
    create: Prisma.XOR<Prisma.SupplierCreateInput, Prisma.SupplierUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SupplierUpdateInput, Prisma.SupplierUncheckedUpdateInput>;
};
export type SupplierDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where: Prisma.SupplierWhereUniqueInput;
};
export type SupplierDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SupplierWhereInput;
    limit?: number;
};
export type Supplier$productReceiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ProductReceiptOmit<ExtArgs> | null;
    include?: Prisma.ProductReceiptInclude<ExtArgs> | null;
    where?: Prisma.ProductReceiptWhereInput;
    orderBy?: Prisma.ProductReceiptOrderByWithRelationInput | Prisma.ProductReceiptOrderByWithRelationInput[];
    cursor?: Prisma.ProductReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReceiptScalarFieldEnum | Prisma.ProductReceiptScalarFieldEnum[];
};
export type Supplier$receiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MaterialReceiptSelect<ExtArgs> | null;
    omit?: Prisma.MaterialReceiptOmit<ExtArgs> | null;
    include?: Prisma.MaterialReceiptInclude<ExtArgs> | null;
    where?: Prisma.MaterialReceiptWhereInput;
    orderBy?: Prisma.MaterialReceiptOrderByWithRelationInput | Prisma.MaterialReceiptOrderByWithRelationInput[];
    cursor?: Prisma.MaterialReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialReceiptScalarFieldEnum | Prisma.MaterialReceiptScalarFieldEnum[];
};
export type SupplierDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
};
