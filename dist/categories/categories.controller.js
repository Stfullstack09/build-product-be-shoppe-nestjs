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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_utils_1 = require("../utils/file-upload.utils");
const createCategori_dto_1 = require("./dto/createCategori.dto");
const enum_1 = require("../utils/enum");
const typeCate_dto_1 = require("./dto/typeCate.dto");
const updateFields_dto_1 = require("./dto/updateFields.dto");
const updatePosition_dto_1 = require("./dto/updatePosition.dto");
const updateTypeCate_dto_1 = require("./dto/updateTypeCate.dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async uploadedFile(createCategoriDTO, file) {
        return this.categoriesService.createCategoryWrapper(createCategoriDTO, file);
    }
    getAllCategories(page = 1, pageSize = 1, query = 'true') {
        return this.categoriesService.getAllCategories({
            limit: pageSize,
            page: page,
            cacheQueries: true,
            route: `${enum_1.ConfigEnum.URL_BACKEND_ALL_CATEGORIES}`,
        }, query);
    }
    getAllTypeCate(id, page = 1, pageSize = 1, filter) {
        return this.categoriesService.getAllTypeCate(id, {
            limit: pageSize,
            page: page,
            cacheQueries: true,
            route: `${enum_1.ConfigEnum.URL_BACKEND_ALL_TYPE_CATEGORIES}`,
        }, filter);
    }
    async updateFields(updateFieldsDTO, file) {
        if (JSON.parse(updateFieldsDTO.is_change_image)) {
            if (!file) {
                throw new common_1.HttpException('Khi bạn đã lựa chọn việc thay đổi image thì trường image phải mang giá trị! | Once you have chosen to change the image, the image field must provide value!', common_1.HttpStatus.BAD_REQUEST);
            }
            if (updateFieldsDTO.path_old_image) {
                const fileName = updateFieldsDTO.path_old_image.split('/')[4];
                try {
                    (0, file_upload_utils_1.removeFile)(`./files/images/app/categories/${fileName}`);
                }
                catch (error) {
                    throw new common_1.HttpException('path_old_image bạn cung cấp hãy đảm bảo chính xác', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            updateFieldsDTO.path_old_image = `/upload/folder/app/${file.filename}/categories`;
        }
        return this.categoriesService.updateFields(updateFieldsDTO);
    }
    async updatePositionCategories(updatePositionDTO) {
        return this.categoriesService.updatePositionCategories(updatePositionDTO.data);
    }
    createTypeCate(typeCateDTO) {
        return this.categoriesService.createTypeCate(typeCateDTO);
    }
    updateTypeCate(updateTypeDTO) {
        return this.categoriesService.updateTypeCate(updateTypeDTO.data);
    }
    async updatePositionTypeCategories(updatePositionDTO) {
        return this.categoriesService.updatePositionTypeCategories(updatePositionDTO.data);
    }
    searchTypeCategories(q = '') {
        return this.categoriesService.searchTypeCategories(q);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, file_upload_utils_1.uploadImage)('./files/images/app/categories'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCategori_dto_1.createCategoriDTO, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "uploadedFile", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('/all-type-cates'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllTypeCate", null);
__decorate([
    (0, common_1.Put)('/updates-fields'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, file_upload_utils_1.uploadImageNotVerify)('./files/images/app/categories'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateFields_dto_1.updateFieldsDTO, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateFields", null);
__decorate([
    (0, common_1.Patch)('/update-position'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePosition_dto_1.updatePositionDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updatePositionCategories", null);
__decorate([
    (0, common_1.Post)('/type-cate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeCate_dto_1.typeCateDTO]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createTypeCate", null);
__decorate([
    (0, common_1.Put)('/type-cate-update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateTypeCate_dto_1.updateTypeDTO]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "updateTypeCate", null);
__decorate([
    (0, common_1.Patch)('/update-position-typecate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePosition_dto_1.updatePositionDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updatePositionTypeCategories", null);
__decorate([
    (0, common_1.Get)('/type-cate/search'),
    __param(0, (0, common_1.Query)('q', new common_1.DefaultValuePipe(''))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "searchTypeCategories", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map