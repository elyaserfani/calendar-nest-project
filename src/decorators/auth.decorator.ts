import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from 'src/utils';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
