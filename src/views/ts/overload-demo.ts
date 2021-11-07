
// type JSON_T = Record<string, number>;
type JSON_T = {[key: string]: number};
enum ENTRY {
    key = 'key',
    value = 'value',
}

// 声明了函数重载，调用时候类型不会报错
function getNeed(obj: JSON_T, entry: ENTRY.key): string[];
function getNeed(obj: JSON_T, entry: ENTRY.value): number[];
function getNeed(obj: JSON_T, entry: ENTRY) {
    return entry === ENTRY.key ? Object.keys(obj) : Object.values(obj);
}

const obj = { a: 1, b: 2 };
getNeed(obj, ENTRY.key).map(key => key);
getNeed(obj, ENTRY.value).map(key => key);

// 未声明函数重载，调用时候类型报错
// get_Need的返回值推断类型是联合类型 string[] | number[]
function get_Need(obj: JSON_T, entry: ENTRY) {
    return entry === ENTRY.key ? Object.keys(obj) : Object.values(obj);
}
// 这个key在ts-4.2.3版本下是any，4.3.5是string | number
get_Need(obj, ENTRY.key).map(key => key);