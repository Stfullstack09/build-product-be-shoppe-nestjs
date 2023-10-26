import { User } from './User';
export declare class Notification {
    id: number;
    thumbnail_url: string;
    title: string;
    description: string;
    slug: string;
    time: Date;
    is_view: boolean;
    user: User;
    created_At: Date;
    updated_At: Date;
}
