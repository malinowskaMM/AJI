const bookshelf = require('../config/bookshelf');
const knex = require('knex')(require('../config/knexfile'));

const Order = bookshelf.Model.extend({
    tableName: 'orders',
})

module.exports.getAll = async () => {
    return await knex.select().from('orders').then(async (orders) => {
        let listOfOrders = [];
        for (let i = 0; i < orders.length; i++) {
            let listOfProducts = orders[i];
            listOfProducts["products"] = [];
            await knex.select().from('order_details').where('order_id', orders[i].id).then(async (orderDetails) => {
                for (let j = 0; j < orderDetails.length; j++) {
                    let product = await knex.select().from('products').where('id', orderDetails[j].product_id).then((products) => {
                        return products[0];
                    });
                    let productWithQuantity = {};
                    productWithQuantity["product"] = product;
                    productWithQuantity["quantity"] = orderDetails[j].number;
                    listOfProducts["products"].push(productWithQuantity);
                }
            });
            listOfOrders.push(listOfProducts);
        }
        return listOfOrders
    });
}

module.exports.getByStatus = async (status) => {
    return await knex.select().from('orders').where('status', status).then(async (orders) => {
        let listOfOrders = [];
        for (let i = 0; i < orders.length; i++) {
            let listOfProducts = orders[i];
            listOfProducts["products"] = [];
            await knex.select().from('order_details').where('order_id', orders[i].id).then(async (orderDetails) => {
                for (let j = 0; j < orderDetails.length; j++) {
                    let product = await knex.select().from('products').where('id', orderDetails[j].product_id).then((products) => {
                        return products[0];
                    });
                    let productWithQuantity = {};
                    productWithQuantity["product"] = product;
                    productWithQuantity["quantity"] = orderDetails[j].number;
                    listOfProducts["products"].push(productWithQuantity);
                }
            });
            listOfOrders.push(listOfProducts);
        }
        return listOfOrders
    });
}

module.exports.update = (orderStatus, orderId) => {
    return new Order({
        id: orderId
    }).save( {
            status: orderStatus.status,
            approved_date: new Date()
        },
        {patch: true}
    );
}

module.exports.create = (order) => {
    return new Order({
        approved_date: order.approved_date, status: order.status, username: order.username,
        email: order.email,
        phone_number: order.phone_number
    }).save().then(function (order) {
        return order;
    });
};


module.exports.getById = (id) => {
    return new Order({'id': id}).fetch();
}