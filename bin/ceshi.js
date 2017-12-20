const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
var smtpTransport = require('nodemailer-smtp-transport');
// const xoauth2 = require('xoauth2');

const MA = require("moving-average");
let ma = MA(5 * 60 * 1000);

const request = require('request');
const Koa = require('koa');
const app = new Koa();

let time = []


let lastPrice = -1;
let bi = 0;

//let diff = 0;

let btc_price, bch_price;
let btc_num = 0, bch_num = 0;
let lastA_price;
let lastB_price;
let chaMax, chaMin;
let lastDiff;
let Diff;
let money = 10000000;

function diff_price(A_price, B_price)
{
/*    console.log("vvv")
    console.log(A_price);
    console.log(B_price);*/
    return Math.abs(A_price - B_price);
}

function currentBuy() {

}

function currentSell() {

}

function noise() {

}

function mean(time, data) {
    console.log("这是一个当前的mean, 误差是ep")
    for (let i = 0; i < data.length; i++) {

    }
}
 
function print()
{
    console.log("btc's price: " + (btc_price) + "---------num: " + btc_num);
    console.log("bch's price: " + bch_price + "---------num: " + bch_num);
    console.log("btc-bch Diff: " + Diff);
    console.log("Amount: " + money);
}

function trade() {
    
    let ep = btc_price * 0.0025 + bch_price * 0.0025;
    Diff = diff_price(btc_price, bch_price);
    

    if (Diff < chaMax && lastDiff > Diff) {
        console.log("Sell the highest price coin and buy the lowest price coin");
        if(bch_price == Math.max(btc_price, bch_price))
        {
            if (bch_num <= 0) {

            }else {
                money = (bch_num * bch_price) * 0.999;
                console.log("1: " + money)
                bch_num = 0;
                btc_num = money / (1.0 * btc_price);
            }
        } 
        else
        {
            if (btc_num <= 0) {

            }else {
                money = (btc_num * btc_price) * 0.999;
                console.log("2: " + money)
                btc_num = 0;
                bch_num = money / (1.0 * bch_price);
            }    
        }
    }

    //When the diff_price is becoming lower but no more lower, Buy the highest price coin and sell the lowest price coin
    // if (Diff > chaMin && lastDiff < Diff) {
    //     console.log("Buy the highest price coin and sell the lowest price coin");
    //     if(bch_price == Math.max(btc_price, bch_price))
    //     {
    //         if (btc_num <= 0) {

    //         }else {
    //             money = btc_num * btc_price;
    //             console.log("3: " + money)
    //             btc_num = 0;
    //             bch_num = money / (1.0 * bch_price);
    //         }
    //    } 
    //     else
    //     {
    //         if (bch_num <= 0) {

    //         }else {
    //             money = bch_num * bch_price;
    //             console.log("4: " + money)
    //             bch_num = 0;
    //             btc_num = money / (1.0 * btc_price);     
    //         }  
    //     }
    // }
    chaMax = Math.max(chaMax, Diff);
    chaMin = Math.min(chaMin, Diff);
    
    lastDiff = Diff;
    lastA_price = btc_price;
    lastB_price = bch_price;

    money = btc_price * btc_num + bch_price * bch_num;
    console.log("\n");
}

