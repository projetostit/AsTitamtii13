import { Repository } from 'typeorm';
import { Newsletter } from './newsletter.entity';
export declare class NewsletterService {
    private readonly newsletterRepository;
    constructor(newsletterRepository: Repository<Newsletter>);
    inscrever(id_usuario: number): Promise<{
        mensagem: string;
        id_newsletter?: undefined;
        id_usuario?: undefined;
    } | {
        mensagem: string;
        id_newsletter: number;
        id_usuario: number;
    }>;
}
