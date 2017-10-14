const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const xoauth2 = require('xoauth2');
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
    auth: {
        type: 'OAuth2',
        user: 'hanggicrown@gmail.com',
            // pass: '110119120',
        clientId: '739473511141-erbgfgsuf76g4fls94f8nclhr3kt3pi1.apps.googleusercontent.com',
        clientSecret: 'qGVLvLxBeeJZAufN2SHc4bfF',
        refreshToken: '1/Ro36Gsh-dt4Jznw0-diYONxEu-1THzwzyX3xYQhybTs',
        accessToken: 'ya29.GlvkBGYQeTmkZU_1OawFHMYAd3CHj89ycBOQ1sOBDXRpuVDhYMqP7mz7lW9zKD-Cf6XPhilQruuyzmLnr9cm7FEGOY35DeJIVAVnLOFTS0vpOfhV40eefdHtLeZc'
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