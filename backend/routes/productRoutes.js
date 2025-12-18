const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured
} = require('../controllers/productController');

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

router.patch('/:id/featured', toggleFeatured);

module.exports = router;
