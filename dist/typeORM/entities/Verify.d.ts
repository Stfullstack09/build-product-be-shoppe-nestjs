import { User } from './User';
export declare class VerifyUser {
    id: number;
    time_expires: Date;
    code_verify: string;
    isActive: boolean;
    secret_key: string;
    user: User;
    created_At: Date;
    updated_At: Date;
}
