const express = require('express')
const bcrypt = require('bcryptjs')

const db = require('./db-config')

const server = express()

server.use(express.json())

server.post('/api/register', (req, res) => {
    const credentials = req.body
    const hash = bcrypt.hashSync(credentials.password, 12)
    credentials.password = hash
    db('users').insert(req.body)
        .then(()=>{
            res.status(201).json({message: "user successfully created"})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "could not add to database"})
        })
})

server.post('/api/login', (req, res) => {
    let { username, password } = req.body

    db('users').where('username', username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({message: "successful login"})
            } else {
                res.status(401).json({message: "invalid credentials"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "could not connect to database"})
        })
    
})

server.get('/api/users', (req, res) => {

})

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})