import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
export declare class AutenticacaoService {
    private readonly usuarioRepository;
    private readonly jwtService;
    constructor(usuarioRepository: Repository<Usuario>, jwtService: JwtService);
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
