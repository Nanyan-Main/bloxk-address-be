import { BadRequestException } from '@nestjs/common';
import { MAX_LENGTH_ADDRESS, MIN_LENGTH_ADDRESS } from 'src/constant';

export const GENERAL_VALIDATOR_RESPONSE = {
  UNEXPECTED_ERROR: {
    status: 'UNEXPECTED_ERROR',
    message: 'An unexpected error occurred. Please try again later',
  },
  MIN_LENGTH_ADDRESS: {
    status: 'MIN_LENGTH_TRADER_USERNAME',
    message: `Please do not enter less than ${MIN_LENGTH_ADDRESS} characters.`,
  },
  MAX_LENGTH_ADDRESS: {
    status: 'MAX_LENGTH_TRADER_USERNAME',
    message: `Not allow user to input more ${MAX_LENGTH_ADDRESS} characters.`,
  },
  EMPTY_ADDRESS: {
    status: 'EMPTY_ADDRESS',
    message: 'Address is required',
  },
  EXIST_ADDRESS: {
    status: 'EXIST_ADDRESS',
    message: 'Address is already existed',
  },
};
const GENERAL_RESPONSE = {
  FAILED_CREATE_ADDRESS: {
    status: 'FAILED_CREATE_ADDRESS',
    message: 'Adress creation failed',
  },
};
export class FailCreateAddressException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_CREATE_ADDRESS);
  }
}
