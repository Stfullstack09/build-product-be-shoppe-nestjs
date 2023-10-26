import { Product } from './Product';
import { Categories } from './Categorie';
export declare class TypeCate {
    id: number;
    name: string;
    slug: string;
    product: Product[];
    position: number;
    is_active: boolean;
    cate: Categories;
    created_At: Date;
    updated_At: Date;
}
