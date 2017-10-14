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
        from: '271335064@qq.com', // sender address
        // to: 'hanggicrown@gmail.com', // list of receivers
        to: 'mariaclark1123@outlook.com',
        // to: 'hanggi@seoul.ac.kr',
        subject: `${title} [${price}]`, // Subject line
        text: '!!Hello world ✔', // plaintext body
        html: `目前价格为:<b>₩${price}</b> 从 ₩${data.last} ${data.updown > 0 ? "上涨": "下跌"}` // html body
    
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
            let price = parseInt    (data.closing_price);
    
            if (last_price != -1) {
                console.log(`price: ${price}, last: ${last_price}, cha: ${price - last_price}`);
                if (price < (last_price - 50000)) {
                    doSendEmail(price, "{跌啦！}", {data: data, last: last, updown: -1});
                    console.log("跌破发送邮件！");
                    last_price = price;
                } else if (price > (last_price + 50000)) {
                    doSendEmail(price, "[涨啦]", {data: data, last: last, updown: 1});
                    console.log("涨幅发送邮件！");
                    last_price = price;
                }
            } else {
                last_price = price;
            }
        });
        
    // }, 5000);
    }); 
}

scheduleCronstyle();
