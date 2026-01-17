import { Module } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { OAuthModule } from './oauth/oauth.module';
import { AppConfigModule } from './config/config.module';
import { WebhookService } from './webhook/webhook.service';
import { ExternalModule } from './external/external.module';
import { WebhookModule } from './webhook/webhook.module';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './config/database.config';
import { ConfigType } from '@nestjs/config';


@Module({
  imports: [
    AppConfigModule,
    SequelizeModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (db: ConfigType<typeof databaseConfig>) => ({
        dialect: 'mysql',
        host: db.host,
        port: db.port,
        username: db.user,
        password: db.password,
        database: db.name,
        autoLoadModels: true,
        synchronize: false,
        pool: {
          max: 10,
          min: 2,
          acquire: 30000,
          idle: 10000,
        },
        logging: false,
      }),
    }),
    OAuthModule,
    ExternalModule,
    WebhookModule,
    ProductsModule,
  ],
  providers: [RedisService, WebhookService],
})
export class AppModule { }

