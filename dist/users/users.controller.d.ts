import { UsersService } from './users.service';
import { Request } from 'express';
import { User } from 'src/typeORM/entities/User';
import { Pagination } from 'nestjs-typeorm-paginate';
import { userBlockedDTO } from './DTO/userBlocked.dto';
import { QueryDTO } from './DTO/Quey.dto';
import { detailUserDTO } from './DTO/detailUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getCurrentUser(req: Request): Promise<import("./DTO/SessionSerializerUser.dto").userSessionSerializerDTO>;
    infoCurrentUserRole(req: Request): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    allUser(page?: number, pageSize?: number): Promise<Pagination<User>>;
    allUserBlocked(page?: number, pageSize?: number): Promise<Pagination<User>>;
    blockedUser(userBlockedDTO: userBlockedDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    unBlockedUser(userBlockedDTO: userBlockedDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    searchUser(dataQuery: QueryDTO): Promise<Pagination<User>>;
    detailUser(detailUserDTO: detailUserDTO): Promise<User>;
}
