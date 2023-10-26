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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const lodash_1 = require("lodash");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        if (req && !(0, lodash_1.isEmpty)(req.cookies)) {
            const access_token = req.cookies.access_token;
            const refresh_token = req.cookies.refresh_token;
            if (!access_token || !refresh_token) {
                throw new common_1.HttpException('Access_Token and refresh_token are a required parameter | Access_Token và refresh_token là tham số bắt buộc!', common_1.HttpStatus.UNAUTHORIZED);
            }
            try {
                const checkAccessToken = await this.jwtService.verifyAsync(access_token, {
                    ignoreExpiration: true,
                });
                const checkRefreshToken = await this.jwtService.verifyAsync(refresh_token);
                if (checkRefreshToken.id === checkAccessToken.id) {
                    req.user = checkAccessToken;
                    next();
                }
                else {
                    throw new common_1.UnauthorizedException();
                }
            }
            catch (error) {
                throw new common_1.HttpException('Your access_token has expired, please try again later | Access_token của bạn đã hết hạn vui lòng thử lại sau!', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map