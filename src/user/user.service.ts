import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { ForgetEmail } from './dto/forget-email.dto';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt()
    data.password = await bcrypt.hash(data.password, salt)
    const user = await this.prisma.user.create({ data });
    return{...user,password:undefined}
  }

  async findOne(id: string) {
  }

  async findByEmail(email: string) {
    const emailUser = await this.prisma.user.findUnique({ where: { email } })

    if (!emailUser) {
      throw new BadRequestException("email não encontrado")
    }

    return emailUser;
  }

}
