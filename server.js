const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require('./_helpers/passport')(passport);

// const db = require('./db');
const db = require('./config.json').connectionString;
// db.on('error', console.error.bind(console,'MongoDB connection error:'))

// mongoose.connect(mongoDb, (err, db) => {
mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, db) => {
    if (err) throw err;
    console.log('Database connected....')
});

const apiPort = 3003;

const productRouter = require('./routes/product-router');
const sellerRouter = require('./routes/seller-router');

app.get('/', (req,res) => {
    res.send('Hello Wunmi!')
});

// app.use('/api', movieRouter)
app.use('/api', productRouter);
app.use('/seller', sellerRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));