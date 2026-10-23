
import { Controller, Get } from '@nestjs/common';
import { WarehouseService } from './warehouse.service.js';

@Controller('warehouse')
export class WarehouseController {
  constructor(
    private readonly warehouseService: WarehouseService,
  ) {}

  // GET /warehouse/inventory
  @Get('inventory')
  getInventory() {
    return this.warehouseService.getInventory();
  }
}
