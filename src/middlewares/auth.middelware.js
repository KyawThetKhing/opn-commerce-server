function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Unauthorized: No token provided' })
    }

    const token = authHeader.split(' ')[1] // Extract token after "Bearer"

    if (!token || token !== 'faketoken_user1') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }

    next()
}

module.exports = { authMiddleware }
