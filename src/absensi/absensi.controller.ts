import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { AbsensiService } from './absensi.service';
import { AuthGuard } from '@nestjs/passport';
import { Absensi } from 'src/schemas/absensi.schema';
import { Query as ExpressQuery} from 'express-serve-static-core';


@Controller('absensi')
export class AbsensiController {

    constructor(private absensiService: AbsensiService,) {}

    @Get('/all')
    @UseGuards(AuthGuard())
    async getAllabsens(@Query()  query: ExpressQuery,@Param('id') id: string): Promise<Absensi[]> {
        return this.absensiService.findAll(query)
    }
    
    @Post('/create')
    // @UseGuards(AuthGuard())
    createAbsen(
        @Body() createAbsensiDto: CreateAbsensiDto,
        @Req() req,): Promise<Absensi>{
        return this.absensiService.createAbsensi(createAbsensiDto,req.user);
    }
}
