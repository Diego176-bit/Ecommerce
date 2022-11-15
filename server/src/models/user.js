const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
})
userSchema.methods.encryptPassword = ((password) =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
})
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('users',userSchema)