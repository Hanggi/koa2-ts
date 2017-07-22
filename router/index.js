
const router = require('koa-router')();

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
        .get('/qwe', async (ctx, next) => {

            await ctx.render('home', {
                name: 'koa2 '
            });
        });

    app
        .use(router.routes())
        .use(router.allowedMethods());
}
