import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseDbService } from './mongoose-db.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseDbService,
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseDbModule {}
