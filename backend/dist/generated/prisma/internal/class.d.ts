import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get role(): Prisma.RoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get permission(): Prisma.PermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get employee(): Prisma.EmployeeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit(): Prisma.UnitDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get material(): Prisma.MaterialDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get supplier(): Prisma.SupplierDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialLot(): Prisma.MaterialLotDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialReceipt(): Prisma.MaterialReceiptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialReceiptLine(): Prisma.MaterialReceiptLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialIssue(): Prisma.MaterialIssueDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialIssueLine(): Prisma.MaterialIssueLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialReturn(): Prisma.MaterialReturnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialReturnLine(): Prisma.MaterialReturnLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get waste(): Prisma.WasteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get wasteLine(): Prisma.WasteLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialMovement(): Prisma.MaterialMovementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bom(): Prisma.BomDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bomLine(): Prisma.BomLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productionOrder(): Prisma.ProductionOrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get materialShortage(): Prisma.MaterialShortageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productionRun(): Prisma.ProductionRunDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get consumptionLine(): Prisma.ConsumptionLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sale(): Prisma.SaleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get saleLine(): Prisma.SaleLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productExport(): Prisma.ProductExportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productExportLine(): Prisma.ProductExportLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productMovement(): Prisma.ProductMovementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get diningTable(): Prisma.DiningTableDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get diningArea(): Prisma.DiningAreaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get serving(): Prisma.ServingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get replenishmentRequest(): Prisma.ReplenishmentRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get saleLineChange(): Prisma.SaleLineChangeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
