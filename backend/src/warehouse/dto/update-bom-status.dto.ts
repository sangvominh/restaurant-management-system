import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class UpdateBomStatusDto {
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE', 'ARCHIVED'], {
    message: 'Trạng thái phải là ACTIVE, INACTIVE hoặc ARCHIVED',
  })
  status: string;
}

