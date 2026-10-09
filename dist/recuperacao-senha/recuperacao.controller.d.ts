import { RecuperacaoService } from './recuperacao.service';
export declare class RecuperacaoSenhaController {
    private readonly recuperacaoSenhaService;
    constructor(recuperacaoSenhaService: RecuperacaoService);
    solicitar(email: string): Promise<{
        mensagem: string;
    }>;
}
