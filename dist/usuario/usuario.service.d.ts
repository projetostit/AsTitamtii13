import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
export declare class UsuarioService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    cadastrar(nome: string, email: string, senha: string): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
    }>;
}
