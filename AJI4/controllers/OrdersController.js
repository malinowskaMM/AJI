const Order = require("../models/order");
exports.getAll = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    );
};

exports.updateById = (req, res) => {
    Order.update(req.body, req.params.id).then(
        function(order) {
            res.json(order);
        }
    )
};

exports.getByStatus = (req, res) => {
    Order.getByStatus(req.params.state).then(
        function(allOrdersWithStatus) {
            res.json(allOrdersWithStatus);
        }
    );
};