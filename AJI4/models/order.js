const bookshelf= require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'orders'
})

module.exports.getAll = () => {
    return Order.fetchAll();
}


module.exports.getById = (id) => {
    return new Order({'id':id}).fetch();
}

module.exports.create = (order) => {
    return new Order({
        approved_date: order.approved_date,
        status: order.status,
        username: order.username,
        email: order.email,
        phone_number: order.phone_number
    }).save();
};

module.exports.update = (order) => {
    return new Order({
        id: order.id
    }).save({
            approved_date: order.status,
            status: order.status,
            username: order.username,
            email: order.email,
            phone_number: order.phone_number
        },
        {patch: true}
    );
}