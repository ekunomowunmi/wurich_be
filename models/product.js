const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    // id: {type: String, required: true},
    name: {type: String, required: true},
    ig_link: {type: String, required:true},
    image_Url: {type: String, required: true},
    description: {type: String},
    price: {type: String},
    top_ten: {type: Boolean},
    category_id: {type: String, required: true},
        // rating: {type: Number, required:true}
});

module.exports = mongoose.model('products', Product);