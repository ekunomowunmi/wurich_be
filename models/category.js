const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema(
    {
        // id: {type: String, required: true},
        name: {type: String, required: true},
        imageUrl: {type: String, required: true},
        parentId: {type: mongoose.Types.ObjectId}
    },
    {timestamps:true}
)

module.exports = mongoose.model('categories', Category)