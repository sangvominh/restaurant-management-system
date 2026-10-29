import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { QueryProductDto } from './dto/query-product.dto.js';
import { Product } from './entities/product.entity.js';

@ApiTags('Products — Quản lý sản phẩm')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Product })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Danh sách sản phẩm — hỗ trợ tìm kiếm, lọc, sắp xếp, phân trang',
  })
  @ApiResponse({ status: 200, description: 'Danh sách sản phẩm' })
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Lấy danh sách danh mục (dùng cho filter dropdown)' })
  getCategories(): Promise<string[]> {
    return this.productsService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết sản phẩm' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Product })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Xóa thành công' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}

