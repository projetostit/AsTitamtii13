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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecuperacaoSenha = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../usuario/usuario.entity");
let RecuperacaoSenha = class RecuperacaoSenha {
    id_recuperacao;
    id_usuario;
    token;
    data_expiracao;
    usuario;
};
exports.RecuperacaoSenha = RecuperacaoSenha;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_recuperacao' }),
    __metadata("design:type", Number)
], RecuperacaoSenha.prototype, "id_recuperacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_usuario', unique: true }),
    __metadata("design:type", Number)
], RecuperacaoSenha.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token', length: 255 }),
    __metadata("design:type", String)
], RecuperacaoSenha.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_expiracao', type: 'datetime' }),
    __metadata("design:type", Date)
], RecuperacaoSenha.prototype, "data_expiracao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], RecuperacaoSenha.prototype, "usuario", void 0);
exports.RecuperacaoSenha = RecuperacaoSenha = __decorate([
    (0, typeorm_1.Entity)('recuperacao_senha')
], RecuperacaoSenha);
//# sourceMappingURL=recuperacao.entity.js.map