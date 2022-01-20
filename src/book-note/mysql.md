## where
数据库中常用的是where关键字，用于在初始表中筛选查询，获取指定记录。它是一个约束声明，用于约束数据，在返回结果集之前起作用。

## group by 
分组，对select查询出来的结果集按照一个或多个列对结果集进行分组。，获得一组组的集合，然后从每组中取出一个指定字段或者表达式的值。在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。
```SQL
    SELECT column_name, function(column_name)
    FROM table_name
    WHERE column_name operator value
    GROUP BY column_name;
```
    WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计（SUM,AVG,COUNT…）。
    比如，查询每个人登陆总次数，
```SQL
    SELECT coalesce(name, '总数'), SUM(signin) as signin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
```

## having
用于对where和group by查询出来的分组经行过滤，查出满足条件的分组结果。它是一个过滤声明，是在查询返回结果集以后对查询结果进行的过滤操作。

## 执行顺序
select –>where –> group by–> having–>order by

## 大小写
mysql默认不区分大小写，可以通过 binaer关键字指定;
```SQL
select prod_name from products WHERE prod_name REGEXP BINARY 'JetPack .000'
```
## and / or

## update
语句可用来修改表中的数据, 简单来说基本的使用形式为
```SQL
    update 表名称 set 列名称=新值 where 更新条件;
```
以下是在表 students 中的实例:将 id 为 5 的手机号改为默认的 - : 
```SQL
update students set tel=default where id=5;
```
将所有人的年龄增加 1: 
```SQL
    update students set age=age+1;
```
将手机号为 13288097888 的姓名改为 "小明", 年龄改为 19: 
```SQL
    update students setname="小明", age=19 where tel="13288097888";
```
当我们需要将字段中的特定字符串批量修改为其他字符串时，可已使用以下操作：
```SQL
    UPDATE table_name SET field=REPLACE(field, 'old-string', 'new-string') [WHERE Clause]；
```
以下实例将更新 runoob_id 为 3 的runoob_title 字段值的 "C++" 替换为 "Python"：
```SQL
    UPDATE runoob_tbl SET runoob_title = REPLACE(runoob_title, 'C++', 'Python') where runoob_id = 3;
```
## delete
删除 MySQL 数据表中的记录，
## delete，drop，truncate
都有删除表的作用，区别在于：
* 1、delete 和 truncate 仅仅删除表数据，drop 连表数据和表结构一起删除，打个比方，delete 是单杀，truncate 是团灭，drop 是把电脑摔了。
* 2、delete 是 DML 语句，操作完以后如果没有不想提交事务还可以回滚，truncate 和 drop 是 DDL 语句，操作完马上生效，不能回滚，打个比方，delete 是发微信说分手，后悔还可以撤回，truncate 和 drop 是直接扇耳光说滚，不能反悔。
* 3、执行的速度上，drop>truncate>delete，打个比方，drop 是神舟火箭，truncate 是和谐号动车，delete 是自行车。

