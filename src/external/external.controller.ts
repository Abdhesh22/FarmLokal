import { Controller, Get } from '@nestjs/common';
import { ApiAService } from './api-a.services';

@Controller('external')
export class ExternalController {
    constructor(private readonly apiA: ApiAService) { }

    @Get('products')
    async getProducts() {
        return this.apiA.fetchProducts();
    }
}
