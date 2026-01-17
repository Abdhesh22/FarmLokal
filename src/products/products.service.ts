import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { Op, WhereOptions, FindOptions } from 'sequelize';
import { RedisService } from '../redis/redis.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private readonly product: typeof Product,
        private readonly redis: RedisService,
    ) { }

    async getProducts(query: GetProductsQueryDto) {
        const {
            cursor = 0,
            limit = 20,
            sort = 'id',
            order = 'asc',
            search,
            category,
            minPrice,
            maxPrice,
        } = query;


        const cacheKey = `products:${cursor}:${limit}:${sort}:${order}:${search}:${category}:${minPrice}:${maxPrice}`;

        const cached = await this.redis.client.get(cacheKey);
        if (cached) return JSON.parse(cached) as { data: Product[]; nextCursor: number | null };

        const where: WhereOptions<Product> = {
            id: { [Op.gt]: cursor },
        };

        if (category) where.category = category;

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {
                [Op.between]: [minPrice ?? 0, maxPrice ?? 1_000_000],
            };
        }

        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ];
        }

        const options: FindOptions<Product> = {
            where,
            order: [[sort, order]],
            limit,
            raw: true,
        };

        const rows = await this.product.findAll(options);

        const nextCursor = rows.length ? rows[rows.length - 1].id : null;

        const result = { data: rows, nextCursor };

        await this.redis.client.setex(cacheKey, 60, JSON.stringify(result));

        return result;
    }
}