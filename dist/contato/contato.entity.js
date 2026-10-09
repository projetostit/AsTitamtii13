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
exports.Contato = void 0;
const typeorm_1 = require("typeorm");
let Contato = class Contato {
    id_contato;
    nome;
    email;
    curso_area_interesse;
    mensagem;
};
exports.Contato = Contato;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_contato' }),
    __metadata("design:type", Number)
], Contato.prototype, "id_contato", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', length: 100 }),
    __metadata("design:type", String)
], Contato.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', length: 150 }),
    __metadata("design:type", String)
], Contato.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'curso_area_interesse',
        length: 150,
        nullable: true,
    }),
    __metadata("design:type", String)
], Contato.prototype, "curso_area_interesse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mensagem', type: 'text' }),
    __metadata("design:type", String)
], Contato.prototype, "mensagem", void 0);
exports.Contato = Contato = __decorate([
    (0, typeorm_1.Entity)('contato')
], Contato);
//# sourceMappingURL=contato.entity.js.map