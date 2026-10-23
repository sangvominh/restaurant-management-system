
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { WarehouseService } from './warehouse.service.js';
import { CreateReceiptDto } from './dto/create-receipt.dto.js';

@Controller('warehouse')
export class WarehouseController {
  constructor(
    private readonly warehouseService: WarehouseService,
  ) {}

  // API 1: Lấy danh sách tồn kho
  @Get('inventory')
  getInventory() {
    return this.warehouseService.getInventory();
  }

  // API 2: Lấy chi tiết NVL theo mã
  @Get('inventory/:code')
  getInventoryByCode(@Param('code') code: string) {
    return this.warehouseService.getInventoryByCode(code);
  }

  // API 3: Tạo phiếu nhập kho
  @Post('receipts')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  createReceipt(@Body() dto: CreateReceiptDto) {
    return this.warehouseService.createReceipt(dto);
  }
}
