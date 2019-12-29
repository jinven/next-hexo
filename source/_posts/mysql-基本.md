---
title: mysql-基本
date: 2019-12-29 16:07:11
tags:
---

## 1. 用户管理

用户表 `user` 存在初始数据库 `mysql` 中：

```sql
show databases;
use mysql;
show tables;
select * from user;
```

1. 查看所有用户

```sql
select user, host, authentication_string fom mysql.user;
```

<!-- more -->

2. 创建用户

```sql
CREATE USER 'auser'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
CREATE USER 'auser'@'%' IDENTIFIED BY '123456';
CREATE USER 'buser' IDENTIFIED BY '123456;
```

```
% - 无限制，不填默认
localhost - 通过UNIXsocket连接，只能本机访问
127.0.0.1 - 通过TCP/IP协议连接，只能本机访问
::1 - 兼容支持ipv6
```

3. 修改用户名

```sql
rename buser to cuser;
update mysql.user set user='cuser' where user='buser';
```

4. 删除用户

```sql
drop user cuser;
delete from mysql.user where user='cuser';
```

5. 修改密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
alter user buser identified by '123456';
```

6. 查看用户权限

```sql
show grants for buser;
```

7. 赋予权限

dmc_db数据库的select： `grant select on dmc_db.* to buser;`

所有权限： `GRANT ALL PRIVILEGES ON *.* TO 'buser'@'%';`
基本权限： `GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER ON *.* TO 'buser'@'%';`

```sql
select, insert, update, delete, create, alter, drop, references, index, show view, create view, create routine, alter routine, execute, all, lock tables, process, reload, replication client, replication slave, show databases, shutdown, super, usage
```

8. 回收权限

```sql
revoke select on dmc_db.* from buser;
revoke all ON *.* FROM 'buser'@'%';
```

9. 更新权限

```sql
flush privileges;
```

## 2. select、关联查询、子查询、联合查询、查询排序、分组查询、条件查询

常量查询：

```sql
select 1;
select 1 'a';
select 1 as 'a';
select 1=1 as a, 2<>3 as b, 2!=3 as c, 4>5 as d, 6<7 as e, 8>=9 as f, 10<=11 as g;
select ifnull(null, 2);
```

- 服务器版本： `select version()`
- 当前数据库： `select database()`
- 当前用户名： `select user()`
- 服务器状态： `show status`
- 服务器配置变量： `show variables`
- 第一个字符的ASCII码：select `ascii('a')`
- 字符串字数： `select char_length('abc');select character_length('abc')`
- 字符串合并： `select concat('ab','cd','ef',...);select concat_ws(',','a','b',...)`
- 第一个字符串的位置： `select field('d','a','b','c','d','e')`
- 格式化数字： `select format(123456.789, 2)`
- 字符串替换： `select insert(s1, index, len, s2)`
- 字符串位置获取： `select locate('st', 'myteststring')`
- 转为小写： `select lcase('ABCDEFG');select lower('ABCDE')`
- 前n个字符： `select left('abcdefg', 2)`
- 字符左填充： `select lpad('abc', 10, 'x')`
- 去除开始空格： `select ltrim('   abc')`
- 字符串截取： `select mid('abcdefg', 3, 2);select substr(s, start, length);select substring(s, start, length)`
- 字符串重复： `select repeat('abc',5)`
- 顺序取反： `select reverse('abcdefg')`
- 后n个字符： `select right('abcdefg',5)`
- 字符右填充： `select rpad('abc', 10, 'z')`
- 去除结尾空格： `select rtrim('abc     ')`
- 取n个空格： `select space(n)`
- 字符串比较： `select strcmp('a','b')`
- 字符检索： `select substring_index('a*b', '*', 1);select substring_index(substring_index('a*b*c*d*e','*',3), '*', -1)`
- 去除开始结尾空格： `select trim(s)`
- 转为大写： `select ucase(s);select upper(s)`
- 绝对值： `abs(x)`
- 反余： `acos(x)`
- 反正弦： `asin(x)`
- 反正切： `atan(x)、atan2(n, m)`
- 平均值： `avg(expression)`
- 最小整数： `ceil(x)、ceiling(x)`
- 余弦： `cos(x)`
- 余切： `cot(x)`
- 总数： `count(expression)`
- 弧度转角度： `degrees(x)`
- 整除： `n DIV m`
- e的x次方： `exp(x)`
- 最大整数： `floor(x)`
- 列表最大值： `greatest(expr1, expr2, expr3, ...)`
- 列表最小值： `least(expr1, expr2, expr3,...)`
- 自然对数： `ln(x)、log(x)、log10(x)、log10(x)、log2(x)`
- 最大值： `max(expression)`
- 最小值： `min(expression)`
- 余数： `mod(x, y)`
- 圆周率： `PI()`
- x的y次方： `pow(x, y)、power(x, y)`
- 角度转弧度： `radians(x)，`
- 0到1随机数： `rand()`
- 离x最近的整数： `round(x)`
- x的符号： `sign(x)，`
- 正弦： `sin(x)`
- 平方根： `sqrt(x)`
- 总和： `sum(expression)`
- 正切： `tan(x)`
- 小数四舍五入： `truncate(x, y`

```
adddate(d, n)           日期d加上n天        select adddate('2019-10-10', interval 10 day);
addtime(t, n)           时间t加上n秒        select addtime('2019-10-10 12:34:56', 5);
curdate()               当前日期
current_date()          当前日期
current_time()          当前时间
current_timestamp()     当前日期和时间
curtime()               当前时间
date(s)                 取得时间            select date('2019-10-10');
datediff(d1, d2)        日期相隔天数        select datediff('1949-10-10','2019-10-10');
date_add(d, n)          日期加上时间段
day(d)                  日期d的天数部分      select day('2019-10-11');
dayname(d)              日期d是星期几
dayofmonth(d)           日期d是月份中第几天
dayofweek(d)            日期d是星期几
dayofyear(d)            日期d是年所在第几天
extract(type from d)    日期d返回指定格式值     select extract(minute from '2019-10-10 12:34:56');
from_days(n)
hour(t)
last_day(d)
localtime()
localtimestamp()
makedate(year, day-of-year)
maketime(hour, minute, second)
microsecond(date)
minute(t)
monthname(d)
month(d)
now()                   当前日期和时间
period_add(period, n)
period_diff(p1, p2)
quarter(d)
second(t)
sec_to_time(s)
str_to_date(s, format)
subdate(d, n)           日期d减去n天
subtime(t, n)
sysdate()
time(expression)
time_format(t, f)
time_to_sec(t)
timediff(time1, time2)  计算时间差
timestamp(exp, inter)
to_days(d)
week(d)
weekday(d)
weekofyear(d)
year(d)
yearweek(date, mode)

bin(x)                  x的二进制编码
binary(s)               字符串转为二进制字符串
cast(x as type)         类型转换
coalesce(p1, p2, ...)   返回从左到右第一个非空值
connection_id()         服务器连接数
conv(x, f1, f2)         f1进制数转为f2进制数                select conv(15, 10, 2);
convert(s using cs)     函数将字符串s的字符集变成cs
current_user()          当前用户
if(expr, v1, v2)        如果expr成立，返回v1，否则v2        select if(1>0, 'ok', 'no');
ifnull(v1, v2)          v1为null返回v2，否则v1              select ifnull(null, 'isme');
isnull(expression)      判断是否为null                      select isnull(null);
last_insert_id()        返回最近生成的auto_increment值
nullif(expr1, expr2)    expr1等于expr2返回null，否则expr1
session_user()          当前用户
system_user()           当前用户
uuid()                  32位随机值
```

```
case expression when condition1 then result1 when condition2 then result2 ... when conditionN then resultN else result end
```

```sql
-- 单表查询： 
select * from table;
select a.* from table as a;

-- 单行查询：
select * from table limit 1;

-- 分页查询：
select * from table limit 10, 20;

-- 条件查询： 
-- 不区分大小写
select * from table where column='auser';
-- 区分大小写    
select * from table where binary column='AUser';

select * from table where column is NULL or column is not null;

-- 查询排序：
select * from table order by column [ASC|DESC];
-- 唯一查询：
select distinct column1 from table;

-- 分组查询： 
select column from table group by column;
select column,count(*) as '分组条数' from table group by column;
select column from table group by column having count(*)>2;
-- 最后多一行汇总数据
select coalesce(column,'总数'), sum(column2) as 汇总 from table group by column with rollup;

-- 联合查询：
-- 除去重复数据：
select column1, column2 from table1 union select column1, column2 from table2;
-- 返回所有结果：
select column1, column2 from table1 union all select column1, column2 from table2;

-- 内连接查询：
select * from table1 as a inner join table2 as b on a.id=b.id
select * from table1 as a inner join table2 as b using(id);

-- 左连接查询：
select * from table1 as a left join table2 as b on a.id=b.id;

-- 右连接查询：
select * from table1 as a right join table2 as b on a.id=b.id;

-- 正则表达式查询：
select * from table where column regexp '[a|b]user';
```

```
^ - 开始匹配
$ - 结束匹配
. - 单字符匹配
[...] - 包含匹配
[^...] - 不包含匹配
|
*
+
{n}
{n,m}
```

条件：

```
= ：等于
> ：大于
>= ：大于等于
< ：小于
<= ：小于等于
<>或!= ：不等于
like ：包含， like '%abc%'-包含abc，like 'abc%'-abc开头，like '%abc'-abc结尾，like '_abc_'-中间为abc且前后各只有一个字符
```

## 3. insert、批量插入、表插入

```sql
INSERT IGNORE INTO
```

## 4. update

```sql
update table set column1=value1;
update table set column1=value1, column2=value2 where column3=value3;
```

## 5. delete

一般删除：

```sql
delete from table;
delete from table where column=value;
```

全表彻底删除，相当于删除表，再重新创建表：

```sql
truncate table table;
```

## 6. create

创建数据库：

```sql
create database 数据库名称;
```

只有数据库不存在才创建数据库：

```sql
create database 数据库名称 if not exists;
```

使用数据库：

```sql
use 数据库名称;
```

创建表：

```sql
create table 表名(字段名称 字段类型);
create table if not exists 表名(字段名称 字段类型);

create table if not exists test(
    id int unsigned auto_increment, 
    name varchar(100) not null, 
    date date, 
    primary key(id)
) engine=innodb default charset=utf8;
```

## 7. drop

```sql
-- 删除数据库： 
drop database 数据库名称；
-- 删除数据表：
drop table 数据表;
```

## 8. alter

```sql
-- 删除表字段：
alter table 数据表 drop 字段;
-- 添加字段：
alter table 数据表 add 字段 类型;
-- 修改字段类型：
alter table 数据表 modify 字段 类型;
-- 修改表名：
alter table 数据表 rename to 名称;
```

## 9. 变量

## 10. 索引index

创建索引： 

```sql
create index 索引名称 on 数据表(字段名称);
create index indexName on table(column);
```

创建表时指定：

```sql
create table table(
    id int not null, 
    name varchar(50) not null,
    index indexName(name(length))
);
```

```sql
-- 删除索引：
drop index indexName on table;

-- 唯一索引：
create unique index indexName on table(column(length));

-- 修改表结构：
alter table table add unique indexName (column(length));

-- 添加主键-唯一索引：
alter table tableName add primary key(column);

-- 添加唯一索引：
alter table tableName add unique indexName(column);

-- 添加普通索引：
alter table tableName add index indexName(column);

-- 添加全文索引：
alter table tableName add fulltext indexName(column);

-- 删除表字段索引：
alter table tableName drop index indexName;

-- 将普通可空列设置为主键：
alter table tableName modify columnName int not null;
alter table tableName add primary key(columnName);

-- 删除主键：
alter table tableName drop primary key;
```

## 11. 函数function

## 12. 存储过程PROCEDURE

```sql
CREATE PROCEDURE demo_in_parameter(IN p_in int);

    CREATE [DEFINER = { user | CURRENT_USER }] PROCEDURE sp_name ([proc_parameter[,...]])
        [characteristic ...] routine_body
    
    proc_parameter:
        [ IN | OUT | INOUT ] param_name type
    
    characteristic:
        COMMENT 'string'
    | LANGUAGE SQL
    | [NOT] DETERMINISTIC
    | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
    | SQL SECURITY { DEFINER | INVOKER }
    
    routine_body:
    　　Valid SQL routine statement
    
    [begin_label:] BEGIN
    　　[statement_list]
    　　　　……
    END [end_label]
```

如：

```sh
mysql> delimiter $$
mysql> create procedure in_param(in p_in int)
    -> begin
    -> 　　select p_in;
    -> 　　set p_in=2;
    ->    select P_in;
    -> end$$
mysql> delimiter ;

mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc4()  
    -> begin 
    -> declare var int;  
    -> set var=0;  
    -> while var<6 do  
    -> insert into t values(var);  
    -> set var=var+1;  
    -> end while;  
    -> end;  
    -> //  
mysql > DELIMITER ;
```

## 13. 事务

ACID：原子性、一致性、隔离性、持久性

普通事务：

```sql
begin 或 start transaction;
update table set column1=value1 where column2=value2;
commit;
```

```sql
-- 回滚事务：
rollback 或 rollback work;

-- 创建保存点：
savepint identifier;

-- 删除保存点：
release savepoint identifier;

-- 回滚到保存点：
rollback to identifier;

-- 隔离级别：
set transaction [READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ、SERIALIZABLE]

-- 禁止自动提交：
set autocommit=0;

-- 开启自动提交：
set autocommit=1;

```

## 14. 临时表、复制表

临时表只有当前连接可见，关闭连接临时表自动销毁；
创建临时表：

```sql
create temporary table tableName(
    id int not null auto_increment,
    name varchar(50) not null,
    primary key(id)
);
```

复制表： 

```sql
create table 新表 like 源表;
create table 新表 select * from 源表 where 1=2;
create table 新表 select * from 源表;
```

或

```sql
show create table tableName \G;
复制输出语句并修改表名称进行执行；
```

复制表数据： insert into 新表(字段1, 字段2, ...) select 字段1, 字段2, ... from 源表;

## 15. 游标

打开游标：

```sql
open cursor_name;
```

关闭游标：

```sql
close cursor_name;
```

```sql
DELIMITER $$

CREATE
    PROCEDURE `test`.`procedure_student2`()
    BEGIN
    -- declare some variable，必须在声明游标和句柄之前，而声明句柄必须在声明游标之后。
    DECLARE val DOUBLE DEFAULT 0;
    DECLARE tempRes VARCHAR(10) DEFAULT '';
    DECLARE res VARCHAR(100) DEFAULT '' ;
    -- declare a cursor
    DECLARE cursor_avgScore CURSOR
    FOR
    SELECT (mathScore+englishScore)/2  AS student_avgScore FROM student2;
    -- declare a continue handler ,use finish while loop 
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000'  SET val= -1.0 ;  
    -- open cursor
    OPEN cursor_avgScore ;
    FETCH cursor_avgScore INTO val;
    -- fetch cursor
    WHILE val!=-1 DO
        SET tempRes=CONCAT(val,', ');
        SET res=CONCAT(res,tempRes);
        FETCH cursor_avgScore INTO val;
    END WHILE;                  
    -- close cursor
    CLOSE cursor_avgScore ;
    -- 显示结果
    SELECT res;
    END$$
```

DELIMITER ;

## 16. 导入导出

导出txt文件：

```sql
select * from test into outfile '#:/1.txt';
```

导出dump： 

``` sh
mysqldump -u root -p --no-create-info --tab=/tmp 数据库名 表名(可选)
mysqldump -u root -p 数据库名 > dump.txt
```

导入：

``` sh
mysql -u root -p 数据库名 < dump.txt
mysqldump -u root -p 数据库名 | mysql -h 服务器 数据库名
```

## 17. 表分区

## 18. 主从复制

## 19. 显示当前时区

```sql
show variables like '%time_zone%';
```

设置为 `+8:00` 时区

```sql
set global time_zone='+8:00';
```
