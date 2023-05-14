import { SetMetadata } from '@nestjs/common';
export const NoGuard = () => SetMetadata('noGuard', true);
