import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionService } from 'src/modules/permission';
import {
  CreatePermissionRequestDto,
  CreatePermissionResponseDto,
  PermissionsResponseDto,
} from 'src/dtos/permissions';
import { SuccessResponseDto } from 'src/commons';
import { SwaggerCustomException } from 'src/decorators';

@Controller('permissions')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create new permission' })
  @ApiResponse({
    status: 201,
    description: 'Created permission',
    type: [CreatePermissionResponseDto],
  })
  async createPermission(
    @Body() permission: CreatePermissionRequestDto,
  ): Promise<CreatePermissionResponseDto> {
    return this.permissionService.createPermission(permission);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions with pagination' })
  @ApiQuery({ name: 'page', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'All permissions with pagination',
    type: [PermissionsResponseDto],
  })
  async findAllWithPagination(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<PermissionsResponseDto> {
    return this.permissionService.findPermissions(page, pageSize);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete single permission' })
  @ApiResponse({
    status: 200,
    description: 'Delete a single permission',
    type: [SuccessResponseDto],
  })
  @SwaggerCustomException(() => [new NotFoundException('Permission not found')])
  async deletePermission(
    @Param('id') permissionId: number,
  ): Promise<SuccessResponseDto> {
    return this.permissionService.deletePermission(permissionId);
  }
}
