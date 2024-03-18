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
};

export interface IApiRequest {
  endpoint: string;
  method:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD'
    | 'CONNECT'
    | 'TRACE';
  data?: FormData | string;
}

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export type Quiz = {
  question: string;
  options: Array<{
    text: string;
    value: string;
  }>;
};
