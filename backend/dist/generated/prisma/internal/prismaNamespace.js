import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.1",
    engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    RoleTemplate: 'RoleTemplate',
    Role: 'Role',
    Permission: 'Permission',
    RolePermission: 'RolePermission',
    Account: 'Account',
    Employee: 'Employee',
    Unit: 'Unit',
    Category: 'Category',
    Material: 'Material',
    Product: 'Product',
    Supplier: 'Supplier',
    MaterialLot: 'MaterialLot',
    MaterialReceipt: 'MaterialReceipt',
    MaterialReceiptLine: 'MaterialReceiptLine',
    MaterialIssue: 'MaterialIssue',
    MaterialIssueLine: 'MaterialIssueLine',
    MaterialReturn: 'MaterialReturn',
    MaterialReturnLine: 'MaterialReturnLine',
    Waste: 'Waste',
    WasteLine: 'WasteLine',
    MaterialMovement: 'MaterialMovement',
    Bom: 'Bom',
    BomLine: 'BomLine',
    ProductionOrder: 'ProductionOrder',
    MaterialShortage: 'MaterialShortage',
    ProductionRun: 'ProductionRun',
    ConsumptionLine: 'ConsumptionLine',
    Sale: 'Sale',
    SaleLine: 'SaleLine',
    ProductExport: 'ProductExport',
    ProductExportLine: 'ProductExportLine',
    Payment: 'Payment',
    ProductMovement: 'ProductMovement',
    DiningTable: 'DiningTable',
    DiningArea: 'DiningArea',
    Serving: 'Serving',
    ReplenishmentRequest: 'ReplenishmentRequest',
    SaleLineChange: 'SaleLineChange',
    StoreDispatch: 'StoreDispatch',
    StoreDispatchLine: 'StoreDispatchLine',
    StoreAdjustment: 'StoreAdjustment',
    StoreMovement: 'StoreMovement'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const RoleTemplateScalarFieldEnum = {
    id: 'id',
    name: 'name',
    workspace: 'workspace',
    description: 'description',
    permissions: 'permissions',
    updatedAt: 'updatedAt'
};
export const RoleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description'
};
export const PermissionScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name'
};
export const RolePermissionScalarFieldEnum = {
    roleId: 'roleId',
    permissionId: 'permissionId'
};
export const AccountScalarFieldEnum = {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash',
    status: 'status',
    createdAt: 'createdAt',
    roleId: 'roleId'
};
export const EmployeeScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    phone: 'phone',
    email: 'email',
    status: 'status',
    accountId: 'accountId'
};
export const UnitScalarFieldEnum = {
    id: 'id',
    name: 'name',
    symbol: 'symbol'
};
export const CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    objectType: 'objectType'
};
export const MaterialScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    minStock: 'minStock',
    status: 'status',
    unitId: 'unitId',
    categoryId: 'categoryId'
};
export const ProductScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    sellingPrice: 'sellingPrice',
    status: 'status',
    unitId: 'unitId',
    categoryId: 'categoryId'
};
export const SupplierScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    phone: 'phone',
    address: 'address',
    status: 'status'
};
export const MaterialLotScalarFieldEnum = {
    id: 'id',
    code: 'code',
    expiryDate: 'expiryDate',
    materialId: 'materialId'
};
export const MaterialReceiptScalarFieldEnum = {
    id: 'id',
    code: 'code',
    receivedAt: 'receivedAt',
    status: 'status',
    note: 'note',
    supplierId: 'supplierId',
    createdById: 'createdById'
};
export const MaterialReceiptLineScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    receiptId: 'receiptId',
    lotId: 'lotId'
};
export const MaterialIssueScalarFieldEnum = {
    id: 'id',
    requestedAt: 'requestedAt',
    approvedAt: 'approvedAt',
    status: 'status',
    reason: 'reason',
    reviewNote: 'reviewNote',
    productionOrderId: 'productionOrderId',
    requestedById: 'requestedById',
    reviewedById: 'reviewedById'
};
export const MaterialIssueLineScalarFieldEnum = {
    id: 'id',
    requestedQuantity: 'requestedQuantity',
    issuedQuantity: 'issuedQuantity',
    issueId: 'issueId',
    lotId: 'lotId'
};
export const MaterialReturnScalarFieldEnum = {
    id: 'id',
    requestedAt: 'requestedAt',
    approvedAt: 'approvedAt',
    status: 'status',
    reason: 'reason',
    requestedById: 'requestedById',
    reviewedById: 'reviewedById'
};
export const MaterialReturnLineScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    returnId: 'returnId',
    issueLineId: 'issueLineId'
};
export const WasteScalarFieldEnum = {
    id: 'id',
    reportedAt: 'reportedAt',
    approvedAt: 'approvedAt',
    reason: 'reason',
    status: 'status',
    reportedById: 'reportedById',
    reviewedById: 'reviewedById'
};
export const WasteLineScalarFieldEnum = {
    id: 'id',
    sourceType: 'sourceType',
    quantity: 'quantity',
    note: 'note',
    wasteId: 'wasteId',
    lotId: 'lotId',
    issueLineId: 'issueLineId',
    productId: 'productId'
};
export const MaterialMovementScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    fromSource: 'fromSource',
    toSource: 'toSource',
    postedAt: 'postedAt',
    lotId: 'lotId',
    receiptLineId: 'receiptLineId',
    issueLineId: 'issueLineId',
    consumptionLineId: 'consumptionLineId',
    returnLineId: 'returnLineId',
    wasteLineId: 'wasteLineId'
};
export const BomScalarFieldEnum = {
    id: 'id',
    version: 'version',
    outputQuantity: 'outputQuantity',
    effectiveAt: 'effectiveAt',
    status: 'status',
    productId: 'productId',
    createdById: 'createdById'
};
export const BomLineScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    bomId: 'bomId',
    materialId: 'materialId'
};
export const ProductionOrderScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    assignedAt: 'assignedAt',
    dueAt: 'dueAt',
    status: 'status',
    bomId: 'bomId',
    assignedById: 'assignedById',
    assignedToId: 'assignedToId'
};
export const MaterialShortageScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    reason: 'reason',
    status: 'status',
    requestedAt: 'requestedAt',
    updatedAt: 'updatedAt',
    reviewNote: 'reviewNote',
    productionOrderId: 'productionOrderId',
    materialId: 'materialId',
    requestedById: 'requestedById',
    reviewedById: 'reviewedById'
};
export const ProductionRunScalarFieldEnum = {
    id: 'id',
    recordedAt: 'recordedAt',
    actualQuantity: 'actualQuantity',
    acceptedQuantity: 'acceptedQuantity',
    status: 'status',
    inspectedAt: 'inspectedAt',
    inspectionNote: 'inspectionNote',
    productionOrderId: 'productionOrderId',
    performedById: 'performedById',
    inspectedById: 'inspectedById'
};
export const ConsumptionLineScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    runId: 'runId',
    issueLineId: 'issueLineId'
};
export const SaleScalarFieldEnum = {
    id: 'id',
    code: 'code',
    createdAt: 'createdAt',
    status: 'status',
    closedAt: 'closedAt',
    closedById: 'closedById',
    version: 'version',
    tableId: 'tableId',
    createdById: 'createdById'
};
export const SaleLineScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    sentById: 'sentById',
    note: 'note',
    sentAt: 'sentAt',
    batch: 'batch',
    productName: 'productName',
    saleId: 'saleId',
    productId: 'productId'
};
export const ProductExportScalarFieldEnum = {
    id: 'id',
    requestedAt: 'requestedAt',
    approvedAt: 'approvedAt',
    status: 'status',
    reason: 'reason',
    saleId: 'saleId',
    requestedById: 'requestedById',
    reviewedById: 'reviewedById'
};
export const ProductExportLineScalarFieldEnum = {
    id: 'id',
    requestedQuantity: 'requestedQuantity',
    exportedQuantity: 'exportedQuantity',
    exportId: 'exportId',
    saleLineId: 'saleLineId'
};
export const PaymentScalarFieldEnum = {
    id: 'id',
    amount: 'amount',
    receivedById: 'receivedById',
    method: 'method',
    status: 'status',
    paidAt: 'paidAt',
    saleId: 'saleId'
};
export const ProductMovementScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    movementType: 'movementType',
    postedAt: 'postedAt',
    productId: 'productId',
    dispatchLineId: 'dispatchLineId',
    storeAdjustmentId: 'storeAdjustmentId',
    runId: 'runId',
    exportLineId: 'exportLineId',
    wasteLineId: 'wasteLineId'
};
export const DiningTableScalarFieldEnum = {
    id: 'id',
    name: 'name',
    area: 'area',
    x: 'x',
    y: 'y',
    status: 'status'
};
export const DiningAreaScalarFieldEnum = {
    columns: 'columns',
    rows: 'rows',
    color: 'color',
    name: 'name'
};
export const ServingScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    servedAt: 'servedAt',
    saleLineId: 'saleLineId',
    servedById: 'servedById'
};
export const ReplenishmentRequestScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    requestedAt: 'requestedAt',
    status: 'status',
    note: 'note',
    saleLineId: 'saleLineId',
    requestedById: 'requestedById',
    productionOrderId: 'productionOrderId'
};
export const SaleLineChangeScalarFieldEnum = {
    id: 'id',
    changedAt: 'changedAt',
    previousQuantity: 'previousQuantity',
    quantity: 'quantity',
    reason: 'reason',
    saleLineId: 'saleLineId',
    replacementLineId: 'replacementLineId',
    changedById: 'changedById'
};
export const StoreDispatchScalarFieldEnum = {
    id: 'id',
    requestedAt: 'requestedAt',
    approvedAt: 'approvedAt',
    status: 'status',
    reason: 'reason',
    requestedById: 'requestedById',
    reviewedById: 'reviewedById'
};
export const StoreDispatchLineScalarFieldEnum = {
    id: 'id',
    dispatchId: 'dispatchId',
    productId: 'productId',
    quantity: 'quantity'
};
export const StoreAdjustmentScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    quantity: 'quantity',
    kind: 'kind',
    reason: 'reason',
    status: 'status',
    requestedAt: 'requestedAt',
    approvedAt: 'approvedAt',
    requestedById: 'requestedById',
    reviewedById: 'reviewedById'
};
export const StoreMovementScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    quantity: 'quantity',
    movementType: 'movementType',
    postedAt: 'postedAt',
    dispatchLineId: 'dispatchLineId',
    saleLineId: 'saleLineId',
    adjustmentId: 'adjustmentId'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map