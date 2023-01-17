const express = require('express');
const path = require("path");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.use(cookieParser());
// use router
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use('/', require('./routes/index'));

// set up the view engine
app.set('view engine' , 'ejs' );
app.set('views', path.join(__dirname, 'views'));


// setting the server
app.listen(port, function(err){
    if(err){
        console.log(`error in runnng the server`);
        return;
    }else{
        console.log(`My server is up and running on port ${port}`);
    }
})