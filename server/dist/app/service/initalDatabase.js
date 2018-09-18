'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var InitalDataBase = function (_Service) {
  _inherits(InitalDataBase, _Service);

  function InitalDataBase() {
    _classCallCheck(this, InitalDataBase);

    return _possibleConstructorReturn(this, (InitalDataBase.__proto__ || Object.getPrototypeOf(InitalDataBase)).apply(this, arguments));
  }

  _createClass(InitalDataBase, [{
    key: 'inital',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.invokeInfo();

              case 2:
                _context.next = 4;
                return this.entity();

              case 4:
                _context.next = 6;
                return this.entityColumn();

              case 6:
                _context.next = 8;
                return this.entityDictionary();

              case 8:
                _context.next = 10;
                return this.monyToMony();

              case 10:
                _context.next = 12;
                return this.entityOperation();

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function inital() {
        return _ref.apply(this, arguments);
      }

      return inital;
    }()
  }, {
    key: 'invokeInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var databaseName, _ref3, _ref4, total, sql;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                databaseName = this.app.config.mysql.client.database;
                _context2.next = 3;
                return this.app.mysql.query('select count(1) total\n          from information_schema.COLUMNS where TABLE_SCHEMA=\'' + databaseName + '\' and table_name=\'invoke_info\'');

              case 3:
                _ref3 = _context2.sent;
                _ref4 = _slicedToArray(_ref3, 1);
                total = _ref4[0].total;

                if (!(total === 0)) {
                  _context2.next = 10;
                  break;
                }

                sql = '\n          CREATE TABLE invoke_info (\n            id int(4) NOT NULL AUTO_INCREMENT,\n            name varchar(100) DEFAULT NULL,\n            descrption varchar(200) DEFAULT NULL,\n            method varchar(10) DEFAULT NULL,\n            url varchar(200) DEFAULT NULL,\n            head text,\n            body text,\n            parseFun text,\n            orginalResult longtext,\n            next varchar(50) DEFAULT NULL,\n            invokeType char(1) DEFAULT NULL COMMENT \'1:\u63A5\u53E3\u8C03\u7528\u914D\u7F6E,2:\u53EF\u8C03\u7528\u63A5\u53E3\',\n            groupName varchar(50) DEFAULT NULL,\n            PRIMARY KEY (id)\n          ) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;\n          ';
                _context2.next = 10;
                return this.app.mysql.query(sql);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function invokeInfo() {
        return _ref2.apply(this, arguments);
      }

      return invokeInfo;
    }()
  }, {
    key: 'entity',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var databaseName, _ref6, _ref7, total, sql;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                databaseName = this.app.config.mysql.client.database;
                _context3.next = 3;
                return this.app.mysql.query('select count(1) total\n          from information_schema.COLUMNS where TABLE_SCHEMA=\'' + databaseName + '\' and table_name=\'entity\'');

              case 3:
                _ref6 = _context3.sent;
                _ref7 = _slicedToArray(_ref6, 1);
                total = _ref7[0].total;

                if (!(total === 0)) {
                  _context3.next = 10;
                  break;
                }

                sql = '\n            CREATE TABLE `entity`  (\n              `id` int(4) NOT NULL AUTO_INCREMENT,\n              `tableName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n              `entityCode` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `entityName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `nameField` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `queryField` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `parentEntityId` int(4) NULL DEFAULT NULL,\n              `idField` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n              `pidField` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `deleteFlagField` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `editAble` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT \'\u662F\u5426\u53EF\u7F16\u8F91:0:\u5426;1:\u662F\',\n              PRIMARY KEY (`id`) USING BTREE\n            ) ENGINE = InnoDB AUTO_INCREMENT = 1029 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;\n          ';
                _context3.next = 10;
                return this.app.mysql.query(sql);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function entity() {
        return _ref5.apply(this, arguments);
      }

      return entity;
    }()
  }, {
    key: 'entityColumn',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var databaseName, _ref9, _ref10, total, sql;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                databaseName = this.app.config.mysql.client.database;
                _context4.next = 3;
                return this.app.mysql.query('select count(1) total\n          from information_schema.COLUMNS where TABLE_SCHEMA=\'' + databaseName + '\' and table_name=\'invoke_info\'');

              case 3:
                _ref9 = _context4.sent;
                _ref10 = _slicedToArray(_ref9, 1);
                total = _ref10[0].total;

                if (!(total === 0)) {
                  _context4.next = 10;
                  break;
                }

                sql = '\n                CREATE TABLE `entity_column`  (\n              `id` int(4) NOT NULL AUTO_INCREMENT,\n              `entityId` int(4) NOT NULL,\n              `tableName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `columnIndex` int(4) NOT NULL,\n              `entityCode` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `columnType` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT \'\u5B57\u6BB5\u7C7B\u578B\',\n              `columnName` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT \'\u5B57\u6BB5\u540D\u79F0\',\n              `text` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT \'\u5B57\u6BB5\u4E2D\u6587\u540D\u79F0\',\n              `isUnique` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT \'0\' COMMENT \'\u662F\u5426\u552F\u4E00:1:\u662F;0:\u5426\',\n              `required` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT \'0\',\n              `width` int(4) NULL DEFAULT NULL COMMENT \'\u9875\u9762\u6E32\u67D3\u8868\u5355\u65F6\u5BF9\u5E94\u7684\u5BBD\u5EA6\',\n              `render` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,\n              `hidden` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT \'0\' COMMENT \'\u9875\u9762\u6E32\u67D3\u662F\u662F\u5426\u663E\u793A\u6B64\u5217 0:\u663E\u793A,1:\u9690\u85CF\',\n              `dicGroupId` int(4) NULL DEFAULT NULL,\n              `foreignKeyId` int(4) NULL DEFAULT NULL,\n              `foreignKeyNameId` int(4) NULL DEFAULT NULL,\n              `comme` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              PRIMARY KEY (`id`) USING BTREE,\n              INDEX `entityId`(`entityId`) USING BTREE,\n              INDEX `column_entityName`(`tableName`) USING BTREE\n            ) ENGINE = InnoDB AUTO_INCREMENT = 963 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;\n          ';
                _context4.next = 10;
                return this.app.mysql.query(sql);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function entityColumn() {
        return _ref8.apply(this, arguments);
      }

      return entityColumn;
    }()
  }, {
    key: 'monyToMony',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var databaseName, _ref12, _ref13, total, sql;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                databaseName = this.app.config.mysql.client.database;
                _context5.next = 3;
                return this.app.mysql.query('select count(1) total\n          from information_schema.COLUMNS where TABLE_SCHEMA=\'' + databaseName + '\' and table_name=\'invoke_info\'');

              case 3:
                _ref12 = _context5.sent;
                _ref13 = _slicedToArray(_ref12, 1);
                total = _ref13[0].total;

                if (!(total === 0)) {
                  _context5.next = 10;
                  break;
                }

                sql = '\n             CREATE TABLE `entity_mony_to_mony`  (\n              `id` int(4) NOT NULL AUTO_INCREMENT,\n              `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `firstTable` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT \'\u8868\u4E00\u7684\u8868\u540D\',\n              `secondTable` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT \'\u8868\u4E8C\u8868\u540D\',\n              `firstIdField` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT \'\u8868\u4E00ID\u5B57\u6BB5\',\n              `secondIdField` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT \'\u8868\u4E8CID\u5B57\u6BB5\',\n              `relationTable` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT \'\u5173\u8054\u8868\u540D\u79F0\',\n              PRIMARY KEY (`id`) USING BTREE\n            ) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;\n          ';
                _context5.next = 10;
                return this.app.mysql.query(sql);

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function monyToMony() {
        return _ref11.apply(this, arguments);
      }

      return monyToMony;
    }()
  }, {
    key: 'entityDictionary',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var databaseName, _ref15, _ref16, total, sql;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                databaseName = this.app.config.mysql.client.database;
                _context6.next = 3;
                return this.app.mysql.query('select count(1) total\n          from information_schema.COLUMNS where TABLE_SCHEMA=\'' + databaseName + '\' and table_name=\'invoke_info\'');

              case 3:
                _ref15 = _context6.sent;
                _ref16 = _slicedToArray(_ref15, 1);
                total = _ref16[0].total;

                if (!(total === 0)) {
                  _context6.next = 10;
                  break;
                }

                sql = '\n            CREATE TABLE `entity_dictionary`  (\n              `id` int(4) NOT NULL AUTO_INCREMENT,\n              `groupId` int(4) NOT NULL,\n              `groupName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `text` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n              `value` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n              PRIMARY KEY (`id`) USING BTREE\n            ) ENGINE = InnoDB AUTO_INCREMENT = 123 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;\n          ';
                _context6.next = 10;
                return this.app.mysql.query(sql);

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function entityDictionary() {
        return _ref14.apply(this, arguments);
      }

      return entityDictionary;
    }()
  }, {
    key: 'entityOperation',
    value: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var databaseName, _ref18, _ref19, total, sql;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                databaseName = this.app.config.mysql.client.database;
                _context7.next = 3;
                return this.app.mysql.query('select count(1) total\n          from information_schema.COLUMNS where TABLE_SCHEMA=\'' + databaseName + '\' and table_name=\'invoke_info\'');

              case 3:
                _ref18 = _context7.sent;
                _ref19 = _slicedToArray(_ref18, 1);
                total = _ref19[0].total;

                if (!(total === 0)) {
                  _context7.next = 10;
                  break;
                }

                sql = '\n            CREATE TABLE `entity_operation`  (\n              `id` int(4) NOT NULL AUTO_INCREMENT,\n              `entityId` int(4) NULL DEFAULT NULL,\n              `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `icon` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT \'1:\u5173\u8054\u5173\u7CFB;2:\u81EA\u5B9A\u4E49;3:\u6267\u884C\u65B9\u6CD5\',\n              `pagePath` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `pageClass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,\n              `monyToMonyId` int(4) NULL DEFAULT NULL,\n              `function` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,\n              PRIMARY KEY (`id`) USING BTREE\n            ) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;\n          ';
                _context7.next = 10;
                return this.app.mysql.query(sql);

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function entityOperation() {
        return _ref17.apply(this, arguments);
      }

      return entityOperation;
    }()
  }]);

  return InitalDataBase;
}(Service);

module.exports = InitalDataBase;
//# sourceMappingURL=initalDatabase.js.map