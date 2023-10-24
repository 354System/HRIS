import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsensiModule } from './absensi/absensi.module';
import { IzinModule } from './izin/izin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AbsensiModule,
    IzinModule,],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
