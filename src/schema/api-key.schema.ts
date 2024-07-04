import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Schema()
export class ApiKey {
  data: string;
}

export type ApiDocument = ApiKey & Document;
export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
export const API_KEY_MODEL = ApiKey.name;
export interface ApiKeyModel extends Model<ApiDocument> {}
