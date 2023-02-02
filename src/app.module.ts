import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';


@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    //ESSA DECLARAÇÃO DE OBJETO SIGNIFICA QUE TEMOS UM GUARDIÃO
    //QUE TEREMOS UM GUARDIÃO QUE SERA O JwtAuthGuard, QUE VAI ESTAR 
    //COM O PROVIDE NA APLICAÇÃO INTEIRA
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports:[]
})
export class AppModule {}
