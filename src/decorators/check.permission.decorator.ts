import {
  SetMetadata,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const CheckPermissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

export const PermissionsDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const reflector = new Reflector();
    const permissions = reflector.get<string[]>(
      'permissions',
      ctx.getHandler(),
    );
    return permissions;
  },
);
