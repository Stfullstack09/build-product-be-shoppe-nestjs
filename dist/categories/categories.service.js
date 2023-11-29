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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Categorie_1 = require("../typeORM/entities/Categorie");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const slugify_1 = require("slugify");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const Typecate_1 = require("../typeORM/entities/Typecate");
const Respone_1 = require("../helpers/Respone");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository, typeCategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
        this.typeCategoriesRepository = typeCategoriesRepository;
    }
    async createCategoryWrapper(createCategoriDTO, file) {
        if (!file && !file?.filename) {
            throw new common_1.BadRequestException();
        }
        const checkPosition = await this.categoriesRepository.find({
            order: {
                position: 'DESC',
            },
        });
        if (!checkPosition || checkPosition.length === 0) {
            createCategoriDTO.position = 0;
        }
        else {
            createCategoriDTO.position = checkPosition[0].position + 1;
        }
        const createCate = this.categoriesRepository.create({
            slug: `${(0, slugify_1.default)(createCategoriDTO.title)}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
            thumbnail_url: `/upload/folder/app/${file.filename}/categories`,
            title: createCategoriDTO.title,
            is_active: createCategoriDTO.is_active == 'true' ? true : false,
            position: createCategoriDTO.position,
        });
        return this.categoriesRepository.save(createCate);
    }
    getAllCategories(option, query) {
        let condition;
        if (query === 'true') {
            condition = {
                is_active: true,
            };
        }
        else {
            condition = {};
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(this.categoriesRepository, option, {
            where: condition,
            relations: ['type_cate'],
            order: {
                position: 'ASC',
            },
        });
    }
    async updateFields(dataUpdate) {
        await this.categoriesRepository.update(dataUpdate.id, {
            title: dataUpdate.title,
            thumbnail_url: dataUpdate.path_old_image,
            is_active: JSON.parse(dataUpdate.is_active),
            slug: `${(0, slugify_1.default)(dataUpdate.title)}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
        });
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Thành Công!',
        });
    }
    async updatePositionCategories(data) {
        const dataDump = data.map(async (item) => {
            await this.categoriesRepository.update(item.id, {
                position: item.position,
            });
        });
        try {
            await Promise.all(dataDump);
            return (0, Respone_1.sendResponse)({
                statusCode: common_1.HttpStatus.OK,
                message: 'Thành Công!',
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async createTypeCate(typeCateDTO) {
        const checkCate = await this.categoriesRepository.findOne({
            where: {
                id: typeCateDTO.id_cate_parent,
            },
        });
        if (!checkCate) {
            throw new common_1.BadRequestException();
        }
        const checkPosition = await this.typeCategoriesRepository.find({
            where: {
                cate: checkCate,
            },
            order: {
                position: 'DESC',
            },
        });
        if (!checkPosition || checkPosition.length === 0) {
            typeCateDTO.position = 0;
        }
        else {
            typeCateDTO.position = checkPosition[0].position + 1;
        }
        const dataInsert = typeCateDTO.name.map((item) => {
            const obj = {
                name: item,
                slug: `${(0, slugify_1.default)(item)}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
                cate: checkCate,
                position: typeCateDTO.position,
            };
            typeCateDTO.position += 1;
            return obj;
        });
        await this.typeCategoriesRepository.insert(dataInsert);
        return (0, Respone_1.sendResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Bạn Đã Tạo Thành Công!',
        });
    }
    async getAllTypeCate(id, option, filter) {
        const conditions = {
            where: {},
            order: {
                position: 'ASC',
            },
        };
        if (id) {
            const checkCateParent = await this.categoriesRepository.findOne({
                where: {
                    id,
                },
            });
            if (!checkCateParent) {
                throw new common_1.BadRequestException();
            }
            else {
                conditions.where.cate = checkCateParent;
            }
        }
        if ((filter && filter === 'cate') || filter === 'product') {
            conditions.relations = [filter];
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(this.typeCategoriesRepository, option, conditions);
    }
    async updateTypeCate(data) {
        try {
            await Promise.all(data.map(async (item) => {
                let cate = null;
                if (item.cate) {
                    cate = await this.categoriesRepository.findOne({
                        where: {
                            id: item.cate,
                        },
                    });
                }
                if (cate) {
                    const checkNewTypeCate = await this.typeCategoriesRepository.findOne({
                        where: {
                            cate,
                            id: item.id,
                        },
                    });
                    const checkPosition = await this.typeCategoriesRepository.find({
                        where: {
                            cate,
                        },
                        order: {
                            position: 'DESC',
                        },
                    });
                    const dataPosition = {
                        position: 0,
                    };
                    if (!checkPosition || checkPosition.length === 0) {
                        dataPosition.position = 0;
                    }
                    else {
                        dataPosition.position = checkPosition[0].position + 1;
                    }
                    if (!checkNewTypeCate) {
                        item.position = dataPosition.position;
                    }
                    await this.typeCategoriesRepository.update(item.id, {
                        name: item.name,
                        slug: `${(0, slugify_1.default)(item.name)}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
                        cate,
                        is_active: JSON.parse(item.is_active),
                        position: item.position,
                    });
                }
                else {
                    await this.typeCategoriesRepository.update(item.id, {
                        name: item.name,
                        slug: `${(0, slugify_1.default)(item.name)}-${new Date().getTime()}-${(0, uuid_1.v4)()}`,
                        cate: null,
                        is_active: JSON.parse(item.is_active),
                        position: item.position,
                    });
                }
            }));
            return (0, Respone_1.sendResponse)({
                statusCode: common_1.HttpStatus.OK,
                message: 'Thành Công!',
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updatePositionTypeCategories(data) {
        const dataDump = data.map(async (item) => {
            await this.typeCategoriesRepository.update(item.id, {
                position: item.position,
            });
        });
        try {
            await Promise.all(dataDump);
            return (0, Respone_1.sendResponse)({
                statusCode: common_1.HttpStatus.OK,
                message: 'Thành Công!',
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async searchTypeCategories(q) {
        if (!q) {
            throw new common_1.BadRequestException();
        }
        return this.typeCategoriesRepository.find({
            where: [{ name: (0, typeorm_2.Like)(`%${q}%`) }, { slug: (0, typeorm_2.Like)(`%${q}%`) }],
            relations: ['cate'],
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Categorie_1.Categories)),
    __param(1, (0, typeorm_1.InjectRepository)(Typecate_1.TypeCate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map