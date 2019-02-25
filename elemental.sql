/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 100310
 Source Host           : 127.0.0.1
 Source Database       : elemental

 Target Server Type    : MySQL
 Target Server Version : 100310
 File Encoding         : utf-8

 Date: 02/14/2019 10:37:36 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `entity`
-- ----------------------------
DROP TABLE IF EXISTS `entity`;
CREATE TABLE `entity` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `tableName` varchar(20) NOT NULL,
  `entityCode` varchar(20) DEFAULT NULL,
  `entityName` varchar(20) DEFAULT NULL,
  `nameField` varchar(40) DEFAULT NULL,
  `queryField` varchar(40) DEFAULT NULL,
  `parentEntityId` int(4) DEFAULT NULL,
  `idField` varchar(20) NOT NULL,
  `pidField` varchar(20) DEFAULT NULL,
  `deleteFlagField` varchar(20) DEFAULT NULL,
  `editAble` char(1) DEFAULT NULL COMMENT '是否可编辑:0:否;1:是',
  `tableLength` int(4) DEFAULT NULL,
  `orderField` varchar(200) DEFAULT NULL,
  `mmQueryField` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1031 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `entity`
-- ----------------------------
BEGIN;
INSERT INTO `entity` VALUES ('1000', 't_user', 'user', '用户', 'name', '27', null, 'id', null, '', '1', null, null, '1001'), ('1001', 't_role', 'role', '角色', 'name', '117', null, 'id', null, '', '1', null, null, null), ('1002', 't_menu', 'menu', '菜单', 'text', '303', '1002', 'id', 'parent_id', '', '1', null, null, null), ('1029', 't_file_tree', 'file_tree', '文件目录', 'text', '966', '1029', 'file_tree_id', 'parent_id', null, '1', null, null, null), ('1030', 't_file', 'file', '文件', 'name', '970,972,974', '1029', 'file_id', 'file_tree_id', null, '1', null, null, null);
COMMIT;


