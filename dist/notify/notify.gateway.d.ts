import { Server } from 'socket.io';
import { NotifyService } from './notify.service';
import { AuthenticatedSocket } from 'src/utils/socket';
export declare class NotifyGateway {
    private readonly notifyService;
    constructor(notifyService: NotifyService);
    server: Server;
    handleConnection(socket: AuthenticatedSocket, ...args: any[]): void;
    handleDisconnect(socket: AuthenticatedSocket): void;
    handleCreateMessage(data: any): void;
}
