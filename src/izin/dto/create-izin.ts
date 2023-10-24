import { IsString } from "class-validator";
import { Category } from "src/schemas/izin.schema";
import { User } from "src/schemas/user.schema";



export class CreateIzinDto {

    @IsString()
    izin: Category;

    @IsString()
    fromdate: string;

    @IsString()
    untildate: string;
    
    // photo: File;
    
    @IsString()
    description : string;

    user: User;

}