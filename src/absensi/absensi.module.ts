import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsensiService } from './absensi.service';
import { AbsensiController } from './absensi.controller';
import { AbsensiSchema } from 'src/schemas/absensi.schema';
import { UserModule } from 'src/user/user.module';
import { MinioClientModule } from 'src/minio/minio-client.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports:[
        MinioClientModule,
        UserModule,
        MongooseModule.forFeature([{name:'Absensi', schema: AbsensiSchema}]),],
    providers:[AbsensiService,MinioClientModule],
    controllers:[AbsensiController],
})
export class AbsensiModule {}
