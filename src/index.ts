export function createProxyArray (accessor: {
	get: (index: number, proxy?: any[]) => any,
	set: (index: number, value: any, proxy?: any[]) => boolean,
	getLength: (proxy: any[]) => number,
	setLength: (value: number, proxy?: any[]) => boolean,
}): any {
	const proxy = new Proxy([], {
		get: (target: any[], property: string): any => {
			
			if (typeof property === 'string') {
				if (property === 'length') {
					return accessor.getLength(proxy)
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
					return (...args: any[]): any => {
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
		set: (target: any[], property: string, value: any): boolean => {
			if (typeof property === 'string') {
				if (property === 'length') {
					accessor.setLength(value, proxy);
					return true;
				}
				const index = parseInt(property, 10);
				if (!isNaN(index)) {
					if (accessor.getLength(proxy) < index + 1 ) {
						accessor.setLength(index + 1, proxy);
					}
					accessor.set(index, value, proxy);
					return true;
				}
			}
			target[property] = value;
			return true;
		}
	});
	return proxy;
}