import { DeviceService } from './device.service';
import { Request } from 'express';
import { checkDeviceDTO } from './DTO/check-device.dto';
import { UpdateDeviceDTO } from './DTO/UpdateDeviceDTO';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    checkDevice(req: Request, checkDeviceDTO: checkDeviceDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    manageDevice(req: Request): Promise<import("../typeORM/entities/LoginHistory").LoginHistory[]>;
    updateDevice(UpdateDeviceDTO: UpdateDeviceDTO, req: Request): Promise<import("typeorm").UpdateResult>;
}
