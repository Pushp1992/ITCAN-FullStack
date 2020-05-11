import axios from 'axios';

const ProductData = {
    getAllProduct() {
        const encodedURI = window.encodeURI('/proxy/products')
        return axios({
            method: "GET",
            url: encodedURI,
            "headers": {
                'Content-Type': "application/json",
                'server': 'PRODUCT_SERVICE'
            }
        }).then(function(response) {
            return response
        })
    }
}

export default ProductData;