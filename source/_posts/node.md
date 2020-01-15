---
title: node
date: 2019-12-01 00:00:34
tags: 
- node
- javascript
---

Node 使用事件驱动机制，有一个事件轮询线程负责任务编排(JavaScript回调和非阻塞I/O)，和一个专门处理繁重任务的工作线程池(k个工作线程)

<!-- more -->

# 1. 知识点

运行流程：

    1. 完成初始化，处理 `require` 加载的模块和注册事件回调
    2. 进入事件循环阶段，通过执行对应回调函数来对客户端请求做出回应。此回调同步执行，完成后可能继续注册新的异步请求，这些异步请求的回调也会在事件轮询线程中被处理。

事件轮询线程本身不维护队列，它持有一堆要求操作系统使用诸如 [epoll-Linux](http://man7.org/linux/man-pages/man7/epoll.7.html)、[kqueue-OSX](https://developer.apple.com/library/content/documentation/Darwin/Conceptual/FSEvents_ProgGuide/KernelQueues/KernelQueues.html)、event ports-Solaris、[IOCP-Windows](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365198.aspx)等机制支监听的文件描述符。可能代表一个网络套接字、监听的文件等等。当操作系统确定某个文件的描述符发生变化，事件轮询线程将把它转换成合适的事件，然后触发与该事件对应的回调函数。
工作线程池使用一个真实的队列，装着要被处理的任务，一个工作线程从这个队列中取出一个任务开始处理，完成后向事件循环线程中发出一个“至少有一个任务完成了”的消息。


注意事项：

    Node 服务器中，一个连接/任务阻塞了，下一个连接/任务将不会得到执行的机会。
    Node 使用 V8 引擎处理 JavaScript，大部分操作很快，但正则表达式、JSON处理例外，检查正则表达式是否安全 [safe-regex](https://github.com/substack/safe-regex)、[rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/)，异步JSON [JSONStream](https://www.npmjs.com/package/JSONStream)、[Big-Friendly JSON](https://www.npmjs.com/package/bfj)

Node 的工作线程池是通过 [libuv](http://docs.libuv.org/en/v1.x/threadpool.html) 来实现的，对外提供了一个通用的任务处理API。
Node 使用工作线程池来处理高成本的任务，包括操作系统没有提供非阻塞版本的 I/O 操作，以及一些 CPU 密集型的任务。
Node 模块中用到工作线程池的API：

    1. DNS：dns.lookup()，dns.lookupService()
    2. fs：除fs.FSWatcher()和显式同步调用的API之外，都使用 libuv 的线程池
    3. CPU密集型任务：crypto（crypto.pbkdf2()、crypto.scrypt()、crypto.randomBytes()、crypto.randomFill()、crypto.generateKeyPair()）、zlib除显式同步调用的API之外，都使用 libuv 的线程池

此外，应用程序和模块可以使用 [C++插件](https://nodejs.org/api/addons.html) 向工作线程池提交其它任务。

在一个回调中调用这些 API 时，事件轮询花费少量的额外开销，进入对应 API 与 C++ 桥接通讯的 Node C++ binding 中，向工作线程池提交一个任务。和整个任务的成本相比，这些开销微不足道。
事件循环线程总是将这些任务转交给工作线程池。

1. 版本支持特性的情况：https://node.green/
2. ES6(ECMAScript 2015)功能分为三个部分：`shipping`(稳定), `staged`(不一定稳定), `in progress`(测试)
3. 开发中的特性：`node --v8-options | grep "in progress"` (`node --v8-options | findstr progress`)
4. 特性研发进度：https://fhinkel.rocks/six-speed/
5. --harmony：作用是让`staged`特性起作用，本质等同于`--es_staging`，如果希望一个安全的环境，应该移除这个运行时的环境标记，直到在`V8`中以默认形式发布
6. 跟随的V8版本：`node -p process.versions.v8`
7. 调试：`node-inspect 1.js`、`chrome://inspect`、`visual studio code`、`visual studio 2017+`、`JetBrains WebStorm`、`Gitpod`、`Eclipse IDE`、`node debug 1.js`
8. 压力测试(ApacheBench)：`ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"`
9. 生成刻度文件：`node --prof 1.js`，会生成 `isolate-0xnnnnnnnnnnnn-v8.log` 形式的文件
10. 分析刻度：`node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt`
11. 火焰图：https://nodejs.org/zh-cn/docs/guides/diagnostics-flamegraph/
12. 装到docker：https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/
13. 事件轮询：处理非阻塞I/O操作的机制，当有可能的时候，单线程的`JavaScript`会把操作转移到系统内核中去，多线程的内核在后台处理多种操作，完成一个操作时，通知`Node.js`将合适的回调函数添加到轮询队列中等待时机执行
14. 事件轮询机制：`Node.js`启动后，会初始化时间轮询，处理以提供的输入脚本，调用一些异步的API函数，安排任务处理事件，调用`process.nextTick()`，开始时间循环
15. 事件循环操作顺序：`timers` -> `pending callbacks` -> `idle, prepare` -> `poll` -> `check` -> `close callbacks`，每个阶段都有一个`FIFO`队列来执行回调
16. 事件阶段概述：`定时器`-执行已安排的`setTimeout`和`setInterval`回调函数，`待定回调`-执行延迟到下一循环迭代的`I/O`回调，`idle,prepare`-仅系统内部使用，`轮询`-检索新的`I/O`事件-执行`I/O`相关的回调-其余情况将在此处阻塞，`检测`-`setImmediate`回调函数在这里执行，`关闭的回调函数`-一些准备关闭的回调函数(如：`socket.on('close', ...)`)
17. setImmediate和setTimeout：`setImmediate()`-设计为在当前轮询阶段完成后执行脚本，`setTimeout()`-计划在毫秒的最小阈值经过后运行的脚本
18. process.nextTick和setImmediate：`process.nextTick()`-在同一阶段立即执行，`setImmediate()`-在以下迭代或tick上触发事件循环，建议所有情况下都使用 `setImmediate()`
19. 使用 process.nextTick() 原因：1-允许处理错误、清理不需要的资源、在事件循环继续之前重试请求；2-有时在调用堆栈已解除但在事件循环继续之前，必须允许回调运行
20. Node中，有两种类型的线程：1-事件循环线程（主循环、主线程）；2-工作线程池里的 `k` 个工作线程（线程池）
21. 阻塞：一个线程执行一个回调函数（事件轮询线程）或者任务（工作线程）需要耗费很长时间

# 2. 内置变量

1. 看起来是全局变量，但不是全局变量

- `__filename ` 当前文件路径
- `__dirname` 当前目录路径
- `exports` module.exports的引用，导出内存模块
- `module` node定义的一个构造函数

2. 全局变量

- `console` 用于提供控制台标准输出，它是由 Internet Explorer 的 JScript 引擎提供的调试工具，后来逐渐成为浏览器的实施标准
- `process` 流程对象，描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口
- `global` 在浏览器中，顶级范围是全局范围。这意味着浏览器内var something将定义一个新的全局变量。在Node.js中，这是不同的。顶级范围不是全局范围； var somethingNode.js模块内部将是该模块的本地模块
- `TextDecoder`
- `TextEncoder`
- `URL`
- `URLSearchParams`
- `WebAssembly`

# 3. 内置方法/函数

## 1. setTimeout、clearTimeout

    描述：一段时间之后执行指定函数
    第一个参数：可执行函数
    第二个参数：延时时间
    第三个参数：函数的参数
    返回结果：Timeout 对象，可用来取消定时

    ```js
    function foo(arg){ 
        console.log(`arg was => ${arg}`);
    }
    var timeout = setTimeout(foo, 1000, 'funky');
    // clearTimeout(timeout);
    // timeout.unref();
    // timeout.ref();
    ```

## 2. setImmediate、clearImmediate

    描述：在此之后立即执行指定函数
    第一个参数：可执行函数
    返回结果：Immediate 对象，可用来取消定时

    ```js
    console.log('before immediate');
    var immediate = setImmediate( (arg)=>{
        console.log(`executing immediate: ${arg}`);
    }, 'so immediate');
    // clearImmediate(immediate);
    console.log('after immediate');
    ```

## 3. setInterval、clearInterval

    描述：每一段时间后执行指定函数
    第一个参数：可执行函数
    第二个参数：延时时间
    第三个参数：函数的参数
    返回结果：Interval 对象，可用来取消定时

    ```js
    function intervalFunc() {
        console.log('Cant stop me now!');
    }
    var interval = setInterval(intervalFunc, 1500);
    // clearInterval(interval);
    // interval.unref();
    // interval.ref();
    ```

## 4. Buffer

在引入TypedArray之前，JavaScript语言没有用于读取或处理二进制数据流的机制。 Buffer类是作为Node.js API的一部分引入的，以允许与TCP流，文件系统操作和其他上下文中的八位位组流进行交互。
有了TypedArray，Buffer类以更优化的方式和适用于Node.js的方式实现Uint8Array API。
Buffer类的实例类似于从0到255的整数数组（其他整数通过＆255操作强制到此范围），但对应于V8堆之外的固定大小的原始内存分配。 缓冲区的大小是在创建时创建的，无法更改。
Buffer类在全局范围内，因此不太可能需要使用require('buffer')。Buffer。

```js
// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);
// Creates a Buffer of length 10, filled with 0x1.
const buf2 = Buffer.alloc(10, 1);
// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using either fill() or write().
const buf3 = Buffer.allocUnsafe(10);
// Creates a Buffer containing [0x1, 0x2, 0x3].
const buf4 = Buffer.from([1, 2, 3]);
// Creates a Buffer containing UTF-8 bytes [0x74, 0xc3, 0xa9, 0x73, 0x74].
const buf5 = Buffer.from('tést');
// Creates a Buffer containing Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
const buf6 = Buffer.from('tést', 'latin1');

const buf = Buffer.from('hello world', 'ascii');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=
console.log(Buffer.from('fhqwhgads', 'ascii'));
// Prints: <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// Prints: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>

const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
// Copies the contents of `arr`.
const buf1 = Buffer.from(arr);
// Shares memory with `arr`.
const buf2 = Buffer.from(arr.buffer);
console.log(buf1);
// Prints: <Buffer 88 a0>
console.log(buf2);
// Prints: <Buffer 88 13 a0 0f>
arr[1] = 6000;
console.log(buf1);
// Prints: <Buffer 88 a0>
console.log(buf2);
// Prints: <Buffer 88 13 70 17>

const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);
console.log(buf.length);
// Prints: 16

const buf = Buffer.from([1, 2, 3]);
for (const b of buf) {
  console.log(b);
}
// Prints:
//   1
//   2
//   3

// Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'.
const buf = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
// Shares memory with `arr`.
const buf = new Buffer(arr.buffer);
console.log(buf);
// Prints: <Buffer 88 13 a0 0f>
// Changing the original Uint16Array changes the Buffer also.
arr[1] = 6000;
console.log(buf);
// Prints: <Buffer 88 13 70 17>

const buf1 = new Buffer('buffer');
const buf2 = new Buffer(buf1);
buf1[0] = 0x61;
console.log(buf1.toString());
// Prints: auffer
console.log(buf2.toString());
// Prints: buffer

const buf = new Buffer(10);
console.log(buf);
// Prints: <Buffer 00 00 00 00 00 00 00 00 00 00>

const buf1 = new Buffer('this is a tést');
const buf2 = new Buffer('7468697320697320612074c3a97374', 'hex');
console.log(buf1.toString());
// Prints: this is a tést
console.log(buf2.toString());
// Prints: this is a tést
console.log(buf1.toString('ascii'));
// Prints: this is a tC)st

const buf = Buffer.alloc(5);
console.log(buf);
// Prints: <Buffer 00 00 00 00 00>

const buf = Buffer.alloc(5, 'a');
console.log(buf);
// Prints: <Buffer 61 61 61 61 61>

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
console.log(buf);
// Prints: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

const buf = Buffer.allocUnsafe(10);
console.log(buf);
// Prints (contents may vary): <Buffer a0 8b 28 3f 01 00 00 00 50 32>
buf.fill(0);
console.log(buf);
// Prints: <Buffer 00 00 00 00 00 00 00 00 00 00>

// Need to keep around a few small chunks of memory.
const store = [];
socket.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    // Allocate for retained data.
    const sb = Buffer.allocUnsafeSlow(10);
    // Copy the data into the new allocation.
    data.copy(sb, 0, 0, 10);
    store.push(sb);
  }
});

const str = '\u00bd + \u00bc = \u00be';
console.log(`${str}: ${str.length} characters, ` + `${Buffer.byteLength(str, 'utf8')} bytes`);
// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes

const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];
console.log(arr.sort(Buffer.compare));
// Prints: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (This result is equal to: [buf2, buf1].)

// Create a single `Buffer` from a list of three `Buffer` instances.
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;
console.log(totalLength);
// Prints: 42
const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
console.log(bufA);
// Prints: <Buffer 00 00 00 00 ...>
console.log(bufA.length);
// Prints: 42

// Creates a new Buffer containing UTF-8 bytes of the string 'buffer'.
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
// Shares memory with `arr`.
const buf = Buffer.from(arr.buffer);
console.log(buf);
// Prints: <Buffer 88 13 a0 0f>
// Changing the original Uint16Array changes the Buffer also.
arr[1] = 6000;
console.log(buf);
// Prints: <Buffer 88 13 70 17>

const ab = new ArrayBuffer(10);
const buf = Buffer.from(ab, 0, 2);
console.log(buf.length);
// Prints: 2

const buf1 = Buffer.from('buffer');
const buf2 = Buffer.from(buf1);
buf1[0] = 0x61;
console.log(buf1.toString());
// Prints: auffer
console.log(buf2.toString());
// Prints: buffer

const buf = Buffer.from(new String('this is a test'));
// Prints: <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>

class Foo {
  [Symbol.toPrimitive]() {
    return 'this is a test';
  }
}
const buf = Buffer.from(new Foo(), 'utf8');
// Prints: <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>

const buf1 = Buffer.from('this is a tést');
const buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');
console.log(buf1.toString());
// Prints: this is a tést
console.log(buf2.toString());
// Prints: this is a tést
console.log(buf1.toString('ascii'));
// Prints: this is a tC)st

console.log(Buffer.isEncoding('utf-8'));
// Prints: true
console.log(Buffer.isEncoding('hex'));
// Prints: true
console.log(Buffer.isEncoding('utf/8'));
// Prints: false
console.log(Buffer.isEncoding(''));
// Prints: false

// Copy an ASCII string into a `Buffer` one byte at a time.
const str = 'Node.js';
const buf = Buffer.allocUnsafe(str.length);
for (let i = 0; i < str.length; i++) {
  buf[i] = str.charCodeAt(i);
}
console.log(buf.toString('ascii'));
// Prints: Node.js

const arrayBuffer = new ArrayBuffer(16);
const buffer = Buffer.from(arrayBuffer);
console.log(buffer.buffer === arrayBuffer);
// Prints: true

// Create a buffer smaller than `Buffer.poolSize`.
const nodeBuffer = new Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
// When casting the Node.js Buffer to an Int8 TypedArray remember to use the
// byteOffset.
new Int8Array(nodeBuffer.buffer, nodeBuffer.byteOffset, nodeBuffer.length);

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const buf3 = Buffer.from('ABCD');
console.log(buf1.compare(buf1));
// Prints: 0
console.log(buf1.compare(buf2));
// Prints: -1
console.log(buf1.compare(buf3));
// Prints: -1
console.log(buf2.compare(buf1));
// Prints: 1
console.log(buf2.compare(buf3));
// Prints: 1
console.log([buf1, buf2, buf3].sort(Buffer.compare));
// Prints: [ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]
// (This result is equal to: [buf1, buf3, buf2].)

const buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);
console.log(buf1.compare(buf2, 5, 9, 0, 4));
// Prints: 0
console.log(buf1.compare(buf2, 0, 6, 4));
// Prints: -1
console.log(buf1.compare(buf2, 5, 6, 5));
// Prints: 1

// Create two `Buffer` instances.
const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');
for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf1[i] = i + 97;
}
// Copy `buf1` bytes 16 through 19 into `buf2` starting at byte 8 of `buf2`.
buf1.copy(buf2, 8, 16, 20);
console.log(buf2.toString('ascii', 0, 25));
// Prints: !!!!!!!!qrst!!!!!!!!!!!!!

// Create a `Buffer` and copy data from one region to an overlapping region
// within the same `Buffer`.
const buf = Buffer.allocUnsafe(26);
for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf[i] = i + 97;
}
buf.copy(buf, 0, 4, 10);
console.log(buf.toString());
// Prints: efghijghijklmnopqrstuvwxyz

// Log the entire contents of a `Buffer`.
const buf = Buffer.from('buffer');
for (const pair of buf.entries()) {
  console.log(pair);
}
// Prints:
//   [0, 98]
//   [1, 117]
//   [2, 102]
//   [3, 102]
//   [4, 101]
//   [5, 114]

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex');
const buf3 = Buffer.from('ABCD');
console.log(buf1.equals(buf2));
// Prints: true
console.log(buf1.equals(buf3));
// Prints: false

// Fill a `Buffer` with the ASCII character 'h'.
const b = Buffer.allocUnsafe(50).fill('h');
console.log(b.toString());
// Prints: hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

// Fill a `Buffer` with a two-byte character.
console.log(Buffer.allocUnsafe(3).fill('\u0222'));
// Prints: <Buffer c8 a2 c8>

const buf = Buffer.allocUnsafe(5);
console.log(buf.fill('a'));
// Prints: <Buffer 61 61 61 61 61>
console.log(buf.fill('aazz', 'hex'));
// Prints: <Buffer aa aa aa aa aa>
console.log(buf.fill('zz', 'hex'));
// Throws an exception.

const buf = Buffer.from('this is a buffer');
console.log(buf.includes('this'));
// Prints: true
console.log(buf.includes('is'));
// Prints: true
console.log(buf.includes(Buffer.from('a buffer')));
// Prints: true
console.log(buf.includes(97));
// Prints: true (97 is the decimal ASCII value for 'a')
console.log(buf.includes(Buffer.from('a buffer example')));
// Prints: false
console.log(buf.includes(Buffer.from('a buffer example').slice(0, 8)));
// Prints: true
console.log(buf.includes('this', 4));
// Prints: false

const buf = Buffer.from('this is a buffer');
console.log(buf.indexOf('this'));
// Prints: 0
console.log(buf.indexOf('is'));
// Prints: 2
console.log(buf.indexOf(Buffer.from('a buffer')));
// Prints: 8
console.log(buf.indexOf(97));
// Prints: 8 (97 is the decimal ASCII value for 'a')
console.log(buf.indexOf(Buffer.from('a buffer example')));
// Prints: -1
console.log(buf.indexOf(Buffer.from('a buffer example').slice(0, 8)));
// Prints: 8
const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');
console.log(utf16Buffer.indexOf('\u03a3', 0, 'utf16le'));
// Prints: 4
console.log(utf16Buffer.indexOf('\u03a3', -4, 'utf16le'));
// Prints: 6

const b = Buffer.from('abcdef');
// Passing a value that's a number, but not a valid byte.
// Prints: 2, equivalent to searching for 99 or 'c'.
console.log(b.indexOf(99.9));
console.log(b.indexOf(256 + 99));
// Passing a byteOffset that coerces to NaN or 0.
// Prints: 1, searching the whole buffer.
console.log(b.indexOf('b', undefined));
console.log(b.indexOf('b', {}));
console.log(b.indexOf('b', null));
console.log(b.indexOf('b', []));

const buf = Buffer.from('buffer');
for (const key of buf.keys()) {
  console.log(key);
}
// Prints:
//   0
//   1
//   2
//   3
//   4
//   5

const buf = Buffer.from('this buffer is a buffer');
console.log(buf.lastIndexOf('this'));
// Prints: 0
console.log(buf.lastIndexOf('buffer'));
// Prints: 17
console.log(buf.lastIndexOf(Buffer.from('buffer')));
// Prints: 17
console.log(buf.lastIndexOf(97));
// Prints: 15 (97 is the decimal ASCII value for 'a')
console.log(buf.lastIndexOf(Buffer.from('yolo')));
// Prints: -1
console.log(buf.lastIndexOf('buffer', 5));
// Prints: 5
console.log(buf.lastIndexOf('buffer', 4));
// Prints: -1
const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');
console.log(utf16Buffer.lastIndexOf('\u03a3', undefined, 'utf16le'));
// Prints: 6
console.log(utf16Buffer.lastIndexOf('\u03a3', -5, 'utf16le'));
// Prints: 4

const b = Buffer.from('abcdef');
// Passing a value that's a number, but not a valid byte.
// Prints: 2, equivalent to searching for 99 or 'c'.
console.log(b.lastIndexOf(99.9));
console.log(b.lastIndexOf(256 + 99));
// Passing a byteOffset that coerces to NaN.
// Prints: 1, searching the whole buffer.
console.log(b.lastIndexOf('b', undefined));
console.log(b.lastIndexOf('b', {}));
// Passing a byteOffset that coerces to 0.
// Prints: -1, equivalent to passing 0.
console.log(b.lastIndexOf('b', null));
console.log(b.lastIndexOf('b', []));

// Create a `Buffer` and write a shorter ASCII string to it.
const buf = Buffer.alloc(1234);
console.log(buf.length);
// Prints: 1234
buf.write('some string', 0, 'ascii');
console.log(buf.length);
// Prints: 1234

let buf = Buffer.allocUnsafe(10);
buf.write('abcdefghj', 0, 'ascii');
console.log(buf.length);
// Prints: 10
buf = buf.slice(0, 5);
console.log(buf.length);
// Prints: 5

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);
console.log(buf.readBigUInt64BE(0));
// Prints: 4294967295n
console.log(buf.readBigUInt64LE(0));
// Prints: 18446744069414584320n

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(buf.readDoubleBE(0));
// Prints: 8.20788039913184e-304
console.log(buf.readDoubleLE(0));
// Prints: 5.447603722011605e-270
console.log(buf.readDoubleLE(1));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([1, 2, 3, 4]);
console.log(buf.readFloatBE(0));
// Prints: 2.387939260590663e-38
console.log(buf.readFloatLE(0));
// Prints: 1.539989614439558e-36
console.log(buf.readFloatLE(1));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([-1, 5]);
console.log(buf.readInt8(0));
// Prints: -1
console.log(buf.readInt8(1));
// Prints: 5
console.log(buf.readInt8(2));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([0, 5]);
console.log(buf.readInt16BE(0));
// Prints: 5
console.log(buf.readInt16LE(0));
// Prints: 1280
console.log(buf.readInt16LE(1));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([0, 0, 0, 5]);
console.log(buf.readInt32BE(0));
// Prints: 5
console.log(buf.readInt32LE(0));
// Prints: 83886080
console.log(buf.readInt32LE(1));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);
console.log(buf.readIntLE(0, 6).toString(16));
// Prints: -546f87a9cbee
console.log(buf.readIntBE(0, 6).toString(16));
// Prints: 1234567890ab
console.log(buf.readIntBE(1, 6).toString(16));
// Throws ERR_OUT_OF_RANGE.
console.log(buf.readIntBE(1, 0).toString(16));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([1, -2]);
console.log(buf.readUInt8(0));
// Prints: 1
console.log(buf.readUInt8(1));
// Prints: 254
console.log(buf.readUInt8(2));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([0x12, 0x34, 0x56]);
console.log(buf.readUInt16BE(0).toString(16));
// Prints: 1234
console.log(buf.readUInt16LE(0).toString(16));
// Prints: 3412
console.log(buf.readUInt16BE(1).toString(16));
// Prints: 3456
console.log(buf.readUInt16LE(1).toString(16));
// Prints: 5634
console.log(buf.readUInt16LE(2).toString(16));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);
console.log(buf.readUInt32BE(0).toString(16));
// Prints: 12345678
console.log(buf.readUInt32LE(0).toString(16));
// Prints: 78563412
console.log(buf.readUInt32LE(1).toString(16));
// Throws ERR_OUT_OF_RANGE.

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);
console.log(buf.readUIntBE(0, 6).toString(16));
// Prints: 1234567890ab
console.log(buf.readUIntLE(0, 6).toString(16));
// Prints: ab9078563412
console.log(buf.readUIntBE(1, 6).toString(16));
// Throws ERR_OUT_OF_RANGE.

// Create a `Buffer` with the ASCII alphabet, take a slice, and modify one byte
// from the original `Buffer`.
const buf1 = Buffer.allocUnsafe(26);
for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf1[i] = i + 97;
}
const buf2 = buf1.subarray(0, 3);
console.log(buf2.toString('ascii', 0, buf2.length));
// Prints: abc
buf1[0] = 33;
console.log(buf2.toString('ascii', 0, buf2.length));
// Prints: !bc

const buf = Buffer.from('buffer');
console.log(buf.subarray(-6, -1).toString());
// Prints: buffe
// (Equivalent to buf.subarray(0, 5).)
console.log(buf.subarray(-6, -2).toString());
// Prints: buff
// (Equivalent to buf.subarray(0, 4).)
console.log(buf.subarray(-5, -2).toString());
// Prints: uff
// (Equivalent to buf.subarray(1, 4).)

const buf = Buffer.from('buffer');
const copiedBuf = Uint8Array.prototype.slice.call(buf);
copiedBuf[0]++;
console.log(copiedBuf.toString());
// Prints: cuffer
console.log(buf.toString());
// Prints: buffer

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
console.log(buf1);
// Prints: <Buffer 01 02 03 04 05 06 07 08>
buf1.swap16();
console.log(buf1);
// Prints: <Buffer 02 01 04 03 06 05 08 07>
const buf2 = Buffer.from([0x1, 0x2, 0x3]);
buf2.swap16();
// Throws ERR_INVALID_BUFFER_SIZE.
const buf = Buffer.from('This is little-endian UTF-16', 'utf16le');
buf.swap16(); // Convert to big-endian UTF-16 text.

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
console.log(buf1);
// Prints: <Buffer 01 02 03 04 05 06 07 08>
buf1.swap64();
console.log(buf1);
// Prints: <Buffer 08 07 06 05 04 03 02 01>
const buf2 = Buffer.from([0x1, 0x2, 0x3]);
buf2.swap64();
// Throws ERR_INVALID_BUFFER_SIZE.

const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);
console.log(json);
// Prints: {"type":"Buffer","data":[1,2,3,4,5]}
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});
console.log(copy);
// Prints: <Buffer 01 02 03 04 05>

const buf1 = Buffer.allocUnsafe(26);
for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf1[i] = i + 97;
}
console.log(buf1.toString('ascii'));
// Prints: abcdefghijklmnopqrstuvwxyz
console.log(buf1.toString('ascii', 0, 5));
// Prints: abcde
const buf2 = Buffer.from('tést');
console.log(buf2.toString('hex'));
// Prints: 74c3a97374
console.log(buf2.toString('utf8', 0, 3));
// Prints: té
console.log(buf2.toString(undefined, 0, 3));
// Prints: té

const buf = Buffer.from('buffer');
for (const value of buf.values()) {
  console.log(value);
}
// Prints:
//   98
//   117
//   102
//   102
//   101
//   114
for (const value of buf) {
  console.log(value);
}
// Prints:
//   98
//   117
//   102
//   102
//   101
//   114

const buf = Buffer.alloc(256);
const len = buf.write('\u00bd + \u00bc = \u00be', 0);
console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
// Prints: 12 bytes: ½ + ¼ = ¾

const buf = Buffer.allocUnsafe(8);
buf.writeBigInt64BE(0x0102030405060708n, 0);
console.log(buf);
// Prints: <Buffer 01 02 03 04 05 06 07 08>

const buf = Buffer.allocUnsafe(8);
buf.writeBigUInt64LE(0xdecafafecacefaden, 0);
console.log(buf);
// Prints: <Buffer de fa ce ca fe fa ca de>

const buf = Buffer.allocUnsafe(8);
buf.writeDoubleBE(123.456, 0);
console.log(buf);
// Prints: <Buffer 40 5e dd 2f 1a 9f be 77>
buf.writeDoubleLE(123.456, 0);
console.log(buf);
// Prints: <Buffer 77 be 9f 1a 2f dd 5e 40>

const buf = Buffer.allocUnsafe(4);
buf.writeFloatBE(0xcafebabe, 0);
console.log(buf);
// Prints: <Buffer 4f 4a fe bb>
buf.writeFloatLE(0xcafebabe, 0);
console.log(buf);
// Prints: <Buffer bb fe 4a 4f>

const buf = Buffer.allocUnsafe(2);
buf.writeInt8(2, 0);
buf.writeInt8(-2, 1);
console.log(buf);
// Prints: <Buffer 02 fe>

const buf = Buffer.allocUnsafe(4);
buf.writeInt16BE(0x0102, 0);
buf.writeInt16LE(0x0304, 2);
console.log(buf);
// Prints: <Buffer 01 02 04 03>

const buf = Buffer.allocUnsafe(8);
buf.writeInt32BE(0x01020304, 0);
buf.writeInt32LE(0x05060708, 4);
console.log(buf);
// Prints: <Buffer 01 02 03 04 08 07 06 05>

const buf = Buffer.allocUnsafe(6);
buf.writeIntBE(0x1234567890ab, 0, 6);
console.log(buf);
// Prints: <Buffer 12 34 56 78 90 ab>
buf.writeIntLE(0x1234567890ab, 0, 6);
console.log(buf);
// Prints: <Buffer ab 90 78 56 34 12>

const buf = Buffer.allocUnsafe(4);
buf.writeUInt8(0x3, 0);
buf.writeUInt8(0x4, 1);
buf.writeUInt8(0x23, 2);
buf.writeUInt8(0x42, 3);
console.log(buf);
// Prints: <Buffer 03 04 23 42>

const buf = Buffer.allocUnsafe(4);
buf.writeUInt16BE(0xdead, 0);
buf.writeUInt16BE(0xbeef, 2);
console.log(buf);
// Prints: <Buffer de ad be ef>
buf.writeUInt16LE(0xdead, 0);
buf.writeUInt16LE(0xbeef, 2);
console.log(buf);
// Prints: <Buffer ad de ef be>

const buf = Buffer.allocUnsafe(4);
buf.writeUInt32BE(0xfeedface, 0);
console.log(buf);
// Prints: <Buffer fe ed fa ce>
buf.writeUInt32LE(0xfeedface, 0);
console.log(buf);
// Prints: <Buffer ce fa ed fe>

const buf = Buffer.allocUnsafe(6);
buf.writeUIntBE(0x1234567890ab, 0, 6);
console.log(buf);
// Prints: <Buffer 12 34 56 78 90 ab>
buf.writeUIntLE(0x1234567890ab, 0, 6);
console.log(buf);
// Prints: <Buffer ab 90 78 56 34 12>

const buffer = require('buffer');
const newBuf = buffer.transcode(Buffer.from('€'), 'utf8', 'ascii');
console.log(newBuf.toString('ascii'));
// Prints: '?'

// Need to keep around a few small chunks of memory.
const store = [];
socket.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    // Allocate for retained data.
    const sb = SlowBuffer(10);
    // Copy the data into the new allocation.
    data.copy(sb, 0, 0, 10);
    store.push(sb);
  }
});

const { SlowBuffer } = require('buffer');
const buf = new SlowBuffer(5);
console.log(buf);
// Prints: (contents may vary): <Buffer 78 e0 82 02 01>
buf.fill(0);
console.log(buf);
// Prints: <Buffer 00 00 00 00 00>
```

## 5. queueMicrotask

该queueMicrotask()方法将微任务排队以调用callback。如果callback抛出异常，则将 引发 [process对象](https://nodejs.org/dist/latest-v13.x/docs/api/process.html#process_process) 'uncaughtException' 事件。

```js
// Here, `queueMicrotask()` is used to ensure the 'load' event is always
// emitted asynchronously, and therefore consistently. Using
// `process.nextTick()` here would result in the 'load' event always emitting
// before any other promise jobs.
DataHandler.prototype.load = async function load(key) {
  const hit = this._cache.get(url);
  if (hit !== undefined) {
    queueMicrotask(() => {
      this.emit('load', hit);
    });
    return;
  }
  const data = await fetchData(key);
  this._cache.set(url, data);
  this.emit('load', data);
};
```

## 6. require()

加载模块，CommonJS风格，核心为 `require` 语句

### 6.1. require(X)

1. X 为内置模块时，如：require('http')

    1. 返回该模块
    2. 不再继续执行

2. X 以 `./` 或 `/` 或 `../` 开头

    1. 根据 X 所在的父模块，确定 X 的绝对路径
    2. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行

        X
        X.js
        X.json
        X.node

    3. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行

        X/package.json (main字段)
        X/index.js
        X/index.json
        X/index.node

3. X 不带路径

    1. 根据 X 所在的父模块，确定 X 可能的安装目录
    2. 依次在每个目录中，将 X 当成文件名或目录名加载

        require('bar')

        /home/ry/projects/node_modules/bar
        /home/ry/node_modules/bar
        /home/node_modules/bar
        /node_modules/bar6:
        C:\Users\***\.node_modules
        C:\Users\***\.node_libraries
        安装目录\lib\node

        bar
        bar.js
        bar.json
        bar.node

        bar/package.json (main字段)
        bar/index.js
        bar/index.json
        bar/index.node

4. 抛出 `not found`

### 6.2. module

1. node 定义了一个构造函数：

    ```js
    function Module(id, parent) {
        this.id = id;
        this.exports = {};
        this.parent = parent;
        this.filename = null;
        this.loaded = false;
        this.children = [];
    }
    module.exports = Module;
    var module = new Module(filename, parent);
    ```

2. 创建 `a.js` 测试：

    ```js
    console.log('module.id: ', module.id);
    console.log('module.exports: ', module.exports);
    console.log('module.parent: ', module.parent);
    console.log('module.filename: ', module.filename);
    console.log('module.loaded: ', module.loaded);
    console.log('module.children: ', module.children);
    console.log('module.paths: ', module.paths);
    console.log('moduls', JSON.stringify(module));
    ```

命令行执行：

    node a.js

输出：

    module.id:  .
    module.exports:  {}
    module.parent:  null
    module.filename:  F:\code\local\npmtest\a.js
    module.loaded:  false
    module.children:  []
    module.paths:  [ 'F:\\code\\local\\npmtest\\node_modules',
    'F:\\code\\local\\node_modules',
    'F:\\code\\node_modules' ]
    moduls {"id":".","exports":{},"parent":null,"filename":"F:\\code\\local\\npmtest\\a.js","loaded":false,"children":[],"paths":["F:\\code\\local\\npmtest\\node_modules","F:\\code\\local\\node_modules","F:\\code\\node_modules"]}

可见 `module.paths` 查找路径方式， `module.loaded` 为 `false` 表示模块未全部加载

3. 新建 `b.js`：

    ```js
    var a = require('./a.js');
    ```

运行 `b.js`：

    node b.js

输出：

    module.id:  F:\code\local\npmtest\a.js
    module.exports:  {}
    module.parent:  Module {
        id: '.',
        exports: {},
        parent: null,
        filename: 'F:\\code\\local\\npmtest\\b.js',
        loaded: false,
        children:
        [ Module {
            id: 'F:\\code\\local\\npmtest\\a.js',
            exports: {},
            parent: [Circular],
            filename: 'F:\\code\\local\\npmtest\\a.js',
            loaded: false,
            children: [],
            paths: [Object] 
        } ],
        paths:
        [ 'F:\\code\\local\\npmtest\\node_modules',
            'F:\\code\\local\\node_modules',
            'F:\\code\\node_modules' ] 
    }
    module.filename:  F:\code\local\npmtest\a.js
    module.loaded:  false
    module.children:  []
    module.paths:  [ 'F:\\code\\local\\npmtest\\node_modules',
    'F:\\code\\local\\node_modules',
    'F:\\code\\node_modules' ]

可见 `module.parent` 指向 `b.js`

### 6.3. 模块实例的 require 方法

1. 每个模块实例都有一个 `require` 方法

    ```js
    Module.prototype.require = function(path) {
        return Module._load(path, this);
    }
    ```

可知，`require` 不是全局命令，是每个模块提供的一个内部方法，只有在模块内部才能使用 `require` 命令(REPL环境除外)
`require` 内部调用 Module._load 方法

2. `Module._load` 源码：

    ```js
    Module._load = function(request, parent, isMain) {
        if (parent) {
            debug('Module._load REQUEST %s parent: %s', request, parent.id);
        }
        // 计算绝对路径
        var filename = Module._resolveFilename(request, parent, isMain);
        // 第一步：如果有缓存，取出缓存
        var cachedModule = Module._cache[filename];
        if (cachedModule) {
            return cachedModule.exports;
        }
        // 第二步：是否为内置模块
        if (NativeModule.nonInternalExists(filename)) {
            debug('load native module %s', request);
            return NativeModule.require(filename);
        }
        // 第三步：生成模块实例，存入缓存
        var module = new Module(filename, parent);

        if (isMain) {
            process.mainModule = module;
            module.id = '.';
        }

        Module._cache[filename] = module;
        // 第四步：加载模块
        tryModuleLoad(module, filename);
        // 第五步：输出模块的exports属性
        return module.exports;
    };
    function tryModuleLoad(module, filename) {
        var threw = true;
        try {
            module.load(filename);
            threw = false;
        } finally {
            if (threw) {
                delete Module._cache[filename];
            }
        }
    }
    Module._resolveFilename = function(request, parent, isMain) {
        // 第一步：如果是内置模块，不含路径返回
        if (NativeModule.nonInternalExists(request)) {
            return request;
        }
        // 第二步：确定所有可能的路径
        var resolvedModule = Module._resolveLookupPaths(request, parent);
        var id = resolvedModule[0];
        var paths = resolvedModule[1];
        // look up the filename first, since that's the cache key.
        debug('looking for %j in %j', id, paths);
        // 第三步：确定哪一个路径为真
        var filename = Module._findPath(request, paths, isMain);
        if (!filename) {
            var err = new Error("Cannot find module '" + request + "'");
            err.code = 'MODULE_NOT_FOUND';
            throw err;
        }
        return filename;
    };
    Module._findPath = function(request, paths, isMain) {
        // 如果是绝对路径，就不再搜索
        if (path.isAbsolute(request)) {
            paths = [''];
        } else if (!paths || paths.length === 0) {
            return false;
        }
        // 如果当前路径已在缓存中，就直接返回缓存
        const cacheKey = JSON.stringify({request: request, paths: paths});
        if (Module._pathCache[cacheKey]) {
            return Module._pathCache[cacheKey];
        }
        // 列出所有可能的后缀名：.js，.json, .node
        var exts;
        const trailingSlash = request.length > 0 &&
                                request.charCodeAt(request.length - 1) === 47/*/*/;

        // For each path
        // 依次遍历所有路径
        for (var i = 0; i < paths.length; i++) {
            // Don't search further if path doesn't exist
            const curPath = paths[i];
            if (curPath && stat(curPath) < 1) continue;
            var basePath = path.resolve(curPath, request);
            var filename;
            // 是否存在该模块文件
            if (!trailingSlash) {
                const rc = stat(basePath);
                if (rc === 0) {  // File.
                    if (preserveSymlinks && !isMain) {
                        filename = path.resolve(basePath);
                    } else {
                        filename = fs.realpathSync(basePath);
                    }
                } else if (rc === 1) {  // Directory.
                    if (exts === undefined)
                        exts = Object.keys(Module._extensions);
                    filename = tryPackage(basePath, exts, isMain);
                }

                if (!filename) {
                    // try it with each of the extensions
                    if (exts === undefined)
                        exts = Object.keys(Module._extensions);
                    // 该模块文件加上后缀名，是否存在
                    filename = tryExtensions(basePath, exts, isMain);
                }
            }
            // 目录中是否存在 package.json 
            if (!filename) {
                if (exts === undefined)
                    exts = Object.keys(Module._extensions);
                filename = tryPackage(basePath, exts, isMain);
            }
            // 是否存在目录名 + index + 后缀名 
            if (!filename) {
                // try it with each of the extensions at "index"
                if (exts === undefined)
                    exts = Object.keys(Module._extensions);
                filename = tryExtensions(path.resolve(basePath, 'index'), exts, isMain);
            }
            // 将找到的文件路径存入返回缓存，然后返回
            if (filename) {
                // Warn once if '.' resolved outside the module dir
                if (request === '.' && i > 0) {
                    warned = internalUtil.printDeprecationMessage(
                    'warning: require(\'.\') resolved outside the package ' +
                    'directory. This functionality is deprecated and will be removed ' +
                    'soon.', warned);
                }

                Module._pathCache[cacheKey] = filename;
                return filename;
            }
        }
        return false;
    };
    ```

3. `require.resolve` 用于从模块名取到绝对路径

    ```js
    require.resolve = function(request) {
        return Module._resolveFilename(request, self);
    };
    ```

创建 `c.js`：

    ```js
    var a = require.resolve('./a.js');
    console.log(a);
    ```

输出：

    F:\code\local\npmtest\a.js

### 6.4. 加载模块
    
1. `module.load` 源码：

    ```js
    Module.prototype.load = function(filename) {
        debug('load %j for module %j', filename, this.id);

        assert(!this.loaded);
        this.filename = filename;
        this.paths = Module._nodeModulePaths(path.dirname(filename));

        var extension = path.extname(filename) || '.js';
        if (!Module._extensions[extension]) extension = '.js';
        Module._extensions[extension](this, filename);
        this.loaded = true;
    };
    ```

确定模块的后缀名，不同后缀名对应不同加载方法，如：

    ```js
    // Native extension for .js
    Module._extensions['.js'] = function(module, filename) {
        var content = fs.readFileSync(filename, 'utf8');
        module._compile(internalModule.stripBOM(content), filename);
    };
    // Native extension for .json
    Module._extensions['.json'] = function(module, filename) {
        var content = fs.readFileSync(filename, 'utf8');
        try {
            module.exports = JSON.parse(internalModule.stripBOM(content));
        } catch (err) {
            err.message = filename + ': ' + err.message;
            throw err;
        }
    };
    //Native extension for .node
    Module._extensions['.node'] = function(module, filename) {
        return process.dlopen(module, path._makeLong(filename));
    };
    ```

对于 `js` 文件，将模块文件读取成字符串，去掉 `BOM` 头，编译模块：

    ```js
    Module.prototype._compile = function(content, filename) {
        // Remove shebang
        var contLen = content.length;
        if (contLen >= 2) {
            if (content.charCodeAt(0) === 35/*#*/ &&
                content.charCodeAt(1) === 33/*!*/) {
                if (contLen === 2) {
                    // Exact match
                    content = '';
                } else {
                    // Find end of shebang line and slice it off
                    var i = 2;
                    for (; i < contLen; ++i) {
                        var code = content.charCodeAt(i);
                        if (code === 10/*\n*/ || code === 13/*\r*/)
                            break;
                    }
                    if (i === contLen)
                        content = '';
                    else {
                        // Note that this actually includes the newline character(s) in the
                        // new output. This duplicates the behavior of the regular expression
                        // that was previously used to replace the shebang line
                        content = content.slice(i);
                    }
                }
            }
        }
        // create wrapper function
        var wrapper = Module.wrap(content);
        var compiledWrapper = vm.runInThisContext(wrapper, {
            filename: filename,
            lineOffset: 0,
            displayErrors: true
        });
        if (process._debugWaitConnect) {
            if (!resolvedArgv) {
                // we enter the repl if we're not given a filename argument.
                if (process.argv[1]) {
                    resolvedArgv = Module._resolveFilename(process.argv[1], null);
                } else {
                    resolvedArgv = 'repl';
                }
            }
            // Set breakpoint on module start
            if (filename === resolvedArgv) {
                delete process._debugWaitConnect;
                const Debug = vm.runInDebugContext('Debug');
                Debug.setBreakPoint(compiledWrapper, 0, 0);
            }
        }
        var dirname = path.dirname(filename);
        var require = internalModule.makeRequireFunction.call(this);
        var args = [this.exports, require, this, filename, dirname];
        var depth = internalModule.requireDepth;
        if (depth === 0) stat.cache = new Map();
        var result = compiledWrapper.apply(this.exports, args);
        if (depth === 0) stat.cache = null;
        return result;
    }
    ```

上面代码基本等同于：

    ```js
    (function (exports, require, module, __filename, __dirname) {
        // 模块源码
    });
    ```

模块加载实际上是注入 `exports`、`require`、`module` 三个全局变量，然后执行模块的源码，将模块的 `exports` 变量值输出

# 4. 内置模块及常用方法

内置模块调用方法，如 `util`：

```js
const util = require('util');
```

## 1. util

## 3. dns

    dns.lookup()
    dns.lookupService()

## 4. http

## 5. crypto

## 6. fs

    fs.FSWatcher()

## 7. zlib

```js
const gzip = require('zlib').createGzip();
const fs = require('fs');
const inp = fs.createReadStream('The.Matrix.1080p.mkv');
const out = fs.createWriteStream('The.Matrix.1080p.mkv.gz');
inp.pipe(gzip).pipe(out);
```

## 8. child_process

## 9. net

模块为创建基于流的 `TCP/IPC` 服务器(`net.createServer()`)和客户端(`net.createConnection`)提供异步网络API

为 `IPC` 标识路径连接：

    net.connect()
    net.createConnection()
    server.listen()
    socket.connect()

```js
net.createServer().listen(path.join('\\\\?\\pipe', process.cwd(), 'myctl'));
```

```js
const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // Handle errors here.
  if (e.code === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
  throw err;
});

// Grab an arbitrary unused port.
server.listen(() => {
  console.log('opened server on', server.address());
});
```

```js
server.listen({
  host: 'localhost',
  port: 80,
  exclusive: true
});
```

```js
const net = require('net');
net.connect({
  port: 80,
  onread: {
    // Reuses a 4KiB Buffer for every read from the socket.
    buffer: Buffer.alloc(4 * 1024),
    callback: function(nread, buf) {
      // Received data is available in `buf` from 0 to `nread`.
      console.log(buf.toString('utf8', 0, nread));
    }
  }
});
```

```js
socket.setTimeout(3000);
socket.on('timeout', () => {
  console.log('socket timeout');
  socket.end();
});
```

```js
const net = require('net');
const client = net.createConnection({ port: 8124 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
```

```js
const client = net.createConnection({ path: '/tmp/echo.sock' });
```

```js
const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```

```js
$ telnet localhost 8124
```
```js
server.listen('/tmp/echo.sock', () => {
  console.log('server bound');
});
```
```js
$ nc -U /tmp/echo.sock
```

## 10. stream

用于 Node 处理流数据的抽象接口，提供了用于实现流接口的API

```js
const http = require('http');
const server = http.createServer((req, res) => {
  // `req` is an http.IncomingMessage, which is a Readable Stream.
  // `res` is an http.ServerResponse, which is a Writable Stream.
  let body = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8');
  // Readable streams emit 'data' events once a listener is added.
  req.on('data', (chunk) => {
    body += chunk;
  });
  // The 'end' event indicates that the entire body has been received.
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh! bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});
server.listen(1337);
// $ curl localhost:1337 -d "{}"
// object
// $ curl localhost:1337 -d "\"foo\""
// string
// $ curl localhost:1337 -d "not json"
// error: Unexpected token o in JSON at position 1
```

```js
const myStream = getWritableStreamSomehow();
myStream.write('some data');
myStream.write('some more data');
myStream.end('done writing data');
```

```js
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
```

```js
const writer = getWritableStreamSomehow();
for (let i = 0; i < 100; i++) {
  writer.write(`hello, #${i}!\n`);
}
writer.end('This is the end\n');
writer.on('finish', () => {
  console.log('All writes are now complete.');
});
```

```js
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('pipe', (src) => {
  console.log('Something is piping into the writer.');
  assert.equal(src, reader);
});
reader.pipe(writer);
```

```js
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('unpipe', (src) => {
  console.log('Something has stopped piping into the writer.');
  assert.equal(src, reader);
});
reader.pipe(writer);
reader.unpipe(writer);
```

```js
// Write 'hello, ' and then end with 'world!'.
const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// Writing more now is not allowed!
```

```js
stream.cork();
stream.write('some ');
stream.write('data ');
process.nextTick(() => stream.uncork());
```

```js
stream.cork();
stream.write('some ');
stream.cork();
stream.write('data ');
process.nextTick(() => {
  stream.uncork();
  // The data will not be flushed until uncork() is called a second time.
  stream.uncork();
});
```

```js
function write(data, cb) {
  if (!stream.write(data)) {
    stream.once('drain', cb);
  } else {
    process.nextTick(cb);
  }
}
// Wait for cb to be called before doing any other write.
write('hello', () => {
  console.log('Write completed, do more writes now.');
});
```

```js
const { PassThrough, Writable } = require('stream');
const pass = new PassThrough();
const writable = new Writable();
pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing is now false.
pass.on('data', (chunk) => { console.log(chunk.toString()); });
pass.write('ok');  // Will not emit 'data'.
pass.resume();     // Must be called to make stream emit 'data'.
```

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
```

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
readable.on('end', () => {
  console.log('There will be no more data.');
});
```

```js
const readable = getReadableStreamSomehow();
readable.on('readable', function() {
  // There is some data to read now.
  let data;
  while (data = this.read()) {
    console.log(data);
  }
});
```

```js
const fs = require('fs');
const rr = fs.createReadStream('foo.txt');
rr.on('readable', () => {
  console.log(`readable: ${rr.read()}`);
});
rr.on('end', () => {
  console.log('end');
});

// $ node test.js
// readable: null
// end
```

```js
const readable = new stream.Readable();
readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false
```

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log('There will be no additional data for 1 second.');
  setTimeout(() => {
    console.log('Now data will start flowing again.');
    readable.resume();
  }, 1000);
});
```

```js
const fs = require('fs');
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt'.
readable.pipe(writable);
```

```js
const fs = require('fs');
const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);
```

```js
reader.pipe(writer, { end: false });
reader.on('end', () => {
  writer.end('Goodbye\n');
});
```

```js
const readable = getReadableStreamSomehow();
readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    console.log(`Received ${chunk.length} bytes of data.`);
  }
});
```

```js
getReadableStreamSomehow()
  .resume()
  .on('end', () => {
    console.log('Reached the end, but did not read anything.');
  });
```

```js
const readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', (chunk) => {
  assert.equal(typeof chunk, 'string');
  console.log('Got %d characters of string data:', chunk.length);
});
```

```js
const fs = require('fs');
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt',
// but only for the first second.
readable.pipe(writable);
setTimeout(() => {
  console.log('Stop writing to file.txt.');
  readable.unpipe(writable);
  console.log('Manually close the file stream.');
  writable.end();
}, 1000);
```

```js
// Pull off a header delimited by \n\n.
// Use unshift() if we get too much.
// Call the callback with (error, header, stream).
const { StringDecoder } = require('string_decoder');
function parseHeader(stream, callback) {
  stream.on('error', callback);
  stream.on('readable', onReadable);
  const decoder = new StringDecoder('utf8');
  let header = '';
  function onReadable() {
    let chunk;
    while (null !== (chunk = stream.read())) {
      const str = decoder.write(chunk);
      if (str.match(/\n\n/)) {
        // Found the header boundary.
        const split = str.split(/\n\n/);
        header += split.shift();
        const remaining = split.join('\n\n');
        const buf = Buffer.from(remaining, 'utf8');
        stream.removeListener('error', callback);
        // Remove the 'readable' listener before unshifting.
        stream.removeListener('readable', onReadable);
        if (buf.length)
          stream.unshift(buf);
        // Now the body of the message can be read from the stream.
        callback(null, header, stream);
      } else {
        // Still reading the header.
        header += str;
      }
    }
  }
}
```

```js
const { OldReader } = require('./old-api-module.js');
const { Readable } = require('stream');
const oreader = new OldReader();
const myReader = new Readable().wrap(oreader);

myReader.on('readable', () => {
  myReader.read(); // etc.
});
```

```js
const fs = require('fs');
async function print(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  console.log(data);
}
print(fs.createReadStream('file')).catch(console.error);
```

```js
const { finished } = require('stream');
const rs = fs.createReadStream('archive.tar');
finished(rs, (err) => {
  if (err) {
    console.error('Stream failed.', err);
  } else {
    console.log('Stream is done reading.');
  }
});
rs.resume(); // Drain the stream.
```

```js
const finished = util.promisify(stream.finished);
const rs = fs.createReadStream('archive.tar');
async function run() {
  await finished(rs);
  console.log('Stream is done reading.');
}
run().catch(console.error);
rs.resume(); // Drain the stream.
```

```js
const cleanup = finished(rs, (err) => {
  cleanup();
  // ...
});
```

```js
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');
// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.
// A pipeline to gzip a potentially huge tar file efficiently:
pipeline(
  fs.createReadStream('archive.tar'),
  zlib.createGzip(),
  fs.createWriteStream('archive.tar.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
```

```js
const pipeline = util.promisify(stream.pipeline);
async function run() {
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz')
  );
  console.log('Pipeline succeeded.');
}
run().catch(console.error);
```

```js
const { Readable } = require('stream');
async function * generate() {
  yield 'hello';
  yield 'streams';
}
const readable = Readable.from(generate());
readable.on('data', (chunk) => {
  console.log(chunk);
});
```

```js
const { Writable } = require('stream');
class MyWritable extends Writable {
  constructor({ highWaterMark, ...options }) {
    super({
      highWaterMark,
      autoDestroy: true,
      emitClose: true
    });
    // ...
  }
}
```

```js
const { Writable } = require('stream');
const myWritable = new Writable({
  write(chunk, encoding, callback) {
    // ...
  }
});
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

## 11. readline

```js
const readline = require('readline');
// process.stdin 和 process.stdout 都是 Stream 的实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Why should you use streams? ', (answer) => {
  console.log(`Maybe it's ${answer}, maybe it's because they are awesome! :)`);
  rl.close();
});
```

## 12. assert

断言模块提供了一组用于验证不变性的断言函数。 该模块提供了建议的严格模式和更宽松的旧版模式。

```js
const assert = require('assert');
// Generate an AssertionError to compare the error message later:
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});
// Verify error output:
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}

