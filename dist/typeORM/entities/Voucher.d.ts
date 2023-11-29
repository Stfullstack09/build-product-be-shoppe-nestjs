import { Shop } from './Shop';
import { UserVoucher } from './UserVoucher';
export declare class Voucher {
    id: string;
    code_voucher: string;
    label: string;
    discount: number;
    max_price_discount: number;
    expires_at: Date;
    label_code_voucher: string;
    shop: Shop;
    userVouchers: UserVoucher[];
    is_global_shop: boolean;
    is_global_shoppe: boolean;
    count_init: number;
    is_unlimited_use: boolean;
    count_use: number;
    price_order_min: number;
    created_At: Date;
    updated_At: Date;
}
