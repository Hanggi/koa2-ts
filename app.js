const Koa = require('koa');
const app = new Koa();

const path = require('path');

// koa-logger
const logger = require('koa-logger');
app.use(logger());   // deprecated


// const co = require('co');


app
    .use(router.routes())
    .use(router.allowedMethods());

// koa-commpress
const compress = require('koa-compress');
// app.use(compress({
//     filter: function (content_type) {
//         return /text/i.test(content_type)
//     },
//     threshold: 2048,
//     flush: require('zlib').Z_SYNC_FLUSH
// }));

// koa-static
const serve = require('koa-static');
app.use(serve(__dirname + '/public'));   //deprecated

// koa-favicon
const favicon = require('koa-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));

// koa-ejs
const render = require('koa-ejs');
render(app, {
    root: path.join(__dirname, 'views'),
    layout: null,
    viewExt: 'html',
    cache: false,
    debug: true
});
app.context.render = co.wrap(app.context.render);

// koa-router
const router = require('koa-router')();
router.get('/qwe', async function (ctx, next) {
    console.log('123')

    await ctx.render('home', {
        name: 'koa2 '
    });
});


app.use(async (ctx, next) => {
    console.log('into async 1')
  try {
    await next(); // wait until we execute the next function down the chain, then continue;
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});



app.use(ctx => {
    ctx.body = 'listening @ port: 3210';
});




app.listen(3210);
