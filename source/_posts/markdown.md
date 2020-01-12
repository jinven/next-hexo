---
title: markdown
date: 2019-12-29 16:08:30
tags:
- md
---

## 一、资料

1. <https://daringfireball.net/projects/markdown/>

## 二、例子

1. <a href="http://daringfireball.net/projects/downloads/Markdown_1.0.1.zip" target="_blank">Markdown_1.0.1.zip</a>
2. <a href="https://jinven.github.io/blog/demo/office/markdown.html" target="_blank">demo</a>

## 三、正文

- [简介](#fir-intro)
- [1.标题](#fir-head)
- [2.段落](#fir-para)
- [3.引用块](#fir-quote)
- [4.列表](#fir-list)
- [5.有序列表](#fir-sort)
- [6.链接](#fir-link)
- [7.图片](#fir-img)
- [8.代码](#fir-code)
- [9.代码块](#fir-pre)
- [10.横向规则](#fir-hr)
- [11.强调](#fir-strong)
- [12.自动链接](#fir-autolink)
- [13.反斜杠](#fir-backslash)
- [License](#fir-license)

<!-- more -->

<h2 id="fir-intro">简介</h2>

*Markdown is free software, available under the terms of a BSD-style open source license.*

Markdown旨在尽可能易于阅读和易于编写。

Markdown格式的文档应该像普通文本一样可以发布，而不是看起来像标记或格式化说明。

虽然Markdown的语法受到几个现有的文本到HTML过滤器的影响，包括 [Setext][001]， [atx][002]， [Textile][003]， [reStructuredText][004]， [Grutatext][005] 和 [EtText][006]， Markdown语法的最大灵感来源是纯文本电子邮件的格式。

[001]: http://docutils.sourceforge.net/mirror/setext.html
[002]: http://www.aaronsw.com/2002/atx/
[003]: http://textism.com/tools/textile/
[004]: http://docutils.sourceforge.net/rst.html
[005]: http://www.triptico.com/software/grutatxt.html
[006]: http://ettext.taint.org/doc/

为此，Markdown的语法完全由标点字符组成，标点字符经过精心挑选，看起来就像是它们的意思。例如，一个单词周围的星号实际上看起来像 \*emphasis\*，Markdown列表看起来像是列表。如果您使用过电子邮件，即使是块引用也看起来像是引用的文本段落。

### 内联HTML

Markdown的语法用于一个目的：用作为Web编写的格式。

Markdown不是HTML的替代品，甚至不接近它。它的语法非常小，仅对应于HTML标签的一小部分。我们的想法不是创建一种语法，以便更容易插入HTML标记。在我看来，HTML标签已经很容易插入。Markdown的想法是让阅读，编写和编辑散文变得容易。HTML是一种发布格式，Markdown是一种写作形式。因此，Markdown的格式化语法仅解决可以用纯文本传达的问题。

对于Markdown语法未涵盖的任何标记，您只需使用HTML本身。没有必要为它添加前缀或分隔它以表明您正在从Markdown切换到HTML，你只需使用标签。

唯一的限制是块级HTML元素，例如 `<div>`，`<table>`，`<pre>`，`<p>` 标签等，必须从周围用空行内容分离，并且该块的开始和结束标签不应与制表符或空格缩进。Markdown非常聪明，不会在HTML块级标签周围添加额外的 `<p>` 标签。

例如，要将一个HTML表添加到Markdown文章：

```html
This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.
```

请注意，在块级HTML标记中不处理Markdown格式化语法。例如，您不能在HTML块中使用Markdown样式 \*emphasis\*。

跨级HTML标记，例如 `<span>`，`<cite>` 或 `<del>`，可以在Markdown段落、列表项或标题中的任何位置使用。如果需要，您甚至可以使用HTML标签而不是Markdown格式。例如，如果您更喜欢使用 `<a>` 或 `<img>` 标签而不是Markdown的链接或图像语法，请继续。

不同于块级HTML标签，Markdown语法是跨度级标签内进行处理的。

### 特殊字符的自动转义

在HTML中，有两个字符需要特殊处理：`<` 和 `&`，左尖括号用于启动标签，＆ 符号用于表示HTML实体。如果要将它们用作文字字符，则必须将它们作为实体进行转义，例如 &lt; 和 &amp;。

特别是 ＆ 符号正在困扰网络作家。如果你想写 AT＆T，你需要写 AT&amp;amp;T。您甚至需要在URL中转义 ＆ 符号。因此，如果您想链接到：

http://images.google.com/images?num=30&q=larry+bird

您需要将URL编码为：

http://images.google.com/images?num=30&amp;amp;q=larry+bird

在您的锚标记href属性中，毋庸置疑，这很容易被遗忘，并且可能是其他标记良好的网站中HTML验证错误的最常见的单一来源。

Markdown允许您自然地使用这些字符，为您提供所有必要的逃避。如果您使用 ＆ 符号作为HTML实体的一部分，它将保持不变，否则它将被翻译成 &amp;amp;。

因此，如果您想在文章中加入版权符号，可以写：

&amp;copy;

而Markdown将不管它。但如果你写：

AT&T

Markdown会将其翻译为：

AT&amp;amp;T

同样，因为Markdown支持内联HTML，如果您使用尖括号作为HTML标记的分隔符，Markdown会将它们视为这样。但如果你写：

4 &lt; 5

Markdown会将其翻译为：

4 &amp;lt; 5

但是，在Markdown代码跨度和块内，尖括号和 ＆ 符号总是自动编码。这使得使用Markdown轻松编写HTML代码。（而不是原始的HTML，这是写HTML语法，一个可怕的格式，因为每一个 &lt; 与 & 都需要进行转义。）

---

<h2 id="fir-head">1.标题</h2>

Setext 形式：

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

或者文字下方至少有一个 `=` 号（一级标题）、 `-` 号（二级标题）：

```
一级标题
=======

二级标题
-------
```

atx 形式，n级标题文字前对应n个 `#` 号，您可以关闭 atx 样式的标题，这纯粹是装饰性的：

```
# 一级标题 #
## 二级标题 ##
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

输出：

# 一级标题 #
## 二级标题 ##
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

---

<h2 id="fir-para">2.段落</h2>

段落只是一个或多个连续的文本行，由一个或多个空行分隔

普通文本，等同于 `<p>` 标签：

```html
Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.

<p>Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.</p>
```

输出：

Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.

---

<h2 id="fir-quote">3.引用块</h2>

用 `>` 尖括号表示，等同于 `<blockquote>` 标签，Markdown允许你变懒，只把它放在 &gt; 段落的第一行之前，Blockquotes可以包含其他Markdown元素，包括标题，列表和代码块：

```html
> This is a blockquote.
This is the first level of quoting.
> 
>     This is the second paragraph in the blockquote.
>
> > This is nested blockquote.
>
> ## This is an H2 in a blockquote

<blockquote>
    <p>This is a blockquote.
    This is the first level of quoting.</p>
    <pre>
        <code>This is the second paragraph in the blockquote.</code>
    </pre>
    <blockquote>
        <p>This is nested blockquote.</p>
    </blockquote>
    <ol>
        <li>This is the first list item.</li>
        <li>This is the second list item.</li>
    </ol>
    <h2>This is an H2 in a blockquote</h2>
</blockquote>
```

输出：

> This is a blockquote.
This is the first level of quoting.
> 
>     This is the second paragraph in the blockquote.
>
> > This is nested blockquote.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
>
> ## This is an H2 in a blockquote

<h2 id="fir-list">4.列表</h2>

无序（项目符号）列表使用星号、加号和连字符（`*`，`+`，`-`）作为列表标记，等同于 `<ul>`、`<li>` 组合标签：

```html
*   Candy.
*   Gum.
*   Booze.

+   Candy.
+   Gum.
+   Booze.

-   Candy.
-   Gum.
-   Booze.

<ul>
    <li>Candy.</li>
    <li>Gum.</li>
    <li>Booze.</li>
</ul>
```

如果在项之间放置空行，则会获得 `<p>` 列表项文本的标记。您可以通过将段落缩进4个空格或1个制表符来创建多段列表项：

```html
*   A list item.

    With multiple paragraphs.

*   Another item in the list.

<ul>
    <li><p>A list item.</p>
    <p>With multiple paragraphs.</p></li>
    <li><p>Another item in the list.</p></li>
</ul>
```

输出：

*   Candy.
*   Gum.
*   Booze.

*   A list item.

    With multiple paragraphs.

*   Another item in the list.


<h2 id="fir-sort">5.有序列表</h2>

使用常规数字，后跟句点作为列表标记，等同于 `<ol>`、`<li>` 组合标签，标记列表的实际数字对Markdown产生的HTML输出没有影响。

```html
1.  Red
3.  Green
2.  Blue

<ol>
    <li>Red</li>
    <li>Green</li>
    <li>Blue</li>
</ol>
```

输出：

1.  Red
3.  Green
2.  Blue

<h2 id="fir-link">6.链接</h2>

两种方式：内联和引用

内联样式链接在链接文本后立即使用括号，Title是可选的：

```html
This is an [example link](http://example.com/ "With a Title").

<p>This is an <a href="http://example.com/" title="With a Title">
example link</a>.</p>
```

引用样式链接允许您按名称引用链接，您可以在文档的其他位置定义它们，title属性是可选的。链接名称可能包含字母，数字和空格，但不区分大小写，如果您在同一服务器上引用本地资源，则可以使用相对路径：

```html
I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].
I start my morning with a cup of coffee and [The New York Times][NY Times].
See my [About](/about/) page for details.

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"
[ny times]: http://www.nytimes.com/

<p>
    I get 10 times more traffic from <a href="http://google.com/" title="Google">Google</a> than from <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/" title="MSN Search">MSN</a>.
</p>
<p>I start my morning with a cup of coffee and <a href="http://google.com/">The New York Times</a>.</p>
<p>See my <a href="/about/">About</a> page for details.</p>
```

输出：

This is an [example link](http://example.com/ "With a Title").

I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].

I start my morning with a cup of coffee and [The New York Times][NY Times].

See my [About](/about/) page for details.

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"
[ny times]: http://www.nytimes.com/

<h2 id="fir-img">7.图片</h2>

图像语法非常类似于链接语法。

内联（标题是可选的）：

```html
![alt text](/images/comment.gif "Title")

<img src="/path/to/img.jpg" alt="alt text" title="Title" />
```

引用：

```
![alt text][id]

[id]: https://daringfireball.net/graphics/logos/ "Title"
```

输出：

![alt text](/images/comment.gif "Title")

![alt text][id]

[id]: https://daringfireball.net/graphics/logos/ "Title"

<h2 id="fir-code">8.代码</h2>

您可以通过在反引号中包装文本来创建代码范围。任何 `＆` 符号和尖括号（`<` 或 `>`）都将自动转换为HTML实体。

```html
I strongly recommend against using any `<blink>` tags.

I wish SmartyPants used named entities like `&mdash;`
instead of decimal-encoded entites like `&#8212;`.

<p>I strongly recommend against using any <code>&lt;blink&gt;</code> tags.</p>

<p>I wish SmartyPants used named entities like <code>&amp;mdash;</code> instead of decimal-encoded entites like <code>&amp;#8212;</code>.</p>
```

要指定整个预格式化代码块，请将块的每一行缩进4个空格或1个制表符。就像使用代码段，&amp;， &lt; 和 &gt; 字符将被自动转义。

```html
If you want your page to validate under XHTML 1.0 Strict,
you've got to put paragraph tags in your blockquotes:

    <blockquote>
        <p>For example.</p>
    </blockquote>

`&#8212;` is the decimal-encoded equivalent of `&mdash;`.

<p>If you want your page to validate under XHTML 1.0 Strict,
you've got to put paragraph tags in your blockquotes:</p>

<pre><code>&lt;blockquote&gt;
    &lt;p&gt;For example.&lt;/p&gt;
&lt;/blockquote&gt;
</code></pre>

<p><code>&amp;#8212;</code> is the decimal-encoded equivalent of <code>&amp;mdash;</code>.</p>
```

要在代码范围内包含文字反引号字符，可以使用多个反引号作为开始和结束分隔符：

```html
``There is a literal backtick (`) here.``

<p><code>There is a literal backtick (`) here.</code></p>
```

围绕代码跨度的反引号分隔符可以包括空格，一个在打开之后，一个在结束之前。这允许您在代码范围的开头或结尾放置文字反引号字符：

```html
A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``

<p>A single backtick in a code span: <code>`</code></p>

<p>A backtick-delimited string in a code span: <code>`foo`</code></p>
```

输出：

I strongly recommend against using any `<blink>` tags.

I wish SmartyPants used named entities like `&mdash;`
instead of decimal-encoded entites like `&#8212;`.

If you want your page to validate under XHTML 1.0 Strict,
you've got to put paragraph tags in your blockquotes:

    <blockquote>
        <p>For example.</p>
    </blockquote>

`&#8212;` is the decimal-encoded equivalent of `&mdash;`.

``There is a literal backtick (`) here.``

<h2 id="fir-pre">9.代码块</h2>

预格式化的代码块用于编写有关编程或标记源代码的内容。不是形成正常的段落，而是按字面解释代码块的行。Markdown在两个 `<pre>` 和 `<code>` 标签中包装代码块。

要在Markdown中生成代码块，只需将块的每一行缩进至少4个空格或1个制表符。例如：

```html
This is a normal paragraph:

    This is a code block.

<p>This is a normal paragraph:</p>

<pre><code>This is a code block.
</code></pre>
```

从代码块的每一行中删除一级缩进4个空格或1个制表符，例如：

```html
Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

<p>Here is an example of AppleScript:</p>

<pre><code>tell application "Foo"
    beep
end tell
</code></pre>
```

代码块一直持续到它没有缩进的行（或文章的结尾）。

在代码块中，＆ 符号和尖括号会自动转换为HTML实体。这样就可以很容易地使用Markdown包含示例HTML源代码，只需将其粘贴并缩进即可，Markdown将处理编码 ＆ 符号和尖括号的麻烦。例如：

```html
<div class="footer">
    &copy; 2004 Foo Corporation
</div>

<pre><code>&lt;div class="footer"&gt;
    &amp;copy; 2004 Foo Corporation
&lt;/div&gt;
</code></pre>
```

在代码块中不处理常规Markdown语法。例如，星号只是代码块中的字面星号。这意味着使用Markdown编写Markdown自己的语法也很容易。

输出：

This is a normal paragraph:

    This is a code block.

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

---

<h2 id="fir-hr">10.横向规则</h2>

您可以通过在一行上放置三个或更多连字符，星号或下划线来生成水平规则标记 `<hr />`。 如果您愿意，可以在连字符或星号之间使用空格。 以下每一行都将生成一个水平规则：

```
* * *

***

*****

- - -

---------------------------------------
```

输出：

* * *

---

<h2 id="fir-strong">11.强调</h2>

Markdown将星号 `*` 和下划线 `_` 视为重点的指标。用一个 `*` 或 `_` 包装文本等同于用 `<em>` 标签包装文本，两个 `*` 或 `_` 等同于 `<strong>` 标签，必须使用相同的字符来打开和关闭强调范围。例如：

```html
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

<em>single asterisks</em>

<em>single underscores</em>

<strong>double asterisks</strong>

<strong>double underscores</strong>
```

输出：

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

---

<h2 id="fir-autolink">12.自动链接</h2>

Markdown支持用于为URL和电子邮件地址创建自动链接的快捷方式，只需用尖括号括起URL或电子邮件地址即可。这意味着，如果您想要显示URL或电子邮件地址的实际文本，并且还有一个可点击的链接，您可以这样做：

```html
<http://example.com/>

<a href="http://example.com/">http://example.com/</a>
```

电子邮件地址的自动链接的工作方式类似，但Markdown还会执行一些随机十进制和十六进制的实体编码。例如：

```html
<address@example.com>

<a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;">&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a>
```

它将在浏览器中呈现为 address@example.com 的可点击链接。

（这种实体编码技巧确实会欺骗许多地址获取机器人，但它肯定不会欺骗所有这些机器人。它总比没有好，但以这种方式发布的地址最终可能会开始接收垃圾邮件。）

输出：

<http://example.com/>

<address@example.com>

<h2 id="fir-backslash">13.反斜杠</h2>

Markdown允许您使用反斜杠转义来生成文字字符，否则这些字符在Markdown的格式化语法中具有特殊含义。例如，如果你想用文字星号（而不是 `<em>` 标签）包围一个单词，你可以在星号之前使用反斜杠，如下所示：

```
\*literal asterisks\*
```

Markdown为以下字符提供反斜杠转义：

```
\   backslash
`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark
```

---

<h2 id="fir-license">License</h2>

-------

<p>Copyright © 2004, John Gruber <br />
<a href="http://daringfireball.net/">http://daringfireball.net/</a> <br />
All rights reserved.</p>

<p>Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:</p>

<ul>
<li><p>Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.</p></li>
<li><p>Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.</p></li>
<li><p>Neither the name "Markdown" nor the names of its contributors may
be used to endorse or promote products derived from this software
without specific prior written permission.</p></li>
</ul>

<p>This software is provided by the copyright holders and contributors "as
is" and any express or implied warranties, including, but not limited
to, the implied warranties of merchantability and fitness for a
particular purpose are disclaimed. In no event shall the copyright owner
or contributors be liable for any direct, indirect, incidental, special,
exemplary, or consequential damages (including, but not limited to,
procurement of substitute goods or services; loss of use, data, or
profits; or business interruption) however caused and on any theory of
liability, whether in contract, strict liability, or tort (including
negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.</p>

