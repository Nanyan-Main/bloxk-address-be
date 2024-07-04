import { Exclude } from 'class-transformer';

export class BaseDto {
  id?: string;

  @Exclude()
  _id?: string;

  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  createdBy?: string;

  @Exclude()
  updatedBy?: string;

  @Exclude()
  __v?: number;
}
