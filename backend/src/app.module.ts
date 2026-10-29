import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module.js';
import { RecipesModule } from './recipes/recipes.module.js';
import { ExportOrdersModule } from './export-orders/export-orders.module.js';

@Module({
  imports: [
    // Database — dùng sql.js (pure JS, không cần build tools) để dev nhanh
    // Sau này đổi sang PostgreSQL cho production dễ dàng
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'restaurant.sqlite',
      autoSave: true,
      autoLoadEntities: true,
      synchronize: true, // Chỉ dùng khi dev, tắt khi production
    }),

    // Feature modules
    ProductsModule,
    RecipesModule,
    ExportOrdersModule,
  ],
})
export class AppModule {}
