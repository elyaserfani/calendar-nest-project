import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class BadRequestException extends AppException {
  constructor(public message: string, public details?: unknown) {
    super(message, details, HttpStatus.BAD_REQUEST);
  }
}
