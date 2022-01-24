## 安装
mac：去官网下载安装包，安装
安装 -> 系统偏好设置 –> 点击最下方mysql  start mysql server   /usr/local/MySQL/bin/mysql -u root -p *******zyr

## mysql引擎
* InnoDB是一个可靠的事务处理引擎(参见第26章)，它不支持全文本搜索;
* MEMORY在功能等同于MyISAM，但由于数据存储在内存(不是磁盘)中，速度很快(特别适合于临时表);
* MyISAM是一个性能极高的引擎，它支持全文本搜索(参见第18章)，但不支持事务处理。
* 混用引擎类型。

## where
数据库中常用的是where关键字，用于在初始表中筛选查询，获取指定记录。它是一个约束声明，用于约束数据，在返回结果集之前起作用。

## 分组数据 group by
### 创建分组
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
* GROUP BY子句可以包含任意数目的列。这使得能对分组进行嵌套， 为数据分组提供更细致的控制。
* 如果在GROUP BY子句中嵌套了分组，数据将在最后规定的分组上 进行汇总。换句话说，在建立分组时，指定的所有列都一起计算(所以不能从个别的列取回数据)。
* GROUP BY子句中列出的每个列都必须是检索列或有效的表达式(但不能是聚集函数)。如果在SELECT中使用表达式，则必须在 GROUP BY子句中指定相同的表达式。不能使用别名。
* 除聚集计算语句外，SELECT语句中的每个列都必须在GROUP BY子 句中给出。
* 如果分组列中具有NULL值，则NULL将作为一个分组返回。如果列 中有多行NULL值，它们将分为一组。
* GROUP BY子句必须出现在WHERE子句之后，ORDER BY子句之前。

### 过滤分组 having
```SQL
    SELECT cust_id, count(*) as orders from orders groupby cust_id having count(*) > 2;
```
用于对where和group by查询出来的分组经行过滤，查出满足条件的分组结果。它是一个过滤声明，是在查询返回结果集以后对查询结果进行的过滤操作。
MySQL为此目的提供了另外的子 句，那就是HAVING子句。HAVING非常类似于WHERE。事实上，目前为止所 学过的所有类型的WHERE子句都可以用HAVING来替代。唯一的差别是 WHERE过滤行，而HAVING过滤分组。WHERE在数据 分组前进行过滤，HAVING在数据分组后进行过滤。

## 执行顺序
select -> from –> where –> group by –> having –> order by -> limit

## 大小写
mysql默认不区分大小写，可以通过 binaer关键字指定;
```SQL
select prod_name from products WHERE prod_name REGEXP BINARY 'JetPack .000';
```
## and / or

## 更新数据 update
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
    update students set name="小明", age=19 where tel="13288097888";
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
```SQL
   delete from customers where cust_id = 10086;
```

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

## 组合查询 UNION
有两种基本情况，其中需要使用组合查询:
* 在单个查询中从不同的表返回类似结构的数据;
* 对单个表执行多个查询，按单个查询返回数据。
用于将不同表中相同列中查询的数据展示出来；（不包括重复数据）；
MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。使用形式如下：
```SQL
    -- SELECT 列名称 FROM 表名称 UNION SELECT 列名称 FROM 表名称 ORDER BY 列名称；
    -- 查询价格小于等于5的所有物品的一个列表
    select vend_id, prod_name, prod_price from products where prod_price <= 5 union select vend_id, prod_name, prod_price from products where vend_id in (1001, 1002) order by prod_price;
    select vend_id, prod_name, prod_price from products where prod_price <= 5 or vend_id in (1001, 1002) order by prod_price;
```
UNION DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。
UNION ALL: 可选，返回所有结果集，包含重复数据；
* UNION必须由两条或两条以上的SELECT语句组成，语句之间用关键字UNION分隔(因此，如果组合4条SELECT语句，将要使用3个 UNION关键字)。
* UNION中的每个查询必须包含相同的列、表达式或聚集函数(不过各个列不需要以相同的次序列出)。
* 列数据类型必须兼容:类型不必完全相同，但必须是DBMS可以隐含地转换的类型(例如，不同的数值类型或不同的日期类型)。

