import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GlobalExceptionEnum, UnauthorizedException } from 'src/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err: any, user: any, context: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(GlobalExceptionEnum.UNAUTHORIZED);
    } else {
      const requiredRole = context.getHandler().role;
      if (!user || (requiredRole && !user.roles.includes(requiredRole))) {
        throw new UnauthorizedException(GlobalExceptionEnum.PERMISSION_ERROR);
      }
      return user;
    }
  }
}
