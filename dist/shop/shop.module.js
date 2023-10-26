"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const shop_service_1 = require("./shop.service");
const shop_controller_1 = require("./shop.controller");
const Shop_1 = require("../typeORM/entities/Shop");
const jwtShop_1 = require("../middlewares/jwtShop");
const User_1 = require("../typeORM/entities/User");
const Notify_1 = require("../typeORM/entities/Notify");
const suipperAdmin_middleware_1 = require("../middlewares/suipperAdmin.middleware");
const mailler_service_1 = require("../mailler/mailler.service");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
let ShopModule = class ShopModule {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .forRoutes({
            path: '/shop/register',
            method: common_1.RequestMethod.POST,
        })
            .apply(suipperAdmin_middleware_1.SupperAdminMiddleware)
            .forRoutes({
            path: '/shop/verify',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/shop/notverify',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/shop/verify',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/shop/blocked',
            method: common_1.RequestMethod.PUT,
        }, {
            path: '/shop/unblocked',
            method: common_1.RequestMethod.PUT,
        }, {
            path: '/shop/sell-toggle',
            method: common_1.RequestMethod.PUT,
        }, {
            path: '/shop/info/:shop_uuid',
            method: common_1.RequestMethod.GET,
        })
            .apply(jwtShop_1.JwtShopMiddleware)
            .forRoutes({
            path: '/shop/current',
            method: common_1.RequestMethod.GET,
        });
    }
};
exports.ShopModule = ShopModule;
exports.ShopModule = ShopModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Shop_1.Shop, User_1.User, Notify_1.Notification])],
        controllers: [shop_controller_1.ShopController],
        providers: [shop_service_1.ShopService, mailler_service_1.MaillerService],
    })
], ShopModule);
//# sourceMappingURL=shop.module.js.map