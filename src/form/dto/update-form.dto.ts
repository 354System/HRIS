import { IsString } from "class-validator";
import { Category, Category1 } from "src/schemas/form.schema";
import { User } from "src/schemas/user.schema";




export class UpdateFormDto {

    approval: Category;

}