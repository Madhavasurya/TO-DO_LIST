const express=require('express');
const app=express();
const path=require('path');
const port=8143;
const list=require('./models/schema');
const db=require('./config/mongoose');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.urlencoded());
app.get('/',(req,res)=>{
    list.find()
    .then(result => {
        const list_data = result.map(item => {
            if (!item.date) {
                item.date = "No deadline";
            }
            return item;
        });
        res.render('look', { list_data });
    })
    .catch(err => {
        console.log("error while fetching data");
   
});
});
app.post('/add-data',function(req,res){
const Todolist=new Promise((resolve,reject)=>{
    list.create({
        item:req.body.item,
        type:req.body.type,
        date:req.body.date
    })
    .then(newdata=>{
        console.log('**',newdata);
        resolve(newdata);
    })
    .catch(err=>{
        console.log('error');
        reject(err);
    })
});
Todolist.then(data=>res.redirect('back'))
        .catch(err=>console.log('ERROR'));
});
app.get('/delete-list',function(req,res){
    let id=req.query.id;
    list.findByIdAndDelete(id)
            .then(()=>{
                console.log('Deleted');
                res.redirect('back');
            })
            .catch(err=>console.log('Error'));
});
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is running on: ${port}`);
})