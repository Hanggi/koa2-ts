import Koa from 'koa';

export default async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
    if (Number(ctx.response.status) === 404 && !ctx.response.body) {
      ctx.throw(404);
    }
  } catch (err) {
    console.error(err);
  }
};
