import { Pagination } from 'nestjs-typeorm-paginate';
import { NotifyService } from './notify.service';
import { Notification } from 'src/typeORM/entities/Notify';
import { Request } from 'express';
import { updateViewTrueDTO } from './DTO/viewTrue.dto';
export declare class NotifyController {
    private readonly notifyService;
    constructor(notifyService: NotifyService);
    getNotification(page: number, pageSize: number, req: Request): Promise<Pagination<Notification>>;
    updateIsViewNotification(updateViewTrueDTO: updateViewTrueDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
}
