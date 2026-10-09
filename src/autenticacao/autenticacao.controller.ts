import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
 
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
  ) {}
 
  @Post('login')
  login(
    @Body('email') email: string,
    @Body('senha') senha: string,
  ) {
    return this.autenticacaoService.login(email, senha);
  }
}
 