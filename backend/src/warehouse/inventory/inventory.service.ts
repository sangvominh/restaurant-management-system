
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  findAll() {
    return {
      message: 'Lấy danh sách tồn kho thành công',
      data: [
        {
          id: 1,
          name: 'Thịt bò',
          quantity: 50,
          unit: 'kg',
        },
        {
          id: 2,
          name: 'Cà rốt',
          quantity: 30,
          unit: 'kg',
        },
      ],
    };
  }
}
