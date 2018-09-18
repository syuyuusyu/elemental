'use strict';

module.exports = app => {
    const {router, controller} = app;
    router.get('/index', controller.home.index);

    router.get('/doNothing', controller.home.doNothing);

    // 登录
    router.post('/login', controller.home.login);
    // 退出
    router.get('/logout', controller.home.logout);
    router.get('/resetPassword',controller.home.resetPassword);

    // 接口调用
    router.get('/invokeEntityInfo', controller.restful.toPage);
    router.post('/invokeInfo/infos', controller.restful.infos);
    router.post('/invokeInfo/invokes', controller.restful.invokes);
    router.post('/invokeInfo/test', controller.restful.test);
    router.post('/invokeInfo/save', controller.restful.save);
    router.delete('/invokeInfo/delete/:id', controller.restful.delete);
    router.post('/invoke/:invokeName', controller.restful.invoke);
    router.get('/invokeInfo/checkUnique/:invokeName', controller.restful.checkUnique);
    router.get('/invokeInfo/groupName', controller.restful.groupName);


    // 对应角色的完整菜单树
    router.get('/menu/menuTree', controller.menu.menuTree);


    //通用实体增删改查
    router.get('/entity/columns/:entityId',controller.entity.columns);
    router.get('/entity/entityOperations/:entityId',controller.entity.entityOperations);
    router.get('/entity/column/:id',controller.entity.column);
    router.get('/entity/entitys',controller.entity.entitys);
    router.get('/entity/tableNames',controller.entity.tableNames);
    router.get('/entity/originalColumns',controller.entity.originalColumns);
    router.post('/entity/saveConfig/:tableName/:idField',controller.entity.saveConfig);
    router.get('/entity/deleteConfig/:tableName/:idField/:id',controller.entity.deleteConfig);
    router.get('/entity/monyToMonys',controller.entity.monyToMonys);
    router.post('/entity/query/:entityId',controller.entity.query);
    router.get('/entity/topParentRecord/:entityId',controller.entity.topParentRecord);
    router.post('/entity/queryCandidate/:columnId',controller.entity.queryCandidate);
    router.get('/entity/checkUnique/:entityId/:checkField/:value',controller.entity.checkUnique);
    router.post('/entity/saveEntity/:entityId',controller.entity.saveEntity);
    router.get('/entity/deleteEntity/:entityId/:id',controller.entity.deleteEntity);
    router.get('/entity/queryRelevant/:entityId/:monyToMonyId/:recordId',controller.entity.queryRelevant);
    router.post('/entity/saveRelevant/:entityId/:monyToMonyId',controller.entity.saveRelevant);

    //字典配置
    router.get('/dictionary/allDictionary',controller.dictionary.allDictionary);
    router.get('/dictionary/dictionary/:dicGroupId',controller.dictionary.dictionary);
    router.post('/dictionary/saveDic',controller.dictionary.saveDic);
    router.post('/dictionary/saveDicField',controller.dictionary.saveDicField);
    router.get('/dictionary/deleteGroup/:groupId',controller.dictionary.deleteGroup);
    router.get('/dictionary/deleteDictionary/:id',controller.dictionary.deleteDictionary);



};
