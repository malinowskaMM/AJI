const Category = require("../models/category.js");
exports.getAll = (req, res) => {
    Category.getAll().then(
        function(allCategories) {
            res.json(allCategories);
        }
    );
};