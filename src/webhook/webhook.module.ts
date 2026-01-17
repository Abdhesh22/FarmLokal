import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { RedisService } from '../redis/redis.service';

@Module({
    controllers: [WebhookController],
    providers: [WebhookService, RedisService],
})
export class WebhookModule { }