setInterval(()=>{
    request("https://api.coinone.co.kr/trades?currency=btc", (err, res, body) => {
        if (err) {
            console.log(err)
            return;
        }
        let data = JSON.parse(body).completeOrders;
        // console.log(data.length)
    
        let max = Math.max.apply(Math, data.slice().map(function (o) {return o.price;}))
        // console.log("一小时最高价：" + max)
    
        let curPrice = data[data.length - 1].price
        let curTime = data[data.length - 1].timestamp
        // console.log("目前价格:" + now)
        btc_price = curPrice * 0.1;
       

        request("https://api.coinone.co.kr/trades?currency=bch", (err, res, body) => {
            if (err) {
                console.log(err)
                return;
            }
            let data = JSON.parse(body).completeOrders;
            // console.log(data.length)
        
            let max = Math.max.apply(Math, data.slice().map(function (o) {return o.price;}))
            // console.log("一小时最高价：" + max)
        
            let curPrice = data[data.length - 1].price
            let curTime = data[data.length - 1].timestamp
            // console.log("目前价格:" + now)
            bch_price = curPrice;

                // ma.push(data[data.length - 1].timestamp, data[data.length - 1].price);
                // console.log('moving average now is', ma.movingAverage());
                // console.log('moving variance now is', ma.variance());
                // console.log('moving deviation now is', ma.deviation());
                // console.log('forecast is', ma.forecast());
            if(isNaN(chaMax))
            {
                chaMax = diff_price(btc_price, bch_price);
                chaMin = chaMax;
                lastDiff = chaMax;
                btc_num = (money/(btc_price));
            }

            trade();
            print();
        });
    });

    
    
  /*  request("https://api.coinone.co.kr/trades?currency=btc", (err, res, body) => {
    if (err) {
        console.log(err)
        return;
    }
    let data = JSON.parse(body).completeOrders;
    // console.log(data.length)

    let max = Math.max.apply(Math, data.slice().map(function (o) {return o.price;}))
    // console.log("一小时最高价：" + max)

    let curPrice = data[data.length - 1].price
    let curTime = data[data.length - 1].timestamp
    // console.log("目前价格:" + now)


    if (lastPrice > 0) {
        diff = curPrice - lastPrice;
    }

    console.log("当前价格：" + curPrice + " 差价：" + diff + " 综合差价：" + (diff+lastDiff));

    if (diff + lastDiff > curPrice * 0.001 && money > 0) {
        bi = money / curPrice
        money = 0;
        // diff = 0
    }

    if (diff + lastDiff < - curPrice * 0.001 && diff * lastDiff > 0 && bi > 0) {
        money = curPrice * bi
        bi = 0
        // diff = 0
    }

    console.log("币：" + bi + " 钱：" + money)

    lastPrice = curPrice;
    lastDiff = diff;

    // let rate = curPrice / max;
    // console.log("涨跌百分比：" + rate*100 + "%")
    // // console.log(typeof rate)

    // if (rate < 0.9) {
    //     console.log("到达止损点！开始止损");

    // }

    });*/
}, 1000);



// var last_price = -1;
// var last_bch_price = -1;

// var transporter = nodemailer.createTransport(smtpTransport({
//     host: "smtp.qq.com", // 主机
//     secure: true, // 使用 SSL
//     port: 465, // SMTP 端口
//     auth: {
//       user: "271335064@qq.com", // 账号
//       pass: "xgebevpovhhccbbj" // 密码
//     }
// }));

// let doSendEmail = (price, title, data) => {
//     let mailOptions = {
//         from: '271335064@qq.com', // sender address
//         // to: 'hanggicrown@gmail.com', // list of receivers
//         to: '2745490330@qq.com',
//         // to: 'hanggi@seoul.ac.kr',
//         subject: `${title} [${price}]`, // Subject line
//         text: '!!Hello world ✔', // plaintext body
//         html: `目前价格为:<b>₩${price}</b> 从 ₩${data.last} ${data.updown > 0 ? "↑上涨↑": "↓下跌↓"}
//             <br>
//             最高价：₩${data.data.max_price}，最低价：₩${data.data.min_price}
//         ` // html body
    
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Message sent: ' + info.response);
//         }
//     });
// }
// let lastTime = 0
// let rounding = (p) => parseInt(p / 50000);

// let heat = 0;

