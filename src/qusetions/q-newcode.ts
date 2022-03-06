// 1. ()
const a = ({} + 'b' > {} + 'a') // true
const b = {} + 'b' > {} + 'a'; // false, 相当于 NaN > NaN， {}在此处是个表达式？强行解释
console.log({} + 'b' > {} + 'a'); // true, 相当于 [object Object]b > [object Object]a , {}在此处是空对象
console.log({} + 'a'); // [object Object]a
const c = {} + 'a'; // NaN;

// 2