---
title: protobuf和graphql
date: 2019-12-01 00:00:50
tags:
- protobuf
- graphql
---

```sh
# protobufjs 
# https://github.com/protobufjs/protobuf.js
npm install protobufjs --save
```

- Protocol Buffer 演示页面： https://next-new.now.sh/protobuf
- GraphiQL 演示页面：https://next-new.now.sh/graphql

<!-- more -->

# protobuf

[测试页面源码](https://github.com/jinven/next-demo/blob/master/pages/protobuf.js)、[测试接口源码](https://github.com/jinven/next-demo/blob/master/pages/api/protobuf.js)

```js
// 全库：19kb gzipped
var protobuf = require("protobufjs");
// 轻量库：16kb gzipped
// var protobuf = require("protobufjs/light");
// 最小库：6.5kb gzipped
// var protobuf = require("protobufjs/minimal");
```

Protocol Buffer 是谷歌开发的处理结构化数据的工具。

是TensorFlow系统、gRPC框架中使用到的重要工具。

如：

```
name: 张三
id: 12345
email: zhangsan@abc.com
```

就是一个结构化的数据，要将这些结构化的用户信息持久化或进行网络传输时，就需要先将他们序列化。

就是变成数据流的格式，简单地说就是变为一个字符串。

终端从序列化的数据流中还原出来的结构化数据，统称为处理结构化数据，这就是 Protocol Buffer 解决的主要问题。

常用结构化处理类型有：XML 和 JSON，序列化后的字符串是可读的。

不同的是，Protocol Buffer 序列化之后的数据不是可读的字符串，是二进制流。

还原序列化之后的数据需要使用预先定义好的数据格式，数据格式文件一般保存在 .proto 文件中，每个 message 代表一类结构化的数据。

如：

```
message user {
  optional string name = 1;
  required int32 id = 2;
  repeated string email 3;
}
```

message 定义了每一个属性的类型和名字，类型可以是：

- 布尔： `bool`
- 整数： `s-/u-/int32`、`s-/fixed32`
- 大整数： `s-/u-/int64`、s-/fixed64
- 实数： `float`、`double`
- 字符串： `string`
- 数组： `bytes`
- 枚举： `enum`
- 消息对象： `message`

`syntax = "proto2"` 属性的修饰符：

- `required`: 必需的
- `optional`: 可选的
- `repeated`: 可重复的

`syntax = "proto3"` 只保留 repeated

`= 1`、`= 2`、`= 3` 代表属性的id

有效消息有两种类型：

- 消息实例
- plain javascript 对象

## 常用方法

- `Message.verify(message: Object): null|string`

验证纯JavaScript对象是否满足有效消息的要求

```js
var payload = "invalid (not an object)";
var err = AwesomeMessage.verify(payload);
if (err)
  throw Error(err);
```

- `Message.encode(message: Message|Object [, writer: Writer]): Writer`

对消息实例或有效的普通JavaScript对象进行编码

```js
var buffer = AwesomeMessage.encode(message).finish();
```

- `Message.encodeDelimited(message: Message|Object [, writer: Writer]): Writer`

像Message.encode一样工作，但另外将消息的长度添加为varint。

- `Message.decode(reader: Reader|Uint8Array): Message`

将缓冲区解码为消息实例

```js
try {
  var decodedMessage = AwesomeMessage.decode(buffer);
} catch (e) {
    if (e instanceof protobuf.util.ProtocolError) {
      // e.instance holds the so far decoded message with missing required fields
    } else {
      // wire format is invalid
    }
}
```

- `Message.decodeDelimited(reader: Reader|Uint8Array): Message`

像Message.decode一样工作，但还读取以varint开头的消息的长度。

- `Message.create(properties: Object): Message`

从一组满足有效消息要求的属性中创建一个新的消息实例。 

如果适用，建议优先使用 `Message.create` 而不是 `Message.fromObject`，因为它不会执行可能的冗余转换。

```js
var message = AwesomeMessage.create({ awesomeField: "AwesomeString" });
```

- `Message.fromObject(object: Object): Message`

使用上表中概述的转换步骤，将任何无效的普通JavaScript对象转换为消息实例。

```js
var message = AwesomeMessage.fromObject({ awesomeField: 42 });
// converts awesomeField to a string
```

- `Message.toObject(message: Message [, options: ConversionOptions]): Object`

将消息实例转换为任意纯JavaScript对象，以与其他库或存储实现互操作性。

根据指定的实际转换选项，生成的普通JavaScript对象可能仍满足有效消息的要求，但大多数情况下不满足。

```js
var object = AwesomeMessage.toObject(message, {
  enums: String,  // enums as string names
  longs: String,  // longs as strings (requires long.js)
  bytes: String,  // bytes as base64 encoded strings
  defaults: true, // includes default values
  arrays: true,   // populates empty arrays (repeated fields) even if defaults=false
  objects: true,  // populates empty objects (map fields) even if defaults=false
  oneofs: true    // includes virtual oneof fields set to the present field's name
});
```

## 官方示例

### get/set

```js
var protobuf = require("protobufjs");
var proto = "syntax=\"proto3\";\
message MyMessage {\
  string some_field = 1;\
}";
var root = protobuf.parse(proto, { keepCase: true }).root;
function toCamelCase(str) {
  return str.substring(0,1) + str.substring(1).replace(/_([a-z])(?=[a-z]|$)/g, function($0, $1) { return $1.toUpperCase(); });
}
function addAliasProperty(type, name, aliasName) {
  if (aliasName !== name)
    Object.defineProperty(type.ctor.prototype, aliasName, {
      get: function() { return this[name]; },
      set: function(value) { this[name] = value; }
    });
}
function addVirtualCamelcaseFields(type) {
  type.fieldsArray.forEach(function(field) {
    addAliasProperty(type, field.name, toCamelCase(field.name));
  });
  type.oneofsArray.forEach(function(oneof) {
    addAliasProperty(type, oneof.name, toCamelCase(oneof.name));
  });
  return type;
}
var MyMessage = addVirtualCamelcaseFields(root.lookup("MyMessage"));
var myMessage = MyMessage.create({
  some_field: "hello world"
});
console.log(
  "someField:", myMessage.someField,
  "\nsome_field:", myMessage.some_field,
  "\nJSON:", JSON.stringify(myMessage)
);
// 输出
// someField: hello world
// some_field: hello world
// JSON: {"some_field":"hello world"}
```
### traverse-types

```js
var protobuf = require("protobufjs");
var proto = "syntax=\"proto3\";\
package example;\
message Foo {\
  string a = 1;\
}\
message Bar {\
  uint32 b = 1;\
  \
  message Inner {\
    bytes c = 1;\
  }\
}";
protobuf.parse.filename = "traverse-types.proto";
var root = protobuf.parse(proto).root;
function traverseTypes(current, fn) {
  if (current instanceof protobuf.Type) 
    fn(current);
  if (current.nestedArray)
    current.nestedArray.forEach(function(nested) {
      traverseTypes(nested, fn);
    });
}
traverseTypes(root, function(type) {
  console.log(
    type.constructor.className + " " + type.name
    + "\n  fully qualified name: " + type.fullName
    + "\n  defined in: " + type.filename
    + "\n  parent: " + type.parent + " in " + type.parent.filename
  );
});
```

### streaming-rpc

```js
var protobuf = require("protobufjs");
var root = protobuf.Root.fromJSON({
  nested: {
    Greeter: {
      methods: {
        "SayHello": {
          requestType: "Hello",
          requestStream: true,
          responseType: "World",
          responseStream: true
        }
      }
    },
    Hello: {
      fields: {
        name: {
          type: "string",
          id: 1
        }
      }
    },
    World: {
      fields: {
        message: {
          type: "string",
          id: 1
        }
      }
    }
  }
});
var Greeter = root.lookup("Greeter"),
  Hello   = root.lookup("Hello"),
  World   = root.lookup("World");
var greeter = Greeter.create((function() {
  var ended = false;
  return function myRPCImpl(method, requestData, callback) {
    if (ended)
      return;
    if (!requestData) {
      ended = true;
      return;
    }
    performRequestOverTransportChannel(requestData, function(responseData) {
      callback(null, responseData);
    });
  };
})(), true, true);
function performRequestOverTransportChannel(requestData, callback) {
  setTimeout(function() {
    var request = Hello.decodeDelimited(requestData);
    var response = { message: "Hello " + request.name };
    setTimeout(function() {
      callback(World.encodeDelimited(response).finish());
    }, Math.random() * 250);
  }, Math.random() * 250);
}
greeter.on("data", function(response, method) {
  console.log("data in " + method.name + ":", response.message);
});
greeter.on("end", function() {
  console.log("end");
});
greeter.on("error", function(err, method) {
  console.log("error in " + method.name + ":", err);
});
greeter.sayHello({ name: "one" });
greeter.sayHello(Hello.create({ name: "two" }));
greeter.on("status", function(code, text) {
  console.log("custom status:", code, text);
});
greeter.emit("status", 200, "OK");
setTimeout(function() {
  greeter.end();
  greeter.sayHello({ name: "three" }, function(err) {
    console.error("this should fail: " + err.message);
  });
}, 501);
// 输出
// custom status: 200 OK
// data in SayHello: Hello one
// data in SayHello: Hello two
// end
// this should fail: already ended
```

## 使用 .proto 文件

可以使用完整的库加载现有的 `.proto` 文件，该库分析并编译定义以准备使用（基于反射）消息类：

```js
// awesome.proto
package awesomepackage;
syntax = "proto3";
message AwesomeMessage {
  string awesome_field = 1; // becomes awesomeField
}
```

```js
protobuf.load("awesome.proto", function(err, root) {
  if (err)
    throw err;
  // Obtain a message type
  var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
  // Exemplary payload
  var payload = { awesomeField: "AwesomeString" };
  // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
  var errMsg = AwesomeMessage.verify(payload);
  if (errMsg)
    throw Error(errMsg);
  // Create a new message
  var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
  // Encode a message to an Uint8Array (browser) or Buffer (node)
  var buffer = AwesomeMessage.encode(message).finish();
  // ... do something with buffer
  // Decode an Uint8Array (browser) or Buffer (node) to a message
  var message = AwesomeMessage.decode(buffer);
  // ... do something with message
  // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
  // Maybe convert the message back to a plain object
  var object = AwesomeMessage.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
    // see ConversionOptions
  });
});
```

可以使用 `promise` 语法

```js
protobuf.load("awesome.proto").then(function(root) {
  // ...
});
```


## 使用 JSON 描述符

该库使用与.proto定义等效的JSON描述符。 例如，以下内容与上面的.proto定义相同：

```json
// awesome.json
{
  "nested": {
    "AwesomeMessage": {
      "fields": {
        "awesomeField": {
          "type": "string",
          "id": 1
        }
      }
    }
  }
}
```

仅使用JSON描述符而不是.proto文件，可以仅使用light库（在这种情况下不需要解析器）。

可以使用通常的方式加载JSON描述符：

```js
protobuf.load("awesome.json", function(err, root) {
  if (err) throw err;
  // Continue at "Obtain a message type" above
});
```

或者可以内联加载：

```js
var jsonDescriptor = require("./awesome.json"); // exemplary for node
var root = protobuf.Root.fromJSON(jsonDescriptor);
// Continue at "Obtain a message type" above
```

## 仅使用反射

完整库和light库均包含完整反射支持。

例如，可以仅使用反射来定义在以上示例中看到的.proto定义：

```js
// ...
var Root  = protobuf.Root,
  Type  = protobuf.Type,
  Field = protobuf.Field;
var AwesomeMessage = new Type("AwesomeMessage").add(new Field("awesomeField", 1, "string"));
var root = new Root().define("awesomepackage").add(AwesomeMessage);
// Continue at "Create a new message" above
// ...
```

## 使用自定义类

消息类还可以使用自定义功能进行扩展，还可以使用反射的消息类型注册自定义构造函数：

```js
// ...
// Define a custom constructor
function AwesomeMessage(properties) {
  // custom initialization code
  // ...
}
// Register the custom constructor with its reflected type (*)
root.lookupType("awesomepackage.AwesomeMessage").ctor = AwesomeMessage;
// Define custom functionality
AwesomeMessage.customStaticMethod = function() { ... };
AwesomeMessage.prototype.customInstanceMethod = function() { ... };
// Continue at "Create a new message" above
```

（*）除了通过AwesomeMessage。

$type 和 AwesomeMesage＃$type 引用其反射类型之外，各个自定义类还会自动填充：

- AwesomeMessage.create
- AwesomeMessage.encode 和 AwesomeMessage.encodeDelimited
- AwesomeMessage.decode 和 AwesomeMessage.decodeDelimited
- AwesomeMessage.verify
- AwesomeMessage.fromObject
- AwesomeMessage.toObject
- AwesomeMessage#toObject
- AwesomeMessage#toJSON

然后，此类型的解码消息为AwesomeMessage的instance。

另外，如果不需要自定义初始化代码，也可以重用和扩展内部构造函数：

```js
// ...
// Reuse the internal constructor
var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage").ctor;
// Define custom functionality
AwesomeMessage.customStaticMethod = function() { ... };
AwesomeMessage.prototype.customInstanceMethod = function() { ... };
// Continue at "Create a new message" above
```

## 使用 services

该库还支持使用服务，但不对实际的传输通道做任何假设。

相反，用户必须提供合适的RPC实现，这是一个异步函数，它将反射的服务方法，二进制请求和节点样式的回调作为其参数：

```js
function rpcImpl(method, requestData, callback) {
  // perform the request using an HTTP request or a WebSocket for example
  var responseData = ...;
  // and call the callback with the binary response afterwards:
  callback(null, responseData);
}
```

```js
// greeter.proto
syntax = "proto3";
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}
message HelloRequest {
  string name = 1;
}
message HelloReply {
  string message = 1;
}
```

```js
// ...
var Greeter = root.lookup("Greeter");
var greeter = Greeter.create(/* see above */ rpcImpl, /* request delimited? */ false, /* response delimited? */ false);
greeter.sayHello({ name: 'you' }, function(err, response) {
  console.log('Greeting:', response.message);
});
```

也支持 `promise`

```js
greeter.sayHello({ name: 'you' }).then(function(response) {
    console.log('Greeting:', response.message);
  }
);
```

## 使用 TypeScript

该库附带了自己的[类型定义](https://github.com/dcodeIO/protobuf.js/blob/master/index.d.ts)，现代编辑器（如Visual Studio Code）将自动检测并使用它们来完成代码。

npm包由于 `Buffer` 而依赖于 [@types/node](https://www.npmjs.com/package/@types/node)，而由于 `Long` 而依赖于 [@types/long](https://www.npmjs.com/package/@types/long)。

如果不是为节点而构建和/或未使用long.js，则手动删除它们应该是安全的。

## 使用JS API

上面显示的API与TypeScript的工作原理几乎相同。

但是，由于所有内容均已键入，因此访问动态生成的消息类的实例上的字段需要使用方括号（即`message["awesomeField"]`）或显式强制转换。

或者，可以使用为其静态副本生成的类型文件。

```js
import { load } from "protobufjs"; // respectively "./node_modules/protobufjs"
load("awesome.proto", function(err, root) {
  if (err)
    throw err;
  // example code
  const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
  let message = AwesomeMessage.create({ awesomeField: "hello" });
  console.log(`message = ${JSON.stringify(message)}`);
  let buffer = AwesomeMessage.encode(message).finish();
  console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
  let decoded = AwesomeMessage.decode(buffer);
  console.log(`decoded = ${JSON.stringify(decoded)}`);
});
```

## 使用生成的静态代码

如果使用CLI将静态代码生成为bundle.js，并将其类型定义生成为bundle.d.ts，则可以执行以下操作：

```js
import { AwesomeMessage } from "./bundle.js";
// example code
let message = AwesomeMessage.create({ awesomeField: "hello" });
let buffer  = AwesomeMessage.encode(message).finish();
let decoded = AwesomeMessage.decode(buffer);
```

## 使用装饰器

该库还包括装饰器的早期实现。

请注意，装饰器是TypeScript中的实验功能，并且声明顺序很重要，具体取决于JS目标。

例如，`@Field.d(2,AwesomeArrayMessage)` 要求在定位ES5时已提前定义 AwesomeArrayMessage。

```ts
import { Message, Type, Field, OneOf } from "protobufjs/light"; // respectively "./node_modules/protobufjs/light.js"
export class AwesomeSubMessage extends Message<AwesomeSubMessage> {
  @Field.d(1, "string")
  public awesomeString: string;
}
export enum AwesomeEnum {
  ONE = 1,
  TWO = 2
}
@Type.d("SuperAwesomeMessage")
export class AwesomeMessage extends Message<AwesomeMessage> {
  @Field.d(1, "string", "optional", "awesome default string")
  public awesomeField: string;
  @Field.d(2, AwesomeSubMessage)
  public awesomeSubMessage: AwesomeSubMessage;
  @Field.d(3, AwesomeEnum, "optional", AwesomeEnum.ONE)
  public awesomeEnum: AwesomeEnum;
  @OneOf.d("awesomeSubMessage", "awesomeEnum")
  public which: string;
}
// example code
let message = new AwesomeMessage({ awesomeField: "hello" });
let buffer  = AwesomeMessage.encode(message).finish();
let decoded = AwesomeMessage.decode(buffer);
```

支持的装饰器是：

- `Type.d(typeName?: string)   (optional)`

将一个类注释为protobuf消息类型。 如果未指定typeName，则将构造函数的运行时函数名称用于反映的类型。

- `Field.d<T>(fieldId: number, fieldType: string | Constructor<T>, fieldRule?: "optional" | "required" | "repeated", defaultValue?: T)`

使用指定的id和protobuf类型将属性注释为protobuf字段。

- `MapField.d<T extends { [key: string]: any }>(fieldId: number, fieldKeyType: string, fieldValueType. string | Constructor<{}>)`

使用指定的id，protobuf键和值类型将属性注释为protobuf映射字段。

- `OneOf.d<T extends string>(...fieldNames: string[])`

annotates a property as a protobuf oneof covering the specified fields.

## 命令行

正式环境下使用编译后的json或js代码

请注意，将CLI移至其[自己的程序包](https://github.com/dcodeIO/protobuf.js/blob/HEAD/cli)仍在进行中。

目前，它仍然是主程序包的一部分。

命令行界面（CLI）可用于在文件格式之间进行转换，并生成静态代码以及TypeScript定义。

### pbjs for JavaScript

用法： pbjs [选项] file1.proto file2.json ...（或管道）其他 | pbjs [选项]

- `-t，--target` 指定目标格式。还接受要求自定义目标的路径。

`json` JSON表示形式
`json-module` JSON表示为模块
`proto2` 协议缓冲区，版本2
`proto3` 协议缓冲区，版本3
`static` 无反射的静态代码（本身无法运行）
`static-module` 静态代码，不作为模块反射

- `-p，--path` 将目录添加到包含路径。

- `-o，--out` 保存到文件而不是写入stdout。

`--sparse` 仅导出从主文件引用的那些类型（实验性）。

仅模块目标：

- `-w，--wrap` 指定要使用的包装器。还接受要求自定义包装的路径。

`default` 默认包装器，同时支持CommonJS和AMD
`commonjs` CommonJS包装器
`amd` AMD包装器
`es6` ES6包装器（意味着--es6）
`closure` 添加到protobuf.roots中的闭包，其中protobuf是全局的

- `-r，--root` 指定备用protobuf.roots名称。

- `-l，--lint` Linter配置。默认为protobuf.js-compatible 规则：

`eslint-disable` `block-scoped-var`，`no-re-declare`，`no-control-regex`，`no-prototype-builtins`

- `--es6` 启用ES6语法（用const / let代替var）

仅原始来源：

- `--keep-case` 保留现场大小写而不是转换为驼峰大小写。

仅静态目标：

-` --no-create` 不生成用于反射兼容性的创建函数。
- `--no-encode` 不生成编码函数。
- `--no-decode` 不生成解码功能。
- `--no-verify` 不生成验证功能。
- `--no-convert` 不生成诸如from / toObject的转换函数
- `--no-delimited` 不生成定界的编码/解码函数。
- `--no-beautify` 不美化生成的代码。
- `--no-comments` 不输出任何JSDoc注释。

- `--force-long` 确保对s- / u- / int64和s- / fixed64字段使用'Long'。
- `--force-message` 确保使用消息实例而不是普通对象。

## 生产环境

两种方式：

1. 将所有.proto文件捆绑到一个.json文件中，这样可以最大程度地减少网络请求的数量，并避免任何解析器开销（提示：仅适用于light库）
2. 生成的 js 静态代码，仅适用于最小库（推荐）

```json
// package.json
{
  "scripts": {
    "pbjs-json": "pbjs -t json file1.proto file2.proto > bundle.json",
    "pbjs-js": "pbjs -t static-module -w commonjs -o compiled.js file1.proto file2.proto",
  }
}
```

```sh
npm run pbjs
```

现在，将这个文件包含在最终捆绑包中：

```js
// json
var root = protobuf.Root.fromJSON(require("./bundle.json"));
// js
import root from './compiled'
```

或以通常的方式加载它：

```js
// json
protobuf.load("bundle.json", function(err, root) {
  // ...
});
// js
root.包名称.消息名称.方法() // create/encode/decode/toObject...
```

# graphql

[测试页面源码](https://github.com/jinven/next-demo/blob/master/pages/graphql.js)、[测试接口Apollo源码](https://github.com/jinven/next-demo/blob/master/pages/api/graphql.js)、[测试接口Next源码](https://github.com/jinven/next-demo/blob/master/pages/api/graphql/next.js)

https://graphql.org/
https://github.com/graphql/graphiql

一种用于 API 的查询语言，满足数据查询的运行时。

- GraphQL 对 API 中的数据提供了一套易于理解的完整描述。
- 向 API 发出一个 GraphQL 请求就能准确获得想要的数据，不多不少。
- 只用一个请求。
- 基于类型和字段的方式进行组织，而非入口端点。
- 无需划分版本。

```js
// 描述数据
type Project {
  name: String
  tagline: String
  contributors: [User]
}

// 请求所要的数据
{
  project(name: "GraphQL") {
    tagline
  }
}

// 得到可预测的结果
{
  "project": {
    "tagline": "A query language for APIs"
  }
}
```

## 服务端

1. [GraphQL.js](https://github.com/graphql/graphql-js/)

```js
// hello.js
var { graphql, buildSchema } = require('graphql');
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = { hello: () => 'Hello world!' };
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
```

```sh
npm install graphql
node hello.js
```

2. [express-graphql](https://github.com/graphql/express-graphql)

```js
// server.js
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = { hello: () => 'Hello world!' };
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

```sh
npm install express express-graphql graphql
node server.js
```

3. [apollo-server](https://github.com/apollographql/apollo-server)

```js
// server.js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
```

```sh
npm install apollo-server-express express
node server.js
```

## 客户端

1. [relay](https://github.com/facebook/relay)

用于构建与 GraphQL 后端交流的 React 应用。

2. [Apollo Client](https://github.com/apollographql/apollo-client)

一个强大的 JavaScript GraphQL 客户端，设计用于与 React、React Native、Angular 2 或者原生 JavaScript 一同工作。

3. [graphql-request](https://github.com/prisma/graphql-request)

一个简单灵活的 JavaScript GraphQL 客户端，可以运行于所有的 JavaScript 环境（浏览器，Node.js 和 React Native）—— 基本上是 fetch 的轻度封装。

4. [lokka](https://github.com/kadirahq/lokka)

一个简单的 JavaScript GraphQL 客户端，可以运行于所有的 JavaScript 环境 —— 浏览器，Node.js 和 React Native。

5. [nanogql](https://github.com/yoshuawuyts/nanogql)

一个使用模板字符串的小型 GraphQL 客户端库。

6. [gq-loader](https://github.com/Houfeng/gq-loader)

一个简单的 JavaScript GraphQL 客户端，通过 webpack 加载器让 *.gql 文件作为模块使用。

7. [aws-amplify](https://aws.github.io/aws-amplify)

使用云服务进行应用开发的 JavaScript 库，支持 GraphQL 后端和用于处理 GraphQL 数据的 React 组件。

8. [grafoo](https://github.com/grafoojs/grafoo)

一个通用的 GraphQL 客户端，具有仅 1.6kb 的多框架的视图层集成。

9. [urql](https://github.com/FormidableLabs/urql)

一个用于 React 的高度可定制且用途广泛的 GraphQL 客户端。

## 工具

- [graphiql](https://github.com/graphql/graphiql): 一个交互式的运行于浏览器中的 GraphQL IDE
- [libgraphqlparser](https://github.com/graphql/libgraphqlparser): 一个 C++ 版 GraphQL 查询语言分析器，提供 C 和 C++ API
- [Graphql Language Service](https://github.com/graphql/graphql-language-service): 一个用于构建 IDE 的 GraphQL 语言服务（诊断、自动完成等）的接口。
- [quicktype](https://github.com/quicktype/quicktype): 在 TypeScript、Swift、golang、C#、C++ 等语言中为 GraphQL 查询生成类型。

## 规则

http://spec.graphql.org/draft/

- 层次分明
- 以产品为中心
- 强类型
- 客户端定制
- 内省

1. 注释

`#` 开头的单行注释。

2. 无语义逗号

`,` 与空白符和行终止符类似，逗号(,)也是提升源文本的易读性、分隔词法记号，对GraphQL查询文档的语法语义上也无显著影响

3. 标点

` ! $ ( ) ... : = @ [ ] { | } `

4. 命名

`/[_A-Za-z][_0-9A-Za-z]*/`

5. 操作

GraphQL做了三类操作模型：
- `query` 查询 – 只读获取
- `mutation` 更改 – 先写入再获取
- `subscription` 订阅 – 一个长期请求，根据源事件获取数据

```js
mutation {
  likeStory(storyID: 12345) {
    story {
      likeCount
    }
  }
}
```

6. 查询简写

如果一个文档只包含一个查询操作，也不包含变量和指令，那么这个操作可以省略query关键字和操作名。

```js
{
  field
}
```

7. 选择集合

一个操作选择了他所需要的信息的集合，然后就会精确地得到他所要的信息，没有一点多余，避免了数据的多取或少取。

```js
{
  id
  firstName
  lastName
}
```

8. 字段

一个选择集合主要由字段组成，一个字段描述了选择集合中对请求可用的一个离散信息片段。

例如，选择复杂数据和关联数据，并深入到嵌套内部，直到标量值字段

```js
{
  me {
    id
    firstName
    lastName
    birthday {
      month
      day
    }
    friends {
      name
    }
  }
}
```

一个操作中，顶层选择集合的字段通常表示对应用和观察者而言全局可见的信息。

典型的案例有顶层字段指向当前登录的观察者，或者引用唯一id来取特定类型数据：

```conf
# `me` could represent the currently logged in viewer.`me`指代当前登录的观察者
{
  me {
    name
  }
}

# `user` represents one of many users in a graph of data, referred to by a
# unique identifier.
# `user`表示一个通过id来从图数据中取出来的用户
{
  user(id: 4) {
    name
  }
}
```

9. 参数

字段在概念上是会返回值的函数，偶尔接受参数以改变其行为。

通常这些参数和GraphQL服务器实现的函数参数直接映射。

```js
{
  user(id: 4) {
    id
    name
    profilePic(size: 100)
  }
}
```

许多参数也能存在于给定字段：

```js
{
  user(id: 4) {
    id
    name
    profilePic(width: 100, height: 50)
  }
}
```

10. 参数无需顺序

参数可以以任意句法顺序排列，都表示同一种语义。

```conf
{
  picture(width: 200, height: 100)
}
# 等同于
{
  picture(height: 100, width: 200)
}
```

11. 字段别名

默认情况下，返回对象的键名会采用查询的字段名，然后可以定义不同的键名

```conf
# 请求参数
{
  user(id: 4) {
    id
    name
    smallPic: profilePic(size: 64)
    bigPic: profilePic(size: 1024)
  }
}
```

```js
// 返回结果
{
  "user": {
    "id": 4,
    "name": "Mark Zuckerberg",
    "smallPic": "https://cdn.site.io/pic-4-64.jpg",
    "bigPic": "https://cdn.site.io/pic-4-1024.jpg"
  }
}
```

使用别名：

```conf
# 请求参数
{
  zuck: user(id: 4) {
    id
    name
  }
}
```

```js
// 返回结果
{
  "zuck": {
    "id": 4,
    "name": "Mark Zuckerberg"
  }
}
```

12. 片段

片段是GraphQL组合拼装的基本单元，它通用选择集字段的重用得以实现，减少了文档中的重复文本。

内联片段可以直接在选择集合内使用，通常用于interface（接口）或者union（联合）这种存在类型条件的场合。

如：

```conf
query noFragments {
  user(id: 4) {
    friends(first: 10) {
      id
      name
      profilePic(size: 50)
    }
    mutualFriends(first: 10) {
      id
      name
      profilePic(size: 50)
    }
  }
}
```

这些重复的字段可以提取进一个片段中，然后被父级片段或者query组合：

```conf
query withFragments {
  user(id: 4) {
    friends(first: 10) {
      ...friendFields
    }
    mutualFriends(first: 10) {
      ...friendFields
    }
  }
}

fragment friendFields on User {
  id
  name
  profilePic(size: 50)
}
```

片段可以通过解构操作符(...)被消费掉，片段内的字段将会被添加到片段被调用的同层级选择集合，这一过程也会在多级别片段中解构发生。

```conf
query withNestedFragments {
  user(id: 4) {
    friends(first: 10) {
      ...friendFields
    }
    mutualFriends(first: 10) {
      ...friendFields
    }
  }
}

fragment friendFields on User {
  id
  name
  ...standardProfilePic
}

fragment standardProfilePic on User {
  profilePic(size: 50)
}
```

noFragments，withFragments和withNestedFragments三个查询都会产生相同的返回对象。

13. 类型条件

片段需要指定应用于的目标类型，在上述案例中，friendFields在查询User的上下文中使用。

片段不能应用于任何输入值（标量值，枚举型或者输入型对象）。

片段可应用与对象型，接口和联合。

只有在对象的具体类型和片段的应用目标类型匹配的时候，片段内的选择集合才会返回值。

如：

```conf
query FragmentTyping {
  profiles(handles: ["zuck", "cocacola"]) {
    handle
    ...userFragment
    ...pageFragment
  }
}

fragment userFragment on User {
  friends {
    count
  }
}

fragment pageFragment on Page {
  likers {
    count
  }
}
```

profiles根字段将会返回一个列表，其中的元素可能是Page或者User类型。

当profiles内的对象是User类型时，friends会出现，而likers不会。

反之当结果内的对象是Page时，likers会出现，friends则不会。

```js
{
  "profiles": [
    {
      "handle": "zuck",
      "friends": { "count" : 1234 }
    },
    {
      "handle": "cocacola",
      "likers": { "count" : 90234512 }
    }
  ]
}
```

14. 内联片段

片段可以在选择集合内以内联格式定义，这用于根据运行时类型条件式地引入字段。

这个特性的标准片段引入版本在query FragmentTyping中已经演示，也可以使用内联片段的方式来实现：

```conf
query inlineFragmentTyping {
  profiles(handles: ["zuck", "cocacola"]) {
    handle
    ... on User {
      friends {
        count
      }
    }
    ... on Page {
      likers {
        count
      }
    }
  }
}
```

内联片段也用于将指令应用于一群字段的场景。如果省略了类型条件，片段则被视为等同于封装所在的上下文。

```conf
query inlineFragmentNoType($expandedInfo: Boolean) {
  user(handle: "zuck") {
    id
    name
    ... @include(if: $expandedInfo) {
      firstName
      lastName
      birthday
    }
  }
}
```

## 输入值

- `变量`: 可以使用变量作为参数，已最大化查询重用，避免客户端运行时耗费巨大的字符串重建
- `整数值`: 指定整数不应该使用小数点或指数符号，0、1、2、3...
- `浮点值`: 需要包含小数点(例如：1.0)或者指数符号(例如：1e50)或者两者
- `字符串值`: 由双引号(`"`)包起来的字符，譬如 `"Hello World"`
- `布尔值`: true和false
- `空值`: 显式-null，隐式-不使用任何值
- `枚举值`: 表现为没有引号包裹的名称，规范建议使用全大写字母表示枚举值
- `列表值`: 包在方括号 `[]` 中的有序值序列，列表值可以是任意字面量值或者变量，譬如 `[1, 2, 3]`
- `对象值 `: 无需键值列表，使用花括号 `{}` 包起来
- `输入类型`: 具名类型、列表类型、非空类型 具名类型 → 命名
- `指令`:  @名称 参数? 指令为GraphQL文档提供了另一种运行时执行行为和类型验证行为

---
