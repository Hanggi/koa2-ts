const Koa = require('koa');
const app = new Koa();

const path = require('path');

const logger = require('koa-logger');
const render = require('koa-ejs');
const co = require('co');
const router = require('koa-router')();
const serve = require('koa-static');
app.use(serve(__dirname + '/public'));

router.get('/qwe', async function (ctx, next) {
    console.log('123')

    await ctx.render('home', {
        name: 'koa'
    });
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(logger());
render(app, {
    root: path.join(__dirname, 'views'),
    layout: null,
    viewExt: 'html',
    cache: false,
    debug: true
});
app.context.render = co.wrap(app.context.render);



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
