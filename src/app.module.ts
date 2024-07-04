import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { MongooseDbModule } from './mongoose-db/mongoose-db.module';
import { MongooseModelModule } from './mongoose-model/mongoose-model.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from 'lib/common/filters/all-exceptions-filter';
import { CsvModule } from './csv/csv.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ONE_MINUTE, RateLimits } from './constant';
import { ApiKeyMiddleware } from './api-key/api-key.middleware';
import { ApiKeyService } from './api-key/api-key.service';
import { ApiKeyModule } from './api-key/api-key.module';

@Module({
  imports: [
    AddressModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseDbModule,
    MongooseModelModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return [
          {
            ttl: config.get('ALL_TTL_MIN', RateLimits.all.ttl) * ONE_MINUTE,
            limit: config.get('ALL_RATE_LIMIT', RateLimits.all.limit),
          },
        ];
      },
    }),
    CsvModule,
    ApiKeyModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ApiKeyService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
