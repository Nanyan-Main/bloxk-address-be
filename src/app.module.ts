import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { MongooseDbModule } from './mongoose-db/mongoose-db.module';
import { MongooseModelModule } from './mongoose-model/mongoose-model.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'lib/common/filters/all-exceptions-filter';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [
    AddressModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseDbModule,
    MongooseModelModule,
    CsvModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
