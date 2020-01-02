---
title: docker
date: 2019-12-29 16:01:25
tags: docker
---

# centos安装

1. 前提：系统为64位，内核版本必须高于 3.10，查询当前内核版本：

        uname -r

    docker分为两个版本：Docker CE 和 Docker EE
    Docker CE：社区免费版
    Docker EE：企业版，需付费使用

<!-- more -->

2. 移除旧版本：

        sudo yum remove docker \
                        docker-client \
                        docker-client-latest \
                        docker-common \
                        docker-latest \
                        docker-latest-logrotate \
                        docker-logrotate \
                        docker-selinux \
                        docker-engine-selinux \
                        docker-engine

3. 安装必要工具：

        sudo yum install -y yum-utils device-mapper-persistent-data lvm2

4. 添加软件源信息：

        sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

5. 更新 `yum` 缓存：

        sudo yum makecache fast

6. 安装 `Docker-ce`：

        sudo yum -y install docker-ce

7. 启动 `Docker` 后台服务：

        sudo systemctl start docker

8. 测试运行 `hello-world`：

        docker run hello-world

    初次运行会提示：

        Unable to find image 'hello-world:latest' locally

    等待一会儿会自动下载，网络比较慢，失败几率较大，多试几次

9. 删除 `Docker CE`：

        sudo yum remove docker-ce
        sudo rm -rf /var/lib/docker

# 命令与配置

1. 检查Docker的安装是否正确：

        docker info

2. 拉取一个预建的镜像：

        docker pull busybox

    如果速度慢则在目录 `/etc/docker/` 下添加文件 `daemon.json`：

        {
            "registry-mirrors" : ["https://docker.mirrors.ustc.edu.cn"]
        }

    然后重启 `docker` 服务：

        sudo service docker restart
        sudo systemctl restart docker

3. 以后台进程的方式运行 `hello docker`：

        sample_job=$(docker run -d busybox /bin/sh -c "while true; do echo Docker; sleep 1; done")

4. sample_job命令会隔一秒打印一次Docker，使用Docker logs可以查看输出。如果没有起名字，那这个job会被分配一个id，以后使用命令例如Docker logs查看日志会变得比较麻烦。

    运行Docker logs命令来查看job的当前状态：

        docker logs $sample_job

5. 所有Docker命令：

        docker help

6. 停止名为sample_job的容器：

        docker stop $sample_job

7. 重新启动该容器：

        docker restart $sample_job

8. 如果要完全移除容器，需要将该容器停止，然后才能移除：

        docker stop $sample_job docker rm $sample_job

9. 将容器的状态保存为镜像：

        docker commit $sample_job job1

10. 令查看所有镜像的列表：

        docker images

11. 移除所有的容器和镜像：

        docker kill $(docker ps -q) ; docker rm $(docker ps -a -q) ; docker rmi $(docker images -q -a)

12. 仅仅想删除所有的容器：

        docker kill $(docker ps -q) ; docker rm $(docker ps -a -q)

13. 清除名称为none的镜像，一般都是下载一般失败的残留：

        docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker stop
        docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm
        docker images|grep none|awk '{print $3 }'|xargs docker rmi

14. 清除单个镜像：

        docker rmi -f <image id>

# dotnet core

1. 安装 `dotnet` 镜像，打开 https://hub.docker.com ，右上角搜索 `dotnet`，选择 `microsoft/dotnet`

2. 安装 `asp.net core` 镜像：

        sudo docker pull microsoft/dotnet

3. 检查镜像：

        sudo docker images

4. 切换到 publish 文件目录中

5. 新建一个 `Dockerfile` 文件：

        sudo touch Dockerfile
        sudo vim Dockerfile

6. 输入内容：

        #基于 `microsoft/dotnet:1.0.0-core` 来构建我们的镜像
        FROM microsoft/dotnet:1.0.0-core

        #拷贝项目publish文件夹中的所有文件到 docker容器中的publish文件夹中  
        COPY . /publish

        #设置工作目录为 `/publish` 文件夹，即容器启动默认的文件夹
        WORKDIR /publish

        #设置Docker容器对外暴露60000端口
        EXPOSE 60000

        #使用`dotnet HelloWebApp.dll`来运行应用程序

        CMD ["dotnet", "HelloWebApp.dll", "--server.urls", "http://*:60000"]

7. 构建镜像：

        docker build -t hellowebapp:1.0 .

8. 运行构建的镜像：

        docker run --name hellowebapp -d -p 60000:60000 hellowebapp:1.0

9. 浏览器访问 http://localhost:6000

