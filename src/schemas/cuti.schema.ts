import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Document } from "mongoose";
import { ICuti } from "src/interface/interface.cuti";

export enum Category {
    Wait_For_Response = 'Wait For Response',
    Approved = 'Approved',
    Reject = 'Reject'
}

@Schema({
    timestamps:true,
})
export class Cuti extends Document implements ICuti{

    @Prop()
    cuti: string;   

    @Prop()
    approval: Category;
    
    @Prop()
    fromdate: Date;
    
    @Prop()
    untildate: Date;
    
    @Prop()
    file: string;
    
    @Prop() 
    description : string;
    
    @Prop()
    user: User;

    

}

export const CutiSchema = SchemaFactory.createForClass(Cuti);