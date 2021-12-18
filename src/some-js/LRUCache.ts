// 最近被访问的保留，存储在链表头部的是最久未被访问的数据，优先淘汰
// keep-alive 的实现步骤 https://mp.weixin.qq.com/s/1QQbXUH9TxUICqkl3C-QHQ
class LRUCache {
    capacity:number;
    cache: Map<number, number | null>; // Map 对象保存键值对，并且能够记住键的原始插入顺序，Map适合增删改查密集型操作

    constructor(capacity) {
        this.capacity = capacity; // 限制缓存表的最大容量
        this.cache = new Map(); // 存储缓存内容
    }
    get(key: number) :number {
        if(this.cache.has(key)) {
            let temp = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, temp);
            return temp;
        }
        return -1;
    }
    put (key: number, value: number): Map<number, number | null> {
        if(this.cache.has(key)) {
            this.cache.delete(key);
        }
        if (this.cache.size >= this.capacity) {
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
            this.cache.delete(this.cache.keys().next().value);
        } 
        this.cache.set(key, value);
        return this.cache;
    }
    toString() {
        console.log('capacity', this.capacity);
        console.table(this.cache);
    }
}

const obj = {
    a: 1,
    b: 2,
}