const assert = require('assert').strict;
assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);

assert.deepEqual(/a/gi, new Date());

assert.deepEqual('+00000000', false);


const obj1 = { a: { b: 1 } };
const obj2 = { a: { b: 2 } };
const obj3 = { a: { b: 1 } };
const obj4 = Object.create(obj1);
assert.deepEqual(obj1, obj1);
assert.deepEqual(obj1, obj2);
assert.deepEqual(obj1, obj3);
assert.deepEqual(obj1, obj4);

assert.deepStrictEqual({ a: 1 }, { a: '1' });
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);
assert.deepStrictEqual(object, fakeDate);
assert.deepStrictEqual(date, fakeDate);
assert.deepStrictEqual(NaN, NaN);c
assert.deepStrictEqual(new Number(1), new Number(2));
assert.deepStrictEqual(new String('foo'), Object('foo'));c
assert.deepStrictEqual(-0, -0);
assert.deepStrictEqual(0, -0);
const symbol1 = Symbol();
const symbol2 = Symbol();
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, {}]]);
const weakMap3 = new WeakMap();
weakMap3.unequal = true;
assert.deepStrictEqual(weakMap1, weakMap2);
assert.deepStrictEqual(weakMap1, weakMap3);

(async () => {
  await assert.doesNotReject(
    async () => {
      throw new TypeError('Wrong value');
    },
    SyntaxError
  );
})();
assert.doesNotReject(Promise.reject(new TypeError('Wrong value')))
  .then(() => {
    // ...
  });

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError
);
assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  /Wrong value/,
  'Whoops'
);

