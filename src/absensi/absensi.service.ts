import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Absensi } from 'src/schemas/absensi.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/schemas/user.schema';


@Injectable()
export class AbsensiService {
    constructor(
        @InjectModel(Absensi.name)
        private absensiModel: Model<Absensi>,

    ) { }

    async findAll(query: Query): Promise<Absensi[]> {


        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $options: 'i',
            }
        } : {};

        const absensis = await this.absensiModel.find({ ...keyword });
        return absensis;
    }

    async createAbsensi(absensi: any, user: User): Promise<Absensi> {
        const data = Object.assign(absensi, { user: user._id});
        const absenTime = new Date(); // Membuat objek tanggal dan waktu saat ini
        absensi.date = absenTime; // Mengisi field date dalam dokumen Absensi dengan waktu saat pencatatan absensi
        const res = await this.absensiModel.create(data);
        return res;
    }


    // async createOrder(user: string, ): Promise<Absensi> {
    //     const newAbsensi = new this.absensiModel({
    //       user, // Merujuk ke ID pengguna yang membuat pesanan
    //     });

    //     return newAbsensi.save();

    // }

}
