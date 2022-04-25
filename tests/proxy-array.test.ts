import { createProxyArray } from '../src';

let storage: any [];
let proxy: any [];

let dataSet = [
	{ isControl: true },
	{ isControl: false },
];

describe.each(dataSet)('All array methods  test', ({ isControl }) => {

	beforeEach(() => {
		if (isControl) {
			storage = [];
			proxy = storage;
		} else {
			storage = [];
			proxy = createProxyArray({
				get(index: number) {
					return storage[index];
				},
				set(index: number, value: any): boolean {
					storage[index] = value;
					return true;
				},
				getLength(): number {
					return storage.length;
				},
				setLength(value: number): boolean {
					storage.length = value;
					return true;
				}
			});
		}
	});
	
	test('Test set and get'+(isControl ? '[CONTROL]' : ''), () => {
		
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
	
	test('Test get'+(isControl ? '[CONTROL]' : ''), () => {
		
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
	
	test('Test set length'+(isControl ? '[CONTROL]' : ''), () => {
		
		proxy.length = 10;
		expect(proxy.length).toStrictEqual(10);
		expect([...proxy]).toEqual(new Array(10));
	})
	
	test('Test other prop'+(isControl ? '[CONTROL]' : ''), () => {
		
		proxy['foo'] = 'bar';
		expect(proxy['foo']).toStrictEqual('bar');
	});
	
	test('Test for'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		let i = 0;
		for (const item of proxy) {
			expect(item).toStrictEqual(storage[i]);
			i++;
		}
		
	});
	
	test('Test spread'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
		
	});
	
	test('Test array.prototype.concat'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.concat()).toEqual([ 'a', 'b', 'c' , 'd' ]);
		expect(proxy.concat([ 'e' ])).toEqual([ 'a', 'b', 'c' , 'd', 'e' ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	test('Test array.prototype.copyWithin'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		storage[4] = 'e';
		
		expect(proxy.copyWithin(0, 0)).toEqual([ 'a', 'b', 'c' , 'd', 'e' ]);
		expect(proxy.copyWithin(1, 0)).toEqual([ 'a', 'a', 'b', 'c' , 'd' ]);
		expect(proxy.copyWithin(1, 1, 2)).toEqual([ 'a' , 'a', 'b' ,  'c', 'd' ]);
		expect([...proxy]).toEqual([ 'a', 'a', 'b', 'c', 'd' ]);
	});
	
	test('Test array.prototype.entries'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		console.log('proxy.entries()', proxy, proxy.entries());
		
		expect(Array.from(proxy.entries())).toEqual([ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ], [ 3, 'd' ] ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	test('Test array.prototype.every'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		let i = 0;
		expect(proxy.every((v) => {
			i++;
			return [ 'a', 'b', 'c' , 'd' ].indexOf(v) !== -1;
		})).toStrictEqual(true);
		expect(i).toStrictEqual(4);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	test('Test array.prototype.fill'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.fill('e', 2)).toEqual([ 'a', 'b', 'e' , 'e' ]);
		expect([ ...proxy ]).toEqual([ 'a', 'b', 'e' , 'e' ]);
	});
	
	test('Test array.prototype.filter'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.filter(v => v === 'a')).toEqual([ 'a' ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.find'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.find(v => v === 'b')).toEqual('b');
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.findIndex'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.findIndex(v => v === 'b')).toEqual(1);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.flat'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = [ 'a' ];
		storage[1] = [ 'b' ];
		storage[2] = [ 'c' ];
		storage[3] = [ [ 'd' ] ];
		
		expect(proxy.flat()).toEqual([ 'a', 'b', 'c', ['d'] ]);
		expect(proxy.flat(2)).toEqual([ 'a', 'b', 'c', 'd' ]);
		expect([...proxy]).toEqual([ ['a'], ['b'], ['c'], [['d']] ]);
	});
	
	
	test('Test array.prototype.flatMap'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.flatMap(v => [ v+v ])).toEqual([ 'aa', 'bb', 'cc', 'dd' ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	test('Test array.prototype.forEach'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		let j = 0;
		proxy.forEach((v, i, list) => {
			expect(v).toStrictEqual(storage[j]);
			expect(i).toStrictEqual(j);
			expect(list).toEqual([ 'a', 'b', 'c', 'd' ]);
			j++;
		});
		expect(j).toStrictEqual(4);
	});
	
	
	test('Test array.prototype.includes'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.includes('b')).toStrictEqual(true);
		expect(proxy.includes('e')).toStrictEqual(false);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	test('Test array.prototype.indexOf'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.indexOf('b')).toStrictEqual(1);
		expect(proxy.indexOf('e')).toStrictEqual(-1);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.join', () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.join(',')).toStrictEqual('a,b,c,d');
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.keys'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(Array.from(proxy.keys())).toStrictEqual([ 0, 1 ,2 ,3 ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.lastIndexOf'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		storage[4] = 'a';
		
		expect(proxy.lastIndexOf('a')).toStrictEqual(4);
		expect(proxy.lastIndexOf('e')).toStrictEqual(-1);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd', 'a' ]);
	});
	
	
	test('Test array.prototype.map'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.map(v => v+v)).toEqual([ 'aa', 'bb', 'cc', 'dd' ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.pop'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.pop()).toEqual('d');
		expect([...proxy]).toEqual([ 'a', 'b', 'c' ]);
		expect(proxy.length).toStrictEqual(3);
	});
	
	
	test('Test array.prototype.push'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.push('e')).toStrictEqual(5);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd', 'e' ]);
		expect(proxy.length).toStrictEqual(5);
	});
	
	
	test('Test array.prototype.reduce'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 1;
		storage[1] = 2;
		storage[2] = 3;
		storage[3] = 4;
		
		expect(proxy.reduce((a, v) => a + v, 10)).toStrictEqual(20);
		expect([...proxy]).toEqual([ 1, 2, 3, 4 ]);
	});
	
	
	test('Test array.prototype.reduceRight'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 1;
		storage[1] = 2;
		storage[2] = 3;
		storage[3] = 4;
		
		expect(proxy.reduceRight((a, v) => a + v, 10)).toStrictEqual(20);
		expect([...proxy]).toEqual([ 1, 2, 3, 4 ]);
	});
	
	
	test('Test array.prototype.reverse'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.reverse()).toEqual([ 'd', 'c', 'b', 'a' ]);
		expect([...proxy]).toEqual([ 'd', 'c', 'b', 'a' ]);
	});
	
	
	test('Test array.prototype.shift'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.shift()).toEqual('a');
		expect([...proxy]).toEqual([ 'b', 'c', 'd' ]);
		expect(proxy.length).toStrictEqual(3);
	});
	
	
	test('Test array.prototype.slice'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.slice(1)).toEqual([ 'b', 'c', 'd' ]);
		expect(proxy.slice(1, 3)).toEqual([ 'b', 'c' ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.slice'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.slice(1)).toEqual([ 'b', 'c', 'd' ]);
		expect(proxy.slice(1, 3)).toEqual([ 'b', 'c' ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.some'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.some(v => v === 'c')).toStrictEqual(true);
		expect(proxy.some(v => v === 'e')).toStrictEqual(false);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.sort'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = { v: 3 };
		storage[1] = { v: 2 };
		storage[2] = { v: 4 };
		storage[3] = { v: 1 };
		
		expect(proxy.sort((a, b) => a.v - b.v)).toEqual([ {v : 1}, {v : 2}, {v : 3}, {v : 4} ]);
		expect([ ...proxy ]).toEqual([ {v : 1}, {v : 2}, {v : 3}, {v : 4} ]);
	});
	
	
	test('Test array.prototype.splice'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.splice(1, 2)).toEqual([ 'b', 'c' ]);
		expect([...proxy]).toEqual([ 'a', 'd' ]);
		expect(proxy.length).toStrictEqual(2);
	});
	
	
	test('Test array.prototype.toString'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.toString()).toStrictEqual('a,b,c,d');
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.toLocaleString'+(isControl ? '[CONTROL]' : ''), () => {
		const date = new Date;
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = date;
		
		expect(proxy.toLocaleString()).toStrictEqual('a,b,c,'+date.toLocaleString());
		expect([...proxy]).toEqual([ 'a', 'b', 'c', date ]);
	});
	
	
	
	test('Test array.prototype.toString'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.toString()).toStrictEqual('a,b,c,d');
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test array.prototype.unshift'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(proxy.unshift('e')).toStrictEqual(5);
		expect([...proxy]).toEqual([  'e', 'a', 'b', 'c', 'd' ]);
		expect(proxy.length).toStrictEqual(5);
	});
	
	
	test('Test array.prototype.values'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(Array.from(proxy.values())).toEqual([ 'a', 'b', 'c', 'd' ]);
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
	
	
	test('Test JSON.stringify'+(isControl ? '[CONTROL]' : ''), () => {
		storage[0] = 'a';
		storage[1] = 'b';
		storage[2] = 'c';
		storage[3] = 'd';
		
		expect(JSON.stringify(proxy)).toStrictEqual('["a","b","c","d"]');
		expect([...proxy]).toEqual([ 'a', 'b', 'c', 'd' ]);
	});
});
