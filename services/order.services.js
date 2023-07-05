const boom = require('@hapi/boom');
const { models,literal,query } = require('../libs/sequelize');


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

                await models.Product.update(
                    {
                    stock: literal(
                        `GREATEST(stock - ${product.quantity}, 0)`
                    ),
                    },
                    { where: { id: product.productId } }
                );

                //await query(`SELECT fun_sumavendidos(${product.productId}, ${product.quantity})`); 
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

    // async getOrdersOfUser(id){
    //     const orders = await models.Orders.findAll({
    //         include: [
    //             {
    //                 model: models.Product,
    //                 as: 'products',
    //                 through: {
    //                     attributes: ['quantity'], // Incluir solo la columna de cantidad desde la tabla de unión OrderProducts
    //                 },
    //                 attributes: {
    //                     exclude: ['OrderProducts'] // Excluir la relación OrderProducts en la respuesta
    //                 }
    //             },
    //         ],
    //         where : { userId : id }
    //     })
    //     if(!orders){
    //         throw boom.notFound(`El usuario con el id ${id} no tiene ordenes cargadas`);
    //     }
    //     return orders
    // }

    async getFormattedOrdersOfUser(id) {
        const orders = await models.Orders.findAll({
            include: [
                {
                model: models.Product,
                as: 'products',
                through: {
                    attributes: ['quantity'],
                },
                attributes: {
                    exclude: ['OrderProducts'],
                },
                },
            ],
            where: { userId: id },
            });
        
            if (!orders) {
            throw boom.notFound(`El usuario con el id ${id} no tiene órdenes cargadas`);
            }
        
        // Formatear los datos
        const formattedOrders = orders.map((order) => {
        const formattedProducts = order.products.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            categoryId: product.categoryId,
            quantity: product.OrderProducts.quantity,
            total: product.OrderProducts.quantity * product.price,
        }));

        return {
            id: order.id,
            dateCreated: order.dateCreated,
            expirationDate: order.expirationDate,
            active: order.active,
            complete: order.complete,
            products: formattedProducts,
            };
        });

        return formattedOrders;
    }


}




module.exports = OrderServices