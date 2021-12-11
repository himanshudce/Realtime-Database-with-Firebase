const express = require('express'); 
const app = express() 

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(express.json())

const firebaseRouters = require('./routers/firebaseRouters.js')
app.use(`/firebase`, firebaseRouters)

const postgresRouters = require('./routers/postgresRouters.js')
app.use(`/postgres`, postgresRouters)

app.listen(3001, ()=>{ 
    console.log('server is running http://localhost:3001/<DB_name>') 
})
