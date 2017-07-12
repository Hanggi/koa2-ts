const Koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');

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
app.use(bodyParser());

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






// error handler
app.use(async (ctx, next) => {
	try {
		await next(); // wait until we execute the next function down the chain, then continue;
		// 404 handle, throw 404 error
		if (ctx.status === 404) {
        	ctx.throw(404);
    	}
	} catch (err) {
		console.log('get error')
		ctx.body = { message: err.message };
		ctx.status = err.status || 500;
	}
});


// listening at port ${config.port}
app.listen(config.port, function () {
    console.log(`listening on port @${config.port}`);
});
