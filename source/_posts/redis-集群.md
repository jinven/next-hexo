---
title: redis-集群
date: 2019-12-01 00:00:22
tags: 
- cache
---

## Redis 5.0.0 以上    

https://redis.io/topics/cluster-tutorial

---

### 1. 快速集群

解压并编译安装

```sh
cd utils
./create-cluster start
./create-cluster create
./create-cluster stop
```

默认3组实例，每组实例一个由主节点和备份节点组成，共6个节点

<!-- more -->

### 2. 信息

#### 2.1. 最少有3个主节点，3个备份节点

每个主节点对应一个备份节点，每个节点开启两个端口，一个供调用（配置文件中设置），一个内部主从节点间通讯、故障切换，默认为对外端口+10000
如：默认端口是 6379，则内部通讯端口为 16379

#### 2.2. 整个群集中划分为 16384 个插槽，通过对密钥的 CRC16 取模分配至相应节点

如3个主节点，则划分为3份：A:0-5500、B:5500-11000、C:11001-16383，4个主节点则划分为4份，以此类推

#### 2.3. 划分节点后可继续添加节点或移除节点

若原来为3个主节点：A、B、C，加多一个主节点，则会重新计算分配，将A、B、C多出来的移入到D主节点
若原来为4个主节点：A、B、C、D，要移除主节点D，则会重新计算分配，将D节点的数据分配至A、B、C中，然后移除D节点

#### 2.4. 故障切换，3个主节点为：A、B、C，3个备份节点为：A1、B1、C1

若主节点B宕机或维护关闭，集群会将B1切换为主节点，后续可加入备份节点
若同时B1节点也宕机或关闭了，集群将不可使用

### 3. 配置参数

```sh
include /path/to/local.conf # 引用配置文件，推荐将全局的配置写入引用
cluster-enabled yes # 集群必须为yes，否则为独立实例
cluster-config-file <filename> # 集群配置文件，自动生成，默认启动目录下生成，不应修改，每个节点对应一个，启动时检查集群其他节点的信息
cluster-node-timeout <milliseconds> # 集群节点不可用最长时间，超过将进行故障转移
cluster-slave-validity-factor <factor> # 默认为0，始终故障转移，其他则不会尝试启动故障转移
cluster-migration-barrier <count> # 主节点保持最小数量的备份节点
cluster-require-full-coverage <yes/no> # 默认yes
logfile <filename> # 日志文件，自动生成，默认启动目录下生成
pidfile <filename> # pid文件，自动生成，默认/var/run/redis.pid
protected-mode <yes/no> # 默认yes，
```

### 4. 手动集群

#### 4.1. 配置3个主节点，3个从节点：
        
```
A(127.0.0.1:7000)
B(127.0.0.1:7001)
C(127.0.0.1:7002)
A1(127.0.0.1:7003)
B1(127.0.0.1:7004)
C1(127.0.0.1:7005)
```

#### 4.1. 配置文件：

6个配置文件设置为：

```
redis-7000.conf
redis-7001.conf
redis-7002.conf
redis-7003.conf
redis-7004.conf
redis-7005.conf
```

配置7000端口的节点

```sh
vi /usr/local/src/redis-cluster/7000/redis-7000.conf
port 7000
bind 127.0.0.1
daemonize yes
cluster-enabled yes
cluster-config-file nodes_7000.conf
cluster-node-timeout 5000
appendonly yes
appendfsync always
logfile "/data/redis/logs/redis_7000.log"
pidfile "/var/run/redis_7000.pid"
```

配置7001端口的节点，将7000替换为7001，其他端口以此类推

#### 4.2. 启动节点

```
redis-server redis-7000.conf
redis-server redis-7001.conf
redis-server redis-7002.conf
redis-server redis-7003.conf
redis-server redis-7004.conf
redis-server redis-7005.conf
```

#### 4.3. 创建集群

```
redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 --cluster-replicas 1
```

#### 4.4. 连接集群

```sh
redis-cli -c -p 7000
> set foo bar
> set hello world
> get foo
> get hello
```

可以看到从不同端口设置或获取数据

## 5. 操作命令

#### 5.1. 集群重新分片

```
redis-cli --cluster reshard 127.0.0.1:7000
```

#### 5.2. 查看节点

```
redis-cli -p 7000 cluster nodes
```

#### 5.3. 检查节点

```
redis-cli --cluster check 127.0.0.1:7000
```

