const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');

app.use(express.json())
app.use(cors())
require('./')

// Serve static files from the "uploads" directory

require('dotenv').config();
app.get('/', (req, res) => {
    return res.status(200).send({ message: "welcome to api", status: true })
})
const authRouter = require('./Routes/authRoutes')
app.use('/auth', authRouter)
const userRouter = require('./Routes/userRoutes')
app.use('/api', userRouter)
const recipeRouter = require('./Routes/recipeRoutes')
app.use('/api', recipeRouter)

app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;