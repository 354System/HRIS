import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Cuti } from 'src/schemas/cuti.schema';
import { User } from 'src/schemas/user.schema';
import { UpdateCutiDto } from './dto/update-cuti.dto';
import { MinioClientService } from 'src/minio/minio-client.service';
import { BufferedFile } from 'src/minio/file.model';

@Injectable()
export class CutiService {
  constructor(
    @InjectModel(Cuti.name)
    private cutiModel: Model<Cuti>,
    private minioClientService: MinioClientService,

    @InjectModel(User.name) private userModel: Model<User>,

  ) { }

  async findAll(query: Query): Promise<Cuti[]> {

    const resPerPage = 10
    const currentPage = Number (query.page) || 1
    const skip = resPerPage * (currentPage - 1)

    const keyword = query.keyword ? {
      'user.name': {
        $regex: query.keyword,
        $options: 'i',
      }
    } : {};

    const cutis = await this.cutiModel.find({ ...keyword });
    return cutis;
  }


  async createCuti(cuti: any, user: User, image: BufferedFile): Promise<Cuti> {
    const currentDate = new Date();

    let uploaded_image = await this.minioClientService.upload(image)

    // Cek apakah pengguna memiliki sisa cuti dari bulan sebelumnya
    const userDetail = await this.userModel.findById(user._id);
    if (userDetail.remainingCuti > 0) {

      // Jika tidak ada sisa cuti dari bulan sebelumnya, buat entri cuti baru
      const data = Object.assign(cuti, {
        user: {
          id: user._id,
          name: user.name,
          divisi: user.divisi,
          position: user.position,
        },
        date: currentDate,
        approval: 'Wait For Response',
        file: uploaded_image.url, // Assuming your schema has a field 'imageUrl'
      });

      const res = await this.cutiModel.create(data);
      return res;

    } else {
      throw new HttpException('RemainingCuti not found', HttpStatus.NOT_FOUND);
    }
  }


  async findCutiByUserId(id: string,query: Query): Promise<Cuti[]> {

    const resPerPage = 10
    const currentPage = Number (query.page) || 1
    const skip = resPerPage * (currentPage - 1)

    return this.cutiModel.find({ 'user._id': id }).sort({createdAt: -1}).limit(resPerPage).skip(skip).exec();
  }


  calculateDateDifference(fromDate: Date, untilDate: Date): number {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDifference = untilDate.getTime() - fromDate.getTime();
    const totalDays = Math.floor(timeDifference / millisecondsPerDay);

    return totalDays;
  }

  async updateApproved(id: string, updateCutiDto: UpdateCutiDto): Promise<Cuti> {
    const cuti = await this.cutiModel.findById(id);

    if (!cuti) {
      throw new HttpException('Cuti not found', HttpStatus.NOT_FOUND);
    }
    // Pastikan bahwa "approval" ada dalam data yang dikirim dari frontend
    if (!updateCutiDto.approval) {
      throw new HttpException('Invalid data: "approval" field is missing', HttpStatus.BAD_REQUEST);
    }

    const userDetail = await this.userModel.findById(cuti.user._id);
    if (!userDetail) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Setel nilai "approval" ke entitas "cuti"
    cuti.approval = updateCutiDto.approval;

    const fromDate = new Date(cuti.fromdate);
    let untilDate = new Date(cuti.untildate);
    untilDate?.setDate(untilDate.getDate() + 1)

    const totalDays = this.calculateDateDifference(fromDate, untilDate);

    console.log(totalDays);

    // Kurangi remainingCuti dengan total hari cuti yang diambil
    userDetail.remainingCuti -= totalDays;


    await userDetail.save();

    // Simpan perubahan ke database
    const updatedCuti = await cuti.save();

    return updatedCuti;
  }
}
