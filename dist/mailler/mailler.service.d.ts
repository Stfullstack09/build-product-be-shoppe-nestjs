import { MailerService } from '@nestjs-modules/mailer';
import { sendEmailForgotPasswordI, sendEmailVerifyShop } from 'src/utils/mailler';
export declare class MaillerService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmailForgotPassword(info: sendEmailForgotPasswordI): Promise<any>;
    sendEmailVerifyRegisterShop(info: sendEmailVerifyShop): Promise<any>;
}
