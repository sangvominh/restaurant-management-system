import { WarehouseController } from './warehouse.controller.js';
import { WarehouseService } from './warehouse.service.js';

describe('WarehouseController', () => {
  it('passes the supplier search term to the service', async () => {
    const service = {
      getSuppliers: vi.fn().mockResolvedValue({ data: [] }),
    } as unknown as WarehouseService;
    const controller = new WarehouseController(service);

    await controller.getSuppliers('NCC001');

    expect(service.getSuppliers).toHaveBeenCalledWith('NCC001');
  });
});
