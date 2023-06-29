const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class TagService {
    constructor() {}

    async createTag(data) {
        const newTag = await models.Tag.create(data);
        return newTag
    }

    async findById(id) {
        const tag = await models.Tag.findByPk(id, {
            include: [
                {
                  model: models.Product,
                  as: 'products',
                  through: {
                    attributes: [] // Excluir la tabla de unión ProductTag
                  },
                  attributes: {
                    exclude: ['ProductTag'] // Excluir la columna ProductTag del modelo Product
                  }
                }
              ]
        });
        if(!tag) {
            throw boom.notFound(`No se encontro tag con id: ${id}`);
        }
        return tag;
    }
}

module.exports = TagService;