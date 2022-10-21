const bookshelf= require('../config/bookshelf');

const OrderStatus = bookshelf.Model.extend({
    tableName: 'order_status'
})

module.exports.getAll = () => {
    return OrderStatus.fetchAll();
}
