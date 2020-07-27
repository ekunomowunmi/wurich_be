const express = require('express');

const ProductCtrl = require('../controllers/product-ctrl')
const CategoryCtrl = require('../controllers/category-ctrl')
const MovieCtrl = require('../controllers/movie-ctrl')

const router = express.Router()

router.post('/product', ProductCtrl.createProduct)
router.put('/product/:id', ProductCtrl.updateProduct)
router.get('/products',ProductCtrl.getProducts)
// router.delete('/product/:id', ProductCtrl.deleteProduct)
router.get('/product/:id', ProductCtrl.getProductById)
router.get('/movie/:id', MovieCtrl.getMovieById)
router.post('/category', CategoryCtrl.createCategory)
router.get('/categories', CategoryCtrl.getCategories)
router.get('/getProductByCategory/:catid', ProductCtrl.getProductByCategory)


module.exports = router