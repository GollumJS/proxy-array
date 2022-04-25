export declare function createProxyArray(accessor: {
    get: (index: number, proxy?: any[]) => any;
    set: (index: number, value: any, proxy?: any[]) => boolean;
    getLength: (proxy: any[]) => number;
    setLength: (value: number, proxy?: any[]) => boolean;
}): any;
