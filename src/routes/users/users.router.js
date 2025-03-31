const express = require('express')

const { validate } = require('../../middlewares/validate.middleware')
const {
    registerSchema,
    updateUserSchema,
    changePasswordSchema,
} = require('../../validations/users.validation')

const usersRouter = express.Router()

const {
    httpGetAllUsers,
    httpRegisterUser,
    httpGetUserProfile,
    httpDeleteUser,
    httpUpdateUser,
    httpChangePassword,
} = require('./users.controller')

usersRouter.get('/', httpGetAllUsers)
usersRouter.get('/:id', httpGetUserProfile)
usersRouter.post('/', validate(registerSchema), httpRegisterUser)
usersRouter.delete('/:id', httpDeleteUser)
usersRouter.put('/:id', validate(updateUserSchema), httpUpdateUser)
usersRouter.put(
    '/:id/password',
    validate(changePasswordSchema),
    httpChangePassword
)

module.exports = usersRouter
