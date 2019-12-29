---
title: linux用户操作
date: 2019-12-29 16:02:49
tags:
---

# 1. 查看所有用户：

`cat /etc/passwd`
`cat /etc/shadow`

<!-- more -->

如：

    root:x:0:0:root:/root:/bin/bash

`/etc/passwd` 中一行记录对应着一个用户，每行用 `:` 分隔为7个字段：

    用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell

有一类用户称为伪用户（pseudo users），占有一条记录，但是不能登录，它们的存在主要是方便系统管理，满足相应的系统进程对文件属主的要求

`/etc/shadow` 中的记录行与/etc/passwd中的一一对应，它由pwconv命令根据/etc/passwd中的数据自动产生，它的文件格式与/etc/passwd类似，由若干个字段组成：

    登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志

# 2. 增加用户：

`useradd 选项 用户名`

常用选项:

- -c --comment 指定一段注释性描述。
- -d --home-dir 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
- -g --gid 用户组 指定用户所属的用户组。
- -G --groups 用户组，用户组 指定用户所属的附加组。
- -m --create-home 创建home目录
- -p --password 创建用户并设置加密密码
- -s --shell Shell文件 指定用户的登录Shell。
- -u --uid 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。

如：
    
`useradd -d /home/auser -m auser`
`useradd auser -p 123456`

批量添加用户：

`newusers < user.txt`

user.txt：

    user001::600:100:user:/home/user001:/bin/bash
    user002::601:100:user:/home/user002:/bin/bash
    user003::602:100:user:/home/user003:/bin/bash

先取消 shadow password 功能：

`pwunconv`

批量修改密码：

`chpasswd < passwd.txt`

passwd.txt：

    user001:密码
    user002:密码
    user003:密码

# 3. 删除用户：

`userdel 选项 用户名`

选项：

- -f --force 强制删除
- -r --remove 同时删除home目录和邮箱目录
- -R --root CHROOT_DIR
- -Z --selinux-user 删除用户的所有SELinux用户映射

如：

`userdel -r auser`
    
# 4. 修改用户：

`usermod 选项 用户名`

选项：

- -c --comment 
- -d --home 用户账户新主目录
- -e --expiredate 用户账号到期日期
- -f --inactive
- -g --gid
- -G --grouds
- -a --append
- -l --login
- -L --lock
- -m --move-home
- -o --non-unique
- -p --password 修改加密密码
- -R --root
- -s --shell
- -u --uid
- -U --unlock
- -Z --selinux-user

# 5. 用户密码设置

`passwd 选项 [用户名]`

选项：

- -k --keep-tokens
- -d --delete 删除密码
- -l --lock 锁定密码，即禁用账号
- -u --unlock 解锁密码
- -e --expire
- -f --force 强迫用户下次登录时修改密码
- -x --maximum=DAYS
- -n --minimum=DAYS
- -w --warning=DAYS
- -i --inactive=DAYS
- -S --status
- --stdin

# 6. 查看用户组：

`cat /etc/group`

    组名:口令:组标识号:组内用户列表

# 7. 增加新用户组

`groupadd 选项 用户组`

选项：

- -f --forec
- -g --gid 指定新用户组的组标识号
- -k --key
- -o --non-unique 一般与-g选项同时使用，表示新用户组的GID可以与系统已有用户组的GID相同
- -p --password
- -r --system
- -R --rot

如：

`groupadd group1`
`groupadd -g 101 group2`

# 8. 删除用户组

`groupdel 用户组`

# 9. 修改用户组

`groupmod 选项 用户组`

选项：

- -g --gid 为用户组指定新的组标识号
- -n --new-name 新用户组 将用户组的名字改为新名字
- -o --non-unique 与-g选项同时使用，用户组的新GID可以与系统已有用户组的GID相同
- -p --password
- -R --root

# 10. 如果一个用户属于多个用户组，用户可以在用户组之间切换

当前用户切换到root用户组

`newgrp root`
