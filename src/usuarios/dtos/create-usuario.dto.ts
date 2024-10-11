import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto{
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    password:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    lastname:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsNumber()
    @IsNotEmpty()
    age:number;
}