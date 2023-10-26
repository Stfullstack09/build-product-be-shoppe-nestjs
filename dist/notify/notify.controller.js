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
exports.NotifyController = void 0;
const notify_service_1 = require("./notify.service");
const common_1 = require("@nestjs/common");
const enum_1 = require("../utils/enum");
const viewTrue_dto_1 = require("./DTO/viewTrue.dto");
let NotifyController = class NotifyController {
    constructor(notifyService) {
        this.notifyService = notifyService;
    }
    getNotification(page = 1, pageSize = 1, req) {
        return this.notifyService.getNotification(req.user, {
            limit: pageSize,
            page: page,
            cacheQueries: true,
            route: enum_1.ConfigEnum.URL_BACKEND_NOTIFY,
        });
    }
    updateIsViewNotification(updateViewTrueDTO) {
        return this.notifyService.updateIsViewNotification(updateViewTrueDTO);
    }
};
exports.NotifyController = NotifyController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], NotifyController.prototype, "getNotification", null);
__decorate([
    (0, common_1.Put)('view-trues'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [viewTrue_dto_1.updateViewTrueDTO]),
    __metadata("design:returntype", void 0)
], NotifyController.prototype, "updateIsViewNotification", null);
exports.NotifyController = NotifyController = __decorate([
    (0, common_1.Controller)('notify'),
    __metadata("design:paramtypes", [notify_service_1.NotifyService])
], NotifyController);
//# sourceMappingURL=notify.controller.js.map