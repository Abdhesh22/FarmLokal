'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const TOTAL = 1_000_000;
    const BATCH = 5000;

    for (let i = 0; i < TOTAL; i += BATCH) {
      const rows = [];

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
          price: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
          createdAt: faker.date.past({ years: 1 }),
          updatedAt: new Date(),
        });
      }

      await queryInterface.bulkInsert('products', rows);
      console.log(`Inserted ${i + BATCH} / ${TOTAL}`);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
