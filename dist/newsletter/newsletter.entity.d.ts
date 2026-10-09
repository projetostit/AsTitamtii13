import { Usuario } from '../usuario/usuario.entity';
export declare class Newsletter {
    id_newsletter: number;
    id_usuario: number;
    data_inscricao: Date;
    usuario: Usuario;
}
