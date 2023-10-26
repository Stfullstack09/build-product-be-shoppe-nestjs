export interface sendEmailForgotPasswordI {
    email: string;
    code: string;
    from: string;
    subject: string;
}
export interface sendEmailVerifyShop {
    email: string;
    from: string;
    subject: string;
    link: string;
}
