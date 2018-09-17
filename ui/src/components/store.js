import React from 'react';
import {observable, configure, action, runInAction, computed, autorun, when} from 'mobx';
import {Icon, notification, Button, Divider, Popconfirm} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { get, post, del, baseUrl, evil, getPathById} from '../util';

const antd = require('antd');

configure({enforceActions: true});

export class CommonStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
        when(
            () => this.selectedTreeId !== -1,
            () => this.queryTable()
        );
    }

    @observable
    shouldRender = false;

    @action
    setshouldRender = (flag) => {
        console.log('setshouldRender');
        this.shouldRender = flag;
    };

    //@observable
    allDictionary = [];

    //@observable
    allColumns = [];

    allEntitys = [];

    @observable
    operations = [];

    allMonyToMony = [];

    @observable
    entityId = 0;

    @action
    setEntityId = (entityId) => {
        this.entityId = entityId;
    };

    @computed
    get currentEntity() {
        return this.allEntitys.filter(d => d.id === this.entityId)[0];
    }

    @computed
    get hasParent() {
        return this.currentEntity.parentEntityId ? true : false;
    }

    @computed
    get currentParentEntity() {
        return this.hasParent ? this.allEntitys.filter(d => d.id === this.currentEntity.parentEntityId)[0] : null;
    }

    loadAllDictionary = async () => {
        let json = await get(`${baseUrl}/dictionary/dictionary/0`);
        this.allDictionary = json;
    };

    loadAllColumns = async () => {
        let json = await get(`${baseUrl}/entity/columns/0`);
        this.allColumns = json;
    };

    loadAllEntitys = async () => {
        let json = await get(`${baseUrl}/entity/entitys`);
        this.allEntitys = json;
    };

    loadAllMonyToMony = async () => {
        let json = await get(`${baseUrl}/entity/monyToMonys`);
        this.allMonyToMony = json;
    };

    @action
    loadAllOperations = async () => {
        let json = await get(`${baseUrl}/entity/entityOperations/0`);
        runInAction(() => {
            this.operations = json.filter(o => o.entityId === this.currentEntity.id);
            this.operations.forEach(o => this.operationVisible[o.id] = false);
        });
    };


    //table
    //--------------------

    @observable
    operationVisible = {};

    currentTableRow = {};


    toggleOperationVisible = (operationId) => action(() => {
        let obj = Object.create(this.operationVisible);
        obj[operationId] = !obj[operationId];
        this.operationVisible = obj;
    });

    showOperationForm = (record, operationId) => (() => {
        this.currentTableRow = record;
        this.toggleOperationVisible(operationId)();
    });

    @observable
    tableRows = [];

    @observable
    loading = false;

    @observable
    columns = [];

    queryObj = {};

    defaultQueryObj = {};

    setDefaultQueryObj = (o) => {
        this.defaultQueryObj = o;
    };

    @observable
    pagination = {
        current: 1,
        total: 0,
        size: 'small',
        pageSize: 10,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        onChange: this.pageChange
    };

    @action
    loadColumns = async () => {
        let json = await get(`${baseUrl}/entity/columns/${this.entityId}`);

        runInAction(() => {

            this.columns = json.filter(c => c.hidden != '1' && c.columnType !== 'text').map(c => {
                const column = {
                    dataIndex: c.columnName,
                    title: c.text ? c.text : c.columnName,
                    width: c.width ? c.width : 100
                };
                if (c.columnType === 'timestamp') {
                    column.render = (value, record) => moment(value).format('YYYY-MM-DD HH:mm:ss');
                }
                if (c.render) {
                    column.render = eval('(' + c.render + ')').callInstance({React, antd});
                }
                if (c.dicGroupId) {
                    const currentDictionary = this.allDictionary.filter(d => d.groupId === c.dicGroupId);
                    column.render = (value, record) => {
                        return currentDictionary.filter(d => d.value === value).length === 1 ?
                            currentDictionary.filter(d => d.value === value)[0].text : value;
                    }
                }
                if (c.foreignKeyId) {
                    const foreginNameCol = this.allColumns.find(_ => _.id === c.foreignKeyNameId);
                    const foreginEntityCode = this.allEntitys.find(_ => _.id === foreginNameCol.entityId).entityCode;
                    column.render = (value, record) => record[`${foreginEntityCode}_${foreginNameCol.columnName}`];
                }
                return column;
            });
            this.columns.push({
                title: '操作',
                width: 200,
                render: (text, record) => {
                    return (
                        <span>
                            {
                                this.operations.filter(d => d)
                                    .map(m => {
                                        if (m.type === '3') {
                                            return (
                                                <span key={m.id}>
                                                    <Popconfirm onConfirm={this.execFun(record, m.function)}
                                                                title={`确认${m.name}?`}>
                                                        <Button icon={m.icon} onClick={null}
                                                                size='small'>{m.name}</Button>
                                                    </Popconfirm>
                                                    <Divider type="vertical"/>
                                                </span>
                                            );
                                        }
                                        return (
                                            <span key={m.id}>
                                                <Button icon={m.icon} onClick={this.showOperationForm(record, m.id)}
                                                        size='small'>{m.name}</Button>
                                                <Divider type="vertical"/>
                                            </span>
                                        );
                                    })
                            }
                            {
                                this.currentEntity.editAble == '1' ? (
                                        <span>
                                    <Button icon="edit" onClick={this.showCreateForm(record, true)}
                                            size='small'>修改</Button>
                                        <Divider type="vertical"/>
                                        <Popconfirm onConfirm={this.deleteRow(record[this.currentEntity.idField])}
                                                    title="确认删除?">
                                        <Button icon="delete" onClick={null} size='small'>删除</Button>
                                    </Popconfirm>
                                    </span>)
                                    :
                                    ''
                            }

                        </span>
                    )
                }
            });


        });
    };

    execFun = (record, fn) => (() => {
        let fun = eval('(' + fn + ')').callInstance({notification, baseUrl, get, post});
        fun(record);
    });

    deleteRow = (id) => (async () => {
        let json = await get(`${baseUrl}/entity/deleteEntity/${this.currentEntity.id}/${id}`);
        if (json.success) {
            notification.info({
                message: '删除成功'
            });
        } else {
            notification.error({
                message: '删除失败'
            });
        }
        this.queryTable();
    });


    pageChange = (page, pageSize) => {
        let start = (page - 1) * pageSize;
        this.queryObj = {...this.queryObj, page, start, pageSize};
        this.queryTable()
    };

    @action
    queryTable = async () => {
        runInAction(() => {
            this.loading = true;
        });
        console.log('queryTable');
        console.log(this.treeSelectedObj);
        console.log(this.defaultQueryObj);
        console.log(this.queryObj);
        let json = await post(`${baseUrl}/entity/query/${this.entityId}`, {...this.treeSelectedObj, ...this.defaultQueryObj, ...this.queryObj});
        runInAction(() => {
            this.tableRows = json.data;
            this.pagination = {
                ...this.pagination,
                current: this.queryObj ? this.queryObj.page : 1,
                total: json.total,
            };
            this.loading = false;
        });
    };

    refQueryForm = (instance) => {
        this.queryFormInstance = instance;
    };

    refCreateForm = (instance) => {
        this.createFormInstance = instance;
    };

    //tree
    //---------------------
    @observable
    treeData = [];

    @observable
    selectedTreeId = -1;

    @computed
    get treeSelectedObj() {
        return this.currentEntity.pidField ? {[this.currentEntity.pidField]: this.selectedTreeId} : null;
    }

    @action
    initTree = async () => {
        let topParentRecord = await get(`${baseUrl}/entity/topParentRecord/${this.currentParentEntity.parentEntityId}`);
        //this.queryObj={[this.currentEntity.pidField]:topParentId};
        let json = await post(`${baseUrl}/entity/query/${this.currentParentEntity.id}`, {
            ...this.defaultQueryObj,
            [this.currentParentEntity.idField]: topParentRecord[this.currentParentEntity.idField]
        });
        runInAction(() => {
            this.selectedTreeId = json.data[0][this.currentParentEntity.idField];
            this.treeData = json.data;
            this.setCurrentRoute(topParentRecord[this.currentParentEntity.idField]);
        });
        if (this.queryFormInstance) {
            this.queryFormInstance.setCandidate();
        }
        if (this.createFormInstance) {
            this.createFormInstance.setCandidate();
        }
    };


    @action
    onLoadTreeData = async (treeNode) => {
        const parentId = treeNode.props.dataRef[this.currentParentEntity.idField];
        let json = await post(`${baseUrl}/entity/query/${this.currentParentEntity.parentEntityId}`, {
            ...this.defaultQueryObj,
            [this.currentParentEntity.pidField]: parentId
        });
        runInAction(() => {
            treeNode.props.dataRef.children = json.data;
            this.treeData = [...this.treeData];
        })
    };

    @observable
    currentRoute = [];

    @action
    setCurrentRoute = (id) => {
        this.treeData.filter(d => d).forEach(data => {
            getPathById(id, Object.create(data), (result) => {
                runInAction(() => {
                    this.currentRoute = result.map(r => ({
                        id: r[this.currentParentEntity.idField],
                        text: r[this.currentParentEntity.nameField]
                    }));
                });
            }, this.currentParentEntity.idField)
        });
    };

    @action
    treeSelect = (selectedKeys, e) => {
        let id = e.node.props.dataRef[this.currentParentEntity.idField];
        this.selectedTreeId = id;
        this.setCurrentRoute(id);
        this.queryObj = {start: 0, pageSize: this.pagination.pageSize, page: 1};
        this.queryTable();
        if (this.queryFormInstance) this.queryFormInstance.setCandidate();
        if (this.createFormInstance) this.createFormInstance.setCandidate();

    };

    //createForm
    //---------------------
    @observable
    createFormVisible = false;

    isFormUpdate = false;



    @action
    toggleCreateFormVisible = () => {
        this.createFormVisible = !this.createFormVisible;
    };

    showCreateForm = (record, isUpdate) => (() => {
        this.isFormUpdate = isUpdate;
        this.currentTableRow = record;
        if (this.hasParent) {
            if (!this.treeSelectedObj[this.currentEntity.pidField]) {
                notification.info({
                    message: '先选中对应父节点'
                });
                return;
            }
        }
        this.toggleCreateFormVisible();
    });

    //operation
    //---------------------------
    relevantEntity;


}
