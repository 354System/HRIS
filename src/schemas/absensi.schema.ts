import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { File } from "buffer";
import mongoose from "mongoose";
import { User } from "./user.schema";

export enum Category {
    WFO = 'Work From Office',
    WFH = 'Work Form Home'
}

@Schema({
    timestamps:true,
})
export class Absensi {

    @Prop()
    absen: string;

    @Prop()
    checkin: string;

    @Prop()
    checkout: string;

    @Prop()
    photo: string;

    @Prop()
    date: Date;
    
    @Prop()
    type: Category;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] })
    user: User;

}

export const AbsensiSchema = SchemaFactory.createForClass(Absensi);