const mailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter =  mailer.createTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   port : 587,
   secure: false,
   auth: {
    user: "amitkumaryadavdbit@gmail.com",
    pass: "uuwubgpjyscweusw"
   } 
});
    
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering the template', err); return}

            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:  transporter,
    renderTemplate: renderTemplate
}