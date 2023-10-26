"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpBlockedUser = void 0;
const common_1 = require("@nestjs/common");
class HttpBlockedUser extends common_1.HttpException {
    constructor() {
        super('Your account has been blocked | Tài khoản của bạn đã bị blocked!', common_1.HttpStatus.BAD_GATEWAY);
    }
}
exports.HttpBlockedUser = HttpBlockedUser;
//# sourceMappingURL=HttpBlocked.js.map