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
exports.JwtShopMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const lodash_1 = require("lodash");
const Respone_1 = require("../helpers/Respone");
const enum_1 = require("../utils/enum");
let JwtShopMiddleware = class JwtShopMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        console.log('role shop');
        if (req && !(0, lodash_1.isEmpty)(req.cookies)) {
            const access_token = req.cookies.access_token;
            if (!access_token) {
                throw new common_1.HttpException('Access_Token is a required parameter | Access_Token là tham số bắt buộc!', common_1.HttpStatus.UNAUTHORIZED);
            }
            try {
                const checkAccessToken = await this.jwtService.verifyAsync(access_token);
                if (checkAccessToken.role === enum_1.EntitiesEnum.role_shop) {
                    if (checkAccessToken.isBlocked) {
                        return res.status(common_1.HttpStatus.FORBIDDEN).json((0, Respone_1.sendResponseBlockUser)());
                    }
                    else {
                        req.user = checkAccessToken;
                        next();
                    }
                }
                else {
                    res.status(common_1.HttpStatus.FORBIDDEN).json((0, Respone_1.sendResponse)({
                        statusCode: common_1.HttpStatus.OK,
                        message: 'Role does not exist',
                    }));
                }
            }
            catch (error) {
                throw new common_1.UnauthorizedException();
            }
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.JwtShopMiddleware = JwtShopMiddleware;
exports.JwtShopMiddleware = JwtShopMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtShopMiddleware);
//# sourceMappingURL=jwtShop.js.map