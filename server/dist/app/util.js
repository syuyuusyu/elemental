"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var toString = Object.prototype.toString;
var isFunction = function isFunction(v) {
    return toString.call(v) == "[object Function]";
};

var isObj = function isObj(v) {
    return toString.call(v) == "[object Object]";
};

var isArrsy = function isArrsy(v) {
    return toString.call(v) == "[object Array]";
};

// Array.prototype.indexOf = Array.prototype.indexOf ? Array.prototype.indexOf
//     : function(o, from)  {
//         from = from || 0;
//         var len = this.length;
//         from += (from < 0) ? len : 0;
//         for (; from < len; from++) {
//             if (this[from] === o)
//                 return from;
//         }
//         return -1;
//     };

Array.prototype.remove = Array.prototype.remove ? Array.prototype.remove : function (o) {
    console.log('reomve');
    var index = this.indexOf(o);
    if (index != -1) {
        console.log(index);
        this.splice(index, 1);
    }
};

Function.prototype.createInterceptor = Function.prototype.createInterceptor ? Function.prototype.createInterceptor : function (fn, scope) {
    var method = this;
    return !isFunction(fn) ? this : function () {
        var me = this,
            arg = arguments;
        return fn.apply(scope || me || global, arg) !== false ? method.apply(me || global, arg) : null;
    };
};

Function.prototype.replaceArguments = Function.prototype.replaceArguments ? Function.prototype.replaceArguments : function (fn) {
    var method = this;
    return !isFunction(fn) ? this : function () {
        var me = this,
            arg = arguments,
            args = fn.apply(null, arg);
        return method.apply(me || global, args);
    };
};

// Object.prototype.forEach=Object.prototype.forEach?Object.prototype.forEach:
//     function(fn){
//         Object.keys(this).forEach(key=>{
//             fn(key,this[key]);
//         })
//     };


function smartQuery(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function () {
        var oldquery = this.app.mysql.query;

        return function (_this, arg, _oquery) {
            _this.app.mysql.modify = true;
            _this.app.mysql.query = _this.app.mysql.query.replaceArguments(function (sql, paramsArr) {
                var newArg = [],
                    paramsArrClone = [].concat(paramsArr);
                sql = sql.replace(/((?:where|and)\s+[\w\.]+\s*=\s*\?)|((?:where|and)\s+[\w\.]+\s+in\s*\(\s*\?\s*\))/g, function (w) {
                    var current = paramsArrClone.shift();
                    if (current) {
                        newArg.push(current);
                        return w;
                    } else {
                        return '';
                    }
                });
                if (!/where/.test(sql)) {
                    sql = sql.replace('and', 'where');
                }
                return [sql, newArg];
            });
            return new Promise(function (resolve, reject) {
                resolve(oldValue.apply(_this, arg));
            }).then(function (response) {
                _this.app.mysql.query = _oquery;
                _this.app.mysql.modify = false;
                return response;
            });
        }(this, arguments, oldquery);
    };
    return descriptor;
}

function lowCaseResult(target, name, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = function () {
        var me = this;
        var arg = arguments;
        return new Promise(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                resolve(oldValue.apply(me, arg));

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }()).then(function (response) {
            if (isObj(response)) {
                response = _lowCaseObj(response);
            } else if (isArrsy(response)) {
                response = _lowCaseArray(response);
            } else {
                response = response;
            }
            return response;
        });
    };
}

function lowCaseResponseBody(target, name, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = function () {
        var me = this;
        var arg = arguments;
        return new Promise(function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                resolve(oldValue.apply(me, arg));

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }()).then(function () {
            var result = me.ctx.body;
            if (isObj(result)) {
                result = _lowCaseObj(result);
            } else if (isArrsy(result)) {
                result = _lowCaseArray(result);
            } else {
                result = result;
            }
            me.ctx.body = result;
        });
    };
}

function _lowCaseObj(target) {
    var result = {};
    for (var key in target) {
        if (isObj(target[key])) {
            result[key.toLowerCase()] = _lowCaseObj(target[key]);
        } else if (isArrsy(target[key])) {
            result[key.toLowerCase()] = _lowCaseArray(target[key]);
        } else {
            result[key.toLowerCase()] = target[key];
        }
    }
    return result;
}

function _lowCaseArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (isObj(arr[i])) {
            result.push(_lowCaseObj(arr[i]));
        } else if (isArrsy(arr[i])) {
            result.push(_lowCaseArray(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

function careateTree(array, idField, pidField, topId) {
    function _tree(arr) {
        var leafArray = [];
        arr.forEach(function (_) {
            if (arr.filter(function (a) {
                return a[pidField] === _[idField];
            }).length === 0) {
                leafArray.push(_);
            }
        });
        if (leafArray.findIndex(function (_) {
            return _[pidField] == topId;
        }) === -1) {
            console.log(arr.remove);
            leafArray.forEach(function (_) {
                return arr.remove(_);
            });
            leafArray.forEach(function (_) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][idField] === _[pidField]) {
                        if (!arr[i].children) {
                            arr[i].children = [];
                        }
                        console.log(2222, _);
                        arr[i].children.push(_);
                    }
                }
            });
            _tree(arr);
        }
    }
    _tree(array);
    //console.log(array);
    return array;
}

module.exports = { smartQuery: smartQuery, lowCaseResult: lowCaseResult, lowCaseResponseBody: lowCaseResponseBody, careateTree: careateTree };
//# sourceMappingURL=util.js.map