import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) { }

  async login() {

  }
  
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)    
    if(user){
      
      const IsValidPassword = await bcrypt.compare(password, user.password)
      
      if(IsValidPassword){
        return {
          ...user,
          password:undefined
        }
      }
    }
    //se chegar aqui significa que não encontrou um usere/ou a senha não corresponde
    throw new UnauthorizedException("email ou senha incorreto");
  }
}
