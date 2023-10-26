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
exports.FlashSale = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
let FlashSale = class FlashSale {
};
exports.FlashSale = FlashSale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FlashSale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FlashSale.prototype, "time_count", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FlashSale.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], FlashSale.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.flash_sale),
    __metadata("design:type", Array)
], FlashSale.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], FlashSale.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], FlashSale.prototype, "updated_At", void 0);
exports.FlashSale = FlashSale = __decorate([
    (0, typeorm_1.Entity)({
        name: 'flash_sales',
    })
], FlashSale);
//# sourceMappingURL=FlashSale.js.map