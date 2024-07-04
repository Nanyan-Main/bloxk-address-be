import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { MongooseDbModule } from './mongoose-db/mongoose-db.module';
import { MongooseModelModule } from './mongoose-model/mongoose-model.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AddressModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseDbModule,
    MongooseModelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
