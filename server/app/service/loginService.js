const Service=require('egg').Service;

const crypto = require('crypto');

class LoginService extends Service{

    async login(user){
        let [{userExist}]=await this.app.mysql.query(`select count(1) userExist from t_user where user_name='${user.user_name}'`);
        if(userExist===0){
            return '2';
        }
        //根据输入的用户查询出该用户在库中的密码和salt
        let [{passwd:passwd}]=await  this.app.mysql.query(`select passwd from t_user where user_name='${user.user_name}'`);
        const [{pwd:pwd}]=await  this.app.mysql.query(`select password('${user.passwd}') pwd`);
        const comparePw=(passwd===pwd);
        if(userExist===1&&!comparePw){
          return '3'
        }
        if(userExist===1&&comparePw){
          return '1'
        }
        return '4';
    }



}


module.exports = LoginService;
