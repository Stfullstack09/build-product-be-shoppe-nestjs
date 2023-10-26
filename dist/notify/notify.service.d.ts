import { User } from './../typeORM/entities/User';
import { HttpStatus } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Notification } from 'src/typeORM/entities/Notify';
import { IsviewTrue } from 'src/utils/notify';
import { Repository } from 'typeorm';
export declare class NotifyService {
    private readonly notifyRepository;
    private readonly userRepository;
    constructor(notifyRepository: Repository<Notification>, userRepository: Repository<User>);
    getNotification(user: User, options: IPaginationOptions): Promise<Pagination<Notification>>;
    updateIsViewNotification(updateViewTrueDTO: IsviewTrue): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
}
