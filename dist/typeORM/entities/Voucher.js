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
exports.Voucher = void 0;
const typeorm_1 = require("typeorm");
let Voucher = class Voucher {
};
exports.Voucher = Voucher;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Voucher.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', {
        unique: true,
    }),
    __metadata("design:type", String)
], Voucher.prototype, "code_voucher", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voucher.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Voucher.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Voucher.prototype, "max_price_discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Voucher.prototype, "expires_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Voucher.prototype, "label_code_voucher", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Voucher.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Voucher.prototype, "updated_At", void 0);
exports.Voucher = Voucher = __decorate([
    (0, typeorm_1.Entity)({
        name: 'vouchers',
    })
], Voucher);
//# sourceMappingURL=Voucher.js.map