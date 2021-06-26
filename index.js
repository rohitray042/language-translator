const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const translate  = require('@vitalets/google-translate-api');
const app = express();
// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 80;

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname + '/views'));
app.get('/',(req,res) => {
    res.render('index',{title:"Language Translator",translated:""});

});

app.post('/index',(req,res) => {
    console.log(req.body.speech)

    translate(req.body.speech,{to:req.body.language}).then(response => {
        res.render('index',{title:"Language Translator",translated:response.text});
    }).catch(err=>{
        console.log(err);
    });

});

app.listen(PORT ,()=>{
    console.log(`Server started at ${PORT}`);
});