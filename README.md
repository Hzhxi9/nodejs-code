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

NODE_ENV 环境变量将有cross-env设置打印 process.env.NODE_ENV === "production"

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

2.2 NRM管理源

NRM是npm的镜像管理工具，有时候国外资源太慢，有时候国外资源太慢，使用这个就可以快速在npm源间切换

- 安装nrm

```
// 在命令行执行命令, 全局安装nrm
nom install -g nrm
```

- 使用nrm

执行命令nrm ls查看可选的源。其中带*的是当前使用的源。上面的输出表明当前源是官方源。

- 切换nrm

如果要切换到taobao源，执行命令nrm use taobao

- 测试速度

通过nrm test测试相应源的响应时间

```
nrm test
```

