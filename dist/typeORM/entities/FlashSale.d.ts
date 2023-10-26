import { Product } from './Product';
export declare class FlashSale {
    id: number;
    time_count: number;
    label: string;
    isActive: boolean;
    product: Product[];
    created_At: Date;
    updated_At: Date;
}