## order by
对查询结果进行排序，DESC 降序，ASC 升序； 默认情况下，它是按升序排列。

## 联结表 join
通过外键联结
### 创建联结
```SQL
    ---在引用的列可能出现二义性时，必须使用完 全限定列名(用一个点分隔的表名和列名)。应该保证所有联结都有WHERE子句
    select vend_name, prod_name, prod_price from vendors, products where vendors.vend_id = products.vend_id order by vend_name, prod_name;
    -- 与上一句效果相同，内联结（等值联结）
    select vend_name, prod_name, prod_price from vendors inner join products on vendors.vend_id = products.vend_id order by vend_name, prod_name;
    ---笛卡儿积(cartesian product) 由没有联结条件的表关系返回的结果为笛卡儿积。检索出的行的数目将是第一个表中的行数乘 以第二个表中的行数。
    select vend_name, prod_name, prod_price from vendors, products order by vend_name, prod_name;
    -- 显示编号为20005的订单中的物品
    select vend_name, prod_name, prod_price, quantity from vendors, orderitems, products where vendors.vend_id = products.vend_id and orderitems.prod_id = products.prod_id and order_num = 20005;
```
### inner join（内连接,或等值连接）
获取两个表中字段匹配关系的记录。连接以上两张表来读取runoob_tbl表中所有runoob_author字段在tcount_tbl表对应的runoob_count字段值，
```SQL
    SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a INNER JOIN tcount_tbl b ON a.runoob_author = b.runoob_author; 
```
两个表的交集。
### 自连接
```SQL
    --找出商品ID为DTNTR的供应商的所有商品，使用别名
    select prod_id, prod_name from products where vend_id = (select vend_id from products where prod_id = 'DTNTR');
    -- 👇🏻
    select p1.prod_id, p1.prod_name from products as p1, products as p2  where p1.vend_id = p2.vend_id and p2.prod_id = 'DTNTR';
```
### 自然联结
标准的联结(前一章中介绍的内部联结)返回所有数据，甚至相同的列多次出现。
自然联结排除多次出现，使每个列只返回一次。
```SQL
    -- 在这个例子中，通配符只对第一个表使用。所有其他列明确列出，所以没有重复的列被检索出来。
    select c.*, o.order_num, o.order_date, oi.prod_id, oi.quantity, oi.item_price from customers as c, orders as o, orderitems as oi where c.cust_id = o.cust_id and oi.order_num = o.order_num and prod_id = 'fb';
```
### 外部联结
联结包含了那些在相关表中没有关联行的行。这种类型的联结称为外部联结。
```SQL
    -- 检索所有客户及其订单 --> 内部联结
    select customers.cust_id, orders.order_num from customers inner join orders on customers.cust_id = orders.cust_id;
    -- 检索所有客户，包括那些没有订单的客户，不存在的会显示null --> 内部联结
    select customers.cust_id, orders.order_num from customers left outer join orders on customers.cust_id = orders.cust_id;
```
#### 外部联结 -- left join （左连接）
获取左表所有记录，即使右表没有对应匹配的记录。返回坐标所有数据和左右表的交集数据；
#### 外部联结 -- right join （右连接）
 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。
### 带聚集函数的联结
```SQL
    -- 检索所有客户及每个客户所下的订单数
    select customers.cust_id, customers.cust_name, count(orders.order_num) as num_ord from customers inner join orders on customers.cust_id = orders.cust_id group by customers.cust_id;
    -- 检索所有客户及每个客户所下的订单数,包括那些没有订单的客户
    select customers.cust_id, customers.cust_name, count(orders.order_num) as num_ord from customers left outer join orders on customers.cust_id = orders.cust_id group by customers.cust_id;
```

