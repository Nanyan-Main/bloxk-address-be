import { ValidationPipe, ArgumentMetadata, Injectable } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
import { REWRITE_VALIDATION_OPTIONS } from '../decorator/rewrite-validation-options.decorator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    const options = Reflect.getMetadata(
      REWRITE_VALIDATION_OPTIONS,
      metadata.metatype,
    );
    let originOptions: ValidatorOptions;

    if (options) {
      originOptions = Object.assign({}, this.validatorOptions);
      this.validatorOptions = Object.assign(this.validatorOptions, options);
    }
    try {
      const result = super.transform(value, metadata);
      if (originOptions) {
        this.validatorOptions = originOptions;
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
