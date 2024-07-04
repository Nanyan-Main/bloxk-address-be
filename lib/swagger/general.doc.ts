import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const getApiResponseOptions = <T>(
  description: string,
  schema: T,
): ApiResponseOptions => ({
  description,
  schema: <SchemaObject & Partial<ReferenceObject>>{
    example: schema,
  },
});

export const SuccessListResponse = <T>(data: T[]) => ({
  status: HttpStatus[HttpStatus.OK],
  data: <T[]>data,
});
