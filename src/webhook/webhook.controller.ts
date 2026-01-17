import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) { }

    @Post('external')
    async handle(@Body() payload: any) {
        await this.webhookService.processEvent(payload);
        return { status: 'ok' };
    }
}
