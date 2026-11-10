import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly RoleTemplate: "RoleTemplate";
    readonly Role: "Role";
    readonly Permission: "Permission";
    readonly RolePermission: "RolePermission";
    readonly Account: "Account";
    readonly Employee: "Employee";
    readonly Unit: "Unit";
    readonly Category: "Category";
    readonly Material: "Material";
    readonly Product: "Product";
    readonly Supplier: "Supplier";
    readonly MaterialLot: "MaterialLot";
    readonly MaterialReceipt: "MaterialReceipt";
    readonly MaterialReceiptLine: "MaterialReceiptLine";
    readonly MaterialIssue: "MaterialIssue";
    readonly MaterialIssueLine: "MaterialIssueLine";
    readonly MaterialReturn: "MaterialReturn";
    readonly MaterialReturnLine: "MaterialReturnLine";
    readonly Waste: "Waste";
    readonly WasteLine: "WasteLine";
    readonly MaterialMovement: "MaterialMovement";
    readonly Bom: "Bom";
    readonly BomLine: "BomLine";
    readonly ProductionOrder: "ProductionOrder";
    readonly MaterialShortage: "MaterialShortage";
    readonly ProductionRun: "ProductionRun";
    readonly ConsumptionLine: "ConsumptionLine";
    readonly Sale: "Sale";
    readonly SaleLine: "SaleLine";
    readonly ProductExport: "ProductExport";
    readonly ProductExportLine: "ProductExportLine";
    readonly Payment: "Payment";
    readonly ProductMovement: "ProductMovement";
    readonly DiningTable: "DiningTable";
    readonly DiningArea: "DiningArea";
    readonly Serving: "Serving";
    readonly ReplenishmentRequest: "ReplenishmentRequest";
    readonly SaleLineChange: "SaleLineChange";
    readonly StoreDispatch: "StoreDispatch";
    readonly StoreDispatchLine: "StoreDispatchLine";
    readonly StoreAdjustment: "StoreAdjustment";
    readonly StoreMovement: "StoreMovement";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "roleTemplate" | "role" | "permission" | "rolePermission" | "account" | "employee" | "unit" | "category" | "material" | "product" | "supplier" | "materialLot" | "materialReceipt" | "materialReceiptLine" | "materialIssue" | "materialIssueLine" | "materialReturn" | "materialReturnLine" | "waste" | "wasteLine" | "materialMovement" | "bom" | "bomLine" | "productionOrder" | "materialShortage" | "productionRun" | "consumptionLine" | "sale" | "saleLine" | "productExport" | "productExportLine" | "payment" | "productMovement" | "diningTable" | "diningArea" | "serving" | "replenishmentRequest" | "saleLineChange" | "storeDispatch" | "storeDispatchLine" | "storeAdjustment" | "storeMovement";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        RoleTemplate: {
            payload: Prisma.$RoleTemplatePayload<ExtArgs>;
            fields: Prisma.RoleTemplateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoleTemplateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoleTemplateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>;
                };
                findFirst: {
                    args: Prisma.RoleTemplateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoleTemplateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>;
                };
                findMany: {
                    args: Prisma.RoleTemplateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>[];
                };
                create: {
                    args: Prisma.RoleTemplateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>;
                };
                createMany: {
                    args: Prisma.RoleTemplateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoleTemplateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>[];
                };
                delete: {
                    args: Prisma.RoleTemplateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>;
                };
                update: {
                    args: Prisma.RoleTemplateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>;
                };
                deleteMany: {
                    args: Prisma.RoleTemplateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoleTemplateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoleTemplateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>[];
                };
                upsert: {
                    args: Prisma.RoleTemplateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoleTemplatePayload>;
                };
                aggregate: {
                    args: Prisma.RoleTemplateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoleTemplate>;
                };
                groupBy: {
                    args: Prisma.RoleTemplateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleTemplateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoleTemplateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleTemplateCountAggregateOutputType> | number;
                };
            };
        };
        Role: {
            payload: Prisma.$RolePayload<ExtArgs>;
            fields: Prisma.RoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findFirst: {
                    args: Prisma.RoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findMany: {
                    args: Prisma.RoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                create: {
                    args: Prisma.RoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                createMany: {
                    args: Prisma.RoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                delete: {
                    args: Prisma.RoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                update: {
                    args: Prisma.RoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                deleteMany: {
                    args: Prisma.RoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                upsert: {
                    args: Prisma.RoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                aggregate: {
                    args: Prisma.RoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRole>;
                };
                groupBy: {
                    args: Prisma.RoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleCountAggregateOutputType> | number;
                };
            };
        };
        Permission: {
            payload: Prisma.$PermissionPayload<ExtArgs>;
            fields: Prisma.PermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findFirst: {
                    args: Prisma.PermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findMany: {
                    args: Prisma.PermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                create: {
                    args: Prisma.PermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                createMany: {
                    args: Prisma.PermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                delete: {
                    args: Prisma.PermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                update: {
                    args: Prisma.PermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.PermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                upsert: {
                    args: Prisma.PermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                aggregate: {
                    args: Prisma.PermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePermission>;
                };
                groupBy: {
                    args: Prisma.PermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionCountAggregateOutputType> | number;
                };
            };
        };
        RolePermission: {
            payload: Prisma.$RolePermissionPayload<ExtArgs>;
            fields: Prisma.RolePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.RolePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findMany: {
                    args: Prisma.RolePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                create: {
                    args: Prisma.RolePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                createMany: {
                    args: Prisma.RolePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                delete: {
                    args: Prisma.RolePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                update: {
                    args: Prisma.RolePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                upsert: {
                    args: Prisma.RolePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.RolePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRolePermission>;
                };
                groupBy: {
                    args: Prisma.RolePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RolePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionCountAggregateOutputType> | number;
                };
            };
        };
        Account: {
            payload: Prisma.$AccountPayload<ExtArgs>;
            fields: Prisma.AccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findFirst: {
                    args: Prisma.AccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findMany: {
                    args: Prisma.AccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                create: {
                    args: Prisma.AccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                createMany: {
                    args: Prisma.AccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                delete: {
                    args: Prisma.AccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                update: {
                    args: Prisma.AccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                deleteMany: {
                    args: Prisma.AccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                upsert: {
                    args: Prisma.AccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                aggregate: {
                    args: Prisma.AccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccount>;
                };
                groupBy: {
                    args: Prisma.AccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountCountAggregateOutputType> | number;
                };
            };
        };
        Employee: {
            payload: Prisma.$EmployeePayload<ExtArgs>;
            fields: Prisma.EmployeeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmployeeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                findFirst: {
                    args: Prisma.EmployeeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                findMany: {
                    args: Prisma.EmployeeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>[];
                };
                create: {
                    args: Prisma.EmployeeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                createMany: {
                    args: Prisma.EmployeeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>[];
                };
                delete: {
                    args: Prisma.EmployeeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                update: {
                    args: Prisma.EmployeeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                deleteMany: {
                    args: Prisma.EmployeeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmployeeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>[];
                };
                upsert: {
                    args: Prisma.EmployeeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                aggregate: {
                    args: Prisma.EmployeeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmployee>;
                };
                groupBy: {
                    args: Prisma.EmployeeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmployeeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmployeeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmployeeCountAggregateOutputType> | number;
                };
            };
        };
        Unit: {
            payload: Prisma.$UnitPayload<ExtArgs>;
            fields: Prisma.UnitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UnitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UnitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                findFirst: {
                    args: Prisma.UnitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UnitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                findMany: {
                    args: Prisma.UnitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>[];
                };
                create: {
                    args: Prisma.UnitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                createMany: {
                    args: Prisma.UnitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UnitCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>[];
                };
                delete: {
                    args: Prisma.UnitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                update: {
                    args: Prisma.UnitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                deleteMany: {
                    args: Prisma.UnitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UnitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UnitUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>[];
                };
                upsert: {
                    args: Prisma.UnitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                aggregate: {
                    args: Prisma.UnitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit>;
                };
                groupBy: {
                    args: Prisma.UnitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UnitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UnitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UnitCountAggregateOutputType> | number;
                };
            };
        };
        Category: {
            payload: Prisma.$CategoryPayload<ExtArgs>;
            fields: Prisma.CategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findFirst: {
                    args: Prisma.CategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findMany: {
                    args: Prisma.CategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                create: {
                    args: Prisma.CategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                createMany: {
                    args: Prisma.CategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                delete: {
                    args: Prisma.CategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                update: {
                    args: Prisma.CategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                upsert: {
                    args: Prisma.CategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                aggregate: {
                    args: Prisma.CategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategory>;
                };
                groupBy: {
                    args: Prisma.CategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryCountAggregateOutputType> | number;
                };
            };
        };
        Material: {
            payload: Prisma.$MaterialPayload<ExtArgs>;
            fields: Prisma.MaterialFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>;
                };
                findFirst: {
                    args: Prisma.MaterialFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>;
                };
                findMany: {
                    args: Prisma.MaterialFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>[];
                };
                create: {
                    args: Prisma.MaterialCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>;
                };
                createMany: {
                    args: Prisma.MaterialCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>[];
                };
                delete: {
                    args: Prisma.MaterialDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>;
                };
                update: {
                    args: Prisma.MaterialUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>[];
                };
                upsert: {
                    args: Prisma.MaterialUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialPayload>;
                };
                aggregate: {
                    args: Prisma.MaterialAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterial>;
                };
                groupBy: {
                    args: Prisma.MaterialGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        Supplier: {
            payload: Prisma.$SupplierPayload<ExtArgs>;
            fields: Prisma.SupplierFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplierFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                findFirst: {
                    args: Prisma.SupplierFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                findMany: {
                    args: Prisma.SupplierFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>[];
                };
                create: {
                    args: Prisma.SupplierCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                createMany: {
                    args: Prisma.SupplierCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SupplierCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>[];
                };
                delete: {
                    args: Prisma.SupplierDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                update: {
                    args: Prisma.SupplierUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                deleteMany: {
                    args: Prisma.SupplierDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplierUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SupplierUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>[];
                };
                upsert: {
                    args: Prisma.SupplierUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                aggregate: {
                    args: Prisma.SupplierAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplier>;
                };
                groupBy: {
                    args: Prisma.SupplierGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplierCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierCountAggregateOutputType> | number;
                };
            };
        };
        MaterialLot: {
            payload: Prisma.$MaterialLotPayload<ExtArgs>;
            fields: Prisma.MaterialLotFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialLotFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialLotFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>;
                };
                findFirst: {
                    args: Prisma.MaterialLotFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialLotFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>;
                };
                findMany: {
                    args: Prisma.MaterialLotFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>[];
                };
                create: {
                    args: Prisma.MaterialLotCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>;
                };
                createMany: {
                    args: Prisma.MaterialLotCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialLotCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>[];
                };
                delete: {
                    args: Prisma.MaterialLotDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>;
                };
                update: {
                    args: Prisma.MaterialLotUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialLotDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialLotUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialLotUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>[];
                };
                upsert: {
                    args: Prisma.MaterialLotUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialLotPayload>;
                };
                aggregate: {
                    args: Prisma.MaterialLotAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialLot>;
                };
                groupBy: {
                    args: Prisma.MaterialLotGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialLotGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialLotCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialLotCountAggregateOutputType> | number;
                };
            };
        };
        MaterialReceipt: {
            payload: Prisma.$MaterialReceiptPayload<ExtArgs>;
            fields: Prisma.MaterialReceiptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialReceiptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialReceiptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>;
                };
                findFirst: {
                    args: Prisma.MaterialReceiptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialReceiptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>;
                };
                findMany: {
                    args: Prisma.MaterialReceiptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>[];
                };
                create: {
                    args: Prisma.MaterialReceiptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>;
                };
                createMany: {
                    args: Prisma.MaterialReceiptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialReceiptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>[];
                };
                delete: {
                    args: Prisma.MaterialReceiptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>;
                };
                update: {
                    args: Prisma.MaterialReceiptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialReceiptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialReceiptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialReceiptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>[];
                };
                upsert: {
                    args: Prisma.MaterialReceiptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptPayload>;
                };
                aggregate: {
                    args: Prisma.MaterialReceiptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialReceipt>;
                };
                groupBy: {
                    args: Prisma.MaterialReceiptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReceiptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialReceiptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReceiptCountAggregateOutputType> | number;
                };
            };
        };
        MaterialReceiptLine: {
            payload: Prisma.$MaterialReceiptLinePayload<ExtArgs>;
            fields: Prisma.MaterialReceiptLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialReceiptLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialReceiptLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>;
                };
                findFirst: {
                    args: Prisma.MaterialReceiptLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialReceiptLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>;
                };
                findMany: {
                    args: Prisma.MaterialReceiptLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>[];
                };
                create: {
                    args: Prisma.MaterialReceiptLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>;
                };
                createMany: {
                    args: Prisma.MaterialReceiptLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialReceiptLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>[];
                };
                delete: {
                    args: Prisma.MaterialReceiptLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>;
                };
                update: {
                    args: Prisma.MaterialReceiptLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialReceiptLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialReceiptLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialReceiptLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>[];
                };
                upsert: {
                    args: Prisma.MaterialReceiptLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReceiptLinePayload>;
                };
                aggregate: {
                    args: Prisma.MaterialReceiptLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialReceiptLine>;
                };
                groupBy: {
                    args: Prisma.MaterialReceiptLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReceiptLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialReceiptLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReceiptLineCountAggregateOutputType> | number;
                };
            };
        };
        MaterialIssue: {
            payload: Prisma.$MaterialIssuePayload<ExtArgs>;
            fields: Prisma.MaterialIssueFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialIssueFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialIssueFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>;
                };
                findFirst: {
                    args: Prisma.MaterialIssueFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialIssueFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>;
                };
                findMany: {
                    args: Prisma.MaterialIssueFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>[];
                };
                create: {
                    args: Prisma.MaterialIssueCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>;
                };
                createMany: {
                    args: Prisma.MaterialIssueCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialIssueCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>[];
                };
                delete: {
                    args: Prisma.MaterialIssueDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>;
                };
                update: {
                    args: Prisma.MaterialIssueUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialIssueDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialIssueUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialIssueUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>[];
                };
                upsert: {
                    args: Prisma.MaterialIssueUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssuePayload>;
                };
                aggregate: {
                    args: Prisma.MaterialIssueAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialIssue>;
                };
                groupBy: {
                    args: Prisma.MaterialIssueGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialIssueGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialIssueCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialIssueCountAggregateOutputType> | number;
                };
            };
        };
        MaterialIssueLine: {
            payload: Prisma.$MaterialIssueLinePayload<ExtArgs>;
            fields: Prisma.MaterialIssueLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialIssueLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialIssueLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>;
                };
                findFirst: {
                    args: Prisma.MaterialIssueLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialIssueLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>;
                };
                findMany: {
                    args: Prisma.MaterialIssueLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>[];
                };
                create: {
                    args: Prisma.MaterialIssueLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>;
                };
                createMany: {
                    args: Prisma.MaterialIssueLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialIssueLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>[];
                };
                delete: {
                    args: Prisma.MaterialIssueLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>;
                };
                update: {
                    args: Prisma.MaterialIssueLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialIssueLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialIssueLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialIssueLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>[];
                };
                upsert: {
                    args: Prisma.MaterialIssueLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialIssueLinePayload>;
                };
                aggregate: {
                    args: Prisma.MaterialIssueLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialIssueLine>;
                };
                groupBy: {
                    args: Prisma.MaterialIssueLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialIssueLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialIssueLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialIssueLineCountAggregateOutputType> | number;
                };
            };
        };
        MaterialReturn: {
            payload: Prisma.$MaterialReturnPayload<ExtArgs>;
            fields: Prisma.MaterialReturnFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialReturnFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialReturnFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>;
                };
                findFirst: {
                    args: Prisma.MaterialReturnFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialReturnFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>;
                };
                findMany: {
                    args: Prisma.MaterialReturnFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>[];
                };
                create: {
                    args: Prisma.MaterialReturnCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>;
                };
                createMany: {
                    args: Prisma.MaterialReturnCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialReturnCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>[];
                };
                delete: {
                    args: Prisma.MaterialReturnDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>;
                };
                update: {
                    args: Prisma.MaterialReturnUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialReturnDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialReturnUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialReturnUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>[];
                };
                upsert: {
                    args: Prisma.MaterialReturnUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnPayload>;
                };
                aggregate: {
                    args: Prisma.MaterialReturnAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialReturn>;
                };
                groupBy: {
                    args: Prisma.MaterialReturnGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReturnGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialReturnCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReturnCountAggregateOutputType> | number;
                };
            };
        };
        MaterialReturnLine: {
            payload: Prisma.$MaterialReturnLinePayload<ExtArgs>;
            fields: Prisma.MaterialReturnLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialReturnLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialReturnLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>;
                };
                findFirst: {
                    args: Prisma.MaterialReturnLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialReturnLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>;
                };
                findMany: {
                    args: Prisma.MaterialReturnLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>[];
                };
                create: {
                    args: Prisma.MaterialReturnLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>;
                };
                createMany: {
                    args: Prisma.MaterialReturnLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialReturnLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>[];
                };
                delete: {
                    args: Prisma.MaterialReturnLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>;
                };
                update: {
                    args: Prisma.MaterialReturnLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialReturnLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialReturnLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialReturnLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>[];
                };
                upsert: {
                    args: Prisma.MaterialReturnLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialReturnLinePayload>;
                };
                aggregate: {
                    args: Prisma.MaterialReturnLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialReturnLine>;
                };
                groupBy: {
                    args: Prisma.MaterialReturnLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReturnLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialReturnLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialReturnLineCountAggregateOutputType> | number;
                };
            };
        };
        Waste: {
            payload: Prisma.$WastePayload<ExtArgs>;
            fields: Prisma.WasteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WasteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WasteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>;
                };
                findFirst: {
                    args: Prisma.WasteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WasteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>;
                };
                findMany: {
                    args: Prisma.WasteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>[];
                };
                create: {
                    args: Prisma.WasteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>;
                };
                createMany: {
                    args: Prisma.WasteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WasteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>[];
                };
                delete: {
                    args: Prisma.WasteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>;
                };
                update: {
                    args: Prisma.WasteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>;
                };
                deleteMany: {
                    args: Prisma.WasteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WasteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WasteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>[];
                };
                upsert: {
                    args: Prisma.WasteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WastePayload>;
                };
                aggregate: {
                    args: Prisma.WasteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWaste>;
                };
                groupBy: {
                    args: Prisma.WasteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WasteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WasteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WasteCountAggregateOutputType> | number;
                };
            };
        };
        WasteLine: {
            payload: Prisma.$WasteLinePayload<ExtArgs>;
            fields: Prisma.WasteLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WasteLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WasteLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>;
                };
                findFirst: {
                    args: Prisma.WasteLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WasteLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>;
                };
                findMany: {
                    args: Prisma.WasteLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>[];
                };
                create: {
                    args: Prisma.WasteLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>;
                };
                createMany: {
                    args: Prisma.WasteLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WasteLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>[];
                };
                delete: {
                    args: Prisma.WasteLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>;
                };
                update: {
                    args: Prisma.WasteLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>;
                };
                deleteMany: {
                    args: Prisma.WasteLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WasteLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WasteLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>[];
                };
                upsert: {
                    args: Prisma.WasteLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WasteLinePayload>;
                };
                aggregate: {
                    args: Prisma.WasteLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWasteLine>;
                };
                groupBy: {
                    args: Prisma.WasteLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WasteLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WasteLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WasteLineCountAggregateOutputType> | number;
                };
            };
        };
        MaterialMovement: {
            payload: Prisma.$MaterialMovementPayload<ExtArgs>;
            fields: Prisma.MaterialMovementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialMovementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialMovementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>;
                };
                findFirst: {
                    args: Prisma.MaterialMovementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialMovementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>;
                };
                findMany: {
                    args: Prisma.MaterialMovementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>[];
                };
                create: {
                    args: Prisma.MaterialMovementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>;
                };
                createMany: {
                    args: Prisma.MaterialMovementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialMovementCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>[];
                };
                delete: {
                    args: Prisma.MaterialMovementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>;
                };
                update: {
                    args: Prisma.MaterialMovementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialMovementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialMovementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialMovementUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>[];
                };
                upsert: {
                    args: Prisma.MaterialMovementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialMovementPayload>;
                };
                aggregate: {
                    args: Prisma.MaterialMovementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialMovement>;
                };
                groupBy: {
                    args: Prisma.MaterialMovementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialMovementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialMovementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialMovementCountAggregateOutputType> | number;
                };
            };
        };
        Bom: {
            payload: Prisma.$BomPayload<ExtArgs>;
            fields: Prisma.BomFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BomFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BomFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>;
                };
                findFirst: {
                    args: Prisma.BomFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BomFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>;
                };
                findMany: {
                    args: Prisma.BomFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>[];
                };
                create: {
                    args: Prisma.BomCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>;
                };
                createMany: {
                    args: Prisma.BomCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BomCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>[];
                };
                delete: {
                    args: Prisma.BomDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>;
                };
                update: {
                    args: Prisma.BomUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>;
                };
                deleteMany: {
                    args: Prisma.BomDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BomUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BomUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>[];
                };
                upsert: {
                    args: Prisma.BomUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomPayload>;
                };
                aggregate: {
                    args: Prisma.BomAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBom>;
                };
                groupBy: {
                    args: Prisma.BomGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BomGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BomCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BomCountAggregateOutputType> | number;
                };
            };
        };
        BomLine: {
            payload: Prisma.$BomLinePayload<ExtArgs>;
            fields: Prisma.BomLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BomLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BomLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>;
                };
                findFirst: {
                    args: Prisma.BomLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BomLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>;
                };
                findMany: {
                    args: Prisma.BomLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>[];
                };
                create: {
                    args: Prisma.BomLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>;
                };
                createMany: {
                    args: Prisma.BomLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BomLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>[];
                };
                delete: {
                    args: Prisma.BomLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>;
                };
                update: {
                    args: Prisma.BomLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>;
                };
                deleteMany: {
                    args: Prisma.BomLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BomLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BomLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>[];
                };
                upsert: {
                    args: Prisma.BomLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BomLinePayload>;
                };
                aggregate: {
                    args: Prisma.BomLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBomLine>;
                };
                groupBy: {
                    args: Prisma.BomLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BomLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BomLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BomLineCountAggregateOutputType> | number;
                };
            };
        };
        ProductionOrder: {
            payload: Prisma.$ProductionOrderPayload<ExtArgs>;
            fields: Prisma.ProductionOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductionOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductionOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>;
                };
                findFirst: {
                    args: Prisma.ProductionOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductionOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>;
                };
                findMany: {
                    args: Prisma.ProductionOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>[];
                };
                create: {
                    args: Prisma.ProductionOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>;
                };
                createMany: {
                    args: Prisma.ProductionOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductionOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>[];
                };
                delete: {
                    args: Prisma.ProductionOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>;
                };
                update: {
                    args: Prisma.ProductionOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductionOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductionOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductionOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>[];
                };
                upsert: {
                    args: Prisma.ProductionOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionOrderPayload>;
                };
                aggregate: {
                    args: Prisma.ProductionOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductionOrder>;
                };
                groupBy: {
                    args: Prisma.ProductionOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductionOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionOrderCountAggregateOutputType> | number;
                };
            };
        };
        MaterialShortage: {
            payload: Prisma.$MaterialShortagePayload<ExtArgs>;
            fields: Prisma.MaterialShortageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaterialShortageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaterialShortageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>;
                };
                findFirst: {
                    args: Prisma.MaterialShortageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaterialShortageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>;
                };
                findMany: {
                    args: Prisma.MaterialShortageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>[];
                };
                create: {
                    args: Prisma.MaterialShortageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>;
                };
                createMany: {
                    args: Prisma.MaterialShortageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaterialShortageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>[];
                };
                delete: {
                    args: Prisma.MaterialShortageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>;
                };
                update: {
                    args: Prisma.MaterialShortageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>;
                };
                deleteMany: {
                    args: Prisma.MaterialShortageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaterialShortageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaterialShortageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>[];
                };
                upsert: {
                    args: Prisma.MaterialShortageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaterialShortagePayload>;
                };
                aggregate: {
                    args: Prisma.MaterialShortageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaterialShortage>;
                };
                groupBy: {
                    args: Prisma.MaterialShortageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialShortageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaterialShortageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaterialShortageCountAggregateOutputType> | number;
                };
            };
        };
        ProductionRun: {
            payload: Prisma.$ProductionRunPayload<ExtArgs>;
            fields: Prisma.ProductionRunFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductionRunFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductionRunFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>;
                };
                findFirst: {
                    args: Prisma.ProductionRunFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductionRunFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>;
                };
                findMany: {
                    args: Prisma.ProductionRunFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>[];
                };
                create: {
                    args: Prisma.ProductionRunCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>;
                };
                createMany: {
                    args: Prisma.ProductionRunCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductionRunCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>[];
                };
                delete: {
                    args: Prisma.ProductionRunDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>;
                };
                update: {
                    args: Prisma.ProductionRunUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductionRunDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductionRunUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductionRunUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>[];
                };
                upsert: {
                    args: Prisma.ProductionRunUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionRunPayload>;
                };
                aggregate: {
                    args: Prisma.ProductionRunAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductionRun>;
                };
                groupBy: {
                    args: Prisma.ProductionRunGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionRunGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductionRunCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionRunCountAggregateOutputType> | number;
                };
            };
        };
        ConsumptionLine: {
            payload: Prisma.$ConsumptionLinePayload<ExtArgs>;
            fields: Prisma.ConsumptionLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConsumptionLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConsumptionLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>;
                };
                findFirst: {
                    args: Prisma.ConsumptionLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConsumptionLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>;
                };
                findMany: {
                    args: Prisma.ConsumptionLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>[];
                };
                create: {
                    args: Prisma.ConsumptionLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>;
                };
                createMany: {
                    args: Prisma.ConsumptionLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConsumptionLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>[];
                };
                delete: {
                    args: Prisma.ConsumptionLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>;
                };
                update: {
                    args: Prisma.ConsumptionLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>;
                };
                deleteMany: {
                    args: Prisma.ConsumptionLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConsumptionLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConsumptionLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>[];
                };
                upsert: {
                    args: Prisma.ConsumptionLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsumptionLinePayload>;
                };
                aggregate: {
                    args: Prisma.ConsumptionLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConsumptionLine>;
                };
                groupBy: {
                    args: Prisma.ConsumptionLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsumptionLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConsumptionLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsumptionLineCountAggregateOutputType> | number;
                };
            };
        };
        Sale: {
            payload: Prisma.$SalePayload<ExtArgs>;
            fields: Prisma.SaleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SaleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                findFirst: {
                    args: Prisma.SaleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                findMany: {
                    args: Prisma.SaleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>[];
                };
                create: {
                    args: Prisma.SaleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                createMany: {
                    args: Prisma.SaleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>[];
                };
                delete: {
                    args: Prisma.SaleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                update: {
                    args: Prisma.SaleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                deleteMany: {
                    args: Prisma.SaleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SaleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SaleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>[];
                };
                upsert: {
                    args: Prisma.SaleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                aggregate: {
                    args: Prisma.SaleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSale>;
                };
                groupBy: {
                    args: Prisma.SaleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SaleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleCountAggregateOutputType> | number;
                };
            };
        };
        SaleLine: {
            payload: Prisma.$SaleLinePayload<ExtArgs>;
            fields: Prisma.SaleLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SaleLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SaleLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>;
                };
                findFirst: {
                    args: Prisma.SaleLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SaleLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>;
                };
                findMany: {
                    args: Prisma.SaleLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>[];
                };
                create: {
                    args: Prisma.SaleLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>;
                };
                createMany: {
                    args: Prisma.SaleLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SaleLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>[];
                };
                delete: {
                    args: Prisma.SaleLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>;
                };
                update: {
                    args: Prisma.SaleLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>;
                };
                deleteMany: {
                    args: Prisma.SaleLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SaleLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SaleLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>[];
                };
                upsert: {
                    args: Prisma.SaleLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLinePayload>;
                };
                aggregate: {
                    args: Prisma.SaleLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSaleLine>;
                };
                groupBy: {
                    args: Prisma.SaleLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SaleLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleLineCountAggregateOutputType> | number;
                };
            };
        };
        ProductExport: {
            payload: Prisma.$ProductExportPayload<ExtArgs>;
            fields: Prisma.ProductExportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductExportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductExportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>;
                };
                findFirst: {
                    args: Prisma.ProductExportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductExportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>;
                };
                findMany: {
                    args: Prisma.ProductExportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>[];
                };
                create: {
                    args: Prisma.ProductExportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>;
                };
                createMany: {
                    args: Prisma.ProductExportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductExportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>[];
                };
                delete: {
                    args: Prisma.ProductExportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>;
                };
                update: {
                    args: Prisma.ProductExportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductExportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductExportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductExportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>[];
                };
                upsert: {
                    args: Prisma.ProductExportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportPayload>;
                };
                aggregate: {
                    args: Prisma.ProductExportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductExport>;
                };
                groupBy: {
                    args: Prisma.ProductExportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductExportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductExportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductExportCountAggregateOutputType> | number;
                };
            };
        };
        ProductExportLine: {
            payload: Prisma.$ProductExportLinePayload<ExtArgs>;
            fields: Prisma.ProductExportLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductExportLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductExportLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>;
                };
                findFirst: {
                    args: Prisma.ProductExportLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductExportLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>;
                };
                findMany: {
                    args: Prisma.ProductExportLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>[];
                };
                create: {
                    args: Prisma.ProductExportLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>;
                };
                createMany: {
                    args: Prisma.ProductExportLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductExportLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>[];
                };
                delete: {
                    args: Prisma.ProductExportLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>;
                };
                update: {
                    args: Prisma.ProductExportLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>;
                };
                deleteMany: {
                    args: Prisma.ProductExportLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductExportLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductExportLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>[];
                };
                upsert: {
                    args: Prisma.ProductExportLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductExportLinePayload>;
                };
                aggregate: {
                    args: Prisma.ProductExportLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductExportLine>;
                };
                groupBy: {
                    args: Prisma.ProductExportLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductExportLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductExportLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductExportLineCountAggregateOutputType> | number;
                };
            };
        };
        Payment: {
            payload: Prisma.$PaymentPayload<ExtArgs>;
            fields: Prisma.PaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findMany: {
                    args: Prisma.PaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                create: {
                    args: Prisma.PaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                createMany: {
                    args: Prisma.PaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                delete: {
                    args: Prisma.PaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                update: {
                    args: Prisma.PaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePayment>;
                };
                groupBy: {
                    args: Prisma.PaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentCountAggregateOutputType> | number;
                };
            };
        };
        ProductMovement: {
            payload: Prisma.$ProductMovementPayload<ExtArgs>;
            fields: Prisma.ProductMovementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductMovementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductMovementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>;
                };
                findFirst: {
                    args: Prisma.ProductMovementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductMovementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>;
                };
                findMany: {
                    args: Prisma.ProductMovementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>[];
                };
                create: {
                    args: Prisma.ProductMovementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>;
                };
                createMany: {
                    args: Prisma.ProductMovementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductMovementCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>[];
                };
                delete: {
                    args: Prisma.ProductMovementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>;
                };
                update: {
                    args: Prisma.ProductMovementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductMovementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductMovementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductMovementUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>[];
                };
                upsert: {
                    args: Prisma.ProductMovementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductMovementPayload>;
                };
                aggregate: {
                    args: Prisma.ProductMovementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductMovement>;
                };
                groupBy: {
                    args: Prisma.ProductMovementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductMovementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductMovementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductMovementCountAggregateOutputType> | number;
                };
            };
        };
        DiningTable: {
            payload: Prisma.$DiningTablePayload<ExtArgs>;
            fields: Prisma.DiningTableFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiningTableFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiningTableFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>;
                };
                findFirst: {
                    args: Prisma.DiningTableFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiningTableFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>;
                };
                findMany: {
                    args: Prisma.DiningTableFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>[];
                };
                create: {
                    args: Prisma.DiningTableCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>;
                };
                createMany: {
                    args: Prisma.DiningTableCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiningTableCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>[];
                };
                delete: {
                    args: Prisma.DiningTableDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>;
                };
                update: {
                    args: Prisma.DiningTableUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>;
                };
                deleteMany: {
                    args: Prisma.DiningTableDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiningTableUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiningTableUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>[];
                };
                upsert: {
                    args: Prisma.DiningTableUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningTablePayload>;
                };
                aggregate: {
                    args: Prisma.DiningTableAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiningTable>;
                };
                groupBy: {
                    args: Prisma.DiningTableGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiningTableGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiningTableCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiningTableCountAggregateOutputType> | number;
                };
            };
        };
        DiningArea: {
            payload: Prisma.$DiningAreaPayload<ExtArgs>;
            fields: Prisma.DiningAreaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiningAreaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiningAreaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>;
                };
                findFirst: {
                    args: Prisma.DiningAreaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiningAreaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>;
                };
                findMany: {
                    args: Prisma.DiningAreaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>[];
                };
                create: {
                    args: Prisma.DiningAreaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>;
                };
                createMany: {
                    args: Prisma.DiningAreaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiningAreaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>[];
                };
                delete: {
                    args: Prisma.DiningAreaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>;
                };
                update: {
                    args: Prisma.DiningAreaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>;
                };
                deleteMany: {
                    args: Prisma.DiningAreaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiningAreaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiningAreaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>[];
                };
                upsert: {
                    args: Prisma.DiningAreaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiningAreaPayload>;
                };
                aggregate: {
                    args: Prisma.DiningAreaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiningArea>;
                };
                groupBy: {
                    args: Prisma.DiningAreaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiningAreaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiningAreaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiningAreaCountAggregateOutputType> | number;
                };
            };
        };
        Serving: {
            payload: Prisma.$ServingPayload<ExtArgs>;
            fields: Prisma.ServingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ServingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ServingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>;
                };
                findFirst: {
                    args: Prisma.ServingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ServingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>;
                };
                findMany: {
                    args: Prisma.ServingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>[];
                };
                create: {
                    args: Prisma.ServingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>;
                };
                createMany: {
                    args: Prisma.ServingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ServingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>[];
                };
                delete: {
                    args: Prisma.ServingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>;
                };
                update: {
                    args: Prisma.ServingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>;
                };
                deleteMany: {
                    args: Prisma.ServingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ServingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ServingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>[];
                };
                upsert: {
                    args: Prisma.ServingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServingPayload>;
                };
                aggregate: {
                    args: Prisma.ServingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateServing>;
                };
                groupBy: {
                    args: Prisma.ServingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ServingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServingCountAggregateOutputType> | number;
                };
            };
        };
        ReplenishmentRequest: {
            payload: Prisma.$ReplenishmentRequestPayload<ExtArgs>;
            fields: Prisma.ReplenishmentRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReplenishmentRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReplenishmentRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>;
                };
                findFirst: {
                    args: Prisma.ReplenishmentRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReplenishmentRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>;
                };
                findMany: {
                    args: Prisma.ReplenishmentRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>[];
                };
                create: {
                    args: Prisma.ReplenishmentRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>;
                };
                createMany: {
                    args: Prisma.ReplenishmentRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReplenishmentRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>[];
                };
                delete: {
                    args: Prisma.ReplenishmentRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>;
                };
                update: {
                    args: Prisma.ReplenishmentRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.ReplenishmentRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReplenishmentRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReplenishmentRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>[];
                };
                upsert: {
                    args: Prisma.ReplenishmentRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReplenishmentRequestPayload>;
                };
                aggregate: {
                    args: Prisma.ReplenishmentRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReplenishmentRequest>;
                };
                groupBy: {
                    args: Prisma.ReplenishmentRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReplenishmentRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReplenishmentRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReplenishmentRequestCountAggregateOutputType> | number;
                };
            };
        };
        SaleLineChange: {
            payload: Prisma.$SaleLineChangePayload<ExtArgs>;
            fields: Prisma.SaleLineChangeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SaleLineChangeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SaleLineChangeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>;
                };
                findFirst: {
                    args: Prisma.SaleLineChangeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SaleLineChangeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>;
                };
                findMany: {
                    args: Prisma.SaleLineChangeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>[];
                };
                create: {
                    args: Prisma.SaleLineChangeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>;
                };
                createMany: {
                    args: Prisma.SaleLineChangeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SaleLineChangeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>[];
                };
                delete: {
                    args: Prisma.SaleLineChangeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>;
                };
                update: {
                    args: Prisma.SaleLineChangeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>;
                };
                deleteMany: {
                    args: Prisma.SaleLineChangeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SaleLineChangeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SaleLineChangeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>[];
                };
                upsert: {
                    args: Prisma.SaleLineChangeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleLineChangePayload>;
                };
                aggregate: {
                    args: Prisma.SaleLineChangeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSaleLineChange>;
                };
                groupBy: {
                    args: Prisma.SaleLineChangeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleLineChangeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SaleLineChangeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleLineChangeCountAggregateOutputType> | number;
                };
            };
        };
        StoreDispatch: {
            payload: Prisma.$StoreDispatchPayload<ExtArgs>;
            fields: Prisma.StoreDispatchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StoreDispatchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StoreDispatchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>;
                };
                findFirst: {
                    args: Prisma.StoreDispatchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StoreDispatchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>;
                };
                findMany: {
                    args: Prisma.StoreDispatchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>[];
                };
                create: {
                    args: Prisma.StoreDispatchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>;
                };
                createMany: {
                    args: Prisma.StoreDispatchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StoreDispatchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>[];
                };
                delete: {
                    args: Prisma.StoreDispatchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>;
                };
                update: {
                    args: Prisma.StoreDispatchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>;
                };
                deleteMany: {
                    args: Prisma.StoreDispatchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StoreDispatchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StoreDispatchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>[];
                };
                upsert: {
                    args: Prisma.StoreDispatchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchPayload>;
                };
                aggregate: {
                    args: Prisma.StoreDispatchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStoreDispatch>;
                };
                groupBy: {
                    args: Prisma.StoreDispatchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreDispatchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StoreDispatchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreDispatchCountAggregateOutputType> | number;
                };
            };
        };
        StoreDispatchLine: {
            payload: Prisma.$StoreDispatchLinePayload<ExtArgs>;
            fields: Prisma.StoreDispatchLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StoreDispatchLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StoreDispatchLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>;
                };
                findFirst: {
                    args: Prisma.StoreDispatchLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StoreDispatchLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>;
                };
                findMany: {
                    args: Prisma.StoreDispatchLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>[];
                };
                create: {
                    args: Prisma.StoreDispatchLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>;
                };
                createMany: {
                    args: Prisma.StoreDispatchLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StoreDispatchLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>[];
                };
                delete: {
                    args: Prisma.StoreDispatchLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>;
                };
                update: {
                    args: Prisma.StoreDispatchLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>;
                };
                deleteMany: {
                    args: Prisma.StoreDispatchLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StoreDispatchLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StoreDispatchLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>[];
                };
                upsert: {
                    args: Prisma.StoreDispatchLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreDispatchLinePayload>;
                };
                aggregate: {
                    args: Prisma.StoreDispatchLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStoreDispatchLine>;
                };
                groupBy: {
                    args: Prisma.StoreDispatchLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreDispatchLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StoreDispatchLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreDispatchLineCountAggregateOutputType> | number;
                };
            };
        };
        StoreAdjustment: {
            payload: Prisma.$StoreAdjustmentPayload<ExtArgs>;
            fields: Prisma.StoreAdjustmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StoreAdjustmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StoreAdjustmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>;
                };
                findFirst: {
                    args: Prisma.StoreAdjustmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StoreAdjustmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>;
                };
                findMany: {
                    args: Prisma.StoreAdjustmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>[];
                };
                create: {
                    args: Prisma.StoreAdjustmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>;
                };
                createMany: {
                    args: Prisma.StoreAdjustmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StoreAdjustmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>[];
                };
                delete: {
                    args: Prisma.StoreAdjustmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>;
                };
                update: {
                    args: Prisma.StoreAdjustmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>;
                };
                deleteMany: {
                    args: Prisma.StoreAdjustmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StoreAdjustmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StoreAdjustmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>[];
                };
                upsert: {
                    args: Prisma.StoreAdjustmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreAdjustmentPayload>;
                };
                aggregate: {
                    args: Prisma.StoreAdjustmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStoreAdjustment>;
                };
                groupBy: {
                    args: Prisma.StoreAdjustmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreAdjustmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StoreAdjustmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreAdjustmentCountAggregateOutputType> | number;
                };
            };
        };
        StoreMovement: {
            payload: Prisma.$StoreMovementPayload<ExtArgs>;
            fields: Prisma.StoreMovementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StoreMovementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StoreMovementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>;
                };
                findFirst: {
                    args: Prisma.StoreMovementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StoreMovementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>;
                };
                findMany: {
                    args: Prisma.StoreMovementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>[];
                };
                create: {
                    args: Prisma.StoreMovementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>;
                };
                createMany: {
                    args: Prisma.StoreMovementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StoreMovementCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>[];
                };
                delete: {
                    args: Prisma.StoreMovementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>;
                };
                update: {
                    args: Prisma.StoreMovementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>;
                };
                deleteMany: {
                    args: Prisma.StoreMovementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StoreMovementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StoreMovementUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>[];
                };
                upsert: {
                    args: Prisma.StoreMovementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StoreMovementPayload>;
                };
                aggregate: {
                    args: Prisma.StoreMovementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStoreMovement>;
                };
                groupBy: {
                    args: Prisma.StoreMovementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreMovementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StoreMovementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StoreMovementCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const RoleTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly workspace: "workspace";
    readonly description: "description";
    readonly permissions: "permissions";
    readonly updatedAt: "updatedAt";
};
export type RoleTemplateScalarFieldEnum = (typeof RoleTemplateScalarFieldEnum)[keyof typeof RoleTemplateScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const RolePermissionScalarFieldEnum: {
    readonly roleId: "roleId";
    readonly permissionId: "permissionId";
};
export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly passwordHash: "passwordHash";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly roleId: "roleId";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const EmployeeScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly phone: "phone";
    readonly email: "email";
    readonly status: "status";
    readonly accountId: "accountId";
};
export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum];
export declare const UnitScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly symbol: "symbol";
};
export type UnitScalarFieldEnum = (typeof UnitScalarFieldEnum)[keyof typeof UnitScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly objectType: "objectType";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const MaterialScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly minStock: "minStock";
    readonly status: "status";
    readonly unitId: "unitId";
    readonly categoryId: "categoryId";
};
export type MaterialScalarFieldEnum = (typeof MaterialScalarFieldEnum)[keyof typeof MaterialScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly sellingPrice: "sellingPrice";
    readonly status: "status";
    readonly unitId: "unitId";
    readonly categoryId: "categoryId";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const SupplierScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly phone: "phone";
    readonly address: "address";
    readonly status: "status";
};
export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum];
export declare const MaterialLotScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly expiryDate: "expiryDate";
    readonly materialId: "materialId";
};
export type MaterialLotScalarFieldEnum = (typeof MaterialLotScalarFieldEnum)[keyof typeof MaterialLotScalarFieldEnum];
export declare const MaterialReceiptScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly receivedAt: "receivedAt";
    readonly status: "status";
    readonly note: "note";
    readonly supplierId: "supplierId";
    readonly createdById: "createdById";
};
export type MaterialReceiptScalarFieldEnum = (typeof MaterialReceiptScalarFieldEnum)[keyof typeof MaterialReceiptScalarFieldEnum];
export declare const MaterialReceiptLineScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly receiptId: "receiptId";
    readonly lotId: "lotId";
};
export type MaterialReceiptLineScalarFieldEnum = (typeof MaterialReceiptLineScalarFieldEnum)[keyof typeof MaterialReceiptLineScalarFieldEnum];
export declare const MaterialIssueScalarFieldEnum: {
    readonly id: "id";
    readonly requestedAt: "requestedAt";
    readonly approvedAt: "approvedAt";
    readonly status: "status";
    readonly reason: "reason";
    readonly reviewNote: "reviewNote";
    readonly productionOrderId: "productionOrderId";
    readonly requestedById: "requestedById";
    readonly reviewedById: "reviewedById";
};
export type MaterialIssueScalarFieldEnum = (typeof MaterialIssueScalarFieldEnum)[keyof typeof MaterialIssueScalarFieldEnum];
export declare const MaterialIssueLineScalarFieldEnum: {
    readonly id: "id";
    readonly requestedQuantity: "requestedQuantity";
    readonly issuedQuantity: "issuedQuantity";
    readonly issueId: "issueId";
    readonly lotId: "lotId";
};
export type MaterialIssueLineScalarFieldEnum = (typeof MaterialIssueLineScalarFieldEnum)[keyof typeof MaterialIssueLineScalarFieldEnum];
export declare const MaterialReturnScalarFieldEnum: {
    readonly id: "id";
    readonly requestedAt: "requestedAt";
    readonly approvedAt: "approvedAt";
    readonly status: "status";
    readonly reason: "reason";
    readonly requestedById: "requestedById";
    readonly reviewedById: "reviewedById";
};
export type MaterialReturnScalarFieldEnum = (typeof MaterialReturnScalarFieldEnum)[keyof typeof MaterialReturnScalarFieldEnum];
export declare const MaterialReturnLineScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly returnId: "returnId";
    readonly issueLineId: "issueLineId";
};
export type MaterialReturnLineScalarFieldEnum = (typeof MaterialReturnLineScalarFieldEnum)[keyof typeof MaterialReturnLineScalarFieldEnum];
export declare const WasteScalarFieldEnum: {
    readonly id: "id";
    readonly reportedAt: "reportedAt";
    readonly approvedAt: "approvedAt";
    readonly reason: "reason";
    readonly status: "status";
    readonly reportedById: "reportedById";
    readonly reviewedById: "reviewedById";
};
export type WasteScalarFieldEnum = (typeof WasteScalarFieldEnum)[keyof typeof WasteScalarFieldEnum];
export declare const WasteLineScalarFieldEnum: {
    readonly id: "id";
    readonly sourceType: "sourceType";
    readonly quantity: "quantity";
    readonly note: "note";
    readonly wasteId: "wasteId";
    readonly lotId: "lotId";
    readonly issueLineId: "issueLineId";
    readonly productId: "productId";
};
export type WasteLineScalarFieldEnum = (typeof WasteLineScalarFieldEnum)[keyof typeof WasteLineScalarFieldEnum];
export declare const MaterialMovementScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly fromSource: "fromSource";
    readonly toSource: "toSource";
    readonly postedAt: "postedAt";
    readonly lotId: "lotId";
    readonly receiptLineId: "receiptLineId";
    readonly issueLineId: "issueLineId";
    readonly consumptionLineId: "consumptionLineId";
    readonly returnLineId: "returnLineId";
    readonly wasteLineId: "wasteLineId";
};
export type MaterialMovementScalarFieldEnum = (typeof MaterialMovementScalarFieldEnum)[keyof typeof MaterialMovementScalarFieldEnum];
export declare const BomScalarFieldEnum: {
    readonly id: "id";
    readonly version: "version";
    readonly outputQuantity: "outputQuantity";
    readonly effectiveAt: "effectiveAt";
    readonly status: "status";
    readonly productId: "productId";
    readonly createdById: "createdById";
};
export type BomScalarFieldEnum = (typeof BomScalarFieldEnum)[keyof typeof BomScalarFieldEnum];
export declare const BomLineScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly bomId: "bomId";
    readonly materialId: "materialId";
};
export type BomLineScalarFieldEnum = (typeof BomLineScalarFieldEnum)[keyof typeof BomLineScalarFieldEnum];
export declare const ProductionOrderScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly assignedAt: "assignedAt";
    readonly dueAt: "dueAt";
    readonly status: "status";
    readonly bomId: "bomId";
    readonly assignedById: "assignedById";
    readonly assignedToId: "assignedToId";
};
export type ProductionOrderScalarFieldEnum = (typeof ProductionOrderScalarFieldEnum)[keyof typeof ProductionOrderScalarFieldEnum];
export declare const MaterialShortageScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly reason: "reason";
    readonly status: "status";
    readonly requestedAt: "requestedAt";
    readonly updatedAt: "updatedAt";
    readonly reviewNote: "reviewNote";
    readonly productionOrderId: "productionOrderId";
    readonly materialId: "materialId";
    readonly requestedById: "requestedById";
    readonly reviewedById: "reviewedById";
};
export type MaterialShortageScalarFieldEnum = (typeof MaterialShortageScalarFieldEnum)[keyof typeof MaterialShortageScalarFieldEnum];
export declare const ProductionRunScalarFieldEnum: {
    readonly id: "id";
    readonly recordedAt: "recordedAt";
    readonly actualQuantity: "actualQuantity";
    readonly acceptedQuantity: "acceptedQuantity";
    readonly status: "status";
    readonly inspectedAt: "inspectedAt";
    readonly inspectionNote: "inspectionNote";
    readonly productionOrderId: "productionOrderId";
    readonly performedById: "performedById";
    readonly inspectedById: "inspectedById";
};
export type ProductionRunScalarFieldEnum = (typeof ProductionRunScalarFieldEnum)[keyof typeof ProductionRunScalarFieldEnum];
export declare const ConsumptionLineScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly runId: "runId";
    readonly issueLineId: "issueLineId";
};
export type ConsumptionLineScalarFieldEnum = (typeof ConsumptionLineScalarFieldEnum)[keyof typeof ConsumptionLineScalarFieldEnum];
export declare const SaleScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly createdAt: "createdAt";
    readonly status: "status";
    readonly closedAt: "closedAt";
    readonly closedById: "closedById";
    readonly version: "version";
    readonly tableId: "tableId";
    readonly createdById: "createdById";
};
export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum];
export declare const SaleLineScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly sentById: "sentById";
    readonly note: "note";
    readonly sentAt: "sentAt";
    readonly batch: "batch";
    readonly productName: "productName";
    readonly saleId: "saleId";
    readonly productId: "productId";
};
export type SaleLineScalarFieldEnum = (typeof SaleLineScalarFieldEnum)[keyof typeof SaleLineScalarFieldEnum];
export declare const ProductExportScalarFieldEnum: {
    readonly id: "id";
    readonly requestedAt: "requestedAt";
    readonly approvedAt: "approvedAt";
    readonly status: "status";
    readonly reason: "reason";
    readonly saleId: "saleId";
    readonly requestedById: "requestedById";
    readonly reviewedById: "reviewedById";
};
export type ProductExportScalarFieldEnum = (typeof ProductExportScalarFieldEnum)[keyof typeof ProductExportScalarFieldEnum];
export declare const ProductExportLineScalarFieldEnum: {
    readonly id: "id";
    readonly requestedQuantity: "requestedQuantity";
    readonly exportedQuantity: "exportedQuantity";
    readonly exportId: "exportId";
    readonly saleLineId: "saleLineId";
};
export type ProductExportLineScalarFieldEnum = (typeof ProductExportLineScalarFieldEnum)[keyof typeof ProductExportLineScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly amount: "amount";
    readonly receivedById: "receivedById";
    readonly method: "method";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly saleId: "saleId";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const ProductMovementScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly movementType: "movementType";
    readonly postedAt: "postedAt";
    readonly productId: "productId";
    readonly dispatchLineId: "dispatchLineId";
    readonly storeAdjustmentId: "storeAdjustmentId";
    readonly runId: "runId";
    readonly exportLineId: "exportLineId";
    readonly wasteLineId: "wasteLineId";
};
export type ProductMovementScalarFieldEnum = (typeof ProductMovementScalarFieldEnum)[keyof typeof ProductMovementScalarFieldEnum];
export declare const DiningTableScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly area: "area";
    readonly x: "x";
    readonly y: "y";
    readonly status: "status";
};
export type DiningTableScalarFieldEnum = (typeof DiningTableScalarFieldEnum)[keyof typeof DiningTableScalarFieldEnum];
export declare const DiningAreaScalarFieldEnum: {
    readonly columns: "columns";
    readonly rows: "rows";
    readonly color: "color";
    readonly name: "name";
};
export type DiningAreaScalarFieldEnum = (typeof DiningAreaScalarFieldEnum)[keyof typeof DiningAreaScalarFieldEnum];
export declare const ServingScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly servedAt: "servedAt";
    readonly saleLineId: "saleLineId";
    readonly servedById: "servedById";
};
export type ServingScalarFieldEnum = (typeof ServingScalarFieldEnum)[keyof typeof ServingScalarFieldEnum];
export declare const ReplenishmentRequestScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly requestedAt: "requestedAt";
    readonly status: "status";
    readonly note: "note";
    readonly saleLineId: "saleLineId";
    readonly requestedById: "requestedById";
    readonly productionOrderId: "productionOrderId";
};
export type ReplenishmentRequestScalarFieldEnum = (typeof ReplenishmentRequestScalarFieldEnum)[keyof typeof ReplenishmentRequestScalarFieldEnum];
export declare const SaleLineChangeScalarFieldEnum: {
    readonly id: "id";
    readonly changedAt: "changedAt";
    readonly previousQuantity: "previousQuantity";
    readonly quantity: "quantity";
    readonly reason: "reason";
    readonly saleLineId: "saleLineId";
    readonly replacementLineId: "replacementLineId";
    readonly changedById: "changedById";
};
export type SaleLineChangeScalarFieldEnum = (typeof SaleLineChangeScalarFieldEnum)[keyof typeof SaleLineChangeScalarFieldEnum];
export declare const StoreDispatchScalarFieldEnum: {
    readonly id: "id";
    readonly requestedAt: "requestedAt";
    readonly approvedAt: "approvedAt";
    readonly status: "status";
    readonly reason: "reason";
    readonly requestedById: "requestedById";
    readonly reviewedById: "reviewedById";
};
export type StoreDispatchScalarFieldEnum = (typeof StoreDispatchScalarFieldEnum)[keyof typeof StoreDispatchScalarFieldEnum];
export declare const StoreDispatchLineScalarFieldEnum: {
    readonly id: "id";
    readonly dispatchId: "dispatchId";
    readonly productId: "productId";
    readonly quantity: "quantity";
};
export type StoreDispatchLineScalarFieldEnum = (typeof StoreDispatchLineScalarFieldEnum)[keyof typeof StoreDispatchLineScalarFieldEnum];
export declare const StoreAdjustmentScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly kind: "kind";
    readonly reason: "reason";
    readonly status: "status";
    readonly requestedAt: "requestedAt";
    readonly approvedAt: "approvedAt";
    readonly requestedById: "requestedById";
    readonly reviewedById: "reviewedById";
};
export type StoreAdjustmentScalarFieldEnum = (typeof StoreAdjustmentScalarFieldEnum)[keyof typeof StoreAdjustmentScalarFieldEnum];
export declare const StoreMovementScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly movementType: "movementType";
    readonly postedAt: "postedAt";
    readonly dispatchLineId: "dispatchLineId";
    readonly saleLineId: "saleLineId";
    readonly adjustmentId: "adjustmentId";
};
export type StoreMovementScalarFieldEnum = (typeof StoreMovementScalarFieldEnum)[keyof typeof StoreMovementScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    roleTemplate?: Prisma.RoleTemplateOmit;
    role?: Prisma.RoleOmit;
    permission?: Prisma.PermissionOmit;
    rolePermission?: Prisma.RolePermissionOmit;
    account?: Prisma.AccountOmit;
    employee?: Prisma.EmployeeOmit;
    unit?: Prisma.UnitOmit;
    category?: Prisma.CategoryOmit;
    material?: Prisma.MaterialOmit;
    product?: Prisma.ProductOmit;
    supplier?: Prisma.SupplierOmit;
    materialLot?: Prisma.MaterialLotOmit;
    materialReceipt?: Prisma.MaterialReceiptOmit;
    materialReceiptLine?: Prisma.MaterialReceiptLineOmit;
    materialIssue?: Prisma.MaterialIssueOmit;
    materialIssueLine?: Prisma.MaterialIssueLineOmit;
    materialReturn?: Prisma.MaterialReturnOmit;
    materialReturnLine?: Prisma.MaterialReturnLineOmit;
    waste?: Prisma.WasteOmit;
    wasteLine?: Prisma.WasteLineOmit;
    materialMovement?: Prisma.MaterialMovementOmit;
    bom?: Prisma.BomOmit;
    bomLine?: Prisma.BomLineOmit;
    productionOrder?: Prisma.ProductionOrderOmit;
    materialShortage?: Prisma.MaterialShortageOmit;
    productionRun?: Prisma.ProductionRunOmit;
    consumptionLine?: Prisma.ConsumptionLineOmit;
    sale?: Prisma.SaleOmit;
    saleLine?: Prisma.SaleLineOmit;
    productExport?: Prisma.ProductExportOmit;
    productExportLine?: Prisma.ProductExportLineOmit;
    payment?: Prisma.PaymentOmit;
    productMovement?: Prisma.ProductMovementOmit;
    diningTable?: Prisma.DiningTableOmit;
    diningArea?: Prisma.DiningAreaOmit;
    serving?: Prisma.ServingOmit;
    replenishmentRequest?: Prisma.ReplenishmentRequestOmit;
    saleLineChange?: Prisma.SaleLineChangeOmit;
    storeDispatch?: Prisma.StoreDispatchOmit;
    storeDispatchLine?: Prisma.StoreDispatchLineOmit;
    storeAdjustment?: Prisma.StoreAdjustmentOmit;
    storeMovement?: Prisma.StoreMovementOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
