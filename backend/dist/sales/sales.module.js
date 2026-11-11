var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import { InventoryModule } from '../inventory/inventory.module.js';
import { RestaurantAuthController, SalesController } from './sales.controller.js';
import { SalesService } from './sales.service.js';
let SalesModule = class SalesModule {
};
SalesModule = __decorate([
    Module({ imports: [PrismaModule, CatalogModule, InventoryModule], controllers: [RestaurantAuthController, SalesController], providers: [SalesService], exports: [SalesService] })
], SalesModule);
export { SalesModule };
//# sourceMappingURL=sales.module.js.map