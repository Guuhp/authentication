import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ForgetEmail } from './dto/forget-email.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('home')
  home(){
    return 'hello world'
  }

  // @Post('forget')
  // async findEmail(@Body() email:ForgetEmail) {
  //   console.log(email);
    
  //   return this.userService.findByEmail(email)
  // }


}
