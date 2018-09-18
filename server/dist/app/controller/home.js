'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;
var jwt = require('jsonwebtoken');
var fs = require('fs');

var HomeController = function (_Controller) {
    _inherits(HomeController, _Controller);

    function HomeController() {
        _classCallCheck(this, HomeController);

        return _possibleConstructorReturn(this, (HomeController.__proto__ || Object.getPrototypeOf(HomeController)).apply(this, arguments));
    }

    _createClass(HomeController, [{
        key: 'index',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.ctx.render('/index.html');

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function index() {
                return _ref.apply(this, arguments);
            }

            return index;
        }()
    }, {
        key: 'doNothing',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.ctx.body = {};

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function doNothing() {
                return _ref2.apply(this, arguments);
            }

            return doNothing;
        }()
    }, {
        key: 'login',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var msg, user, roles, token, _ref4, _ref5;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.service.loginService.login(this.ctx.request.body);

                            case 2:
                                msg = _context3.sent;
                                user = {};
                                roles = [];
                                token = '';

                                if (!(msg === '1')) {
                                    _context3.next = 17;
                                    break;
                                }

                                _context3.next = 9;
                                return this.app.mysql.query('select id,name,user_name,phone,ID_number,email from t_user where user_name=\'' + this.ctx.request.body.user_name + '\'');

                            case 9:
                                _ref4 = _context3.sent;
                                _ref5 = _slicedToArray(_ref4, 1);
                                user = _ref5[0];
                                _context3.next = 14;
                                return this.app.mysql.query('select r.* from t_role r join t_user_role u on r.id=u.role_id  where u.user_id=' + user.id);

                            case 14:
                                roles = _context3.sent;


                                token = jwt.sign({ payload: user }, this.app.secret, {
                                    //expiresIn: 30
                                });
                                this.app.redis.set(token, JSON.stringify({ user: user, roles: roles }));

                            case 17:
                                this.ctx.body = { msg: msg, user: user, token: token, roles: roles };

                            case 18:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function login() {
                return _ref3.apply(this, arguments);
            }

            return login;
        }()
    }, {
        key: 'logout',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var token, auth;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                token = this.ctx.request.header['access-token'];
                                _context4.next = 3;
                                return this.service.redis.get(token);

                            case 3:
                                auth = _context4.sent;

                                this.app.redis.del(token);
                                this.ctx.body = {};

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function logout() {
                return _ref6.apply(this, arguments);
            }

            return logout;
        }()
    }, {
        key: 'resetPassword',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var token, _ref8, user, result, updateSuccess;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                token = this.ctx.request.header['access-token'];
                                _context5.next = 3;
                                return this.service.redis.get(token);

                            case 3:
                                _ref8 = _context5.sent;
                                user = _ref8.user;
                                _context5.next = 7;
                                return this.app.mysql.query('update t_user set passwd=password(\'123456\') where id=' + user.id);

                            case 7:
                                result = _context5.sent;
                                updateSuccess = result.affectedRows === 1;

                                this.ctx.body = { success: updateSuccess };

                            case 10:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function resetPassword() {
                return _ref7.apply(this, arguments);
            }

            return resetPassword;
        }()
    }]);

    return HomeController;
}(Controller);

module.exports = HomeController;
//# sourceMappingURL=home.js.map