assert.equal(1, 1);
assert.equal(1, '1');
assert.equal(1, 2);
assert.equal({ a: { b: 1 } }, { a: { b: 1 } });

const assert = require('assert').strict;
assert.fail();
assert.fail('boom');
assert.fail(new TypeError('need array'));


assert.fail('a', 'b');
assert.fail(1, 2, undefined, '>');
assert.fail(1, 2, 'fail');
assert.fail(1, 2, 'whoops', '>');
assert.fail(1, 2, new TypeError('need array'));
function suppressFrame() {
  assert.fail('a', 'b', undefined, '!==', suppressFrame);
}
suppressFrame();

assert.ifError(null);
assert.ifError(0);
assert.ifError('error');
assert.ifError(new Error());
let err;
(function errorFrame() {
  err = new Error('test error');
})();
(function ifErrorFrame() {
  assert.ifError(err);
})();

const obj1 = { a: { b: 1 } };
const obj2 = { a: { b: 2 } };
const obj3 = { a: { b: 1 } };
const obj4 = Object.create(obj1);
assert.notDeepEqual(obj1, obj1);
assert.notDeepEqual(obj1, obj2);
assert.notDeepEqual(obj1, obj3);
assert.notDeepEqual(obj1, obj4);

assert.notDeepStrictEqual({ a: 1 }, { a: '1' });

