import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto.js';

// PartialType tự động làm tất cả các field là optional
export class UpdateProductDto extends PartialType(CreateProductDto) {}

