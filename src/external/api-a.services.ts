import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiAService {
    private readonly MAX_RETRIES = 3;
    private readonly BASE_DELAY = 300;

    constructor(private readonly http: HttpService) { }

    async fetchProducts(): Promise<any> {
        let attempt = 0;

        while (true) {
            try {
                const response = await firstValueFrom(
                    this.http.get('https://fakestoreapi.com/products', {
                        timeout: 2000,
                    }),
                );

                return response.data;
            } catch (error) {
                attempt++;

                if (attempt > this.MAX_RETRIES) {
                    throw error;
                }

                const delay = this.BASE_DELAY * Math.pow(2, attempt);
                await new Promise((r) => setTimeout(r, delay));
            }
        }
    }
}
