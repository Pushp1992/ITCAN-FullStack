'use strict';

module.exports = function(app) {
    var productList = require('../controller/productListController');

    app.route('/products')
    .get(productList.list_all_products)
    .post(productList.create_a_product);

    app.route('/products/:productID')
    .get(productList.get_a_product)
    .put(productList.update_a_product)
    .delete(productList.delete_a_product);
}