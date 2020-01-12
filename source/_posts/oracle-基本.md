---
title: oracle-基本
date: 2019-12-29 16:07:26
tags: 
- database
---

## 1. 配置

#### ORACLE_CLIENT：

1. 系统环境变量

```
NLS_LANG    ->    AMERICAN_AMERICA.ZHS16GBK
TNS_ADMIN   ->    安装目录下的app\product\11.2.0\client_1\network\admin，即tns配置文件
PATH        ->    添加Oracle的Home目录下的BIN目录 %ORACLE_HOME%\BIN
ORACLE_HOME ->    （可选）ORACLE的Home目录，也可直接在PATH中添加 app\product\11.2.0\client_1
```

2. 权限配置

Oracle的Home目录下的BIN目录，添加Authenticated Users权限

<!-- more -->

#### ORACLE_SERVER：

Database Control URL 为 https://localhost:1158/em

管理资料档案库已置于安全模式下, 在此模式下将对 Enterprise Manager 数据进行加密。加密密钥已放置在文件 C:/app/Administrator/product/11.2.0/dbhome_1/jw-pc_orcl/sysman/config/emkey.ora 中。请务必备份此文件, 因为如果此文件丢失, 则加密数据将不可用。

## 2. 数据库/表空间

数据库实例：可创建多个实例，用于连接访问数据库的名称，即实例名

表空间：通过表空间存储物理表，一个数据库实例有多个表空间(默认有USERS、SYSAUX)，一个表空间有多张表，每个数据库至少有一个表空间：system 表空间

#### 数据库：

```sql
-- 查看当前数据库名：
select name from v$database;

-- 查看当前数据库实例名：
select instance_name from v$instance;
```

#### 数据表空间：

```sql
-- 查看
select d.default_tablespace, d.temporary_tablespace, d.username from dba_users d;

-- 创建v
create tablespace 表空间名称 datafile '数据文件路径及文件名' size 表空间大小; 
create tablespace data_test datafile 'E:\data\data_1.dbf' size 20M;
create tablespace idx_test datafile 'E:\data\idx_1.dbf' size 20M;

-- 示例：
create tablespace atablespace datafile 'e:/data/oracle/tablespace/atablespace.dbf' size 20M autoextend on;
```

#### 数据表：

```sql
-- 进入该用户：
sqlplusw study/study@test 

-- 查询表
select * from atable;

-- 默认查询的是当前表空间下的表，要查询其他表空间的表，则查询其他表空间对应用户下的表：
select * from auser.atable;

-- 查看当前表空间所有表：
select * from user_tables;

-- 创建数据表：
create table 数据表名
create table test_user ( 
    no number(5) not null , --pk 
    username varchar2(30) not null , --用户名 
    passpord varchar2(30) not null , --密码 
    constraint pk_connectdb primary key(no) 
) storage (initial 10k next 10k pctincrease 0); --如果某个数据表要存放大量数据，就把initial和next后的值设置大一点, 否则设置小一点

-- 如：
create table atable(id int primary key, name varchar2(50) not null, age int);
```

id 字段自增长：

```sql
create sequence atable_id_sequence minvalue 1 maxvalue 99999999 start with 1 increment by 1 cache 20;
create or replace trigger atable_trigger before insert on atable for each row
begin
    select atable_id_sequence.nextval into :new.id from dual;
end;
```

删除自增长：

```sql
drop sequence atable_id_sequence;
```

## 3. 用户

用户：必须先创建用户，并为用户指定表空间

#### 查看用户

```sql
-- 查看所有用户
SELECT * FROM ALL_USERS;
SELECT * FROM DBA_USERS;
SELECT * FROM DBA_TS_QUOTAS;

-- 连接到auser
conn auser/auser;
--查看账号属性：
select * from user_users;
```

#### 创建用户

```sql
create user 用户名 identified by 密码 default tablespace 表空间表;
create user 用户名 identified by 密码 default tablespace 表空间(默认USERS) temporary tablespace 临时表空间(默认TEMP);

-- 示例：
create user auser identified by 123456 default tablespace atablespace temporary tablespace TEMP;
create user study identified by study default tablespace data_test;
```

