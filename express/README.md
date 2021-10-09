## Express

一、 特色

1. Web 应用

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

2. API

丰富的 HTTP 快捷方法和任意排列组合的 Connect 中间件，让你创建健壮、友好的 API 变得既快速又简单。

3. 性能

Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。

二、安装

- 首先假定你已经安装了 Node.js，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。

```
mkdir my-app
cd my-app
```

- 通过 npm init 命令为你的应用创建一个 package.json 文件

```
npm init
```

- 接下来安装 Express 并将其保存到依赖列表中

```
npm install express --save
```

- 如果只是临时安装 Express，不想将它添加到依赖列表中，只需略去 --save 参数即可：

```
npm install express
```

> 安装 Node 模块时，如果指定了 --save 参数，那么此模块将被添加到 package.json 文件中 dependencies 依赖列表中。 然后通过 npm install 命令即可自动安装依赖列表中所列出的所有模块。

三、 Hello World 实例

注意：这里所创建是一个最最简单的 Express 应用，并且仅仅只有一个文件 — 和通过 Express 应用生成器 所创建的应用完全不一样，Express 应用生成器所创建的应用框架包含多 JavaScript 文件、Jade 模板和针对不同用途的子目录。

1. 进入 my-app 目录，创建一个名为 app.js 的文件。

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

上面的代码启动一个服务并监听从 3000 端口进入的所有连接请求。他将对所有 (/) URL 或 路由 返回 “Hello World!” 字符串。对于其他所有路径全部返回 404 Not Found。

> req (请求) 和 res (响应) 与 Node 提供的对象完全一致，因此，你可以调用 req.pipe()、req.on('data', callback) 以及任何 Node 提供的方法。

2. 通过如下命令启动此应用

```
node app.js
```

四、 路由

> 路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由是由一个 URI、HTTP 请求（GET、POST 等）和若干个句柄组成

它的结构如下： app.METHOD(path, [callback...], callback)

- app 是 express 对象的一个实例
- METHOD 是一个 HTTP 请求方法
- path 是服务器上的路径
- callback 是当路由匹配时要执行的函数

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('hello world'));
```

1. 路由方法

路由方法源于 HTTP 请求方法，和 express 实例相关联。

```js
// 应用跟路径定义的 GET 和 POST 请求
// GET method route
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', (req, res) => {
  res.send('hello world');
});

// 网站首页接受 POST 请求
app.post('/', (req, res) => {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});
```

Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。

> 有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： app['m-search']('/', function ...)

- app.all() 方法

app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。

```js
app.all('/select', (req, res, next) => {
  console.log('Accessing the secret section ...');
  next();
});
```

2. 路由路径

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

Express 使用 path-to-regexp 匹配路由路径

Express Route Tester 是测试基本 Express 路径的好工具，但不支持模式匹配。

- 使用字符串的路由路径示例：

```js
// 匹配根路径的请求
app.get('/', (req, res) => {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', (req, res) => {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', (req, res) => {
  res.send('random.text');
});
```

- 用字符串模式的路由路径示例：

```js
// 匹配 acd 和 abcd
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?');
});
```

> 字符 ?、+、\* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。

- 使用正则表达式的路由路径示例：

```js
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function (req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/');
});
```

3. 路由句柄

可以为请求处理提供多个回调函数，其行为类似 中间件。

唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。

可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.

- 使用一个回调函数处理路由：

```js
app.get('/example/a', (req, res) => {
  res.send('hello form a');
});
```

- 使用多个回调函数处理路由（记得指定 next 对象）：

```js
app.get(
  '/example/b',
  (req, res, next) => {
    console.log('response will be sent by the next function ...');
    next();
  },
  (req, res) => {
    res.send('hello from b');
  }
);
```

- 使用回调函数数组处理路由：

```js
const cb0 = (req, res, next) => {
  console.log('cb0');
  next();
};
const cb1 = (req, res, next) => {
  console.log('cb1');
  next();
};
const cb2 = (req, res, next) => {
  res.send('Hello from C!');
};
app.get('/example/c', [cb0, cb1, cb2]);
```

- 混合使用函数和函数数组处理路由：

```js
const cb0 = (req, res, next) => {
  console.log('cb0');
  next();
};
const cb1 = (req, res, next) => {
  console.log('cb1');
  next();
};

app.get(
  '/example/d',
  [cb0, cb1],
  (req, res, next) => {
    console.log('response will be sent by the next function ...');
    next();
  },
  (req, res) => {
    res.send('hello from d');
  }
);
```

4. 响应方式

下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

| 方法           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| res.download   | 提示下载文件                                                 |
| res.end        | 终结响应处理流程                                             |
| res.json       | 发送一个 JSON 格式的响应                                     |
| res.jsonp      | 发送一个支持 JSONP 的 JSON 格式的响应                        |
| res.redirect   | 重定向请求                                                   |
| res.render     | 渲染模板引擎                                                 |
| res.send       | 发送各种类型的响应                                           |
| res.sendFile   | 以八位字节流的形式发送文件                                   |
| res.sendStatus | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。 |

5. app.route()

可使用 app.route() 创建路由路径的链式路由句柄。

由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

下面这个示例程序使用 app.route() 定义了链式路由句柄。

```js
app
  .route('/book')
  .get((req, res) => {
    res.send('get');
  })
  .post((req, res) => {
    res.send('post');
  })
  .put((req, res) => {
    res.send('put');
  });
