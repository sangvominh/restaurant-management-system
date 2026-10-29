import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditModule } from '../../audit/audit.module';
import { AccountEntity } from './account.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CategoryEntity } from './category.entity';
import { RoleEntity } from './role.entity';
import { SettingEntity } from './setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, RoleEntity, CategoryEntity, SettingEntity]), AuditModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
