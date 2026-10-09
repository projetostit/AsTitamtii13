import { NewsletterService } from './newsletter.service';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
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
