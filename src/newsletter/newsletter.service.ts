import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Newsletter } from './newsletter.entity';
import { Usuario } from '../usuario/usuario.entity';
import { emailValido } from '../common/validacao';

@Injectable()
export class NewsletterService {
    constructor(
        @InjectRepository(Newsletter)
        private readonly newsletterRepository: Repository<Newsletter>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async inscrever(email: string) {
        email = emailValido(email);
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) throw new BadRequestException('Crie uma conta com este e-mail antes de assinar as novidades.');
        const id_usuario = usuario.id_usuario;
        const inscricaoExistente = await this.newsletterRepository.findOne({
            where: { id_usuario },
        });

        if (inscricaoExistente) {
            return {
                mensagem: 'Usuário já está inscrito na newsletter',
            };
        }

        const inscricao = this.newsletterRepository.create({
            id_usuario,
        });

        const newsletterSalva =
            await this.newsletterRepository.save(inscricao);

        return {
            mensagem: 'Inscrição realizada com sucesso',
            id_newsletter: newsletterSalva.id_newsletter,
            id_usuario: newsletterSalva.id_usuario,
        };
    }
}