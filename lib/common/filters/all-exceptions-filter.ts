import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { MongooseError } from 'mongoose';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    if (exception instanceof MongooseError) {
      switch (exception.name) {
        case 'CastError':
        case 'ValidationError':
          status = HttpStatus.BAD_REQUEST;
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error({ err: exception });
      } else {
        this.logger.error('UnhandledException', exception);
      }
    }

    response.status(status).json({
      status: exception.response?.status || HttpStatus[status],
      message: exception.response?.message || exception.message,
    });
  }
}
