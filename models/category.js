const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema(
    {
        id: {type: String, required: true},
        name: {type: String, required: true},
        parentId: {type: [String], required: true}
    }
)

module.exports = mongoose.model('categories', Category)