import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductPayload>;
export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type ProductAvgAggregateOutputType = {
    sellingPrice: runtime.Decimal | null;
};
export type ProductSumAggregateOutputType = {
    sellingPrice: runtime.Decimal | null;
};
export type ProductMinAggregateOutputType = {
    supplyType: string | null;
    id: string | null;
    code: string | null;
    name: string | null;
    sellingPrice: runtime.Decimal | null;
    status: string | null;
    unitId: string | null;
    categoryId: string | null;
};
export type ProductMaxAggregateOutputType = {
    supplyType: string | null;
    id: string | null;
    code: string | null;
    name: string | null;
    sellingPrice: runtime.Decimal | null;
    status: string | null;
    unitId: string | null;
    categoryId: string | null;
};
export type ProductCountAggregateOutputType = {
    supplyType: number;
    id: number;
    code: number;
    name: number;
    sellingPrice: number;
    status: number;
    unitId: number;
    categoryId: number;
    _all: number;
};
export type ProductAvgAggregateInputType = {
    sellingPrice?: true;
};
export type ProductSumAggregateInputType = {
    sellingPrice?: true;
};
export type ProductMinAggregateInputType = {
    supplyType?: true;
    id?: true;
    code?: true;
    name?: true;
    sellingPrice?: true;
    status?: true;
    unitId?: true;
    categoryId?: true;
};
export type ProductMaxAggregateInputType = {
    supplyType?: true;
    id?: true;
    code?: true;
    name?: true;
    sellingPrice?: true;
    status?: true;
    unitId?: true;
    categoryId?: true;
};
export type ProductCountAggregateInputType = {
    supplyType?: true;
    id?: true;
    code?: true;
    name?: true;
    sellingPrice?: true;
    status?: true;
    unitId?: true;
    categoryId?: true;
    _all?: true;
};
export type ProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductCountAggregateInputType;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProduct[P]> : Prisma.GetScalarType<T[P], AggregateProduct[P]>;
};
export type ProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithAggregationInput | Prisma.ProductOrderByWithAggregationInput[];
    by: Prisma.ProductScalarFieldEnum[] | Prisma.ProductScalarFieldEnum;
    having?: Prisma.ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type ProductGroupByOutputType = {
    supplyType: string;
    id: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal;
    status: string;
    unitId: string;
    categoryId: string;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]>;
}>>;
export type ProductWhereInput = {
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    supplyType?: Prisma.StringFilter<"Product"> | string;
    id?: Prisma.UuidFilter<"Product"> | string;
    code?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    sellingPrice?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"Product"> | string;
    unitId?: Prisma.UuidFilter<"Product"> | string;
    categoryId?: Prisma.UuidFilter<"Product"> | string;
    lots?: Prisma.ProductLotListRelationFilter;
    productReceiptLines?: Prisma.ProductReceiptLineListRelationFilter;
    storeDispatchLines?: Prisma.StoreDispatchLineListRelationFilter;
    storeMovements?: Prisma.StoreMovementListRelationFilter;
    storeAdjustments?: Prisma.StoreAdjustmentListRelationFilter;
    unit?: Prisma.XOR<Prisma.UnitScalarRelationFilter, Prisma.UnitWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    boms?: Prisma.BomListRelationFilter;
    saleLines?: Prisma.SaleLineListRelationFilter;
    movements?: Prisma.ProductMovementListRelationFilter;
    wasteLines?: Prisma.WasteLineListRelationFilter;
};
export type ProductOrderByWithRelationInput = {
    supplyType?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    lots?: Prisma.ProductLotOrderByRelationAggregateInput;
    productReceiptLines?: Prisma.ProductReceiptLineOrderByRelationAggregateInput;
    storeDispatchLines?: Prisma.StoreDispatchLineOrderByRelationAggregateInput;
    storeMovements?: Prisma.StoreMovementOrderByRelationAggregateInput;
    storeAdjustments?: Prisma.StoreAdjustmentOrderByRelationAggregateInput;
    unit?: Prisma.UnitOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
    boms?: Prisma.BomOrderByRelationAggregateInput;
    saleLines?: Prisma.SaleLineOrderByRelationAggregateInput;
    movements?: Prisma.ProductMovementOrderByRelationAggregateInput;
    wasteLines?: Prisma.WasteLineOrderByRelationAggregateInput;
};
export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    supplyType?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    sellingPrice?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"Product"> | string;
    unitId?: Prisma.UuidFilter<"Product"> | string;
    categoryId?: Prisma.UuidFilter<"Product"> | string;
    lots?: Prisma.ProductLotListRelationFilter;
    productReceiptLines?: Prisma.ProductReceiptLineListRelationFilter;
    storeDispatchLines?: Prisma.StoreDispatchLineListRelationFilter;
    storeMovements?: Prisma.StoreMovementListRelationFilter;
    storeAdjustments?: Prisma.StoreAdjustmentListRelationFilter;
    unit?: Prisma.XOR<Prisma.UnitScalarRelationFilter, Prisma.UnitWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    boms?: Prisma.BomListRelationFilter;
    saleLines?: Prisma.SaleLineListRelationFilter;
    movements?: Prisma.ProductMovementListRelationFilter;
    wasteLines?: Prisma.WasteLineListRelationFilter;
}, "id" | "code">;
export type ProductOrderByWithAggregationInput = {
    supplyType?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    _count?: Prisma.ProductCountOrderByAggregateInput;
    _avg?: Prisma.ProductAvgOrderByAggregateInput;
    _max?: Prisma.ProductMaxOrderByAggregateInput;
    _min?: Prisma.ProductMinOrderByAggregateInput;
    _sum?: Prisma.ProductSumOrderByAggregateInput;
};
export type ProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    supplyType?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    id?: Prisma.UuidWithAggregatesFilter<"Product"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    sellingPrice?: Prisma.DecimalWithAggregatesFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    unitId?: Prisma.UuidWithAggregatesFilter<"Product"> | string;
    categoryId?: Prisma.UuidWithAggregatesFilter<"Product"> | string;
};
export type ProductCreateInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductUpdateInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateManyInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
};
export type ProductUpdateManyMutationInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductUncheckedUpdateManyInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductListRelationFilter = {
    every?: Prisma.ProductWhereInput;
    some?: Prisma.ProductWhereInput;
    none?: Prisma.ProductWhereInput;
};
export type ProductOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductCountOrderByAggregateInput = {
    supplyType?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProductAvgOrderByAggregateInput = {
    sellingPrice?: Prisma.SortOrder;
};
export type ProductMaxOrderByAggregateInput = {
    supplyType?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProductMinOrderByAggregateInput = {
    supplyType?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    unitId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProductSumOrderByAggregateInput = {
    sellingPrice?: Prisma.SortOrder;
};
export type ProductNullableScalarRelationFilter = {
    is?: Prisma.ProductWhereInput | null;
    isNot?: Prisma.ProductWhereInput | null;
};
export type ProductScalarRelationFilter = {
    is?: Prisma.ProductWhereInput;
    isNot?: Prisma.ProductWhereInput;
};
export type ProductCreateNestedManyWithoutUnitInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutUnitInput, Prisma.ProductUncheckedCreateWithoutUnitInput> | Prisma.ProductCreateWithoutUnitInput[] | Prisma.ProductUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutUnitInput | Prisma.ProductCreateOrConnectWithoutUnitInput[];
    createMany?: Prisma.ProductCreateManyUnitInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUncheckedCreateNestedManyWithoutUnitInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutUnitInput, Prisma.ProductUncheckedCreateWithoutUnitInput> | Prisma.ProductCreateWithoutUnitInput[] | Prisma.ProductUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutUnitInput | Prisma.ProductCreateOrConnectWithoutUnitInput[];
    createMany?: Prisma.ProductCreateManyUnitInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUpdateManyWithoutUnitNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutUnitInput, Prisma.ProductUncheckedCreateWithoutUnitInput> | Prisma.ProductCreateWithoutUnitInput[] | Prisma.ProductUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutUnitInput | Prisma.ProductCreateOrConnectWithoutUnitInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutUnitInput | Prisma.ProductUpsertWithWhereUniqueWithoutUnitInput[];
    createMany?: Prisma.ProductCreateManyUnitInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutUnitInput | Prisma.ProductUpdateWithWhereUniqueWithoutUnitInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutUnitInput | Prisma.ProductUpdateManyWithWhereWithoutUnitInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductUncheckedUpdateManyWithoutUnitNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutUnitInput, Prisma.ProductUncheckedCreateWithoutUnitInput> | Prisma.ProductCreateWithoutUnitInput[] | Prisma.ProductUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutUnitInput | Prisma.ProductCreateOrConnectWithoutUnitInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutUnitInput | Prisma.ProductUpsertWithWhereUniqueWithoutUnitInput[];
    createMany?: Prisma.ProductCreateManyUnitInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutUnitInput | Prisma.ProductUpdateWithWhereUniqueWithoutUnitInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutUnitInput | Prisma.ProductUpdateManyWithWhereWithoutUnitInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutCategoryInput | Prisma.ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutCategoryInput | Prisma.ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductCreateNestedOneWithoutWasteLinesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutWasteLinesInput, Prisma.ProductUncheckedCreateWithoutWasteLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutWasteLinesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneWithoutWasteLinesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutWasteLinesInput, Prisma.ProductUncheckedCreateWithoutWasteLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutWasteLinesInput;
    upsert?: Prisma.ProductUpsertWithoutWasteLinesInput;
    disconnect?: Prisma.ProductWhereInput | boolean;
    delete?: Prisma.ProductWhereInput | boolean;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutWasteLinesInput, Prisma.ProductUpdateWithoutWasteLinesInput>, Prisma.ProductUncheckedUpdateWithoutWasteLinesInput>;
};
export type ProductCreateNestedOneWithoutLotsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutLotsInput, Prisma.ProductUncheckedCreateWithoutLotsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutLotsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutLotsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutLotsInput, Prisma.ProductUncheckedCreateWithoutLotsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutLotsInput;
    upsert?: Prisma.ProductUpsertWithoutLotsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutLotsInput, Prisma.ProductUpdateWithoutLotsInput>, Prisma.ProductUncheckedUpdateWithoutLotsInput>;
};
export type ProductCreateNestedOneWithoutProductReceiptLinesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutProductReceiptLinesInput, Prisma.ProductUncheckedCreateWithoutProductReceiptLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutProductReceiptLinesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutProductReceiptLinesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutProductReceiptLinesInput, Prisma.ProductUncheckedCreateWithoutProductReceiptLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutProductReceiptLinesInput;
    upsert?: Prisma.ProductUpsertWithoutProductReceiptLinesInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutProductReceiptLinesInput, Prisma.ProductUpdateWithoutProductReceiptLinesInput>, Prisma.ProductUncheckedUpdateWithoutProductReceiptLinesInput>;
};
export type ProductCreateNestedOneWithoutBomsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutBomsInput, Prisma.ProductUncheckedCreateWithoutBomsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutBomsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutBomsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutBomsInput, Prisma.ProductUncheckedCreateWithoutBomsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutBomsInput;
    upsert?: Prisma.ProductUpsertWithoutBomsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutBomsInput, Prisma.ProductUpdateWithoutBomsInput>, Prisma.ProductUncheckedUpdateWithoutBomsInput>;
};
export type ProductCreateNestedOneWithoutSaleLinesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSaleLinesInput, Prisma.ProductUncheckedCreateWithoutSaleLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSaleLinesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutSaleLinesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSaleLinesInput, Prisma.ProductUncheckedCreateWithoutSaleLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSaleLinesInput;
    upsert?: Prisma.ProductUpsertWithoutSaleLinesInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutSaleLinesInput, Prisma.ProductUpdateWithoutSaleLinesInput>, Prisma.ProductUncheckedUpdateWithoutSaleLinesInput>;
};
export type ProductCreateNestedOneWithoutMovementsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutMovementsInput, Prisma.ProductUncheckedCreateWithoutMovementsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutMovementsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutMovementsInput, Prisma.ProductUncheckedCreateWithoutMovementsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutMovementsInput;
    upsert?: Prisma.ProductUpsertWithoutMovementsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutMovementsInput, Prisma.ProductUpdateWithoutMovementsInput>, Prisma.ProductUncheckedUpdateWithoutMovementsInput>;
};
export type ProductCreateNestedOneWithoutStoreDispatchLinesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutStoreDispatchLinesInput, Prisma.ProductUncheckedCreateWithoutStoreDispatchLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutStoreDispatchLinesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutStoreDispatchLinesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutStoreDispatchLinesInput, Prisma.ProductUncheckedCreateWithoutStoreDispatchLinesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutStoreDispatchLinesInput;
    upsert?: Prisma.ProductUpsertWithoutStoreDispatchLinesInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutStoreDispatchLinesInput, Prisma.ProductUpdateWithoutStoreDispatchLinesInput>, Prisma.ProductUncheckedUpdateWithoutStoreDispatchLinesInput>;
};
export type ProductCreateNestedOneWithoutStoreAdjustmentsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutStoreAdjustmentsInput, Prisma.ProductUncheckedCreateWithoutStoreAdjustmentsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutStoreAdjustmentsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutStoreAdjustmentsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutStoreAdjustmentsInput, Prisma.ProductUncheckedCreateWithoutStoreAdjustmentsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutStoreAdjustmentsInput;
    upsert?: Prisma.ProductUpsertWithoutStoreAdjustmentsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutStoreAdjustmentsInput, Prisma.ProductUpdateWithoutStoreAdjustmentsInput>, Prisma.ProductUncheckedUpdateWithoutStoreAdjustmentsInput>;
};
export type ProductCreateNestedOneWithoutStoreMovementsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutStoreMovementsInput, Prisma.ProductUncheckedCreateWithoutStoreMovementsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutStoreMovementsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutStoreMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutStoreMovementsInput, Prisma.ProductUncheckedCreateWithoutStoreMovementsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutStoreMovementsInput;
    upsert?: Prisma.ProductUpsertWithoutStoreMovementsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutStoreMovementsInput, Prisma.ProductUpdateWithoutStoreMovementsInput>, Prisma.ProductUncheckedUpdateWithoutStoreMovementsInput>;
};
export type ProductCreateWithoutUnitInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutUnitInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutUnitInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutUnitInput, Prisma.ProductUncheckedCreateWithoutUnitInput>;
};
export type ProductCreateManyUnitInputEnvelope = {
    data: Prisma.ProductCreateManyUnitInput | Prisma.ProductCreateManyUnitInput[];
    skipDuplicates?: boolean;
};
export type ProductUpsertWithWhereUniqueWithoutUnitInput = {
    where: Prisma.ProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUpdateWithoutUnitInput, Prisma.ProductUncheckedUpdateWithoutUnitInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutUnitInput, Prisma.ProductUncheckedCreateWithoutUnitInput>;
};
export type ProductUpdateWithWhereUniqueWithoutUnitInput = {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutUnitInput, Prisma.ProductUncheckedUpdateWithoutUnitInput>;
};
export type ProductUpdateManyWithWhereWithoutUnitInput = {
    where: Prisma.ProductScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyWithoutUnitInput>;
};
export type ProductScalarWhereInput = {
    AND?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    OR?: Prisma.ProductScalarWhereInput[];
    NOT?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    supplyType?: Prisma.StringFilter<"Product"> | string;
    id?: Prisma.UuidFilter<"Product"> | string;
    code?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    sellingPrice?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"Product"> | string;
    unitId?: Prisma.UuidFilter<"Product"> | string;
    categoryId?: Prisma.UuidFilter<"Product"> | string;
};
export type ProductCreateWithoutCategoryInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutCategoryInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutCategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput>;
};
export type ProductCreateManyCategoryInputEnvelope = {
    data: Prisma.ProductCreateManyCategoryInput | Prisma.ProductCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUpdateWithoutCategoryInput, Prisma.ProductUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput>;
};
export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutCategoryInput, Prisma.ProductUncheckedUpdateWithoutCategoryInput>;
};
export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.ProductScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyWithoutCategoryInput>;
};
export type ProductCreateWithoutWasteLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutWasteLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutWasteLinesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutWasteLinesInput, Prisma.ProductUncheckedCreateWithoutWasteLinesInput>;
};
export type ProductUpsertWithoutWasteLinesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutWasteLinesInput, Prisma.ProductUncheckedUpdateWithoutWasteLinesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutWasteLinesInput, Prisma.ProductUncheckedCreateWithoutWasteLinesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutWasteLinesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutWasteLinesInput, Prisma.ProductUncheckedUpdateWithoutWasteLinesInput>;
};
export type ProductUpdateWithoutWasteLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutWasteLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutLotsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutLotsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutLotsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutLotsInput, Prisma.ProductUncheckedCreateWithoutLotsInput>;
};
export type ProductUpsertWithoutLotsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutLotsInput, Prisma.ProductUncheckedUpdateWithoutLotsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutLotsInput, Prisma.ProductUncheckedCreateWithoutLotsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutLotsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutLotsInput, Prisma.ProductUncheckedUpdateWithoutLotsInput>;
};
export type ProductUpdateWithoutLotsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutLotsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutProductReceiptLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutProductReceiptLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutProductReceiptLinesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutProductReceiptLinesInput, Prisma.ProductUncheckedCreateWithoutProductReceiptLinesInput>;
};
export type ProductUpsertWithoutProductReceiptLinesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutProductReceiptLinesInput, Prisma.ProductUncheckedUpdateWithoutProductReceiptLinesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutProductReceiptLinesInput, Prisma.ProductUncheckedCreateWithoutProductReceiptLinesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutProductReceiptLinesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutProductReceiptLinesInput, Prisma.ProductUncheckedUpdateWithoutProductReceiptLinesInput>;
};
export type ProductUpdateWithoutProductReceiptLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutProductReceiptLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutBomsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutBomsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutBomsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutBomsInput, Prisma.ProductUncheckedCreateWithoutBomsInput>;
};
export type ProductUpsertWithoutBomsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutBomsInput, Prisma.ProductUncheckedUpdateWithoutBomsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutBomsInput, Prisma.ProductUncheckedCreateWithoutBomsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutBomsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutBomsInput, Prisma.ProductUncheckedUpdateWithoutBomsInput>;
};
export type ProductUpdateWithoutBomsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutBomsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutSaleLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutSaleLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutSaleLinesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSaleLinesInput, Prisma.ProductUncheckedCreateWithoutSaleLinesInput>;
};
export type ProductUpsertWithoutSaleLinesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutSaleLinesInput, Prisma.ProductUncheckedUpdateWithoutSaleLinesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSaleLinesInput, Prisma.ProductUncheckedCreateWithoutSaleLinesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutSaleLinesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutSaleLinesInput, Prisma.ProductUncheckedUpdateWithoutSaleLinesInput>;
};
export type ProductUpdateWithoutSaleLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutSaleLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutMovementsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutMovementsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutMovementsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutMovementsInput, Prisma.ProductUncheckedCreateWithoutMovementsInput>;
};
export type ProductUpsertWithoutMovementsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutMovementsInput, Prisma.ProductUncheckedUpdateWithoutMovementsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutMovementsInput, Prisma.ProductUncheckedCreateWithoutMovementsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutMovementsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutMovementsInput, Prisma.ProductUncheckedUpdateWithoutMovementsInput>;
};
export type ProductUpdateWithoutMovementsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutMovementsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutStoreDispatchLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutStoreDispatchLinesInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutStoreDispatchLinesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutStoreDispatchLinesInput, Prisma.ProductUncheckedCreateWithoutStoreDispatchLinesInput>;
};
export type ProductUpsertWithoutStoreDispatchLinesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutStoreDispatchLinesInput, Prisma.ProductUncheckedUpdateWithoutStoreDispatchLinesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutStoreDispatchLinesInput, Prisma.ProductUncheckedCreateWithoutStoreDispatchLinesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutStoreDispatchLinesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutStoreDispatchLinesInput, Prisma.ProductUncheckedUpdateWithoutStoreDispatchLinesInput>;
};
export type ProductUpdateWithoutStoreDispatchLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutStoreDispatchLinesInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutStoreAdjustmentsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutStoreAdjustmentsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeMovements?: Prisma.StoreMovementUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutStoreAdjustmentsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutStoreAdjustmentsInput, Prisma.ProductUncheckedCreateWithoutStoreAdjustmentsInput>;
};
export type ProductUpsertWithoutStoreAdjustmentsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutStoreAdjustmentsInput, Prisma.ProductUncheckedUpdateWithoutStoreAdjustmentsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutStoreAdjustmentsInput, Prisma.ProductUncheckedCreateWithoutStoreAdjustmentsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutStoreAdjustmentsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutStoreAdjustmentsInput, Prisma.ProductUncheckedUpdateWithoutStoreAdjustmentsInput>;
};
export type ProductUpdateWithoutStoreAdjustmentsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutStoreAdjustmentsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutStoreMovementsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    lots?: Prisma.ProductLotCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentCreateNestedManyWithoutProductInput;
    unit: Prisma.UnitCreateNestedOneWithoutProductsInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    boms?: Prisma.BomCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutStoreMovementsInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
    categoryId: string;
    lots?: Prisma.ProductLotUncheckedCreateNestedManyWithoutProductInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedCreateNestedManyWithoutProductInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedCreateNestedManyWithoutProductInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedCreateNestedManyWithoutProductInput;
    boms?: Prisma.BomUncheckedCreateNestedManyWithoutProductInput;
    saleLines?: Prisma.SaleLineUncheckedCreateNestedManyWithoutProductInput;
    movements?: Prisma.ProductMovementUncheckedCreateNestedManyWithoutProductInput;
    wasteLines?: Prisma.WasteLineUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutStoreMovementsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutStoreMovementsInput, Prisma.ProductUncheckedCreateWithoutStoreMovementsInput>;
};
export type ProductUpsertWithoutStoreMovementsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutStoreMovementsInput, Prisma.ProductUncheckedUpdateWithoutStoreMovementsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutStoreMovementsInput, Prisma.ProductUncheckedCreateWithoutStoreMovementsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutStoreMovementsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutStoreMovementsInput, Prisma.ProductUncheckedUpdateWithoutStoreMovementsInput>;
};
export type ProductUpdateWithoutStoreMovementsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutStoreMovementsInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateManyUnitInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    categoryId: string;
};
export type ProductUpdateWithoutUnitInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutUnitInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateManyWithoutUnitInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCreateManyCategoryInput = {
    supplyType?: string;
    id?: string;
    code: string;
    name: string;
    sellingPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    unitId: string;
};
export type ProductUpdateWithoutCategoryInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUpdateManyWithoutProductNestedInput;
    unit?: Prisma.UnitUpdateOneRequiredWithoutProductsNestedInput;
    boms?: Prisma.BomUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutCategoryInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
    lots?: Prisma.ProductLotUncheckedUpdateManyWithoutProductNestedInput;
    productReceiptLines?: Prisma.ProductReceiptLineUncheckedUpdateManyWithoutProductNestedInput;
    storeDispatchLines?: Prisma.StoreDispatchLineUncheckedUpdateManyWithoutProductNestedInput;
    storeMovements?: Prisma.StoreMovementUncheckedUpdateManyWithoutProductNestedInput;
    storeAdjustments?: Prisma.StoreAdjustmentUncheckedUpdateManyWithoutProductNestedInput;
    boms?: Prisma.BomUncheckedUpdateManyWithoutProductNestedInput;
    saleLines?: Prisma.SaleLineUncheckedUpdateManyWithoutProductNestedInput;
    movements?: Prisma.ProductMovementUncheckedUpdateManyWithoutProductNestedInput;
    wasteLines?: Prisma.WasteLineUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    supplyType?: Prisma.StringFieldUpdateOperationsInput | string;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sellingPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    unitId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCountOutputType = {
    lots: number;
    productReceiptLines: number;
    storeDispatchLines: number;
    storeMovements: number;
    storeAdjustments: number;
    boms: number;
    saleLines: number;
    movements: number;
    wasteLines: number;
};
export type ProductCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lots?: boolean | ProductCountOutputTypeCountLotsArgs;
    productReceiptLines?: boolean | ProductCountOutputTypeCountProductReceiptLinesArgs;
    storeDispatchLines?: boolean | ProductCountOutputTypeCountStoreDispatchLinesArgs;
    storeMovements?: boolean | ProductCountOutputTypeCountStoreMovementsArgs;
    storeAdjustments?: boolean | ProductCountOutputTypeCountStoreAdjustmentsArgs;
    boms?: boolean | ProductCountOutputTypeCountBomsArgs;
    saleLines?: boolean | ProductCountOutputTypeCountSaleLinesArgs;
    movements?: boolean | ProductCountOutputTypeCountMovementsArgs;
    wasteLines?: boolean | ProductCountOutputTypeCountWasteLinesArgs;
};
export type ProductCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductCountOutputTypeCountLotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductLotWhereInput;
};
export type ProductCountOutputTypeCountProductReceiptLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReceiptLineWhereInput;
};
export type ProductCountOutputTypeCountStoreDispatchLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreDispatchLineWhereInput;
};
export type ProductCountOutputTypeCountStoreMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreMovementWhereInput;
};
export type ProductCountOutputTypeCountStoreAdjustmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreAdjustmentWhereInput;
};
export type ProductCountOutputTypeCountBomsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BomWhereInput;
};
export type ProductCountOutputTypeCountSaleLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleLineWhereInput;
};
export type ProductCountOutputTypeCountMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductMovementWhereInput;
};
export type ProductCountOutputTypeCountWasteLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasteLineWhereInput;
};
export type ProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplyType?: boolean;
    id?: boolean;
    code?: boolean;
    name?: boolean;
    sellingPrice?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
    lots?: boolean | Prisma.Product$lotsArgs<ExtArgs>;
    productReceiptLines?: boolean | Prisma.Product$productReceiptLinesArgs<ExtArgs>;
    storeDispatchLines?: boolean | Prisma.Product$storeDispatchLinesArgs<ExtArgs>;
    storeMovements?: boolean | Prisma.Product$storeMovementsArgs<ExtArgs>;
    storeAdjustments?: boolean | Prisma.Product$storeAdjustmentsArgs<ExtArgs>;
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    boms?: boolean | Prisma.Product$bomsArgs<ExtArgs>;
    saleLines?: boolean | Prisma.Product$saleLinesArgs<ExtArgs>;
    movements?: boolean | Prisma.Product$movementsArgs<ExtArgs>;
    wasteLines?: boolean | Prisma.Product$wasteLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplyType?: boolean;
    id?: boolean;
    code?: boolean;
    name?: boolean;
    sellingPrice?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplyType?: boolean;
    id?: boolean;
    code?: boolean;
    name?: boolean;
    sellingPrice?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectScalar = {
    supplyType?: boolean;
    id?: boolean;
    code?: boolean;
    name?: boolean;
    sellingPrice?: boolean;
    status?: boolean;
    unitId?: boolean;
    categoryId?: boolean;
};
export type ProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"supplyType" | "id" | "code" | "name" | "sellingPrice" | "status" | "unitId" | "categoryId", ExtArgs["result"]["product"]>;
export type ProductInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lots?: boolean | Prisma.Product$lotsArgs<ExtArgs>;
    productReceiptLines?: boolean | Prisma.Product$productReceiptLinesArgs<ExtArgs>;
    storeDispatchLines?: boolean | Prisma.Product$storeDispatchLinesArgs<ExtArgs>;
    storeMovements?: boolean | Prisma.Product$storeMovementsArgs<ExtArgs>;
    storeAdjustments?: boolean | Prisma.Product$storeAdjustmentsArgs<ExtArgs>;
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    boms?: boolean | Prisma.Product$bomsArgs<ExtArgs>;
    saleLines?: boolean | Prisma.Product$saleLinesArgs<ExtArgs>;
    movements?: boolean | Prisma.Product$movementsArgs<ExtArgs>;
    wasteLines?: boolean | Prisma.Product$wasteLinesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type ProductIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    unit?: boolean | Prisma.UnitDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $ProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Product";
    objects: {
        lots: Prisma.$ProductLotPayload<ExtArgs>[];
        productReceiptLines: Prisma.$ProductReceiptLinePayload<ExtArgs>[];
        storeDispatchLines: Prisma.$StoreDispatchLinePayload<ExtArgs>[];
        storeMovements: Prisma.$StoreMovementPayload<ExtArgs>[];
        storeAdjustments: Prisma.$StoreAdjustmentPayload<ExtArgs>[];
        unit: Prisma.$UnitPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs>;
        boms: Prisma.$BomPayload<ExtArgs>[];
        saleLines: Prisma.$SaleLinePayload<ExtArgs>[];
        movements: Prisma.$ProductMovementPayload<ExtArgs>[];
        wasteLines: Prisma.$WasteLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        supplyType: string;
        id: string;
        code: string;
        name: string;
        sellingPrice: runtime.Decimal;
        status: string;
        unitId: string;
        categoryId: string;
    }, ExtArgs["result"]["product"]>;
    composites: {};
};
export type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductPayload, S>;
export type ProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCountAggregateInputType | true;
};
export interface ProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Product'];
        meta: {
            name: 'Product';
        };
    };
    findUnique<T extends ProductFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductFindManyArgs>(args?: Prisma.SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductCreateArgs>(args: Prisma.SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductDeleteArgs>(args: Prisma.SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductUpdateArgs>(args: Prisma.SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductUpsertArgs>(args: Prisma.SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductCountArgs>(args?: Prisma.Subset<T, ProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCountAggregateOutputType> : number>;
    aggregate<T extends ProductAggregateArgs>(args: Prisma.Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>;
    groupBy<T extends ProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductFieldRefs;
}
export interface Prisma__ProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lots<T extends Prisma.Product$lotsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$lotsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductLotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    productReceiptLines<T extends Prisma.Product$productReceiptLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$productReceiptLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReceiptLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    storeDispatchLines<T extends Prisma.Product$storeDispatchLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$storeDispatchLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreDispatchLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    storeMovements<T extends Prisma.Product$storeMovementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$storeMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    storeAdjustments<T extends Prisma.Product$storeAdjustmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$storeAdjustmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreAdjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    unit<T extends Prisma.UnitDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UnitDefaultArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    boms<T extends Prisma.Product$bomsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$bomsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    saleLines<T extends Prisma.Product$saleLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$saleLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    movements<T extends Prisma.Product$movementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    wasteLines<T extends Prisma.Product$wasteLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$wasteLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasteLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductFieldRefs {
    readonly supplyType: Prisma.FieldRef<"Product", 'String'>;
    readonly id: Prisma.FieldRef<"Product", 'String'>;
    readonly code: Prisma.FieldRef<"Product", 'String'>;
    readonly name: Prisma.FieldRef<"Product", 'String'>;
    readonly sellingPrice: Prisma.FieldRef<"Product", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Product", 'String'>;
    readonly unitId: Prisma.FieldRef<"Product", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Product", 'String'>;
}
export type ProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
};
export type ProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type ProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
    include?: Prisma.ProductIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
};
export type ProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type Product$lotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductLotSelect<ExtArgs> | null;
    omit?: Prisma.ProductLotOmit<ExtArgs> | null;
    include?: Prisma.ProductLotInclude<ExtArgs> | null;
    where?: Prisma.ProductLotWhereInput;
    orderBy?: Prisma.ProductLotOrderByWithRelationInput | Prisma.ProductLotOrderByWithRelationInput[];
    cursor?: Prisma.ProductLotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductLotScalarFieldEnum | Prisma.ProductLotScalarFieldEnum[];
};
export type Product$productReceiptLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReceiptLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductReceiptLineOmit<ExtArgs> | null;
    include?: Prisma.ProductReceiptLineInclude<ExtArgs> | null;
    where?: Prisma.ProductReceiptLineWhereInput;
    orderBy?: Prisma.ProductReceiptLineOrderByWithRelationInput | Prisma.ProductReceiptLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductReceiptLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReceiptLineScalarFieldEnum | Prisma.ProductReceiptLineScalarFieldEnum[];
};
export type Product$storeDispatchLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreDispatchLineSelect<ExtArgs> | null;
    omit?: Prisma.StoreDispatchLineOmit<ExtArgs> | null;
    include?: Prisma.StoreDispatchLineInclude<ExtArgs> | null;
    where?: Prisma.StoreDispatchLineWhereInput;
    orderBy?: Prisma.StoreDispatchLineOrderByWithRelationInput | Prisma.StoreDispatchLineOrderByWithRelationInput[];
    cursor?: Prisma.StoreDispatchLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreDispatchLineScalarFieldEnum | Prisma.StoreDispatchLineScalarFieldEnum[];
};
export type Product$storeMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreMovementSelect<ExtArgs> | null;
    omit?: Prisma.StoreMovementOmit<ExtArgs> | null;
    include?: Prisma.StoreMovementInclude<ExtArgs> | null;
    where?: Prisma.StoreMovementWhereInput;
    orderBy?: Prisma.StoreMovementOrderByWithRelationInput | Prisma.StoreMovementOrderByWithRelationInput[];
    cursor?: Prisma.StoreMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreMovementScalarFieldEnum | Prisma.StoreMovementScalarFieldEnum[];
};
export type Product$storeAdjustmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreAdjustmentSelect<ExtArgs> | null;
    omit?: Prisma.StoreAdjustmentOmit<ExtArgs> | null;
    include?: Prisma.StoreAdjustmentInclude<ExtArgs> | null;
    where?: Prisma.StoreAdjustmentWhereInput;
    orderBy?: Prisma.StoreAdjustmentOrderByWithRelationInput | Prisma.StoreAdjustmentOrderByWithRelationInput[];
    cursor?: Prisma.StoreAdjustmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreAdjustmentScalarFieldEnum | Prisma.StoreAdjustmentScalarFieldEnum[];
};
export type Product$bomsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BomSelect<ExtArgs> | null;
    omit?: Prisma.BomOmit<ExtArgs> | null;
    include?: Prisma.BomInclude<ExtArgs> | null;
    where?: Prisma.BomWhereInput;
    orderBy?: Prisma.BomOrderByWithRelationInput | Prisma.BomOrderByWithRelationInput[];
    cursor?: Prisma.BomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BomScalarFieldEnum | Prisma.BomScalarFieldEnum[];
};
export type Product$saleLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleLineSelect<ExtArgs> | null;
    omit?: Prisma.SaleLineOmit<ExtArgs> | null;
    include?: Prisma.SaleLineInclude<ExtArgs> | null;
    where?: Prisma.SaleLineWhereInput;
    orderBy?: Prisma.SaleLineOrderByWithRelationInput | Prisma.SaleLineOrderByWithRelationInput[];
    cursor?: Prisma.SaleLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleLineScalarFieldEnum | Prisma.SaleLineScalarFieldEnum[];
};
export type Product$movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductMovementSelect<ExtArgs> | null;
    omit?: Prisma.ProductMovementOmit<ExtArgs> | null;
    include?: Prisma.ProductMovementInclude<ExtArgs> | null;
    where?: Prisma.ProductMovementWhereInput;
    orderBy?: Prisma.ProductMovementOrderByWithRelationInput | Prisma.ProductMovementOrderByWithRelationInput[];
    cursor?: Prisma.ProductMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductMovementScalarFieldEnum | Prisma.ProductMovementScalarFieldEnum[];
};
export type Product$wasteLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasteLineSelect<ExtArgs> | null;
    omit?: Prisma.WasteLineOmit<ExtArgs> | null;
    include?: Prisma.WasteLineInclude<ExtArgs> | null;
    where?: Prisma.WasteLineWhereInput;
    orderBy?: Prisma.WasteLineOrderByWithRelationInput | Prisma.WasteLineOrderByWithRelationInput[];
    cursor?: Prisma.WasteLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasteLineScalarFieldEnum | Prisma.WasteLineScalarFieldEnum[];
};
export type ProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
};
