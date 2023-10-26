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
exports.AllCode = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
let AllCode = class AllCode {
};
exports.AllCode = AllCode;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AllCode.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', {
        unique: true,
    }),
    __metadata("design:type", String)
], AllCode.prototype, "uuid_manage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], AllCode.prototype, "keyMap", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AllCode.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.status),
    __metadata("design:type", Array)
], AllCode.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], AllCode.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], AllCode.prototype, "updated_At", void 0);
exports.AllCode = AllCode = __decorate([
    (0, typeorm_1.Entity)({
        name: 'manages',
    })
], AllCode);
//# sourceMappingURL=AllCode.js.map