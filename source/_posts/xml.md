---
title: xml
date: 2019-12-01 00:00:01
tags: 
- xml
---

## XML 扩展标记语言：EXtensible Markup Lanuage

1. 与 `HTML` 的区别：
- `xml` 被设计用来传输和存储数据，纯文本，没有预定义标签和文档结构，需自定义
- `HTML` 被设计用来显示数据，有预定义标签和自己的文档结构

<!-- more -->

XML 不是对 HTML 的替代，是对 HTML 的补充，简化数据的共享、传输

`XML` 用于创建新的 `Internet` 语言，很多语言是通过 `XML` 创建的

- XHTML       最新的 HTML 版本
- WSDL        用于描述可用的 web service
- WAP/WML     用于手持设备的标记语言
- RSS         用于 RSS feed 的语言
- RDF/OWL     用于描述资源和本体
- SMIL        用于描述针对 web 的多媒体


2. 一个 `XML` 文档实例

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<note>
  <to>George</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Don't forget the meeting!</body>
</note>
```

第一行是 XML 声明。它定义 XML 的版本 (1.0) 和所使用的编码 (ISO-8859-1 = Latin-1/西欧字符集)。
第二行描述文档的根元素（像在说：“本文档是一个便签”）
接下来 4 行描述根的 4 个子元素（to, from, heading 以及 body）
最后一行定义根元素的结尾

3. `XML` 文档形成一种树结构

XML 文档必须包含根元素。该元素是所有其他元素的父元素。
XML 文档中的元素形成了一棵文档树。这棵树从根部开始，并扩展到树的最底端。
所有元素均可拥有子元素：

```xml
<root>
  <child>
    <subchild>.....</subchild>
  </child>
