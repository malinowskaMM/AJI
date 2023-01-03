const bookshelf= require('../config/bookshelf');

const OrderDetails = bookshelf.Model.extend({
    tableName: 'order_details',
})

module.exports.create = (orderDetails) => {
    return new OrderDetails({
        order_id: orderDetails.order_id,
        product_id: orderDetails.product_id,
        number: orderDetails.number,
    }).save().then(function (orderDetails) {
        return orderDetails;
    });
};