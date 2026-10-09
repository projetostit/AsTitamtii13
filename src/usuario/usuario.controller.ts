import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
 
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}
 
  @Post('cadastrar')
  cadastrar(
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('senha') senha: string,
  ) {
    return this.usuarioService.cadastrar(
      nome,
      email,
      senha,
    );
  }
}