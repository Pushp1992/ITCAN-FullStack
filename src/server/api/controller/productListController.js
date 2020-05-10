'use strict';

var mongoose = require('mongoose'),

Product = mongoose.model('Products');

// Get all product list
exports.list_all_products = function (req, res) {
    Product.find({}, function (err, product) {
        if (err) res.send(err)
        res.json(product)
    })
}

// Create a Product
exports.create_a_product = function (req, res) {
    let new_product = new Product(req.body)
    new_product.save(function (err, product) {
        if (err) res.send(err)
        res.json(product)
    })
}

// Get product by id
exports.get_a_product = function (req, res) {
    Product.findById(req.params.productId, function (err, product) {
        if(err) res.send(err)
        res.json(product)
    })
}

// Update product by ID
exports.update_a_product = function(req,res) {
    Product.findOneAndUpdate({_id: req.params.productId}, function(err,product) {
        if(err) res.send(err)
        res.json(product)
    })
}

// delete a product
exports.delete_a_product = function(req,res) {
    Product.remove({_id: req.params.productId}, function(err,product) {
        if(err) res.send(err)
        res.json({message: "Product Successfully deleted"})
    })
}