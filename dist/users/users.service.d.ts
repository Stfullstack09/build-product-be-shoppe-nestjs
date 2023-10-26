import { HttpStatus } from '@nestjs/common';
import { User } from 'src/typeORM/entities/User';
import { Repository } from 'typeorm';
import { userSessionSerializerDTO } from './DTO/SessionSerializerUser.dto';
import { Request } from 'express';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { blockedUser } from 'src/utils/user';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getCurrentUserByEmailAndID(data: {
        id: number;
        email: string;
    }): Promise<userSessionSerializerDTO>;
    RoleCurrentUser(req: Request): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    findAllUser(options: IPaginationOptions): Promise<Pagination<User>>;
    findAllUserBlocked(options: IPaginationOptions): Promise<Pagination<User>>;
    blockedUsers(userDTO: blockedUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    unBlockedUsers(userDTO: blockedUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    searchUsers(dataSearch: {
        q: string;
    }, options: IPaginationOptions): Promise<Pagination<User>>;
    detailUser(email: string): Promise<User>;
    getOneUserByEmailAndId(email: string, id: number): Promise<User>;
}
