'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('./app/util');
require("babel-register");

module.exports = function (app) {
    app.beforeStart(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var ctx;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // 应用会等待这个函数执行完成才启动
                        app.logger.info('init app');
                        app.logger.info(app.config.discription);

                        app.secret = 'n7d3t7x7';
                        ctx = app.createAnonymousContext();


                        app.mysql.modify = false;
                        //初始化数据库
                        _context.next = 7;
                        return ctx.service.initalDatabase.inital();

                    case 7:

                        app.logger.info('app started!!!!');

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));

    app.once('server', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(server) {
            var ctx;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            ctx = app.createAnonymousContext();
                            //实体配置缓存

                            _context2.next = 3;
                            return ctx.service.entity.entityCache();

                        case 3:
                            _context2.next = 5;
                            return ctx.service.restful.reflashEntity();

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x) {
            return _ref2.apply(this, arguments);
        };
    }());

    //实体配置信息缓存
    app.messenger.on('entityCache', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            app.entityCache = data;

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x2) {
            return _ref3.apply(this, arguments);
        };
    }());

    app.messenger.on('invokeEntitys', function (data) {
        app.invokeEntitys = data;
    });
};
//# sourceMappingURL=app.js.map