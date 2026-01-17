import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OAuthTokenService } from './oauth.service';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [OAuthTokenService, RedisService],
  exports: [OAuthTokenService],
})
export class OAuthModule { }

