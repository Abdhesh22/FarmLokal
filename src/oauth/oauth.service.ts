import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RedisService } from '../redis/redis.service';
import { firstValueFrom } from 'rxjs';
import oauthConfig from 'src/config/oauth.config';
import type { ConfigType } from '@nestjs/config';

const TOKEN_KEY = 'oauth:access_token';
const LOCK_KEY = 'oauth:lock';
const LOCK_TTL = 5000;

@Injectable()
export class OAuthTokenService {
    constructor(
        private readonly http: HttpService,
        private readonly redisService: RedisService,
        @Inject(oauthConfig.KEY)
        private readonly oauth: ConfigType<typeof oauthConfig>,
    ) { }

    async getAccessToken(): Promise<string> {
        const redis = this.redisService.client;

        const cached = await redis.get(TOKEN_KEY);
        if (cached) {
            const token = JSON.parse(cached);
            if (Date.now() < token.expiresAt) {
                return token.accessToken;
            }
        }

        const lockAcquired = await redis.set(
            LOCK_KEY,
            '1',
            'PX',
            LOCK_TTL,
            'NX',
        );

        if (!lockAcquired) {
            await this.waitForToken();

            const cached = await redis.get(TOKEN_KEY);
            if (!cached) {
                throw new Error('Token missing after wait');
            }

            const token = JSON.parse(cached);
            return token.accessToken;

        }

        try {

            const token = await this.fetchNewToken();
            await redis.set(
                TOKEN_KEY,
                JSON.stringify(token),
                'PX',
                token.expiresAt - Date.now(),
            );

            return token.accessToken;
        } finally {
            await redis.del(LOCK_KEY);
        }
    }

    private async fetchNewToken() {



        const response = await firstValueFrom(
            this.http.post(
                this.oauth.tokenUrl,
                {
                    grant_type: 'client_credentials',
                    client_id: this.oauth.clientId,
                    client_secret: this.oauth.clientSecret,
                    audience: this.oauth.audience,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            ),
        );

        const { access_token, expires_in } = response.data;

        return {
            accessToken: access_token,
            expiresAt: Date.now() + (expires_in - 30) * 1000,
        };
    }

    private async waitForToken() {
        const redis = this.redisService.client;
        for (let i = 0; i < 10; i++) {
            await new Promise((r) => setTimeout(r, 200));
            const token = await redis.get(TOKEN_KEY);
            if (token) return;
        }
        throw new Error('Token fetch timeout');
    }
}
