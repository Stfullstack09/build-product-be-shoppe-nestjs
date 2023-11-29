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
exports.VoucherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const Respone_1 = require("../helpers/Respone");
const Voucher_1 = require("../typeORM/entities/Voucher");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
let VoucherService = class VoucherService {
    constructor(voucherRepository) {
        this.voucherRepository = voucherRepository;
    }
    async shoppeCreateVoucher(data) {
        const uuID = (0, uuid_1.v4)();
        const label_code_voucher = uuID.slice(-7);
        const voucherCreate = this.voucherRepository.create({
            label: data.label,
            discount: data.discount,
            max_price_discount: data.max_price_discount,
            expires_at: new Date(data.expires_at),
            is_global_shoppe: data.is_global_shoppe,
            label_code_voucher,
            code_voucher: uuID,
            count_init: data.is_unlimited_use ? 0 : data.count_init,
            price_order_min: data.price_order_min,
            is_unlimited_use: data.is_unlimited_use,
        });
        await this.voucherRepository.save(voucherCreate);
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Bạn đã tạo thành công!',
        });
    }
    async getAllVouchersShoppe(is_expire, is_global, option) {
        const condition = {};
        if (!is_expire || is_expire !== 'false') {
            condition.expires_at = (0, typeorm_2.MoreThanOrEqual)(new Date());
        }
        if (!is_global || is_global === 'true') {
            condition.is_global_shoppe = true;
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(this.voucherRepository, option, {
            where: {
                ...condition,
            },
        });
    }
};
exports.VoucherService = VoucherService;
exports.VoucherService = VoucherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Voucher_1.Voucher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VoucherService);
//# sourceMappingURL=voucher.service.js.map