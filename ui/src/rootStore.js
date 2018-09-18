import {TreeStore} from "./main";

import {AuthorityStore} from './login';

import {EntityStore} from './entity';
import {CommonStore} from "./components";


export default class RootStore {



    constructor() {
        this.treeStore = new TreeStore(this);
        this.authorityStore = new AuthorityStore(this);
        this.entityStore=new EntityStore(this);
        this.commonStore=new CommonStore(this);


    }
}

