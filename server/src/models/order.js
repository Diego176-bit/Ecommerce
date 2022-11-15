const mongoose = require('mongoose')
const {Schema} = mongoose

const orderSchema = new Schema({
    id:{
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    img: {
        type: Image,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('product',orderSchema)