const jwt=require('jsonwebtoken');

module.exports = (options,app) => {
    return async function author(ctx, next) {
        ctx.logger.info('author');
       // await asyncVerify(ctx,ctx.request.header['access-token'], 'n7d3t7x7',next);
       //  const token=ctx.request.header['access-token'];
       //  const author=await ctx.service.authorService.getByCode(token);
       //  ctx.service.systemLog.operateLog(ctx);
       //  if((token && author) ){
       //      await next();
       //  }else{
       //      ctx.logger.info('token失效!!!');
       //      ctx.status=401;
       //      ctx.body={status:401,message:'token失效'};
       // }
        await next();
    };
};

