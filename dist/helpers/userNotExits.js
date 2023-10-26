"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUserNotExits = void 0;
const common_1 = require("@nestjs/common");
class HttpUserNotExits extends common_1.HttpException {
    constructor() {
        super('Your account does not exist in the system | Tài khoản của bạn không tồn tại trong hệ thống!', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.HttpUserNotExits = HttpUserNotExits;
//# sourceMappingURL=userNotExits.js.map