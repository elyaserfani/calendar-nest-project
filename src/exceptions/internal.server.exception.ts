import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class InternalServerException extends AppException {
  constructor(public message: string, public details?: unknown) {
    super(message, details, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
