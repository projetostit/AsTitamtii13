import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    cadastrar(nome: string, email: string, senha: string): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
    }>;
}