## null 处理
在 MySQL 中，NULL 值与任何其它值的比较（即使是 NULL）永远返回 NULL，即 NULL = NULL 返回 NULL 。MySQL 中处理 NULL 使用 IS NULL 和 IS NOT NULL 运算符。
```SQL
    SELECT * from runoob_test_tbl WHERE runoob_count IS NOT NULL;
```

## 事务 transaction 
主要用于处理操作量大，复杂度高的数据；在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。事务用来管理 insert,update,delete 语句一般来说，事务是必须满足4个条件（ACID）：：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。
* 事务(transaction)指一组SQL语句;
* 回退(rollback)指撤销指定SQL语句的过程;
* 提交(commit)指将未存储的SQL语句结果写入数据库表;
* 保留点(savepoint)指事务处理中设置的临时占位符(place-holder)，你可以对它发布回退(与回退整个事务处理不同)。
```SQL
    start transaction;
    set autocommit = 0; --不自动提交更改
    operation ZZZ;
    rollback; -- 直接回滚
    operations XXX;
    savepoint A;
    operations YYY;
    commit;
    rollback to A;
    savepoint B;
    release savepoint B; --删除指定savepoint
```

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
定义外键：
```SQL
ALTER TABLE orderitems add constraint fk_orderitems_orders foreign key(order_num) references orders (order_num);
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
https://forta.com/books/0672327120/

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

## 订单数据库
本节示例的数据库描述：该数据库表是关系表。
vendors表：存储销售产品的供应商
|  列   |  说明   |
|  ----  |  ----  |
| vend_id | 唯一的供应商ID，自动增量的主键  |
| vend_name | 供应商名  |
| vend_address | 供应商的地址   |
| vend_city | 供应商的城市 |
| vend_state | 供应商的州  |
| vend_zip | 供应商的邮政编码  |
| vend_country | 供应商的国家  |

products 表：包含产品目录，每行一个产品
|  列   |  说明   |
|  ----  |  ----  |
| prod_id | 唯一的产品ID   |
| vend_id | 产品供应商ID(关联到vendors表中的vend_id)  |
| prod_name | 产品名  |
| prod_price | 产品价格 |
| prod_desc | 产品描述  |

customers 表：存储所有顾客的信息
|  列   |  说明   |
|  ----  |  ----  |
|  cust_id | 唯一的顾客ID，自动增量的主键   |
|  cust_name | 顾客名  |
|  cust_address   |   顾客的地址  |
|  cust_city   |   顾客的城市  |
|  cust_state   |   顾客的州  |
|  cust_zip   |   顾客的邮政编码  |
|  cust_country   |   顾客的国家  |
|  cust_contact   |   顾客的联系名  |
|  cust_email   |   顾客的联系email地址  |
      
orders 表：储顾客订单(但不是订单细节)。每个订单唯一地编号 (order_num列)。订单用cust_id列(它关联到customer表的顾客唯一ID)与相应的顾客关联。
|  列   |  说明   |
|  ----  |  ----  |
|  order_num | 唯一订单号，自动增量的主键   |
|  order_date | 订单日期  |
|  cust_id   |   订单的顾客ID，(关系到customers表的 cust_id)  |

orderitems 表：存储每个订单中的实际物品，每个订单的每个物品占一行。order_num和order_item作为其主键，prod_id上定义外键，关联它到products 的prod_id。
|  列   |  说明   |
|  ----  |  ----  |
|  order_num  |  订单号(关联到orders表的order_num) |
|  order_item  |  订单物品号(在某个订单中的顺序) |
|  prod_id  |  产品ID(关联到products表的prod_id) |
|  quantity  |  物品数量 |
|  item_price  |  物品价格 |

productnotes表：存储与特定产品有关的注释。并非所有产品都有相 关的注释，而有的产品可能有许多相关的注释。列note_text必须为FULLTEXT搜索进行索引，由于这个表使用全文本搜索，因此必须指定ENGINE=MyISAM。
|  列   |  说明   |
|  ----  |  ----  |
|  note_id    |  唯一注释ID，主键   |
|  prod_id    |  产品ID(对应于products表中的prod_id)   |
|  note_date    |  增加注释的日期   |
|  note_text    |  注释文本   |
  
## 子查询
示例1：列出订购物品 TNT2 的所有客户
```SQL
    select * from customers where cust_id in
        (select cust_id from orders where order_num in
            (select order_num from orderitems where  prod_id = 'TNT2'));
    select * from customers, orders, orderitems where customers.cust_id = orders.cust_id and orderitems.order_num = orders.order_num and prod_id = 'TNT2';
        
