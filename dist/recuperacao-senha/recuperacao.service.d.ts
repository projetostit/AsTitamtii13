import { Repository } from 'typeorm';
import { RecuperacaoSenha } from './recuperacao.entity';
import { Usuario } from '../usuario/usuario.entity';
export declare class RecuperacaoService {
    private readonly recuperacaoRepository;
    private readonly usuarioRepository;
    constructor(recuperacaoRepository: Repository<RecuperacaoSenha>, usuarioRepository: Repository<Usuario>);
    solicitar(email: string): Promise<{
        mensagem: string;
    }>;
    redefinir(token: string, novaSenha: string): Promise<{
        mensagem: string;
    }>;
}
