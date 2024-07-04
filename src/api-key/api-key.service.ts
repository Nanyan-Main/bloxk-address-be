import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { API_KEY_MODEL, ApiKeyModel } from 'src/schema/api-key.schema';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(API_KEY_MODEL) private readonly apiKeyModel: ApiKeyModel,
  ) {}

  async findByKey(data: string): Promise<boolean> {
    const apiKey = await this.apiKeyModel.findOne({ data }).exec();

    return !!apiKey;
  }
}
