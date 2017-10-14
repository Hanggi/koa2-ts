const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
var smtpTransport = require('nodemailer-smtp-transport');
// const xoauth2 = require('xoauth2');
const request = require('request');
const Koa = require('koa');
const app = new Koa();

var last_price = -1;

var transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.qq.com", // 主机
    secure: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: "271335064@qq.com", // 账号
      pass: "xgebevpovhhccbbj" // 密码
    }
}));

let doSendEmail = (price, title, data) => {
    let mailOptions = {
        from: 'hanggi', // sender address
        // to: 'hanggicrown@gmail.com', // list of receivers
        to: 'mariaclark1123@outlook.com',
        // to: 'hanggi@seoul.ac.kr',
        subject: `${title} - ${price}`, // Subject line
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
}

let rounding = (p) => parseInt(p / 50000);

let scheduleCronstyle = () => {
    schedule.scheduleJob('5 * * * * *', function(){
    // setInterval(()=>{

        console.log('scheduleCronstyle:' + new Date());
        // let bithumb = await doRequest('https://api.bithumb.com/public/ticker/BTC');
        request('https://api.bithumb.com/public/ticker/BTC', (error, response, body) => {
            let data = JSON.parse(body).data;
            let price = data.closing_price;
            console.log(price);
    
            if (last_price != -1) {
                if (rounding(price) < last_price) {
                    doSendEmail(price, "价格跌破整数点！", data);
                } else if (rounding(price) > last_price) {
                    doSendEmail(price, "[涨啦]", data);
                }
            }
            last_price = rounding(price);    
        });
        
    // }, 5000);
    }); 
}

scheduleCronstyle();
