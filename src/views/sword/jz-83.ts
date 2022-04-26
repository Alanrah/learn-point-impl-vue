// .剪绳子（进阶版） todo
class Solution {
    public:
        /**
         * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
         *
         *
         * @param number long长整型
         * @return long长整型
         */
        long long cutRope(long long number) {
            if (number == 2) return 1;
            if (number == 3) return 2;

            if (number % 3 == 0) {
                return pow(3, number / 3);
            } else if (number % 3 == 1) {
                return 4 * pow(3, (number - 4) / 3) % 998244353;
            } else {
                return (2 * pow(3, (number - 2) / 3)) % 998244353;
            }
        }

            //计算a^n次方的结果
        long long pow(long a, long n) {
            long long ans = 1;
            while (n > 0) {
                if (n % 2 == 1) ans = (ans * a) % 998244353;
                a = (a * a) % 998244353;
                // 自身乘以自身，快速计算
                n /= 2;
            }
            return ans;
        }
    };