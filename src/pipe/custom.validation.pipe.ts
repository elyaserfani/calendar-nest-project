import {
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { BadRequestException, ExceptionEnums } from 'src/exception';

export class CustomValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      exceptionFactory: (errors) =>
        new BadRequestException(ExceptionEnums.VALIDATION_ERROR, {
          ...{ errors: this.formatErrors(errors) },
        }),
      ...options,
      transform: true,
    });
  }
  private formatErrors(errors: ValidationError[]) {
    return errors
      .map((error) => this.getFirstConstraints(error))
      .map((constraint) => Object.values(constraint ?? {}))
      .reduce((acc, curr) => acc.concat(curr));
  }
  private getFirstConstraints(error: ValidationError): {
    [type: string]: string;
  } {
    return (
      error.constraints ??
      this.getFirstConstraints(error.children?.[0] ?? { property: '' })
    );
  }
}
