import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export interface IAppError {
  status: string;
  message: string;
}

export const ApiFailedResponse = (...schemas: IAppError[]) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      content: {
        'application/json': {
          examples: schemas.reduce((list, schema) => {
            list[schema.status] = { value: schema };
            return list;
          }, {}),
        },
      },
    }),
  );
};
