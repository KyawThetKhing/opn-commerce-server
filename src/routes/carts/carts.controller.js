const {
    getCart,
    deleteCart,
    addProductToCart,
    updateProductInCart,
    removeProductFromCart,
    applyDiscount,
    removeAppliedDiscount,
} = require('../../models/carts.model')

function httpGetCart(req, res) {
    try {
        const cart = getCart()
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }
        return res.status(200).json(cart)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpDeleteCart(req, res) {
    try {
        deleteCart()
        return res.status(200).json({ message: 'Cart deleted' })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpAddProductToCart(req, res) {
    try {
        const product = req.body
        const result = addProductToCart(product)
        if (result.error) {
            if (result.code === 'PRODUCT_ALREADY_EXISTS') {
                return res.status(409).json({ message: result.message })
            }
        }

        return res.status(200).json(result)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpUpdateProductInCart(req, res) {
    try {
        const product = req.body
        const result = updateProductInCart(product)
        if (result.error) {
            if (result.code === 'PRODUCT_NOT_FOUND') {
                return res.status(404).json({ message: result.message })
            }
        }

        return res.status(200).json(result)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpRemoveProductFromCart(req, res) {
    try {
        const productId = req.params.productId

        const result = removeProductFromCart(productId)
        if (result.error) {
            if (result.code === 'PRODUCT_NOT_FOUND') {
                return res.status(404).json({ message: result.message })
            }
        }

        return res.status(200).json({ message: 'Product removed from cart' })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpApplyDiscount(req, res) {
    try {
        const name = req.params.name
        const result = applyDiscount(name)
        if (result.error) {
            if (result.code === 'DISCOUNT_NOT_FOUND') {
                return res.status(404).json({ message: result.message })
            }
        }

        return res.status(200).json({ message: 'Discount applied' })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpRemoveAppliedDiscount(req, res) {
    try {
        const name = req.params.name
        const result = removeAppliedDiscount(name)
        if (result.error) {
            if (result.code === 'NO_DISCOUNT_APPLIED') {
                return res.status(409).json({ message: result.message })
            }
            if (result.code === 'DISCOUNT_NOT_FOUND') {
                return res.status(404).json({ message: result.message })
            }
        }

        return res.status(200).json({ message: 'Discount removed' })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    httpDeleteCart,
    httpAddProductToCart,
    httpUpdateProductInCart,
    httpRemoveProductFromCart,
    httpGetCart,
    httpApplyDiscount,
    httpRemoveAppliedDiscount,
}
