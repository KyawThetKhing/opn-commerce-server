const express = require('express')

const cartsRouter = express.Router()

const {
    httpDeleteCart,
    httpAddProductToCart,
    httpUpdateProductInCart,
    httpRemoveProductFromCart,
    httpGetCart,
    httpApplyDiscount,
    httpRemoveAppliedDiscount,
} = require('./carts.controller')

cartsRouter.get('/', httpGetCart)
cartsRouter.delete('/', httpDeleteCart)
cartsRouter.post('/add-product', httpAddProductToCart)
cartsRouter.put('/update-product', httpUpdateProductInCart)
cartsRouter.delete('/:productId', httpRemoveProductFromCart)
cartsRouter.post('/apply-discount/:name', httpApplyDiscount)
cartsRouter.post('/remove-applied-discount/:name', httpRemoveAppliedDiscount)
module.exports = cartsRouter
