import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'30days'}
    })
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
