'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const fs = require('fs');

class HomeController extends Controller {
    async index() {
        await this.ctx.render('/index.html');
    }



    async doNothing(){
        this.ctx.body={}
    }

    async login() {
        let msg = await this.service.loginService.login(this.ctx.request.body);
        let user = {};
        let roles = [];
        let token = '';
        if (msg === '1') {
            [user] = await  this.app.mysql.query(
                `select id,name,user_name,phone,ID_number,email from t_user where user_name='${this.ctx.request.body.user_name}'`);
            roles = await this.app.mysql.query(`select r.* from t_role r join t_user_role u on r.id=u.role_id  where u.user_id=${user.id}`);

            token = jwt.sign({payload: user}, this.app.secret, {
                //expiresIn: 30
            });
            this.app.redis.set(token, JSON.stringify({user, roles}));
        }
        this.ctx.body = {msg, user, token, roles};
    }

    async logout() {
        const token = this.ctx.request.header['access-token'];
        const auth = await this.service.redis.get(token);
        this.app.redis.del(token);
        this.ctx.body={};

    }

    async resetPassword(){
        let token=this.ctx.request.header['access-token'];
        let {user}=await this.service.redis.get(token);
        let result=await this.app.mysql.query(`update t_user set passwd=password('123456') where id=${user.id}`);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body={success:updateSuccess};
    }
}


module.exports = HomeController;


