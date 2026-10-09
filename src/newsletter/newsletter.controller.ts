import { Body, Controller, Post } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
 
@Controller('newsletter')
export class NewsletterController {
  constructor(
    private readonly newsletterService: NewsletterService,
  ) {}
 
  @Post('inscrever')
  inscrever(@Body('id_usuario') id_usuario: number) {
    return this.newsletterService.inscrever(id_usuario);
  }
}
 