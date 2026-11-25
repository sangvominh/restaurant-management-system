import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import {
  CustomerAccountController,
  PublicController,
  RestaurantCustomerOrderController,
} from './customer.controller.js';
import { CustomerAuthGuard } from './customer-auth.guard.js';
import { CustomerAuthService } from './customer-auth.service.js';
import { CustomerService } from './customer.service.js';

@Module({
  imports: [PrismaModule, CatalogModule],
  controllers: [PublicController, CustomerAccountController, RestaurantCustomerOrderController],
  providers: [CustomerAuthService, CustomerAuthGuard, CustomerService],
  exports: [CustomerAuthService, CustomerService],
})
export class CustomerModule {}
