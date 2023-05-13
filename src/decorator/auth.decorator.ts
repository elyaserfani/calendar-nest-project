import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from 'src/util/auth.payload';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
