/**
 * 请求：浏览器向服务器发送请求，请求服务器的某个文件。
 * 处理：服务器接收到浏览器请求之后，找到对应的文件。
 * 响应：服务器读读取出文件内容，再将文件内容返回给浏览器。
 */

/**
 * 创建Web服务器4步骤：
 *
 * 1. 加载http模块
 * 2. 创建服务器对象
 * 3. 开启服务器
 * 4. 监听服务器请求并进行处理
 */

/**1. 加载http模块 */
const http = require('http');

const fs = require('fs');

/**2. 创建服务器对象 */
const server = http.createServer();

/**3. 创建服务器对象 */
server.listen(3015, () => {
  console.log('Server running...');
});

/**4. 监听服务器请求并进行处理 */

/**
 * on: 该方法用来监听事件
 * @param 事件类型， request代表浏览器请求事件
 * @param 当监听到浏览器请求后触发的回调函数，该函数中有两个参数 req和res
 *        req(request): 请求对象
 *        res(response): 响应对象
 */
server.on('request', (req, res) => {
  /**
   * 目标: 不同的url地址显示不同的内容
   * 核心: req(请求对象)中有url属性，该属性中保存了当前请求的url地址
   * 注意：url属性中保存的地址是没有协议、IP、端口号，并且以/开头的地址
   */
  const url = req.url;

  /**
   * 核心: 使用res(响应对象)中的setHeader方法
   */
//   res.setHeader('content-type', '*/*;charset=utf-8');

  /**end方法能够将数据返回浏览器，浏览器会显示该字符串 */
  if (url === '/') {
    /**
     * 调用fs.readFile读取index.html页面
     * 再将页面内容用res.end方法返回给浏览器
     */
    fs.readFile('./index.html', (err, data) => {
      if (err) return res.end('not found');
      res.end(data);
    });
  } else if (url === '/admin/login') res.end('login');
  else if (url === '/good') res.end('good');
  else if (url.startsWith('/public')) {
    /**
     * 静态资源加载
     *
     * 1. 浏览器中输入地址,按下回车键发送请求.
     * 2. 服务器找到对应的文件, 并将内容返回给浏览器.
     * 3. 浏览器接收到服务器返回内容开始进行解析.
     *    - 当解析到 link 标签时,再次请求服务器,获取a.css 文件内容.
     *    - 当解析到 script 标签时, 再次请求服务器,获取b.js 文件内容.
     *    - 当解析到 img 标签,再次请求服务器,获取图片文件.
     */
    fs.readFile('.' + url, (err, data) => {
      /**url = '/public/css/a.css'; */
      if (err) return res.end('not found');
      res.end(data);
    });
  } else res.end('not found');
});
