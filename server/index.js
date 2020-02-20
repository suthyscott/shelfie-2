
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('./controller')

const app = express()

app.use(express.json())

const {SERVER_PORT, CONNECTION_STRING} = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('db connected')
}).catch(err => console.log(err))

app.get(`/api/inventory`, ctrl.getInventory)
app.post(`/api/inventory`, ctrl.addProduct)
app.delete(`/api/inventory/:id`, ctrl.deleteProduct)
app.put(`/api/inventory/:id`, ctrl.updateProduct)

app.listen(SERVER_PORT, console.log(`Take us to warp ${SERVER_PORT}!`))