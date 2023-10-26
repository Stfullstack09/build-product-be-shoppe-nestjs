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
exports.MaillerService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MaillerService = class MaillerService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    sendEmailForgotPassword(info) {
        try {
            return this.mailerService.sendMail({
                to: info.email,
                subject: info.subject,
                from: info.from,
                html: `

            <h1 class="text-center">Xin Chào Quý Khách</h1>
            <p class="text-center">Có Phải Bạn Đã Thực Hiện Hành Động Quên Mật Khẩu?</p>
            <span>Có phải email của bạn là : ${info.email} ?</span>

            <p>Đưới đây là mã OTP của bạn : <strong>${info.code}</strong></p>
            </p>

            <br />
            <br />
            <br />
            
            <h1 class="text-center">Hello Guest</h1>
            <p class="text-center">Did You Take Action and Forgot Your Password?</p>
            <span>Is your email : ${info.email} ?</span>

            <p>Here is your OTP code: <strong>${info.code}</strong></p>
            </p>

            <br />
            <br />
            <p>Please do not respond to this email | Vui lòng không phản hồi lại email này!</p>
        `,
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('An error occurred, please try again | Có lỗi xảy ra vui lòng thử lại!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    sendEmailVerifyRegisterShop(info) {
        try {
            return this.mailerService.sendMail({
                to: info.email,
                subject: info.subject,
                from: info.from,
                html: `

            <h1 class="text-center">Xin Chào Quý Khách</h1>
            <p class="text-center">Chúng Tôi Rất Vui Khi Được Liên Hệ Đến Bạn</p>
            <span>Có phải email của bạn là : ${info.email} ?</span>

            <p>Bạn hãy ấn vào link sau để xác thực SHOP của bạn vừa đăng ký : <a href="${info.link}">Tại đây</a></p>
            </p>

            <br />
            <br />
            <br />
            
            <h1 class="text-center">Hello Guest</h1>
            <p class="text-center"> We Are Happy To Contact You</p>
            <span>Is your email : ${info.email} ?</span>

            <p>Please click on the following link to authenticate the SHOP you just registered: <a href="${info.link}">Here</a></p>
            </p>

            <br />
            <br />
            <p>Please do not respond to this email | Vui lòng không phản hồi lại email này!</p>
        `,
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('An error occurred, please try again | Có lỗi xảy ra vui lòng thử lại!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.MaillerService = MaillerService;
exports.MaillerService = MaillerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MaillerService);
//# sourceMappingURL=mailler.service.js.map