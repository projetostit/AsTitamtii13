"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecuperacaoSenhaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recuperacao_entity_1 = require("./recuperacao.entity");
const recuperacao_service_1 = require("./recuperacao.service");
const recuperacao_controller_1 = require("./recuperacao.controller");
const usuario_entity_1 = require("../usuario/usuario.entity");
let RecuperacaoSenhaModule = class RecuperacaoSenhaModule {
};
exports.RecuperacaoSenhaModule = RecuperacaoSenhaModule;
exports.RecuperacaoSenhaModule = RecuperacaoSenhaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                recuperacao_entity_1.RecuperacaoSenha,
                usuario_entity_1.Usuario,
            ]),
        ],
        controllers: [recuperacao_controller_1.RecuperacaoSenhaController],
        providers: [recuperacao_service_1.RecuperacaoService],
    })
], RecuperacaoSenhaModule);
//# sourceMappingURL=recuperacao-senha.module.js.map