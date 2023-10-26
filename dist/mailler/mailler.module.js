"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaillerModule = void 0;
const common_1 = require("@nestjs/common");
const mailler_service_1 = require("./mailler.service");
const mailler_controller_1 = require("./mailler.controller");
const mailer_1 = require("@nestjs-modules/mailer");
let MaillerModule = class MaillerModule {
};
exports.MaillerModule = MaillerModule;
exports.MaillerModule = MaillerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    service: 'gmail',
                    auth: {
                        user: 'truongsonpt.80@gmail.com',
                        pass: 'ybjmuwqxsohznaow',
                    },
                },
            }),
        ],
        controllers: [mailler_controller_1.MaillerController],
        providers: [mailler_service_1.MaillerService],
    })
], MaillerModule);
//# sourceMappingURL=mailler.module.js.map