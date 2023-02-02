import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './models/userPayload';
import { UserToken } from './models/userToken';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  login(data: User): UserToken {
    //transformar o user em um JWT
    const payload: UserPayload = {
      sub: data.id,
      name: data.name,
      email: data.email,
    }
    const jwtToken = this.jwtService.sign(payload)

    return {
      access_token: jwtToken
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
    if (user) {

      const IsValidPassword = await bcrypt.compare(password, user.password)

      if (IsValidPassword) {
        return {
          ...user,
          password: undefined
        }
      }
    }
    //se chegar aqui significa que não encontrou um usere/ou a senha não corresponde
    throw new UnauthorizedException("email ou senha incorreto");
  }
}
