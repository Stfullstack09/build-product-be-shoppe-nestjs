import { AuthService } from './auth.service';
import { registerUserDTO } from './DTO/registerUser.dto';
import { Request, Response } from 'express';
import { loginUserDTO } from './DTO/loginUserDTO.dto';
import { emailDTO } from './DTO/forgotPasswordDTO.dto';
import { changePasswordDTO } from './DTO/changePassword.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userDTO: registerUserDTO, req: Request, res: Response): Promise<void>;
    login(loginUserDTO: loginUserDTO, req: Request, res: Response): Promise<import("../typeORM/entities/LoginHistory").LoginHistory>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPassword(emailDTO: emailDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    changePassword(changePasswordDTO: changePasswordDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
