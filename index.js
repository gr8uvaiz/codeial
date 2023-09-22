const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const router = require('./routes');
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const MongoStore = require('connect-mongo');

app.use(express.static('./assets'));
app.use(cookieParser());

// using Middle ware for post request
app.use(express.urlencoded());
app.use(expressLayouts);
// extract styles and scripts from other pages and put into the layout page
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    // Todo and change in deployment
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    // storing the session into the mongodb
    store: MongoStore.create(
        {
            mongoUrl: `mongodb://127.0.0.1:27017/codeial_development`,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err+"Error in storing session into the MongoDb");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passportLocal.setAuthenticationUser); 

app.use('/',router);

app.listen(port,(err)=>{
    if(err){
        console.log(`Error Comes ${err}`);
    }
    console.log(`Your Server is Running on Port: ${port}`)
})