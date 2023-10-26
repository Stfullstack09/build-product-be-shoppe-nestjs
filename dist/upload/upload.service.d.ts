/// <reference types="multer" />
export declare class UploadService {
    uploadFile(data: {
        file: Express.Multer.File;
    }): Promise<void>;
}
