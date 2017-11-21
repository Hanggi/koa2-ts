const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
var smtpTransport = require('nodemailer-smtp-transport');
// const xoauth2 = require('xoauth2');
const request = require('request');
const Koa = require('koa');
const app = new Koa();

var last_price = -1;
var last_bch_price = -1;

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
        to: '2745490330@qq.com',
        // to: 'hanggi@seoul.ac.kr',
        subject: `${title} [${price}]`, // Subject line
        text: '!!Hello world ✔', // plaintext body
        html: `目前价格为:<b>₩${price}</b> 从 ₩${data.last} ${data.updown > 0 ? "↑上涨↑": "↓下跌↓"}
            <br>
            最高价：₩${data.data.max_price}，最低价：₩${data.data.min_price}
        ` // html body
    
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
}
let lastTime = 0
let rounding = (p) => parseInt(p / 50000);

let scheduleCronstyle = () => {
    // schedule.scheduleJob('1 * * * * *', function(){
        setInterval(()=>{
            request("https://api.coinone.co.kr/trades?currency=bch", (err, res, body) => {
                let data = JSON.parse(body).completeOrders;
                let now = data[data.length - 1].timestamp;
                let limit = now - 60;
                let qty = 0;
                // console.log(now)
                for (let i = data.length - 1; i > 0; i--) {
                    // console.log(typeof data)
                    // console.log(i)
                    if (Number(data[i].timestamp) < limit) {
                        break;
                    }
                    qty += Number(data[i].qty);
                }
                qty = Math.round(qty)
                console.log("前一分钟交易量：" + qty)
                if (qty > 160) {
                    let mailOptions = {
                        from: '271335064@qq.com', // sender address
                        // to: 'hanggicrown@gmail.com', // list of receivers
                        to: '2745490330@qq.com',
                        // to: 'hanggi@seoul.ac.kr',
                        subject: `交易量突然上升! ${qty}`, // Subject line
                        text: '!!Hello world ✔', // plaintext body
                        html: `交易量提升警报！` // html body
                    };

                    if ((new Date() - lastTime) > 10000) {
                        lastTime = new Date()
                        
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log(error);
                            }else{
                                console.log('Message sent: ' + info.response);
                            }
                        });
                        mailOptions.to = "271335064@qq.com"
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log(error);
                            }else{
                                console.log('Message sent: ' + info.response);
                            }
                        });
                    }

                    
                }

            });
        }, 5000);
    // }); 
    setInterval(()=>{

        console.log('scheduleCronstyle:' + new Date());
        // let bithumb = await doRequest('https://api.bithumb.com/public/ticker/BTC');
        request("https://api.coinone.co.kr/ticker?currency=btc", (error, response, body) => {
            let data = JSON.parse(body);
            let price = parseInt(data.last);
    
            if (last_price != -1) {
                console.log(`比特币 price: ${price}, last: ${last_price}, 差价: ${price - last_price}`);
                if (price < (last_price - 50000)) {
                    doSendEmail(price, "{BTC跌啦！}", {data: data, last: last_price, updown: -1});
                    console.log("BTC 跌破发送邮件！");
                    last_price = price;
                } else if (price > (last_price + 50000)) {
                    doSendEmail(price, "[BTC涨啦]", {data: data, last: last_price, updown: 1});
                    console.log("BTC 涨幅发送邮件！");
                    last_price = price;
                }
            } else {
                last_price = price;
            }
        });

        request('https://api.coinone.co.kr/ticker?currency=bch', (error, response, body) => {
            let data = JSON.parse(body);
            let price = parseInt(data.last);
    
            if (last_bch_price != -1) {
                console.log(`比特现金 price: ${price}, last: ${last_bch_price}, 差价: ${price - last_bch_price}`);
                if (price < (last_bch_price - 20000)) {
                    doSendEmail(price, "{BCH:跌啦！}", {data: data, last: last_bch_price, updown: -1});
                    console.log("BCH 跌破发送邮件！");
                    last_bch_price = price;
                } else if (price > (last_bch_price + 20000)) {
                    doSendEmail(price, "[BCH涨啦]", {data: data, last: last_bch_price, updown: 1});
                    console.log("BCH 涨幅发送邮件！");
                    last_bch_price = price;
                }
            } else {
                last_bch_price = price;
            }
        });
        
    }, 5000);
}

scheduleCronstyle();
