import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
 
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
  ) {}
 
  @Get('me')
  perfil(@Headers('authorization') authorization?: string) {
    return this.autenticacaoService.perfil(authorization);
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('senha') senha: string,
  ) {
    return this.autenticacaoService.login(email, senha);
  }
}
 