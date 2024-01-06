
const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const uri = "mongodb+srv://vp0072003:Starwar007@blog.euwyrii.mongodb.net/?retryWrites=true&w=majority";


const PostSchema = new Schema({
    title: { type:String, required:true },
    summary: { type:String, required:true},
    content:{ type:String, required:true},
    file:{ type:String},
    author: {type:Schema.Types.ObjectId, ref:'User'},
},
{
    timestamps:true,
})


const PostModel = model('Post',PostSchema);


module.exports = PostModel;;