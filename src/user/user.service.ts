import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
// import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { Query } from 'express-serve-static-core';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    public jwtService: JwtService,

  ) { }


  async findAll(query: Query): Promise<User[]> {


    const keyword = query.keyword ? {
      name: {
        $regex: query.keyword,
        $options: 'i',
      }
    } : {};

    const users = await this.userModel.find({ ...keyword });
    return users;
  }

  async findOne(id: number) {
    return await this.userModel.findOne({ where: { id: id } });
  }

  async findOneWithUserName(userName: string) {
    return await this.userModel.findOne({ where: { email: userName } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const { name, email, numberphone, password } = createUserDto;

    // Periksa apakah email sudah ada dalam basis data
    const existingEmailUser = await this.userModel.findOne({ email });
    if (existingEmailUser) {
      throw new BadRequestException('Email already exists');
    }

    // Periksa apakah nomor telepon sudah ada dalam basis data
    const existingPhoneUser = await this.userModel.findOne({ numberphone });
    if (existingPhoneUser) {
      throw new BadRequestException('Phone number already exists');
    }


    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await this.userModel.create({
      name,
      email,
      numberphone,
      password: hashedPassword,
      role: 'Public',
    })

    const token = this.jwtService.sign({ id: user._id })

    return { token };
  }

  async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    // Check if updateUserDto contains a new password
    if (updateUserDto.password) {
      // Hash the new password before saving it
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10); // You can adjust the salt rounds (10) as needed
    }

    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidator: true,
    });
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('Invalid Email')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Password')
    }
    const token = this.jwtService.sign({ id: user._id, email: user.email })
    const role = user.role
    const username = user.name
    const useremail = user.email
    const data = {
      token: token,
      role: role,
      username: username,
      useremail: useremail
    }

    return data;
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id, {
    });


  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async getUserFromToken(token: string): Promise<{ id_user: string, role: string }> {
    const payload = this.jwtService.verify(token);

    const user = await this.getUserById(payload.id);

    if (!user || !user.name) {
      throw new Error('User not found or name is missing');
    }

    return { id_user: payload.id, role: user.role };
  }



}
