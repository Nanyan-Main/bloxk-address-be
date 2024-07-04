import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADDRESS_COLLECTION_NAME } from 'src/constant';

@Schema({ timestamps: true, collection: ADDRESS_COLLECTION_NAME })
export class Address {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userIp: string;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
export const ADDRESS_MODEL = Address.name;
export interface AddressModel extends Model<AddressDocument> {}
