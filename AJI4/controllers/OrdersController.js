const Order = require("../models/order");
exports.getAll = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    );

};