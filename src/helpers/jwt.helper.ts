import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateHelper } from './date.helper';
import { User } from 'src/entities';
import { AuthPayload } from 'src/utils';

export class JwtHelper {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly dateHelper: DateHelper,
  ) {}

  async generateToken(user: User): Promise<string> {
    const iat = this.dateHelper.getCurrentTimestamp();
    const expiresIn = 60 * 60 * 24; //1 Day In Seconds
    const payload: AuthPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      iat: iat,
    };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn,
    });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
