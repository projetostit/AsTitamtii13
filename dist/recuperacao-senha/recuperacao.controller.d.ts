import { RecuperacaoService } from './recuperacao.service';
export declare class RecuperacaoController {
    private readonly recuperacaoService;
    constructor(recuperacaoService: RecuperacaoService);
    solicitar(email: string): Promise<{
        mensagem: string;
    }>;
}
