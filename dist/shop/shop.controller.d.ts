import { ShopService } from './shop.service';
import { registerShopDTO } from './DTO/registerShop.dto';
import { Request } from 'express';
import { verifyShopDTO } from './DTO/verifyShop.dto';
import { verifyEmailDTO } from './DTO/verifyEmail.dto';
import { InfoShopDTO } from './DTO/infoShop.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Shop } from 'src/typeORM/entities/Shop';
import { searchDTO } from './DTO/searchDTO';
import { blockedDTO } from './DTO/blocked.dto';
import { infoShopByAdminDTO } from './DTO/infoShopByAdmin.dto';
import { toggleSellDTO } from './DTO/toggleSell.dto';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    registerShop(registerShopDTO: registerShopDTO, req: Request): Promise<{
        id: number;
        thumbnail_url: string;
        name: string;
        address: string;
        isMail: boolean;
        slug: string;
        shop_uuid: string;
        rating: number;
        good_rating: number;
        user: import("../typeORM/entities/User").User;
        admin_shop: import("../typeORM/entities/User").User;
        bag_rating: number;
        online: number;
        is_verified: boolean;
        is_blocked: boolean;
        is_sell: boolean;
        is_shoppe_mail: boolean;
        products: import("../typeORM/entities/Product").Product[];
        vouchers: import("../typeORM/entities/Voucher").Voucher[];
        created_At: Date;
        updated_At: Date;
    } & Shop>;
    verifyShopByAdmin(verifyShopDTO: verifyShopDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    verifyEmail(verifyEmailDTO: verifyEmailDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    getCurrentShop(req: Request): Promise<Shop>;
    getInfoShop(InfoShopDTO: InfoShopDTO): Promise<Shop>;
    getShopByUUID(infoShopByAdminDTO: infoShopByAdminDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    notVerifyShop(page?: number, pageSize?: number): Promise<Pagination<Shop>>;
    getShopVerify(page?: number, pageSize?: number): Promise<Pagination<Shop>>;
    searchShop(searchDTO: searchDTO, page?: number, pageSize?: number): Promise<Pagination<Shop>>;
    blockShopByAdmin(blockedDTO: blockedDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    unBlockShopByAdmin(blockedDTO: blockedDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    toggleSellByAdmin(toggleSellDTO: toggleSellDTO): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
}
