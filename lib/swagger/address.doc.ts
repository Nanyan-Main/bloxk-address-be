import { SUCCESS_RESPONSE } from 'lib/common/response/success-response';
import { GENERAL_VALIDATOR_RESPONSE } from 'lib/common/exception/general-exception';
import { getApiResponseOptions } from './general.doc';

export const addressDoc = {
  tag: 'Trader',
  createOkResponse: getApiResponseOptions(
    'Trader created successfully',
    SUCCESS_RESPONSE.SUCCESS_CREATE_ADDRESS,
  ),
  createFailResponse: [
    GENERAL_VALIDATOR_RESPONSE.EXIST_ADDRESS,
    GENERAL_VALIDATOR_RESPONSE.MAX_LENGTH_ADDRESS,
    GENERAL_VALIDATOR_RESPONSE.MIN_LENGTH_ADDRESS,
    GENERAL_VALIDATOR_RESPONSE.EMPTY_ADDRESS,
  ],
};
