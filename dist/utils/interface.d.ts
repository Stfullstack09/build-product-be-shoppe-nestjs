export interface CreateCateGories {
    title: string;
    is_active: string;
    position?: number;
}
export interface ICreateTypeCate {
    id_cate_parent: number;
    name: string[];
}
export interface ICategoriesUpdateFields {
    id: number;
    is_change_image: 'true' | 'false';
    path_old_image: string;
    title: string;
    image: File | string;
    is_active: string;
}
