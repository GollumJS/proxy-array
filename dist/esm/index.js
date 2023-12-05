export function createProxyArray(accessor) {
    const ar = [];
    const proxy = new Proxy(ar, {
        get: (target, property) => {
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
                    return Array.prototype[property].bind([...proxy]);
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
                    return (...args) => {
                        const array = [...proxy];
                        const result = array[property](...args);
                        for (let i = 0; i < array.length; i++) {
                            accessor.set(i, array[i], proxy);
                        }
                        accessor.setLength(array.length, proxy);
                        return result;
                    };
                }
                const index = parseInt(property, 10);
                if (!isNaN(index)) {
                    if (index >= accessor.getLength(proxy)) {
                        return undefined;
                    }
                    return accessor.get(index, proxy);
                }
            }
            return target[property];
        },
        set: (target, property, value) => {
            if (typeof property === 'string') {
                if (property === 'length') {
                    accessor.setLength(value, proxy);
                    return true;
                }
                const index = parseInt(property, 10);
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
        getOwnPropertyDescriptor(target, property) {
            const index = parseInt(property, 10);
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
        ownKeys(target) {
            const list = Array.from(new Array(accessor.getLength(proxy))).map((_, i) => i.toString());
            list.push('length');
            return list;
        }
    });
    return proxy;
}
//# sourceMappingURL=index.js.map