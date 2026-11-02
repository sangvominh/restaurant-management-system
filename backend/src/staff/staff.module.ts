import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { StaffController } from './staff.controller.js';
import { FinishedGoodsApi } from '../warehouse/api/finished-goods.api.js';
import { StaffFinishedIssueController } from './finished-issue.controller.js';
import { StaffMaterialWasteController } from './material-waste.controller.js';
import { StaffFinishedDefectController } from './finished-defect.controller.js';
import { StaffMaterialReturnController } from './material-return.controller.js';
import { StaffProductionController } from './production.controller.js';
import { StaffService } from './staff.service.js';
@Module({ imports: [AuthModule], controllers: [StaffController, StaffProductionController, StaffFinishedIssueController, StaffMaterialWasteController, StaffFinishedDefectController, StaffMaterialReturnController], providers: [StaffService, FinishedGoodsApi] })
export class StaffModule {}
