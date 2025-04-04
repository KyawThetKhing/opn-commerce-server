const cart = new Map([
    ['p111', { productId: 111, name: 'Laptop', quantity: 1, price: 1500 }],
    [
        'p222',
        { productId: 222, name: 'Wireless Mouse', quantity: 2, price: 50 },
    ],
    [
        'p333',
        {
            productId: 333,
            name: 'Mechanical Keyboard',
            quantity: 1,
            price: 120,
        },
    ],
])

const vouchers = [
    { type: 'amount', name: 'new-customer', amount: 200, max: 200 },
    { type: 'percent', name: 'new-year', percent: 10, max: 100 },
]

let appliedDiscount = ''

const freebie = new Map([
    [
        'p444',
        { productId: 'p555', name: 'Screen Cleaner', quantity: 1, price: 15 },
    ],
])

const getTotalAmount = () => {
    if (!cart) return null
    return Array.from(cart.values())
        .filter((p) => !p.free)
        .reduce((total, product) => total + product.price * product.quantity, 0)
}

const calculateFinalAmount = () => {
    const totalAmount = getTotalAmount()

    if (appliedDiscount) {
        const voucher = vouchers.find((d) => d.name === appliedDiscount)

        let finalAmountAfterDiscount = 0
        if (voucher.type === 'amount') {
            finalAmountAfterDiscount = totalAmount - voucher.amount
        }

        if (voucher.type === 'percent') {
            const discountedAmount = (totalAmount * voucher.percent) / 100
            if (discountedAmount > voucher.max) {
                finalAmountAfterDiscount = totalAmount - voucher.max
            } else {
                finalAmountAfterDiscount = totalAmount - discountedAmount
            }
        }

        return finalAmountAfterDiscount
    }
    return totalAmount
}

const removeAppliedDiscount = (discountName) => {
    if (!appliedDiscount) {
        return {
            error: true,
            code: 'NO_DISCOUNT_APPLIED',
            message: 'No discount applied',
        }
    }

    if (!vouchers.find((v) => v.name === discountName)) {
        return {
            error: true,
            code: 'DISCOUNT_NOT_FOUND',
            message: 'Discount not found',
        }
    }

    if (appliedDiscount === discountName) {
        appliedDiscount = ''
    } else {
        return {
            error: true,
            code: 'DISCOUNT_NOT_FOUND',
            message: 'Discount not found',
        }
    }

    return appliedDiscount
}

const applyDiscount = (discountName) => {
    if (!vouchers.find((v) => v.name === discountName)) {
        return {
            error: true,
            code: 'DISCOUNT_NOT_FOUND',
            message: 'Discount not found',
        }
    }
    appliedDiscount = discountName

    return appliedDiscount
}

const getCart = () => {
    const finalAmount = calculateFinalAmount()

    return {
        products: Array.from(cart.values()),
        total: finalAmount,
    }
}

const deleteCart = () => {
    cart.clear()
}

const addProductToCart = (product) => {
    if (cart.has(product.productId))
        return {
            error: true,
            code: 'PRODUCT_ALREADY_EXISTS',
            message: 'Product already exists in cart',
        }

    cart.set(product.productId, product)

    if (freebie.has(product.productId)) {
        const freebieProduct = freebie.get(product.productId)

        // Ensure the freebie is only added once
        if (!cart.has(freebieProduct.productId)) {
            cart.set(freebieProduct.productId, {
                ...freebieProduct,
                quantity: product.quantity,
                free: true,
            })
        }
    }

    return product
}

const updateProductInCart = (product) => {
    if (!cart.has(product.productId))
        return {
            error: true,
            code: 'PRODUCT_NOT_FOUND',
            message: 'Product not found in cart',
        }

    cart.set(product.productId, {
        ...cart.get(product.productId),
        quantity: product.quantity,
    })
    return product
}

const removeProductFromCart = (productId) => {
    if (!cart.has(productId)) {
        return {
            error: true,
            code: 'PRODUCT_NOT_FOUND',
            message: 'Product not found in cart',
        }
    }

    cart.delete(productId)
    if (freebie.has(productId)) {
        const freebieProduct = freebie.get(productId)
        cart.delete(freebieProduct.productId)
    }

    return productId
}

module.exports = {
    deleteCart,
    addProductToCart,
    updateProductInCart,
    removeProductFromCart,
    getCart,
    applyDiscount,
    removeAppliedDiscount,
}
