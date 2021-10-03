一、 特性

Node.js 可以解析 JS 代码(没有浏览器安全级别的限制)提供了很多系统级别的 API，如

- 文件的读写(File System)
- 进程的管理(Process)
- 网络通信(HTTP/HTTPS)

笔记地址: https://lurongtao.gitee.io/felixbooks-gp19-node.js/basics/01-Node.js%E5%9F%BA%E7%A1%80.html

二、举例

1. 浏览器安全级别的限制(安全沙箱限制)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>browser-safe-sandbox</title>
  </head>
  <body>
    <div>browser-safe-sandbox</div>
    <script>
      const xhr = new XMLHttpRequest();
      xhr.open(
        'get',
        'https://m.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=30&optimus_uuid=A5518FF0AFEC11EAAB158D7AB0D05BBBD74C9789D9F649898982E6542C7DD479&optimus_risk_level=71&optimus_code=10',
        false
      );
      xhr.send();
    </script>
  </body>
</html>
```

2. 利用 nodejs 请求一个接口

```js
const http = require('http');
const server = http.createServer(function (req, res) {
  let url = req.url;
  res.write(url);
  res.end();
});
server.listen(8090, 'localhost', () => console.log('localhost: 8090'));
```

三、 Node 相关工具

1. NVM: Node Version Manager(node 的版本管理)

- mac 安装 nvm

```shell
https://github.com/nvm-sh/nvm/blob/master/README.md
```

- windows 安装 nvm

```
nvm-windows
nodist
```

- nvm 常见命令

```
nvm --help // 查看帮助
nvm list // 查看已安装的nodejs版本
nvm use 14.15.0 // 切换版本
nvm alias  default v14.15.0 // 切换默认版本
```

1. NPM: Node Package Manager(node 的历史版本)

- 全局安装 package

```
npm install forever --global(-g)
forever
npm uninstall forever --global
forever
```

- 全局安装包的目录

mac

```
/Users/felix/.nvm/versions/node/nvm各个版本/bin/
```

windows

```
C:\Users\你的用户名\AppData\Roaming\npm\node_modules
```

- 本地安装 package

```
cd ~/desktop
mkdir gp-project
cd gp-project
npm install underscore
npm list(ls)
```

- package.json 初始化

```
npm init -y
ls
cat package.json
```

- 使用 package.json

```
npm install underscore --save
cat package.json
npm install lodash --save-dev
cat package.json
rm -rf node_modules
ls
npm install
npm uninstall underscore --save
npm list | grep underscore
cat package.json
```

- 安装指定版本的包

```
npm list
npm info underscore
npm view underscore versions
npm install underscore @1.8.0
npm list
npm uninstall underscore
npm list
```

- 更新本地安装的包

```
npm info underscore
npm view underscore versions
npm install underscore@1.4.4 --save-dev
npm list | grep gulp
npm outdated //~2.0.0表示patch, ^2.0.o表示minor, *表示xx最新版本
npm list | grep gulp
npm update
```

- 清除缓存

```
npm cache clean --force
```

- 制作自定义 npm 包

  - 便携模块

    保存为 index.js

    ```js
    exports.sayHello = function () {
      return 'hello world';
    };
    ```

  - 初始化包描述文件

    ```
    npm init package.json
    ```

    ```json
    {
      "name": "gp19-npm",
      "version": "1.0.1",
      "description": "gp19 self module",
      "main": "index.js",
      "scripts": {
        "test": "make test"
      },
      "repository": {
        "type": "Git",
        "url": "git+https://github.com/lurongtao/gp19-npm.git"
      },
      "keywords": ["demo"],
      "author": "Felixlu",
      "license": "ISC",
      "bugs": {
        "url": "https://github.com/lurongtao/gp19-npm/issues"
      },
      "homepage": "https://github.com/lurongtao/gp19-npm#readme"
    }
    ```

  - 注册 npm 仓库账号

    ```
    https://www.npmjs.com 上面的账号
    felix_lurt/qqmko09ijn
    npm add user
    ```

  - 上传包

    ```
    npm publish
    ```

  - 403 Forbidden

    ```
    npm config get registry // 查看npm源
    npm config set registry http://registry.npmjs.org // 切换npm源方法一
    nrm use npm // 切换npm源方法二
    ```

  - 安装包

    ```
    npm install gp19-npm
    ```

  - 卸载包

    ```
    npm ls // 查看当前项目引用了那些包
    npm unpublish --force // 卸载包
    ```

  - 使用引入包

    ```
    var hello = require('gp19-npm');
    hello.sayHello()
    ```

- 查看 gulp 所有版本

```
npm view gulp versions
```

- npm 脚本

  - 定义

    npm 允许在 package.json 文件里面，使用 scripts 字段定义脚本命令

    ```json
    {
      // ...
      "scripts": {
        "build": "node build.js"
      }
    }
    ```

  - 执行顺序

    如股票 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序

    ```js
    // script1.js
    var x = 0;
    console.log(x);
    ```

    ```js
    var y = 0;
    console.log(y);
    ```

    ```json
    "scripts": {
      "script1": "node script1.js",
      "script2": "node script2.js"
    }
    ```

    如果是并行执行(即同时的平行执行),可以使用&符号

    ```
    npm run script1 & npm run script2
    ```

    如果是继发执行(即只有前一个任务成功，才执行下一个任务),可以使用&&符号

    ```
    npm run script1 && npm run script2
    ```

- 简写模式

常用的 npm 脚本简写形式

```js
npm start // npm run start
```

- 变量

npm 脚本有个一个非常强大的功能，就是可以使用 npm 的内部变量

- 通过 npm*package*前缀，npm 脚本可以拿到 package.json 里面的字段。

  > 注意: 一定要在 npm 脚本运行(如: npm run view)才可以，直接在命令行中运行 js(如: node view.js)是拿不到值的

  ```json
  {
    "name": "foo",
    "version": "1.2.5",
    "scripts": {
      "view": "node view.js"
    }
  }
  ```

  那么变量 npm_package_name 返回 foo, 变量 npm_package_version 返回 1.2.5

  ```js
  console.log(process.env.npm_package_name); // foo
  console.log(process.env.npm_package_version); // 1.2.5
  ```

  上面代码中，我们通过环境变量 process.env 对象，拿到 package.json 的字段值。
  如果是 Bash 脚本，可以用 npm_package_name 和 npm_package_version 取到这两个值。

  ```json
  "repository": {
    "type": "git",
    "url": "xxx"
  },
  "scripts": {
    "view": "echo $npm_package_repository_type"
  }
  ```

  上面代码中，repository 字段的 type 属性，可以通过 npm_package_type 取到

  ```json
  "scripts": {
    "install": "foo.js"
  }
  ```

  上面代码中，npm_package_scripts_install 变量的值等于 foo.js

  然而 npm 脚本还可以通过 npm config 前缀，拿到 npm 的配置变量，即 npm config get xxx 命令返回的值。 比如当前模块的发行标签，可以通过 npm_config_tag 取到。

  ```json
  "view": "echo $npm_config_tag"
  ```

  注意,package.json 里面的 config 对象，可以被环境变量覆盖

  ```json
  {
    "name": "foo",
    "config": { "prot": "8080" },
    "scripts": { "start": "node server.js" }
  }
  ```

  上面代码中，npm_package_config_port 变量返回的是 8080。 这个值可以用下面的方法覆盖。

  ```
  npm config set foo:port 80
  ```

  最后，env 命令可以列出所有的环境变量

  ```json
  "env": "env
  ```

- npm 安装 git 上发布的包

  ```
  // 这样适合安装公司内部的git服务器上的项目
  npm install git+https://git@github.com:lurongtao/gp-project.git

  // 或者以ssh的方式
  npm install git+ssh://git@github.com:lurrongtao/gp-project.git
  ```

- cross-env 使用

cross-env 是什么

运行跨平台设置和使用环境变量的脚本

出现原因

当您使用 NODE_ENV=production, 来设置环境变量, 大多数 Windows 命令提示将会阻塞(报错)。
(异常是 Windows 上的 Bash, 它使用本机 Bash),换言之 Windows 不支持 NODE_ENV=production 的设置方式。

解决

cross-env 使得你可以使用单个命令，而不必担心为平台正确设置或使用环境变量。

这个迷你的包(cross-env)能够提供一个设置环境变量的 script，让你能够以 Unix 方式设置环境变量，然后在 Windows 上也能兼容运行。

安装

```
npm install --save-dev cross-env
```

使用

```json
{
  "scripts":{
    "build: "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

NODE_ENV 环境变量将有 cross-env 设置打印 process.env.NODE_ENV === "production"

2. NRM: npm registry manager

2.1 手工切换源

- 查看当前源

```
npm config get registry
```

- 切换淘宝源

```
npm config set registry https://registry.npm.taobao.org
```

2.2 NRM 管理源

NRM 是 npm 的镜像管理工具，有时候国外资源太慢，有时候国外资源太慢，使用这个就可以快速在 npm 源间切换

- 安装 nrm

```
// 在命令行执行命令, 全局安装nrm
nom install -g nrm
```

- 使用 nrm

执行命令 nrm ls 查看可选的源。其中带\*的是当前使用的源。上面的输出表明当前源是官方源。

- 切换 nrm

如果要切换到 taobao 源，执行命令 nrm use taobao

- 测试速度

通过 nrm test 测试相应源的响应时间

```
nrm test
```

3. NPX: npm package extention

npm 从 5.2 版开始， 增加了 npx 命令。 它有很多用处, 本文介绍该命令的主要使用场景。

Node 自带 npm 模块，所以可以直接使用 npx 命令。

万一不能用，就要手动安装一下。

```
npm install -g npx
```

3.1 调用项目安装的模块

npx 想要解决的主要问题，就是调用项目内部安装的模块。比如项目内部安装了 Mocha

```
npm install -d mocha
```

一般来说调用 Mocha，只能在项目脚本和 package.json 的 scripts 字段里面。如果想在命令行下调用，必须像下面这样。

```
// 项目的根目录下执行
node-modules/.bin/mocha --version
```

npx 就是解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了

```
npx mocha --version
```

npx 的原理很简单，就是运行的时候，回到 node_modules/.bin 路径和环境变量$PATH 里面，检查命令是否存在

由于 npx 会检查环境变量$PATH，所以系统命令也可以调用

```
// 等同于ls
npx ls
```

注意 Bash 内置的命令不在$PATH 里面，所以不能调用

比如 cd 是 Bash 命令，因此就不能用 npx cd

3.2 避免全局安装模块

除了调用项目内部模块，npx 还能避免全局安装的模块。

比如 create-react-app 这个模块是全局安装的，npx 可以运行它，而且不进行全局安装

```
npx create-react-app my-react-app
```

上面代码运行时，npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以以后再次执行上面的命令，会重新下载 create-react-app。

注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。

比如在本地没有安装 http-server 模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务

```
npx http-server
```

3.3 -no-install 参数和 --ignore-existing 参数

如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install 参数。

如果本地不存在该模块，就会报错

```
npx --no-install http-server
```

反过来如果忽略本地的同名模块，强制安装使用远程模块，可以使用--ignore-existing 参数

```
npx --no-install http-server
```

反过来如果忽略本地的同名模块，强制安装使用远程模块，可以使用--ignore-existing 参数。

比如本地已经安装了 http-server，但还是想使用远程模块，就用这个参数

```
npx --ignore-existing http-server
```

四、 模块/包 与 CommonJS

1. 模块/包分类

NodeJS 有三类模块，即内置模块、第三方模块、自定义模块。

- 内置的模块

NodeJS 内置的模块又叫核心模块，NodeJS 安装完成可直接使用。

```js
const path = require('path');
var extname = path.extname('index.html');
console.log(extname);
```

- 第三方模块

第三方的 NodeJS 模块指的是为了实现某些功能，发布了 npmjs.org 上的模块，按照一定的开源协议供社群使用

```
npm install chalk
```

```js
const chalk = require('chalk');
console.log(chalk.blue('hello world'));
```

- 自定义模块

自定义的 NodeJS 模块，也叫文件模块，是我们自己写的供自己使用的模块。

同时这类模块发布到 npmjs.org 上就成了开源的第三方模块。

自定义模块是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程、速度相对核心模块稍微慢一些，但是用的非常多。

- 模块定义、接口暴露和引用接口

  我们可以把公共的功能抽离称为一个单独的 js 文件作为一个模块，默认情况下面这个模块里面的方法或者属性，外面是没法访问的。

  如果是要让外部可以访问模块里面的方法或者属性，就必须在模块里面通过 exports 或者 module.exports 暴露属性或者方法。

  ```js
  // m1.js
  const name = 'gp19';
  const sayName = () => {
    console.log(name);
  };

  // 接口暴露方法一
  module.exports = {
    say: sayName,
  };
  // 接口暴露方法二
  exports.say = sayName;
  // 错误！
  exports = {
    say: sayName,
  };
  ```

  ```js
  // main.js
  const m1 = require('./m1');
  m1.say();
  ```

- 模块的循环引用

  由于 exports 使用方式不对，会在两个不同 js 循环引用的情况下，导致其中一个 js 无法获取另外一个 js 的方法，从而导致执行报错。

  ```js
  // a.js
  exports.done = false;
  const b = require('./b.js');
  console.log('in a, b.done = %j', b.done);
  exports.done = true;
  console.log('a done');
  ```

  ```js
  // b.js
  console.log('b starting');
  exports.done = false;
  const a = require('./a.js');
  console.log('in b, a.done = %j', a.done);
  exports.done = true;
  console.log('b done');
  ```

  ```js
  // main.js
  console.log('main starting');
  const a = require('./a.js');
  const b = require('./b.js');
  console.log('in main, a.done=%j, b.done = %j', a.done, b.done);
  ```

  main.js 首先会 load a.js, 此时执行到 const b = require('./b.js');

  程序会转去 load b.js, 在 b.js 中执行到 const a = require('./a.js');

  为了防止无限循环，将 a.js exports 的未完成副本返回 b.js 模块。然后 b.js 完成加载，并将其导出对象提供给 a.js 模块。

  我们知道 nodeJS 对每个 js 文件进行了一层包装称为 module， module 中有一个属性 exports，当调用 require(a.js)的时候其实返回的是 module.exports 对象，module.exports 初始化为一个{}空的 object。
  所以在上面的例子中，执行到 b.js 中 const a = require('./a.js'时不会 load 新的 a module, 而是将已经 load 但是还未完成的 a module 的 exports 属性返回给 b module，所以 b.js 拿到的是 a module 的 exports 对象，即{done: false}， 虽然在 a.js 中 exports.done 被修改成了 true，但是由于此时 a.js 未 load 完成，所以在 b.js 输出的 a module 的属性 done 为 false， 而在 main.js 中输出的 a module 的属性 done 为 true。

  Nodejs 通过上面这种返回未完成 exports 对象来解决循环引用的问题。

四、 常用内置模块

1. url

- parse

```js
// url.parse(urlString, parseQueryString, slashesDenoteHost)
const url = require('url');
const urlString =
  'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110';
const parsedStr = url.parse(urlString);
console.log(parsedStr);
```

- format

```js
// url.format(urlObject)
const url = require('url');
const urlObject = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=110',
  search: '?id=8&name=mouse',
  query: { id: '8', name: 'mouse' },
  pathname: '/ad/index.html',
  path: '/ad/index.html?id=8&name=mouse',
  href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110',
};
const parsedObj = url.format(urlObject);
console.log(parsedObj);
```

- resolve

```js
// url.resolve(form, to)
const url = require('url');
var a = url.resolve('/one/two/three', 'four');
var b = url.resolve('http://example.com/', '/one');
var c = url.resolve('http://example.com/one', '/tow');
console.log(a + ',' + b + ',' + c);
```

2. querystring

- parse

```js
// querystring.parse(str, sep, eq, options)
const querystring = require('querystring');
var qs = 'x=3&y=4';
var parsed = querystring.parse(qs);
console.log(parsed);
```

- stringify

```js
// querystring.stringify(obj, sep, eq, options)
const querystring = require('querystring');
var qo = { x: 3, y: 4 };
var parsed = querystring.stringify(qo);
console.log(parsed);
```

- escape/unescape

```js
// querystring.escape(str)
const querystring = require('querystring);
var str = 'id=3&city=北京&url=https://www.baidu.com';
var escaped = querystring.escape(str);
console.log(escaped);
```

```js
// querystring.unescape(str)
const querystring = require('querystring);
var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com';
var unescaped = querystring.unescape(str);
console.log(unescaped);
```


