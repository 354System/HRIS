import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsensiService } from './absensi.service';
import { AbsensiController } from './absensi.controller';
import { AbsensiSchema } from 'src/schemas/absensi.schema';
import { UserModule } from 'src/user/user.module';

@Module({
    imports:[
        UserModule,
        MongooseModule.forFeature([{name:'Absensi', schema: AbsensiSchema}]),],
    controllers:[AbsensiController],
    providers:[AbsensiService]
})
export class AbsensiModule {}
