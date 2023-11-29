import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { Shop } from 'src/typeORM/entities/Shop';
import { User } from 'src/typeORM/entities/User';
import { IBlockedShop, ISearch, IToggleSell, InfoShopI, registerShopI, verifyEmailI, verifyShopByAdminI } from 'src/utils/shop';
import { Repository } from 'typeorm';
import { Notification } from 'src/typeORM/entities/Notify';
import { MaillerService } from 'src/mailler/mailler.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class ShopService {
    private readonly userRepository;
    private readonly shopRepository;
    private readonly notifyRepository;
    private readonly mailService;
    constructor(userRepository: Repository<User>, shopRepository: Repository<Shop>, notifyRepository: Repository<Notification>, mailService: MaillerService);
    registerShop(dataRegister: registerShopI, req: Request): Promise<{
        id: number;
        thumbnail_url: string;
        name: string;
        address: string;
        isMail: boolean;
        slug: string;
        shop_uuid: string;
        rating: number;
        good_rating: number;
        user: User;
        admin_shop: User;
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
    verifyShopByAdmin(data: verifyShopByAdminI): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    verifyEmail(data: verifyEmailI): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    currentShop(req: Request): Promise<Shop>;
    getInfoShop(InfoShopDTO: InfoShopI): Promise<Shop>;
    shopNotVerify(options: IPaginationOptions): Promise<Pagination<Shop>>;
    getShopVerify(options: IPaginationOptions): Promise<Pagination<Shop>>;
    searchShop(dataSearch: ISearch, options: IPaginationOptions): Promise<Pagination<Shop>>;
    blockShopByAdmin(blockedDTO: IBlockedShop): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    unBlockShopByAdmin(blockedDTO: IBlockedShop): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getShopByUUID(infoShopByAdminDTO: {
        shop_uuid: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    toggleSellByAdmin(toggleSellDTO: IToggleSell): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
}
