import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';
import { emailValido, texto, senhaValida } from '../common/validacao';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async cadastrar(nome: string, email: string, senha: string) {
        nome = texto(nome, 'Nome', 100);
        email = emailValido(email);
        senha = senhaValida(senha);
        const usuarioExistente = await this.usuarioRepository.findOne({
            where: { email },
        });

        if (usuarioExistente) {
            throw new ConflictException('E-mail já cadastrado');
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = this.usuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
        });

        const usuarioSalvo = await this.usuarioRepository.save(usuario);

        return {
            id_usuario: usuarioSalvo.id_usuario,
            nome: usuarioSalvo.nome,
            email: usuarioSalvo.email,
        };
    }
}
