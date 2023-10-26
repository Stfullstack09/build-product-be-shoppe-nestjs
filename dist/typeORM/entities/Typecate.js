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
exports.TypeCate = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const Categorie_1 = require("./Categorie");
let TypeCate = class TypeCate {
};
exports.TypeCate = TypeCate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TypeCate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeCate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], TypeCate.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.typeCate),
    __metadata("design:type", Array)
], TypeCate.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Categorie_1.Categories, (category) => category.type_cate),
    __metadata("design:type", Categorie_1.Categories)
], TypeCate.prototype, "cate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], TypeCate.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], TypeCate.prototype, "updated_At", void 0);
exports.TypeCate = TypeCate = __decorate([
    (0, typeorm_1.Entity)({
        name: 'typecates',
    })
], TypeCate);
//# sourceMappingURL=Typecate.js.map