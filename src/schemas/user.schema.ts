import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class User extends Document {

    @Prop()
    name: string;

    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;

    @Prop()
    password: string;
    
    @Prop()
    address: string;

    @Prop({ unique: [true, 'Duplicate number phone entered'] })
    numberphone: number;

    @Prop()
    divisi: string;
    
    @Prop()
    position: string;

    @Prop()
    role: string;


}

export const UserSchema = SchemaFactory.createForClass(User);