</root>
```

父、子以及同胞等术语用于描述元素之间的关系。父元素拥有子元素。相同层级上的子元素成为同胞（兄弟或姐妹）。
所有元素均可拥有文本内容和属性（类似 HTML 中）。

4. 所有 `XML` 元素都须有关闭标签

在 HTML，经常会看到没有关闭标签的元素：

```xml
<p>This is a paragraph
<p>This is another paragraph
```

在 `XML` 中，省略关闭标签是非法的。所有元素都必须有关闭标签：

```xml
<p>This is a paragraph</p>
<p>This is another paragraph</p>  
```

注释：XML 声明没有关闭标签。这不是错误。声明不属于XML本身的组成部分。它不是 XML 元素，也不需要关闭标签。

5. `XML` 标签对大小写敏感

```xml
<Message>这是错误的。</message>
<message>这是正确的。</message>
```

6. `XML` 必须正确地嵌套

在 HTML 中，常会看到没有正确嵌套的元素：

```xml
<b><i>This text is bold and italic</b></i>
```

在 XML 中，所有元素都必须彼此正确地嵌套：

```xml
<b><i>This text is bold and italic</i></b>
```

7. XML 文档必须有根元素

8. XML 的属性值须加引号

错误：

```xml
<note date=08/08/2008>
<to>George</to>
<from>John</from>
</note> 
```

正确：

```xml
<note date="08/08/2008">
<to>George</to>
<from>John</from>
</note>
```

9. 实体引用

如果你把字符 `<` 或 `&` 放在 XML 元素中，会发生错误，这是因为解析器会把它当作新元素的开始，这样会产生 XML 错误：

```xml
<message>if salary < 1000 then</message>
```

为了避免这个错误，用实体引用来代替 `<` 字符：

```xml
<message>if salary &lt; 1000 then</message> 
```

在 XML 中，有 5 个预定义的实体引用：

|          |        |        |
| -------- | ------ | ----   |
| `&lt;`   | &lt;   | 小于   |
| `&gt;`   | &gt;   | 大于   |
| `&amp;`  | &amp;  | 和号   |
| `&apos;` | &apos; | 单引号 |
| `&quot;` | &quot; | 引号   |

10. 在 XML 中，空格会被保留

11. XML 以 LF 存储换行

在 Windows 应用程序中，换行通常以一对字符来存储：回车符 (CR) 和换行符 (LF)。这对字符与打字机设置新行的动作有相似之处。在 Unix 应用程序中，新行以 LF 字符存储。而 Macintosh 应用程序使用 CR 来存储新行。

12. XML 命名规则

XML 元素必须遵循以下命名规则：

- 名称可以含字母、数字以及其他的字符
- 名称不能以数字或者标点符号开始
- 名称不能以字符 “xml”（或者 XML、Xml）开始
- 名称不能包含空格

可使用任何名称，没有保留的字词。
使名称具有描述性。使用下划线的名称也很不错。
名称应当比较简短，比如：`<book_title>`，而不是：`<the_title_of_the_book>`

避免 "-" 字符。如果您按照这样的方式进行命名："first-name"，一些软件会认为你需要提取第一个单词。

避免 "." 字符。如果您按照这样的方式进行命名："first.name"，一些软件会认为 "name" 是对象 "first" 的属性。

避免 ":" 字符。冒号会被转换为命名空间来使用。

XML 文档经常有一个对应的数据库，其中的字段会对应 XML 文档中的元素。有一个实用的经验，即使用数据库的名称规则来命名 XML 文档中的元素。

13. XML 属性

在 HTML 中（以及在 XML 中），属性提供有关元素的额外信息：

```xml
<img src="computer.gif">
<a href="demo.asp">
```

属性通常提供不属于数据组成部分的信息。文件类型与数据无关，但是对需要处理这个元素的软件来说却很重要：

```xml
<file type="gif">computer.gif</file>
```

在 XML 中，您应该尽量避免使用属性。如果信息感觉起来很像数据，那么请使用子元素。

因使用属性而引起的一些问题：

- 属性无法包含多重的值（元素可以）
- 属性无法描述树结构（元素可以）
- 属性不易扩展（为未来的变化）
- 属性难以阅读和维护

14. 验证 XML 文档

合法的 XML 文档是“形式良好”的 XML 文档，同样遵守文档类型定义 (DTD) 的语法规则：

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE note SYSTEM "Note.dtd">
<note>
<to>George</to>
<from>John</from>
<heading>Reminder</heading>
<body>Don't forget the meeting!</body>
</note>  
```

DTD 的作用是定义 XML 文档的结构。它使用一系列合法的元素来定义文档结构：

```xml
<!DOCTYPE note [
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to      (#PCDATA)>
<!ELEMENT from    (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body    (#PCDATA)>
]> 
```

15. 使用 `CSS` 显示 `XML`

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<?xml-stylesheet type="text/css" href="cd_catalog.css"?>
<CATALOG>
<CD>
    <TITLE>Empire Burlesque</TITLE>
    <ARTIST>Bob Dylan</ARTIST>
    <COUNTRY>USA</COUNTRY>
    <COMPANY>Columbia</COMPANY>
    <PRICE>10.90</PRICE>
    <YEAR>1985</YEAR>
</CD>
<CD>
    <TITLE>Hide your heart</TITLE>
    <ARTIST>Bonnie Tyler</ARTIST>
    <COUNTRY>UK</COUNTRY>
    <COMPANY>CBS Records</COMPANY>
    <PRICE>9.90</PRICE>
    <YEAR>1988</YEAR>
