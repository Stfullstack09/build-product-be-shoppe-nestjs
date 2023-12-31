"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
let UploadModule = class UploadModule {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: '/upload/folder/:imgpath',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/upload/folder/product/:imgpath',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/upload/folder/user/:imgpath',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/upload/folder/app/:imgpath/:folder',
            method: common_1.RequestMethod.GET,
        })
            .forRoutes(upload_controller_1.UploadController);
    }
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './files',
            }),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map