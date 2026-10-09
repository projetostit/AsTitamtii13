"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecuperacaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crypto_1 = require("crypto");
const recuperacao_entity_1 = require("./recuperacao.entity");
const usuario_entity_1 = require("../usuario/usuario.entity");
let RecuperacaoService = class RecuperacaoService {
    recuperacaoRepository;
    usuarioRepository;
    constructor(recuperacaoRepository, usuarioRepository) {
        this.recuperacaoRepository = recuperacaoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async solicitar(email) {
        const usuario = await this.usuarioRepository.findOne({
            where: { email },
        });
        if (!usuario) {
            return {
                mensagem: 'E-mail não encontrado',
            };
        }
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const dataExpiracao = new Date();
        dataExpiracao.setMinutes(dataExpiracao.getMinutes() + 15);
        const recuperacaoExistente = await this.recuperacaoRepository.findOne({
            where: { id_usuario: usuario.id_usuario },
        });
        if (recuperacaoExistente) {
            recuperacaoExistente.token = token;
            recuperacaoExistente.data_expiracao = dataExpiracao;
            await this.recuperacaoRepository.save(recuperacaoExistente);
        }
        else {
            const recuperacao = this.recuperacaoRepository.create({
                id_usuario: usuario.id_usuario,
                token,
                data_expiracao: dataExpiracao,
            });
            await this.recuperacaoRepository.save(recuperacao);
        }
        return {
            mensagem: 'Token de recuperação gerado com sucesso',
        };
    }
};
exports.RecuperacaoService = RecuperacaoService;
exports.RecuperacaoService = RecuperacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recuperacao_entity_1.RecuperacaoSenha)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RecuperacaoService);
//# sourceMappingURL=recuperacao.service.js.map