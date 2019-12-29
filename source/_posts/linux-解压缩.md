---
title: linux解压缩
date: 2019-12-29 16:03:15
tags:
---

# 1. 解压

`*.tar.xz` 格式，先用 `xz` 命令解压，再用 `tar` 命令解包：

    xz -d *.tar.xz
    tar xvf *.tar

`*.tar.gz` 格式：

    tar -xzvf file.tar.gz
    tar -xzvf file.tar.gz -C 指定目录

`*.tar.bz2` 格式：

    tar -xfj *.tar.bz2

    bzip2 -d *.tar.bz2
    tar xvf *.tar

`*.zip` 格式：

    unzip all.zip -d directory

# 2. 压缩

`*.tar.gz` 格式：

    tar -czvf file.tar.gz file

`*.tar` 格式：

    tar -cvf *.tar file

`*.tar.bz2` 格式：

    tar jcf *.tar.bz2 file

`*.tar.xz` 格式：

    tar -cf *.tar file
    xz -z *.tar

    tar -Jcf *.tar.xz file
