import { registerAs } from '@nestjs/config';

export interface OAuthConfig {
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    audience: string;
}

export default registerAs(
    'oauth',
    (): OAuthConfig => ({
        tokenUrl: process.env.OAUTH_TOKEN_URL!,
        clientId: process.env.OAUTH_CLIENT_ID!,
        clientSecret: process.env.OAUTH_CLIENT_SECRET!,
        audience: process.env.OAUTH_AUDIENCE!,
    }),
);