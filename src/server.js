const http = require('http')
const dotenv = require('dotenv')

const app = require('./app')

dotenv.config()
const PORT = process.env.PORT || 8000

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
