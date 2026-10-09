import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
export declare class AutenticacaoService {
    private readonly usuarioRepository;
    private readonly jwtService;
    constructor(usuarioRepository: Repository<Usuario>, jwtService: JwtService);
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
