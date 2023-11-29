import { HttpStatus } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Voucher } from 'src/typeORM/entities/Voucher';
import { IDataCreateVoucher } from 'src/utils/interface';
import { Repository } from 'typeorm';
export declare class VoucherService {
    private readonly voucherRepository;
    constructor(voucherRepository: Repository<Voucher>);
    shoppeCreateVoucher(data: IDataCreateVoucher): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getAllVouchersShoppe(is_expire: string, is_global: string, option: IPaginationOptions): Promise<Pagination<Voucher>>;
}