assert.notEqual(1, 2);
assert.notEqual(1, 1);
assert.notEqual(1, '1');

assert.notStrictEqual(1, 2);
assert.notStrictEqual(1, 1);
assert.notStrictEqual(1, '1');

assert.ok(true);
assert.ok(1);
assert.ok();
assert.ok(false, 'it\'s false');
assert.ok(typeof 123 === 'string');
assert.ok(typeof 123 === 'string');
assert.ok(false);
assert.ok(0);
assert(0);

(async () => {
  await assert.rejects(
    async () => {
      throw new TypeError('Wrong value');
    },
    {
      name: 'TypeError',
      message: 'Wrong value'
    }
  );
})();

assert.rejects(
  Promise.reject(new Error('Wrong value')),
  Error
).then(() => {
  // ...
});

assert.strictEqual(1, 2);
assert.strictEqual(1, 1);
assert.strictEqual('Hello foobar', 'Hello World!');
const apples = 1;
const oranges = 2;
assert.strictEqual(apples, oranges, `apples ${apples} !== oranges ${oranges}`);
assert.strictEqual(1, '1', new TypeError('Inputs are not identical'));

const err = new TypeError('Wrong value');
err.code = 404;
err.foo = 'bar';
err.info = { nested: true, baz: 'text' };
err.reg = /abc/i;
assert.throws(
  () => { throw err; },
  { name: 'TypeError', message: 'Wrong value', info: { nested: true, baz: 'text' } }
);
assert.throws(
  () => { throw err; },
  { name: /^TypeError$/, message: /Wrong/, foo: 'bar', info: { nested: true, baz: 'text' }, reg: /abc/i }
);
assert.throws(
  () => {
    const otherErr = new Error('Not found');
    for (const [key, value] of Object.entries(err)) {
      otherErr[key] = value;
    }
    throw otherErr;
  },
  err
);

