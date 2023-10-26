"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const User_1 = require("../typeORM/entities/User");
const LoginHistory_1 = require("./../typeORM/entities/LoginHistory");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const mailler_service_1 = require("../mailler/mailler.service");
const Verify_1 = require("../typeORM/entities/Verify");
const const_1 = require("../utils/const");
const auth_middleware_1 = require("./middlewares/auth.middleware");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({
            path: '/auth/refresh-token',
            method: common_1.RequestMethod.GET,
        });
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: const_1.constants.jwtConstants,
            }),
            typeorm_1.TypeOrmModule.forFeature([User_1.User, LoginHistory_1.LoginHistory, Verify_1.VerifyUser]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, mailler_service_1.MaillerService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map