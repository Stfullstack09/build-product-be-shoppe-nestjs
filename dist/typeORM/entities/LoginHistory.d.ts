import { User } from './User';
export declare class LoginHistory {
    id: number;
    loginTime: Date;
    successful: boolean;
    errorMessage: string;
    uuid: string;
    ipAddress: string;
    browser: string;
    user: User;
}