assert.throws(
  () => { throw new Error('Wrong value'); },
  Error
);
assert.throws(
  () => { throw new Error('Wrong value'); },
  /^Error: Wrong value$/
);
assert.throws(
  () => { throw new Error('Wrong value'); },
  (err) => {
    assert(err instanceof Error);
    assert(/value/.test(err));
    return true;
  },
  'unexpected error'
);
function throwingFirst() {
  throw new Error('First');
}
function throwingSecond() {
  throw new Error('Second');
}
function notThrowing() {}
assert.throws(throwingFirst, 'Second');
assert.throws(throwingSecond, 'Second');
assert.throws(notThrowing, 'Second');
assert.throws(throwingSecond, /Second$/);
assert.throws(throwingFirst, /Second$/);
```

## 13. async_hooks

async_hooks模块提供了一个API，用于注册回调，以跟踪在Node.js应用程序内部创建的异步资源的寿命

```js
const async_hooks = require('async_hooks');

const eid = async_hooks.executionAsyncId();
const tid = async_hooks.triggerAsyncId();
const asyncHook = async_hooks.createHook({ init, before, after, destroy, promiseResolve });
asyncHook.enable();
asyncHook.disable();
function init(asyncId, type, triggerAsyncId, resource) { }
function before(asyncId) { }
function after(asyncId) { }
function destroy(asyncId) { }
function promiseResolve(asyncId) { }

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) { },
  destroy(asyncId) { }
});

