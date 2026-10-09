import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { Usuario } from './usuario/usuario.entity';
import { Contato } from './contato/contato.entity';
import { Newsletter } from './newsletter/newsletter.entity';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { AutenticacaoController } from './autenticacao/autenticacao.controller';
import { AutenticacaoService } from './autenticacao/autenticacao.service';
import { ContatoController } from './contato/contato.controller';
import { ContatoService } from './contato/contato.service';
import { NewsletterController } from './newsletter/newsletter.controller';
import { NewsletterService } from './newsletter/newsletter.service';

describe('Integração HTTP dos formulários (repositórios em memória)', () => {
  let app: INestApplication;
  function repository(id: string) {
    const rows: Record<string, unknown>[] = [];
    return {
      create: (data: Record<string, unknown>) => ({ ...data }),
      save: async (data: Record<string, unknown>) => {
        const row = { ...data, [id]: rows.length + 1 };
        rows.push(row);
        return row;
      },
      findOne: async ({ where }: { where: Record<string, unknown> }) =>
        rows.find(row => Object.entries(where).every(([key, value]) => row[key] === value)) || null,
    };
  }
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsuarioController, AutenticacaoController, ContatoController, NewsletterController],
      providers: [
        UsuarioService, AutenticacaoService, ContatoService, NewsletterService,
        { provide: getRepositoryToken(Usuario), useValue: repository('id_usuario') },
        { provide: getRepositoryToken(Contato), useValue: repository('id_contato') },
        { provide: getRepositoryToken(Newsletter), useValue: repository('id_newsletter') },
        { provide: JwtService, useValue: new JwtService({ secret: 'integration-test-only', signOptions: { expiresIn: '1h' } }) },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });
  afterEach(async () => { await app.close(); });
  it('cadastra, autentica, consulta perfil, recebe contato e inscreve newsletter', async () => {
    const server = app.getHttpServer();
    const user = { nome: 'Yasmim', email: 'YASMIM@example.com', senha: 'teste-seguro' };
    const cadastro = await request(server).post('/usuario/cadastrar').send(user).expect(201);
    expect(cadastro.body).toEqual({ id_usuario: 1, nome: 'Yasmim', email: 'yasmim@example.com' });
    await request(server).post('/usuario/cadastrar').send(user).expect(409);
    await request(server).post('/autenticacao/login').send({ ...user, senha: 'incorreta' }).expect(401);
    const login = await request(server).post('/autenticacao/login').send(user).expect(201);
    expect(login.body.access_token).toEqual(expect.any(String));
    const perfil = await request(server).get('/autenticacao/me')
      .set('Authorization', 'Bearer ' + login.body.access_token).expect(200);
    expect(perfil.body).toEqual(cadastro.body);
    await request(server).get('/autenticacao/me').expect(401);
    await request(server).get('/autenticacao/me').set('Authorization', 'Bearer invalido').expect(401);
    const expired = new JwtService({ secret: 'integration-test-only' }).sign({ sub: 1 }, { expiresIn: -1 });
    await request(server).get('/autenticacao/me').set('Authorization', 'Bearer ' + expired).expect(401);
    const contato = await request(server).post('/contato/enviar').send({
      nome: user.nome, email: user.email, curso_area_interesse: 'Tecnologia', mensagem: 'Quero participar.',
    }).expect(201);
    expect(contato.body.id_contato).toBe(1);
    const newsletter = await request(server).post('/newsletter/inscrever').send({ email: user.email }).expect(201);
    expect(newsletter.body.id_usuario).toBe(1);
    const repeated = await request(server).post('/newsletter/inscrever').send({ email: user.email }).expect(201);
    expect(repeated.body.mensagem).toContain('já está inscrito');
    await request(server).post('/newsletter/inscrever').send({ email: 'ausente@example.com' }).expect(400);
  });
  it('rejeita campos ausentes, e-mail inválido e mensagens vazias', async () => {
    const server = app.getHttpServer();
    await request(server).post('/usuario/cadastrar').send({}).expect(400);
    await request(server).post('/usuario/cadastrar').send({ nome: 'Teste', email: 'invalido', senha: 'teste' }).expect(400);
    await request(server).post('/autenticacao/login').send({}).expect(400);
    await request(server).post('/contato/enviar').send({ nome: 'Teste', email: 'teste@example.com', mensagem: ' ' }).expect(400);
    await request(server).post('/newsletter/inscrever').send({}).expect(400);
  });
});
