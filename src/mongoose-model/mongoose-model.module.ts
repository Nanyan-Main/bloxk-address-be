import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ADDRESS_MODEL, AddressSchema } from 'src/schema/address.schema';
const allModels = [{ name: ADDRESS_MODEL, schema: AddressSchema }];
@Global()
@Module({
  imports: [MongooseModule.forFeature(allModels)],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
