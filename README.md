# GollumJS Proxy Array

ProxyArray

[![Build Status](https://github.com/GollumJS/proxy-array/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/GollumJS/proxy-array/actions)
[![Coverage](https://coveralls.io/repos/github/GollumJS/proxy-array/badge.svg?branch=master)](https://coveralls.io/github/GollumJS/proxy-array)
[![Licence](https://img.shields.io/npm/l/@gollum-js/proxy-array.svg?colorB=4B9081)](https://github.com/GollumJS/proxy-array/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@gollum-js/proxy-array.svg)](https://www.npmjs.com/package/@gollum-js/proxy-array)
[![Discord](https://img.shields.io/discord/671741944149573687?color=purple&label=discord)](https://discord.gg/xMBc5SQ)

Create a proxy for array accessor.
Storage array data in localStorage or Buffer
And all array method works on proxy


## Install
```
npm install @gollum-js/proxy-array
```

## Usage TS

```typescript
import { createProxyArray } from '@gollum-js/proxy-array';

const storage = {};
let length = 0;

const proxy = createProxyArray({
    get(index: number): any {
        return storage[index];
    },
    set(index: number, value: any): boolean {
        storage[index] = value;
        if (length < index + 1) {
        	length = index + 1;
        }
        return true;
    },
    getLength(): number {
        return length;
    },
    setLength(value: number): boolean {
        storage.length = value;
        return true;
    }
});


proxy.push('a');
proxy.push('b');
proxy.push('c');

console.log(storage) // [ 'a', 'b', 'c' ]
console.log(length) // 3


console.log(proxy[1]) // [ 'b' ]


```

## Usage JS

```javascript

const {createProxyArray} = require("@gollum-js/proxy-array")

const storage = {};
let length = 0;

const proxy = createProxyArray({
    get(index) {
        return storage[index];
    },
    set(index, value) {
        storage[index] = value;
        if (length < index + 1) {
        	length = index + 1;
        }
        return true;
    },
    getLength() {
        return storage.length;
    },
    setLength(value) {
        storage.length = value;
        return true;
    }
});
 
 
proxy.push('a');
proxy.push('b');
proxy.push('c');
 
console.log(storage) // [ 'a', 'b', 'c' ]
console.log(length) // 3
 
 
console.log(proxy[1]) // [ 'b' ]
 

```
