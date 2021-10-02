一、 特性

Node.js 可以解析JS代码(没有浏览器安全级别的限制)提供了很多系统级别的API，如

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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>browser-safe-sandbox</title>
</head>
<body>
  <div>browser-safe-sandbox</div>
  <script>
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'https://m.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=30&optimus_uuid=A5518FF0AFEC11EAAB158D7AB0D05BBBD74C9789D9F649898982E6542C7DD479&optimus_risk_level=71&optimus_code=10', false)
    xhr.send()
  </script>
</body>
</html>
```

2. 利用nodejs请求一个接口