```
在SELECT语句中，子查询总是从内向外处理。子查询一般用 IN  操作符结合使用，但是也可以用于测试 = <> 等。

示例2：需要显示 customers 表中每个客户的订单总数。
```SQL
    -- 相关子查询：涉及外部查询的子查询。任何时候只要列名可能有多义性，就必须使用这种语法。
    -- 需要比较这两个列以正确地把订单与它们相应的顾客匹配，新生成了计算字段 orders
    select cust_name, (select count(*) from orders where orders.cust_id = customers.cust_id) as orders from customers order by cust_name;
    
    select cust_name, (select count(*) as order_num from orders where orders.cust_id = customers.cust_id group by cust_name) as orderss  from customers order by cust_name;
```
* 第一句                          第二句
+----------------+--------+ |     +----------------+---------+
| cust_name      | orders | |    | cust_name      | orderss |
+----------------+--------+ |    +----------------+---------+
| Coyote Inc.    |      2 | |    | Coyote Inc.    |       2 |
| E Fudd         |      1 | |    | E Fudd         |       1 |
| Mouse House    |      0 | |    | Mouse House    |    NULL |
| Wascals        |      1 | |    | Wascals        |       1 |
| Yosemite Place |      1 | |    | Yosemite Place |       1 |
+----------------+--------+      +----------------+---------+

## 全文本搜索
MySQL 支持几种基本的数据库引擎。并非所有的引擎都支持本书所描述的全文本搜索。两个最常使用的引擎为MyISAM和InnoDB， 前者支持全文本搜索，而后者不支持。这就是为什么虽然本书 中创建的多数样例表使用InnoDB，而有一个样例表(productnotes表)却使用MyISAM的原因。
LIKE关键字，它利用通配操作符匹配文本(和部分文 本)。使用LIKE，能够查找包含特殊值或部分值的行。
正则表达式基于文本的搜索，作为匹配列值的更进一步的介绍。使用正则表达式，可以编写查找所需行的非常复杂的匹配模 式。
虽然这些搜索机制非常有用，但存在几个重要的限制：
* 性能——通配符和正则表达式匹配通常要求MySQL尝试匹配表中所有行(而且这些搜索极少使用表索引)。因此，由于被搜索行数不断增加，这些搜索可能非常耗时。
* 明确控制——使用通配符和正则表达式匹配，很难(而且并不总是能)明确地控制匹配什么和不匹配什么。例如，指定一个词必 须匹配，一个词必须不匹配，而一个词仅在第一个词确实匹配的 情况下才可以匹配或者才可以不匹配。
* 智能化的结果——虽然基于通配符和正则表达式的搜索提供了非 常灵活的搜索，但它们都不能提供一种智能化的选择结果的方法。 例如，一个特殊词的搜索将会返回包含该词的所有行，而不区分 包含单个匹配的行和包含多个匹配的行(按照可能是更好的匹配 来排列它们)。类似，一个特殊词的搜索将不会找出不包含该词但 包含其他相关词的行。
在使用 全文本搜索时，MySQL不需要分别查看每个行，不需要分别分析和处理每个词。MySQL创建指定列中各词的一个索引，搜索可以针对这些词进行。这样，MySQL可以快速有效地决定哪些词匹配(哪些行包含它们)，哪些词不匹配，它们匹配的频率，等等。

为了进行全文本搜索，必须索引被搜索的列，而且要随着数据的改 变不断地重新索引。在对表列进行适当设计后，MySQL会自动更新所有的索引和重新索引。
在索引之后，SELECT可与Match()和Against()一起使用以实际执行 搜索。
### 启用全文本搜索支持
创建table的时候，对需要搜索的列添加 FULLTEXT。为了进行全文本搜索， MySQL根据子句FULLTEXT(note_text)的指示对它进行索引。这里的FULLTEXT索引单个列，如果需要也可以指定多个列。在定义之后，MySQL自动维护该索引。在增加、更新或删除行时，索引随之自动更新。
```SQL
    CREATE TABLE productnotes
    (
    note_id    int           NOT NULL AUTO_INCREMENT,
    prod_id    char(10)      NOT NULL,
    note_date datetime       NOT NULL,
    note_text  text          NULL ,
    PRIMARY KEY(note_id),
    FULLTEXT(note_text)
    ) ENGINE=MyISAM;
