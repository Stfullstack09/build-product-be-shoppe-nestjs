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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Addres_1 = require("./Addres");
const Product_1 = require("./Product");
const Evaluate_1 = require("./Evaluate");
const Shop_1 = require("./Shop");
const Notify_1 = require("./Notify");
const LoginHistory_1 = require("./LoginHistory");
const Verify_1 = require("./Verify");
const Voucher_1 = require("./Voucher");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "birthDay", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'user',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Addres_1.Address, (address) => address.user),
    __metadata("design:type", Array)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Product_1.Product),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Evaluate_1.Evaluates, (evaluate) => evaluate.user),
    __metadata("design:type", Array)
], User.prototype, "evaluates", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Shop_1.Shop),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Voucher_1.Voucher),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "vouchers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "tick", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isSuperAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notify_1.Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Shop_1.Shop, (shop) => shop.user),
    __metadata("design:type", Array)
], User.prototype, "shop_manage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LoginHistory_1.LoginHistory, (loginHistory) => loginHistory.user),
    __metadata("design:type", Array)
], User.prototype, "loginHistories", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Verify_1.VerifyUser, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Verify_1.VerifyUser)
], User.prototype, "verifyUser", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Shop_1.Shop, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Shop_1.Shop)
], User.prototype, "admin_shop", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isBlocked", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], User.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], User.prototype, "updated_At", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], User);
//# sourceMappingURL=User.js.map