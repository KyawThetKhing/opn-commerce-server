const users = [
    {
        id: 1,
        email: 'user1@gmail.com',
        password: 'password1',
        name: 'User 1',
        dateOfBirth: new Date('2000-01-01'),
        gender: 'Male',
        address: '123 Main St',
        subscribeToNewsletter: true,
    },
    {
        id: 2,
        email: 'user2@gmail.com',
        password: 'password2',
        name: 'User 2',
        dateOfBirth: new Date('2001-01-01'),
        gender: 'Female',
        address: '456 Elm St',
        subscribeToNewsletter: true,
    },
]

const getUserById = (userId) => {
    const user = users.find((user) => user.id === Number(userId))
    if (!user) return null
    const { id, password, ...rest } = user
    return rest
}

const registerUser = (user) => {
    user.id = users.length + 1
    user.dateOfBirth = new Date(user.dateOfBirth)
    user.subscribeToNewsletter = user.subscribeToNewsletter || true
    users.push(user)
    const { id, password, ...rest } = user
    return rest
}

const deleteUserById = (userId) => {
    const user = users.find((user) => user.id === Number(userId))
    if (!user) return null
    users.splice(users.indexOf(user), 1)
    return user
}

const updateUserById = (userId, user) => {
    const { dateOfBirth, gender, address, subscribeToNewsletter } = user
    const index = users.findIndex((user) => user.id === Number(userId))
    if (index === -1) return null
    users[index] = {
        ...users[index],
        dateOfBirth,
        gender,
        address,
        subscribeToNewsletter,
    }
    return user
}

const getPasswordById = (userId) => {
    const user = users.find((user) => user.id === Number(userId))
    if (!user) return null
    return user.password
}

const updateUserPasswordById = (userId, password) => {
    const index = users.findIndex((user) => user.id === Number(userId))
    if (index === -1) return null
    users[index] = { ...users[index], password }
    return users[index]
}

module.exports = {
    users,
    registerUser,
    getUserById,
    deleteUserById,
    updateUserById,
    updateUserPasswordById,
    getPasswordById,
}
