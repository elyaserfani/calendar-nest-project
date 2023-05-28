import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPermissionRepository } from 'src/interfaces/repositories';
import {
  CreatePermissionRequestDto,
  CreatePermissionResponseDto,
  PermissionsResponseDto,
} from 'src/dtos/permissions';
import { SuccessResponseDto } from 'src/commons';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async createPermission(
    createPermissionRequestDto: CreatePermissionRequestDto,
  ): Promise<CreatePermissionResponseDto> {
    const savedPermission = await this.permissionRepository.createPermission(
      createPermissionRequestDto,
    );
    return {
      data: {
        permission: {
          id: savedPermission.id,
          name: savedPermission.name,
        },
      },
    };
  }

  async findPermissions(
    page: number,
    pageSize: number,
  ): Promise<PermissionsResponseDto> {
    const [data, total] = await this.permissionRepository.pagination(
      page,
      pageSize,
    );
    return {
      data: data,
      meta: {
        total: total,
        page: Number(page),
        pageSize: data.length,
      },
    };
  }

  async deletePermission(permissionId: number): Promise<SuccessResponseDto> {
    const permission = await this.permissionRepository.findById(permissionId);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    await this.permissionRepository.deletePermission(permission.id);
    return {
      data: {
        result: { success: true },
      },
    };
  }
}
