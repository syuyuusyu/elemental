const Service = require('egg').Service;


class InitalDataBase extends Service {

    async inital() {
        await this.invokeInfo();
        await this.entity();
        await this.entityColumn();
        await this.entityDictionary();
        await this.monyToMony();
        await this.entityOperation();

    }

    async invokeInfo() {
        const databaseName = this.app.config.mysql.client.database;
        let [{total}] = await this.app.mysql.query(`select count(1) total
          from information_schema.COLUMNS where TABLE_SCHEMA='${databaseName}' and table_name='invoke_info'`);
        if (total === 0) {
            let sql = `
          CREATE TABLE invoke_info (
            id int(4) NOT NULL AUTO_INCREMENT,
            name varchar(100) DEFAULT NULL,
            descrption varchar(200) DEFAULT NULL,
            method varchar(10) DEFAULT NULL,
            url varchar(200) DEFAULT NULL,
            head text,
            body text,
            parseFun text,
            orginalResult longtext,
            next varchar(50) DEFAULT NULL,
            invokeType char(1) DEFAULT NULL COMMENT '1:接口调用配置,2:可调用接口',
            groupName varchar(50) DEFAULT NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
          `
            await this.app.mysql.query(sql);
        }

    }

    async entity() {
        const databaseName = this.app.config.mysql.client.database;
        let [{total}] = await this.app.mysql.query(`select count(1) total
          from information_schema.COLUMNS where TABLE_SCHEMA='${databaseName}' and table_name='entity'`)
        if (total === 0) {
            let sql = `
            CREATE TABLE \`entity\`  (
              \`id\` int(4) NOT NULL AUTO_INCREMENT,
              \`tableName\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
              \`entityCode\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`entityName\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`nameField\` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`queryField\` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`parentEntityId\` int(4) NULL DEFAULT NULL,
              \`idField\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
              \`pidField\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`deleteFlagField\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`editAble\` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否可编辑:0:否;1:是',
              PRIMARY KEY (\`id\`) USING BTREE
            ) ENGINE = InnoDB AUTO_INCREMENT = 1029 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
          `
            await this.app.mysql.query(sql);
        }
    }

    async entityColumn() {
        const databaseName = this.app.config.mysql.client.database;
        let [{total}] = await this.app.mysql.query(`select count(1) total
          from information_schema.COLUMNS where TABLE_SCHEMA='${databaseName}' and table_name='invoke_info'`)
        if (total === 0) {
            let sql = `
                CREATE TABLE \`entity_column\`  (
              \`id\` int(4) NOT NULL AUTO_INCREMENT,
              \`entityId\` int(4) NOT NULL,
              \`tableName\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`columnIndex\` int(4) NOT NULL,
              \`entityCode\` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`columnType\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字段类型',
              \`columnName\` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字段名称',
              \`text\` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字段中文名称',
              \`isUnique\` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '是否唯一:1:是;0:否',
              \`required\` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
              \`width\` int(4) NULL DEFAULT NULL COMMENT '页面渲染表单时对应的宽度',
              \`render\` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
              \`hidden\` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '页面渲染是是否显示此列 0:显示,1:隐藏',
              \`dicGroupId\` int(4) NULL DEFAULT NULL,
              \`foreignKeyId\` int(4) NULL DEFAULT NULL,
              \`foreignKeyNameId\` int(4) NULL DEFAULT NULL,
              \`comme\` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              PRIMARY KEY (\`id\`) USING BTREE,
              INDEX \`entityId\`(\`entityId\`) USING BTREE,
              INDEX \`column_entityName\`(\`tableName\`) USING BTREE
            ) ENGINE = InnoDB AUTO_INCREMENT = 963 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
          `;
            await this.app.mysql.query(sql);
        }
    }

    async monyToMony() {
        const databaseName = this.app.config.mysql.client.database;
        let [{total}] = await this.app.mysql.query(`select count(1) total
          from information_schema.COLUMNS where TABLE_SCHEMA='${databaseName}' and table_name='invoke_info'`)
        if (total === 0) {
            let sql = `
             CREATE TABLE \`entity_mony_to_mony\`  (
              \`id\` int(4) NOT NULL AUTO_INCREMENT,
              \`name\` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`firstTable\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表一的表名',
              \`secondTable\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表二表名',
              \`firstIdField\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表一ID字段',
              \`secondIdField\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表二ID字段',
              \`relationTable\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '关联表名称',
              PRIMARY KEY (\`id\`) USING BTREE
            ) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
          `;
            await this.app.mysql.query(sql);
        }
    }

    async entityDictionary() {
        const databaseName = this.app.config.mysql.client.database;
        let [{total}] = await this.app.mysql.query(`select count(1) total
          from information_schema.COLUMNS where TABLE_SCHEMA='${databaseName}' and table_name='invoke_info'`)
        if (total === 0) {
            let sql = `
            CREATE TABLE \`entity_dictionary\`  (
              \`id\` int(4) NOT NULL AUTO_INCREMENT,
              \`groupId\` int(4) NOT NULL,
              \`groupName\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`text\` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
              \`value\` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
              PRIMARY KEY (\`id\`) USING BTREE
            ) ENGINE = InnoDB AUTO_INCREMENT = 123 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
          `;
            await this.app.mysql.query(sql);
        }
    }

    async entityOperation() {
        const databaseName = this.app.config.mysql.client.database;
        let [{total}] = await this.app.mysql.query(`select count(1) total
          from information_schema.COLUMNS where TABLE_SCHEMA='${databaseName}' and table_name='invoke_info'`)
        if (total === 0) {
            let sql = `
            CREATE TABLE \`entity_operation\`  (
              \`id\` int(4) NOT NULL AUTO_INCREMENT,
              \`entityId\` int(4) NULL DEFAULT NULL,
              \`name\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`icon\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`type\` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '1:关联关系;2:自定义;3:执行方法',
              \`pagePath\` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`pageClass\` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
              \`monyToMonyId\` int(4) NULL DEFAULT NULL,
              \`function\` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
              PRIMARY KEY (\`id\`) USING BTREE
            ) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
          `;
            await this.app.mysql.query(sql);
        }
    }

}

module.exports = InitalDataBase;
