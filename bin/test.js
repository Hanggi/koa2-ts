const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secureConnection: false,
    port: 587,
    requiresAuth: true,
    domains: ["gmail.com", "googlemail.com"],
    auth: {
        user: 'hanggicrown@gmail.com',
        pass: '110119120'
    }
});

// let transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     auth: {
//         user: 'hanggicrown@gmail.com',
//         pass: '110119120'
//     }
// }));

let mailOptions = {
    from: 'hanggi', // sender address
    to: 'hanggicrown@gmail.com', // list of receivers
    // to: 'mariaclark1123@outlook.com',
    // to: 'hanggi@seoul.ac.kr',
    subject: `test`, // Subject line
    text: '!!Hello world ✔', // plaintext body
    html: `<b>Hello world ✔</b>` // html body

};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

