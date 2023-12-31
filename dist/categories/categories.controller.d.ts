/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { createCategoriDTO } from './dto/createCategori.dto';
import { Categories } from 'src/typeORM/entities/Categorie';
import { Pagination } from 'nestjs-typeorm-paginate';
import { typeCateDTO } from './dto/typeCate.dto';
import { TypeCate } from 'src/typeORM/entities/Typecate';
import { updateFieldsDTO } from './dto/updateFields.dto';
import { updatePositionDTO } from './dto/updatePosition.dto';
import { updateTypeDTO } from './dto/updateTypeCate.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    uploadedFile(createCategoriDTO: createCategoriDTO, file: Express.Multer.File): Promise<Categories>;
    getAllCategories(page?: number, pageSize?: number, query?: string): Promise<Pagination<Categories>>;
    getAllTypeCate(id: number, page: number, pageSize: number, filter: 'cate' | 'product'): Promise<Pagination<TypeCate>>;
    updateFields(updateFieldsDTO: updateFieldsDTO, file: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    updatePositionCategories(updatePositionDTO: updatePositionDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    createTypeCate(typeCateDTO: typeCateDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    updateTypeCate(updateTypeDTO: updateTypeDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    updatePositionTypeCategories(updatePositionDTO: updatePositionDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    searchTypeCategories(q?: string): Promise<TypeCate[]>;
}
