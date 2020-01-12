---
title: gulp-api
date: 2019-12-29 16:00:10
tags: 
- node
- javascript
---

# Concepts

## Vinyl

Vinyl 是描述文件的元数据对象。Vinyl 实例的主要属性是文件系统中文件核心的 path 和 contents 核心方面。Vinyl 对象可用于描述来自多个源的文件（本地文件系统或任何远程存储选项上）。

## Vinyl 适配器

Vinyl 提供了一种描述文件的方法，但是需要一种访问这些文件的方法。使用 Vinyl 适配器访问每个文件源。

适配器暴露了：

- 一个签名为 `src(globs, [options])` 的方法，返回一个生成 Vinyl 对象的流。
- 一个带有签名为 `dest(folder, [options])` 的方法，返回一个使用 Vinyl 对象的流。
- 任何特定于其输入/输出媒体的额外方法-例如 symlink 方法 vinyl-fs 所提供的。它们应该总是返回产生和/或消耗 Vinyl 对象的流。

<!-- more -->

## 任务（Tasks）

每个 gulp 任务都是一个异步 JavaScript 函数，它要么接受一个错误优先回调，要么返回一个流、promise、事件发射器、子进程或observable。由于一些平台限制，不支持同步任务。

有关更详细的解释，请参见 [创建任务](https://www.gulpjs.com.cn/docs/getting-started/creating-tasks)。

## Globs

glob 是一串文字和/或通配符，如 *, **, 或 !，用于匹配文件路径。Globbing 是使用一个或多个 globs 在文件系统上定位文件的操作。

如果您没有使用globs的经验，请参阅。[解释 globs](https://www.gulpjs.com.cn/docs/getting-started/explaining-globs)

## Glob base

glob base (有时称为 glob parent)是 glob 字符串中任何特殊字符之前的路径段。因此，/src/js/**.js 的 blob base 是 /src/js/。所有匹配 glob 的路径都保证共享 glob base——该路径段不能是可变的。

由 src() 生成的 Vinyl 实例是用 glob base 集作为它们的 base 属性构造的。当使用 dest() 写入文件系统时，将从输出路径中删除 base ，以保留目录结构。

有关更深入的信息，请参阅 [glob-parent](https://github.com/es128/glob-parent) 库。

## 文件系统统计数据

文件元数据作为 Node 的 fs.Stats 实例提供。它是 Vinyl 实例的 stat 属性，并在内部用于确定 Vinyl 对象是否表示目录或符号链接（symbolic link）。当写入文件系统时，权限和时间值将从 Vinyl 对象的 stat 属性同步。

## 文件系统模式

文件系统模式决定文件的权限。文件系统上的大多数文件和目录将具有相当宽松的模式，允许 gulp 代表您读取/写入/更新文件。默认情况下，gulp 将创建与运行进程具有相同权限的文件，但是您可以通过 src()、 dest() 中的选项配置模式。如果您遇到权限(EPERM)问题，请检查文件上的模式。

## 模块

Gulp 由许多小模块组成，这些模块被拉到一起以实现内聚性工作。通过在小模块中使用 semver，我们可以在不发布 gulp 新版本的情况下发布 bug 修复和特性。通常，当您没有看到主存储库上的进展时，工作是在其中一个模块中完成的。

如果遇到问题，请使用 npm update 命令更新当前模块。如果问题仍然存在，则在单个项目存储库上打开一个 issue。

- [undertaker](https://github.com/gulpjs/undertaker) - the task registration system
- [vinyl](https://github.com/gulpjs/vinyl) - the virtual file objects
- [vinyl-fs](https://github.com/gulpjs/vinyl-fs) - a vinyl adapter to your local file system
- [glob-watcher](https://github.com/gulpjs/glob-watcher) - the file watcher
- [bach](https://github.com/gulpjs/bach) - task orchestration using series() and parallel()
- [last-run](https://github.com/gulpjs/last-run) - tracks the last run time of a task
- [vinyl-sourcemap](https://github.com/gulpjs/vinyl-sourcemap) - built-in sourcemap support
- [gulp-cli](https://github.com/gulpjs/gulp-cli) - the command line interface for interacting with gulp

# src()

创建一个流，用于从文件系统读取 Vinyl 对象。

注：BOMs(字节顺序标记)在 UTF-8 中没有任何作用，除非使用 removeBOM 选项禁用，否则 src() 将从读取的 UTF-8 文件中删除BOMs。

## 用法

```js
const { src, dest } = require('gulp');

function copy() {
  return src('input/*.js')
    .pipe(dest('output/'));
}

exports.copy = copy;
```

## 函数原型

```js
src(globs, [options])
```

## 参数

    参数类型    描述
    globsstring
            array    Globs to watch on the file system.
    optionsobject    在下面的选项中详细说明。

## 返回值

返回一个可以在管道的开始或中间使用的流，用于根据给定的 globs 添加文件。

## 可能出现的错误

当 globs 参数只能匹配一个文件(如 foo/bar.js)而且没有找到匹配时，会抛出一个错误，提示 "File not found with singular glob"。若要抑制此错误，请将 allowEmpty 选项设置为 true。

当在 globs 中给出一个无效的 glob 时，抛出一个错误，并显示 "Invalid glob argument"。

## 选项

对于接受函数的选项，传递的函数将与每个 Vinyl 对象一起调用，并且必须返回另一个列出类型的值。

| 名称 | 类型 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- |
| buffer | boolean function | true | 当为 true 时，文件内容被缓冲到内存中。如果为false，Vinyl 对象的 contents 属性将是一个暂停流。可能无法缓冲大文件的内容。注意:插件可能不支持流媒体内容。 |
| read | boolean function | true | 如果为 false，文件将不会被读取，并且它们的 Vinyl 对象将不能通过 .dest() 写入磁盘。 |
| since | date timestamp function |  | 设置时，仅为自指定时间以来修改过的文件创建 Vinyl 对象。 |
| removeBOM | boolean function | true | 如果为 true，则从 UTF-8 编码的文件中删除 BOM。如果为 false，则忽略 BOM。 |
| sourcemaps | boolean function | false | 如果为 true，则在创建的 Vinyl 对象上启用 sourcemaps。加载内联 sourcemaps 并解析外部 sourcemap 链接。 |
| resolveSymlinks | boolean function | true | true 时，递归地解析链接到目标的符号(symbolic)链接。如果为 false，则保留符号链接并将 Vinyl 对象的 symlink 属性设置为原始文件的路径。 |
| cwd | string | process.cwd() | 将与任何相对路径相结合以形成绝对路径的目录。对于绝对路径忽略。用于避免将 globs 与 path.join() 相结合。此选项直接传递给 glob-stream。 |
| base | string |  | 显式地在创建的 Vinyl 对象上设置 base 属性。详情请参见 API Concepts.此选项直接传递给 glob-stream。 |
| cwdbase | boolean | false | 如果为 true，cwd 和 base 选项应该对应起来。此选项直接传递给 glob-stream。 |
| root | string |  | 解析 globs 的根路径.此选项直接传递给 glob-stream。 |
| allowEmpty | boolean | false | 当为 false 时，只能匹配一个文件的 globs (如 foo/bar.js)如果没有找到匹配的文件，就会引发一个错误。如果为 true 的，则不会报错。此选项直接传递给 glob-stream。 |
| uniqueBy | string function | 'path' | 通过比较字符串属性名或函数的结果，从流中删除重复项。注意：当使用函数时，函数接收流数据(对象包含 cwd、base、path 属性)。 |
| dot | boolean | false | 如果为 true，请将 globs 与 .gitignore 等点文件进行比较。此选项直接传递给 node-glob。 |
| silent | boolean | true | 如果为 true，则禁止在 stderr 上打印警告。注意: 此选项直接传递给 node-glob，但默认为 true 而不是 false。 |
| mark | boolean | false | 如果为 true，将向目录匹配项追加一个 / 字符。通常不需要，因为路径是在管道中规范化的此选项直接传递给 node-glob。 |
| nosort | boolean | false | 如果为 true，禁用对 glob 结果排序。此选项直接传递给 node-glob。 |
| stat | boolean | false | 如果为 true， fs.stat() 在所有的结果上被调用。这增加了额外的开销，通常不应该使用。此选项直接传递给 node-glob。 |
| strict | boolean | false | 如果为 true，如果在尝试读取目录时遇到意外问题，将抛出错误。此选项直接传递给 node-glob。 |
| nounique | boolean | false | 当为 false 时，可以防止结果集中出现重复的文件。此选项直接传递给 node-glob。 |
| debug | boolean | false | 如果为 true，调试信息将被记录到命令行。此选项直接传递给 node-glob。 |
| nobrace | boolean | false | 如果为 true，避免扩大大括号集合 - 例如 {a,b} 或 {1..3}.此选项直接传递给 node-glob。 |
| noglobstar | boolean | false | 如果为 true，将双星（**） glob 字符视为单星(*) glob 字符此选项直接传递给 node-glob。 |
| noext | boolean | false | 如果为 true，避免匹配 extglob 模式 - 例如 +(ab).此选项直接传递给 node-glob。 |
| nocase | boolean | false | 如果为 true，则执行不区分大小写的匹配。注意: 在不区分大小写的文件系统上，默认情况下，non-magic 模式将被匹配。此选项直接传递给 node-glob。 |
| matchBase | boolean | false | 如果true 并且 globs 不包含任何 / 字符，遍历所有目录并匹配该 glob —— *.js 将被视为等同于 **/*.js。此选项直接传递给 node-glob。 |
| nodir | boolean | false | 若要仅匹配目录，glob 请以 / 结束。此选项直接传递给 node-glob。 |
| ignore | string array |  | 从匹配中排除。这个选项与否定的(negated) globs 组合在一起。注意: 无论其他设置如何，这些 globs 总是与点文件匹配。此选项直接传递给 node-glob。 |
| follow | boolean | false | 如果为 true，在展开 ** globs 时将遍历符号链接目录。注意: 这可能导致循环链接出现问题。此选项直接传递给 node-glob。 |
| realpath | boolean | false | 如果为 true，fs.realpath() 在所有的结果上调用。这可能导致悬挂式（dangling）链接。此选项直接传递给 node-glob。 |
| cache | object |  | 之前生成的缓存对象——避免了一些文件系统调用。此选项直接传递给 node-glob。 |
| statCache | object |  | 之前生成的 fs.Stat 缓存——避免了一些文件系统调用。此选项直接传递给 node-glob。 |
| symlinks | object |  | 之前生成的符号链接缓存——避免了一些文件系统调用。此选项直接传递给 node-glob。 |
| nocomment | boolean | false | 当为 false 时，将 glob 开头的 # 字符视为注释。此选项直接传递给 node-glob。 |


## 资源映射

资源映射支持直接构建到 src() 和 dest() 中，但是默认情况下是禁用的。使其能够生成内联或外部资源映射。

内联资源映射:

```js
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

src('input/**/*.js', { sourcemaps: true })
  .pipe(uglify())
  .pipe(dest('output/', { sourcemaps: true }));
```

外部资源映射：

```js
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

src('input/**/*.js', { sourcemaps: true })
  .pipe(uglify())
  .pipe(dest('output/', { sourcemaps: '.' }));
```

# dest()

创建一个用于将 Vinyl 对象写入到文件系统的流。

```js
const { src, dest } = require('gulp');

function copy() {
  return src('input/*.js')
    .pipe(dest('output/'));
}

exports.copy = copy;
```

## 函数原型

```js
dest(directory, [options])
```

| 参数 | 类型 | 描述 |
| ---- | ---- | ---- |
| directory(required) | string/function | 将写入文件的输出目录的路径。如果使用一个函数，该函数将与每个 Vinyl 对象一起调用，并且必须返回一个字符串目录路径。 |
| options | object | 详情见下文选项。 |

## 返回值

返回一个可以在管道的中间或末尾使用的流，用于在文件系统上创建文件。

每当 Vinyl 对象通过流被传递时，它将内容和其他细节写到给定目录下的文件系统。如果 Vinyl 对象具有 symlink 属性，将创建符号链接（symbolic link）而不是写入内容。创建文件后，将更新其元数据以匹配 Vinyl 对象。

在文件系统上创建文件时，Vinyl 对象将被修改。

- cwd、base 和 path 属性将被更新以匹配创建的文件。
- stat 属性将被更新，以匹配文件系统上的文件。
- 如果 contents 属性是一个流，它将被重置，以便可以再次读取。

## 可能出现的错误

当目录为空字符串时，将抛出一个错误，并提示 "Invalid dest() folder argument. Please specify a non-empty string or a function."（无效的 dest() 文件夹参数。请指定非空字符串或函数。）

当目录不是字符串或函数时，将抛出一个错误，并提示 "Invalid dest() folder argument. Please specify a non-empty string or a function."

当 directory 是一个返回空字符串或 undefined 的函数时，将发出一条错误消息 “Invalid output folder”。

## 元数据更新

每当 dest() 流创建一个文件时，就会将 Vinyl 对象的 mode、mtime 和 atime 与创建的文件进行比较。如果它们不同，创建的文件将被更新以反映 Vinyl 对象的元数据。如果这些属性相同，或者 gulp 没有更改的权限，则会跳过该尝试。

在不支持 Node 的 process.getuid()或 process.geteuid() 方法的 Windows 或其他操作系统上禁用此功能。这是因为Windows通过使用 fs.fchmod() 和 `fs.futimes() 会产生意想不到的结果。

注意: fs.futimes() 在内部将 mtime 和 atime 时间戳转换为秒。这种除以 1000 的方法可能会导致 32 位操作系统的精度有所下降。

## Sourcemaps

Sourcemap 支持直接构建到 src() 和 dest() 中，但默认情况下是禁用的。使其能够生成内联或外部 sourcemaps。

内联 sourcemaps:

```js
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

src('input/**/*.js', { sourcemaps: true })
  .pipe(uglify())
  .pipe(dest('output/', { sourcemaps: true }));
```

外部 sourcemaps:

```js
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

src('input/**/*.js', { sourcemaps: true })
  .pipe(uglify())
  .pipe(dest('output/', { sourcemaps: '.' }));
```

## Symbolic links on Windows

在 Windows 上创建符号链接时，type 参数被传递给 Node 的 fs.symlink() 方法，该方法指定被链接的目标的类型。链接类型设置为:

- 'file'，当目标是一个常规文件时
- 'junction'， 当目标是一个目录时
- 'dir'， 当目标是一个目录并且用户禁用了 useJunctions 选项时

如果试图创建 dangling (指向不存在的目标)链接，则无法自动确定链接类型。在这些情况下，根据 dangling 链接是通过 symlink() 创建的还是通过 dest() 创建的，行为会有所不同。

对于通过 symlink() 创建的 dangling 链接，传入的 Vinyl 对象表示目标，因此其 stats 将确定所需的链接类型。如果 isDirectory() 返回 false，则创建一个 'file' 链接，否则根据 useJunctions 选项的值创建一个 'junction' 或 'dir' 链接。

对于通过 dest() 创建的 dangling 链接，传入的 Vinyl 对象表示链接——通常通过 src(..., { resolveSymlinks: false }) 从磁盘加载。在这种情况下，无法合理地确定链接类型，默认使用 'file'。如果正在创建指向目录的 dangling 链接，这可能会导致意外行为。避免这种情况。

# symlink()

```js
const { src, symlink } = require('gulp');

function link() {
  return src('input/*.js')
    .pipe(symlink('output/'));
}

exports.link = link;
```

```js
symlink(directory, [options])
```

# lastRun()

检索在当前运行进程中成功完成任务的最后一次时间。最有用的后续任务运行时，监视程序正在运行。当监视程序正在运行时，对于后续的任务运行最有用。

当与 src() 组合时，通过跳过自上次成功完成任务以来没有更 改的文件，使增量构建能够加快执行时间。

```js
const { src, dest, lastRun, watch } = require('gulp');
const imagemin = require('gulp-imagemin');

function images() {
  return src('src/images/**/*.jpg', { since: lastRun(images) })
    .pipe(imagemin())
    .pipe(dest('build/img/'));
}

exports.default = function() {
  watch('src/images/**/*.jpg', images);
};
```

```js
lastRun(task, [precision])
```

# series()

将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行。对于使用 series() 和 parallel() 组合操作的嵌套深度没有强制限制。

```js
const { series } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = series(javascript, css);
```

```js
series(...tasks)
```

# parallel()

将任务功能和/或组合操作组合成同时执行的较大操作。对于使用 series() 和 parallel() 进行嵌套组合的深度没有强制限制。

```js
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```

```js
parallel(...tasks)
```

| 参数 | 类型 | 注解 |
| ---- | ---- | ---- |
| tasks(required) | function/string | 任意数量的任务函数都可以作为单独的参数传递。如果您以前注册过任务，可以使用字符串，但不建议这样做。 |

# watch()

监听 globs 并在发生更改时运行任务。任务与任务系统的其余部分被统一处理。

```js
const { watch } = require('gulp');

watch(['input/*.js', '!input/something.js'], function(cb) {
  // body omitted
  cb();
});
```

```js
watch(globs, [options], [task])
```

# task()

提醒: 这个API不再是推荐的模式了 - export your tasks。因此就不翻译了！

在任务系统中定义任务。然后可以从命令行和 series()、parallel() 和 lastRun() api 访问该任务。

```js
const { task } = require('gulp');

function build(cb) {
  // body omitted
  cb();
}

task(build);
```

```js
const { task } = require('gulp');

task('build', function(cb) {
  // body omitted
  cb();
});
```

```js
const { task } = require('gulp');

task('build', function(cb) {
  // body omitted
  cb();
});

const build = task('build');
```

```js
task([taskName], taskFunction)
```

# registry()

允许将自定义的注册表插入到任务系统中，以期提供共享任务或增强功能。

注意： 只有用 task() 方法注册的任务才会进入自定义注册表中。直接传递给 series() 或 parallel() 的任务函数（task functions）不会进入自定义任务注册表 - 如果你需要自定义注册表的行为，请通过字符串引用的方式将任务（task）组合在一起。

分配新注册表时，将传输当前注册表中的每个任务，并将用新注册表替换当前注册表。这允许按顺序添加多个自定义注册表。

有关详细信息，请参考 [创建自定义注册表](https://www.gulpjs.com.cn/docs/documentation-missing) 。

```js
const { registry, task, series } = require('gulp');
const FwdRef = require('undertaker-forward-reference');

registry(FwdRef());

task('default', series('forward-ref'));

task('forward-ref', function(cb) {
  // body omitted
  cb();
});
```

```js
registry([registryInstance])
```

| 参数 | 类型 | 注解 |
| ---- | ---- | ---- |
| registryInstance | object | 自定义注册表的实例(而不是类)。 |

# tree()

获取当前任务依赖关系树——在极少数情况下需要它。

通常，gulp 使用者不会使用 tree()，但它是公开的，因此 CLI 可以显示在 gulpfile 中定义的任务的依赖关系图。

```js
const { series, parallel } = require('gulp');

function one(cb) {
  // body omitted
  cb();
}

function two(cb) {
  // body omitted
  cb();
}

function three(cb) {
  // body omitted
  cb();
}

const four = series(one, two);

const five = series(four,
  parallel(three, function(cb) {
    // Body omitted
    cb();
  })
);

module.exports = { one, two, three, four, five };
```

tree() 的输出:

```js
{
  label: 'Tasks',
  nodes: [ 'one', 'two', 'three', 'four', 'five' ]
}
```

tree({ deep: true }) 的输出:

```js
{
  label: "Tasks",
  nodes: [
    {
      label: "one",
      type: "task",
      nodes: []
    },
    {
      label: "two",
      type: "task",
      nodes: []
    },
    {
      label: "three",
      type: "task",
      nodes: []
    },
    {
      label: "four",
      type: "task",
      nodes: [
        {
          label: "<series>",
          type: "function",
          branch: true,
          nodes: [
            {
              label: "one",
              type: "function",
              nodes: []
            },
            {
              label: "two",
              type: "function",
              nodes: []
            }
          ]
        }
      ]
    },
    {
      label: "five",
      type: "task",
      nodes: [
        {
          label: "<series>",
          type: "function",
          branch: true,
          nodes: [
            {
              label: "<series>",
              type: "function",
              branch: true,
              nodes: [
                {
                  label: "one",
                  type: "function",
                  nodes: []
                },
                {
                  label: "two",
                  type: "function",
                  nodes: []
                }
              ]
            },
            {
              label: "<parallel>",
              type: "function",
              branch: true,
              nodes: [
                {
                  label: "three",
                  type: "function",
                  nodes: []
                },
                {
                  label: "<anonymous>",
                  type: "function",
                  nodes: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## 函数原型

```js
tree([options])
```

# Vinyl

虚拟的文件格式。当 src() 读取文件时，将生成一个 Vinyl 对象来表示文件——包括路径、内容和其他元数据。

Vinyl 对象可以使用插件进行转换。还可以使用 dest() 将它们持久化到文件系统。

当创建您自己的 Vinyl 对象时——而不是使用 src() 生成——使用外部 vinyl 模块，如下面的用法所示。

```js
const Vinyl = require('vinyl');

const file = new Vinyl({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js',
  contents: new Buffer('var x = 123')
});

file.relative === 'file.js';

file.dirname === '/test';
file.dirname = '/specs';
file.path === '/specs/file.js';

file.basename === 'file.js';
file.basename = 'file.txt';
file.path === '/specs/file.txt';

file.stem === 'file';
file.stem = 'foo';
file.path === '/specs/foo.txt';
file.extname === '.txt';
file.extname = '.js';
file.path === '/specs/file.js';
```

```js
new Vinyl([options])
```

# Vinyl.isVinyl()

检测一个对象（object）是否是一个 Vinyl 实例。不要使用 instanceof 方法。

注意：此方法使用了 Vinyl 的一个内部属性，而这个属性在老版本的 Vinyl 中是不存在的，如果你使用的恰好时老版本，则会得到一个 fasle 结果。

```js
const Vinyl = require('vinyl');

const file = new Vinyl();
const notAFile = {};

Vinyl.isVinyl(file) === true;
Vinyl.isVinyl(notAFile) === false;
```

```js
Vinyl.isVinyl(file);
```

# Vinyl.isCustomProp()

确定一个属性是否由 Vinyl 在内部进行管理。Vinyl 在构造函数中设置值或在 clone() 实例方法中复制属性时使用。

这种方法在扩展 Vinyl 类时很有用。详情参见下文：扩展 Vinyl。

```js
const Vinyl = require('vinyl');

Vinyl.isCustomProp('sourceMap') === true;
Vinyl.isCustomProp('path') === false;
```

Vinyl.isCustomProp(property)
