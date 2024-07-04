import { SUCCESS_RESPONSE } from 'lib/common/response/success-response';
import { GENERAL_VALIDATOR_RESPONSE } from 'lib/common/exception/general-exception';
import { getApiResponseOptions, SuccessListResponse } from './general.doc';

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
  findAllOkResponse: getApiResponseOptions(
    'Addresses found successfully',
    SuccessListResponse([
      {
        name: 'xxxxxxxxxxxxxxxxxxxxxxxx',
        createdAt: '2024-07-04T12:01:39.037Z',
      },
    ]),
  ),
};
