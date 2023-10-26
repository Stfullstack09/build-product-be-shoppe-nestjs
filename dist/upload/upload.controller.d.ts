/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadedFile(file: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    uploadMultipleFiles(files: Express.Multer.File[]): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    uploadFileTest(data: {
        file: Express.Multer.File;
    }): Promise<void>;
    seeUploadedFile(image: string, res: Response): void;
    seeUploadedFileUser(image: string, res: Response): void;
    seeUploadedFileProduct(image: string, res: Response): void;
    seeUploadedImage(image: string, folder: string, res: Response): void | {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
}
