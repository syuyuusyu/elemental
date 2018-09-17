const Controller=require('egg').Controller;

class MenuController extends Controller{

    constructor(){
        super(...arguments);
        this.roleMenuSql=
            `select distinct m.* from t_menu m join t_role_menu rm on rm.menu_id=m.id 
                where m.parent_id=? and rm.role_id in (?) order by m.menu_order`;
    }

    async menuTree() {
        const token =this.ctx.request.header['access-token'];
        const {roles,user}=await this.service.authorService.getAuthor(token);
        console.log(user);
        let tree=[];
        if(roles.length>0){
            tree=await this.app.mysql.query(this.roleMenuSql,[1,roles.map(r=>r.id)]);
            await this._menuTree(tree,user,roles);
        }
        console.log(tree);
        this.ctx.body=tree;
    }

    async _menuTree(tree,user,roles){

        for(let i=0;i<tree.length;i++){
            const current=await this.app.mysql.query(this.roleMenuSql,[tree[i].id,roles.map(r=>r.id)]);
            if(current && current.length>0){
                tree[i].children=current;
                await this._menuTree(tree[i].children,user,roles);
            }else if(tree[i].load_method){
                let method=tree[i].load_method.split('.');
                tree[i].children=await this.service[method[0]][method[1]](tree[i],user,roles);
            }
        }
    }



}

module.exports=MenuController;
