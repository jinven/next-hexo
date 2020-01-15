---
title: mongodb-基本
date: 2019-12-01 00:00:21
tags: 
- database
---

为现代应用程序开发人员和云时代构建的基于文档的通用分布式数据库。 没有数据库可以提高您的生产力。

<!-- more -->

## 1. 运行服务/客户端、概念

服务：      ./mongod.exe

客户端：    ./mongo.exe

结构：

```
数据库 -> 数据库表/集合 -> 数据记录行/文档 -> 数据字段/域
索引
不支持表连接
自动将_id字段设置为主键

数据库名应小写，最多64字节，不能含空格、.、$、/、\、\0空字符
```

保留数据库名： `admin`、`local`、`config`


#### 文档(Document)：

- 是一组键值对key-value，BSON，如： `{"name":"abc", "content":"def"}`
- 键值对是有序的
- 区分类型和大小写
- 不能有重复的键
- 键是字符串
- 键不能包含空字符、.、$
- 下划线_保留，不推荐使用

#### 集合：一个文档插入时，集合就会被创建

集合名不能包含空字符，不能以 `system.` 开头

#### capped collections：

```
db.createCollection("mycoll", {capped:true, size:100000})
```

#### 元数据

数据库的信息是存储在集合中。它们使用了系统的命名空间：

- dbname.system.*
- dbname.system.namespaces列出所有名字空间。
- dbname.system.indexes    列出所有索引。
- dbname.system.profile    包含数据库概要(profile)信息。
- dbname.system.users    列出所有可访问数据库的用户。
- dbname.local.sources    包含复制对端（slave）的服务器信息和状态。

#### 数据类型

| 类型 | 描述 |
| ---------- | ---------- |
| String | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。 |
| Boolean | 布尔值。用于存储布尔值（真/假）。 |
| Double | 双精度浮点值。用于存储浮点值。 |
| Min /Max keys | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Array | 用于将数组或列表或多个值存储为一个键。 |
| Timestamp | 时间戳。记录文档修改或添加的具体时间。 |
| Object | 用于内嵌文档。 |
| Null | 用于创建空值。 |
| Symbol | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID | 对象 ID。用于创建文档的 ID。 |
| Binary Data | 二进制数据。用于存储二进制数据。 |
| Code | 代码类型。用于在文档中存储 JavaScript 代码。 |
| Regular expression | 正则表达式类型。用于存储正则表达式。 |

#### ObjectId

ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes，含义是：

前 4 个字节表示创建 unix 时间戳,格林尼治时间 UTC 时间，比北京时间晚了 8 个小时
接下来的 3 个字节是机器标识码，紧接的两个字节由进程 id 组成 PID，最后三个字节是随机数

文档必须有一个 _id 键。这个键的值可以是任何类型的，默认是个 ObjectId 对象
由于 ObjectId 中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间:

```
> var newObject = ObjectId()
> newObject.getTimestamp()
ISODate("2017-11-25T07:21:10Z")
```

ObjectId 转为字符串

```
> newObject.str
5a1919e63df83ce79df8b38f
```

日期

表示当前距离 Unix新纪元（1970年1月1日）的毫秒数。日期类型是有符号的, 负数表示 1970 年之前的日期。

```
> var mydate1 = new Date()     //格林尼治时间
> mydate1
> typeof mydate1

> var mydate2 = ISODate() //格林尼治时间
> mydate2
> typeof mydate2

> var mydate1str = mydate1.toString()
> mydate1str
> typeof mydate1str
> Date()
```

#### 用户的权限

默认是没有用户名及密码的，即无权限访问限制。为了方便数据库的管理和安全，需创建数据库用户。

```
Read                    允许用户读取指定数据库
readWrite               允许用户读写指定数据库
dbAdmin                 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin               允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin            只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase         只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase    只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase    只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase      只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root                    只在admin数据库中可用。超级账号，超级权限
```

创建管理员用户

```
> use admin
> db.createUser(
        {
            user: "root",
            pwd: "123456",
            roles: [{ role: "root", db: "admin" }]
        }
    );
> show tables;
> show users;
> db.auth("root", "123456");        // 验证用户是否
```

创建完成后在配置文件中开启用户验证

```sh
cat >>/application/mongodb/conf/mongod.conf<<-'EOF'
security:
authorization: enabled
EOF
```

重启服务

```sh
/etc/init.d/mongod  restart
```

命令行中进行登陆

```sh
mongo -uroot -proot admin 
```

创建对某库的只读用户，在test库创建只读用户test

```
> use test
> db.createUser(
    {
        user: "test",
        pwd: "test",
        roles: [ { role: "read", db: "test" } ]
    }
);
```

测试用户是否创建成功

```
> db.auth("test","test");
> show users;
```

登录test用户，并测试是否只读

```
> show collections;
> db.createCollection('b');
```

创建某库的读写用户，创建test1用户，权限为读写

