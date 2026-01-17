import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class WebhookService {
    constructor(private readonly redis: RedisService) { }

    async processEvent(event: any) {
        const eventId = event.id;
        const key = `webhook:event:${eventId}`;

        const alreadyProcessed = await this.redis.client.get(key);
        if (alreadyProcessed) {
            return;
        }

        await this.handleBusinessLogic(event);
        await this.redis.client.set(key, '1', 'EX', 60 * 60);
    }

    private async handleBusinessLogic(event: any) {
        // save to DB, update state, etc.
    }
}
