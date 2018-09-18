'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subscription = require('egg').Subscription;

var Inital = function (_Subscription) {
    _inherits(Inital, _Subscription);

    function Inital() {
        _classCallCheck(this, Inital);

        return _possibleConstructorReturn(this, (Inital.__proto__ || Object.getPrototypeOf(Inital)).apply(this, arguments));
    }

    _createClass(Inital, [{
        key: 'subscribe',


        //
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var ctx, keys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.app.logger.info('Inital');
                                ctx = this.app.createAnonymousContext();
                                //清空redis

                                _context.next = 4;
                                return this.app.redis.keys('*');

                            case 4:
                                keys = _context.sent;
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 8;
                                _iterator = keys[Symbol.iterator]();

                            case 10:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 17;
                                    break;
                                }

                                key = _step.value;
                                _context.next = 14;
                                return this.app.redis.del(key);

                            case 14:
                                _iteratorNormalCompletion = true;
                                _context.next = 10;
                                break;

                            case 17:
                                _context.next = 23;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context['catch'](8);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 23:
                                _context.prev = 23;
                                _context.prev = 24;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 26:
                                _context.prev = 26;

                                if (!_didIteratorError) {
                                    _context.next = 29;
                                    break;
                                }

                                throw _iteratorError;

                            case 29:
                                return _context.finish(26);

                            case 30:
                                return _context.finish(23);

                            case 31:

                                this.app.logger.info('Inital end');

                            case 32:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[8, 19, 23, 31], [24,, 26, 30]]);
            }));

            function subscribe() {
                return _ref.apply(this, arguments);
            }

            return subscribe;
        }()
    }], [{
        key: 'schedule',

        // 通过 schedule 属性来设置定时任务的执行间隔等配置
        get: function get() {
            return {
                cron: '0 0 0 * * *',
                immediate: true,
                type: 'worker'
            };
        }
    }]);

    return Inital;
}(Subscription);

module.exports = Inital;
//# sourceMappingURL=inital.js.map