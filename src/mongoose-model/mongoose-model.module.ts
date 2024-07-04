import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ADDRESS_MODEL, AddressSchema } from 'src/schema/address.schema';
import { API_KEY_MODEL, ApiKeySchema } from 'src/schema/api-key.schema';
const allModels = [
  { name: ADDRESS_MODEL, schema: AddressSchema },
  { name: API_KEY_MODEL, schema: ApiKeySchema },
];
@Global()
@Module({
  imports: [MongooseModule.forFeature(allModels)],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