class MyAsyncCallbacks {
  init(asyncId, type, triggerAsyncId, resource) { }
  destroy(asyncId) {}
}
class MyAddedCallbacks extends MyAsyncCallbacks {
  before(asyncId) { }
  after(asyncId) { }
}
const asyncHook = async_hooks.createHook(new MyAddedCallbacks());

const fs = require('fs');
const util = require('util');
function debug(...args) {
  fs.writeFileSync('log.out', `${util.format(...args)}\n`, { flag: 'a' });
}

const hook = async_hooks.createHook(callbacks).enable();

require('net').createServer().listen(function() { this.close(); });
// OR
clearTimeout(setTimeout(() => {}, 10));

async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    fs.writeSync(
      1, `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
  }
}).enable();
require('net').createServer((conn) => {}).listen(8080);

let indent = 0;
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      1,
      `${indentStr}${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeFileSync('log.out',
                     `${indentStr}before:  ${asyncId}\n`, { flag: 'a' });
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeFileSync('log.out',
                     `${indentStr}after:  ${asyncId}\n`, { flag: 'a' });
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeFileSync('log.out',
                     `${indentStr}destroy:  ${asyncId}\n`, { flag: 'a' });
  },
}).enable();
require('net').createServer(() => {}).listen(8080, () => {
  // Let's wait 10ms before logging the server started.
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId());
  }, 10);
});


