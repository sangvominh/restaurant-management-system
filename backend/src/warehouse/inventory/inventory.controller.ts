
import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service.js';

@Controller('warehouse/inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
  ) {}

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }
}