## like
匹配/模糊匹配，会与 % 和 _ 结合使用。SQL LIKE 子句中使用百分号 %字符来表示任意字符，类似于UNIX或正则表达式中的星号 *。如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的。将 runoob_tbl 表中获取 runoob_author 字段中以 COM 为结尾的的所有记录：
```SQL
    SELECT * from runoob_tbl  WHERE runoob_author LIKE '%COM';
```
* '%a'     //以a结尾的数据
* 'a%'     //以a开头的数据
* '%a%'    //含有a的数据
* '_a_'    //三位且中间字母是a的
* '_a'     //两位且结尾字母是a的
* 'a_'     //两位且开头字母是a的
### 在 where like 的条件查询中，SQL 提供了四种匹配方式。
* %：表示任意 0 个或多个字符。可匹配任意类型和长度的字符，有些情况下若是中文，请使用两个百分号（%%）表示。
* _：表示任意单个字符。匹配单个任意字符，它常用来限制表达式的字符长度语句。
* []：表示括号内所列字符中的一个（类似正则表达式）。指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。
* [^] ：表示不在括号所列之内的单个字符。其取值和 [] 相同，但它要求所匹配对象为指定字符以外的任一个字符。
    查询内容包含通配符时,由于通配符的缘故，导致我们查询特殊字符 “%”、“_”、“[” 的语句无法正常实现，而把特殊字符用 “[ ]” 括起便可正常查询。
## regexp 匹配正则表达式
查找name字段中以'st'为开头的所有数据：
```SQL
SELECT name FROM person_tbl WHERE name REGEXP '^st';
```
查找name字段中以'.t'为开头的所有数据：
```SQL
SELECT name FROM person_tbl WHERE name REGEXP '^\\.t'; --匹配特殊字符 .t
```
## like 和 regexp 区别
// todo
假设目前products如下：
|  prod_name   |
|  ----  |
| JetPack 1000  |
| JetPack 2000  |

```SQL
select prod_name from products where prod_name like '1000' order by prod_name; -- 无结果
select prod_name from products where prod_name regexp '1000' order by prod_name;  -- 返回 JetPack 1000
```

## UNION 语句
用于将不同表中相同列中查询的数据展示出来；（不包括重复数据）；MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。使用形式如下：
```SQL
SELECT 列名称 FROM 表名称 UNION SELECT 列名称 FROM 表名称 ORDER BY 列名称；
```
UNION DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。UNION ALL: 可选，返回所有结果集，包含重复数据；

## order by
对查询结果进行排序，DESC 降序，ASC 升序； 默认情况下，它是按升序排列。

## inner join（内连接,或等值连接）
获取两个表中字段匹配关系的记录。连接以上两张表来读取runoob_tbl表中所有runoob_author字段在tcount_tbl表对应的runoob_count字段值，
```SQL
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a INNER JOIN tcount_tbl b ON a.runoob_author = b.runoob_author; 
```
两个表的交集。
## left join （左连接）
获取左表所有记录，即使右表没有对应匹配的记录。返回坐标所有数据和左右表的交集数据；
## right join （右连接）
 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。

## null 处理
在 MySQL 中，NULL 值与任何其它值的比较（即使是 NULL）永远返回 NULL，即 NULL = NULL 返回 NULL 。MySQL 中处理 NULL 使用 IS NULL 和 IS NOT NULL 运算符。
```SQL
SELECT * from runoob_test_tbl WHERE runoob_count IS NOT NULL;
```

## 事务 transaction 
主要用于处理操作量大，复杂度高的数据；在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。事务用来管理 insert,update,delete 语句一般来说，事务是必须满足4个条件（ACID）：：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。

## alter
（add 新增列、drop 删除列、modify 修改列类型、change 修改列名称、alter 修改字段默认值、rename 修改表名） 
修改数据表名或者修改数据表字段；删除表的 i 字段：
```SQL
ALTER TABLE testalter_tbl  DROP i; 
```
ADD 子句来向数据表中添加列：
```SQL
ALTER TABLE testalter_tbl ADD i INT; 
```
可以再语句后面添加 FIRST 或者 AFTER columnName 来指定新增列的位置。 
```SQL
ALTER TABLE testalter_tbl ADD i INT AFTER c; 
```
如果需要修改字段类型及名称, 你可以在ALTER命令中使用 MODIFY 或 CHANGE 子句 。
```SQL
ALTER TABLE testalter_tbl MODIFY c CHAR(10);
ALTER TABLE testalter_tbl CHANGE i j BIGINT; 
```
如果需要修改字段默认值，
```SQL
ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
``` 
修改数据表类型：
```SQL
ALTER TABLE testalter_tbl ENGINE = MYISAM;  
```
修改表名：
```SQL
ALTER TABLE testalter_tbl RENAME TO alter_tbl;
```
## index 索引
索引可以大大提高MySQL的检索速度；索引分单列索引和组合索引。单列索引，即一个索引只包含单个列，一个表可以有多个单列索引，但这不是组合索引。组合索引，即一个索引包含多个列。实际上，索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。上面都在说使用索引的好处，但过多的使用索引将会造成滥用。因此索引也会有它的缺点：虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。建立索引会占用磁盘空间的索引文件。
```SQL
    create index indexName on table_name (columnName); // 创建
    ALTER table tableName ADD INDEX indexName(columnName) // 修改表结构
    CREATE TABLE mytable(ID INT NOT NULL, username VARCHAR(16) NOT NULL,INDEX [indexName] (username(length))); // 创建时指定
    DROP INDEX [indexName] ON mytable;  // 删除索引
```
## 复制表
SHOW CREATE TABLE  tableName; 显示 create table 的语句详情，复制粘贴即可。
```SQL
    CREATE TABLE targetTable LIKE sourceTable;
    INSERT INTO targetTable SELECT * FROM sourceTable;
```
元数据 查询结果信息、数据库和数据表信息、mysql服务器信息；

## 导出数据
```SQL
select * from tableName into outfile 'a.txt';
```
## 导入数据
```SQL
load data infile；
```

## 计算字段
存储在表中的数据都不是应用程序所需要的。 我们需要直接从数据库中检索出转换、计算或格式化过的数据;而不是检索出数据，然后再在客户机应用程序或报告程序中重新格式化。
### 拼接 concat
将值连结到一起构成单个值。
```SQL
    select concat(prod_name,' (',prod_id, ')') from products order by prod_name; --商品(id)
```
### RTrim
删除值右侧的所有空格。
```SQL
    select concat(RTrim(prod_name),' (', RTrim(prod_id), ')') from products order by prod_name; --商品(id)
```
### LTrim
删除值左侧的所有空格。
```SQL
    select concat(LTrim(prod_name),' (', LTrim(prod_id), ')') from products order by prod_name; --商品(id)
```
### Trim
删除值左右两侧的所有空格。
```SQL
    select concat(Trim(prod_name),' (', Trim(prod_id), ')') from products order by prod_name; --商品(id)
```
### 为计算字段新起别名
比如将列名从 concat(Trim(prod_name),' (', Trim(prod_id), ')') 改为 prod_title。
```SQL
    select concat(Trim(prod_name),' (', Trim(prod_id), ')') as prod_title from products order by prod_name; --商品(id)
```
### 执行算数计算
主要包括 +、-、*、/、abs()、Now()……
```SQL
    select prod_name, quantity, item_price,  quantity * item_price as expanded_price from products order by prod_name = 'test'; --该商品的
```
## 数据处理函数（MYSQL必知必会-第11章）

```SQL
    select prod_name, Upper(prod_name) from products; --转换成大写
```
|  文本函数   |  说明   |
|  ----  |  ----  |
| Left() | 返回串左边的字符  |
| Right() | 返回串右边的字符  |
| Length() | 返回串的长度   |
| Locate() | 找出串的一个子串  |
| Lower() | 将串转换为小写   |
| Upper() | 将串转换为大写   |
| Soundex() | 返回串的SOUNDEX值   |
| SubString() | 返回子串的字符   |
|  日期函数   |  说明   |
| DateDiff() | 计算两个日期之差   |
| Day() | 返回一个日期的天数部分   |
| Year() | 返回一个日期的年份部分   |
| CurTime() | 返回当前时间   |
|  数值处理函数   |  说明   |
| Abs() | 返回一个数的绝对值   |
| Cos() | 返回一个角度的余弦   |
| Exp() | 返回一个数的指数值   |
| Sqrt() | 返回一个数的平方根   |


注释：SOUNDEX是一个将任何文本串转换为描述其语音表示的字母数字模式的算法。SOUNDEX考虑了类似的发音字符和音节，使得能对串进行发音比较而不是字母比较。虽然 SOUNDEX不是SQL概念，但MySQL(就像多数DBMS一样)都提供对SOUNDEX的支持。
MySQL使用的日期格式。无论你什么时候指定一个日期，不管是插入或更新表值还是用WHERE子句进行过滤，日期必须为 格式yyyy-mm-dd。

## 汇总数据 - 聚集函数
|  函数   |  说明   |
|  ----  |  ----  |
| avg() | 返回某列平均数  |
| count() | 返某列行数  |
| max() | 返回某列最大值   |
| min() | 返回某列最小值 |
| sum() | 返回某列和  |
```SQL
    select avg(distinct prod_price) from products where vend_id = 1003;
```

## 分组数据
