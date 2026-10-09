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
exports.ContatoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contato_entity_1 = require("./contato.entity");
const validacao_1 = require("../common/validacao");
let ContatoService = class ContatoService {
    contatoRepository;
    constructor(contatoRepository) {
        this.contatoRepository = contatoRepository;
    }
    async enviar(nome, email, curso_area_interesse, mensagem) {
        nome = (0, validacao_1.texto)(nome, 'Nome', 100);
        email = (0, validacao_1.emailValido)(email);
        mensagem = (0, validacao_1.texto)(mensagem, 'Mensagem', 10000);
        curso_area_interesse = curso_area_interesse ? (0, validacao_1.texto)(curso_area_interesse, 'Curso / Área de interesse', 150) : '';
        const contato = this.contatoRepository.create({
            nome,
            email,
            curso_area_interesse,
            mensagem,
        });
        const contatoSalvo = await this.contatoRepository.save(contato);
        return {
            mensagem: 'Mensagem enviada com sucesso',
            id_contato: contatoSalvo.id_contato,
        };
    }
};
exports.ContatoService = ContatoService;
exports.ContatoService = ContatoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contato_entity_1.Contato)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContatoService);
//# sourceMappingURL=contato.service.js.map