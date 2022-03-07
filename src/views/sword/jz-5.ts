// JZ5 替换空格
function replaceSpace( s:string ) {
    // write code here
    // return s.replaceAll(' ', '%20');
    return s.split(' ').join('%20');
}