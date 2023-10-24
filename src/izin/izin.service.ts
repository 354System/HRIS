import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Izin } from 'src/schemas/izin.schema';

@Injectable()
export class IzinService {
    constructor(
        @InjectModel(Izin.name)
        private izinModel: Model<Izin>,

    ) { }



    async createIzin(izin: Izin ):Promise<Izin> {
        const res = await this.izinModel.create(izin)
        return res;
    }


}
