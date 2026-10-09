
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/usuario.entity';
import { emailValido, senhaValida } from '../common/validacao';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async perfil(authorization?: string) {
    const token = authorization?.match(/^Bearer (\S+)$/i)?.[1];
    if (!token) throw new UnauthorizedException('Faça login para continuar.');
    let payload: { sub: number };
    try { payload = await this.jwtService.verifyAsync<{ sub: number }>(token); }
    catch { throw new UnauthorizedException('Sua sessão expirou. Entre novamente.'); }
    if (!Number.isInteger(payload.sub)) throw new UnauthorizedException();
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: payload.sub } });
    if (!usuario) throw new UnauthorizedException();
    return { id_usuario: usuario.id_usuario, nome: usuario.nome, email: usuario.email };
  }

  async login(email: string, senha: string) {
    email = emailValido(email);
    senha = senhaValida(senha);
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (
      !usuario ||
      !(await bcrypt.compare(senha, usuario.senha))
    ) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
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
