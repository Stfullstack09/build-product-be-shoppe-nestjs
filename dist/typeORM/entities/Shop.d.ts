import { Product } from './Product';
import { User } from './User';
import { Voucher } from './Voucher';
export declare class Shop {
    id: number;
    thumbnail_url: string;
    name: string;
    address: string;
    isMail: boolean;
    slug: string;
    shop_uuid: string;
    rating: number;
    good_rating: number;
    user: User;
    admin_shop: User;
    bag_rating: number;
    online: number;
    is_verified: boolean;
    is_blocked: boolean;
    is_sell: boolean;
    is_shoppe_mail: boolean;
    products: Product[];
    vouchers: Voucher[];
    created_At: Date;
    updated_At: Date;
}
