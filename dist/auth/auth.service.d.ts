import { LoginHistory } from './../typeORM/entities/LoginHistory';
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeORM/entities/User';
import { ChangePasswordDataI, InfoRequestHistoryLogin, JWTSiginI, userLogin, userRegister } from 'src/utils/auth';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { MaillerService } from 'src/mailler/mailler.service';
import { VerifyUser } from 'src/typeORM/entities/Verify';
export declare class AuthService {
    private jwtService;
    private readonly userRepository;
    private readonly loginRepository;
    private readonly verifyRepository;
    private readonly mailerService;
    constructor(jwtService: JwtService, userRepository: Repository<User>, loginRepository: Repository<LoginHistory>, verifyRepository: Repository<VerifyUser>, mailerService: MaillerService);
    register(userDTO: userRegister, Req: Request, Res: Response): Promise<void>;
    login(user: userLogin, req: Request, res: Response): Promise<LoginHistory>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPassword(email: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    changePassword(data: ChangePasswordDataI): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    generateToken(payload: JWTSiginI): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    generateHashPassword(password: string): Promise<string>;
    checkPassword(password: string, hashPassword: string): Promise<boolean>;
    checkEmailExist(email: string): Promise<boolean>;
    generateUuidDevice(): string;
    handleGetInfoRequestInsertLogin(req: Request): InfoRequestHistoryLogin;
    handleSenToken(token: {
        access_token: string;
        refresh_token: string;
    }, Req: Request, Res: Response): void;
}
