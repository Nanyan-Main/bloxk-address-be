import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { SetMetadata } from '@nestjs/common';

export const REWRITE_VALIDATION_OPTIONS = 'rewrite-validation-options';

export function RewriteValidationOptions(options: ValidatorOptions) {
  return SetMetadata(REWRITE_VALIDATION_OPTIONS, options);
}
