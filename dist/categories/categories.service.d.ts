/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { Categories } from 'src/typeORM/entities/Categorie';
import { CreateCateGories, ICategoriesUpdateFields, ICreateTypeCate } from 'src/utils/interface';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { TypeCate } from 'src/typeORM/entities/Typecate';
export declare class CategoriesService {
    private readonly categoriesRepository;
    private readonly typeCategoriesRepository;
    constructor(categoriesRepository: Repository<Categories>, typeCategoriesRepository: Repository<TypeCate>);
    createCategoryWrapper(createCategoriDTO: CreateCateGories, file: Express.Multer.File): Promise<Categories>;
    getAllCategories(option: IPaginationOptions, query: string): Promise<Pagination<Categories>>;
    createTypeCate(typeCateDTO: ICreateTypeCate): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getAllTypeCate(id: number, option: IPaginationOptions): Promise<Pagination<TypeCate>>;
    updateFields(dataUpdate: ICategoriesUpdateFields): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
}
