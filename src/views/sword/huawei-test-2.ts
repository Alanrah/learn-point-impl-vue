/* todo
    AB两组比赛，每组三人，已知AB组各人的能力值，一共进行三轮，目的是输出A赢的次数最多的出场顺序
    如果有多种选择，优先让能力值底的人先出场
    若能力值相同，因为B是上一届冠军，默认B赢
    输入两行：
    A [500,10,100]
    B [600,5,90]
    A最多赢两场，出场顺序输出应该是 [10, 100, 500]，
    其实[10,500,100],[500,10,100],[100,10,500]也满足条件，但是多种选择是时，让能力值底的人先出场
    如果A一场都赢不了，就输出‘empty’
*/