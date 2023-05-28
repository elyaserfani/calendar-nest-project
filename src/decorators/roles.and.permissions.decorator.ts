import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ForbiddenException } from 'src/exceptions';

export const CheckRolesAndPermissions = (
  roles: string[],
  permissions: string[],
): MethodDecorator => {
  return (
    target: Record<string, any>,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const ctx = new ExecutionContextHost(args);
      const reflector = new Reflector();
      if (roles && roles.length > 0) {
        const hasRoles = checkUserRoles(roles, ctx);
        if (!hasRoles) {
          throw new ForbiddenException('Insufficient roles');
        }
      }
      if (permissions && permissions.length > 0) {
        const hasPermissions = checkUserPermissions(permissions, ctx);
        if (!hasPermissions) {
          throw new ForbiddenException('Insufficient permissions');
        }
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
};
const checkUserRoles = (roles: string[], ctx: ExecutionContext): boolean => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  if (!user || !user.roles) {
    return false;
  }
  return roles.every((role) => user.roles.includes(role));
};

const checkUserPermissions = (
  permissions: string[],
  ctx: ExecutionContext,
): boolean => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user || !user.permissions) {
    return false;
  }

  return permissions.every((permission) =>
    user.permissions.includes(permission),
  );
};
