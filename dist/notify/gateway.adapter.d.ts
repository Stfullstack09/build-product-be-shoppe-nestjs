import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class WebsocketAdapter extends IoAdapter {
    private app;
    private readonly configService;
    constructor(app: INestApplicationContext, configService: ConfigService);
    private readonly jwtService;
    private readonly userService;
    createIOServer(port: number, options?: any): any;
}
