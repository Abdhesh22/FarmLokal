import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
    private readonly redis = new Redis({
        host: 'localhost',
        port: 6379,
    });

    get client() {
        return this.redis;
    }
}
