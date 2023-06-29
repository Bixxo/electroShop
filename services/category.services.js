const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { faker } = require('@faker-js/faker');


class CategoryService {
    constructor() {}

    async allCategories() {
        const categories = await models.Category.findAll();
        return categories
    }

    async createCategory(data) {
        const category = await models.Category.create(data);
        return category;
        
    }
    async findCategory(id) {
        const category = await models.Category.findByPk(id, {
            include: { model: models.Product, as: 'prducts', },
        });
        if(!category) {
            throw boom.notFound(`No se encontro category con el id ${id}`)
        }
        return category
    }

    async deleteCategory(id) {
        const category = this.findCategory(id);
        (await category).destroy();
        return { msg: `la categoria con id: ${id} fue eliminada correctamente` }
    }

    async generateCategory(num) {
        for (let i = 0; i < num; i++) {
            await models.Category.create({
                name: faker.commerce.department()
            });
        }
        return { msg: `${num} categories creadas correctamente`}
    }

    async findByName(name) {
        const category = await models.Category.findAll({
          where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
        });
        if(!product) {
          throw boom.notFound('Category no encontrada');
        }
        return category
      }
}

module.exports = CategoryService;

