import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../database';
import {
  CreateRoleRequestDto,
  CreateRoleResponseDto,
  RolesResponseDto,
} from 'src/dtos/roles';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private readonly roleRepository: RoleRepository,
  ) {}

  async createRole(
    createRoleRequestDto: CreateRoleRequestDto,
  ): Promise<CreateRoleResponseDto> {
    const savedRole = await this.roleRepository.createRole(
      createRoleRequestDto,
    );
    return {
      data: {
        role: {
          id: savedRole.id,
          name: savedRole.name,
          permissions: savedRole.permissions,
        },
      },
    };
  }

  async findRoles(page: number, pageSize: number): Promise<RolesResponseDto> {
    const [data, total] = await this.roleRepository.pagination(page, pageSize);
    return {
      data: data,
      meta: {
        total: total,
        page: Number(page),
        pageSize: data.length,
      },
    };
  }
}
