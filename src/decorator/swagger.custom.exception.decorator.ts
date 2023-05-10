import {
  buildPlaceholder,
  buildTemplatedApiExceptionDecorator,
} from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { HttpException } from '@nestjs/common';
import { AppException } from 'src/exception';

export const SwaggerCustomException = buildTemplatedApiExceptionDecorator(
  {
    message: '$message',
    details: '$details',
  },
  {
    placeholders: {
      message: buildPlaceholder(
        () => HttpException,
        (exception) => (exception.getResponse() as AppException).message,
      ),
      details: buildPlaceholder(
        () => HttpException,
        (exception) => (exception.getResponse() as AppException).details,
      ),
    },
  },
);
