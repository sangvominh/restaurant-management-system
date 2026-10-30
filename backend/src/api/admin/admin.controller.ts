import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  AuthUser,
  CurrentUser,
  RequirePermissions,
} from '../../common/auth.decorators.js';
import { AdminService } from './admin.service.js';
import {
  CreateAccountDto,
  CreateCategoryDto,
  CreateRoleDto,
  UpdateAccountDto,
  UpdateCategoryDto,
  UpdateRoleDto,
  UpdateSettingsDto,
} from './dto/admin.dto.js';

/** Mọi route ở đây đều đã qua AuthGuard toàn cục (cần JWT); @RequirePermissions chặn theo quyền. */
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // --- ACCOUNTS ---
  @Get('accounts')
  @RequirePermissions('account:manage')
  getAccounts() {
    return this.adminService.getAllAccounts();
  }

  @Post('accounts')
  @RequirePermissions('account:manage')
  createAccount(@Body() dto: CreateAccountDto, @CurrentUser() actor: AuthUser) {
    return this.adminService.createAccount(dto, actor);
  }

  @Put('accounts/:id')
  @RequirePermissions('account:manage')
  updateAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAccountDto,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.updateAccount(id, dto, actor);
  }

  @Patch('accounts/:id/toggle-status')
  @RequirePermissions('account:manage')
  toggleStatus(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.toggleLockStatus(id, actor);
  }

  @Delete('accounts/:id')
  @RequirePermissions('account:manage')
  deleteAccount(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.deleteAccount(id, actor);
  }

  // --- ROLES ---
  @Get('permissions')
  @RequirePermissions('role:manage')
  getPermissions() {
    return this.adminService.getPermissionCatalog();
  }

  // Form tạo/sửa tài khoản cũng cần danh sách vai trò.
  @Get('roles')
  @RequirePermissions('role:manage', 'account:manage')
  getRoles() {
    return this.adminService.getAllRoles();
  }

  @Post('roles')
  @RequirePermissions('role:manage')
  createRole(@Body() dto: CreateRoleDto, @CurrentUser() actor: AuthUser) {
    return this.adminService.createRole(dto, actor);
  }

  @Put('roles/:id')
  @RequirePermissions('role:manage')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.updateRole(id, dto, actor);
  }

  @Delete('roles/:id')
  @RequirePermissions('role:manage')
  deleteRole(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.deleteRole(id, actor);
  }

  // --- CATEGORIES ---
  @Get('categories')
  @RequirePermissions('category:manage')
  getCategories() {
    return this.adminService.getAllCategories();
  }

  @Post('categories')
  @RequirePermissions('category:manage')
  createCategory(
    @Body() dto: CreateCategoryDto,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.createCategory(dto, actor);
  }

  @Put('categories/:id')
  @RequirePermissions('category:manage')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.updateCategory(id, dto, actor);
  }

  @Delete('categories/:id')
  @RequirePermissions('category:manage')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.deleteCategory(id, actor);
  }

  // --- SETTINGS ---
  @Get('settings')
  @RequirePermissions('setting:manage')
  getSettings() {
    return this.adminService.getSettings();
  }

  @Put('settings')
  @RequirePermissions('setting:manage')
  updateSettings(
    @Body() dto: UpdateSettingsDto,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.adminService.updateSettings(dto, actor);
  }

  // --- DASHBOARD ---
  @Get('dashboard')
  @RequirePermissions('dashboard:view')
  getDashboard() {
    return this.adminService.getDashboardSummary();
  }
}
