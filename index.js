const express = require('express');
const app = express();
const port = 8000;


app.use('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,(err)=>{
    if(err){
        console.log(`Error Comes ${err}`);
    }
    console.log(`Your Server is Running on Port: ${port}`)
})