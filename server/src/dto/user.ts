import { IsNotEmpty, IsString, IsEmail, Length, IsOptional } from 'class-validator';


export class UserDTO{


    @IsNotEmpty()
    @IsString()
    @Length(3,20)
    name:string

    @IsNotEmpty()
    @IsEmail()
    @Length(1,50)
    email:string

    @IsNotEmpty()
    @IsString()
    @Length(1, 10)
    role: string;
   
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(10,10)
    phone: string;

    @IsOptional()
    @IsString()
    @Length(3,100)
    address:string

}