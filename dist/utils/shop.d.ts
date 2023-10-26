export interface registerShopI {
    name: string;
    address: string;
}
export interface verifyEmailI {
    token: string;
    id: number;
    email: string;
}
export interface verifyShopByAdminI {
    shop_uuid: string;
    id: number;
    slug: string;
}
export interface InfoShopI {
    id: number;
    slug: string;
}
export interface ISearch {
    q: string;
}
export interface IBlockedShop {
    id: number[];
}
export interface IToggleSell extends IBlockedShop {
    type: 'blocked-sell' | 'unlocked-sell';
}
