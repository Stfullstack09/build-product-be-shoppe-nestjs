/// <reference types="express-serve-static-core" />
/// <reference types="express-useragent" />
/// <reference types="multer" />
/// <reference types="cookie-parser" />
/// <reference types="passport" />
import { Request } from 'express';
export declare const imageFileFilter: (req: Request, file: Express.Multer.File, callback: Function) => any;
export declare const imageFileFilterNotCheck: (req: Request, file: Express.Multer.File, callback: Function) => any;
export declare const editFileName: (req: Request, file: Express.Multer.File, callback: Function) => void;
export declare const uploadImage: (destination: string) => {
    storage: import("multer").StorageEngine;
    fileFilter: (req: Request, file: Express.Multer.File, callback: Function) => any;
};
export declare const uploadImageNotVerify: (destination: string) => {
    storage: import("multer").StorageEngine;
    fileFilter: (req: Request, file: Express.Multer.File, callback: Function) => any;
};
export declare const removeFile: (fullFilePath: string) => void;
