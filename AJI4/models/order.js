const bookshelf = require('../config/bookshelf');
const knex = require('knex')(require('../config/knexfile'));

const Order = bookshelf.Model.extend({
    tableName: 'orders',
})

module.exports.getAll = async () => {
    let exists = await knex.select().from('orders').then(async (orders) => {
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
    return exists;
}

// module.exports.getById = (id) => {
//     return new Order({'id': id}).fetch();
// }
//
// module.exports.create = (order) => {
//     return new Order({
//         approved_date: order.approved_date, status: order.status, username: order.username,
//         email: order.email,
//         phone_number: order.phone_number
//     }).save();
// };
//
// module.exports.update = (order) => {
//     return new Order({
//         id: order.id
//     }).save({
//             approved_date: order.status,
//             status: order.status,
//             username: order.username,
//             email: order.email,
//             phone_number: order.phone_number
//         },
//         {patch: true}
//     );
// }