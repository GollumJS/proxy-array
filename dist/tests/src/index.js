"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxyArray = void 0;
function createProxyArray(accessor) {
    var ar = [];
    var proxy = new Proxy(ar, {
        get: function (target, property) {
            if (typeof property === 'string') {
                if (property === 'length') {
                    return accessor.getLength(proxy);
                }
                if ([
                    'concat',
                    'every',
                    'filter',
                    'flat',
                    'flatMap',
                    'forEach',
                    'groupBy',
                    'groupByToMap',
                    'indexOf',
                    'lastIndexOf',
                    'map',
                    'reduce',
                    'reduceRight',
                    'slice',
                    'some',
                ].indexOf(property) !== -1) {
                    return Array.prototype[property].bind(__spreadArray([], proxy, true));
                }
                if ([
                    'copyWithin',
                    'fill',
                    'reverse',
                    'shift',
                    'splice',
                    'sort',
                    'toSource',
                    'unshift',
                ].indexOf(property) !== -1) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var array = __spreadArray([], proxy, true);
                        var result = array[property].apply(array, args);
                        for (var i = 0; i < array.length; i++) {
                            accessor.set(i, array[i], proxy);
                        }
                        accessor.setLength(array.length, proxy);
                        return result;
                    };
                }
                var index = parseInt(property, 10);
                if (!isNaN(index)) {
                    if (index >= accessor.getLength(proxy)) {
                        return undefined;
                    }
                    return accessor.get(index, proxy);
                }
            }
            return target[property];
        },
        set: function (target, property, value) {
            if (typeof property === 'string') {
                if (property === 'length') {
                    accessor.setLength(value, proxy);
                    return true;
                }
                var index = parseInt(property, 10);
                if (!isNaN(index)) {
                    if (accessor.getLength(proxy) < index + 1) {
                        accessor.setLength(index + 1, proxy);
                    }
                    accessor.set(index, value, proxy);
                    return true;
                }
            }
            target[property] = value;
            return true;
        },
        getOwnPropertyDescriptor: function (target, property) {
            var index = parseInt(property, 10);
            if (!isNaN(index)) {
                if (index >= accessor.getLength(proxy)) {
                    return undefined;
                }
                return { value: accessor.get(index, proxy), writable: true, enumerable: true, configurable: true };
            }
            if (property === 'length') {
                return { value: accessor.getLength(proxy), writable: true, enumerable: false, configurable: false };
            }
            return Object.getOwnPropertyDescriptor(ar, property);
        },
        ownKeys: function (target) {
            var list = Array.from(new Array(accessor.getLength(proxy))).map(function (_, i) { return i.toString(); });
            list.push('length');
            return list;
        }
    });
    return proxy;
}
exports.createProxyArray = createProxyArray;
//# sourceMappingURL=index.js.map