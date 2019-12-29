---
title: linux-ssh
date: 2019-12-29 16:03:54
tags:
---

- https://www.ibm.com/developerworks/cn/aix/library/au-sshsecurity/index.html

1. 工具：

    linux：ssh
    windows：putty

2. 将 root 账户仅限制为控制台访问：

```sh
# vi /etc/ssh/sshd_config
PermitRootLogin no
```

<!-- more -->

3. 为私有密钥使用一个强大的口令和密码保护来创建公私密钥对（绝不要生成一个无密码的密钥对或一个无密码口令无密钥的登录）：

(Use a higher bit rate for the encryption for more security)

```sh
ssh-keygen -t rsa -b 4096
```

4. 配置 TCP 包装程序，以便仅允许选定的远程主机并拒绝不合意的主机：

```sh
# vi /etc/hosts.deny
ALL: 192.168.200.09     # IP Address of badguy
```

5. 在工作站或笔记本电脑上，关闭 SSH 服务禁用 SSH 服务器，然后删除 ssh 服务器包：

```sh
# chkconfig sshd off 
# yum erase openssh-server
```

6. 通过控制用户访问限制 SSH 访问：

```sh
# vi /etc/ssh/sshd_config 
AllowUsers fsmythe bnice swilson
DenyUsers jhacker joebadguy jripper
```

7. 仅使用 SSH Protocol 2：

```sh
# vi /etc/ssh/sshd_config
Protocol 2
```

8. 不要支持闲置会话，并配置 Idle Log Out Timeout 间隔：

```sh
# vi /etc/ssh/sshd_config
ClientAliveInterval 600     # (Set to 600 seconds = 10 minutes)
ClientAliveCountMax 0
```

9. 禁用基于主机的身份验证：

```sh
# vi /etc/ssh/sshd_config
HostbasedAuthentication no
```

10. 禁用用户的 .rhosts 文件：

```sh
# vi /etc/ssh/sshd_config
IgnoreRhosts yes
```

11. 配置防火墙以接受仅来自已知网段的 SSH 连接：

Update /etc/sysconfig/iptables (Redhat specific file) to accept connection only 
from 192.168.100.0/24 and 209.64.100.5/27, enter:

```sh
-A RH-FW-1-INPUT -s 192.168.100.0/24 -m state --state NEW -p tcp --dport 22 -j ACCEPT
-A RH-FW-1-INPUT -s 209.64.100.5/27 -m state --state NEW -p tcp --dport 22 -j ACCEPT
```

12. 限制 SSH 将侦听和绑定到的可用接口：

```sh
# vi /etc/ssh/sshd_config
ListenAddress 192.168.100.17
ListenAddress 209.64.100.15
```

13. 设置用户策略，实施强大的密码来防御强力攻击、社会工程企图（social engineering attempts）和字典攻击：

```sh
# < /dev/urandom tr -dc A-Za-z0-9_ | head -c8
oP0FNAUt[
```

14. 使用 Chroot SSHD 将 SFTP 用户局限于其自己的主目录：

```sh
# vi /etc/ssh/sshd_config 
ChrootDirectory /data01/home/%u
X11Forwarding no
AllowTcpForwarding no
```

15. 禁用空密码：

```sh
# vi /etc/ssh/sshd_config
PermitEmptyPasswords no
```

16. 在指定时间内对传入端口 2022 连接的数量限速：

Redhat iptables example (Update /etc/sysconfig/iptables): 

```sh
-A INPUT  -i eth0 -p tcp --dport 2022 -m state --state NEW -m limit --limit 3/min
--limit-burst 3 -j ACCEPT

-A INPUT  -i eth0 -p tcp --dport 2022 -m state --state ESTABLISHED -j ACCEPT
-A OUTPUT -o eth0 -p tcp --sport 2022 -m state --state ESTABLISHED -j ACCEPT
```

17. 配置 iptables，以便在 30 秒内仅允许在端口 2022 上有三个连接尝试：

Redhat iptables example (Update /etc/sysconfig/iptables): 

```sh
-I INPUT -p tcp --dport 2022 -i eth0 -m state --state NEW -m recent --set

-I INPUT -p tcp --dport 2022 -i eth0 -m state --state NEW -m recent --update 
--seconds 30 --hitcount 3 -j DR
```

18. 使用一个日志分析器，比如 logcheck、loggrep、splunk 或 logwatch 来更好地理解日志并创建日志报告。另外，在 SSH 应用程序自身内增加日志记录的详细度：

Installation of the logwatch package on Redhat Linux 

```sh
# yum install logwatch
```

19. 通过配置增加 SSH 日志记录的详细度：
        
```sh
# vi /etc/ssh/sshd_config
LogLevel DEBUG
```

20. 在补丁上总是将 SSH 程序包和需要的库保持为最新：

```sh
# yum update openssh-server openssh openssh-clients -y
```

21. 隐藏 OpenSSH 版本，要求 SSH 源代码并进行重新编译。然后进行以下更新：

```sh
# vi /etc/ssh/sshd_config
VerifyReverseMapping yes    # Turn on  reverse name checking
UsePrivilegeSeparation yes  # Turn on privilege separation
StrictModes yes         # Prevent the use of insecure home directory    
                # and key file permissions
AllowTcpForwarding no       # Turn off , if at all possible 
X11Forwarding no        # Turn off , if at all possible
PasswordAuthentication no   # Specifies whether password authentication is 
                # allowed.  The default is yes. Users must have 
                # another authentication method available .
```

22. 从系统上删除 rlogin 和 rsh 二进制程序，并将它们替代为 SSH 的一个 symlink：
        
```sh
# find /usr -name rsh
/usr/bin/rsh
# rm -f /usr/bin/rsh
# ln -s /usr/bin/ssh /usr/bin/rsh
```

23. SSH 支持可启用或禁用的多种不同的身份验证方法和技术。在 /etc/ssh/sshd_config 文件中，您可以进行这些配置更改，方法就是输入为身份验证方法列出的关键字，然后紧接 yes 或 no。下面是一些常见的配置更改：

```sh
# RSAAuthentication yes     
# PubkeyAuthentication yes      
# RhostsRSAAuthentication no
# HostbasedAuthentication no
# RhostsRSAAuthentication and HostbasedAuthentication
PasswordAuthentication yes
ChallengeResponseAuthentication no
# KerberosAuthentication no
GSSAPIAuthentication yes
```

24. sshd_config 文件内的 AllowedAuthentications 和 RequiredAuthentications 决定哪些身份验证方法和配置仅用于 SSH Protocol 2，且它们支持密码和公钥身份验证的语法如下：

```sh
# vi /etc/ssh/sshd_config
AllowedAuthentications publickey, password
RequiredAuthentications publickey, password
```