</CD>
</CATALOG>
```

`<?xml-stylesheet type="text/css" href="cd_catalog.css"?>`，把这个 XML 文件链接到 CSS 文件

cd_catalog.css

```css
CATALOG
{
  background-color: #ffffff;
  width: 100%;
}
CD
{
  display: block;
  margin-bottom: 30pt;
  margin-left: 0;
}
TITLE
{
  color: #FF0000;
  font-size: 20pt;
}
ARTIST
{
  color: #0000FF;
  font-size: 20pt;
}
COUNTRY,PRICE,YEAR,COMPANY
{
  display: block;
  color: #000000;
  margin-left: 20pt;
}
```

16. 使用 XSLT 显示 XML

XSLT 是首选的 XML 样式表语言。
XSLT (eXtensible Stylesheet Language Transformations) 远比 CSS 更加完善。
使用 XSLT 的方法之一是在浏览器显示 XML 文件之前，先把它转换为 HTML，正如以下的这些例子演示的那样：

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<?xml-stylesheet type="text/xsl" href="simple.xsl"?>
<breakfast_menu>
<food>
    <name>Belgian Waffles</name>
    <price>$5.95</price>
    <description>
    two of our famous Belgian Waffles
    </description>
    <calories>650</calories>
</food>
</breakfast_menu>
```

`<?xml-stylesheet type="text/xsl" href="simple.xsl"?>`，把这个 XML 文件链接到 XSL 文件

