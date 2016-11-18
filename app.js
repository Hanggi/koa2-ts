const Koa = require('koa');
const app = new Koa();

const logger = require('koa-logger');


app.use(logger());

app.use(async (ctx, next) => {
  try {
    await next(); // wait until we execute the next function down the chain, then continue;
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

// app.use((ctx, next) => {
//     const start = new Date();
//     return next().then(() => {
//         const ms = new Date() - start;
//         console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//     });
// });

// app.use(async function(ctx, next) {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

app.use(ctx => {
    ctx.body = 'listening @ port: 3210';
});



app.listen(3210);
