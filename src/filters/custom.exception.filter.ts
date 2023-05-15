import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AppException,
  GlobalExceptionEnum,
  InternalServerException,
} from 'src/exceptions';
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);
  catch(error: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    let exception;
    if (
      error instanceof AppException &&
      error.getStatus() !== HttpStatus.INTERNAL_SERVER_ERROR
    )
      exception = error;
    else {
      try {
        this.logger.error(request.body, error.message);
      } catch {
        this.logger.error('error get body', error.message);
      }
      exception = new InternalServerException(
        GlobalExceptionEnum.INTERNAL_SERVER_ERROR,
        error,
      );
    }
    const body = exception.getResponse();
    const status = exception.getStatus();
    response.status(status).send(body);
  }
}
