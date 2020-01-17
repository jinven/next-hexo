---
title: docker-node测试
date: 2019-12-01 00:33:00
tags: 
- docker
---

# 搭建环境

使用 `CentOS 7`
1. 安装 `docker`
```sh
yum -y install docker-ce
```
2. 启动 `docker`
```sh
systemctl start docker
```

<!-- more -->

3. 安装 `node`

# 创建 node 应用

1. 选择一个目录进行创建

```sh
mkdir docker_web_app
cd docker_web_app
npm init -y
```

2. 修改 `package.json` 文件

```json
{
    "name": "docker_web_app",
    "version": "1.0.0",
    "description": "Node.js on Docker",
    "author": "First Last <first.last@example.com>",
    "main": "server.js",
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "express": "^4.16.1"
    }
}
```

4. 安装依赖

```sh
npm install
```

5. 创建 `server.js` 文件

```js
'use strict';
const express = require('express');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

# 配置 docker

1. 创建 Dockerfile 文件

```conf
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

2. 创建 `.dockerignore` 文件

```conf
node_modules
npm-debug.log
```

3. 拉取 `node` 镜像

```sh
docker pull hub-mirror.c.163.com/library/node:10
```

# 运行

1. 构建镜像并标记为指定名称 `myname/node-web-app`

```sh
docker build -t myname/node-web-app .
```

2. 查看镜像

```sh
docker images
```

3. 运行镜像

```sh
docker run -p 49160:8080 -d myname/node-web-app
```

4. 查看镜像ID和日志

```sh
docker ps
docker logs
```

5. 进入镜像

```sh
docker exec -it 镜像ID /bin/bash
```
