import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GlobalExceptionEnum, UnauthorizedException } from 'src/exceptions';

@Injectable()
export class RolesAndPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isRoleValid: boolean = user.role === role;

    if (!isRoleValid) {
      throw new UnauthorizedException(GlobalExceptionEnum.ROLE_ERROR);
    }

    if (!this.hasPermissions(user, permissions)) {
      throw new UnauthorizedException(GlobalExceptionEnum.PERMISSION_ERROR);
    }
    return true;
  }

  private hasPermissions(user: any, permissions: string[]): boolean {
    const isPresent = permissions.some((permission) =>
      user.permissions.some((obj) => obj.name === permission),
    );
    return isPresent;
  }
}
