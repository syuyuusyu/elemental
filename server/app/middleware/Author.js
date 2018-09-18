const jwt=require('jsonwebtoken');

module.exports = (options,app) => {
    return async function author(ctx, next) {
        ctx.logger.info('author');
        const token=ctx.request.header['access-token'];
        const author=await ctx.service.redis.get(token);
        if((token && author) ){
            await next();
        }else{
            ctx.logger.info('token失效!!!');
            ctx.status=401;
            ctx.body={status:401,message:'token失效'};
       }
    };
};

