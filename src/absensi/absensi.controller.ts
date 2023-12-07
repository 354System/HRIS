import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { AbsensiService } from './absensi.service';
import { AuthGuard } from '@nestjs/passport';
import { Absensi } from 'src/schemas/absensi.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio/file.model';
import { UpdateAbsensiDto } from './dto/update-absen.dto';
import { Cron } from '@nestjs/schedule';
import { User } from 'src/schemas/user.schema';


@Controller('absensi')
export class AbsensiController {

  constructor(private absensiService: AbsensiService,) { }

  @Get('/all')
  @UseGuards(AuthGuard())
  async getAllabsens(@Query() query: ExpressQuery): Promise<Absensi[]> {
    return this.absensiService.findAll(query)
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard())
  async createAbsen(
    @UploadedFile() image: BufferedFile,
    @Body() createAbsensiDto: CreateAbsensiDto,
    @Req() req,): Promise<Absensi> {
    return await this.absensiService.createAbsensi(createAbsensiDto, req.user,image);
  }

  @Get('by/:id')
  async getAbsensiByUserId(@Param('id') id: string, @Query() query: ExpressQuery) {
    const absensi = await this.absensiService.findAbsensiByUserId(id,query);
    return absensi;
  }

  @Patch('checkout/:id')
  async updateCheckout(@Param('id') id: string, @Body() updateAbsensiDto: UpdateAbsensiDto): Promise<Absensi> {
    return this.absensiService.updateCheckout(id, updateAbsensiDto);
  }

  // @Post('file')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadSingle(
  //   @UploadedFile() image: BufferedFile
  // ) {
  //   return await this.absensiService.uploadSingle(image)
  // }

  // @Get('/absent-users')
  // async getAbsentUsersToday() {
  //   return await this.absensiService.getAllUsersWhoHaveNotMarkedAttendanceToday();
  // }

}