-- ----------------------------
--  Table structure for `entity_column`
-- ----------------------------
DROP TABLE IF EXISTS `entity_column`;
CREATE TABLE `entity_column` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `entityId` int(4) NOT NULL,
  `tableName` varchar(20) DEFAULT NULL,
  `columnIndex` int(4) NOT NULL,
  `entityCode` varchar(40) DEFAULT NULL,
  `columnType` varchar(20) DEFAULT NULL COMMENT '字段类型',
  `columnName` varchar(40) DEFAULT NULL COMMENT '字段名称',
  `text` varchar(50) DEFAULT NULL COMMENT '字段中文名称',
  `isUnique` char(1) DEFAULT '0' COMMENT '是否唯一:1:是;0:否',
  `required` char(1) DEFAULT '0',
  `width` int(4) DEFAULT NULL COMMENT '页面渲染表单时对应的宽度',
  `render` text,
  `hidden` char(1) DEFAULT '0' COMMENT '页面渲染是是否显示此列 0:显示,1:隐藏',
  `dicGroupId` int(4) DEFAULT NULL,
  `foreignKeyId` int(4) DEFAULT NULL,
  `foreignKeyNameId` int(4) DEFAULT NULL,
  `comme` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entityId` (`entityId`),
  KEY `column_entityName` (`tableName`)
) ENGINE=InnoDB AUTO_INCREMENT=963 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `entity_column`
-- ----------------------------
BEGIN;
INSERT INTO `entity_column` VALUES ('6', '1000', 't_user', '1', null, 'int', 'id', 'ID', '1', null, null, null, '1', null, null, null, ''), ('9', '1000', 't_user', '2', null, 'int', 'entityId', '实体ID', '0', null, null, null, '1', null, null, null, ''), ('21', '1000', 't_user', '6', null, 'varchar', 'user_name', '登录账号', '1', null, '100', null, '0', null, null, null, ''), ('24', '1000', 't_user', '7', null, 'varchar', 'passwd', '密码', '0', null, null, null, '1', null, null, null, ''), ('27', '1000', 't_user', '8', null, 'varchar', 'name', '姓名', null, null, null, null, '0', null, null, null, ''), ('30', '1000', 't_user', '9', null, 'varchar', 'ID_number', '身份证号码', null, null, null, null, '0', null, null, null, '身份证编号'), ('33', '1000', 't_user', '10', null, 'varchar', 'phone', '电话号码', null, null, null, null, '0', null, null, null, ''), ('36', '1000', 't_user', '11', null, 'varchar', 'email', 'Email', null, null, null, null, null, null, null, null, ''), ('45', '1000', 't_user', '14', null, 'varchar', 'salt', null, null, null, null, null, '1', null, null, null, '加密salt'), ('102', '1001', 't_role', '1', null, 'int', 'id', 'ID', null, null, null, null, '1', null, null, null, ''), ('105', '1001', 't_role', '2', null, 'int', 'entityId', null, null, null, null, null, '1', null, null, null, ''), ('114', '1001', 't_role', '5', null, 'varchar', 'code', '编码', '1', null, null, null, '0', null, null, null, ''), ('117', '1001', 't_role', '6', null, 'varchar', 'name', '角色名称', null, null, null, null, '0', null, null, null, ''), ('120', '1001', 't_role', '7', null, 'varchar', 'description', '描述', null, null, null, null, '0', null, null, null, ''), ('285', '1002', 't_menu', '1', null, 'int', 'id', 'ID', null, null, null, null, '1', null, null, null, ''), ('288', '1002', 't_menu', '2', null, 'int', 'parent_id', '父ID', null, null, null, null, '1', null, null, null, ''), ('291', '1002', 't_menu', '3', null, 'int', 'entityId', '对应实体', null, null, null, null, '1', null, null, null, ''), ('294', '1002', 't_menu', '4', null, 'int', 'hierachy', '层级', null, null, null, null, '1', null, null, null, ''), ('297', '1002', 't_menu', '5', null, 'varchar', 'name', '名称', '0', '1', null, null, '0', null, null, null, ''), ('300', '1002', 't_menu', '6', null, 'varchar', 'icon', '图标', '0', null, '80', 'function render(text){\n        const React=this.React;\n        const Icon=this.antd.Icon;	\n        return React.createElement(Icon,{type:text});\n}', '0', null, null, null, ''), ('303', '1002', 't_menu', '7', null, 'varchar', 'text', '菜单名称', null, '1', null, null, '0', null, null, null, ''), ('306', '1002', 't_menu', '8', null, 'varchar', 'path', '跳转路径', '0', '0', null, null, '0', null, null, null, ''), ('309', '1002', 't_menu', '9', null, 'char', 'is_leaf', '是否叶子节点', null, '0', null, null, '0', '6', null, null, ''), ('312', '1002', 't_menu', '10', null, 'varchar', 'page_path', '类所在目录', null, null, null, null, '0', null, null, null, ''), ('315', '1002', 't_menu', '11', null, 'varchar', 'page_class', '页面类名', null, '0', null, null, '0', null, null, null, ''), ('318', '1002', 't_menu', '12', null, 'varchar', 'load_method', '加载方法', null, '0', null, null, '0', null, null, null, ''), ('339', '1002', 't_menu', '19', null, 'int', 'menu_order', '排序', null, '1', null, null, '0', null, null, null, '菜单排序字段'), ('962', '1002', 't_menu', '20', '', 'text', 'defaultQueryObj', '默认查询条件', '0', '0', null, null, '0', null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for `entity_dictionary`
-- ----------------------------
DROP TABLE IF EXISTS `entity_dictionary`;
CREATE TABLE `entity_dictionary` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `groupId` int(4) NOT NULL,
  `groupName` varchar(20) DEFAULT NULL,
  `text` varchar(40) NOT NULL,
  `value` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `entity_dictionary`
-- ----------------------------
BEGIN;
INSERT INTO `entity_dictionary` VALUES ('1', '1', '表多对多关系', '用户角色关系', 't_user_role'), ('2', '1', '表多对多关系', '角色菜单关系', 't_role_menu'), ('4', '2', '表实体类型', '用户表', '1000'), ('5', '2', '表实体类型', '角色表', '1001'), ('8', '2', '表实体类型', '菜单表', '1002'), ('59', '3', 'Http请求类型', 'post', 'post'), ('62', '3', 'Http请求类型', 'get', 'get'), ('65', '3', 'Http请求类型', 'put', 'put'), ('68', '3', 'Http请求类型', 'delete', 'delete'), ('119', '6', '是否叶子节点', '是', '1'), ('122', '6', '是否叶子节点', '否', '0');
COMMIT;

-- ----------------------------
--  Table structure for `entity_mony_to_mony`
-- ----------------------------
DROP TABLE IF EXISTS `entity_mony_to_mony`;
CREATE TABLE `entity_mony_to_mony` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `firstTable` varchar(20) NOT NULL COMMENT '表一的表名',
  `secondTable` varchar(20) NOT NULL COMMENT '表二表名',
  `firstIdField` varchar(20) NOT NULL COMMENT '表一ID字段',
  `secondIdField` varchar(20) NOT NULL COMMENT '表二ID字段',
  `relationTable` varchar(20) NOT NULL COMMENT '关联表名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `entity_mony_to_mony`
-- ----------------------------
BEGIN;
INSERT INTO `entity_mony_to_mony` VALUES ('11', '用户角色', 't_role', 't_user', 'role_id', 'user_id', 't_user_role'), ('12', '角色菜单', 't_role', 't_menu', 'role_id', 'menu_id', 't_role_menu');
COMMIT;

-- ----------------------------
--  Table structure for `entity_operation`
-- ----------------------------
DROP TABLE IF EXISTS `entity_operation`;
-- ----------------------------
--  Table structure for `entity_operation`
-- ----------------------------
DROP TABLE IF EXISTS `entity_operation`;
CREATE TABLE `entity_operation` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `entityId` int(4) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `icon` varchar(20) DEFAULT NULL,
  `type` char(1) DEFAULT NULL COMMENT '1:关联关系;2:自定义;3:执行方法',
  `location` varchar(1) DEFAULT NULL,
  `pagePath` varchar(100) DEFAULT 'NULL',
  `pageClass` varchar(255) DEFAULT NULL,
  `monyToMonyId` int(4) DEFAULT NULL,
  `function` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `entity_operation`
-- ----------------------------
BEGIN;
INSERT INTO `entity_operation` VALUES ('2', '1000', '重置密码', null, '3', null, '', '', null, 'async function sdsd(record){\n 	const userName = record.user_name;\n    let json = await this.get(`${this.baseUrl}/resetPassword`);\n    if (json.success) {\n      this.notification.info({\n        message: `用户${userName}的密码被重置为123456`,\n      })\n    } else {\n      this.notification.error({\n        message: \'后台错误，请联系管理员\',\n      })\n    }\n}\n'), ('17', '1000', '关联角色', null, '1', null, null, null, '11', null), ('18', '1001', '菜单权限', null, '1', null, null, null, '12', null);
COMMIT;


-- ----------------------------
--  Table structure for `invoke_info`
-- ----------------------------
DROP TABLE IF EXISTS `invoke_info`;
CREATE TABLE `invoke_info` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `descrption` varchar(200) DEFAULT NULL,
  `method` varchar(10) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `head` text,
  `body` text,
  `parseFun` text,
  `orginalResult` longtext,
  `next` varchar(50) DEFAULT NULL,
  `invokeType` char(1) DEFAULT NULL COMMENT '1:接口调用配置,2:可调用接口',
  `groupName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `t_menu`
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `parent_id` int(4) DEFAULT NULL,
  `entityId` int(4) DEFAULT '1004',
  `hierachy` int(4) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `icon` varchar(20) DEFAULT NULL,
  `text` varchar(50) DEFAULT NULL,
  `path` varchar(50) DEFAULT NULL,
  `is_leaf` char(1) DEFAULT NULL,
  `page_path` varchar(30) DEFAULT NULL,
  `page_class` varchar(20) DEFAULT NULL,
  `load_method` varchar(30) DEFAULT NULL,
  `defaultQueryObj` text,
  `function` text,
  `menu_order` int(5) DEFAULT '1000' COMMENT '菜单排序字段',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `t_menu`
