const Koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const compress = require('koa-compress');

const serve = require('koa-static');
const render = require('koa-ejs');

const route = require('./router');

const app = new Koa();
const config = require('./config.json');
app.keys = config.keys;

// koa-favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
// koa-logger
app.use(logger());   // deprecated

// koa-commpress
// app.use(compress({
//     filter: function (content_type) {
//         return /text/i.test(content_type)
//     },
//     threshold: 2048,
//     flush: require('zlib').Z_SYNC_FLUSH
// }));

// koa-static
app.use(serve(__dirname + '/public'));   //deprecated

// koa-ejs
render(app, {
    root: path.join(__dirname, 'views'),
    layout: null,
    viewExt: 'html',
    cache: false,
    debug: true
});
// run route
route(app);

// 404
app.use(async (ctx, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	await next(err);
});

// error handler
app.use(async (ctx, next) => {
	console.log('into async 1')
	try {
		await next(); // wait until we execute the next function down the chain, then continue;
	} catch (err) {
		ctx.body = { message: err.message };
		ctx.status = err.status || 500;
	}
});


// listening at port ${config.port}
app.listen(config.port, function () {
    console.log(`listening on port @${config.port}`);
});
