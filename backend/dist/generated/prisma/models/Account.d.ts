import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AccountModel = runtime.Types.Result.DefaultSelection<Prisma.$AccountPayload>;
export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
};
export type AccountMinAggregateOutputType = {
    id: string | null;
    username: string | null;
    passwordHash: string | null;
    status: string | null;
    createdAt: Date | null;
    roleId: string | null;
};
export type AccountMaxAggregateOutputType = {
    id: string | null;
    username: string | null;
    passwordHash: string | null;
    status: string | null;
    createdAt: Date | null;
    roleId: string | null;
};
export type AccountCountAggregateOutputType = {
    id: number;
    username: number;
    passwordHash: number;
    status: number;
    createdAt: number;
    roleId: number;
    _all: number;
};
export type AccountMinAggregateInputType = {
    id?: true;
    username?: true;
    passwordHash?: true;
    status?: true;
    createdAt?: true;
    roleId?: true;
};
export type AccountMaxAggregateInputType = {
    id?: true;
    username?: true;
    passwordHash?: true;
    status?: true;
    createdAt?: true;
    roleId?: true;
};
export type AccountCountAggregateInputType = {
    id?: true;
    username?: true;
    passwordHash?: true;
    status?: true;
    createdAt?: true;
    roleId?: true;
    _all?: true;
};
export type AccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AccountCountAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
};
export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAccount[P]> : Prisma.GetScalarType<T[P], AggregateAccount[P]>;
};
export type AccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithAggregationInput | Prisma.AccountOrderByWithAggregationInput[];
    by: Prisma.AccountScalarFieldEnum[] | Prisma.AccountScalarFieldEnum;
    having?: Prisma.AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
};
export type AccountGroupByOutputType = {
    id: string;
    username: string;
    passwordHash: string;
    status: string;
    createdAt: Date;
    roleId: string;
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
};
export type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AccountGroupByOutputType[P]>;
}>>;
export type AccountWhereInput = {
    AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    OR?: Prisma.AccountWhereInput[];
    NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    id?: Prisma.UuidFilter<"Account"> | string;
    username?: Prisma.StringFilter<"Account"> | string;
    passwordHash?: Prisma.StringFilter<"Account"> | string;
    status?: Prisma.StringFilter<"Account"> | string;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    roleId?: Prisma.UuidFilter<"Account"> | string;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    employee?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
};
export type AccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    role?: Prisma.RoleOrderByWithRelationInput;
    employee?: Prisma.EmployeeOrderByWithRelationInput;
};
export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    username?: string;
    AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    OR?: Prisma.AccountWhereInput[];
    NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    passwordHash?: Prisma.StringFilter<"Account"> | string;
    status?: Prisma.StringFilter<"Account"> | string;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    roleId?: Prisma.UuidFilter<"Account"> | string;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    employee?: Prisma.XOR<Prisma.EmployeeNullableScalarRelationFilter, Prisma.EmployeeWhereInput> | null;
}, "id" | "username">;
export type AccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    _count?: Prisma.AccountCountOrderByAggregateInput;
    _max?: Prisma.AccountMaxOrderByAggregateInput;
    _min?: Prisma.AccountMinOrderByAggregateInput;
};
export type AccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.AccountScalarWhereWithAggregatesInput | Prisma.AccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.AccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AccountScalarWhereWithAggregatesInput | Prisma.AccountScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Account"> | string;
    username?: Prisma.StringWithAggregatesFilter<"Account"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"Account"> | string;
    status?: Prisma.StringWithAggregatesFilter<"Account"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Account"> | Date | string;
    roleId?: Prisma.UuidWithAggregatesFilter<"Account"> | string;
};
export type AccountCreateInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutAccountsInput;
    employee?: Prisma.EmployeeCreateNestedOneWithoutAccountInput;
};
export type AccountUncheckedCreateInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
    roleId: string;
    employee?: Prisma.EmployeeUncheckedCreateNestedOneWithoutAccountInput;
};
export type AccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutAccountsNestedInput;
    employee?: Prisma.EmployeeUpdateOneWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    employee?: Prisma.EmployeeUncheckedUpdateOneWithoutAccountNestedInput;
};
export type AccountCreateManyInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
    roleId: string;
};
export type AccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AccountListRelationFilter = {
    every?: Prisma.AccountWhereInput;
    some?: Prisma.AccountWhereInput;
    none?: Prisma.AccountWhereInput;
};
export type AccountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type AccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type AccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type AccountNullableScalarRelationFilter = {
    is?: Prisma.AccountWhereInput | null;
    isNot?: Prisma.AccountWhereInput | null;
};
export type AccountCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutRoleInput, Prisma.AccountUncheckedCreateWithoutRoleInput> | Prisma.AccountCreateWithoutRoleInput[] | Prisma.AccountUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutRoleInput | Prisma.AccountCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.AccountCreateManyRoleInputEnvelope;
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
};
export type AccountUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutRoleInput, Prisma.AccountUncheckedCreateWithoutRoleInput> | Prisma.AccountCreateWithoutRoleInput[] | Prisma.AccountUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutRoleInput | Prisma.AccountCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.AccountCreateManyRoleInputEnvelope;
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
};
export type AccountUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutRoleInput, Prisma.AccountUncheckedCreateWithoutRoleInput> | Prisma.AccountCreateWithoutRoleInput[] | Prisma.AccountUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutRoleInput | Prisma.AccountCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.AccountUpsertWithWhereUniqueWithoutRoleInput | Prisma.AccountUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.AccountCreateManyRoleInputEnvelope;
    set?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    disconnect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    delete?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    update?: Prisma.AccountUpdateWithWhereUniqueWithoutRoleInput | Prisma.AccountUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.AccountUpdateManyWithWhereWithoutRoleInput | Prisma.AccountUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
};
export type AccountUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutRoleInput, Prisma.AccountUncheckedCreateWithoutRoleInput> | Prisma.AccountCreateWithoutRoleInput[] | Prisma.AccountUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutRoleInput | Prisma.AccountCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.AccountUpsertWithWhereUniqueWithoutRoleInput | Prisma.AccountUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.AccountCreateManyRoleInputEnvelope;
    set?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    disconnect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    delete?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    update?: Prisma.AccountUpdateWithWhereUniqueWithoutRoleInput | Prisma.AccountUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.AccountUpdateManyWithWhereWithoutRoleInput | Prisma.AccountUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
};
export type AccountCreateNestedOneWithoutEmployeeInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutEmployeeInput, Prisma.AccountUncheckedCreateWithoutEmployeeInput>;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutEmployeeInput;
    connect?: Prisma.AccountWhereUniqueInput;
};
export type AccountUpdateOneWithoutEmployeeNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutEmployeeInput, Prisma.AccountUncheckedCreateWithoutEmployeeInput>;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutEmployeeInput;
    upsert?: Prisma.AccountUpsertWithoutEmployeeInput;
    disconnect?: Prisma.AccountWhereInput | boolean;
    delete?: Prisma.AccountWhereInput | boolean;
    connect?: Prisma.AccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AccountUpdateToOneWithWhereWithoutEmployeeInput, Prisma.AccountUpdateWithoutEmployeeInput>, Prisma.AccountUncheckedUpdateWithoutEmployeeInput>;
};
export type AccountCreateWithoutRoleInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
    employee?: Prisma.EmployeeCreateNestedOneWithoutAccountInput;
};
export type AccountUncheckedCreateWithoutRoleInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
    employee?: Prisma.EmployeeUncheckedCreateNestedOneWithoutAccountInput;
};
export type AccountCreateOrConnectWithoutRoleInput = {
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateWithoutRoleInput, Prisma.AccountUncheckedCreateWithoutRoleInput>;
};
export type AccountCreateManyRoleInputEnvelope = {
    data: Prisma.AccountCreateManyRoleInput | Prisma.AccountCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type AccountUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.AccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.AccountUpdateWithoutRoleInput, Prisma.AccountUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.AccountCreateWithoutRoleInput, Prisma.AccountUncheckedCreateWithoutRoleInput>;
};
export type AccountUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.AccountUpdateWithoutRoleInput, Prisma.AccountUncheckedUpdateWithoutRoleInput>;
};
export type AccountUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.AccountScalarWhereInput;
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyWithoutRoleInput>;
};
export type AccountScalarWhereInput = {
    AND?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
    OR?: Prisma.AccountScalarWhereInput[];
    NOT?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
    id?: Prisma.UuidFilter<"Account"> | string;
    username?: Prisma.StringFilter<"Account"> | string;
    passwordHash?: Prisma.StringFilter<"Account"> | string;
    status?: Prisma.StringFilter<"Account"> | string;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    roleId?: Prisma.UuidFilter<"Account"> | string;
};
export type AccountCreateWithoutEmployeeInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutAccountsInput;
};
export type AccountUncheckedCreateWithoutEmployeeInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
    roleId: string;
};
export type AccountCreateOrConnectWithoutEmployeeInput = {
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateWithoutEmployeeInput, Prisma.AccountUncheckedCreateWithoutEmployeeInput>;
};
export type AccountUpsertWithoutEmployeeInput = {
    update: Prisma.XOR<Prisma.AccountUpdateWithoutEmployeeInput, Prisma.AccountUncheckedUpdateWithoutEmployeeInput>;
    create: Prisma.XOR<Prisma.AccountCreateWithoutEmployeeInput, Prisma.AccountUncheckedCreateWithoutEmployeeInput>;
    where?: Prisma.AccountWhereInput;
};
export type AccountUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: Prisma.AccountWhereInput;
    data: Prisma.XOR<Prisma.AccountUpdateWithoutEmployeeInput, Prisma.AccountUncheckedUpdateWithoutEmployeeInput>;
};
export type AccountUpdateWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutAccountsNestedInput;
};
export type AccountUncheckedUpdateWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AccountCreateManyRoleInput = {
    id?: string;
    username: string;
    passwordHash: string;
    status?: string;
    createdAt?: Date | string;
};
export type AccountUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    employee?: Prisma.EmployeeUpdateOneWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    employee?: Prisma.EmployeeUncheckedUpdateOneWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateManyWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roleId?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.Account$employeeArgs<ExtArgs>;
}, ExtArgs["result"]["account"]>;
export type AccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roleId?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["account"]>;
export type AccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roleId?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["account"]>;
export type AccountSelectScalar = {
    id?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roleId?: boolean;
};
export type AccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "username" | "passwordHash" | "status" | "createdAt" | "roleId", ExtArgs["result"]["account"]>;
export type AccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.Account$employeeArgs<ExtArgs>;
};
export type AccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
};
export type AccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
};
export type $AccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Account";
    objects: {
        role: Prisma.$RolePayload<ExtArgs>;
        employee: Prisma.$EmployeePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        username: string;
        passwordHash: string;
        status: string;
        createdAt: Date;
        roleId: string;
    }, ExtArgs["result"]["account"]>;
    composites: {};
};
export type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AccountPayload, S>;
export type AccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AccountCountAggregateInputType | true;
};
export interface AccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Account'];
        meta: {
            name: 'Account';
        };
    };
    findUnique<T extends AccountFindUniqueArgs>(args: Prisma.SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AccountFindFirstArgs>(args?: Prisma.SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AccountFindManyArgs>(args?: Prisma.SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AccountCreateArgs>(args: Prisma.SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AccountCreateManyArgs>(args?: Prisma.SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AccountDeleteArgs>(args: Prisma.SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AccountUpdateArgs>(args: Prisma.SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AccountUpdateManyArgs>(args: Prisma.SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AccountUpsertArgs>(args: Prisma.SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AccountCountArgs>(args?: Prisma.Subset<T, AccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AccountCountAggregateOutputType> : number>;
    aggregate<T extends AccountAggregateArgs>(args: Prisma.Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>;
    groupBy<T extends AccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AccountGroupByArgs['orderBy'];
    } : {
        orderBy?: AccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AccountFieldRefs;
}
export interface Prisma__AccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    role<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    employee<T extends Prisma.Account$employeeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Account$employeeArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AccountFieldRefs {
    readonly id: Prisma.FieldRef<"Account", 'String'>;
    readonly username: Prisma.FieldRef<"Account", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"Account", 'String'>;
    readonly status: Prisma.FieldRef<"Account", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Account", 'DateTime'>;
    readonly roleId: Prisma.FieldRef<"Account", 'String'>;
}
export type AccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[];
};
export type AccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[];
};
export type AccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[];
};
export type AccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountCreateInput, Prisma.AccountUncheckedCreateInput>;
};
export type AccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AccountCreateManyInput | Prisma.AccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    data: Prisma.AccountCreateManyInput | Prisma.AccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountUpdateInput, Prisma.AccountUncheckedUpdateInput>;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyInput>;
    where?: Prisma.AccountWhereInput;
    limit?: number;
};
export type AccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyInput>;
    where?: Prisma.AccountWhereInput;
    limit?: number;
    include?: Prisma.AccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateInput, Prisma.AccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AccountUpdateInput, Prisma.AccountUncheckedUpdateInput>;
};
export type AccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
    limit?: number;
};
export type Account$employeeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployeeSelect<ExtArgs> | null;
    omit?: Prisma.EmployeeOmit<ExtArgs> | null;
    include?: Prisma.EmployeeInclude<ExtArgs> | null;
    where?: Prisma.EmployeeWhereInput;
};
export type AccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
};
