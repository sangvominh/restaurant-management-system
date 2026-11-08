import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import { ProductionController } from './production.controller.js';
import { ProductionService } from './production.service.js';
@Module({ imports: [PrismaModule, CatalogModule], controllers: [ProductionController], providers: [ProductionService] })
export class ProductionModule {}
