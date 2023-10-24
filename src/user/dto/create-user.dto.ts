import { IsEmail, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail({},{message:'please enter correct email'})
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsPhoneNumber()
  numberphone: number;

  @IsString()
  divisi: string;
  
  @IsString()
  position: string;

  @IsString()
  role: string;
}

