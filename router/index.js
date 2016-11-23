
const router = require('koa-router')();

module.exports = (app) => {
    router
        .get('/', async (ctx, next) => {
            ctx.body = 'koa2 build';
        })
        .get('/test', async (ctx, next) => {
            console.log(ctx.query)
            ctx.body = `This is the test page GET:${ctx.query}`;
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
