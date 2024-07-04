import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';

import { Observable } from 'rxjs';

@Injectable()
export class AddExtraFieldsInterceptor implements NestInterceptor {
  private readonly extractClasses: ExtractFromRequest[];
  constructor(...extractClasses: ExtractFromRequest[]) {
    this.extractClasses = extractClasses;
  }

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest();
    const extraFields = this.extractClasses
      .map((cls) => cls.get(request))
      .reduce((merged, obj) => ({ ...merged, ...obj }), {});

    request.body = {
      ...request.body,
      ...extraFields,
    };

    for (const field of Object.keys(extraFields)) {
      if (!field.includes('.')) {
        continue;
      }
      const [objName, fieldName] = field.split('.');
      request.body[objName] = {
        ...(request.body[objName] ? request.body[objName] : {}),
        [fieldName]: extraFields[field],
      };
      delete request.body[field];
    }

    return next.handle();
  }
}

interface ExtractFromRequest {
  get(req: Request): Record<string, any>;
}
export type ExtraField = { name: string; field: string };
export const ExtraFieldsMap = {
  USER_IP: { name: 'userIp', field: 'userIp' },
};
class ExtractIpFromRequest implements ExtractFromRequest {
  constructor(private readonly fieldName: ExtraField) {}
  get(request: Request) {
    return {
      [this.fieldName.field]:
        request.headers['x-real-ip'] || request.socket.remoteAddress,
    };
  }
}

export const CreateAddressInterceptor = new AddExtraFieldsInterceptor(
  new ExtractIpFromRequest(ExtraFieldsMap.USER_IP),
);
