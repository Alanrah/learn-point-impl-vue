// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// 每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的
// 围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。 然而，现有的原始包装器对象，如 new Boolean、new String以及new Number，因为遗留原因仍可被创建。
console.log(Symbol('foo') === Symbol('foo')); // false
const sym = Symbol('foo');
console.log(sym.description); // 'foo' es2019
// 场景1 消除魔法字符
// 常规示范：
function magicStr () {
    let type;
    if (type === 'basic') {
        return `<div>basic tab < /div>`;
    }

    if (type === 'super') {
        return `<div>super tab < /div>`;
    }
}
// 用symbol
function symbolStr () {
    let type;
    const tabTypes = {
        basic: Symbol(),
        super: Symbol(),
    }

    if (type === tabTypes.basic) {
        return `<div>basic tab < /div>`
    }

    if (type === tabTypes.super) {
        return ` <div>super tab < /div>`
    }
}

// 场景2 用作对象属性
function symbolTypeProp () {
    // 不知道怎么命名的时候
    const name = Symbol('name');
    const obj = {
        [name]: 'prop',
    }
    console.log(obj[name]); // prop
}

// 场景3 类的私有方法
const printName = Symbol();
class Person {
    private name: string;
    constructor() {
        this.name = 'test';
    }
    [printName] () {
        console.log(this.name);
    }
    getName () {
        this[printName]();
        return this.name;
    }
}
const personA = new Person();
personA.getName();

// 场景4 不会被遍历的属性名
const a = Symbol('a');
const obj = {
    [a]: '1',
    b: 2,
    c: 3,
}
function bianli () {
    Object.keys(obj); // ['b', 'c']
    Object.getOwnPropertyNames(obj); // ['b', 'c']
    JSON.stringify(obj);  // '{"b":2,"c":3}'

    Object.getOwnPropertyDescriptors(obj); // b: {value: 2, writable: true, enumerable: true, configurable: true;},c: { value: 3, writable: true, enumerable: true, configurable: true },Symbol(a): { value: '1', writable: true, enumerable: true, configurable: true },[[Prototype]]: Object
    Object.getOwnPropertySymbols(obj); // [Symbol(a)]
    Reflect.ownKeys(obj); // ['b', 'c', Symbol(a)]
}

// 场景5 
const sa1 = Symbol('1');
const sa2 = Symbol('2');
const saa1 = Symbol.for('1');
const saa2 = Symbol.for('2');
console.log(sa1 === saa1); // false
console.log(Symbol.keyFor(sa1)); // undefined
console.log(Symbol.keyFor(saa1)); // 1
