'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

var RestfulController = function (_Controller) {
    _inherits(RestfulController, _Controller);

    function RestfulController() {
        _classCallCheck(this, RestfulController);

        return _possibleConstructorReturn(this, (RestfulController.__proto__ || Object.getPrototypeOf(RestfulController)).apply(this, arguments));
    }

    _createClass(RestfulController, [{
        key: 'toPage',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.ctx.render('restful/invokeEntityInfo.tpl');

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function toPage() {
                return _ref.apply(this, arguments);
            }

            return toPage;
        }()
    }, {
        key: 'infos',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _ctx$request$body, start, limit, invokeName, groupName, where, wherecount, result, _ref3, _ref4, total, _ref5, _ref6, content;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _ctx$request$body = this.ctx.request.body, start = _ctx$request$body.start, limit = _ctx$request$body.limit, invokeName = _ctx$request$body.invokeName, groupName = _ctx$request$body.groupName;
                                where = invokeName && !/\s/.test(invokeName) ? { name: invokeName } : {};

                                where = groupName && !/\s/.test(groupName) ? _extends({}, where, { groupName: groupName }) : where;
                                wherecount = invokeName && !/\s/.test(invokeName) ? 'where name=\'' + invokeName + '\'' : 'where 1=1';

                                wherecount = wherecount + (groupName && !/\s/.test(groupName) ? ' and groupname=\'' + groupName + '\'' : '');
                                result = {};
                                _context2.next = 8;
                                return this.app.mysql.query('select count(1) total from invoke_info ' + wherecount, []);

                            case 8:
                                _ref3 = _context2.sent;
                                _ref4 = _slicedToArray(_ref3, 1);
                                total = _ref4[0].total;
                                _context2.next = 13;
                                return this.app.mysql.select('invoke_info', {
                                    limit: limit,
                                    offset: start,
                                    where: where
                                });

                            case 13:
                                _ref5 = _context2.sent;
                                _ref6 = _toArray(_ref5);
                                content = _ref6.slice(0);

                                result.totalElements = total;
                                result.content = content;
                                this.ctx.body = result;

                            case 19:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function infos() {
                return _ref2.apply(this, arguments);
            }

            return infos;
        }()
    }, {
        key: 'save',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var entity, result, updateSuccess;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                entity = this.ctx.request.body;

                                if (!entity.next) entity.next = null;
                                result = {};

                                if (!entity.id) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 6;
                                return this.app.mysql.update('invoke_info', entity);

                            case 6:
                                result = _context3.sent;
                                _context3.next = 12;
                                break;

                            case 9:
                                _context3.next = 11;
                                return this.app.mysql.insert('invoke_info', entity);

                            case 11:
                                result = _context3.sent;

                            case 12:
                                // 判断更新成功
                                updateSuccess = result.affectedRows === 1;

                                this.ctx.body = { success: updateSuccess };
                                this.ctx.setvice.restful.reflashEntity();

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function save() {
                return _ref7.apply(this, arguments);
            }

            return save;
        }()
    }, {
        key: 'invokes',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.app.mysql.select('invoke_info', {});

                            case 2:
                                this.ctx.body = _context4.sent;

                            case 3:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function invokes() {
                return _ref8.apply(this, arguments);
            }

            return invokes;
        }()
    }, {
        key: 'test',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var entity;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                entity = this.ctx.request.body;
                                _context5.next = 3;
                                return this.service.restful.invoke(entity, entity.queryMap);

                            case 3:
                                this.ctx.body = _context5.sent;

                            case 4:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function test() {
                return _ref9.apply(this, arguments);
            }

            return test;
        }()
    }, {
        key: 'invoke',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _this2 = this;

                var result, queryMap, invokeEntitys, _invokeEntitys$filter, _invokeEntitys$filter2, entity, nextEntitys, promises, p, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, cur, invokeName, fn;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                result = [];
                                queryMap = this.ctx.request.body;
                                invokeEntitys = this.app.invokeEntitys;
                                _invokeEntitys$filter = invokeEntitys.filter(function (d) {
                                    return d.name === _this2.ctx.params.invokeName;
                                }), _invokeEntitys$filter2 = _slicedToArray(_invokeEntitys$filter, 1), entity = _invokeEntitys$filter2[0];
                                //await this.app.mysql.select('invoke_info',{where: {  name: this.ctx.params.invokeName}});

                                nextEntitys = invokeEntitys.filter(function (d) {
                                    var flag = false;
                                    entity.next.split(',').forEach(function (i) {
                                        if (i === d.id + '') {
                                            flag = true;
                                        }
                                    });
                                    return flag;
                                });
                                promises = nextEntitys.map(function (entity) {
                                    return _this2.service.restful.invoke(entity, queryMap);
                                });
                                _context6.next = 8;
                                return Promise.all(promises);

                            case 8:
                                p = _context6.sent;
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context6.prev = 12;
                                _iterator = p[Symbol.iterator]();

                            case 14:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context6.next = 29;
                                    break;
                                }

                                r = _step.value;
                                cur = {};
                                _context6.t0 = regeneratorRuntime.keys(r);

                            case 18:
                                if ((_context6.t1 = _context6.t0()).done) {
                                    _context6.next = 25;
                                    break;
                                }

                                invokeName = _context6.t1.value;

                                if (!(invokeName === 'msg' || invokeName === 'success')) {
                                    _context6.next = 22;
                                    break;
                                }

                                return _context6.abrupt('continue', 18);

                            case 22:
                                cur[invokeName] = r[invokeName].result;
                                _context6.next = 18;
                                break;

                            case 25:
                                result.push(cur);

                            case 26:
                                _iteratorNormalCompletion = true;
                                _context6.next = 14;
                                break;

                            case 29:
                                _context6.next = 35;
                                break;

                            case 31:
                                _context6.prev = 31;
                                _context6.t2 = _context6['catch'](12);
                                _didIteratorError = true;
                                _iteratorError = _context6.t2;

                            case 35:
                                _context6.prev = 35;
                                _context6.prev = 36;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 38:
                                _context6.prev = 38;

                                if (!_didIteratorError) {
                                    _context6.next = 41;
                                    break;
                                }

                                throw _iteratorError;

                            case 41:
                                return _context6.finish(38);

                            case 42:
                                return _context6.finish(35);

                            case 43:
                                //this.ctx.logger.info('集成就调用结果:',result);
                                if (entity.parseFun) {
                                    try {
                                        fn = evil(entity.parseFun);

                                        result = fn(result);
                                    } catch (e) {
                                        this.ctx.logger.error(e);
                                    }
                                } else {}
                                //this.ctx.logger.info('运行解析函数后结果',result);
                                this.ctx.body = result;

                            case 45:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[12, 31, 35, 43], [36,, 38, 42]]);
            }));

            function invoke() {
                return _ref10.apply(this, arguments);
            }

            return invoke;
        }()
    }, {
        key: 'parse',
        value: function parse(obj) {
            var result = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = obj[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var o = _step2.value;

                    for (var key in o) {
                        var name = '';
                        key.replace(/cloud_(\w+)-1/, function (w, p1) {
                            name = p1;
                        });
                        result[name] = o[key];
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return result;
        }
    }, {
        key: 'delete',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var result, updateSuccess;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.app.mysql.delete('invoke_info', {
                                    id: this.ctx.params.id
                                });

                            case 2:
                                result = _context7.sent;
                                updateSuccess = result.affectedRows === 1;

                                this.reflashEntity();
                                this.ctx.body = { success: updateSuccess };

                            case 6:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function _delete() {
                return _ref11.apply(this, arguments);
            }

            return _delete;
        }()
    }, {
        key: 'checkUnique',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var _ref13, _ref14, total;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.app.mysql.query('select count(1) total from invoke_info where name=?', [this.ctx.params.invokeName]);

                            case 2:
                                _ref13 = _context8.sent;
                                _ref14 = _slicedToArray(_ref13, 1);
                                total = _ref14[0].total;

                                this.ctx.body = { total: total };

                            case 6:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function checkUnique() {
                return _ref12.apply(this, arguments);
            }

            return checkUnique;
        }()
    }, {
        key: 'groupName',
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return this.app.mysql.query('select distinct groupName from invoke_info');

                            case 2:
                                this.ctx.body = _context9.sent;

                            case 3:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function groupName() {
                return _ref15.apply(this, arguments);
            }

            return groupName;
        }()
    }]);

    return RestfulController;
}(Controller);

function evil(fn) {
    fn.replace(/(\s?function\s?)(\w?)(\s?\(w+\)[\s|\S]*)/g, function (w, p1, p2, p3) {
        return p1 + p3;
    });
    var Fn = Function;
    return new Fn('return ' + fn)();
}

module.exports = RestfulController;
//# sourceMappingURL=restful.js.map