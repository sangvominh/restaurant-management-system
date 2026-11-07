import { RequirePermissions, RequireWarehouse } from '../common/auth.decorators.js';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { QueryProductDto } from './dto/query-product.dto.js';

@RequireWarehouse()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. Tạo món ăn mới
  @RequirePermissions("product:manage")
  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // 2. Lấy danh sách món ăn (Tìm nâng cao, Lọc, Sắp xếp, Phân trang)
  @RequirePermissions("product:view")
  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  // 3. Lấy danh sách nhóm món duy nhất (cho dropdown filter)
  @RequirePermissions("product:view")
  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  // 4. API Tồn kho thành phẩm thực tế (kết nối trực tiếp DB, dẹp bỏ màn mock)
  @RequirePermissions("product:view", "finished-goods:approve-export")
  @Get('finished-goods-stock')
  getFinishedGoodsStock() {
    return this.productsService.getFinishedGoodsRealStock();
  }

  // 5. Xem chi tiết món ăn theo mã
  @RequirePermissions("product:view")
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.productsService.findOne(code);
  }

  // 6. Cập nhật món ăn
  @RequirePermissions("product:manage")
  @Patch(':code')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  update(@Param('code') code: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(code, dto);
  }

  // 7. Xóa món ăn
  @RequirePermissions("product:manage")
  @Delete(':code')
  @HttpCode(HttpStatus.OK)
  remove(@Param('code') code: string) {
    return this.productsService.remove(code);
  }
}

