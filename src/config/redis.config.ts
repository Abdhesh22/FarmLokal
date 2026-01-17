import { registerAs } from '@nestjs/config';

export interface RedisConfig {
    host: string;
    port: number;
}

export default registerAs('redis', () => ({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
}));
