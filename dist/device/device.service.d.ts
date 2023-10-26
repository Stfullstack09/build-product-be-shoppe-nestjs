import { IUpdateDevice, IcheckDeviceData } from './../utils/device';
import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { LoginHistory } from 'src/typeORM/entities/LoginHistory';
import { User } from 'src/typeORM/entities/User';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private readonly loginHistoryRepository;
    private readonly userRepository;
    constructor(loginHistoryRepository: Repository<LoginHistory>, userRepository: Repository<User>);
    checkDevice(req: Request, data: IcheckDeviceData): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    manageDevice(req: Request): Promise<LoginHistory[]>;
    updateDevice(UpdateDeviceDTO: IUpdateDevice, req: Request): Promise<import("typeorm").UpdateResult>;
}