#### 5.4. 添加节点

```
redis-cli --cluster add-node 127.0.0.1:7006 127.0.0.1:7000
```

#### 5.5. 添加副本节点

```
redis-cli --cluster add-node 127.0.0.1:7006 127.0.0.1:7000 --cluster-slave
```

#### 5.6. 移除节点

```
redis-cli --cluster del-node 127.0.0.1:7000 `<node-id>`
```

## 6. 实践

#### 6.1. 两台机器PC1(192.168.1.81)和PC2(192.168.1.82)

PC1运行4个节点(A、A1、B、B1)，PC2运行2个节点(C、C1)

```
A:  192.168.1.81:7000
A1: 192.168.1.81:7001
B:  192.168.1.81:7002
B1: 192.168.1.81:7003
C:  192.168.1.82:7004
C1: 192.168.1.82:7005
```

关闭防火墙，或开户端口：7000、17000、7001、17001、7002、17002、7003、17003、7004、17004、7005、17005
        
```sh
systemctl stop firewalld
```

#### 6.2. 文件目录结构

PC1:

```
/usr/local/src/redis-cluster/redis-global.conf
/usr/local/src/redis-cluster/7000/redis-7000.conf
/usr/local/src/redis-cluster/7001/redis-7001.conf
/usr/local/src/redis-cluster/7002/redis-7002.conf
/usr/local/src/redis-cluster/7003/redis-7003.conf
```

PC2:

```
/usr/local/src/redis-cluster/redis-global.conf
/usr/local/src/redis-cluster/7004/redis-7004.conf
/usr/local/src/redis-cluster/7005/redis-7005.conf
```

PC1的 `redis-global.conf` 文件：

```conf
bind 192.168.1.81
daemonize yes
cluster-enabled yes
cluster-node-timeout 5000
appendonly yes
appendfsync always
# protect-mode no
```

PC2的 `redis-global.conf` 文件：

```conf
bind 192.168.1.82
daemonize yes
cluster-enabled yes
cluster-node-timeout 5000
appendonly yes
appendfsync always
# protect-mode no
```

`redis-7000.conf` 文件：

```conf
include /usr/local/src/redis-cluster/redis-global.conf
port 7000
cluster-config-file nodes_7000.conf
logfile /data/redis/logs/redis_7000.log
pidfile /var/run/redis_7000.pid
```

`redis-7001-7005.conf` 文件复制 `redis-7000.conf` 将7000改为对应的端口

#### 6.3. 运行节点

必须进入相应配置文件目录执行

```sh
cd /usr/local/src/redis-cluster/7000/
redis-server redis-7000.conf
cd /usr/local/src/redis-cluster/7001/
redis-server redis-7001.conf
cd /usr/local/src/redis-cluster/7002/
redis-server redis-7002.conf
cd /usr/local/src/redis-cluster/7003/
redis-server redis-7003.conf
cd /usr/local/src/redis-cluster/7004/
redis-server redis-7004.conf
cd /usr/local/src/redis-cluster/7005/
redis-server redis-7005.conf
```

查看启用状态

```sh
pgrep redis
```

#### 6.4. 配置群集

```sh
redis-cli --cluster create 192.168.1.81:7000 192.168.1.81:7001 192.168.1.81:7002 192.168.1.81:7003 192.168.1.81:7004 192.168.1.81:7005 --cluster-replicas 1
```

#### 6.5. 连接测试

```sh
redis-cli -c -h 192.168.1.81 -p 7000
> set foo bar
> set hello world
> get foo
> get hello
```

#### 6.6. 设置密码

所有节点密码必须一致

```sh
redis-cli -c -h 192.168.1.81 -p 7000
> config set masterauth 123456
> config set requirepass 123456
> config rewrite

redis-cli -c -h 192.168.1.81 -p 7001
> config set masterauth 123456
> config set requirepass 123456
> config rewrite

redis-cli -c -h 192.168.1.81 -p 7002
> config set masterauth 123456
> config set requirepass 123456
> config rewrite

redis-cli -c -h 192.168.1.81 -p 7003
> config set masterauth 123456
> config set requirepass 123456
> config rewrite

redis-cli -c -h 192.168.1.81 -p 7004
> config set masterauth 123456
> config set requirepass 123456
> config rewrite

redis-cli -c -h 192.168.1.81 -p 7005
> config set masterauth 123456
> config set requirepass 123456
> config rewrite
```
