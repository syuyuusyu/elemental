const Service = require('egg').Service;

class AuthorService extends Service {

    async getAuthor(token) {
        // console.log(this.app.redis.get(token));
        const json = await this.app.redis.get(token);
        return JSON.parse(json);
    }

    async getByCode(code) {
        const json = await this.app.redis.get(code);
        return JSON.parse(json);
    }


}


module.exports = AuthorService;
