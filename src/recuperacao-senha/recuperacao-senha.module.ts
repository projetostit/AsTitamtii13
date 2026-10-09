import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecuperacaoSenha } from './recuperacao.entity';
import { RecuperacaoService } from './recuperacao.service';
import { RecuperacaoSenhaController } from './recuperacao.controller';
import { Usuario } from '../usuario/usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RecuperacaoSenha,
            Usuario,
        ]),
    ],
    controllers: [RecuperacaoSenhaController],
    providers: [RecuperacaoService],
})
export class RecuperacaoSenhaModule { }