const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');

app.use(express.json())
app.use(cors())
require('./')
require('dotenv').config();


const authRouter = require('./Routes/authRoutes')
app.use('/auth', authRouter)

//user-routes
const userRouter = require('./Routes/userRoutes')
app.use('/api', userRouter)

//recipe-routes
const recipeRouter = require('./Routes/recipeRoutes')
app.use('/api', recipeRouter)

//collection-routes
const CollectionRouter = require('./Routes/collectionRoutes')
app.use('/api', CollectionRouter)

//static file for store images
app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;