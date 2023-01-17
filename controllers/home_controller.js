module.exports.home = function(req, res){
    console.log(req.cookies);   
    res.cookie('user_id', 100);
    return res.render('home', {
        title: "Codeal"
    });
}