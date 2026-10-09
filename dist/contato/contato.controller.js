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
exports.ContatoController = void 0;
const common_1 = require("@nestjs/common");
const contato_service_1 = require("./contato.service");
let ContatoController = class ContatoController {
    contatoService;
    constructor(contatoService) {
        this.contatoService = contatoService;
    }
    enviar(nome, email, curso_area_interesse, mensagem) {
        return this.contatoService.enviar(nome, email, curso_area_interesse, mensagem);
    }
};
exports.ContatoController = ContatoController;
__decorate([
    (0, common_1.Post)('enviar'),
    __param(0, (0, common_1.Body)('nome')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('curso_area_interesse')),
    __param(3, (0, common_1.Body)('mensagem')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ContatoController.prototype, "enviar", null);
exports.ContatoController = ContatoController = __decorate([
    (0, common_1.Controller)('contato'),
    __metadata("design:paramtypes", [contato_service_1.ContatoService])
], ContatoController);
//# sourceMappingURL=contato.controller.js.map