const nodemailer = require('../config/nodemailer');

// this is another way to exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')
    console.log(comment);
    nodemailer.transporter.sendMail({
        from: 'amitkumaryadavdbit@gmail.com',
        to: comment.user.email,
        subject: "new Comment Published",
        html: htmlString
    }, (err, info) =>{
        if(err){
        console.log("error in sending the mail", err);
        return;
        }
        console.log('Message send, info');
        return;
    });
}