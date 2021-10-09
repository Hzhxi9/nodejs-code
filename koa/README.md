### Koa

一、 快速开始

1. 环境准备

因为 node.js v7.6.0 开始完全支持 async/await，不需要加 flag，

- node.js 环境都要 7.6.0 以上
- node.js 环境 版本 v7.6 以上
- npm 版本 3.x 以上

2. 快速开始

- 安装

```
// 初始化package.json
npm init

// 安装koa2
npm install koa
```

- hello world 实例

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'hello koa';
});

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
```

- 启动

由于 koa2 是基于 async/await 操作中间件，目前 node.js 7.x 的 harmony 模式下才能使用，所以启动的时的脚本如下：

```
node index.js
```

二、 async / await 使用

1. 理解

```js
function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      const startTime = new Date().getTime();
      setTimeout(() => {
        const endTime = new Date().getTime();
        const data = endTime - startTime;
        resolve(data);
      }, 500);
    } catch (err) {
      reject(err);
    }
  });
}

async function getSyncData() {
  const time = await getSyncTime();
  const data = `endTime - startTime = ${time}`;
  return data;
}

async function getData() {
  const data = await getSyncData();
  console.log(data);
}

getData();
```

2. 从上述例子可以看出 async/await 的特点：

- 可以让异步逻辑用同步写法实现
- 最底层的 await 返回需要是 Promise 对象
- 可以通过多层 async function 的同步写法代替传统的 callback 嵌套

三、 Koa 结构

1. 源码文件

├── lib │ ├── application.js │ ├── context.js │ ├── request.js │ └── response.js └── package.json

koa 源码的源文件结构，核心代码就是 lib 目录下的四个文件

- application.js 是整个 koa 的入口文件，封装了 context, request, response 以及最核心的中间件处理流程
- context.js 处理应用上下文，里面直接封装部分 request.js 和 response.js 的方法
- request.js 处理 http 请求
- response.js 处理 http 响应

2. 特性

- 只提供封装好 http 上下文、请求、响应，以及基于 async/await 的中间件容器。
- 利用 ES7 的 async/await 的来处理传统回调嵌套问题和代替 koa@1 的 generator，但是需要在 node.js 7.x 的 harmony 模式下才能支持 async/await。
- 中间件只支持 async/await 封装的，如果要使用 koa@1 基于 generator 中间件，需要通过中间件 koa-convert 封装一下才能使用。

四、 Koa 中间件开发和使用

- koa v1 和 v2 中使用到的中间件的开发和使用
- generator 中间件开发在 koa v1 和 v2 中使用
- async await 中间件开发和只能在 koa v2 中使用

1. generator 中间件开发

> generator 中间件返回的应该是 function \* () 函数

```js
/* ./middleware/logger-generator.js */
function log(ctx) {
  console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function () {
  return function* (next) {
    /**执行中间件的操作*/
    log(this);
    if (next) yield next;
  };
};
```

2. generator 中间件在 koa@1 中的使用

> generator 中间件在 koa v1 中可以直接 use 使用

```js
const koa = require('koa');
const loggerGenerator = require('./middleware/logger-generator');
const app = koa();

app.use(loggerGenerator());

app.use(function* () {
  this.body = 'hello world';
});

app.listen(3000);
console.log('the server is starting at port 3000');
```

3. generator 中间件在 koa@2 中的使用

> generator 中间件在 koa v2 中需要用 koa-convert 封装一下才能使用

```js
const Koa = require('koa'); // Koa v2
const convert = require('koa-convert');
const loggerGenerator = require('./middleware/logger-generator');

const app = new Koa();
app.use(convert(loggerGenerator()));

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(3000);
console.log('the server is starting at port 3000');
```

4. async 中间件开发

```js
/* ./middleware/logger-async.js */
function log(cxt) {
  console.log(ctx.method, ctx.header.host + ctx.url);
}
module.exports = function () {
  return async function (ctx, next) {
    log(ctx);
    await next();
  };
};
```

5. async 中间件在 koa@2 中使用

> async 中间件只能在 koa v2 中使用

```js
const Koa = require('koa'); // koa v2
const loggerAsync = require('./middleware/logger-async');

const app = new Koa();

app.use(loggerAsync());

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(3000);
console.log('the server is starting at port 3000');
```

五、路由

1. koa 原生路由实现

- 简单例子

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  const url = ctx.request.url;
  ctx.body = url;
});

app.listen(3000);
```

访问 http://localhost:3000/hello/world 页面会输出 /hello/world，

也就是说上下文的请求 request 对象中 url 之就是当前访问的路径名称，可以根据 ctx.request.url 通过一定的判断或者正则匹配就可以定制出所需要的路由。

2. 定制化路由

- 源码文件目录

```
├── index.js
├── package.json
└── view
    ├── 404.html
    ├── index.html
    └── todo.html
```

- 源码

```js
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
function render(page) {
  return new Promise((resolve, reject) => {
    const viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route(url) {
  let view = '404.html';
  switch (url) {
    case '/':
      view = 'index.html';
      break;
    case '/index':
      view = 'index.html';
      break;
    case '/todo':
      view = 'todo.html';
      break;
    case '/404':
      view = '404.html';
      break;
  }
  const html = await render(view);
  return html;
}

app.use(async (ctx) => {
  const url = ctx.request.url;
  const html = await route(url);
  ctx.body = html;
});

app.listen(3000);
console.log('[demo] route-simple is starting at port 3000');
```

- 运行

```
node -harmony index.js
```

六、 koa-router 中间件

如果依靠 ctx.request.url 去手动处理路由，将会写很多处理代码，这时候就需要对应的路由的中间件对路由进行控制，这里介绍一个比较好用的路由中间件 koa-router

- 安装 koa-router 中间件

```
# koa2 对应的版本是 7.x
npm install --save koa-router@7
```

- 快速使用 koa-router

```js
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

const Router = require('koa-router');
const home = new Router();

// 子路由1
home.get('/', async (ctx) => {
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
  ctx.body = html;
});

// 子路由2
let page = new Router();
page
  .get('/404', async (ctx) => {
    ctx.body = '404 page!';
  })
  .get('/helloworld', async (ctx) => {
    ctx.body = 'helloworld page!';
  });

// 装载所有子路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000');
});
```
