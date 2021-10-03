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


- 全局安装package

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

- 本地安装package

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

- 使用package.json
  
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



- 查看gulp所有版本

```
npm view gulp versions
```

