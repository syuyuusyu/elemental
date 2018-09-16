const Subscription = require('egg').Subscription;


class Inital extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            cron: '0 0 0 * * *',
            immediate:true,
            type: 'worker',
        };
    }

    //
    async subscribe() {
        this.app.logger.info('Inital');
        const ctx = this.app.createAnonymousContext();
        //清空redis
        const keys=await this.app.redis.keys('*');
        for(let key of keys){
            await this.app.redis.del(key);
        }


        // 初始化接口调用实体
        //app.invokeEntitys = await app.mysql.query('select * from t_invoke_info');
        await ctx.service.redis.set('invokeEntitys',await this.app.mysql.query('select * from t_invoke_info'));

        this.app.logger.info('Inital end');


    }


}

module.exports = Inital;
