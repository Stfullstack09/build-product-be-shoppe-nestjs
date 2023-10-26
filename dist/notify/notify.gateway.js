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
exports.NotifyGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notify_service_1 = require("./notify.service");
let NotifyGateway = class NotifyGateway {
    constructor(notifyService) {
        this.notifyService = notifyService;
    }
    handleConnection(socket, ...args) {
        console.log('Incoming Connection', socket.user.email);
        socket.emit('connected', socket.user.email);
    }
    handleDisconnect(socket) {
        console.log('handleDisconnect', socket.user.email);
    }
    handleCreateMessage(data) {
        console.log('Create Message', data);
    }
};
exports.NotifyGateway = NotifyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotifyGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotifyGateway.prototype, "handleCreateMessage", null);
exports.NotifyGateway = NotifyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({}),
    __metadata("design:paramtypes", [notify_service_1.NotifyService])
], NotifyGateway);
//# sourceMappingURL=notify.gateway.js.map