const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

// mongoose.connect('mongodb://127.0.0.1:27017/wurich', {useNewUrlParser: true})
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
.catch(e => {
    console.error('Connection Error', e.message)
})

const db = mongoose.connection
module.exports = db;