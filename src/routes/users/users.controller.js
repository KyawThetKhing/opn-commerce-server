const {
    users,
    registerUser,
    getUserById,
    deleteUserById,
    updateUserById,
    updateUserPasswordById,
    getPasswordById,
} = require('../../models/users.model')
const { calculateAge } = require('../../utils')

function httpGetAllUsers(req, res) {
    try {
        return res.status(200).json(users)
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpRegisterUser(req, res) {
    try {
        const user = registerUser(req.body)
        return res.status(201).json(user)
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpGetUserProfile(req, res) {
    try {
        const user = getUserById(req.params.id)
        if (!user) return res.status(404).json({ message: 'User not found' })
        const age = calculateAge(user.dateOfBirth)
        delete user.dateOfBirth
        return res.status(200).json({ ...user, age })
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpDeleteUser(req, res) {
    try {
        const user = deleteUserById(req.params.id)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json({ message: 'User deleted' })
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpUpdateUser(req, res) {
    try {
        const user = updateUserById(req.params.id, req.body)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json(user)
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

function httpChangePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body
        const userPassword = getPasswordById(req.params.id)
        if (currentPassword !== userPassword) {
            return res
                .status(401)
                .json({ message: 'Current password is incorrect' })
        }
        const user = updateUserPasswordById(req.params.id, newPassword)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json({ message: 'Password updated' })
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    httpGetAllUsers,
    httpRegisterUser,
    httpGetUserProfile,
    httpDeleteUser,
    httpUpdateUser,
    httpChangePassword,
}
