"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../typeORM/entities/User");
const suipperAdmin_middleware_1 = require("../middlewares/suipperAdmin.middleware");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
let UsersModule = class UsersModule {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: '/users/all-users',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/users/blocked',
            method: common_1.RequestMethod.ALL,
        }, {
            path: '/users/un-blocked',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/users/search',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/users/detail',
            method: common_1.RequestMethod.GET,
        })
            .forRoutes(users_controller_1.UsersController)
            .apply(suipperAdmin_middleware_1.SupperAdminMiddleware)
            .forRoutes({
            path: '/users/all-users',
            method: common_1.RequestMethod.ALL,
        }, {
            path: '/users/blocked',
            method: common_1.RequestMethod.ALL,
        }, {
            path: '/users/un-blocked',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/users/search',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/users/detail',
            method: common_1.RequestMethod.GET,
        });
    }
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.User])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map