const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

// const db = require('./db');
// const movieRouter = require('./routes/movie-router')
const mongoDb = require('./config.json').connectionString;
const productRouter = require('./routes/product-router')
const sellerRouter = require('./routes/seller-router')
const app = express();
const apiPort = 3003;

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

// db.on('error', console.error.bind(console,'MongoDB connection error:'))

app.get('/', (req,res) => {
    res.send('Hello Wunmi!')
})

// app.use('/api', movieRouter)
app.use('/api', productRouter)

app.use('/seller', sellerRouter)


// mongoose.connect(mongoDb, (err, db) => {
mongoose.connect(mongoDb, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, db) => {
    if (err) throw err;
    console.log('Database connected....')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))