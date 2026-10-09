
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { RecuperacaoSenha } from './recuperacao.entity';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class RecuperacaoService {
  constructor(
    @InjectRepository(RecuperacaoSenha)
    private readonly recuperacaoRepository: Repository<RecuperacaoSenha>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async solicitar(email: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (!usuario) {
      return {
        mensagem: 'E-mail não encontrado',
      };
    }

    const token = randomBytes(32).toString('hex');

    const dataExpiracao = new Date();
    dataExpiracao.setMinutes(dataExpiracao.getMinutes() + 15);

    const recuperacaoExistente =
      await this.recuperacaoRepository.findOne({
        where: { id_usuario: usuario.id_usuario },
      });

    if (recuperacaoExistente) {
      recuperacaoExistente.token = token;
      recuperacaoExistente.data_expiracao = dataExpiracao;

      await this.recuperacaoRepository.save(recuperacaoExistente);
    } else {
      const recuperacao = this.recuperacaoRepository.create({
        id_usuario: usuario.id_usuario,
        token,
        data_expiracao: dataExpiracao,
      });

      await this.recuperacaoRepository.save(recuperacao);
    }

    return {
      mensagem: 'Token de recuperação gerado com sucesso',
    };
  }

  async redefinir(token: string, novaSenha: string) {
    if (!token || !novaSenha || novaSenha.trim().length === 0) {
      return {
        mensagem: 'Token e nova senha são obrigatórios',
      };
    }

    const recuperacao = await this.recuperacaoRepository.findOne({
      where: { token },
    });

    if (!recuperacao) {
      return {
        mensagem: 'Token de recuperação inválido',
      };
    }

    if (new Date() > recuperacao.data_expiracao) {
      await this.recuperacaoRepository.delete({
        id_recuperacao: recuperacao.id_recuperacao,
      });

      return {
        mensagem: 'Token de recuperação expirado',
      };
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: recuperacao.id_usuario },
    });

    if (!usuario) {
      await this.recuperacaoRepository.delete({
        id_recuperacao: recuperacao.id_recuperacao,
      });

      return {
        mensagem: 'Usuário não encontrado',
      };
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    usuario.senha = senhaHash;
    await this.usuarioRepository.save(usuario);

    await this.recuperacaoRepository.delete({
      id_recuperacao: recuperacao.id_recuperacao,
    });

    return {
      mensagem: 'Senha redefinida com sucesso',
    };
  }
}
