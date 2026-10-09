import { Usuario } from '../usuario/usuario.entity';
export declare class RecuperacaoSenha {
    id_recuperacao: number;
    id_usuario: number;
    token: string;
    data_expiracao: Date;
    usuario: Usuario;
}
