import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressDto } from './dto/address.dto';
import { plainToInstance } from 'class-transformer';
import { SuccessTransformInterceptor } from 'lib/common/interceptor/success-transform.interceptor';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiFailedResponse } from 'lib/common/decorator/api-failed-response.decorator';
import { addressDoc } from 'lib/swagger/address.doc';
import { CreateAddressInterceptor } from 'lib/common/interceptor/add-extra-fields.interceptor';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseInterceptors(new SuccessTransformInterceptor())
  @UseInterceptors(CreateAddressInterceptor)
  @ApiOkResponse(addressDoc.createOkResponse)
  @ApiFailedResponse(...addressDoc.createFailResponse)
  async create(@Body() createAddressDto: CreateAddressDto) {
    const address = await this.addressService.create(createAddressDto);
    return plainToInstance(AddressDto, address);
  }

  @Get()
  @UseInterceptors(new SuccessTransformInterceptor())
  @ApiOkResponse(addressDoc.findAllOkResponse)
  async findAll() {
    const addresses = await this.addressService.findAll();
    return addresses.map((address) => plainToInstance(AddressDto, address));
  }

  /*   @Get(':id')
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
  } */
}
