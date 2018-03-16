
var crypto = require('crypto');
            // var request = require('request');
const router = require('koa-router')();
const send = require('koa-send');

const request = require('request');

// let charts = require("./charts");

function getRequest(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}
function postRequest(options) {
    return new Promise(function (resolve, reject) {
        request.post(options, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

function dateDisplayed(timestamp) {
    let date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
}

// function packAPI(url) {
//     let ACCESS_TOKEN = '5d4482dc-0320-4af1-af27-dd386461fe01';
//     var SECRET_KEY = '55e70ee6-ce9c-4e43-854c-d475631d3c5e';
//     var url = url;
//     var payload = {
//         "access_token": ACCESS_TOKEN,
//         "currency": "bch",
//         "nonce": Date.now()
//     };
    
//     payload = new Buffer(JSON.stringify(payload)).toString('base64');
    
//     let signature = crypto
//         .createHmac("sha512", SECRET_KEY.toUpperCase())
//         .update(payload)
//         .digest('hex');
    
//         let headers = {
//         'content-type':'application/json',
//         'X-COINONE-PAYLOAD': payload,
//         'X-COINONE-SIGNATURE': signature
//     };
    
//     let options = {
//         url: url,
//         headers: headers,
//         body: payload
//     };

//     return options
// }

module.exports = (app) => {
    router
        .get('/', async (ctx, next) => {

            await ctx.redirect("hppt://blog.hanggi.me");

            await ctx.render('home', {
                name: 'think php build '
            });
            // ctx.body = 'think ph build';
        })
        .get('/test', async (ctx, next) => {
            let query = JSON.stringify(ctx.query);
            console.log(typeof(query));
            ctx.body = `This is the test page GET:${query}`;
        })

        // .get('/ddboard', async (ctx, next) => {

        //     if (ctx.query.pp != "38207184c99451e103385c85a5dee89d") {
        //         return false
        //     }

        //     let ACCESS_TOKEN = '5d4482dc-0320-4af1-af27-dd386461fe01';
        //     var SECRET_KEY = '55e70ee6-ce9c-4e43-854c-d475631d3c5e';
        //     var url = 'https://api.coinone.co.kr/v2/account/balance/';
        //     var payload = {
        //         "access_token": ACCESS_TOKEN,
        //         "nonce": Date.now()
        //     };
          
        //     payload = new Buffer(JSON.stringify(payload)).toString('base64');
            
        //     var signature = crypto
        //         .createHmac("sha512", SECRET_KEY.toUpperCase())
        //         .update(payload)
        //         .digest('hex');
            
        //     var headers = {
        //         'content-type':'application/json',
        //         'X-COINONE-PAYLOAD': payload,
        //         'X-COINONE-SIGNATURE': signature
        //     };
            
        //     var options = {
        //         url: url,
        //         headers: headers,
        //         body: payload
        //     };

        //     console.log(ctx.query)

        //     let balance = await postRequest(options);
        //     // console.log(balance)
        //     balance = JSON.parse(balance)
        //     console.log(balance)
        //     await ctx.render('ddboard', {
        //         title: 'wow',
        //         balance: balance
        //     })
        // })
        // .get('/charts', charts)
        // .get('/bafeida', async (ctx, next) => {
        //     let options = packAPI('https://api.coinone.co.kr/v2/order/complete_orders/')
        //     let options2 = packAPI('https://api.coinone.co.kr/v2/order/limit_orders/')
        //     let options3 = packAPI('https://api.coinone.co.kr/v2/account/daily_balance/')
            
        //     let now = await getRequest("https://api.coinone.co.kr/ticker?currency=bch");
        //     let nowbtc = await getRequest("https://api.coinone.co.kr/ticker?currency=btc");

        //     let dbalance = await postRequest(options3);

        //     let trade = await getRequest("https://api.coinone.co.kr/trades?currency=bch&period=day");

        //     let ob = await getRequest("https://api.coinone.co.kr/orderbook?currency=bch");
        //     // console.log(JSON.parse(trade))
        //     let order = await postRequest(options);
        //     orders = JSON.parse(order)
        //     await ctx.render('bafeida', {
        //         list: orders.completeOrders,
        //         date: dateDisplayed,
        //         bch: JSON.parse(now),
        //         btc: JSON.parse(nowbtc),
        //         trade: JSON.parse(trade),
        //         dbalance: dbalance,
        //         ob: ob
        //     })
        //     console.log(JSON.parse(ob).ask.length)
        //     console.log("===================")
        //     let order2 = await postRequest(options2);
        //     // console.log(JSON.parse(order2))
        // })
        // .get('/bcdiff', async (ctx, next) => {

        //     // console.log(typeof(ctx.query));
        //     // let query = JSON.parse(ctx.query);

        //     let coinone = await getRequest('https://api.coinone.co.kr/ticker/');
        //     let bitflyer = await getRequest('https://lightning.bitflyer.jp/v1/getprices');
        //     // let viabtc = await doRequest('https://api.viabtc.com/v1/market/ticker?market=BTCCNY');

        //     // console.log(JSON.parse(bitflyer)[0].rate)
        //     bfRes = JSON.stringify(JSON.parse(bitflyer)[0].rate)
        //     await ctx.render('bitcoin', {
        //         co: JSON.parse(coinone).last,
        //         bf: bfRes,
        //         // vb: JSON.parse(viabtc).data.ticker.last,
        //         rate: ctx.query.rate || 178,
        //     });
            
        //     // ctx.body = {
        //     //     co: JSON.parse(res.last)
        //     // }
        // })
        
        .get('/adm*', async (ctx, next) => {
            console.log(__dirname);
            await send(ctx, '/public/d/index.html');
        })
        .get('/qwe', async (ctx, next) => {

            await ctx.render('home', {
                name: 'koa2 '
            });
        });

    app
        .use(router.routes())
        .use(router.allowedMethods());
}
