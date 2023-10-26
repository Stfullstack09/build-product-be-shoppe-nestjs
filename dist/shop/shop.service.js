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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Shop_1 = require("../typeORM/entities/Shop");
const User_1 = require("../typeORM/entities/User");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const slugify_1 = require("slugify");
const Notify_1 = require("../typeORM/entities/Notify");
const mailler_service_1 = require("../mailler/mailler.service");
const enum_1 = require("../utils/enum");
const Respone_1 = require("../helpers/Respone");
const userNotExits_1 = require("../helpers/userNotExits");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let ShopService = class ShopService {
    constructor(userRepository, shopRepository, notifyRepository, mailService) {
        this.userRepository = userRepository;
        this.shopRepository = shopRepository;
        this.notifyRepository = notifyRepository;
        this.mailService = mailService;
    }
    async registerShop(dataRegister, req) {
        const checkUser = req.user;
        if (!checkUser) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.userRepository.findOne({
            where: {
                email: checkUser.email,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const checkUserHasShop = await this.shopRepository.findOne({
            where: {
                admin_shop: user,
            },
        });
        if (checkUserHasShop) {
            throw new common_1.HttpException('Tài Khoản Đã Được Đăng Ký Một Shop Khác!', common_1.HttpStatus.CONFLICT);
        }
        const uid_shop = (0, uuid_1.v4)();
        const shopCreate = this.shopRepository.create({
            name: dataRegister.name,
            address: dataRegister.address,
            admin_shop: user,
            shop_uuid: uid_shop,
            slug: `${(0, slugify_1.default)(dataRegister.name)}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
        });
        const shopeSave = await this.shopRepository.save({
            ...shopCreate,
        });
        await this.userRepository.save({
            ...user,
            admin_shop: shopeSave,
        });
        delete shopeSave.shop_uuid;
        if (shopeSave.admin_shop) {
            delete shopeSave.admin_shop.password;
        }
        const creteNotify = this.notifyRepository.create({
            title: 'Thông tin đăng ký shop của bạn đã được tiếp nhận',
            description: 'bạn hãy vui lòng kiểm tra email và xác nhận để đảm bảo Shoppe có thể nhìn thấ bạn!',
            time: new Date(),
            user: user,
            slug: `${(0, slugify_1.default)('Thong tin đang ky shop cua ban da duoc tiep nhan')}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
        });
        await this.notifyRepository.save({
            ...creteNotify,
        });
        await this.mailService.sendEmailVerifyRegisterShop({
            email: user.email,
            from: 'Vui lòng không trả lời email này!',
            subject: '(SHOPPE) Xác Thực Shop',
            link: `${enum_1.ConfigEnum.URL_BACKEND}/shop/verify-email?token=${uid_shop}&email=${user.email}&id=${shopeSave.id}`,
        });
        return shopeSave;
    }
    async verifyShopByAdmin(data) {
        const checkShopExists = await this.shopRepository.findOne({
            where: {
                id: data.id,
                shop_uuid: data.shop_uuid,
                slug: data.slug,
            },
            relations: ['admin_shop'],
        });
        if (!checkShopExists) {
            throw new common_1.NotFoundException();
        }
        else if (checkShopExists.is_verified) {
            throw new common_1.HttpException('You have verified, please do not repeat the operation | Bạn đã xác thực vui lòng không lặp lại thao tác!', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (!checkShopExists.isMail) {
            throw new common_1.HttpException('Shop has not verified email cannot be verified | Shop chưa xác thực emai không thể xác thực!', common_1.HttpStatus.BAD_REQUEST);
        }
        if (checkShopExists.admin_shop) {
            const creteNotify = this.notifyRepository.create({
                title: 'Shop Của Bạn Đã Được Shoppe Xác Nhận',
                description: 'giờ đây bạn có thể đăng các sản phẩm để bán hàng ngay nhé 😉',
                time: new Date(),
                user: checkShopExists.admin_shop,
                slug: `${(0, slugify_1.default)('Shop Của Bạn Đã Được Shoppe Xác Nhận')}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
            });
            await this.notifyRepository.save({
                ...creteNotify,
            });
            await this.userRepository.save({
                ...checkShopExists.admin_shop,
                role: enum_1.EntitiesEnum.role_shop,
            });
        }
        await this.shopRepository.save({
            ...checkShopExists,
            is_verified: true,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'You have successfully verified the shop | Bạn đã xác minh shop thành công!',
        });
    }
    async verifyEmail(data) {
        const [checkShopExists, checkUserExits] = await Promise.all([
            this.shopRepository.findOne({
                where: {
                    shop_uuid: data.token,
                    id: data.id,
                },
                relations: ['admin_shop'],
            }),
            this.userRepository.findOne({
                where: {
                    email: data.email,
                },
            }),
        ]);
        if (!checkShopExists.admin_shop || !checkUserExits) {
            throw new common_1.NotFoundException();
        }
        else if (checkShopExists.isMail) {
            throw new common_1.HttpException('You have already verified your email, please do not repeat the operation | Bạn đã xác thực email rồi vui lòng không lặp lại thao tác!', common_1.HttpStatus.BAD_REQUEST);
        }
        if (checkShopExists.admin_shop.email !== checkUserExits.email) {
            throw new common_1.HttpException('Your email is not the owner of this shop | Email của bạn không phải là chủ của shop này!', common_1.HttpStatus.FORBIDDEN);
        }
        await this.shopRepository.save({
            ...checkShopExists,
            isMail: true,
        });
        const creteNotify = this.notifyRepository.create({
            title: 'Bạn đã xác nhận thành công email SHOP',
            description: 'giờ chỉ cần SHOP chấp nhận bạn có thể đăng tải sản phẩm và tìm kiếm khách hàng ngay!😉❤',
            time: new Date(),
            user: checkUserExits,
            slug: `${(0, slugify_1.default)('giờ chỉ cần SHOP chấp nhận bạn có thể đăng tải sản phẩm và tìm kiếm khách hàng ngay')}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
        });
        await this.notifyRepository.save({
            ...creteNotify,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'You have successfully authenticated your email | Bạn đã xác thực email thành công!',
        });
    }
    async currentShop(req) {
        const userRequest = req.user;
        const user = await this.userRepository.findOne({
            where: {
                id: userRequest.id,
                email: userRequest.email,
            },
        });
        if (!user) {
            throw new userNotExits_1.HttpUserNotExits();
        }
        const shopExit = await this.shopRepository.findOne({
            where: {
                admin_shop: user,
            },
            relations: ['admin_shop'],
        });
        if (!shopExit) {
            throw new common_1.HttpException('Your store does not exist in the system | Shop của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            delete shopExit.admin_shop.password;
        }
        return shopExit;
    }
    async getInfoShop(InfoShopDTO) {
        const shop = await this.shopRepository.findOne({
            where: {
                id: InfoShopDTO.id,
                slug: InfoShopDTO.slug,
            },
        });
        if (!shop) {
            throw new common_1.HttpException('Your store does not exist in the system | Shop của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            delete shop.shop_uuid;
        }
        return shop;
    }
    async shopNotVerify(options) {
        const shops = await (0, nestjs_typeorm_paginate_1.paginate)(this.shopRepository, options, {
            where: {
                is_verified: false,
            },
            order: {
                created_At: 'DESC',
            },
        });
        return shops;
    }
    async getShopVerify(options) {
        const shops = await (0, nestjs_typeorm_paginate_1.paginate)(this.shopRepository, options, {
            where: {
                is_verified: true,
            },
            order: {
                created_At: 'DESC',
            },
        });
        return shops;
    }
    async searchShop(dataSearch, options) {
        const paginatedShop = await (0, nestjs_typeorm_paginate_1.paginate)(this.shopRepository, options, {
            where: [
                { name: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
                { slug: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
                { address: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
                { shop_uuid: (0, typeorm_2.Like)(`%${dataSearch.q}%`) },
            ],
        });
        return paginatedShop;
    }
    async blockShopByAdmin(blockedDTO) {
        await this.shopRepository.update(blockedDTO.id, {
            is_blocked: true,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'ok',
        });
    }
    async unBlockShopByAdmin(blockedDTO) {
        await this.shopRepository.update(blockedDTO.id, {
            is_blocked: false,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'ok',
        });
    }
    async getShopByUUID(infoShopByAdminDTO) {
        const shop = await this.shopRepository.findOne({
            where: {
                shop_uuid: infoShopByAdminDTO.shop_uuid,
            },
            relations: ['admin_shop', 'user'],
        });
        if (!shop) {
            throw new common_1.NotFoundException();
        }
        else {
            delete shop.admin_shop.password;
        }
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'ok',
            data: shop,
        });
    }
    async toggleSellByAdmin(toggleSellDTO) {
        await this.shopRepository.update(toggleSellDTO.id, {
            is_sell: toggleSellDTO.type === 'blocked-sell' ? false : true,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'ok',
        });
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Shop_1.Shop)),
    __param(2, (0, typeorm_1.InjectRepository)(Notify_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailler_service_1.MaillerService])
], ShopService);
//# sourceMappingURL=shop.service.js.map