console.log(async_hooks.executionAsyncId());  // 1 - bootstrap
fs.open(path, 'r', (err, fd) => {
  console.log(async_hooks.executionAsyncId());  // 6 - open()
});

const server = net.createServer((conn) => {
  async_hooks.executionAsyncId();
}).listen(port, () => {
  async_hooks.executionAsyncId();
});

const server = net.createServer((conn) => {
  async_hooks.triggerAsyncId();
}).listen(port, () => {
  async_hooks.triggerAsyncId();
});

const ah = require('async_hooks');
Promise.resolve(1729).then(() => {
  console.log(`eid ${ah.executionAsyncId()} tid ${ah.triggerAsyncId()}`);
});
ah.createHook({ init() {} }).enable(); // forces PromiseHooks to be enabled.
Promise.resolve(1729).then(() => {
  console.log(`eid ${ah.executionAsyncId()} tid ${ah.triggerAsyncId()}`);
});

const { AsyncResource, executionAsyncId } = require('async_hooks');
const asyncResource = new AsyncResource(
  type, { triggerAsyncId: executionAsyncId(), requireManualDestroy: false }
);
asyncResource.runInAsyncScope(fn, thisArg, ...args);
asyncResource.emitDestroy();
asyncResource.asyncId();
asyncResource.triggerAsyncId();

class DBQuery extends AsyncResource {
  constructor(db) {
    super('DBQuery');
    this.db = db;
  }
  getInfo(query, callback) {
    this.db.get(query, (err, data) => {
      this.runInAsyncScope(callback, null, err, data);
    });
  }
  close() {
    this.db = null;
    this.emitDestroy();
  }
}
```


