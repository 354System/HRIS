import { IsString } from "class-validator";
import { User } from "src/schemas/user.schema";



export class CreateAbsensiDto {

    @IsString()
    absen: string;

    @IsString()
    checkin: string;

    @IsString()
    checkout: string;

    // photo: File;

    user: User;

}