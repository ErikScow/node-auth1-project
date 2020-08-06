const express = require('express')

const server = express()

server.use(express.json())

server.post('./api/register', (req, res) => {

})

server.post('./api/login', (req, res) => {
    
})

server.get('./api/users', (req, res) => {

})

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})