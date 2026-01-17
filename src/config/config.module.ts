import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import oauthConfig from './oauth.config';
import { envValidationSchema } from './env.validation';
import databaseConfig from './database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: envValidationSchema,
            load: [oauthConfig, databaseConfig],
        }),
    ],
})
export class AppConfigModule { }
