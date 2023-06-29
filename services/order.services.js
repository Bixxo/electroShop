const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');


class OrderServices {
    constructor(){
    }

    async getAllOrders(){
        const orders = await models.Orders.findAll()
        if(!orders){
            throw boom.notFound(`No se encuentran datos cargados en la base de datos`);
        }
        return orders
    }

    async createOrder(data) {
        const creationDate = new Date();
        const expirationDate = new Date(creationDate);
        expirationDate.setDate(expirationDate.getDate() + 31)

        data.expirationDate = expirationDate;

        const order = await models.Orders.create(data);

        if (Array.isArray(data.products)) {
            for (const product of data.products) {
                await models.OrderProducts.create({
                    orderId: order.id,
                    productId: product.productId,
                    quantity: product.quantity,
                    unitPrice: product.unitPrice,
                    discount: product.discount
                });
                await sequelize.query(`SELECT fun_sumavendidos(${product.productId}, ${product.quantity})`); 
            }
        }
        return order;
    }

    async getOrderById(id) {
        const order = await models.Orders.findByPk(id, {
            include: [
                {
                  model: models.Product,
                  as: 'products',
                  through: {
                    attributes: ['quantity'], // Incluir solo la columna de cantidad desde la tabla de unión OrderProducts
                  },
                  attributes: {
                    exclude: ['OrderProducts'] // Excluir la relación OrderProducts en la respuesta
                  }
                },
              ],
        });
        if(!order){
            throw boom.notFound(`No se enecuentra ordenes cargados en la base de datos con el id ${id}`);
        }
        return order;
    }

    async getOrdersOfUser(id){
        const orders = await models.Orders.findAll({
            where : { userId : id }
        })
        if(!orders){
            throw boom.notFound(`El usuario con el id ${id} no tiene ordenes cargadas`);
        }
        return orders
    }


}

module.exports = OrderServices