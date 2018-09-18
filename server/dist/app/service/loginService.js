'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var crypto = require('crypto');

var LoginService = function (_Service) {
    _inherits(LoginService, _Service);

    function LoginService() {
        _classCallCheck(this, LoginService);

        return _possibleConstructorReturn(this, (LoginService.__proto__ || Object.getPrototypeOf(LoginService)).apply(this, arguments));
    }

    _createClass(LoginService, [{
        key: 'login',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
                var _ref2, _ref3, userExist, _ref4, _ref5, passwd, _ref6, _ref7, pwd, comparePw;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.app.mysql.query('select count(1) userExist from t_user where user_name=\'' + user.user_name + '\'');

                            case 2:
                                _ref2 = _context.sent;
                                _ref3 = _slicedToArray(_ref2, 1);
                                userExist = _ref3[0].userExist;

                                if (!(userExist === 0)) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt('return', '2');

                            case 7:
                                _context.next = 9;
                                return this.app.mysql.query('select passwd from t_user where user_name=\'' + user.user_name + '\'');

                            case 9:
                                _ref4 = _context.sent;
                                _ref5 = _slicedToArray(_ref4, 1);
                                passwd = _ref5[0].passwd;
                                _context.next = 14;
                                return this.app.mysql.query('select password(\'' + user.passwd + '\') pwd');

                            case 14:
                                _ref6 = _context.sent;
                                _ref7 = _slicedToArray(_ref6, 1);
                                pwd = _ref7[0].pwd;
                                comparePw = passwd === pwd;

                                if (!(userExist === 1 && !comparePw)) {
                                    _context.next = 20;
                                    break;
                                }

                                return _context.abrupt('return', '3');

                            case 20:
                                if (!(userExist === 1 && comparePw)) {
                                    _context.next = 22;
                                    break;
                                }

                                return _context.abrupt('return', '1');

                            case 22:
                                return _context.abrupt('return', '4');

                            case 23:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function login(_x) {
                return _ref.apply(this, arguments);
            }

            return login;
        }()
    }]);

    return LoginService;
}(Service);

module.exports = LoginService;
//# sourceMappingURL=loginService.js.map