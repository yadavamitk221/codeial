const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log(`error in runnng the server`);
        return;
    }else{
        console.log(`My server is up and running on port ${port}`);
    }
})