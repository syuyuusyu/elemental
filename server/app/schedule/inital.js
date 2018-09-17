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

        this.app.logger.info('Inital end');


    }


}

module.exports = Inital;
