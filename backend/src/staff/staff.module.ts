import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { StaffController } from './staff.controller.js';
import { FinishedGoodsApi } from '../warehouse/api/finished-goods.api.js';
import { StaffFinishedIssueController } from './finished-issue.controller.js';
import { StaffMaterialWasteController } from './material-waste.controller.js';
import { StaffFinishedDefectController } from './finished-defect.controller.js';
import { StaffMaterialReturnController } from './material-return.controller.js';
import { StaffProductionController } from './production.controller.js';
import { ProcessingDefectController } from './processing-defect.controller.js';
import { ProcessingDefectDecisionService } from './processing-defect-decision.service.js';
import { StaffService } from './staff.service.js';
import { KitchenReturnDecisionService } from './kitchen-return-decision.service.js';
import { KitchenWasteDecisionService } from './kitchen-waste-decision.service.js';
@Module({ imports: [AuthModule], controllers: [ProcessingDefectController, StaffController, StaffProductionController, StaffFinishedIssueController, StaffMaterialWasteController, StaffFinishedDefectController, StaffMaterialReturnController], providers: [StaffService, FinishedGoodsApi, KitchenWasteDecisionService, KitchenReturnDecisionService, ProcessingDefectDecisionService], exports: [KitchenWasteDecisionService, KitchenReturnDecisionService, ProcessingDefectDecisionService] })
export class StaffModule {}
