import { IsEmail } from "class-validator";

export class ForgetEmail{
  @IsEmail()
  email: string;
}