// let scheduleCronstyle = () => {
//     // schedule.scheduleJob('1 * * * * *', function(){
//         setInterval(()=>{
//             request("https://api.coinone.co.kr/trades?currency=bch", (err, res, body) => {
//                 if (err) {
//                     console.log(err)
//                 }
//                 let data = JSON.parse(body).completeOrders;
//                 let now = data[data.length - 1].timestamp;
//                 let limit = now - 60;
//                 let qty = 0;
//                 // console.log(now)
//                 for (let i = data.length - 1; i > 0; i--) {
//                     // console.log(typeof data)
//                     // console.log(i)
//                     if (Number(data[i].timestamp) < limit) {
//                         break;
//                     }
//                     qty += Number(data[i].qty);
//                 }
//                 qty = Math.round(qty)
//                 console.log("前一分钟交易量：" + qty)
//                 // console.log(heat)
//                 if (qty > 160) {
//                     let mailOptions = {
//                         from: '271335064@qq.com', // sender address
//                         // to: 'hanggicrown@gmail.com', // list of receivers
//                         to: '2745490330@qq.com',
//                         // to: 'hanggi@seoul.ac.kr',
//                         subject: `交易量突然上升! ${qty}`, // Subject line
//                         text: '!!Hello world ✔', // plaintext body
//                         html: `交易量提升警报！` // html body
//                     };

//                     let interval = new Date() - lastTime;
//                     if (heat < 20)
//                         heat++;

//                     if (interval > 10000 * heat) {
//                         lastTime = new Date()
                        
//                         transporter.sendMail(mailOptions, function(error, info){
//                             if(error){
//                                 console.log(error);
//                             }else{
//                                 console.log('Message sent: ' + info.response);
//                             }
//                         });
//                         mailOptions.to = "271335064@qq.com"
//                         transporter.sendMail(mailOptions, function(error, info){
//                             if(error){
//                                 console.log(error);
//                             }else{
//                                 console.log('Message sent: ' + info.response);
//                             }
//                         });
//                     }
//                 }else {
//                     if (heat > 0)
//                         heat--;
//                 }

//             });
//         }, 3000);
//     // }); 
//     setInterval(()=>{

//         console.log('scheduleCronstyle:' + new Date());
//         // let bithumb = await doRequest('https://api.bithumb.com/public/ticker/BTC');
//         request("https://api.coinone.co.kr/ticker?currency=btc", (error, response, body) => {
//             if (error) {
//                 console.log(error)
//             }
//             let data = JSON.parse(body);
//             let price = parseInt(data.last);
    
//             if (last_price != -1) {
//                 console.log(`比特币 price: ${price}, last: ${last_price}, 差价: ${price - last_price}`);
//                 if (price < (last_price - 50000)) {
//                     doSendEmail(price, "{BTC跌啦！}", {data: data, last: last_price, updown: -1});
//                     console.log("BTC 跌破发送邮件！");
//                     last_price = price;
//                 } else if (price > (last_price + 50000)) {
//                     doSendEmail(price, "[BTC涨啦]", {data: data, last: last_price, updown: 1});
//                     console.log("BTC 涨幅发送邮件！");
//                     last_price = price;
//                 }
//             } else {
//                 last_price = price;
//             }
//         });

//         request('https://api.coinone.co.kr/ticker?currency=bch', (error, response, body) => {
//             if (error) {
//                 console.log(error)
//             }
//             let data = JSON.parse(body);
//             let price = parseInt(data.last);
    
//             if (last_bch_price != -1) {
//                 console.log(`比特现金 price: ${price}, last: ${last_bch_price}, 差价: ${price - last_bch_price}`);
//                 if (price < (last_bch_price - 20000)) {
//                     doSendEmail(price, "{BCH:跌啦！}", {data: data, last: last_bch_price, updown: -1});
//                     console.log("BCH 跌破发送邮件！");
//                     last_bch_price = price;
//                 } else if (price > (last_bch_price + 20000)) {
//                     doSendEmail(price, "[BCH涨啦]", {data: data, last: last_bch_price, updown: 1});
//                     console.log("BCH 涨幅发送邮件！");
//                     last_bch_price = price;
//                 }
//             } else {
//                 last_bch_price = price;
//             }
//         });
        
//     }, 3000);
// }

// scheduleCronstyle();
