import { Body, Controller, Post } from '@nestjs/common';
import { RecuperacaoService } from './recuperacao.service';
 
 
@Controller('recuperacao-senha')
export class RecuperacaoSenhaController {
  constructor(
    private readonly recuperacaoSenhaService: RecuperacaoService,
  ) {}
 
  @Post('solicitar')
  solicitar(@Body('email') email: string) {
  return this.recuperacaoSenhaService.solicitar(email);
  }
}
 