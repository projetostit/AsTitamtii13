import { Repository } from 'typeorm';
import { Newsletter } from './newsletter.entity';
import { Usuario } from '../usuario/usuario.entity';
export declare class NewsletterService {
    private readonly newsletterRepository;
    private readonly usuarioRepository;
    constructor(newsletterRepository: Repository<Newsletter>, usuarioRepository: Repository<Usuario>);
    inscrever(email: string): Promise<{
        mensagem: string;
        id_newsletter?: undefined;
        id_usuario?: undefined;
    } | {
        mensagem: string;
        id_newsletter: number;
        id_usuario: number;
    }>;
}
