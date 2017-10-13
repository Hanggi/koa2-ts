const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: 'hanggicrown@gmail.com',
        pass: '110119120'

    }

});

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

