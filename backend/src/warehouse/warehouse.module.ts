import { Module } from '@nestjs/common';
import { InventoryController } from './inventory/inventory.controller.js';
import { InventoryService } from './inventory/inventory.service.js';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class WarehouseModule {}
