
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ContatoModule } from './contato/contato.module';
import { RecuperacaoSenhaModule } from './recuperacao-senha/recuperacao-senha.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    DatabaseModule,
    UsuarioModule,
    AutenticacaoModule,
    NewsletterModule,
    ContatoModule,
    RecuperacaoSenhaModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
