---
title: linux网络设置
date: 2019-12-29 16:02:30
tags:
---

1. 查看网络

    ifconfig
    ifconfig 网卡名称
    ip addr
    ip addr show dev 网卡名称

<!-- more -->

2. 启用/禁用网卡

    ifconfig 网卡名称 up
    ifconfig 网卡名称 down
    ip link set 网卡名称 up
    ip link set 网卡名称 down

3. 设置IP地址

    ifconfig 网卡名称 192.168.1.1 netmask 255.255.255.0
    ip address add 192.168.1.1/24 dev 网卡名称
    ip address del 192.168.1.1/24 dev 网卡名称

4. 显示接口统计

    ip -s link ls 网卡名称

5. 显示链路

    ip link show
    ip link sh 网卡名称

6. 显示路由表

    ip route
    ip ro show dev 网卡名称

7. 增加新路由/默认路由

    ip route add 192.168.1.1/24 dev 网卡名称
    ip route add default via 192.168.1.1
    route add default gw 192.168.1.1

8. 修改/删除默认路由

    ip route chg default via 192.168.1.1
    ip route del default

9. 设置网关

    vi /etc/resolv.conf

    nameserver='网关'

10. 设置静态地址

    vi /etc/sysconfig/network-scripts/ifcfg-网卡名称

原有的注释，并添加：

    TYPE=Ethernet
    BOOTPROTO=static
    DEVIC=网卡名称
    NAME=网卡名称
    UUID=原有的UUID
    PROXY_METHOD=none
    BROWSER_ONLY=no
    IPV6INIT=no
    USERCTL=no
    IPADDR=192.168.1.2
    NETMASK=255.255.255.0
    GATEWAY=192.168.1.1
    DNS1=192.168.1.1
    DNS2=8.8.8.8
    ONBOOT=yes

11. 修改网卡地址

    ip link set dev 网卡名称 down
    ip link set dev 网卡名称 address 新网卡地址
    ip link set dev 网卡名称 up
