const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Seller = new Schema(
    {
        name: {type:String, required:true},
        id: {type:String, required:true},
        phonenumber: {type: String, required:true},
        email: {type: String, required:true},
        subscription: {type: Boolean, required: true}
        

    }
);
module.exports = mongoose.model('sellers',Seller);
// ID,Phonenum, email,Subscription:bool,userType
//if subscription is true, products should be in top 10