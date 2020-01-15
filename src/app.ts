import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
// import render from 'koa-ejs';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import serve from 'koa-static';
import views from 'koa-views';
import socketIO from 'socket.io';

import config from './config';
import errors from './middlewares/errors.middleware';
import router from './routes';

// import multer from 'koa-multer'
// import userAgent from 'koa-useragent'
// app.use(userAgent)
// koa-error
// koa-compress
// koa-ejs
// koa-send
// koa-favicon
// import jwt from "koa-jwt"


const app = new Koa();
const server = require('http').createServer(app.callback());
const io = socketIO(server);

app.use(helmet());
app.use(logger());
app.use(conditional());
app.use(etag());
app.use(errors);
app.use(cors());
app.use(bodyParser());

app.use(serve(config.server.root + '/public'));

app.use(views(config.server.root + '/views', {
	map: {
		html: 'underscore'
	}
}));

app.use(router.routes());
app.use(router.allowedMethods());

// app.listen(config.server.port, () => {
// 	console.log(`Listening ${config.server.host}:${config.server.port}`);
// });

io.on('connection', () => {
	/* … */
});
server.listen(config.server.wsPort, () => {
	console.log(`Listening ${config.server.host}:${config.server.port} with WS.`);
});

// const server = http2.createSecureServer(app.callback())
// server.listen(config.server.port)
export default server;
