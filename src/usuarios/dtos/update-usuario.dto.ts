import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateUsuarioDto{
    @IsString()
    password:string;
}