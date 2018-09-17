const Service=require('egg').Service;

const crypto = require('crypto');

class LoginService extends Service{

    async login(user){
        let [{userExist}]=await this.app.mysql.query(`select count(1) userExist from t_user where user_name='${user.user_name}'`);
        if(userExist===0){
            return '2';
        }


        //根据输入的用户查询出该用户在库中的密码和salt
        let result=await  this.app.mysql.query(`select passwd,salt from t_user where user_name='${user.user_name}'`);
        const salt=result[0].salt;
        const loginPwDB=result[0].passwd;//库中用户的密码
        const hmac = crypto.createHmac('sha256', salt);
        const loginPwHmac=hmac.update(user.passwd).digest('hex');//加密后的前端输入的密码
        const comparePw=(loginPwDB===loginPwHmac);
        if(userExist===1&&comparePw===false){
          return '3'
        }
        if(userExist===1&&comparePw===true){
          return '1'
        }
        return '4';
    }



}


module.exports = LoginService;
