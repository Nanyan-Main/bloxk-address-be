import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const confDoc = {
  title: 'Bloxk BACKEND API',
  description: 'API for Bloxk',
  version: '1.0',
  securityName: 'JWT',
  endpoint: 'api',
  bearerAuth: <SecuritySchemeObject>{
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'authorization',
    description: 'Enter Access Token',
    in: 'header',
  },
};
