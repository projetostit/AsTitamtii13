import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Newsletter } from './newsletter.entity';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Newsletter, Usuario])],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
