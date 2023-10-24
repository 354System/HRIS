import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";


export enum Category {
    Sakit = 'Sakit',
    Liburan = 'Liburan',
    Acara_Keluarga = 'Acara Keluarga'
}


@Schema({
    timestamps:true,
})
export class Izin {


    @Prop()
    izin: Category;
    
    @Prop()
    fromdate: string;
    
    @Prop()
    untildate: string;
    
    // @Prop()
    // photo: File;
    
    @Prop()
    description : string;
    
    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] })
    user: User;


}

export const IzinSchema = SchemaFactory.createForClass(Izin);