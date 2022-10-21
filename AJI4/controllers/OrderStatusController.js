const OrderStatus = require("../models/orderStatus.js");
exports.getAll = (req, res) => {
    OrderStatus.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    );
};