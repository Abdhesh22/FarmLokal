import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiAService } from './api-a.services';
import { ExternalController } from './external.controller';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [ExternalController],
    providers: [ApiAService],
})
export class ExternalModule { }
