---
title: protobuf和graphql
date: 2020-01-11 14:30:28
tags:
- protobuf
---

GraphQL vs gRPC and JSON vs Protocol Buffers

```sh
# protobufjs 
# https://github.com/protobufjs/protobuf.js
npm install protobufjs --save
```

演示页面： https://next-new.now.sh/protobuf
源码： https://github.com/jinven/next-demo/blob/master/pages/protobuf.js

<!-- more -->

# protobuf

```js
// 全库：19kb gzipped
var protobuf = require("protobufjs");
// 轻量库：16kb gzipped
// var protobuf = require("protobufjs/light");
// 最小库：6.5kb gzipped
// var protobuf = require("protobufjs/minimal");
```

Protocol Buffer 是谷歌开发的处理结构化数据的工具。

是TensorFlow系统中使用到的重要工具。

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

## 示例

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
protobuf.load("awesome.proto")
  .then(function(root) {
    // ...
  }
);
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
- AwesomeMessage.fromObject, AwesomeMessage.toObject, AwesomeMessage#toObject 和 AwesomeMessage#toJSON

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
greeter.sayHello({ name: 'you' })
  .then(function(response) {
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

但是，由于所有内容均已键入，因此访问动态生成的消息类的实例上的字段需要使用方括号（即message [“ awesomeField”]）或显式强制转换。

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

例如，`@Field.d(2，AwesomeArrayMessage)` 要求在定位ES5时已提前定义AwesomeArrayMessage。

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

对于生产环境，建议将所有.proto文件捆绑到一个.json文件中，这样可以最大程度地减少网络请求的数量，并避免任何解析器开销（提示：仅适用于light库）：

```json
// package.json
{
  "scripts": {
    "pbjs": "pbjs -t json file1.proto file2.proto > bundle.json"
  }
}
```

```sh
npm run pbjs
```

现在，将这个文件包含在最终捆绑包中：

```js
var root = protobuf.Root.fromJSON(require("./bundle.json"));
```

或以通常的方式加载它：

```js
protobuf.load("bundle.json", function(err, root) {
  // ...
});
```

另一方面，生成的静态代码仅适用于最小库。 例如

```sh
pbjs -t static-module -w commonjs -o compiled.js file1.proto file2.proto
```

# graphql