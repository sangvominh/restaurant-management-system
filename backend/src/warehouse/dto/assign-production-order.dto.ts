
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Matches,
} from 'class-validator';

export class AssignProductionOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_-]+$/)
  employeeCode: string;
}
