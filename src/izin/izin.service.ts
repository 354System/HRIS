import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Izin } from 'src/schemas/izin.schema';
import { User } from 'src/schemas/user.schema';
import { UpdateIzinDto } from './dto/update-izin.dto';
import { MinioClientService } from 'src/minio/minio-client.service';
import { BufferedFile } from 'src/minio/file.model';

@Injectable()
export class IzinService {
    constructor(
        @InjectModel(Izin.name)
        private izinModel: Model<Izin>,
        private minioClientService: MinioClientService,


    ) { }


    async findAll(query: Query): Promise<Izin[]> {

        const resPerPage = 10
        const currentPage = Number (query.page) || 1
        const skip = resPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            'user.name': {
                $regex: query.keyword,
                $options: 'i',
            }
        } : {};

        const absensis = await this.izinModel.find({ ...keyword });
        return absensis;
    }

    async createIzin(izin: any, user: User, image: BufferedFile): Promise<Izin> {
        const Time = new Date();

        let uploaded_image = await this.minioClientService.upload(image)


        const data = Object.assign(izin, {
            user: {
                id: user._id,
                name: user.name,
                divisi: user.divisi,
                position: user.position,
            },
            date: Time,
            approval: 'Wait For Response',
            file: uploaded_image.url, // Assuming your schema has a field 'imageUrl'
        });

        const res = await this.izinModel.create(data);
        return res;
    }



    async findIzinByUserId(id: string,query: Query): Promise<Izin[]> {

        const resPerPage = 10
        const currentPage = Number (query.page) || 1
        const skip = resPerPage * (currentPage - 1)
        // Menggunakan metode `find` untuk mencari izin berdasarkan ID pengguna
        return this.izinModel.find({ 'user._id': id }).exec();
    }


    async updateApproved(id: string, updateIzinDto: UpdateIzinDto): Promise<Izin> {
        const izin = await this.izinModel.findById(id);

        if (!izin) {
            throw new HttpException('Izin not found', HttpStatus.NOT_FOUND);
        }
        // Pastikan bahwa "approval" ada dalam data yang dikirim dari frontend
        if (!updateIzinDto.approval) {
            throw new HttpException('Invalid data: "approval" field is missing', HttpStatus.BAD_REQUEST);
        }

        // Setel nilai "approval" ke entitas "cuti"
        izin.approval = updateIzinDto.approval;

        // Simpan perubahan ke database
        const updatedIzin = await izin.save();

        return updatedIzin;
    }


    // async checkIzinExist(user: User, date: string): Promise<boolean> {
    //     const existingIzin = await this.izinModel
    //       .findOne({
    //         user: user._id,
    //         date, // Gantilah dengan cara Anda menyimpan tanggal
    //       })
    //       .exec();

    //     return !!existingIzin;
    //   }


}
