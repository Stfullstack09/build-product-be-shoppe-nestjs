import { TypeCate } from './Typecate';
export declare class Categories {
    id: number;
    title: string;
    slug: string;
    thumbnail_url: string;
    is_active: boolean;
    position: number;
    type_cate: TypeCate[];
    created_At: Date;
    updated_At: Date;
}
