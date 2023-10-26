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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const LoginHistory_1 = require("./../typeORM/entities/LoginHistory");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../typeORM/entities/User");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const expressUserAgent = require("express-useragent");
const OTPAuth = require("otpauth");
const uuid_1 = require("uuid");
const Respone_1 = require("../helpers/Respone");
const mailler_service_1 = require("../mailler/mailler.service");
const Verify_1 = require("../typeORM/entities/Verify");
const otpAuth = new OTPAuth.TOTP({
    label: 'VERYFY_CODE',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: 'NB2W45DFOIZB',
});
const saltOrRounds = 10;
let AuthService = class AuthService {
    constructor(jwtService, userRepository, loginRepository, verifyRepository, mailerService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.loginRepository = loginRepository;
        this.verifyRepository = verifyRepository;
        this.mailerService = mailerService;
    }
    async register(userDTO, Req, Res) {
        const checkEmail = await this.checkEmailExist(userDTO.email);
        if (checkEmail) {
            throw new common_1.HttpException('Email already exists in the system! | Email đã tồn tại trong hệ thống!', common_1.HttpStatus.BAD_REQUEST);
        }
        const passwordHash = await this.generateHashPassword(userDTO.password);
        try {
            const newUser = this.userRepository.create({
                email: userDTO.email,
                fullName: userDTO.fullName,
                password: passwordHash,
                userName: 'user_' + userDTO.email,
            });
            const userSave = await this.userRepository.save(newUser);
            delete userSave.password;
            const Token = await this.generateToken(userSave);
            this.handleSenToken(Token, Req, Res);
            let uid = this.generateUuidDevice();
            const infoHistoryLogin = this.handleGetInfoRequestInsertLogin(Req);
            const infoCreate = this.loginRepository.create({
                uuid: uid,
                ...infoHistoryLogin,
                user: userSave,
            });
            await this.loginRepository.save(infoCreate);
            Res.status(common_1.HttpStatus.OK).json((0, Respone_1.sendResponse)({
                statusCode: common_1.HttpStatus.OK,
                data: {
                    user: userSave,
                    _token_device: uid,
                },
                message: 'You have successfully registered | Bạn đã đăng ký thành công!',
            }));
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('An error occurred, please try again | Có lỗi xảy ra vui lòng thử lại!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async login(user, req, res) {
        const userCheck = await this.userRepository.findOne({
            where: {
                email: user.email,
            },
        });
        if (!userCheck) {
            throw new common_1.HttpException('Your account does not exist in the system | Tài khoản của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.NOT_FOUND);
        }
        const checkPassword = await this.checkPassword(user.password, userCheck.password);
        if (!checkPassword) {
            throw new common_1.HttpException('Your password is incorrect, please try again | Mật khẩu của bạn không chính xác vui lòng thử lại!', common_1.HttpStatus.FORBIDDEN);
        }
        const infoHistoryLogin = this.handleGetInfoRequestInsertLogin(req);
        delete userCheck.password;
        const token = await this.generateToken(userCheck);
        this.handleSenToken(token, req, res);
        const uid = this.generateUuidDevice();
        res.status(common_1.HttpStatus.OK).json((0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            data: {
                user: userCheck,
                _token_device: uid,
            },
            message: 'You have successfully login | Bạn đã đăng nhập thành công!',
        }));
        const infoCreate = this.loginRepository.create({
            ...infoHistoryLogin,
            uuid: uid,
            user: userCheck,
        });
        return this.loginRepository.save(infoCreate);
    }
    async logout(res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.status(200).json({
            statusCode: 200,
        });
    }
    async forgotPassword(email) {
        const checkUserExits = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (!checkUserExits) {
            throw new common_1.HttpException('Your account does not exist in the system | Tài khoản của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.NOT_FOUND);
        }
        const checkVeriCodeExit = await this.verifyRepository.findOne({
            where: {
                user: checkUserExits,
            },
        });
        let isExpire = true;
        if (checkVeriCodeExit) {
            isExpire = new Date().getTime() - new Date(checkVeriCodeExit.time_expires).getTime() > 0 ? true : false;
            if (!isExpire) {
                throw new common_1.HttpException(`Your code is still within the time it will expire: ${checkVeriCodeExit.time_expires} | Mã code của bạn vẫn trong thời gian nó sẽ hết hạn sau: ${checkVeriCodeExit.time_expires} `, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const OTP_CODE = otpAuth.generate({
            timestamp: new Date(new Date().getTime() + 300000).getTime(),
        });
        const dataOTP = {
            code_verify: OTP_CODE,
            isActive: true,
            time_expires: new Date(new Date().getTime() + 300000),
            secret_key: 'NB2W45DFOIZB',
            user: checkUserExits,
        };
        let dataVerifyNew;
        if (isExpire && !checkVeriCodeExit) {
            dataVerifyNew = this.verifyRepository.create({
                ...dataOTP,
            });
        }
        const dataVerifySave = await this.verifyRepository.save(dataVerifyNew
            ? dataVerifyNew
            : {
                ...checkVeriCodeExit,
                ...dataOTP,
            });
        await this.userRepository.save({
            ...checkUserExits,
            verifyUser: dataVerifySave,
        });
        let infoData = {
            code: OTP_CODE.toLocaleUpperCase(),
            email: email,
            subject: 'Email Lấy Lại Mật Khẩu',
            from: 'Vui lòng không trả lời email này!',
        };
        await this.mailerService.sendEmailForgotPassword(infoData);
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Please check your email for the CODE that has been sent | Bạn hãy kiểm tra email CODE đã được gửi!',
        });
    }
    async changePassword(data) {
        const checkUserExits = await this.userRepository.findOne({
            where: {
                email: data.email,
            },
            relations: ['verifyUser'],
        });
        if (!checkUserExits) {
            throw new common_1.HttpException('Your account does not exist in the system, please check your email again | Tài khoản của bạn không tồn tại trong hệ thống vui lòng kiểm tra lại email!', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            if (!checkUserExits.verifyUser) {
                throw new common_1.HttpException('An error occurred, please try sending OTP again | Có lỗi xảy ra vui lòng thực hiện lại thao tác gửi OTP!', common_1.HttpStatus.BAD_REQUEST);
            }
            else if (new Date().getTime() - new Date(checkUserExits.verifyUser.time_expires).getTime() > 0 ||
                !checkUserExits.verifyUser.isActive) {
                throw new common_1.HttpException('Your OTP has expired, please send another OTP | OTP của bạn đã hết hạn vui lòng thực hiện gửi OTP khác!', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        let checkOTPValid = otpAuth.validate({
            token: data.code_verify,
            window: 1,
            timestamp: new Date(checkUserExits.verifyUser.time_expires).getTime(),
        });
        if (checkOTPValid === null) {
            throw new common_1.HttpException('Your OTP code is incorrect, please try again | Mã OTP của bạn không chính xác vui lòng thử lại!', common_1.HttpStatus.BAD_REQUEST);
        }
        const newPassword = await this.generateHashPassword(data.password);
        try {
            await Promise.all([
                this.userRepository.save({
                    ...checkUserExits,
                    password: newPassword,
                }),
                this.verifyRepository.update(checkUserExits.verifyUser.id, {
                    time_expires: new Date(),
                }),
            ]);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('An error occurred, please try again | Có lỗi xảy ra vui lòng thử lại!', common_1.HttpStatus.BAD_REQUEST);
        }
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Your password has been changed, please log in again | Mật khẩu của bạn đã được thay đổi vui lòng đăng nhập lại!',
        });
    }
    async refreshToken(req, res) {
        const userRequest = req.user;
        const userCheck = await this.userRepository.findOne({
            where: {
                id: userRequest.id,
                email: userRequest.email,
            },
        });
        if (!userCheck) {
            throw new common_1.HttpException('Please log in again because your account does not exist in the system | Vui lòng đăng nhập lại do tài khoản của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.FORBIDDEN);
        }
        const token = await this.generateToken(userCheck);
        this.handleSenToken({
            access_token: token.access_token,
            refresh_token: token.refresh_token,
        }, req, res);
        return res.status(common_1.HttpStatus.OK).json((0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'You have successfully refresh_token | Bạn đã refresh_token thành công!',
        }));
    }
    async generateToken(payload) {
        const dataPayload = {
            role: payload.role,
            id: payload.id,
            email: payload.email,
            tick: payload.tick,
            isSuperAdmin: payload.isSuperAdmin,
            isBlocked: payload.isBlocked,
        };
        const access_token = await this.jwtService.signAsync(dataPayload, {
            expiresIn: '24h',
        });
        const refresh_token = await this.jwtService.signAsync(dataPayload, {
            expiresIn: '365d',
        });
        return {
            access_token,
            refresh_token,
        };
    }
    generateHashPassword(password) {
        return bcrypt.hash(password, saltOrRounds);
    }
    checkPassword(password, hashPassword) {
        return bcrypt.compare(password, hashPassword);
    }
    async checkEmailExist(email) {
        const userCheck = await this.userRepository.findOne({
            where: {
                email: email,
            },
        });
        return userCheck ? true : false;
    }
    generateUuidDevice() {
        const uid = (0, uuid_1.v4)();
        return uid;
    }
    handleGetInfoRequestInsertLogin(req) {
        const userAgent = expressUserAgent.parse(req.headers['user-agent']);
        const Info = {
            browser: userAgent.browser,
            ipAddress: req.ip,
            loginTime: new Date(),
            successful: true,
            errorMessage: 'No errors | Không có lỗi!',
        };
        return Info;
    }
    handleSenToken(token, Req, Res) {
        Res.cookie('access_token', token.access_token, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true,
            maxAge: new Date(Number(new Date()) + 31536000000).getTime(),
        });
        Res.cookie('refresh_token', token.refresh_token, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true,
            maxAge: new Date(Number(new Date()) + 31536000000).getTime(),
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(LoginHistory_1.LoginHistory)),
    __param(3, (0, typeorm_1.InjectRepository)(Verify_1.VerifyUser)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailler_service_1.MaillerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map