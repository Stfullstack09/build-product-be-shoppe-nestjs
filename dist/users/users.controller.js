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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const enum_1 = require("../utils/enum");
const userBlocked_dto_1 = require("./DTO/userBlocked.dto");
const Quey_dto_1 = require("./DTO/Quey.dto");
const detailUser_dto_1 = require("./DTO/detailUser.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getCurrentUser(req) {
        const dataUserRequest = req.user;
        return this.usersService.getCurrentUserByEmailAndID({
            email: dataUserRequest.email,
            id: dataUserRequest.id,
        });
    }
    infoCurrentUserRole(req) {
        return this.usersService.RoleCurrentUser(req);
    }
    allUser(page = 1, pageSize = 1) {
        return this.usersService.findAllUser({
            limit: pageSize,
            page: page,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_USERS_ALL_USER,
        });
    }
    allUserBlocked(page = 1, pageSize = 1) {
        return this.usersService.findAllUserBlocked({
            limit: pageSize,
            page: page,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_USERS_ALL_LOCKED,
        });
    }
    blockedUser(userBlockedDTO) {
        return this.usersService.blockedUsers(userBlockedDTO);
    }
    unBlockedUser(userBlockedDTO) {
        return this.usersService.unBlockedUsers(userBlockedDTO);
    }
    searchUser(dataQuery) {
        return this.usersService.searchUsers({
            q: dataQuery.q,
        }, {
            limit: dataQuery.pageSize,
            page: dataQuery.page,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_USERS_ALL_LOCKED,
        });
    }
    detailUser(detailUserDTO) {
        return this.usersService.detailUser(detailUserDTO.email);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('/current-user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)('/info-current-userRole'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "infoCurrentUserRole", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('/all-users'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allUser", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('/blocked'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allUserBlocked", null);
__decorate([
    (0, common_1.Post)('/blocked'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userBlocked_dto_1.userBlockedDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "blockedUser", null);
__decorate([
    (0, common_1.Post)('/un-blocked'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userBlocked_dto_1.userBlockedDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "unBlockedUser", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Quey_dto_1.QueryDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchUser", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('/detail'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [detailUser_dto_1.detailUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "detailUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map