// 数据流中的中位数
// https://www.nowcoder.com/practice/9be0172896bd43948f8a32fb954e1be1?tpId=13&tqId=23457&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13

let arr = [];
function Insert(num)
{
    // write code here
    let i=0;
    while(arr[i]<num)
        i++;
    arr.splice(i,0,num);//增加一个元素
}
function GetMedian(){
	// write code here
    let index = Math.floor(arr.length/2 )
    if(arr.length%2){//奇数
        return arr[index];
    }else{
        return ( arr[index] + arr[index-1] )/2 ;
    }
}