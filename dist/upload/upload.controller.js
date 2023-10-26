"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_utils_1 = require("../utils/file-upload.utils");
const Respone_1 = require("../helpers/Respone");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadedFile(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Bạn đã upload thành công!',
            data: response,
        });
    }
    async uploadMultipleFiles(files) {
        const response = [];
        files.forEach((file) => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Bạn đã upload thành công!',
            data: response,
        });
    }
    uploadFileTest(data) {
        return this.uploadService.uploadFile(data);
    }
    seeUploadedFile(image, res) {
        return res.sendFile(image, { root: './files/images/upload' });
    }
    seeUploadedFileUser(image, res) {
        return res.sendFile(image, { root: './files/images/user' });
    }
    seeUploadedFileProduct(image, res) {
        return res.sendFile(image, { root: './files/images/product' });
    }
    seeUploadedImage(image, folder, res) {
        if (!folder || !image) {
            return (0, Respone_1.sendResponse)({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Tên Ảnh Và Thư Mục Không Được Để Trống',
            });
        }
        return res.sendFile(image, { root: `./files/images/app/${folder}` });
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './files/images/upload',
            filename: file_upload_utils_1.editFileName,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadedFile", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 20, {
        storage: (0, multer_1.diskStorage)({
            destination: './files/images/upload',
            filename: file_upload_utils_1.editFileName,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadMultipleFiles", null);
__decorate([
    (0, common_1.Post)('upload/test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadFileTest", null);
__decorate([
    (0, common_1.Get)('/folder/:imgpath'),
    __param(0, (0, common_1.Param)('imgpath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "seeUploadedFile", null);
__decorate([
    (0, common_1.Get)('/folder/user/:imgpath'),
    __param(0, (0, common_1.Param)('imgpath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "seeUploadedFileUser", null);
__decorate([
    (0, common_1.Get)('/folder/product/:imgpath'),
    __param(0, (0, common_1.Param)('imgpath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "seeUploadedFileProduct", null);
__decorate([
    (0, common_1.Get)('/folder/app/:imgpath/:folder'),
    __param(0, (0, common_1.Param)('imgpath')),
    __param(1, (0, common_1.Param)('folder')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "seeUploadedImage", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map