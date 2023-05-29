import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { Role } from 'src/entities';
import { RoleRepository } from '../database';
import { IRoleRepository } from 'src/interfaces/repositories';
import { RoleService } from './role.service';
import { CreateRoleRequestDto, CreateRoleResponseDto } from 'src/dtos/roles';

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepository: IRoleRepository;

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        RoleRepository,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
        {
          provide: 'ROLE_REPOSITORY',
          useClass: RoleRepository,
        },
      ],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
    roleRepository = module.get<IRoleRepository>('ROLE_REPOSITORY');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('createRole', () => {
    it('should create a role and return the response', async () => {
      const createRoleRequestDto: CreateRoleRequestDto = {
        name: 'ROLE_TEST',
        permissions: [
          { id: 1, name: 'Test Permission', roles: null },
          { id: 2, name: 'Test Permission', roles: null },
        ],
      };
      const savedRole = {
        id: 1,
        name: 'ROLE_TEST',
        permissions: [
          { id: 1, name: 'Test Permission', roles: null },
          { id: 2, name: 'Test Permission', roles: null },
        ],
      };
      jest.spyOn(roleRepository, 'createRole').mockResolvedValue(savedRole);

      const expectedResponse: CreateRoleResponseDto = {
        data: {
          role: {
            id: savedRole.id,
            name: savedRole.name,
            permissions: savedRole.permissions,
          },
        },
      };
      const response = await roleService.createRole(createRoleRequestDto);
      expect(roleRepository.createRole).toHaveBeenCalledWith(
        createRoleRequestDto,
      );
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('findRoles', () => {
    it('should return the roles response with correct data and meta', async () => {
      const page = 1;
      const pageSize = 10;
      const rolesData = [
        {
          id: 1,
          name: 'ROLE 1',
          permissions: null,
        },
        {
          id: 2,
          name: 'ROLE 2',
          permissions: null,
        },
      ];
      const total = 2;
      jest
        .spyOn(roleRepository, 'pagination')
        .mockResolvedValue([rolesData, total]);
      const response = await roleService.findRoles(page, pageSize);
      expect(roleRepository.pagination).toHaveBeenCalledWith(page, pageSize);
      expect(response).toEqual({
        data: rolesData,
        meta: {
          total: total,
          page: page,
          pageSize: rolesData.length,
        },
      });
    });
  });
});
