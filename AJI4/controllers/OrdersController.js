const Order = require("../models/order");
const OrderDetails = require("../models/orderDetails");
const Product = require("../models/product");
const OrderStatus = require("../models/orderStatus.js");

exports.getAll = (req, res) => {
    Order.getAll().then(function (allOrders) {
        res.json(allOrders);
    });
};

exports.updateById = async (req, res) => {
    let isStatusExist = await OrderStatus.getAll().then(async function (allOrderStatuses) {
        let orderStatusesJson = allOrderStatuses.map(function (orderStatus) {
            return orderStatus.toJSON();
        });
        for (let i = 0; i < orderStatusesJson.length; i++) {
            if (req.body.status === orderStatusesJson[i].name) {
                return true;
            }
        }
        return false;
    });
    if (!isStatusExist) {
        return res.status(400).send({
            message: "Order status does not exist."
        })
    }
    let orderStatus = await Order.getById(req.params.id).then(async function (order) {
        return order.toJSON().status;
    });
    if ((orderStatus === "CANCELED" || orderStatus === "COMPLETED") || (orderStatus === "APPROVED" && req.body.status === "UNAPPROVED")) {
        return res.status(400).send({
            message: "Order status can not be changed backwards."
        })
    }
    Order.update(req.body, req.params.id).then(function () {
        return res.status(204).send()
    })
}

exports.getByStatus = (req, res) => {
    OrderStatus.getAll().then(async function (allOrderStatuses) {
        let orderStatusesJson = allOrderStatuses.map(function (orderStatus) {
            return orderStatus.toJSON();
        });
        let isStatusNotExist = true;
        for (let i = 0; i < orderStatusesJson.length; i++) {
            if (req.params.state === orderStatusesJson[i].name) {
                isStatusNotExist = false;
            }
        }
        if (isStatusNotExist) {
            return res.status(404).send({
                message: "Order status does not exist."
            })
        }
        Order.getByStatus(req.params.state).then(function (orders) {
            res.json(orders);
        });
    });
};

exports.store = async (req, res) => {
    if (!req.body.username || req.body.username === "") {
        return res.status(400).send({
            message: "Username cannot be empty."
        })
    }
    if (!req.body.email || req.body.email === "" || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        return res.status(400).send({
            message: "Email cannot be empty and must be valid email."
        })
    }
    if (!req.body.phone_number || req.body.phone_number === "" || !/^\d{3,14}$/.test(req.body.phone_number)) {
        return res.status(400).send({
            message: "Phone number cannot be empty and must only consist of 3 to 14 numbers."
        })
    }
    let products = req.body.products;
    for (let i = 0; i < products.length; i++) {
        if (!products[i].quantity || isNaN(products[i].quantity) || !Number.isInteger(products[i].quantity) || products[i].quantity <= 0) {
            return res.status(400).send({
                message: "Quantity cannot be empty and must be positive integer value."
            })
        }
        let isExist = await Product.getById(products[i].product_id).then(async function () {
            return true;
        }).catch(function () {
            return false;
        });
        if (!isExist) {
            return res.status(400).send({
                message: "Product with id " + products[i].product_id + " does not exist."
            })
        }
    }
    Order.create({
        'approved_date': null,
        'status': "UNAPPROVED",
        'username': req.body.username,
        'email': req.body.email,
        'phone_number': req.body.phone_number
    }).then(function (newOrder) {
        let products = req.body.products;
        for (let i = 0; i < products.length; i++) {
                OrderDetails.create({
                    'order_id': newOrder.id, 'product_id': products[i].product_id, 'number': products[i].quantity
                });
        }
        let newOrderWithProducts = newOrder.toJSON();
        newOrderWithProducts.products = products;
        res.status(201).json({
            'status': 'saved!', 'order': newOrderWithProducts,
        });
    });
};