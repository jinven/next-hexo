---
title: linux常用命令
date: 2019-12-01 00:24:00
tags: 
- linux
---

## 基本

1. 系统类型、架构：

```sh
uname
uname --all
uname -p
```

2. 内核版本：

```sh
cat /proc/version
cat /proc/sys/kernel/ostype
cat /proc/sys/kernel/osrelease
cat /proc/sys/kernel/version

# rehat、centos
cat /etc/redhat-release
```

<!-- more -->

3. cpu信息：

```sh
cat /proc/cpuinfo
# cpu个数：
cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l
# 每个CPU核数
cat /proc/cpuinfo | grep "cpu cores" | uniq
# CPU信息、型号
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
# CPU使用率
top
```

4. 内存信息：

```sh
cat /proc/meminfo
free
free -h
```

5. 磁盘信息：

```sh
fdisk -l
iostat -x 10
```

6. 当前用户：

```sh
# 当前用户名
whoami
# 当前用户组
groups
```

7. 查看端口被谁占用：

`lsof -i:端口号`

8. `md5sum`

    校验md5

9. `alias`
        
- 设置别名

`alias [别名]=[指令名称]`

- 删除别名

`unalias [别名]`

- 为所有用户设置别名，将别名设置命令添加到 `/etc/bashrc` 后面

10. `more`

去掉注释查看

`more ***.conf | grep -v ^#`

11. `ps`

查看指定进程

`ps aux | grep mysql`

12. `pgrep`

查看指定名称进程的id

`pgrep 名称`
`pgrep 名称 | xargs`
`pgrep 名称 | xargs ps -u --pid`

13. `kill`

结束指定id进程

`kill id`

14. `find`

find 指定目录 选项 查找内容

`find / -name "mysql*"`

15. `hostname`

当前计算机名称
    
`hostname`

临时设置计算机名称

`hostname 名称`

永久设置计算机名称

`vi /etc/hostname`
`hostname=名称`

16. `netstat`

`netstat -anp | grep 6379`

17. [`OpenSSL`](https://www.openssl.org/docs/man1.1.1/man1/genrsa.html)

- 生成RSA私钥，私钥长度：512/1024/2048(默认)，必须放在最后，加密选项(默认不加密)：-aes128, -aes192, -aes256, -aria128, -aria192, -aria256, -camellia128, -camellia192, -camellia256, -des, -des3, -idea

`openssl genrsa -out app_private_key.pem 1024`
`openssl pkcs8 -inform PEM -in app_private_key.pem -outform PEM -nocrypt -out app_private_key_pkcs8.pem`

- 根据私钥生成公钥

`openssl rsa -in app_private_key.pem -pubout -out app_public_key.pem`
