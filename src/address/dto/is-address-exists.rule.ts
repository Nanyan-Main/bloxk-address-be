import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AddressService } from '../address.service';

export const ADDRESS_EXISTS = 'addressExists';

@ValidatorConstraint({ name: ADDRESS_EXISTS, async: true })
@Injectable()
export class AddressExists implements ValidatorConstraintInterface {
  constructor(private readonly addressService: AddressService) {}

  async validate(constraint: string, args?: Partial<ValidationArguments>) {
    if (args?.constraints[0]) {
      return !!(await this.addressService.findByName(constraint));
    }

    return !(await this.addressService.findByName(constraint));
  }
}

export function IsAddressExists(
  validationOptions?: ValidationOptions,
  inverted?: boolean,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [inverted],
      validator: AddressExists,
    });
  };
}
