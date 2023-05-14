import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class NotFoundException extends AppException {
  constructor(public message: string, public details?: unknown) {
    super(message, details, HttpStatus.NOT_FOUND);
  }
}
