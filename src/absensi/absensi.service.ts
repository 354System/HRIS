import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Absensi } from 'src/schemas/absensi.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/schemas/user.schema';
import { BufferedFile } from 'src/minio/file.model';
import { MinioClientService } from 'src/minio/minio-client.service';
import { UpdateAbsensiDto } from './dto/update-absen.dto';
import { UserService } from 'src/user/user.service';



@Injectable()
export class AbsensiService {
  private readonly logger = new Logger(AbsensiService.name);
  constructor(
    @InjectModel(Absensi.name)
    private absensiModel: Model<Absensi>,
    private minioClientService: MinioClientService,
    private userService: UserService,
    

  ) { }

  async findAll(query: Query): Promise<Absensi[]> {

    const resPerPage = 10
    const currentPage = Number (query.page) || 1
    const skip = resPerPage * (currentPage - 1)

    const keyword = query.keyword ? {
      'user.name': {
        $regex: query.keyword,
        $options: 'i',
      }
    } : {};

    const absensis = await this.absensiModel.find({ ...keyword });
    return absensis;
  }

  // @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }

  async getAllUsersWhoHaveNotMarkedAttendanceToday() {
    const users = await this.userService.findAll({}); // Mengambil semua pengguna dari basis data
    const usersWithoutAttendance: User[] = [];
    const userIds = users.map(user => user._id);
    const absenTime = new Date(); // Membuat objek tanggal dan waktu saat ini
  
    for (const user of users) {
      const startOfToday = new Date(absenTime.getFullYear(), absenTime.getMonth(), absenTime.getDate(), 0, 0, 0); // Waktu mulai hari ini
      const endOfToday = new Date(absenTime.getFullYear(), absenTime.getMonth(), absenTime.getDate(), 23, 59, 59); // Waktu akhir hari ini
  
      // Mencari entri absensi untuk setiap pengguna pada hari itu
      const absensi = await this.absensiModel.find({
        'user.id':{ $in: userIds }, // Sesuaikan dengan properti yang tepat untuk mencocokkan ID pengguna
        date: { $gte: startOfToday, $lte: endOfToday },
        type: { $in: ['Present', 'Late'] }
      });

      console.log(userIds);
      
  
      // Jika tidak ada entri absensi yang ditemukan, tandai pengguna sebagai belum absen
      if (!absensi || absensi.length === 0) {
        usersWithoutAttendance.push(user);
      }
    }
  
    return usersWithoutAttendance;
  }
  
  

  async createAbsensi(absensi: any, user: User, image: BufferedFile): Promise<Absensi> {

    const absenTime = new Date(); // Membuat objek tanggal dan waktu saat ini

    let uploaded_image = await this.minioClientService.upload(image)

    // Tentukan batas waktu untuk menganggap karyawan sebagai "telat" (misalnya, pukul 09:30)
    const lateBoundary = new Date(absenTime);
    lateBoundary.setHours(9, 30, 0, 0);

    // Tentukan batas waktu untuk menganggap karyawan sebagai "alfa" (misalnya, pukul 17:00)
    const absentBoundary = new Date(absenTime);
    absentBoundary.setHours(17, 0, 0, 0);

    // Inisialisasi status absensi
    let absensiStatus: string = 'Present';

    // Periksa apakah waktu absensi berada dalam batas waktu telat
    if (absenTime > lateBoundary && absenTime <= absentBoundary) {
      absensiStatus = 'Late';
    } else if (absenTime > absentBoundary) {
      absensiStatus = 'Absent';
    }

    // Menambahkan informasi pengguna dan status ke dokumen Absensi
    const data = Object.assign(absensi, {
      user: {
        id: user._id,      // ID pengguna
        name: user.name,    // Nama pengguna (sesuai dengan properti yang ada di objek User)
        divisi: user.divisi,
        position: user.position,
      },
      date: absenTime, // Mengisi field date dalam dokumen Absensi dengan waktu saat pencatatan absensi
      type: absensiStatus, // Menambahkan status absensi
      file: uploaded_image.url, // Assuming your schema has a field 'imageUrl'
    });
    // console.log(uploaded_image.url);
    

    const res = await this.absensiModel.create(data);
    return res;
  }

  async findAbsensiByUserId(id: string, query: Query): Promise<Absensi[]> {
    
    const resPerPage = 10
    const currentPage = Number (query.page) || 1
    const skip = resPerPage * (currentPage - 1)

    return this.absensiModel.find({ 'user._id': id }).exec();
  }

  async updateCheckout(id: string, updateAbsensiDto: UpdateAbsensiDto): Promise<Absensi> {
    const absensi = await this.absensiModel.findById(id);

    if (!absensi) {
      throw new HttpException('Absensi not found', HttpStatus.NOT_FOUND);
    }
    // Pastikan bahwa "checkout" ada dalam data yang dikirim dari frontend
    if (!updateAbsensiDto.checkout) {
      throw new HttpException('Invalid data: "checkout" field is missing', HttpStatus.BAD_REQUEST);
    }

    // Setel properti "checkout" dengan nilai yang baru
    absensi.checkout = new Date(updateAbsensiDto.checkout); // Pastikan konversi ke tipe Date jika perlu

    // Simpan perubahan ke database
    const updatedAbsensi = await absensi.save();

    return updatedAbsensi;
  }

  async uploadSingle(image: BufferedFile) {
    let uploaded_image = await this.minioClientService.upload(image)
    // function buat create ke db
    // url nya itu uploaded_image.url

    // Create a new document and save it to the database
    const newUpload = new this.absensiModel({
      file: uploaded_image.url, // Assuming your schema has a field 'imageUrl'
    });

    await newUpload.save();

    return {
      image_url: uploaded_image.url,
      message: "Successfully uploaded to MinIO S3 and saved to the database"
    }
  }

  /**
   * 1.cari user yang hari ini belum absen / alfa
   * 2.kalau sudah ketemu
   * 3.buat suatu function yang akan membuat absensi alfa
   */






}
