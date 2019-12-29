---
title: npm
date: 2019-12-29 16:01:54
tags:
---


# npm init

`npm init` 初始化当前目录为一个npm模块，逐步询问并确认信息后生成一个 `package.json` 文件
`npm init -y` 直接生成 `package.json` 文件

`package.json` 文件描述：http://package.json.is/

# npm install

`npm install` == `npm i` == `npm add`

## npm install 安装包

package（包）

- a. 包含文件描述的程序的 `package.json` 文件夹
- b. 包含 `a` 的压缩tarball
- c. 解析为 `b` 的网址
- d. `<name>@<version>` 在npm-registry（c）的注册表中发布的a
- e. 指向 `d` 的 `a` `<name>@<tag>`（参见npm-dist-tag）
- f. `<name>` 具有满足 `e` 的“最新”标签的a
- g. `<git remote url>` 解析为 `a` 的 `a`

<!-- more -->

即使从未发布过软件包，如果只想编写一个节点程序 `a`，或者如果还希望能够在打包后将其轻松安装到其他地方，使用npm仍然可以获得很多好处。放入压缩档 `b`。

- `npm install`

    将安装依赖到当前目录的 `node_modules` 文件夹中。全局模式下(带`-g`、`--global`参数)，它将当前程序包上下文（即，当前工作目录）安装为全局程序包。
    默认安装 `package.json` 文件中的列为依赖项的所有模块，带参数 `--production` 将不安装 `devDependencies`依赖

- `npm install [<@scope>/]<name>`

    进行 `<name>@<tag>` 安装，`<tag>` “标签”配置在哪里。（请参阅 npm-config。配置的默认值为latest。）
    在大多数情况下，这将安装latest在npm注册表上标记为的模块的版本 。

    例：

        npm install sax

    `npm install dependencies` 默认将所有指定的软件包保存到其中。此外，可以使用一些其他标志来控制在何处以及如何保存它们：

        -P, --save-prod：包将出现在 dependencies 中。这是默认设置，除非-D或-O存在。
        -D, --save-dev：包将出现在 devDependencies 中。
        -O, --save-optional：包将出现在 optionalDependencies 中。
        --no-save：防止保存到 dependencies。

    使用上述任何选项将依赖项保存到 `package.json` 时，还有两个附加的可选标志：

        -E, --save-exact 注意：保存的依赖项将使用确切的版本配置，而不是使用npm的默认 semver range 运算符。
        -B, --save-bundle：保存的依赖项也将添加到 bundleDependencies 列表中。

- `npm install [<@scope>/]<name>@<tag>`

    安装指定标签引用的软件包的版本。如果该程序包的注册表数据中不存在该标记，则此操作将失败。

    例：

        npm install sax@latest
        npm install @myorg/mypackage@latest

- `npm install [<@scope>/]<name>@<version>`

    安装指定版本的软件包。如果该版本尚未发布到注册表，则将失败。

    例：

        npm install sax@0.1.1
        npm install @myorg/privatepackage@1.5.0

- `npm install [<@scope>/]<name>@<version range>`

    安装与指定版本范围匹配的软件包版本。这将遵循解决依赖性的相同规则 `package.json`。
    请注意，大多数版本范围必须用引号引起来，以便您的外壳将其视为单个参数。
    例：

        npm install sax@">=0.1.0 <0.2.0"
        npm install @myorg/privatepackage@">=0.1.0 <0.2.0"


- `npm install <git-host>:<git-user>/<repo-name>`

- `npm install <git repo url>`

- `npm install <tarball file>`

    安装位于文件系统上的软件包。注意：如果只想将dev目录链接到npm根目录，则可以使用来更轻松地做到这一点npm link
    Tarball要求：

        文件名必须使用 .tar， .tar.gz 或 .tgz 作为扩展名。
        包装内容应位于tarball的子文件夹中（通常称为package/）。安装软件包时，npm会剥离一个目录层（相当于tar x --strip-components=1运行）。
        程序包必须包含package.json具有name和version属性的文件。

    例：

        npm install ./package.tgz

- `npm install <tarball url>`

    提取tarball网址，然后安装它。为了区分此选项和其他选项，参数必须以 `http://` 或 `https://` 开头

    例：

        npm install https://github.com/indexzero/forever/tarball/v0.5.6

- `npm install <folder>`

    将软件包作为当前项目中的符号链接安装在目录中。它的依赖项将在链接之前安装。如果 `<folder>` 位于项目的根目录下，则其依赖关系可能会node_modules像其他类型的依赖关系一样被提升到顶层。


## npm install 参数

`npm install xxx --global` == `npm install xxx -g`

`npm install xxx --production`

`npm install xxx --save`

    自动把模块和版本号添加到dependencies部分

`npm install xxx --save-dev` == `npm install xxx -D`

    自动把模块和版本号添加到devdependencies部分

`npm install xxx --save-prod` == `npm install xxx -P`

    默认，自动把模块和版本号添加到dependencies部分

`npm install xxx --save-optional` == `npm install xxx -O`


`npm install xxx --save-exact` == `npm install xxx -E`

`npm install xxx --save-bundle` == `npm install xxx -B`

`npm install xxx --no-save`

    阻止把模块和版本号添加到dependencies部分

`npm install xxx --dry-run`

# npm run

`npm run <scripts name>`

执行 `package.json` 文件 `scripts` 块中指定名称的命令

如 `package.json` 文件：

    ```json
    {
        "scripts": {
            "dev": "node a.js"
        }
    }
    ```

执行 `npm run dev` 命令，和执行 `node a.js` 是一样的


# npm clean-install

清空已安装模块

# npm rebuild

重建所有模块

# npm test

与 `npm run test` 一样

# npm start

与 `npm run start` 一样

# npm stop

与 `npm run stop` 一样

# npm publish

发布模块到社区

# npm search

寻找模块

# npm version

npm及相关模块版本信息

# npm uninstall

`npm uninstall <name>` 移除指定模块
