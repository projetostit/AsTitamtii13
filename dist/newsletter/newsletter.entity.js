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
exports.Newsletter = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../usuario/usuario.entity");
let Newsletter = class Newsletter {
    id_newsletter;
    id_usuario;
    data_inscricao;
    usuario;
};
exports.Newsletter = Newsletter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_newsletter' }),
    __metadata("design:type", Number)
], Newsletter.prototype, "id_newsletter", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_usuario', unique: true }),
    __metadata("design:type", Number)
], Newsletter.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'data_inscricao',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Newsletter.prototype, "data_inscricao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Newsletter.prototype, "usuario", void 0);
exports.Newsletter = Newsletter = __decorate([
    (0, typeorm_1.Entity)('newsletter')
], Newsletter);
//# sourceMappingURL=newsletter.entity.js.map