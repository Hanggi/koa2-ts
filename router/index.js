
const router = require('koa-router')();
const send = require('koa-send');

const request = require('request');

function doRequest(url) {
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

module.exports = (app) => {
    router
        .get('/', async (ctx, next) => {
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
        .get('/bitcoin', async (ctx, next) => {

            console.log(typeof(ctx.query));
            // let query = JSON.parse(ctx.query);

            let coinone = await doRequest('https://api.coinone.co.kr/ticker/');
            let bitflyer = await doRequest('https://lightning.bitflyer.jp/v1/getprices');
            let viabtc = await doRequest('https://api.viabtc.com/v1/market/ticker?market=BTCCNY');

            console.log(JSON.parse(bitflyer)[0].rate)
            bfRes = JSON.stringify(JSON.parse(bitflyer)[0].rate)
            await ctx.render('bitcoin', {
                co: JSON.parse(coinone).last,
                bf: bfRes,
                vb: JSON.parse(viabtc).data.ticker.last,
                rate: ctx.query.rate || 178
            });
            
            // ctx.body = {
            //     co: JSON.parse(res.last)
            // }
        })
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
