import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { GlobalExceptionEnum, UnauthorizedException } from 'src/exceptions';
import { AuthPayload } from './auth.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: AuthPayload) {
    if (!payload) {
      throw new UnauthorizedException(GlobalExceptionEnum.UNAUTHORIZED);
    }
    return payload;
  }
}
