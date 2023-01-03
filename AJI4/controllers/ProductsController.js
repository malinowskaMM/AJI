const Product = require("../models/product");
const Category = require("../models/category");

exports.getAll = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
};

exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    ).catch(function () {
        res.status(404).send({
            message: "Product does not exist."
        })
    });
};

exports.store = async (req, res) => {
    if (!req.body.price || isNaN(req.body.price) || req.body.price <= 0) {
        return res.status(400).send({
            message: "Product price cannot be empty and must be positive value."
        })
    }
    if (!req.body.weight || isNaN(req.body.weight) || req.body.weight <= 0) {
        return res.status(400).send({
            message: "Product weight cannot be empty and must be positive value."
        })
    }
    if (!req.body.name || req.body.name === "") {
        return res.status(400).send({
            message: "Product name cannot be empty."
        })
    }
    if (!req.body.description || req.body.description === "") {
        return res.status(400).send({
            message: "Product description cannot be empty."
        })
    }
    let categories = await Category.getAll().then(async function (allCategories) {
        let categories = [];
        let categoriesJson = allCategories.map(function (category) {
            return category.toJSON();
        });
        for (let i = 0; i < categoriesJson.length; i++) {
            if (req.body.category === categoriesJson[i].name) {
                categories.push(categoriesJson[i]);
            }
        }
        return categories;
    });
    if (categories.length === 0) {
        return res.status(400).send({
            message: "Category does not exist."
        })
    }
    Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'weight': req.body.weight,
        'category': req.body.category
    }).then(function(createdProduct) {
        res.status(201).json({
            'status':'saved!',
            'product': createdProduct,
        });
    });
};

exports.updateById = async (req, res) => {
    if (!req.body.price || isNaN(req.body.price) || req.body.price <= 0) {
        return res.status(400).send({
            message: "Product price can not be empty and must be positive value."
        })
    }
    if (!req.body.weight || isNaN(req.body.weight) || req.body.weight <= 0) {
        return res.status(400).send({
            message: "Product weight can not be empty and must be positive value."
        })
    }
    if (!req.body.name || req.body.name === "") {
        return res.status(400).send({
            message: "Product name can not be empty."
        })
    }
    if (!req.body.description || req.body.description === "") {
        return res.status(400).send({
            message: "Product description can not be empty."
        })
    }
    let categories = await Category.getAll().then(async function (allCategories) {
        let categories = [];
        let categoriesJson = allCategories.map(function (category) {
            return category.toJSON();
        });
        for (let i = 0; i < categoriesJson.length; i++) {
            if (req.body.category === categoriesJson[i].name) {
                categories.push(categoriesJson[i]);
            }
        }
        return categories;
    });
    if (categories.length === 0) {
        return res.status(400).send({
            message: "Category does not exist."
        })
    }
    Product.update(req.body, req.params.id).then(
        function (product) {
            res.json({
                'status': 'updated!',
                'product': product,
            });
        }
    ).catch(function () {
        res.status(400).send({
            message: "Product does not exist."
        })
    });
}