export interface CreateCateGories {
    title: string;
    is_active: string;
    position?: number;
}
export interface ICreateTypeCate {
    id_cate_parent: number;
    name: string[];
    position?: number;
}
export interface ICategoriesUpdateFields {
    id: number;
    is_change_image: 'true' | 'false';
    path_old_image: string;
    title: string;
    image: File | string;
    is_active: string;
}
export interface IDataUpdatePositionCategory {
    id: number;
    position: number;
}
export interface IDataUpdateTypeCategory {
    id: number;
    name: string;
    cate: number;
    is_active: string;
    position?: number;
}
export interface IDataCreateVoucher {
    label: string;
    discount: number;
    max_price_discount: number;
    expires_at: number;
    count_init: number;
    price_order_min: number;
    is_global_shoppe: boolean;
    is_unlimited_use: boolean;
}
