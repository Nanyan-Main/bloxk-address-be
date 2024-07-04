// Refactored api-key.middleware.ts
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || !(await this.apiKeyService.findByKey(apiKey as string))) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'API Key is missing or invalid.',
      });
    }
    next();
  }
}