-- ----------------------------
BEGIN;
INSERT INTO `t_menu` VALUES ('1', '-1', '1004', '0', 'root', null, 'root', null, '0', null, null, null, null, null, '1000'), ('2', '1', '1004', '1', 'system', 'setting', '系统设置', null, '0', null, null, null, null, null, '1'), ('3', '2', '1004', '2', 'entity', null, '实体配置', '/entity', '1', 'entity', 'EntityTable', null, null, null, '5'), ('4', '2', '1004', '2', 'menu', null, '菜单管理', '/commonEntity/1002', '1', 'components', 'CommonLayOut', null, '', null, '1'), ('5', '2', '1004', '2', 'user', null, '用户管理', '/commonEntity/1000', '1', 'components', 'CommonLayOut', null, '', null, '2'), ('6', '2', '1004', '2', 'role', null, '角色管理', '/commonEntity/1001', '1', 'components', 'CommonLayOut', null, null, null, '3'), ('7', '2', '1004', '2', 'invoke', null, '接口调用配置', '/invoke', '1', 'invoke', 'InvkeGrid', null, null, null, '4');
COMMIT;

-- ----------------------------
--  Table structure for `t_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `entityId` int(4) DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `t_role`
-- ----------------------------
BEGIN;
INSERT INTO `t_role` VALUES ('1', '1001', 'manger', '管理员', '最高权限管理角色'), ('2', '1001', 'unique_interfaceInvoke', '接口调用配置角色', '专门负责接口调用配置');
COMMIT;

-- ----------------------------
--  Table structure for `t_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `role_id` int(4) NOT NULL,
  `menu_id` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3582 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `t_role_menu`
