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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../typeORM/entities/User");
const typeorm_2 = require("typeorm");
const SessionSerializerUser_dto_1 = require("./DTO/SessionSerializerUser.dto");
const Respone_1 = require("../helpers/Respone");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const HttpBlocked_1 = require("../helpers/HttpBlocked");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getCurrentUserByEmailAndID(data) {
        const user = await this.userRepository.findOne({
            where: {
                id: data.id,
                email: data.email,
            },
            relations: [
                'address',
                'like',
                'evaluates',
                'followers',
                'voichers',
                'notifications',
                'shop_manage',
                'loginHistories',
                'verifyUser',
                'admin_shop',
            ],
        });
        if (!user) {
            throw new common_1.HttpException('Your account does not exist in the system | Tài khoản của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.NOT_FOUND);
        }
        return new SessionSerializerUser_dto_1.userSessionSerializerDTO(user);
    }
    async RoleCurrentUser(req) {
        const userRequest = req.user;
        const checkUser = await this.userRepository.findOne({
            where: {
                email: userRequest.email,
                id: userRequest.id,
            },
        });
        if (!checkUser) {
            throw new common_1.HttpException('Your account does not exist in the system, please try again later | Tài khoản của bạn không tồn tại trong hệ thống vui lòng thử lại sau!', common_1.HttpStatus.NOT_FOUND);
        }
        else if (checkUser.isBlocked) {
            throw new HttpBlocked_1.HttpBlockedUser();
        }
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Get Info Role Current User Successfully',
            data: {
                role: checkUser.role,
                isSuperAdmin: checkUser.isSuperAdmin,
            },
        });
    }
    async findAllUser(options) {
        const paginatedUsers = await (0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, options, {
            where: {
                isSuperAdmin: false,
            },
            relations: ['admin_shop'],
        });
        const usersDTO = paginatedUsers.items.map((user) => new SessionSerializerUser_dto_1.userSessionSerializerDTO(user));
        return {
            items: usersDTO,
            meta: paginatedUsers.meta,
            links: paginatedUsers.links,
        };
    }
    async findAllUserBlocked(options) {
        const paginatedUsers = await (0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, options, {
            where: {
                isBlocked: true,
                isSuperAdmin: false,
            },
            relations: ['admin_shop'],
        });
        const usersDTO = paginatedUsers.items.map((user) => new SessionSerializerUser_dto_1.userSessionSerializerDTO(user));
        return {
            items: usersDTO,
            meta: paginatedUsers.meta,
            links: paginatedUsers.links,
        };
    }
    async blockedUsers(userDTO) {
        await this.userRepository.update(userDTO.id, {
            isBlocked: true,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Users have been blocked | Users đã được blocked!',
        });
    }
    async unBlockedUsers(userDTO) {
        await this.userRepository.update(userDTO.id, {
            isBlocked: false,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Users have been Unblocked | Users đã được loại bỏ blocked!',
        });
    }
    async searchUsers(dataSearch, options) {
        const paginatedUsers = await (0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, options, {
            where: [
                { userName: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
                { fullName: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
                { email: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
                { phoneNumber: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
                { isSuperAdmin: false },
            ],
        });
        const usersDTO = paginatedUsers.items.map((user) => new SessionSerializerUser_dto_1.userSessionSerializerDTO(user));
        return {
            items: usersDTO,
            meta: paginatedUsers.meta,
            links: paginatedUsers.links,
        };
    }
    async detailUser(email) {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
            relations: ['address', 'shop_manage', 'loginHistories', 'admin_shop'],
        });
        if (!user) {
            throw new common_1.HttpException('Your account does not exist in the system | Tài khoản của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.NOT_FOUND);
        }
        return new SessionSerializerUser_dto_1.userSessionSerializerDTO(user);
    }
    getOneUserByEmailAndId(email, id) {
        return this.userRepository.findOne({
            where: {
                email,
                id,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map