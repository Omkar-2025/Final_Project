export interface loginInterface  {
    email:string,
    password:string,
}


export interface registerInterface{
    email:string,
    password:string,
    name:string,
    // confirmPassword:string,
    phone:string,
    address?:string
}