```
> db.createUser(
        {
            user: "test1",
            pwd: "test1",
            roles: [ { role: "readWrite", db: "test" } ]
        }
    );
```

查看并测试用户

```
> show users;
> db.auth("test1","test1");
```

创建对多库不同权限的用户，创建对app为读写权限，对test库为只读权限的用户

```
> use app
> db.createUser(
        {
            user: "app",
            pwd: "app",
            roles: [ { role: "readWrite", db: "app" }, { role: "read", db: "test" }]
        }
    );
```

查看并测试用户

```
> show users;
> db.auth("app","app");
```

删除用户，删除app用户：先登录到admin数据库

```
mongo -uroot –proot 127.0.0.1/admin
```

进入app库删除app用户

```
> use app;
> db.dropUser("app");
```

自定义数据库，创建app数据库的管理员：先登录到admin数据库

```
> use app;
> db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [ { role: "dbAdmin", db: "app" } ]
    }
    );
```

创建app数据库读写权限的用户并具有clusterAdmin权限：

```
> use app;
> db.createUser(
    {
        user: "app04",
        pwd: "app04",
        roles: [ { role: "readWrite", db: "app" }, { role: "clusterAdmin", db: "admin" }]
    }
    )
```

## 2. 基本命令

数据库版本：

```
> db.version();
```

连接机器地址：

```
> db.getMongo();
```

显示所有数据库

```
> show dbs;
```

显示当前所在库

```
> db;
> db.getName();
```

当前数据库状态：

```
> db.stats();
```

切换到local库

```
> use local;
```

显示所有表/集合

```
> show tables;
> db.getCollectionNames();
```

创建数据库

```
> use newdb;
> db.newdb.insert({"name":"hello"});
> show dbs;
```

删除数据库

```
> use newdb;
> db.dropDatabase();
> show dbs;
```

删除集合

```
> db.collection.drop();

> use newdb
> db.createCollection("mycol");
> show tables;
> db.mycol.drop();
> show tables;
```

创建集合

```
db.createCollection(name, options);

capped        布尔（可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。当该值为 true 时，必须指定 size 参数。
autoIndexId    布尔（可选）如为 true，自动在 _id 字段创建索引。默认为 false。
size        数值（可选）为固定集合指定一个最大值，以千字节计（KB）。如果 capped 为 true，也需要指定该字段。
max            数值（可选）指定固定集合中包含文档的最大数量。
```

重命名集合

```
> db.mycol.renameCollection("mycol1");
```

创建mycol集合

```
> use newdb;
> db.createCollection("mycol");
> show collections;
> db.createCollection("mycol2", {capped: true, autoIndexId: true, size: 6142800, max: 10000});
> db.mycol3.insert({"name": "hello"});
> db.mycol4.insert({title: "test", description: "tortoise", by: "code", url: "not yeah", tags:['mongodb', 'database', 'NoSQL']});
> variableOne=({title: 'book', description: 'MongoDB Book', author: 'jw', price: 100});
> db.mycol5.insert(variableOne);
> show collections;
> db.mycol4.find();
> db.mycol5.find();
```

插入1w行数据

```
> for(i=0; i<10000; i++) { db.log.insert({ uid: i, name: "mongodb", age: 6, date: new Date()}); };
> db.log.find();
> db.log.find().pretty();    // 显示优化
> db.log.find({ }, {_id: 0, uid: 1, name: 1, age: 1});  // 第一个对象是条件，第二个是指定显示列
```

it显示下一页，默认每页显示20条记录，修改为50条记录

```
> it
> DBQuery.shellBatchSize=50;
```

查看第一条记录

```
> db.log.findOne();
```

查看记录总数

```
> db.log.count();
```

查看uid为1000的数据

```
> db.log.find({uid:1000});
```

移除uid为1001的数据

```
> db.log.remove({uid: 1001});
```

修改uid为1002的数据

```
> db.log.update({ uid: 1002}, {$inc: { age: 3 }}, { multi: true});
```

删除集合总的记录数

```
> db.log.distinct("name");
> db.log.remove({});
> db.log.distinct("name");
```

查看集合存储信息

```
> db.log.stats();           // 查看数据状态
> db.log.dataSize();        // 集合中数据的原始大小
> db.log.totalIndexSize();  // 集合中索引数据的原始大小
> db.log.totalSize();       // 集合中索引+数据压缩存储之后的大小
> db.log.storageSize();     // 集合中数据压缩存储的大小
```

集合/表添加删除字段 join_date，集合没有数据结构的概念，但再document级可实现：

```
> db.users.update({ }, { $set: { join_date: new Date() }}, { multi: true});
> db.users.update({ }, { $unset: { join_date: "" } }, { multi: true });
```

创建索引

```
> db.users.createIndex( { user_id: 1 } );
> db.users.createIndex( { user_id: 1, age: -1 } );
```
