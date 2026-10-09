import { ContatoService } from './contato.service';
export declare class ContatoController {
    private readonly contatoService;
    constructor(contatoService: ContatoService);
    enviar(nome: string, email: string, curso_area_interesse: string, mensagem: string): Promise<{
        mensagem: string;
        id_contato: number;
    }>;
}
