"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseBlockUser = exports.sendResponse = void 0;
const common_1 = require("@nestjs/common");
function sendResponse(responseData) {
    return {
        statusCode: responseData.statusCode,
        message: responseData.message,
        data: responseData.data,
    };
}
exports.sendResponse = sendResponse;
function sendResponseBlockUser() {
    return {
        statusCode: common_1.HttpStatus.CONFLICT,
        message: 'Your account has been locked | Tài khoản của bạn đã bị khóa!',
        isBlocked: true,
    };
}
exports.sendResponseBlockUser = sendResponseBlockUser;
//# sourceMappingURL=Respone.js.map