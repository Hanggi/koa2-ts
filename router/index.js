
const router = require('koa-router')();

module.exports = (app) => {
    router
        .get('/', async (ctx, next) => {
            ctx.body = 'koa2 build';
        })
        .get('/qwe', async function (ctx, next) {

            await ctx.render('home', {
                name: 'koa2 '
            });
        });

    app
        .use(router.routes())
        .use(router.allowedMethods());
}
