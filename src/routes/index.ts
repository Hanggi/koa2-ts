
import Router from '@koa/router';

const router: Router = new Router();
const v1: Router = new Router();

// api.use(usersRoutes);

router.use('/v1', v1.routes());

router.get('/ping', async (ctx, next) => {
  ctx.body = 'pong';
});

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello World!'
  });
});

export default router;
