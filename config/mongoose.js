const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/522');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error'));
db.once('open',function(){
    console.log('successful');
})