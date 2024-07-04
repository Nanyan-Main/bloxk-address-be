import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressExists } from './dto/is-address-exists.rule';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressExists],
  exports: [AddressService],
})
export class AddressModule {}
