/*
给一串16进制的数str，解析出他的有效数字是什么
str一定是偶数length的，比如'E58D8E'，每两位代表一个字节，是三字节的
'E58D8E' 就是 '11100101 10001101 10001110
第一个字节的开始一定是 字符串字节长度个1加1个2，从第二个字节开始，都是10开头
1110XXXX 10XXXXXX 10XXXXXX
上述中 XXX代表的就是有效位，所有有效位拼接起来，就是这串字符的数字代码
E58D8E 的有效数字代码就是 0101 001101 001110 = 21326
*/
const line = readline();
const bytes = [];
let temp = '';
for(let index in line){
    if(index  % 2) {
        temp = temp + line[index];
        bytes.push(temp);
        temp = '';
    } else {
        temp = temp +  line[index];
    }
}
let n  = bytes.length; // n 字节
const prefix = new Array(n).fill('1').join('') + '0';

function handle(bytes) {
    let res = '';
    for(let i =0;i<n; i++) {
        let binary = parseInt(bytes[i], 16).toString(2);
        if(i === 0) {
            if(!binary.includes(prefix)) {
                return -1;
            } else {
                 res = res + binary.slice(prefix.length);
            }

        } else {
            if(!binary.includes('10')) {
                return -1;
            } else {
                res = res + binary.slice(2);
            }
        }
//         console.log(bytes[i], binary,binary.slice(prefix.length), res)
    }
    return res;
}

let r = handle(bytes);
console.log(parseInt(r,2));