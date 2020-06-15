const mongoose = require('mongoose');



const amazonSchema = new mongoose.Schema({
    title : {
        type : String
    },
    price : {
        type : String
    }
},{
    timestamps : true
})

const Flipkart = mongoose.model('zflipkart', amazonSchema);
module.exports = Flipkart;