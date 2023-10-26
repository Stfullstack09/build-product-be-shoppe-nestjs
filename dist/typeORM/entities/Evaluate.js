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
exports.Evaluates = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Product_1 = require("./Product");
let Evaluates = class Evaluates {
};
exports.Evaluates = Evaluates;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Evaluates.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evaluates.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Evaluates.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Evaluates.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], Evaluates.prototype, "is_show_full_account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.evaluates),
    __metadata("design:type", User_1.User)
], Evaluates.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.evaluates),
    __metadata("design:type", Product_1.Product)
], Evaluates.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Evaluates.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Evaluates.prototype, "updated_At", void 0);
exports.Evaluates = Evaluates = __decorate([
    (0, typeorm_1.Entity)({
        name: 'evaluates',
    })
], Evaluates);
//# sourceMappingURL=Evaluate.js.map