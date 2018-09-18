'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

var MenuController = function (_Controller) {
    _inherits(MenuController, _Controller);

    function MenuController() {
        _classCallCheck(this, MenuController);

        var _this = _possibleConstructorReturn(this, (MenuController.__proto__ || Object.getPrototypeOf(MenuController)).apply(this, arguments));

        _this.roleMenuSql = 'select distinct m.* from t_menu m join t_role_menu rm on rm.menu_id=m.id \n                where m.parent_id=? and rm.role_id in (?) order by m.menu_order';
        return _this;
    }

    _createClass(MenuController, [{
        key: 'menuTree',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var token, _ref2, roles, user, tree;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                token = this.ctx.request.header['access-token'];
                                _context.next = 3;
                                return this.service.redis.get(token);

                            case 3:
                                _ref2 = _context.sent;
                                roles = _ref2.roles;
                                user = _ref2.user;
                                tree = [];

                                if (!(roles.length > 0)) {
                                    _context.next = 13;
                                    break;
                                }

                                _context.next = 10;
                                return this.app.mysql.query(this.roleMenuSql, [1, roles.map(function (r) {
                                    return r.id;
                                })]);

                            case 10:
                                tree = _context.sent;
                                _context.next = 13;
                                return this._menuTree(tree, user, roles);

                            case 13:
                                this.ctx.body = tree;

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function menuTree() {
                return _ref.apply(this, arguments);
            }

            return menuTree;
        }()
    }, {
        key: '_menuTree',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tree, user, roles) {
                var i, current, method;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                i = 0;

                            case 1:
                                if (!(i < tree.length)) {
                                    _context2.next = 19;
                                    break;
                                }

                                _context2.next = 4;
                                return this.app.mysql.query(this.roleMenuSql, [tree[i].id, roles.map(function (r) {
                                    return r.id;
                                })]);

                            case 4:
                                current = _context2.sent;

                                if (!(current && current.length > 0)) {
                                    _context2.next = 11;
                                    break;
                                }

                                tree[i].children = current;
                                _context2.next = 9;
                                return this._menuTree(tree[i].children, user, roles);

                            case 9:
                                _context2.next = 16;
                                break;

                            case 11:
                                if (!tree[i].load_method) {
                                    _context2.next = 16;
                                    break;
                                }

                                method = tree[i].load_method.split('.');
                                _context2.next = 15;
                                return this.service[method[0]][method[1]](tree[i], user, roles);

                            case 15:
                                tree[i].children = _context2.sent;

                            case 16:
                                i++;
                                _context2.next = 1;
                                break;

                            case 19:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function _menuTree(_x, _x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return _menuTree;
        }()
    }]);

    return MenuController;
}(Controller);

module.exports = MenuController;
//# sourceMappingURL=menu.js.map