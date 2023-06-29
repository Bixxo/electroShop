const boom = require('@hapi/boom');
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const { models, Sequelize } = require('../libs/sequelize');
const CategoryService = require('./category.services');

const service = new CategoryService();

class ProductService {
  constructor(){
  }
  
  async createProduct(data) {
    await service.findCategory(data.categoryId);
    const product = await models.Product.create(data);
    return product;
  }

  async addTag(data) {
    const newTag = await models.ProductTag.create(data);
    return newTag;
  }

  async findAllProducts() {
    const products = await models.Product.findAll({
      include: ['category'],
      attributes: { exclude: ['categoryId'] }
    });
    if(!products.length) {
        throw boom.notFound(`No se enecuntrar datos cargados en la base de datos`);
    }
    return products;
  }

  async findByName(name) {
    const product = await models.Product.findAll({
      where: {
        name: {
            [Op.iLike]: `%${name}%`
        }
    }
    });
    if(!product) {
      throw boom.notFound('Producto no encontrado');
    }
    return product
  }

  async findById(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category', {
          model: models.Review,
          as: 'reviews',
          include: {
          model: models.User,
          as: 'user',
          attributes: ['id', 'name'] // Selecciona los atributos del usuario que deseas incluir
        },
        attributes: {
          exclude: ['userId', 'productId'] //Quita esas columnas de la primiedad reviews
        }
      },
      {
        model: models.Tag,
        as: 'tags',
        through: { attributes: [] } // Excluye la tabla intermedia ProductTag
      }
      ]
    });
    if(!product) {
      throw boom.notFound(`Producto con id: ${id} no encontrado`);
    }
    return product;
  }

  async generateProducts(num) {
    for (let i = 0; i < num; i++) {
      await models.Product.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.cats(),
        stock: 0,
        price: faker.commerce.price(),
        categoryId: 1
      });
    }
    return { msg: `${num} products creado correctamente`}
  }

  async orderByPrice (min, max) {
    const products = await models.Product.findAll({
      where: {
        price: {
          [Op.between]: [min, max]
        }
      }
    });
    if(!products) {
      throw boom.notFound('Productos no encontrados en ese rango de precio');
    }
    products.sort((a, b) => a.price - b.price);
    return products;
  }

  async orderByCategory(id) {
    await service.findCategory(id);
    const products = await models.Product.findAll({
      where: {
        categoryId: id
      },
      order: [['name', 'ASC']],
      include: 'category',
      attributes: { exclude: ['categoryId'] }
    });
    if(!products.length) {
      throw boom.notFound('No se encontraron prouductos con esa categoria ');
    }
    return products;
  }

  async orderByReviews() {
    const products = await models.Product.findAll({
      order: [['review', 'ASC']]
    });
    return products
  }
  
  async orderBySold() {
    const products = await models.Product.findAll({
      order: [['sold', 'DESC']]
    });

    if(!products.length) {
      throw boom.notFound('No se encontrar poroductos vendidos');
    }

    return products;
  }
}

module.exports = ProductService;