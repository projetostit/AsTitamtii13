import { Body, Controller, Post } from '@nestjs/common';
import { ContatoService } from './contato.service';
 
@Controller('contato')
export class ContatoController {
  constructor(
    private readonly contatoService: ContatoService,
  ) {}
 
  @Post('enviar')
  enviar(
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('curso_area_interesse') curso_area_interesse: string,
    @Body('mensagem') mensagem: string,
  ) {
    return this.contatoService.enviar(
      nome,
      email,
      curso_area_interesse,
      mensagem,
    );
  }
}