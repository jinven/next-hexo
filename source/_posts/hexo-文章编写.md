---
title: hexo-文章编写
date: 2019-12-28 00:00:01
tags:
---

编写文章的一些问题

<!-- more -->

https://hexo.io/zh-cn/docs/writing

# 列表显示摘要

默认列表显示的文章是整篇文章

```html
<!-- more -->
```

列表中可只显示 `<!-- more -->` 之前的内容，并显示 `阅读全文` 链接

## 特殊符号

hexo 编译时会处理某些字符

```
{% %}
{# #}
{{ }}
```

1. 使用 `raw` 解决，内容会直接输出，且不会进行 MarkDown 格式化

```
{% raw %}
内容
{% endraw %}
```

2. 修改 `nunjucks` 源码

```js
// node_modules/nunjucks/src/lexer.js
var VARIABLE_START = '{{';
var VARIABLE_END = '}}';
// 修改为
var VARIABLE_START = '{$';
var VARIABLE_END = '$}';
```

3. 放入 ``` 反引号代码块

# 特殊符号转义

```
! &#33; — 惊叹号 Exclamation mark
" &#34; &amp;quot; 双引号 Quotation mark
# &#35; — 数字标志 Number sign
$ &#36; — 美元标志 Dollar sign
% &#37; — 百分号 Percent sign
& &#38; &amp;amp; Ampersand
' &amp;#39; — 单引号 Apostrophe
( &#40; — 小括号左边部分 Left parenthesis
) &#41; — 小括号右边部分 Right parenthesis
* &#42; — 星号 Asterisk
+ &#43; — 加号 Plus sign
< &#60; &amp;lt; 小于号 Less than
= &#61; — 等于符号 Equals sign
- &#45; &amp;minus; — 减号
> &#62; &amp;gt; 大于号 Greater than
? &#63; — 问号 Question mark
@ &#64; — Commercial at
[ &#91; --- 中括号左边部分 Left square bracket
\ &#92; --- 反斜杠 Reverse solidus (backslash)
] &#93; — 中括号右边部分 Right square bracket
{ &#123; — 大括号左边部分 Left curly brace
| &#124; — 竖线Vertical bar
} &#125; — 大括号右边部分 Right curly brace
```
