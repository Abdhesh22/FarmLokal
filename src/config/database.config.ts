import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
}

export default registerAs(
    'database',
    (): DatabaseConfig => ({
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT),
        name: process.env.DB_NAME!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
    }),
);