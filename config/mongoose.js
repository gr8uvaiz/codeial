const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');
const db = mongoose.connection;

db.on('error',console.error.bind('Error in Establishing the connection in Database'))

db.once('open',()=>{
    console.log("Database is connected");
})

module.exports = db;