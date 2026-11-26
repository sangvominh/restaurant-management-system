import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Headers,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { CustomerAuthGuard } from './customer-auth.guard.js';
import { CustomerAuthService, type CustomerUser } from './customer-auth.service.js';
import { CustomerService } from './customer.service.js';

type CustomerReq = Request & { customerUser: CustomerUser; customerToken: string };
type StaffReq = Request & { catalogUser: AdminUser; catalogToken: string };

function allowStaff(req: StaffReq, codes: string[]) {
  if (
    !req.catalogUser.permissions.includes('*') &&
    !codes.some(code => req.catalogUser.permissions.includes(code))
  ) {
    throw new ForbiddenException('Chưa có quyền thực hiện thao tác bán hàng');
  }
}

/** API công khai cho Customer Web/PWA & React Native App */
@Controller('api/public')
export class PublicController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerAuth: CustomerAuthService,
  ) {}

  @Get('categories')
  categories() {
    return this.customerService.listCategories();
  }

  @Get('products')
  products(@Query('categoryId') categoryId?: string, @Query('q') q?: string) {
    return this.customerService.listProducts({ categoryId, q });
  }

  @Get('products/:id')
  product(@Param('id') id: string) {
    return this.customerService.getProduct(id);
  }

  @Get('tables/:code')
  table(@Param('code') code: string) {
    return this.customerService.lookupTable(code);
  }

  @Post('orders')
  async createOrder(@Body() body: unknown, @Headers('authorization') authHeader?: string) {
    const customer = await this.customerAuth.tryAuthenticate(authHeader);
    return this.customerService.createOrder(body, customer);
  }

  @Get('orders/:code')
  order(@Param('code') code: string) {
    return this.customerService.getOrderByCode(code);
  }
}

/** API tài khoản khách hàng & lịch sử đơn */
@Controller('api/customer')
export class CustomerAccountController {
  constructor(
    private readonly auth: CustomerAuthService,
    private readonly customerService: CustomerService,
  ) {}

  @Post('auth/register')
  register(@Body() body: unknown) {
    return this.auth.register(body);
  }

  @Post('auth/login')
  @HttpCode(200)
  login(@Body() body: unknown) {
    return this.auth.login(body);
  }

  @Get('auth/me')
  @UseGuards(CustomerAuthGuard)
  me(@Req() req: CustomerReq) {
    return req.customerUser;
  }

  @Post('auth/logout')
  @HttpCode(200)
  @UseGuards(CustomerAuthGuard)
  logout(@Req() req: CustomerReq) {
    return this.auth.logout(req.customerToken);
  }

  @Get('orders')
  @UseGuards(CustomerAuthGuard)
  orders(@Req() req: CustomerReq) {
    return this.customerService.listCustomerOrders(req.customerUser.id);
  }
}

/** API phía nhà hàng (web-restaurant) để duyệt đơn khách & cập nhật thông tin món */
@Controller('api/restaurant')
@UseGuards(CatalogGuard)
export class RestaurantCustomerOrderController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('customer-orders')
  list(@Query('status') status: string | undefined, @Req() req: StaffReq) {
    allowStaff(req, ['sale:view', 'sale:create', 'payment:create', 'dining:manage']);
    return this.customerService.listRestaurantOrders(status);
  }

  @Post('customer-orders/:id/approve')
  @HttpCode(200)
  approve(@Param('id') id: string, @Req() req: StaffReq) {
    allowStaff(req, ['sale:create']);
    return this.customerService.approveOrder(id, req.catalogUser);
  }

  @Post('customer-orders/:id/reject')
  @HttpCode(200)
  reject(@Param('id') id: string, @Body() body: unknown, @Req() req: StaffReq) {
    allowStaff(req, ['sale:create']);
    return this.customerService.rejectOrder(id, body, req.catalogUser);
  }

  @Put('products/:id/menu-info')
  updateMenuInfo(@Param('id') id: string, @Body() body: unknown, @Req() req: StaffReq) {
    allowStaff(req, ['product:price']);
    return this.customerService.updateProductMenuInfo(id, body);
  }
}
