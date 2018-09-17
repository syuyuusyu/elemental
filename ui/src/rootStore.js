import {TreeStore} from "./main";
import { HomeStore } from "./home";

import {AuthorityStore} from './login';

import {EntityStore} from './entity';
import {CommonStore} from "./components";
import {RelevantRoleButtonStore} from './components/roleButton';


export default class RootStore {



    constructor() {
        this.treeStore = new TreeStore(this);
        this.homeStore = new HomeStore(this);
        this.authorityStore = new AuthorityStore(this);
        this.entityStore=new EntityStore(this);
        this.commonStore=new CommonStore(this);
        this.relevantRoleButtonStore=new RelevantRoleButtonStore(this);


    }
}

