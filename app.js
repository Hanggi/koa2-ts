const Koa = require('koa');
const app = new Koa();


app.use(ctx => {
    ctx.body = 'listening @ port: 3210';
});

app.listen(3210);
