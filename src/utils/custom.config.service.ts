import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }
  getDatabaseHost(): string {
    return this.configService.get('DATABASE_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get('DATABASE_PORT');
  }
  getDatabaseUsername(): string {
    return this.configService.get('DATABASE_USERNAME');
  }
  getDatabasePassword(): string {
    return this.configService.get('DATABASE_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get('DATABASE_DB_NAME');
  }
}
