"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const usuario_entity_1 = require("../usuario/usuario.entity");
const validacao_1 = require("../common/validacao");
let AutenticacaoService = class AutenticacaoService {
    usuarioRepository;
    jwtService;
    constructor(usuarioRepository, jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
    }
    async perfil(authorization) {
        const token = authorization?.match(/^Bearer (\S+)$/i)?.[1];
        if (!token)
            throw new common_1.UnauthorizedException('Faça login para continuar.');
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Sua sessão expirou. Entre novamente.');
        }
        if (!Number.isInteger(payload.sub))
            throw new common_1.UnauthorizedException();
        const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: payload.sub } });
        if (!usuario)
            throw new common_1.UnauthorizedException();
        return { id_usuario: usuario.id_usuario, nome: usuario.nome, email: usuario.email };
    }
    async login(email, senha) {
        email = (0, validacao_1.emailValido)(email);
        senha = (0, validacao_1.senhaValida)(senha);
        const usuario = await this.usuarioRepository.findOne({
            where: { email },
        });
        if (!usuario ||
            !(await bcrypt.compare(senha, usuario.senha))) {
            throw new common_1.UnauthorizedException('E-mail ou senha inválidos');
        }
        const access_token = await this.jwtService.signAsync({
            sub: usuario.id_usuario,
            email: usuario.email,
        });
        return {
            mensagem: 'Login realizado com sucesso',
            access_token,
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
        };
    }
};
exports.AutenticacaoService = AutenticacaoService;
exports.AutenticacaoService = AutenticacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AutenticacaoService);
//# sourceMappingURL=autenticacao.service.js.map