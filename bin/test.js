const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// const xoauth2 = require('xoauth2');

// let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         type: 'OAuth2',
//         xoauth2: xoauth2.createXOAuth2Generator({
//             user: 'hanggicrown@gmail.com',
//             // pass: '110119120',
//             clientId: '739473511141-erbgfgsuf76g4fls94f8nclhr3kt3pi1.apps.googleusercontent.com',
//             clientSecret: 'qGVLvLxBeeJZAufN2SHc4bfF',
//             refreshToken: '1/Ro36Gsh-dt4Jznw0-diYONxEu-1THzwzyX3xYQhybTs'
//         })
//     }
// });

// let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         type: 'OAuth2',
//         port: 465,
//         user: 'hanggicrown@gmail.com',
//             // pass: '110119120',
//         clientId: '739473511141-erbgfgsuf76g4fls94f8nclhr3kt3pi1.apps.googleusercontent.com',
//         clientSecret: 'qGVLvLxBeeJZAufN2SHc4bfF',
//         refreshToken: '1/Ro36Gsh-dt4Jznw0-diYONxEu-1THzwzyX3xYQhybTs',
//         accessToken: 'ya29.GlvkBGYQeTmkZU_1OawFHMYAd3CHj89ycBOQ1sOBDXRpuVDhYMqP7mz7lW9zKD-Cf6XPhilQruuyzmLnr9cm7FEGOY35DeJIVAVnLOFTS0vpOfhV40eefdHtLeZc'
//     }
// });

var transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.qq.com", // 主机
    secure: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: "271335064@qq.com", // 账号
      pass: "xgebevpovhhccbbj" // 密码
    }
}));

let mailOptions = {
    from: '271335064@qq.com', // sender address
    to: 'hanggicrown@gmail.com', // list of receivers
    // to: 'mariaclark1123@outlook.com',
    // to: 'hanggi@seoul.ac.kr',
    subject: `vvvv`, // Subject line
    text: '哇哦 ✔', // plaintext body
    html: `<b>Hello world ✔</b>` // html body

};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

