const app = require('./app')
const http = require('http')
const config = require('./utils/config')
console.log(config.fireDb)

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})