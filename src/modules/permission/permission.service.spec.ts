import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { Permission } from 'src/entities';
import { PermissionRepository } from '../database';
import { IPermissionRepository } from 'src/interfaces/repositories';
import { PermissionService } from './permission.service';
import {
  CreatePermissionRequestDto,
  CreatePermissionResponseDto,
} from 'src/dtos/permissions';
import { NotFoundException } from 'src/exceptions';

describe('PermissionService', () => {
  let permissionService: PermissionService;
  let permissionRepository: IPermissionRepository;

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        PermissionRepository,
        {
          provide: getRepositoryToken(Permission),
          useClass: Repository,
        },
        {
          provide: 'PERMISSION_REPOSITORY',
          useClass: PermissionRepository,
        },
      ],
    }).compile();

    permissionService = module.get<PermissionService>(PermissionService);
    permissionRepository = module.get<IPermissionRepository>(
      'PERMISSION_REPOSITORY',
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('createPermission', () => {
    it('should create a permission and return the response', async () => {
      const createPermissionRequestDto: CreatePermissionRequestDto = {
        name: 'Test permission',
      };
      const savedPermission = {
        id: 1,
        name: 'Test permission',
        roles: null,
      };
      jest
        .spyOn(permissionRepository, 'createPermission')
        .mockResolvedValue(savedPermission);

      const expectedResponse: CreatePermissionResponseDto = {
        data: {
          permission: {
            id: savedPermission.id,
            name: savedPermission.name,
          },
        },
      };
      const response = await permissionService.createPermission(
        createPermissionRequestDto,
      );
      expect(permissionRepository.createPermission).toHaveBeenCalledWith(
        createPermissionRequestDto,
      );
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('findPermissions', () => {
    it('should return the permission response with correct data and meta', async () => {
      const page = 1;
      const pageSize = 10;
      const permissionData = [
        {
          id: 1,
          name: 'Permission 1',
          roles: null,
        },
        {
          id: 2,
          name: 'Permission 2',
          roles: null,
        },
      ];
      const total = 2;
      jest
        .spyOn(permissionRepository, 'pagination')
        .mockResolvedValue([permissionData, total]);
      const response = await permissionService.findPermissions(page, pageSize);
      expect(permissionRepository.pagination).toHaveBeenCalledWith(
        page,
        pageSize,
      );
      expect(response).toEqual({
        data: permissionData,
        meta: {
          total: total,
          page: page,
          pageSize: permissionData.length,
        },
      });
    });
  });

  describe('deletePermission', () => {
    it('should delete the permission and return a success response when it exists', async () => {
      const permission = {
        id: 1,
        name: 'Test permission',
        roles: null,
      };
      jest
        .spyOn(permissionRepository, 'findById')
        .mockResolvedValue(permission);
      jest
        .spyOn(permissionRepository, 'deletePermission')
        .mockResolvedValue(undefined);
      const response = await permissionService.deletePermission(permission.id);
      expect(permissionRepository.findById).toHaveBeenCalledWith(permission.id);
      expect(permissionRepository.deletePermission).toHaveBeenCalledWith(
        permission.id,
      );
      expect(response).toEqual({
        data: {
          result: { success: true },
        },
      });
    });

    it('should throw NotFoundException when permission does not exist', async () => {
      jest.spyOn(permissionRepository, 'findById').mockResolvedValue(null);
      await expect(permissionService.deletePermission(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
