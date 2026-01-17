import type { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';

interface ProductRow {
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt: Date;
}

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const TOTAL = 1_000_000;
    const BATCH = 5000;

    for (let i = 0; i < TOTAL; i += BATCH) {
      const rows: ProductRow[] = [];

      for (let j = 0; j < BATCH; j++) {
        rows.push({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          category: faker.helpers.arrayElement([
            'dairy',
            'vegetables',
            'fruits',
            'grains',
            'bakery',
            'beverages',
          ]),
          price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
          createdAt: faker.date.past({ years: 1 })
        });
      }

      await queryInterface.bulkInsert('products', rows);
      console.log(`Inserted ${i + BATCH} / ${TOTAL}`);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('products', {}, {});
  },
};