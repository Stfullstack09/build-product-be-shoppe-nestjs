"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeORM_1 = require("./typeORM");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const mailler_module_1 = require("./mailler/mailler.module");
const users_module_1 = require("./users/users.module");
const shop_module_1 = require("./shop/shop.module");
const upload_module_1 = require("./upload/upload.module");
const notify_module_1 = require("./notify/notify.module");
const device_module_1 = require("./device/device.module");
const categories_module_1 = require("./categories/categories.module");
let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION')
    envFilePath = '.env.production';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath, isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: null,
                database: 'shoppe',
                entities: typeORM_1.default,
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            mailler_module_1.MaillerModule,
            users_module_1.UsersModule,
            shop_module_1.ShopModule,
            upload_module_1.UploadModule,
            notify_module_1.NotifyModule,
            device_module_1.DeviceModule,
            categories_module_1.CategoriesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map