```
注意：不要在导入数据时使用FULLTEXT 更新索引要花时间，虽然不是很多，但毕竟要花时间。如果正在导入数据到一个新表， 此时不应该启用FULLTEXT索引。应该首先导入所有数据，然后再修改表，定义FULLTEXT。这样有助于更快地导入数据(而且使索引数据的总时间小于在导入每行时分别进行索引所需的总时间)。

### 进行全文本搜索
在索引之后，使用两个函数Match()和Against()执行全文本搜索，其中Match()指定被搜索的列，Against()指定要使用的搜索表达式。
传递给Match()的值必须与FULLTEXT()定义中的相同。如果指定多个列，则必须列出它们(而且次序正确)。
```SQL
    select note_text from productnotes where note_te like '%rabit%';
    select note_text from productnotes where note_te REGEXP BINARY 'rabit';
    select note_text from productnotes where match(note_text) against('rabit'); -- 全文本搜索的一个重要部分就是对结果排序。具有较高等级的行先返回
    -- todo
    select note_text, match(note_text) against('rabit') as rank from productnotes; -- 所有行都被返回(因为没有WHERE子句),Match()和Against() 用来建立一个计算列(别名为rank)，此列包含全文本搜索计算出的等级值。等级由MySQL根据行中词的数目、唯一词的数目、整个索引中词的总数以及包含该词的行的数目计算出来。正如所见，不包含词rabbit的行等级为0(因此不被前一例子中的WHERE子句选择)。确实包含词rabbit 的两个行每行都有一个等级值，文本中词靠前的行的等级值比词靠后的行的等级值高。
```
全文本搜索提供了简单LIKE搜索不能提供的功能。而且，由于数据是索引的，全文本搜索还相当快。
### 使用查询扩展
查询扩展用来设法放宽所返回的全文本搜索结果的范围。在使用查询扩展时，MySQL对数据和索引进行两遍扫描来完成搜索:
* 首先，进行一个基本的全文本搜索，找出与搜索条件匹配的所有 行;
* 其次，MySQL检查这些匹配行并选择所有有用的词(我们将会简要地解释MySQL如何断定什么有用，什么无用)。
* 再其次，MySQL再次进行全文本搜索，这次不仅使用原来的条件， 而且还使用所有有用的词。
```SQL
    select note_text from productnotes where match(note_text) against('anvils');
    select note_text from productnotes where match(note_text) against('anvils' with query expansion) ; --这次返回了7行。第一行包含词anvils，因此等级最高。第二行与anvils无关，但因为它包含第一行中的两个词(customer和recommend)，所以也被检索出来。第3行也包含这两个相同的词，但它们在文本中的位置更靠后且分开得更远，因此也包含这一行，但等级为第三。第三行确实也没有涉及anvils(按它们的产品名)。
```
### 布尔文本搜索
```SQL
    select note_text from productnotes where match(note_text) against('anvils -rope*' in boolean mode); -- 匹配包含anvils但不包含任意以rope开始的词的行
