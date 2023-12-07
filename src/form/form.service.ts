import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Form } from 'src/schemas/form.schema';
import { User } from 'src/schemas/user.schema';
import { UpdateFormDto } from './dto/update-form.dto';
import { BufferedFile } from 'src/minio/file.model';
import { MinioClientService } from 'src/minio/minio-client.service';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(Form.name)
    private formModel: Model<Form>,
    private minioClientService: MinioClientService,


  ) { }

  async findAll(query: Query): Promise<Form[]> {

    const resPerPage = 10
    const currentPage = Number (query.page) || 1
    const skip = resPerPage * (currentPage - 1)


    const keyword = query.keyword ? {
      'user.name': {
        $regex: query.keyword,
        $options: 'i',
      }
    } : {};

    const forms = await this.formModel.find({ ...keyword });
    return forms;
  }


  async createForm(form: any, user: User, image: BufferedFile): Promise<Form> {
    const Time = new Date();

    let uploaded_image = await this.minioClientService.upload(image)


    const data = Object.assign(form, {
      user: {
        id: user._id,
        name: user.name,
      },
      date: Time,
      approval: 'Wait For Response',
      file: uploaded_image.url,

    });

    const res = await this.formModel.create(data);
    return res;
  }

  async updateForm(id: string, updateFormDto: UpdateFormDto): Promise<Form> {
    const form = await this.formModel.findById(id);

    if (!form) {
      throw new HttpException('Absensi not found', HttpStatus.NOT_FOUND);
    }
    // Pastikan bahwa "checkout" ada dalam data yang dikirim dari frontend
    if (!updateFormDto.approval) {
      throw new HttpException('Invalid data: "checkout" field is missing', HttpStatus.BAD_REQUEST);
    }

    // Setel properti "checkout" dengan nilai yang baru
    form.approval = updateFormDto.approval; // Pastikan konversi ke tipe Date jika perlu

    // Simpan perubahan ke database
    const updatedAbsensi = await form.save();  

    return updatedAbsensi;
  }

  async deleteById(id: string): Promise<Form> {
    return await this.formModel.findByIdAndDelete(id, {
    });
  }

  async findAbsensiByUserId(id: string, query: Query): Promise<Form[]> {

    const resPerPage = 10
    const currentPage = Number (query.page) || 1
    const skip = resPerPage * (currentPage - 1)

    return this.formModel.find({ 'user._id': id }).exec();
  }

  async uploadSingle(image: BufferedFile) {
    let uploaded_image = await this.minioClientService.upload(image)

    const newUpload = new this.formModel({
      file: uploaded_image.url,
    });

    await newUpload.save();

    return {
      image_url: uploaded_image.url,
      message: "Successfully uploaded to MinIO S3 and saved to the database"
    }
  }
}
