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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const check_device_dto_1 = require("./DTO/check-device.dto");
const UpdateDeviceDTO_1 = require("./DTO/UpdateDeviceDTO");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    checkDevice(req, checkDeviceDTO) {
        return this.deviceService.checkDevice(req, checkDeviceDTO);
    }
    manageDevice(req) {
        return this.deviceService.manageDevice(req);
    }
    updateDevice(UpdateDeviceDTO, req) {
        return this.deviceService.updateDevice(UpdateDeviceDTO, req);
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, common_1.Get)('/check-device'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_device_dto_1.checkDeviceDTO]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "checkDevice", null);
__decorate([
    (0, common_1.Get)('/manage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "manageDevice", null);
__decorate([
    (0, common_1.Put)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateDeviceDTO_1.UpdateDeviceDTO, Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "updateDevice", null);
exports.DeviceController = DeviceController = __decorate([
    (0, common_1.Controller)('device'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
//# sourceMappingURL=device.controller.js.map