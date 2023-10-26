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
exports.Shop = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const User_1 = require("./User");
let Shop = class Shop {
};
exports.Shop = Shop;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Shop.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "thumbnail_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Shop.prototype, "isMail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Shop.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Shop.prototype, "shop_uuid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Shop.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Shop.prototype, "good_rating", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.shop_manage),
    __metadata("design:type", User_1.User)
], Shop.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.admin_shop),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Shop.prototype, "admin_shop", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Shop.prototype, "bag_rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Shop.prototype, "online", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Shop.prototype, "is_verified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Shop.prototype, "is_blocked", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], Shop.prototype, "is_sell", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Shop.prototype, "is_shoppe_mail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.shop),
    __metadata("design:type", Array)
], Shop.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Shop.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Shop.prototype, "updated_At", void 0);
exports.Shop = Shop = __decorate([
    (0, typeorm_1.Entity)({
        name: 'shops',
    })
], Shop);
//# sourceMappingURL=Shop.js.map