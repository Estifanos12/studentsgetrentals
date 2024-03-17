export type TLogin = {
    email: string;
    password: string;
};

export type TRegister = {
    fullname: string;
    email: string;
    password: string;
    confirm_password: string;
    agree_terms: boolean;
};

export type TCardWrapper = {
    children: React.ReactNode;
    header?: React.ReactNode;
    description?: string;
    footer?: React.ReactNode;
    className?: string;
};

export type CreateStudentBody = {
    fullname: string;
    email: string;
    password: string;
    email_verified?: boolean;
};

export interface IApiRequest {
    endpoint: string;
    method: string;
    data?: FormData;
}
