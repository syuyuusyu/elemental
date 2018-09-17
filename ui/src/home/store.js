import {observable,action,runInAction,configure} from 'mobx';
import {baseUrl, get, post} from '../util';
import {notification} from 'antd';

configure({enforceActions: true});

export class HomeStore{
  constructor(rootStore){
    this.rootStore = rootStore;
  }

}