```
全文本布尔操作符
|  全文本布尔操作符  |   说 明  |
|  ----  |  ----  |
|  +   |  包含，词必须存在  |  
|  -   |  排除，词必须不出现  |  
|  >   |  包含，而且增加等级值  |  
|  <   |  包含，且减少等级值  |  
|  ()   |  把词组成子表达式(允许这些子表达式作为一个组被包含、排除、排列等)  |  
|  ~   |  取消一个词的排序值  |  
|  *   |  词尾的通配符  |  
|  ""   |  定义一个短语(与单个词的列表不一样，它匹配整个短语以便包含或排除这个短语)  |  

## 视图 view
视图是虚拟的表。与包含数据的表不一样，视图只包含使用时动态检索数据的查询。
```SQL
    select * from customers, orders, orderitems where customers.cust_id = orders.cust_id and orderitems.order_num = orders.order_num and prod_id = 'TNT2';              
```
此查询用来检索订购了某个特定产品的客户。任何需要这个数据的人都必须理解相关表的结构，并且知道如何创建查询和对表进行联结。 为了检索其他产品(或多个产品)的相同数据，必须修改最后的WHERE子句。
现在，假如可以把整个查询包装成一个名为productcustomers的虚拟表，则可以如下轻松地检索出相同的数据:
```SQL
    select * from productcustomers where prod_id = 'TNT2';              
```
productcustomers是一个视图，作为视图，它不包含表中应该有的任何列或数据，它包含的是一个SQL查询(与上面用以正确联结表的相同的查询)。
视图应用场景：
* 重用SQL语句。
* 简化复杂的SQL操作。在编写查询后，可以方便地重用它而不必知道它的基本查询细节。
* 使用表的组成部分而不是整个表。
* 保护数据。可以给用户授予表的特定部分的访问权限而不是整个表的访问权限。
* 更改数据格式和表示。视图可返回与底层表的表示和格式不同的数据。
在视图创建之后，可以用与表基本相同的方式利用它们。可以对视图执行SELECT操作，过滤和排序数据，将视图联结到其他视图或表，甚至能添加和更新数据。
视图仅仅是用来查看存储在别处的数据的一种设施。视图本身不包含数据，因此它们返回的数据是从其他表中检索出来的。在添加或更改这些表中的数据时，视图将返回改变过的数据。

视图的规则和限制：
* 与表一样，视图必须唯一命名(不能给视图取与别的视图或表相同的名字)。
* 对于可以创建的视图数目没有限制。
* 为了创建视图，必须具有足够的访问权限。这些限制通常由数据库管理人员授予。
* 视图可以嵌套，即可以利用从其他视图中检索数据的查询来构造一个视图。
* ORDER BY可以用在视图中，但如果从该视图检索数据SELECT中也含有ORDER BY，那么该视图中的ORDER BY将被覆盖。
* 视图不能索引，也不能有关联的触发器或默认值。
* 视图可以和表一起使用。例如，编写一条联结表和视图的SELECT语句。
```SQL
    -- 创建视图 create view viewname as sql语句;
    create view productcustomers as select * from customers, orders, orderitems where customers.cust_id = orders.cust_id and orderitems.order_num = orders.order_num ;
    -- 显示视图语句
    show create view viewname;
    -- 删除视图
    drop view;
    -- 更新视图，并非所有视图都是可更新的，视图中有分组查询、子查询、联结、并、聚集函数、distinct、导出操作的，不能那个更新
    create or replace view viewname as XXX;
```

## 存储过程
存储过程简单来说，就是为以后的使用而保存的一条或多条MySQL语句的集合。可将其视为批文件，虽然它们的作用不仅限于批处理。
使用存储过程有3个主要的好处，即简单、安全、高性能。
### 创建存储过程
```SQL
    -- 返回产品平均价格的存储过程
    create procedure productpricing() 
    begin 
        select avg(prod_price) as proceaverage from products;
    end;
    -- 传参版本，出参
    create procedure productpricing(
        out pl decimal(8,2),
        out ph decimal(8,2),
        out pa decimal(8,2),
    ) 
    begin 
        select min(prod_price) into pl from products;
        select max(prod_price) into ph from products;
        select avg(prod_price) into pa from products;
    end;
    -- 入参版本
    create procedure ordertotal(
        in onumber int,
        out ototal decimal(8,2),
    ) 
    begin 
        select sum(item_price * quantity) from orderitems where order_num = onumber into ototal;
    end;
    -- 调用
    call ordertotal(20005, @total);
    select  @total;