#### 修改用户

```sql
ALTER USER avyrros 
IDENTIFIED EXTERNALLY 
DEFAULT TABLESPACE data_ts 
TEMPORARY TABLESPACE temp_ts 
QUOTA 100M ON data_ts 
QUOTA 0 ON test_ts 
PROFILE clerk;
```

#### 删除用户

```sql
-- CASECADE 选项会删除该用户模式下的所有对象，建议在删除前，先确认是否有其他的依赖关系存在
DROP USER username [CASCADE]
```

#### 摘要文件

```sql
-- 创建摘要文件pfile[profile文件可以用于管理登录参数]：
create profile aprofile limit FAILED_LOGIN_ATTEMPTS 3PASSWORD_LOCK_TIME 1;
-- 将pfile赋予用户
alter user auser profile aprofile;
-- 验证是否授予成功：
select username, profile from dba_users;
```

检验aprofile效果：

```
sys@ORCL> conn auser/1     
ERROR:ORA-01017: invalid username/password; 
logon denied警告: 您不再连接到 ORACLE。
sys@ORCL> conn auser/2     
ERROR:ORA-01017: invalid username/password;      
logon denied     
sys@ORCL> conn auser/3ERROR:ORA-01017: invalid username/password; logon denied     
sys@ORCL> conn auser/4ERROR:ORA-28000: the account is locked     
sys@ORCL>
```

连续输错四次密码,令账户被锁：
sysdba身份登录查看：

```
sys@ORCL> conn sys/**
            ** as sysdba已连接。
sys@ORCL> select username,account_status from dba_users where username='auser';
USERNAME ACCOUNT_STATUS-----------------------------------------------------------U2 LOCKED(TIMED)
sys@ORCL>
```

```sql
-- 账号解锁：
alter user auser account unlock;
```

## 4. 权限

#### 权限查询

```sql
-- 查看当前用户的权限
select * from user_sys_privs;
-- 假如当前用户为auser，那么查询结果就是由auser授权，在auser模式下的权限记录 
select * from user_tab_privs_made;
-- 假如当前登录用户为auser，那么查询结果就是所有由auser授予的权限的记录 
select * from all_tab_privs_made;
-- 查询属于用户的对象
select owner, object_name, object_type, status from dba_objects where owner='auser' 
-- 假如当前登录用户为auser，那么查询结果就是auser在其他模式对象上的权限 
select * from user_tab_privs_recd;
-- 假如当前用户为auser，则查询结果为auser在整个数据库中拥有权限的对象 
select * from all_tab_privs_recd;
```

#### 权限分配

```sql
-- 连接权限授予auser用户：
grant connect to auser;
-- 资源权限授予auser用户：
grant resource to auser;
-- 连接、资源权限授予auser用户：
grant connect,resource to auser;
-- 授予用户建立连接和建表权限：
grant create session,create table to auser;
-- dba权限（最高权限）授予auser用户：
grant dba to study;
```

## 5. 角色


创建口令文件 

```sql
orapwd file='..........\pwd{SID}.ora' password='***(sys的密码)' tntries=10(口令文件最大的用户数量) 
```

```sql
-- 要使某个用户可以使用口令文件，必须为其授予SYSDBA权限，系统会自动将其加入到口令文件中
grant sysdba to auser;
--当收回SYSDBA权限时，系统将对应的用户从口令文件中删除
revoke sysdba from auser;
--查看口令文件管理的用户
select * from v$pwfile_users;
```

## 6. GUID

```sql
declare v_guid varchar2(50):=sys_guid();
sql_guid varchar2(50);
begin
    sql_guid:=
        substr(v_guid, 1, 8)  || '-' || 
        substr(v_guid, 9, 4)  || '-' || 
        substr(v_guid, 13, 4) || '-' || 
        substr(v_guid, 17, 4) || '-' || 
        substr(v_guid, 21, 12);
    dbms_output.put_line(sql_guid);
end;
```
