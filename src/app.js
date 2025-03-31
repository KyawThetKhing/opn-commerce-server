const express = require('express')
const cors = require('cors')
const app = express()

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World! Updated')
})

module.exports = app
