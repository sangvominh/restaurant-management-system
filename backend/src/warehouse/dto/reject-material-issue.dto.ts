
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RejectMaterialIssueDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason: string;
}
