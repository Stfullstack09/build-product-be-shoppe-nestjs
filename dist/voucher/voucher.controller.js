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
exports.VoucherController = void 0;
const common_1 = require("@nestjs/common");
const voucher_service_1 = require("./voucher.service");
const createVoucherAdmin_dto_1 = require("./dto/createVoucherAdmin.dto");
const enum_1 = require("../utils/enum");
let VoucherController = class VoucherController {
    constructor(voucherService) {
        this.voucherService = voucherService;
    }
    shoppeCreateVoucher(createVoucherAdminDTO) {
        return this.voucherService.shoppeCreateVoucher(createVoucherAdminDTO);
    }
    getAllVouchersShoppe(is_expire = '', is_global = '', page = 1, pageSize = 1) {
        return this.voucherService.getAllVouchersShoppe(is_expire, is_global, {
            limit: pageSize,
            page: page,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_ALL_VOUCHER_SHOPPE,
        });
    }
};
exports.VoucherController = VoucherController;
__decorate([
    (0, common_1.Post)('/shoppe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createVoucherAdmin_dto_1.createVoucherAdminDTO]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "shoppeCreateVoucher", null);
__decorate([
    (0, common_1.Get)('/shoppe'),
    __param(0, (0, common_1.Query)('is_expire')),
    __param(1, (0, common_1.Query)('is_global')),
    __param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "getAllVouchersShoppe", null);
exports.VoucherController = VoucherController = __decorate([
    (0, common_1.Controller)('voucher'),
    __metadata("design:paramtypes", [voucher_service_1.VoucherService])
], VoucherController);
//# sourceMappingURL=voucher.controller.js.map