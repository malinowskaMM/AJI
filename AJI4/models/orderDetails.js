const bookshelf= require('../config/bookshelf');

const OrderDetails = bookshelf.Model.extend({
    tableName: 'order_details',
    Order() {
        return this.belongsTo('Order')
    }
})

module.exports.getAll = () => {
    return OrderDetails.forge({'order_id': '1'}).fetch()
        .then(function(orders) {
            console.log(orders.toJSON());
        });
}