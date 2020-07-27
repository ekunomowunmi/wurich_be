const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Admin = new Schema(
    {
        name: {type:String, required:true},
        id: {type:String, required:true},
        phonenumber: {type: String, required:true},
        email: {type: String, required:true}
    },
    {timestamps:true}
);
module.exports = mongoose.model('admins',Admin);

//Name, Id, Sellers[],Products[], phonenum,email, usertype 