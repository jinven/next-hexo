---
title: springboot
date: 2019-12-01 00:39:00
tags:
- spring
---

使用Spring Boot可以轻松地创建独立的，基于生产级别的基于Spring的应用程序。

<!-- more -->

# 先决条件

## 安装必要软件

- [vs code](https://code.visualstudio.com/)
- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/) 或以上
- [Apache Maven 3.0](https://maven.apache.org/) 或以上，配置环境变量

## 配置JDK

1. 配置 `JDK_HOME` 环境变量
2. 配置 `JAVA_HOME` 环境变量
3. 将 `JAVA_HOME` 环境变量加入 `PATH` 变量


## 安装 vs code 插件

下载插件合集

- [vscode java installer](https://aka.ms/vscode-java-installer-win)

或者逐个安装

- [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
- [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
- [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
- [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
- [Java Dependency Viewer](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)
- [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

## 检查 Java 配置

在 `vs code` 中打开 `Command Palette` (Ctrl+Shift+P)，输入 `Java: Configure Java Runtime`，并回车，确保通过

## 配置 `maven` 下载源为阿里源

编辑 `apache-maven-3.6.3\conf\settings.xml` 文件，找到 `mirrors` 项，并添加配置

如：

```conf
<mirrors>
    <mirror>
        <id>aliyunmaven</id>
        <mirrorOf>*</mirrorOf>
        <name>阿里云公共仓库</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </mirror>
</mirrors>
```

打开 `vs code` 用户设置文件(Ctrl+,)，添加配置项

```json
{
    ...
    "java.configuration.maven.userSettings": "E:\\program\\apache\\maven\\apache-maven-3.6.3\\conf\\settings.xml"
}
```

# 创建项目

- 新建一个项目目录，用 `vs code` 打开这个目录
- 打开 `Command Palette` (Ctrl+Shift+P)，输入 `Spring Initializr` 生成一个 `Maven` 项目
- 会生成 `pom.xml` 文件，右击这个文件选择 `Edit starters`，会在 `Command Palette` 显示依赖

# 调试项目

`vs code` 中按 `F5`

# 生成并运行运行

1. 打开终端执行命令

```sh
mvn clean package
```

会在项目根目录下生成 `target` 文件夹，可执行 `jar` 文件为 `./target/***.jar`

2. 运行 `jar` 包

```sh
java -jar ***.jar
```

查看输出信息，并记录开启端口

3. 浏览器打开 `localhost:端口`

要指定生成  `war` 包，可在 `pom.xml` 文件添加配置项

```xml
<packaging>war</packaging>
```

执行命令

```
mvn tomcat:deploy
mvn tomcat:undeploy
```

