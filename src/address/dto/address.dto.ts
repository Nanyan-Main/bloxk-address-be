import { Expose } from 'class-transformer';
import { BaseDto } from 'lib/common/dto/base-dto';
import { Address } from 'src/schema/address.schema';
export class AddressDto extends BaseDto {
  @Expose()
  data: string;

  @Expose()
  createdAt: Date;

  constructor(address: Partial<Address>) {
    super();
    Object.assign(this, address);
  }
}
