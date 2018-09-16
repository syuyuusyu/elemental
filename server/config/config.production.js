'use strict';

module.exports = appInfo => {

    const config = {};

    config.view = {
        defaultViewEngine: 'nunjucks',
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1517886399328_119';

    // add your config here
    config.middleware = [
        'author',
    ];

    config.author={
        ignore:/^\/invoke/,
    };



    config.multipart = {
        //fileExtensions: ['.jar'],
        whitelist:fileName=>true,
        fileSize: '5120mb',
    };


    config.mysql = {
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '1234',
            // 数据库名
            database: 'elemental',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };



    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: '',
            db: 0,
        },
    };

    config.security = {
        csrf: {
            ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
            enable: false
        },
        domainWhiteList: [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
        ]
    };

    config.cors = {
        allowMethods: 'GET,PUT,POST,DELETE,OPTIONS',
        credentials: true
    };

    config.self={

    };

    config.discription='local';

    return config;

};
