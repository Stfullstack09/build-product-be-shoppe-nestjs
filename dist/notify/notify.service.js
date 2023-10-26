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
exports.NotifyService = void 0;
const User_1 = require("./../typeORM/entities/User");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const Respone_1 = require("../helpers/Respone");
const Notify_1 = require("../typeORM/entities/Notify");
const typeorm_2 = require("typeorm");
let NotifyService = class NotifyService {
    constructor(notifyRepository, userRepository) {
        this.notifyRepository = notifyRepository;
        this.userRepository = userRepository;
    }
    async getNotification(user, options) {
        const checkUser = await this.userRepository.findOne({
            where: {
                email: user.email,
                id: user.id,
            },
        });
        if (!checkUser) {
            throw new common_1.BadRequestException();
        }
        return await (0, nestjs_typeorm_paginate_1.paginate)(this.notifyRepository, options, {
            where: {
                user: checkUser,
            },
            order: {
                created_At: 'DESC',
            },
        });
    }
    async updateIsViewNotification(updateViewTrueDTO) {
        await this.notifyRepository.update(updateViewTrueDTO.id, {
            is_view: true,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Bạn đã update thành công!',
        });
    }
};
exports.NotifyService = NotifyService;
exports.NotifyService = NotifyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Notify_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotifyService);
//# sourceMappingURL=notify.service.js.map