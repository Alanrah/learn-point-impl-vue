// 买卖股票的最好时机(一)

// 假设你有一个数组prices，长度为n，其中prices[i]是股票在第i天的价格，请根据这个价格数组，返回买卖股票能获得的最大收益
// 1.你可以买入一次股票和卖出一次股票，并非每天都可以买入或卖出一次，总共只能买入和卖出一次，且买入必须在卖出的前面的某一天
// 2.如果不能获取到任何利润，请返回0
// 3.假设买入卖出均无手续费

/**
  *
  * @param prices int整型一维数组
  * @return int整型
  */
 function maxProfit( prices ) {
    // write code here
    const min = Math.min.apply(null, prices);
    let minprice = 1000000000;
    let maxprofit = 0
    for( let price of prices){
        maxprofit =  Math.max(price - minprice, maxprofit)
        // # 找到最低股票价格
        minprice =  Math.min(price, minprice)
    }
    return maxprofit;
}
module.exports = {
    maxProfit : maxProfit
};