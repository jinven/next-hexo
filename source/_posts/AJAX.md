---
title: AJAX
date: 2019-12-29 16:08:49
tags:
- javascript
---

## AJAX

`AJAX` = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）
是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
1. 创建 `XMLHttpRequest` 对象
2. 设置 `onreadystatechange` 状态更改事件
2. 调用对象的 `open` 方法并规定请求类型（`GET`、`POST`、`PUT`、`DELETE`、`HEAD`、`OPTIONS`）、URL以及是否异步处理请求 `async`(`true`-异步|`false`-同步)
4. 可选，`setRequestHeader` 方法设置请求头
5. 调用对象的 `send` 方法将请求发送到服务器，当请求类型为 `POST`、`PUT` 时，可发送请求数据 `send(string)`

<!-- more -->

## 请求头

`content-type`

- `application/x-www-form-urlencoded`: Form Data
- `multipart/form-data`: Request Payload，可上传文件
- `application/json`: Request Payload
- `text/xml`: Request Payload
- `charset=UTF-8`

如：

`Content-Type: application/x-www-form-urlencoded; charset=UTF-8`

跨域

```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: content-type
Access-Control-Allow-Origin: *
Access-Control-Max-Age: 200
```

## 请求类型比较

所有HTTP请求都是这种格式：HTTP请求头+HTTP请求体

```
<method> <url> HTTP/1.1
<header1>: <headerValue1>
<header2>: <headerValue2>
...
<headerN>: <headerValueN>

<body data...>
```

`POST`:

一般只用于新增数据

`GET`:

chrome浏览器限制请求URL长度20000+个字符
一般只用于获取数据

`PUT`：

只用于更新数据

`DELETE`：

只用于删除数据

`HEAD`

只用于头请求

`OPTIONS`

只用于检测是否可访问，用于跨域检测

## 方法

`getAllResponseHeaders`

    检索资源（文件）的头信息

## onreadystatechange 事件

`readyState`:

```
存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
```

`status`:

```
200: "OK"
404: 未找到页面
100——客户必须继续发出请求
101——客户要求服务器根据请求转换HTTP协议版本
200——交易成功
201——提示知道新文件的URL
202——接受和处理、但处理未完成
203——返回信息不确定或不完整
204——请求收到，但返回信息为空
205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
206——服务器已经完成了部分用户的GET请求
300——请求的资源可在多处得到
301——删除请求数据
302——在其他地址发现了请求数据
303——建议客户访问其他URL或访问方式
304——客户端已经执行了GET，但文件未变化
305——请求的资源必须从服务器指定的地址得到
306——前一版本HTTP中使用的代码，现行版本中不再使用
307——申明请求的资源临时性删除
400——错误请求，如语法错误
401——请求授权失败
402——保留有效ChargeTo头响应
403——请求不允许
404——没有发现文件、查询或URl
405——用户在Request-Line字段定义的方法不允许
406——根据用户发送的Accept拖，请求资源不可访问
407——类似401，用户必须首先在代理服务器上得到授权
408——客户端没有在用户指定的饿时间内完成请求
409——对当前资源状态，请求不能完成
410——服务器上不再有此资源且无进一步的参考地址
411——服务器拒绝用户定义的Content-Length属性请求
412——一个或多个请求头字段在当前请求中错误
413——请求的资源大于服务器允许的大小
414——请求的资源URL长于服务器允许的长度
415——请求资源不支持请求项目格式
416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求
500——服务器产生内部错误
501——服务器不支持请求的函数
502——服务器暂时不可用，有时是为了防止发生系统过载
503——服务器过载或暂停维修
504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长
505——服务器不支持或拒绝支请求头中指定的HTTP版本
1xx:信息响应类，表示接收到请求并且继续处理
2xx:处理成功响应类，表示动作被成功接收、理解和接受
3xx:重定向响应类，为了完成指定的动作，必须接受进一步处理
4xx:客户端错误，客户请求包含语法错误或者是不能正确执行
5xx:服务端错误，服务器不能正确执行一个正确的请求
```

## 返回结果

`responseText`: 获得字符串形式的响应数据。

`responseXML`: 获得 XML 形式的响应数据。

## 例子

```js
var xmlhttp;
if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
} else {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        console.log(xmlhttp.responseText);
    }
}
xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);
xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xmlhttp.send();
```
