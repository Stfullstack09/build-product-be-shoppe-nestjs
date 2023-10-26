import { Socket } from 'socket.io';
import { User } from 'src/typeORM/entities/User';
export interface AuthenticatedSocket extends Socket {
    user?: User;
}
