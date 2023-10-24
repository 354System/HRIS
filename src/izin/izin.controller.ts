import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateIzinDto } from './dto/create-izin';
import { Izin } from 'src/schemas/izin.schema';
import { IzinService } from './izin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('izin')
export class IzinController {
    constructor(private izinService: IzinService,) { }

    @Post('/create')
    // @UseGuards(AuthGuard())
    createAbsen(@Body() createIzinDto: CreateIzinDto, @Req() req,): Promise<Izin> {
        return this.izinService.createIzin(createIzinDto,);
    }


}