-- ----------------------------
BEGIN;
INSERT INTO `t_role_menu` VALUES ('3575', '1', '2'), ('3576', '1', '3'), ('3577', '1', '4'), ('3578', '1', '5'), ('3579', '1', '6'), ('3581', '2', '7');
COMMIT;

-- ----------------------------
--  Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `entityId` int(4) DEFAULT '1000',
  `user_name` varchar(30) NOT NULL,
  `passwd` varchar(150) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `ID_number` varchar(50) DEFAULT NULL COMMENT '身份证编号',
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `t_user`
-- ----------------------------
BEGIN;
INSERT INTO `t_user` VALUES ('1', '1000', 'admin', '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9', '管理员', '111111111111111112', '1234', 'syu@qq.com');
COMMIT;

-- ----------------------------
--  Table structure for `t_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `user_id` int(4) DEFAULT NULL,
  `role_id` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `t_user_role`
-- ----------------------------
BEGIN;
INSERT INTO `t_user_role` VALUES ('3', '1', '2'), ('4', '1', '1');
COMMIT;

-- ----------------------------
--  Procedure structure for `sdsd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `sdsd`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sdsd`(table_name varchar(50),id varchar(8),idField varchar(20),pidField varchar(20))
BEGIN
	DECLARE result varchar(4000);
	DECLARE v_id   varchar(10);
	declare done int default false;
	set @tempsql=CONCAT_ws(" ","select",idFiled,"from",table_name);
	prepare stmt from @tempsql;


end
 ;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
