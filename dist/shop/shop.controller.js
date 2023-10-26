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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const shop_service_1 = require("./shop.service");
const registerShop_dto_1 = require("./DTO/registerShop.dto");
const verifyShop_dto_1 = require("./DTO/verifyShop.dto");
const verifyEmail_dto_1 = require("./DTO/verifyEmail.dto");
const infoShop_dto_1 = require("./DTO/infoShop.dto");
const enum_1 = require("../utils/enum");
const searchDTO_1 = require("./DTO/searchDTO");
const blocked_dto_1 = require("./DTO/blocked.dto");
const infoShopByAdmin_dto_1 = require("./DTO/infoShopByAdmin.dto");
const toggleSell_dto_1 = require("./DTO/toggleSell.dto");
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    registerShop(registerShopDTO, req) {
        return this.shopService.registerShop(registerShopDTO, req);
    }
    verifyShopByAdmin(verifyShopDTO) {
        return this.shopService.verifyShopByAdmin(verifyShopDTO);
    }
    verifyEmail(verifyEmailDTO) {
        return this.shopService.verifyEmail(verifyEmailDTO);
    }
    getCurrentShop(req) {
        return this.shopService.currentShop(req);
    }
    getInfoShop(InfoShopDTO) {
        return this.shopService.getInfoShop(InfoShopDTO);
    }
    getShopByUUID(infoShopByAdminDTO) {
        return this.shopService.getShopByUUID(infoShopByAdminDTO);
    }
    notVerifyShop(page = 1, pageSize = 1) {
        return this.shopService.shopNotVerify({
            page: page,
            limit: pageSize,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_SHOP_NOT_VERIFY,
        });
    }
    getShopVerify(page = 1, pageSize = 1) {
        return this.shopService.getShopVerify({
            page: page,
            limit: pageSize,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_SHOP_VERIFY,
        });
    }
    searchShop(searchDTO, page = 1, pageSize = 1) {
        return this.shopService.searchShop(searchDTO, {
            limit: pageSize,
            page: page,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_SHOP_SEARCH,
        });
    }
    blockShopByAdmin(blockedDTO) {
        return this.shopService.blockShopByAdmin(blockedDTO);
    }
    unBlockShopByAdmin(blockedDTO) {
        return this.shopService.unBlockShopByAdmin(blockedDTO);
    }
    toggleSellByAdmin(toggleSellDTO) {
        return this.shopService.toggleSellByAdmin(toggleSellDTO);
    }
};
exports.ShopController = ShopController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerShop_dto_1.registerShopDTO, Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "registerShop", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyShop_dto_1.verifyShopDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "verifyShopByAdmin", null);
__decorate([
    (0, common_1.Get)('verify-email'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyEmail_dto_1.verifyEmailDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getCurrentShop", null);
__decorate([
    (0, common_1.Get)('/tricker/:slug/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [infoShop_dto_1.InfoShopDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getInfoShop", null);
__decorate([
    (0, common_1.Get)('/info/:shop_uuid'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [infoShopByAdmin_dto_1.infoShopByAdminDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getShopByUUID", null);
__decorate([
    (0, common_1.Get)('notverify'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "notVerifyShop", null);
__decorate([
    (0, common_1.Get)('verify'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getShopVerify", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchDTO_1.searchDTO, Number, Number]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "searchShop", null);
__decorate([
    (0, common_1.Put)('/blocked'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blocked_dto_1.blockedDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "blockShopByAdmin", null);
__decorate([
    (0, common_1.Put)('/unblocked'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blocked_dto_1.blockedDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "unBlockShopByAdmin", null);
__decorate([
    (0, common_1.Put)('/sell-toggle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [toggleSell_dto_1.toggleSellDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "toggleSellByAdmin", null);
exports.ShopController = ShopController = __decorate([
    (0, common_1.Controller)('shop'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
//# sourceMappingURL=shop.controller.js.map