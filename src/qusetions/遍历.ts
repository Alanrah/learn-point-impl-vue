/*
    各种数据结构的遍历
    1. for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环。
       对于for...of的循环，可以由 break, throw 或 return 终止。在这些情况下，迭代器关闭。
    2. for...in语句以任意顺序迭代一个对象的除Symbol以外的可枚举属性，包括继承的可枚举属性。可以由 break, throw 或 return 终止。在这些情况下，迭代器关闭。
    3. for，可以由 break, throw 或 return 终止。在这些情况下，迭代器关闭。
    4. array/set/map的forEach，对数组的每个元素执行一次给定的函数，不会改变原数组，返回值 undefined，不能break/return
    5.

*/

// string 的遍历
function strIterator() {
    let str = 'hello offer!';
    for (const element of str) {
        console.log(element);
    }

    for (const ele in str) {
        console.log(ele); // 0-11
    }


    for (let i = 0; i < str.length; i++) {
        console.log(i, str[i]);
    }

}

// array 的遍历
/*
若你需要提前终止循环，你可以使用：
    一个简单的 for 循环
    for...of / for...in 循环
    Array.prototype.every()
    Array.prototype.some()
    Array.prototype.find()
    Array.prototype.findIndex()
其他遍历方式：
    map
    reduce
    reduceRight
    reduceLeft
    filter
    every
    some
    sort
    indexOf
    findIndex
    find
*/
function arrIterator(){
    let arr = ['hello', 'offer', 'world'];

    for (const element of arr) {
        console.log(element); // 'hello', 'offer', 'world'
    }

    for (const ele in arr) {
        console.log(ele);// 0 1 2
    }

    for (let i = 0; i < arr.length; i++) {
        console.log(i, arr[i]);
    }

}

// object 的遍历

function objIterator() {
    let obj = {
        name: 'hello',
        age: '12',
    }

    // 不可以直接 for of，Error: obj is not iterable


    for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
    }
    for (const [key, value] of Object.keys(obj)) {
        console.log(`${key}: ${value}`);
    }
    for (const [key, value] of Object.values(obj)) {
        console.log(`${key}: ${value}`);
    }
    const names = Object.getOwnPropertyNames(obj); // ['name', 'age']
    for(let index = 0; index < names.length; index++){
        let key =  names[index];
        let value = obj[key];
        console.log('key : ' + key + ' , value : ' + value);
    }
    let keys = Reflect.ownKeys(obj);
    for(let index = 0; index < keys.length; index++){
        let key =  keys[index];
        let value = obj[key];
        typeof key === 'symbol' ? key = Symbol.prototype.toString.call(key) : '';
        console.log('key : ' + key + ' , value : ' + value);
    }

    for (const ele in obj) {
        console.log(ele); // name age
    }

    // 不可以for，没有length
}

// map 遍历
function mapIterator(){
    let map = new Map([["a", 1], ["b", 2], ["c", 3]]);

    for (let [key, value] of map) {
        console.log(value);
    }

    // for-in 迭代值为空

    map.forEach((value, key) => console.log(value, key));
    // > 1 "a"
    // > 2 "b"
    // > 3 "c"

}
// set 遍历
function setIterator(){
    let set = new Set([1, 1, 2, 2, 3, 3]);

    for (let value of set) {
        console.log(value);
    }

    // for-in 迭代值为空

    set.forEach((value, key) => console.log(value, key));
    // > 1 1
    // > 2 2
    // > 3 3
}


