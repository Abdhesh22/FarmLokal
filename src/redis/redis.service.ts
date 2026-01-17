import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisConfig } from '../config/redis.config';

@Injectable()
export class RedisService implements OnModuleInit {
    private redisClient!: Redis;

    constructor(private readonly config: ConfigService) { }

    onModuleInit() {
        const { host, port } = this.config.get<RedisConfig>('redis', { infer: true })!;
        this.redisClient = new Redis({ host, port });
    }

    get client() {
        return this.redisClient;
    }
}
