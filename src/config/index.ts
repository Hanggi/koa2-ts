
import _ from 'lodash';
import path from 'path';

const ROOT: string = path.resolve(__dirname, '../');
const NODE_ENV: string = _.defaultTo(process.env.NODE_ENV, 'development');

const isProd: boolean = NODE_ENV === 'production';
const isTest: boolean = NODE_ENV === 'test';
const isDev: boolean = NODE_ENV === 'development';

function normalizePort (val: string) {
  const port: number = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const config = {
  server: {
    port: normalizePort(_.defaultTo(process.env.PORT, '3210')),
    wsPort: '3211',
    host: _.defaultTo(process.env.HOST, 'localhost'),
    root: ROOT,
    data: path.join(ROOT, '../', '/data')
  },

  env: {
    isDev,
    isProd,
    isTest
  },

  cors: {
    origin: '*',
    exposeHeaders: ['Authorization'],
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Authorization', 'Content-Type'],
    keepHeadersOnError: true
  },

  secret: _.defaultTo(process.env.SECRET, 'secret'),

  jwtSecret: _.defaultTo(process.env.JWT_SECRET, 'secret'),

  jwtOptions: {
    expiresIn: '7d'
  }
};

export default config;
