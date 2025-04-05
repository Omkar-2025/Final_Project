
export interface UserType{
    id?:number;
    name:string;
    email:string
    phone:string;
    password:string;
    role?:string;
    isVerified?:boolean;
    otp?:string;
    address?:string;
}

export interface LoginType{
    email:string;
    password:string;
}
export interface VerifyType{
    email:string;
    otp:string;
}

export interface UserResponseType{
    msg?:string | any[];
    status:number;
    token?:string;
    role?:string;
    accounts?:any[];
}




