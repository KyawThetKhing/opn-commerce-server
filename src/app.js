const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const usersRouter = require('./routes/users/users.router')
const { authMiddleware } = require('./middlewares/auth.middelware')

app.use(express.json())
app.use(morgan('combined'))
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

app.use('/api/users', authMiddleware, usersRouter)

app.get('/', (req, res) => {
    res.send('Hello World! Updated')
})

module.exports = app
