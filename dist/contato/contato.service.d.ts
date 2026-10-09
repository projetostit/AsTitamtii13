import { Repository } from 'typeorm';
import { Contato } from './contato.entity';
export declare class ContatoService {
    private readonly contatoRepository;
    constructor(contatoRepository: Repository<Contato>);
    enviar(nome: string, email: string, curso_area_interesse: string, mensagem: string): Promise<{
        mensagem: string;
        id_contato: number;
    }>;
}
