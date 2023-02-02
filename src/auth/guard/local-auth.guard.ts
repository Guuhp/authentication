import { ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//ESSE GUARD PEGA AS INFORMAÇOES E PASSA PARA O LOCAL STRATEGY, 
//LA ELE REALIZA A CHECAGEM PARA SABER SE PODE LOGAR 
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }

    return user;
  }
}