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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const Image_1 = require("./Image");
const AllCode_1 = require("./AllCode");
const Video_1 = require("./Video");
const Shop_1 = require("./Shop");
const Typecate_1 = require("./Typecate");
const Evaluate_1 = require("./Evaluate");
const FlashSale_1 = require("./FlashSale");
const Voucher_1 = require("./Voucher");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Image_1.Image, (image) => image.product),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', {
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "productUUID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'VND',
    }),
    __metadata("design:type", String)
], Product.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AllCode_1.AllCode, (allcode) => allcode.status),
    __metadata("design:type", AllCode_1.AllCode)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isLike", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Product.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "sold", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "liked_count", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "view_count", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price_min", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price_max", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price_min_before_discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price_max_before_discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "show_discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Video_1.Video, (video) => video.product),
    __metadata("design:type", Array)
], Product.prototype, "videos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Product.prototype, "good_rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Product.prototype, "bag_rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_on_flash_sale", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isBetSelling", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "description_style", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shop_1.Shop, (shop) => shop.products),
    __metadata("design:type", Shop_1.Shop)
], Product.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "content_modal", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "style_custom_modal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Typecate_1.TypeCate, (typecate) => typecate.product),
    __metadata("design:type", Typecate_1.TypeCate)
], Product.prototype, "typeCate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Evaluate_1.Evaluates, (evaluate) => evaluate.product),
    __metadata("design:type", Array)
], Product.prototype, "evaluates", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Voucher_1.Voucher),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Product.prototype, "voucher", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => AllCode_1.AllCode),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FlashSale_1.FlashSale, (flashsale) => flashsale.product),
    __metadata("design:type", FlashSale_1.FlashSale)
], Product.prototype, "flash_sale", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Product.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Product.prototype, "updated_At", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({
        name: 'products',
    })
], Product);
//# sourceMappingURL=Product.js.map