```
此存储过程名为 productpricing，用CREATE PROCEDURE productpricing()语句定义。如果存储过程接受参数，它们将在()中列举出来。此存储过程没有参数，但后跟的()仍然需要。BEGIN和END语句用来限定存储过程体，过程体本身仅是一个简单的SELECT语句。
### 执行存储过程
CALL接受存储过程的名字以及需要传递给它的任意参数。
```SQL
    call productpricing(@pricelow, @pricehigh, @priceaverage); --所有MySQL变量都必须以@开始
    select @priceaverage;
```
执行名为productpricing的存储过程，它计算并返回产品的最低、最高和平均价格。
### 删除存储过程
存储过程在创建之后，被保存在服务器上以供使用，直至被删除。
```SQL
    drop procedure productpricing if exists;
```

## 使用游标 cursor
不像多数DBMS，MySQL游标只能用于 存储过程(和函数)。
游标用DECLARE语句创建(参见第23章)。DECLARE命名游标，并定义相应的SELECT语句，根据需要带WHERE和其他子句。例如，下面的语句定义了名为ordernumbers的游标，使用了可以检索所有订单的SELECT语句：
```SQL
    -- 穿件游标
    create procedure processorders()
    begin
        declare ordernumbers cursor
        for
        select order_num from orders;
    end;
    -- 打开游标
    open ordernumbers;
    -- 关闭游标
    close ordernumbers;
```
存储过程处理完成后，游标就消失(因为它局限于存储过程)。
CLOSE释放游标使用的所有内部内存和资源，因此在每个游标 不再需要时都应该关闭。

## 触发器
触发器是MySQL响应以下任意语句而自动执行的一条MySQL语句(或位于BEGIN和END语句之间的一组语句):
* DELETE;
* INSERT;
* UPDATE。
其他MySQL语句不支持触发器。
每个表每个事件每次只允许一个触发器。因此，每个表最多支持6个触发器(每条INSERT、UPDATE 和DELETE的之前和之后)。
在创建触发器时，需要给出4条信息:
* 唯一的触发器名,触发器名必须在每个表中唯一，但不是在每个数据库中唯一;
* 触发器关联的表，只有表才支持触发器，视图不支持(临时表也不支持);
* 触发器应该响应的活动(DELETE、INSERT或UPDATE);
* 触发器何时执行(处理之前或之后)。
```SQL
    create trigger newproduct after insert/update/delete on products for each row select 'product added';
    create trigger newproduct before insert/update/delete on products for each row select 'product added';
    drop trigger newproduct; --触发器不能更新或覆盖
```
create trigger用来创建名为newproduct的新触发器。触发器可在一个操作发生之前或之后执行，这里给出了AFTER INSERT， 所以此触发器将在INSERT语句成功执行后执行。这个触发器还指定FOR EACH ROW，因此代码对每个插入行执行。在这个例子中，文本Product added将对每个插入的行显示一次。

## 全球化和本地化
介绍MySQL处理不同字符集和语言的基础知识。
数据库表被用来存储和检索数据。不同的语言和字符集需要以不同的方式存储和检索。因此，MySQL需要适应不同的字符集(不同的字母和字符)，适应不同的排序和检索数据的方法。
MySQL支持众多的字符集。为查看所支持的字符集完整列表，使用以下语句: show character set; 这条语句显示所有可用的字符集以及每个字符集的描述和默认校对。
查看所支持校对的完整列表 show collation;


## 安全管理
给用户提供他们所需的访问权，且仅提供他们所需的访问权。这就是所谓的访问控制，管理访问控制需要创建和管理用户账号。
```SQL
    select * from user;
    create user A identified by 'p@qqqqq'
```
## 数据库维护

## 改善性能