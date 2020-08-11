const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema(
    {
        name: {type:String, required:true},
        phonenumber: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String, required: true},
        subscription: {type: Boolean, required: true, default: false}
    },
    {timestamps:true}
);

SellerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.password;
    }
})

module.exports = mongoose.model('sellers', SellerSchema);
// ID,Phonenum, email,Subscription:bool,userType
//if subscription is true, products should be in top 10