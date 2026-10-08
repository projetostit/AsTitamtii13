
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (
      !usuario ||
      !(await bcrypt.compare(senha, usuario.senha))
    ) {
      return {
        mensagem: 'E-mail ou senha inválidos',
      };
    }

    const access_token = await this.jwtService.signAsync({
      sub: usuario.id_usuario,
      email: usuario.email,
    });

    return {
      mensagem: 'Login realizado com sucesso',
      access_token,
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
    };
  }
}
