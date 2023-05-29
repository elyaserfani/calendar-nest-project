import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateRoleRequestDto,
  CreateRoleResponseDto,
  RolesResponseDto,
} from 'src/dtos/roles';
import { RoleService } from 'src/modules/role';

@Controller('roles')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({
    status: 201,
    description: 'Created role',
    type: [CreateRoleResponseDto],
  })
  async createRole(
    @Body() role: CreateRoleRequestDto,
  ): Promise<CreateRoleResponseDto> {
    return this.roleService.createRole(role);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ApiQuery({ name: 'page', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'All roles with pagination',
    type: [RolesResponseDto],
  })
  async findAllWithPagination(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<RolesResponseDto> {
    return this.roleService.findRoles(page, pageSize);
  }
}
