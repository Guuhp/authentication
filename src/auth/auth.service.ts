import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async login() {

  }
  validateUser(email: string, password: string) {
    throw new Error('Method not implemented.');
  }
}
