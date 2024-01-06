const mongoose=require('mongoose');
const ss=new mongoose.Schema({
    item:{
        type:String,required:true
    },
    type:{
        type:String,required:true
    },
    date:{
        type:String,required:false
    }
});
const todolist=mongoose.model('todolist',ss);
module.exports=todolist;