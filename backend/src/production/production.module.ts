import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import { ProductionController } from './production.controller.js';
import { ProductionService } from './production.service.js';
import { ExecutionService } from './execution.service.js';
import { ShortageService } from './shortage.service.js';
@Module({ imports: [PrismaModule, CatalogModule], controllers: [ProductionController], providers: [ProductionService, ExecutionService, ShortageService] })
export class ProductionModule {}
