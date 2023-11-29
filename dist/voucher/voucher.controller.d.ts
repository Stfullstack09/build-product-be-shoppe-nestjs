import { HttpStatus } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { createVoucherAdminDTO } from './dto/createVoucherAdmin.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Voucher } from 'src/typeORM/entities/Voucher';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: VoucherService);
    shoppeCreateVoucher(createVoucherAdminDTO: createVoucherAdminDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getAllVouchersShoppe(is_expire?: string, is_global?: string, page?: number, pageSize?: number): Promise<Pagination<Voucher>>;
}
