const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const request = require('request');
const Koa = require('koa');
const app = new Koa();

var last_price = -1;

// function doRequest(url) {
//     return new Promise(function (resolve, reject) {
//         request(url, function (error, res, body) {
//             if (!error && res.statusCode == 200) {
//                 resolve(body);
//             } else {
//                 reject(error);
//             }
//         });
//     });
// }

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
