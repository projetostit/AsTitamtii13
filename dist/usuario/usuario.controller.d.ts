import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    cadastrar(nome: string, email: string, senha: string): Promise<{
        mensagem: string;
        id_usuario?: undefined;
        nome?: undefined;
        email?: undefined;
    } | {
        id_usuario: number;
        nome: string;
        email: string;
        mensagem?: undefined;
    }>;
}
