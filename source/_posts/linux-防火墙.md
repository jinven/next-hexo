---
title: linux防火墙
date: 2019-12-01 00:25:00
tags: 
- linux
---

## 不同 `linux` 发行版本防火墙命令有区别

1. 关闭防火墙

```sh
service iptable stop
service iptables stop

systemctl stop firewalld.service
```

2. 开启防火墙

```sh
service iptable start
service iptables start

systemctl start firewalld.service
```
<!-- more -->

3. 禁用防火墙

```sh
chkconfig iptables off

systemctl disable firewalld.service
```

4. 启用防火墙

```sh
chkconfig iptables on

systemctl enable firewalld.service
```

5. 重启防火墙

```sh
systemctl restart iptables.service

systemctl restart firewalld.service
firewall-cmd --reload
```

6. 查看防火墙状态

```sh
service iptable status
service iptables status

systemctl status iptable.service
systemctl status firewalld.service
systemctl list-unit-files | grep firewalld.service
firewall-cmd --state
systemctl is-enabled firewalld.service;echo $?
firewall-cmd --query-masquerade
firewall-cmd --remove-masquerade
```

7. 查看已经开放的端口：

```sh
/etc/init.d/iptables status
iptables -L -n | grep 21

firewall-cmd --list-all
firewall-cmd --list-ports
firewall-cmd --get-active-zones
firewall-cmd --get-service
firewall-cmd --permanent --zone=public --list-ports
firewall-cmd --permanent --zone=public --list-services
firewall-cmd --query-service ftp
firewall-cmd --query-service ssh
firewall-cmd --query-service samba
firewall-cmd --query-service http
```

8. 开启端口

zone:作用域(drop/block/public/external/dmz/work/home/internal/)，permanent:永久生效，--add-forward-port:端口转发/映射

```sh
firewall-cmd --add-port=80/tcp
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=8000-9000/tcp
firewall-cmd --zone=public --add-servic=https
firewall-cmd --zone=public --add-rich-rule="rule family="ipv4" source address="192.168.0.4/24" service name="http" accept"
firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080 --permanent
firewall-cmd --zone=external --add-forward-port=port=1122:proto=tcp:toport=22:toaddr=192.168.1.3 --permanent


/sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
/etc/rc.d/init.d/iptables save
```

9. 清除端口

```sh
/sbin/iptables -F

firewall-cmd --permanent --zone=public --remove-rich-rule="rule family="ipv4" source address="192.168.0.4/24" service name="http" accept"
```

10. 防火墙配置

```sh
vi /etc/sysconfig/iptables
```

增加规则

    -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
