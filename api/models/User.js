
const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const uri = "mongodb+srv://vp0072003:Starwar007@blog.euwyrii.mongodb.net/?retryWrites=true&w=majority";


const UserSchema = new Schema({
    username: { type:String, required:true ,min:4,unique:true },
    password: { type:String, required:true,min:4},
})


const UserModel = model('User',UserSchema);


module.exports = UserModel;;