simple.xsl

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited with XML Spy v2007 (http://www.altova.com) -->
<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
<body style="font-family:Arial,helvetica,sans-serif;font-size:12pt;background-color:#EEEEEE">
    <xsl:for-each select="breakfast_menu/food">
    <div style="background-color:teal;color:white;padding:4px">
        <span style="font-weight:bold;color:white">
          <xsl:value-of select="name"/>
        </span>
        - <xsl:value-of select="price"/>
    </div>
    <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
        <xsl:value-of select="description"/>
        <span style="font-style:italic">
          (<xsl:value-of select="calories"/> calories per serving)
        </span>
    </div>
    </xsl:for-each>
</body>
</html>
```

直接使用样式：

```xml
<?xml version="1.0" encoding="UTF-16"?>
<html xmlns="http://www.w3.org/1999/xhtml">
  <body style="font-family:Arial,helvetica,sans-serif;font-size:12pt;&#xA;background-color:#EEEEEE">
    <div style="background-color:teal;color:white;padding:4px">
      <span style="font-weight:bold;color:white">Belgian Waffles</span>
      - $5.95
    </div>
    <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
      two of our famous Belgian Waffles with plenty of real maple syrup
      <span style="font-style:italic">(650 calories per serving)</span>
    </div>
    <div style="background-color:teal;color:white;padding:4px">
      <span style="font-weight:bold;color:white">Strawberry Belgian Waffles</span>
      - $7.95
    </div>
    <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
      light Belgian waffles covered with strawberries and whipped cream
      <span style="font-style:italic">(900 calories per serving)</span>
    </div>
    <div style="background-color:teal;color:white;padding:4px">
      <span style="font-weight:bold;color:white">Berry-Berry Belgian Waffles</span>
      - $8.95
    </div>
    <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
      light Belgian waffles covered with an assortment of fresh berries and whipped cream
      <span style="font-style:italic">(900 calories per serving)</span>
    </div>
    <div style="background-color:teal;color:white;padding:4px">
      <span style="font-weight:bold;color:white">French Toast</span>
      - $4.50
    </div>
    <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
      thick slices made from our homemade sourdough bread
      <span style="font-style:italic">(600 calories per serving)</span>
    </div>
    <div style="background-color:teal;color:white;padding:4px">
      <span style="font-weight:bold;color:white">Homestyle Breakfast</span>
      - $6.95
    </div>
    <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
      two eggs, bacon or sausage, toast, and our ever-popular hash browns
      <span style="font-style:italic">(950 calories per serving)</span>
    </div>
  </body>
</html>
```

17. XMLHttpRequest 对象

XMLHttpRequest 对象用于在后台与服务器交换数据。

- 在不重新加载页面的情况下更新网页
- 在页面已加载后从服务器请求数据
- 在页面已加载后从服务器接收数据
- 在后台向服务器发送数据

创建 XMLHttpRequest 对象的语法：

```js
xmlhttp=new XMLHttpRequest();
```

老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：

```js
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
```

实例 1

```html
<script type="text/javascript">
  var xmlhttp;
  function loadXMLDoc(url) {
    xmlhttp=null;
    if (window.XMLHttpRequest) {
      // code for all new browsers
      xmlhttp=new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // code for IE5 and IE6
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp!=null) {
      xmlhttp.onreadystatechange=state_Change;
      xmlhttp.open("GET",url,true);
      xmlhttp.send(null);
    } else {
      alert("Your browser does not support XMLHTTP.");
    }
  }
  function state_Change() {
    if (xmlhttp.readyState==4) {
      // 4 = "loaded"
      if (xmlhttp.status==200) {
        // 200 = OK
        console.log(xmlhttp.responseText);
      } else {
        alert("Problem retrieving XML data:" + xmlhttp.statusText);
      }
    }
  }
</script>
```

注释：onreadystatechange 是一个事件句柄。它的值 (state_Change) 是一个函数的名称，当 XMLHttpRequest 对象的状态发生改变时，会触发此函数。状态从 0 (uninitialized) 到 4 (complete) 进行变化。仅在状态为 4 时，我们才执行代码。

open() 的第三个参数中使用了 "true"。
该参数规定请求是否异步处理。
True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
onreadystatechange 事件使代码复杂化了。但是这是在没有得到服务器响应的情况下，防止代码停止的最安全的方法。
通过把该参数设置为 "false"，可以省去额外的 onreadystatechange 代码。如果在请求失败时是否执行其余的代码无关紧要，那么可以使用这个参数。

加载并解析 XML 文件：

```html
<script type="text/javascript">
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("GET","/example/xmle/note.xml",false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML;
  var to = xmlDoc.getElementsByTagName("to")[0].childNodes[0].nodeValue;
  var from = xmlDoc.getElementsByTagName("from")[0].childNodes[0].nodeValue;
  var body = xmlDoc.getElementsByTagName("body")[0].childNodes[0].nodeValue;
</script>
```

加载并解析 XML 字符串：

```html
<script>
  txt="<note>";
  txt=txt+"<to>George</to>";
  txt=txt+"<from>John</from>";
  txt=txt+"<heading>Reminder</heading>";
  txt=txt+"<body>Don't forget the meeting!</body>";
  txt=txt+"</note>";
  if (window.DOMParser) {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(txt,"text/xml");
  } else {
    // Internet Explorer
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.loadXML(txt);
  }
  var to=xmlDoc.getElementsByTagName("to")[0].childNodes[0].nodeValue;
  var from=xmlDoc.getElementsByTagName("from")[0].childNodes[0].nodeValue;
  var body=xmlDoc.getElementsByTagName("body")[0].childNodes[0].nodeValue;
</script>
```

18. 解析 XML 文档

```js
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","books.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
```

1. 通过微软的 XML 解析器来加载 XML

```js
var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
xmlDoc.async="false";
xmlDoc.load("note.xml");
```

2. 在 Firefox 及其他浏览器中的 XML 解析器

```js
var xmlDoc=document.implementation.createDocument("","",null);
xmlDoc.async="false";
xmlDoc.load("note.xml");
```

解析 XML 字符串

```js
txt="<bookstore><book>";
txt=txt+"<title>Everyday Italian</title>";
txt=txt+"<author>Giada De Laurentiis</author>";
txt=txt+"<year>2005</year>";
txt=txt+"</book></bookstore>";
if (window.DOMParser) {
  parser=new DOMParser();
  xmlDoc=parser.parseFromString(txt,"text/xml");
} else {
  // Internet Explorer
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async="false";
  xmlDoc.loadXML(txt);
}
```

注释：loadXML() 方法用于加载字符串（文本），load() 用于加载文件。

19. XML DOM

```js
xmlDoc.getElementsByTagName("to")[0].childNodes[0].nodeValue
```

- `xmlDoc`: 由解析器创建的 XML 文档
- `getElementsByTagName("to")[0]`: 第一个 `<to>` 元素
- `childNodes[0]`: `<to>` 元素的第一个子元素（文本节点）
- `nodeValue`: 节点的值（文本本身）

20. XML 命名空间（XML Namespaces）

在 XML 中，元素名称是由开发者定义的，当两个不同的文档使用相同的元素名时，就会发生命名冲突。
这个 XML 文档携带着某个表格中的信息：

```xml
<table>
  <tr>
    <td>Apples</td>
    <td>Bananas</td>
  </tr>
</table>
```

这个 XML 文档携带有关桌子的信息（一件家具）：

```xml
<table>
  <name>African Coffee Table</name>
  <width>80</width>
  <length>120</length>
</table>
```

假如这两个 XML 文档被一起使用，由于两个文档都包含带有不同内容和定义的 `<table>` 元素，就会发生命名冲突。
XML 解析器无法确定如何处理这类冲突。

使用前缀来避免命名冲突

```xml
<h:table>
  <h:tr>
    <h:td>Apples</h:td>
    <h:td>Bananas</h:td>
  </h:tr>
</h:table>
```

此 XML 文档携带着有关一件家具的信息：

```xml
<f:table>
  <f:name>African Coffee Table</f:name>
  <f:width>80</f:width>
  <f:length>120</f:length>
</f:table>
```

现在，命名冲突不存在了，这是由于两个文档都使用了不同的名称来命名它们的 `<table>` 元素 (`<h:table>` 和 `<f:table>)`。

通过使用前缀，我们创建了两种不同类型的 `<table>` 元素。

使用命名空间（Namespaces）

这个 XML 文档携带着某个表格中的信息：

```xml
<h:table xmlns:h="http://www.w3.org/TR/html4/">
  <h:tr>
    <h:td>Apples</h:td>
    <h:td>Bananas</h:td>
  </h:tr>
</h:table>
```

此 XML 文档携带着有关一件家具的信息：

```xml
<f:table xmlns:f="http://www.w3school.com.cn/furniture">
  <f:name>African Coffee Table</f:name>
  <f:width>80</f:width>
  <f:length>120</f:length>
</f:table>
```

与仅仅使用前缀不同，我们为 `<table>` 标签添加了一个 xmlns 属性，这样就为前缀赋予了一个与某个命名空间相关联的限定名称。

XML Namespace (xmlns) 属性
XML 命名空间属性被放置于元素的开始标签之中，并使用以下的语法：

```
xmlns:namespace-prefix="namespaceURI"
```

当命名空间被定义在元素的开始标签中时，所有带有相同前缀的子元素都会与同一个命名空间相关联。

21. XML CDATA

所有 XML 文档中的文本均会被解析器解析。
只有 CDATA 区段（CDATA section）中的文本会被解析器忽略。
PCDATA 指的是被解析的字符数据（Parsed Character Data）。
XML 解析器通常会解析 XML 文档中所有的文本。
当某个 XML 元素被解析时，其标签之间的文本也会被解析：

```xml
<message>此文本也会被解析</message>
```

术语 CDATA 指的是不应由 XML 解析器进行解析的文本数据（Unparsed Character Data）。
在 XML 元素中，`<` 和 `&` 是非法的。
`<` 会产生错误，因为解析器会把该字符解释为新元素的开始。
`&` 也会产生错误，因为解析器会把该字符解释为字符实体的开始。
某些文本，比如 JavaScript 代码，包含大量 `<` 或 `&` 字符。为了避免错误，可以将脚本代码定义为 CDATA。
CDATA 部分中的所有内容都会被解析器忽略。
CDATA 部分由 `<![CDATA[` 开始，由 `]]>` 结束：

```xml
<script>
<![CDATA[
  function matchwo(a,b)
  {
    if (a < b && a < 0) then
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }
]]>
</script>
```

解析器会忽略 CDATA 部分中的所有内容
