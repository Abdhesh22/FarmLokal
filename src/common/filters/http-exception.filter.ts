import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    private readonly logFile = path.join(process.cwd(), 'logs', 'error.log');

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        const log = {
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            status,
            message,
            stack: exception instanceof Error ? exception.stack : undefined,
        };


        this.logger.error(log);

        this.writeToFile(log);

        response.status(status).json({
            statusCode: status,
            message,
            path: request.url,
            timestamp: log.timestamp,

        });
    }

    private writeToFile(log: unknown) {
        const date = new Date().toISOString().split('T')[0];
        const dir = path.join(process.cwd(), 'logs');

        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        const file = path.join(dir, `${date}.log`);
        fs.appendFileSync(file, JSON.stringify(log) + '\n');
    }

}