```

6. express.Router

可使用 express.Router 类创建模块化、可挂载的路由句柄。

Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

在 app 目录下创建名为 birds.js 的文件，内容如下：

```js
const express = require('express');
const router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// 定义网站主页路由
router.get('/', (req, res) => {
  res.send('Birds home page');
});

// 定义 about 页面路由
router.get('/about', (req, res) => {
  res.send('About birds');
});

module.exports = router;
```

然后在应用中加载路由模块：

```js
var birds = require('./birds');

app.use('/birds', birds);
```

应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。

五、 利用 Express 托管静态资源

通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。

例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```js
app.use(express.static('public'));
```

现在，public 目录下面的文件就可以访问了。

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

> 所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

```js
app.use('/static', express.static('public'));
```

现在，你就可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。

```js
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

六、 使用中间件

一个 Express 应用就是在调用各种中间件

中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

- 中间件的功能包括

  - 执行任何代码
  - 修改请求和响应对象
  - 终结请求-响应循环
  - 调用堆栈中的下一个中间件

如果当前中间件没有终结请求-响应循环，则必须调用 next()方法将控制权交给下一个中间件，否则请求就会被挂起。

- Express 应用可使用如下几种中间件

  - 应用级中间件
  - 路由级中间件
  - 错误处理中间件
  - 内置中间件
  - 第三方中间件

使用可选则挂载路径，可在应用级别或路由级别装载中间件

另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。

1. 应用级中间件

应用级中间件绑定到 app 对象使用 app.use()和 app.METHOD()，其中 METHOD 是需要处理的 HTTP 请求，例如 GET、PUT、POST 等等，全部小写。

```js
const app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use((req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/use/:id', (req, res, next) => {
  console.log('user');
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', (req, res, next) => {
  res.send('user');
});
```

下面这个例子展示了在一个挂载点装载一组中间件。

```js
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use(
  '/user/:id',
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
  }
);
```

作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。

在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环。

```js
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get(
  '/user/:id',
  (req, res, next) => {
    console.log('ID:', req.params.id);
    next();
  },
  (req, res, next) => {
    res.send('user info');
  }
);
// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', (req, res, next) => {
  res.end(req.params.id);
});
```

如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。

注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。

```js
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get(
  '/user/:id',
  (req, res, next) => {
    // 如果 user id 为 0, 跳到下一个路由
    if (req.params.id === 0) next('router');
    // 否则将控制权交给栈中下一个中间件
    else next();
  },
  (req, res, next) => {
    // 渲染常规页面
    res.render('regular');
  }
);
// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', (req, res, next) => {
  res.render('special');
});
```

2. 路由级中间件

路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。

```js
const router = express.Router();
```

路由级使用 router.use()或者 router.VERB()加载

上述在应用级创建的中间件系统，可通过如下代码改写为路由级

```js
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use(
  '/user/:id',
  function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  }
);

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get(
  '/user/:id',
  function (req, res, next) {
    // 如果 user id 为 0, 跳到下一个路由
    if (req.params.id == 0) next('route');
    // 负责将控制权交给栈中下一个中间件
    else next(); //
  },
  function (req, res, next) {
    // 渲染常规页面
    res.render('regular');
  }
);

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// 将路由挂载至应用
app.use('/', router);
```

3. 错误处理中间件

> 错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。

```js
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke');
});
```

4. 内置中间件

从 4.x 版本开始，, Express 已经不再依赖 Connect 了。

除了 express.static, Express 以前内置的中间件现在已经全部单独作为模块安装使用了

- express.static(root, [options])

express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。

参数 root 指提供静态资源的根目录。

可选的 options 参数拥有如下属性。

| 属性         | 描述                                                                            | 类型     | 缺省值       |
| ------------ | ------------------------------------------------------------------------------- | -------- | ------------ |
| dotfiles     | 是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”     | String   | "ignore"     |
| etag         | 是否启用 etag 生成                                                              | Boolean  | true         |
| extensions   | 设置文件扩展名备份选项                                                          | Array    | []           |
| index        | 发送目录索引文件，设置为 false 禁用目录索引                                     | Mixed    | "index.html" |
| lastModified | 设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。 | Boolean  | true         |
| maxAge       | 以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。                    | Number   | 0            |
| redirect     | 当路径为目录时，重定向至 “/”                                                    | Boolean  | true         |
| setHeaders   | 设置 HTTP 头以提供文件的函数。                                                  | Function |              |

下面的例子使用了 express.static 中间件，其中的 options 对象经过了精心的设计。

```js
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeader: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};

app.use(express.static('public', options));
```

每个应用可有多个静态目录。

```js
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

5. 第三方中间件

通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

```
 npm install cookie-parser
```

```js
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

// 加载用于解析cookie的中间件
app.use(cookieParser());
```
