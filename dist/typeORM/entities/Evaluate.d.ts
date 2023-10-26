import { User } from './User';
import { Product } from './Product';
export declare class Evaluates {
    id: number;
    file: string;
    desc: string;
    rating: number;
    is_show_full_account: boolean;
    user: User;
    product: Product;
    created_At: Date;
    updated_At: Date;
}
