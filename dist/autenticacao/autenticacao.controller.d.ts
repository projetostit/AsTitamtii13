import { AutenticacaoService } from './autenticacao.service';
export declare class AutenticacaoController {
    private readonly autenticacaoService;
    constructor(autenticacaoService: AutenticacaoService);
    perfil(authorization?: string): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
    }>;
    login(email: string, senha: string): Promise<{
        mensagem: string;
        access_token: string;
        id_usuario: number;
        nome: string;
        email: string;
    }>;
}
