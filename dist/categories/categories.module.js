"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const categories_controller_1 = require("./categories.controller");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const Categorie_1 = require("../typeORM/entities/Categorie");
const suipperAdmin_middleware_1 = require("../middlewares/suipperAdmin.middleware");
const Typecate_1 = require("../typeORM/entities/Typecate");
let CategoriesModule = class CategoriesModule {
    configure(consumer) {
        consumer.apply(suipperAdmin_middleware_1.SupperAdminMiddleware).forRoutes({
            path: '/categories',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/categories/type-cate',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/categories/updates-fields',
            method: common_1.RequestMethod.PUT,
        }, {
            path: '/categories/update-position',
            method: common_1.RequestMethod.PATCH,
        }, {
            path: '/categories/type-cate-update',
            method: common_1.RequestMethod.PUT,
        }, {
            path: '/categories/update-position-typecate',
            method: common_1.RequestMethod.PATCH,
        }, {
            path: '/categories/type-cate/search',
            method: common_1.RequestMethod.GET,
        });
    }
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './files',
            }),
            typeorm_1.TypeOrmModule.forFeature([Categorie_1.Categories, Typecate_1.TypeCate]),
        ],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map