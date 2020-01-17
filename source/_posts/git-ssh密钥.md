---
title: git-ssh临时连接
date: 2019-12-01 00:38:00
tags:
- git
---

# 生成密钥

```sh
# 1. 直接生成
git目录/usr/bin/ssh-keygen.exe 
# 2. 指定生成（选择）
ssh-keygen -t rsa -b 4096 -C "备注" -f 密钥名称
```

<!-- more -->

将生成两个文件

- `密钥名称` 私钥
- `密钥名称.pub` 公钥

前往 [`github`](https://github.com/settings/keys) 或 `git服务器`，将公钥内容加入服务器


# 临时连接

打开终端并输入

```sh
cd 要复制或拉取项目的目录
set GIT_SSH_COMMAND=ssh -i "密钥私钥文件位置"
# 如：set GIT_SSH_COMMAND=ssh -i "C:/config/id_rsa.pri"
git clone git@github.com:***/***.git
```

# 全局指定

```sh
# 查看当前设置
git config core.sshCommand
# 设置指定私钥
git config core.sshCommand "ssh -i 密钥私钥文件位置"
```
