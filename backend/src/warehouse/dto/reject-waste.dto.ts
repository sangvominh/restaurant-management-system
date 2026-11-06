import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class RejectWasteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason: string;
}
