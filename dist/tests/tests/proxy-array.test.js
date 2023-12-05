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
var src_1 = require("../src");
var storage;
var proxy;
var dataSet = [
    { isControl: true },
    { isControl: false },
];
describe.each(dataSet)('All array methods  test', function (_a) {
    var isControl = _a.isControl;
    beforeEach(function () {
        if (isControl) {
            storage = [];
            proxy = storage;
        }
        else {
            storage = [];
            proxy = (0, src_1.createProxyArray)({
                get: function (index) {
                    return storage[index];
                },
                set: function (index, value) {
                    storage[index] = value;
                    return true;
                },
                getLength: function () {
                    return storage.length;
                },
                setLength: function (value) {
                    storage.length = value;
                    return true;
                }
            });
        }
    });
    test('Test set and get' + (isControl ? '[CONTROL]' : ''), function () {
        proxy[0] = 'a';
        proxy[1] = 'b';
        proxy[2] = 'c';
        proxy[3] = 'd';
        expect(proxy[0]).toStrictEqual('a');
        expect(proxy[1]).toStrictEqual('b');
        expect(proxy[2]).toStrictEqual('c');
        expect(proxy[3]).toStrictEqual('d');
        expect(proxy[4]).toStrictEqual(undefined);
        expect(proxy.length).toStrictEqual(4);
    });
    test('Test get' + (isControl ? '[CONTROL]' : ''), function () {
        proxy[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy[0]).toStrictEqual('a');
        expect(proxy[1]).toStrictEqual('b');
        expect(proxy[2]).toStrictEqual('c');
        expect(proxy[3]).toStrictEqual('d');
        expect(proxy[4]).toStrictEqual(undefined);
        expect(proxy.length).toStrictEqual(4);
    });
    test('Test set length' + (isControl ? '[CONTROL]' : ''), function () {
        proxy.length = 10;
        expect(proxy.length).toStrictEqual(10);
        expect(__spreadArray([], proxy, true)).toEqual(new Array(10));
    });
    test('Test other prop' + (isControl ? '[CONTROL]' : ''), function () {
        proxy['foo'] = 'bar';
        expect(proxy['foo']).toStrictEqual('bar');
    });
    test('Test for' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        var i = 0;
        for (var _i = 0, proxy_1 = proxy; _i < proxy_1.length; _i++) {
            var item = proxy_1[_i];
            expect(item).toStrictEqual(storage[i]);
            i++;
        }
    });
    test('Test spread' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.concat' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.concat()).toEqual(['a', 'b', 'c', 'd']);
        expect(proxy.concat(['e'])).toEqual(['a', 'b', 'c', 'd', 'e']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.copyWithin' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        storage[4] = 'e';
        expect(proxy.copyWithin(0, 0)).toEqual(['a', 'b', 'c', 'd', 'e']);
        expect(proxy.copyWithin(1, 0)).toEqual(['a', 'a', 'b', 'c', 'd']);
        expect(proxy.copyWithin(1, 1, 2)).toEqual(['a', 'a', 'b', 'c', 'd']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.entries' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(Array.from(proxy.entries())).toEqual([[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']]);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.every' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        var i = 0;
        expect(proxy.every(function (v) {
            i++;
            return ['a', 'b', 'c', 'd'].indexOf(v) !== -1;
        })).toStrictEqual(true);
        expect(i).toStrictEqual(4);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.fill' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.fill('e', 2)).toEqual(['a', 'b', 'e', 'e']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'e', 'e']);
    });
    test('Test array.prototype.filter' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.filter(function (v) { return v === 'a'; })).toEqual(['a']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.find' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.find(function (v) { return v === 'b'; })).toEqual('b');
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.findIndex' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.findIndex(function (v) { return v === 'b'; })).toEqual(1);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.flat' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = ['a'];
        storage[1] = ['b'];
        storage[2] = ['c'];
        storage[3] = [['d']];
        expect(proxy.flat()).toEqual(['a', 'b', 'c', ['d']]);
        expect(proxy.flat(2)).toEqual(['a', 'b', 'c', 'd']);
        expect(__spreadArray([], proxy, true)).toEqual([['a'], ['b'], ['c'], [['d']]]);
    });
    test('Test array.prototype.flatMap' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.flatMap(function (v) { return [v + v]; })).toEqual(['aa', 'bb', 'cc', 'dd']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.forEach' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        var j = 0;
        proxy.forEach(function (v, i, list) {
            expect(v).toStrictEqual(storage[j]);
            expect(i).toStrictEqual(j);
            expect(list).toEqual(['a', 'b', 'c', 'd']);
            j++;
        });
        expect(j).toStrictEqual(4);
    });
    test('Test array.prototype.includes' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.includes('b')).toStrictEqual(true);
        expect(proxy.includes('e')).toStrictEqual(false);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.indexOf' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.indexOf('b')).toStrictEqual(1);
        expect(proxy.indexOf('e')).toStrictEqual(-1);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.join', function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.join(',')).toStrictEqual('a,b,c,d');
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.keys' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(Array.from(proxy.keys())).toStrictEqual([0, 1, 2, 3]);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.lastIndexOf' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        storage[4] = 'a';
        expect(proxy.lastIndexOf('a')).toStrictEqual(4);
        expect(proxy.lastIndexOf('e')).toStrictEqual(-1);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd', 'a']);
    });
    test('Test array.prototype.map' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.map(function (v) { return v + v; })).toEqual(['aa', 'bb', 'cc', 'dd']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.pop' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.pop()).toEqual('d');
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c']);
        expect(proxy.length).toStrictEqual(3);
    });
    test('Test array.prototype.push' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.push('e')).toStrictEqual(5);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd', 'e']);
        expect(proxy.length).toStrictEqual(5);
    });
    test('Test array.prototype.reduce' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 1;
        storage[1] = 2;
        storage[2] = 3;
        storage[3] = 4;
        expect(proxy.reduce(function (a, v) { return a + v; }, 10)).toStrictEqual(20);
        expect(__spreadArray([], proxy, true)).toEqual([1, 2, 3, 4]);
    });
    test('Test array.prototype.reduceRight' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 1;
        storage[1] = 2;
        storage[2] = 3;
        storage[3] = 4;
        expect(proxy.reduceRight(function (a, v) { return a + v; }, 10)).toStrictEqual(20);
        expect(__spreadArray([], proxy, true)).toEqual([1, 2, 3, 4]);
    });
    test('Test array.prototype.reverse' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.reverse()).toEqual(['d', 'c', 'b', 'a']);
        expect(__spreadArray([], proxy, true)).toEqual(['d', 'c', 'b', 'a']);
    });
    test('Test array.prototype.shift' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.shift()).toEqual('a');
        expect(__spreadArray([], proxy, true)).toEqual(['b', 'c', 'd']);
        expect(proxy.length).toStrictEqual(3);
    });
    test('Test array.prototype.slice' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.slice(1)).toEqual(['b', 'c', 'd']);
        expect(proxy.slice(1, 3)).toEqual(['b', 'c']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.slice' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.slice(1)).toEqual(['b', 'c', 'd']);
        expect(proxy.slice(1, 3)).toEqual(['b', 'c']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.some' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.some(function (v) { return v === 'c'; })).toStrictEqual(true);
        expect(proxy.some(function (v) { return v === 'e'; })).toStrictEqual(false);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.sort' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = { v: 3 };
        storage[1] = { v: 2 };
        storage[2] = { v: 4 };
        storage[3] = { v: 1 };
        expect(proxy.sort(function (a, b) { return a.v - b.v; })).toEqual([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }]);
        expect(__spreadArray([], proxy, true)).toEqual([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }]);
    });
    test('Test array.prototype.splice' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.splice(1, 2)).toEqual(['b', 'c']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'd']);
        expect(proxy.length).toStrictEqual(2);
    });
    test('Test array.prototype.toString' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.toString()).toStrictEqual('a,b,c,d');
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.toLocaleString' + (isControl ? '[CONTROL]' : ''), function () {
        var date = new Date;
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = date;
        expect(proxy.toLocaleString()).toStrictEqual('a,b,c,' + date.toLocaleString());
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', date]);
    });
    test('Test array.prototype.toString' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.toString()).toStrictEqual('a,b,c,d');
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test array.prototype.unshift' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(proxy.unshift('e')).toStrictEqual(5);
        expect(__spreadArray([], proxy, true)).toEqual(['e', 'a', 'b', 'c', 'd']);
        expect(proxy.length).toStrictEqual(5);
    });
    test('Test array.prototype.values' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(Array.from(proxy.values())).toEqual(['a', 'b', 'c', 'd']);
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test JSON.stringify' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        expect(JSON.stringify(proxy)).toStrictEqual('["a","b","c","d"]');
        expect(__spreadArray([], proxy, true)).toEqual(['a', 'b', 'c', 'd']);
    });
    test('Test ownKeys' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        var baseArray = ['a', 'b', 'c', 'd'];
        expect(Object.keys(proxy)).toEqual(Object.keys(baseArray));
    });
    test('Test getOwnPropertyNames' + (isControl ? '[CONTROL]' : ''), function () {
        storage[0] = 'a';
        storage[1] = 'b';
        storage[2] = 'c';
        storage[3] = 'd';
        var baseArray = ['a', 'b', 'c', 'd'];
        expect(Object.getOwnPropertyNames(proxy)).toEqual(Object.getOwnPropertyNames(baseArray));
    });
});
//# sourceMappingURL=proxy-array.test.js.map