import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(username) {
    const payload = { username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
