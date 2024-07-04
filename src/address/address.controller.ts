import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressDto } from './dto/address.dto';
import { plainToInstance } from 'class-transformer';
import { SuccessTransformInterceptor } from 'lib/common/interceptor/success-transform.interceptor';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiFailedResponse } from 'lib/common/decorator/api-failed-response.decorator';
import { addressDoc } from 'lib/swagger/address.doc';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseInterceptors(new SuccessTransformInterceptor())
  @ApiOkResponse(addressDoc.createOkResponse)
  @ApiFailedResponse(...addressDoc.createFailResponse)
  async create(@Body() createAddressDto: CreateAddressDto) {
    const address = await this.addressService.create(createAddressDto);
    return plainToInstance(AddressDto, address);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
