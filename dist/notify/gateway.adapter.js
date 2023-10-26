"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const cookie = require("cookie");
const const_1 = require("../utils/const");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
class WebsocketAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, configService) {
        super(app);
        this.app = app;
        this.configService = configService;
        this.jwtService = this.app.get(jwt_1.JwtService);
        this.userService = this.app.get(users_service_1.UsersService);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.use(async (socket, next) => {
            const cookieER = socket.handshake.headers.cookie;
            if (!cookieER) {
                console.log('Client has no cookies');
                return next(new Error('Not Authenticated. No cookies were sent'));
            }
            else if (!cookie.parse(cookieER) || !cookie.parse(cookieER)?.access_token) {
                console.log('Client has no cookies');
                return next(new Error('Not Authenticated. No cookies were sent'));
            }
            const access_token = cookie.parse(cookieER).access_token;
            try {
                const decode = this.jwtService.verify(access_token, {
                    secret: const_1.constants.jwtConstants,
                });
                const findUser = await this.userService.getOneUserByEmailAndId(decode.email, decode.id);
                if (!findUser) {
                    console.log('Error: No user found');
                    return next(new Error('Error: No user found'));
                }
                socket.user = findUser;
                next();
            }
            catch (error) {
                console.log('Error Token Expires');
                return next(new Error('Error Token Expires'));
            }
        });
        return server;
    }
}
exports.WebsocketAdapter = WebsocketAdapter;
//# sourceMappingURL=gateway.adapter.js.map