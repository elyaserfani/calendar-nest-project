import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    public message: string,
    public details?: unknown,
    public httpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ message, details }, httpStatus);
  }
}
