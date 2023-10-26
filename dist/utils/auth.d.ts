export interface userRegister {
    email: string;
    fullName: string;
    password: string;
}
export interface userLogin {
    email: string;
    password: string;
}
export interface JWTSiginI {
    id: number;
    email: string;
    fullName: string;
    userName: string;
    birthDay: string;
    avatar: string;
    phoneNumber: string;
    role: string;
    tick: boolean;
    isSuperAdmin: boolean;
    isBlocked: boolean;
}
export interface InfoRequestHistoryLogin {
    browser: string;
    ipAddress: string;
    loginTime: Date;
    successful: boolean;
    errorMessage: string;
}
export interface ChangePasswordDataI {
    email: string;
    password: string;
    code_verify: string;
}
export interface dataPayloadI {
    role: string;
    id: number;
    email: string;
    tick: boolean;
    isSuperAdmin: boolean;
    isBlocked: boolean;
}
