"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigEnum = exports.EntitiesEnum = void 0;
var EntitiesEnum;
(function (EntitiesEnum) {
    EntitiesEnum["role_user"] = "user";
    EntitiesEnum["role_shop"] = "shop_admin";
    EntitiesEnum["role_supper_admin"] = "supper_admin";
})(EntitiesEnum || (exports.EntitiesEnum = EntitiesEnum = {}));
var URL_BASE_BACKEND;
(function (URL_BASE_BACKEND) {
    URL_BASE_BACKEND["BASE_URL"] = "http://localhost:8080";
})(URL_BASE_BACKEND || (URL_BASE_BACKEND = {}));
var ConfigEnum;
(function (ConfigEnum) {
    ConfigEnum["URL_BACKEND_USERS_ALL_USER"] = "http://localhost:8080/users/all-users";
    ConfigEnum["URL_BACKEND_USERS_ALL_LOCKED"] = "http://localhost:8080/users/blocked";
    ConfigEnum["URL_BACKEND_SHOP_NOT_VERIFY"] = "http://localhost:8080/shop/notverify";
    ConfigEnum["URL_BACKEND_SHOP_VERIFY"] = "http://localhost:8080/shop/verify";
    ConfigEnum["URL_BACKEND_SHOP_SEARCH"] = "http://localhost:8080/shop/search";
    ConfigEnum["URL_FRONT_END"] = "http://localhost:5173";
    ConfigEnum["URL_BACKEND"] = "http://localhost:8080";
    ConfigEnum["URL_BACKEND_NOTIFY"] = "http://localhost:8080/notify";
    ConfigEnum["URL_BACKEND_ALL_CATEGORIES"] = "http://localhost:8080/categories";
    ConfigEnum["URL_BACKEND_ALL_TYPE_CATEGORIES"] = "http://localhost:8080/categories/all-type-cates";
    ConfigEnum["URL_BACKEND_ALL_VOUCHER_SHOPPE"] = "http://localhost:8080/voucher/shoppe";
})(ConfigEnum || (exports.ConfigEnum = ConfigEnum = {}));
//# sourceMappingURL=enum.js.map