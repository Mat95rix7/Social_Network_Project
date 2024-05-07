const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')


require('dotenv').config({path : './config/.env'})


const connect_MongoDB = require('./config/db')

const postRoutes = require('./routes/post.routes')
const userRoutes = require('./routes/user.routes')



connect_MongoDB()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })
  const corsOptions = {
    origin:'http://localhost:5174',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
  app.use(cors(corsOptions));
  
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)


module.exports = app