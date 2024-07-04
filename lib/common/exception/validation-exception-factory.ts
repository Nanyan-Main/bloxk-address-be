import { ValidationError, ValidationTypes } from 'class-validator';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';
import { GENERAL_VALIDATOR_RESPONSE } from './general-exception';

export const ExceptionFactory = (errors: ValidationError[]) => {
  const nestedValidate = (errors: ValidationError[]) => {
    let message: string;
    if (errors[0].constraints) {
      if (Object.keys(errors[0].constraints)[0] === ValidationTypes.WHITELIST) {
        message = GENERAL_VALIDATOR_RESPONSE.UNEXPECTED_ERROR.status;
      } else {
        message = Object.values(errors[0].constraints)[0];
      }
    } else if (errors[0].children.length > 0) {
      message = nestedValidate(errors[0].children);
    }
    return message;
  };

  const message: string = nestedValidate(errors);

  if (!message) {
    return undefined;
  }

  return new BadRequestException({
    ...(GENERAL_VALIDATOR_RESPONSE[message] || {
      status: HttpStatus[HttpStatus.BAD_REQUEST],
      message,
    }),
  });
};

export const ValidationPipeConfigs: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  validateCustomDecorators: true,
  exceptionFactory: ExceptionFactory,
  stopAtFirstError: true,
};
