const express = require('express');
const cookieParser = require('cookie-parser');  
const path = require("path");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const flash = require('connect-flash')
const flashMWare = require('./config/flash');

// user for session cookie and our authentication
const passportJWT = require('./config/passport-jws'); 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const passportGoogle = require('./config/passport-google-auth2-strategy');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());  
app.use(cookieParser());
// use router
app.use(express.static('./assets'));
// make tue uploads part availabe to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine' , 'ejs' );
app.set('views', path.join(__dirname, 'views'));

// mongo store is use to store the session cookie in the db 
app.use(session({
    name: 'codieal',
    // todo change the secret before deployment in production mode 
    secret: 'blasomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*100
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled' // Default
      }, function(err){
        console.log(err);
      })
}

));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(flashMWare.setFlash);
app.use('/', require('./routes/index'));

// setting the server
app.listen(port, function(err){
    if(err){
        console.log(`error in runnng the server`);
        return;
    }else{
        console.log(`My server is up and running on port ${port}`);
    }
})