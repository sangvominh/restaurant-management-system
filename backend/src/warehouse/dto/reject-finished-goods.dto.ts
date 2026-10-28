import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class RejectFinishedGoodsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason: string;
}
