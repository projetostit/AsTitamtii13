import { AutenticacaoService } from './autenticacao.service';
export declare class AutenticacaoController {
    private readonly autenticacaoService;
    constructor(autenticacaoService: AutenticacaoService);
    login(email: string, senha: string): Promise<{
        mensagem: string;
        access_token?: undefined;
        id_usuario?: undefined;
        nome?: undefined;
        email?: undefined;
    } | {
        mensagem: string;
        access_token: string;
        id_usuario: number;
        nome: string;
        email: string;
    }>;
}
