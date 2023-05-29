import {
  SetMetadata,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const CheckRoles = (role: string) => SetMetadata('role', role);

export const RolesDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const reflector = new Reflector();
    const roles = reflector.get<string>('role', ctx.getHandler());
    return roles;
  },
);
