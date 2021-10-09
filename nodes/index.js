/**
 * mac解决node端口号被占用问题
 * 控制台输入sudo lsof -i:端口号
 * sudo kill -9 pid （如图：sudo kill -9 304）
 */

/**加载user.js, 加载自定义模块时， 必须使用路径形式 */
 const user = require('./user');

 /**局部作用域测试 */
console.log(user.name); 
user.show(); 
console.log(user.person.skill) 

/**全局作用域测试 */
console.log(global.child)
console.log(global.obj.name)
console.log(global.say())

/**
 * MVC思想
 *
 * controller 控制器 处理业务
 * model 数据模型 操作数据
 * view 视图 页面渲染&json数据响应
 * utils 工具
 * public 静态资源
 * app.js 程序入口
 * router.js 定义路由规则
 * middleware.js 自定义中间件
 * config.js 配置项
 * .gitignore git管理的时候忽略掉的文件或目录
 */

/**
 * 使用Express构建Web服务器步骤：
 *
 * 1. 加载 express 模块
 * 2. 创建 express 服务器
 * 3. 开启服务器
 * 4. 监听浏览器请求并进行处理
 */

const path = require('path');

/**1. 加载 express 模块 */
const express = require('express');

/**2. 创建服务器 */
const app = express();

/**3. 启动服务器 */
app.listen(3001, () => console.log('server running'));

/**
 * 开放（托管）静态资源，托管css、js、img等文件
 * app.use('/public', express.static('./public'))
 */
app.use('/public', express.static(path.join(__dirname, 'publicd')));

/**
 * express中间件是一个特殊的url地址处理函数
 *  - 该函数中有三个基本参数，req、res、next
 *  - req就是回调函数中req对象
 *  - res就是回调函数中res对象
 *  - next就是当该中间件执行完成后自动进入下一个中间件
 *
 * express有五中类别的中间件：
 *  - 应用级别的中间件： 挂载到 app 上的中间件，例如：app.use()
 *  - 路由级别的中间件： 挂载到 router 对象上的中间件，例如：router.get()、 router.post
 *  - 错误级别的中间件： 回调函数中，有四个参数 app.use((err, req, res, next)=>{})
 *  - 内置中间件： express.static() ， express提供的唯一内置中间件
 *  - 第三方中间件： 非express框架提供的，需要程序员手动安装才能使用的中间件；body-parser 解析post 表单数据
 */

/** ===自定义中间件=== */

/**记录日志中间件 */
function writeLog(req, res, next) {
  const str = req.url + '' + new Date() + '\n';
  fs.appendFile('./run.log', str, (err) => {
    /**出现错误，进行提示，并结束程序 */
    if (err) return res.send('写入失败日志');
    else {
      /**未出现错误，进入下一个中间件来执行 */
    }
  });
}

/**自定义url检测中间件，不存在url地址直接显示404 not found */
function checkUrl(req, res, next) {
  if (res.url !== '/index' && req.url !== '/list') {
    return res.end('404 not found');
  }
  next();
}

/**
 * 注意调用顺序
 * 先调用 writeLog 中间件时，不管url地址是否正确，都会记录 run.log 文件
 * 先调用 checkUrl 中间件时，如果url地址不正确就不会写 run.log 文件
 */

/**将writeLog注册中间件 */
app.use(writeLog);
/**将checkUrl注册中间件 */
app.use(checkUrl);

/**
 * 监听浏览器请求
 * app.get() 监听get请求, get方法用来接收get请求，浏览器地址栏发起的请求都是get请求
 * app.post() 监听post请求, post方法用来接收post请求，接收post表单提交的请求
 */

/**
 * 路由就是浏览器中url地址和app.get/app.post方法中参数1的对应的关系
 * 浏览器地址： http://127.0.0.1:3000/index
 */

/**
 * 当url地址为: http://127.0.0.1:3000/index 时
 * 使用app.get进行处理
 * @param url地址
 * @param 当监听到浏览器请求之后触发的回调函数
 *        req: 请求对象，就是http模块中的req对象
 *        res: 响应对象，就是http模块中的res对象
 */
app.get('/index', (req, res) => {
  /**
   * sendFile
   * 核心: 使用sendFile方法。 该方法是express封装的一个方法，能够直接读取文件内容并返回给浏览器
   * @param 参数1 要读取的文件路径 --- 必须绝对路径
   * @param 参数2 配置项，可选，一般不用
   * @param 参数3 读取完成后的回调函数，该函数中有一个参数--错误对象
   *
   * 参数2示例:
   * const config = {
   *      root: __dirname + '/view', // 配置模板文件跟路径
   *      headers: {
   *          'content-type': 'text/html;charset=utf-8' // 配置头信息
   *      }
   * }
   */
  res.sendFile(
    path.join(__dirname, 'index.html'),
    (err) => err && console.log(err)
  );

  /**end方法也是http模块提供的方法 */
  // res.end('hello express');
});

/**
 * 当url地址为： http://127.0.0.1:3000/list 时，
 * 进入下面方法来进行处理
 */
app.get('/list', (req, res) => {
  const obj = {
    root: path.join(__dirname),
  };
  /**
   * 配置项中 root 就是用来设置文件所处目录的绝对路径的。
   * 有了参数2之后，参数2和参数1会共同拼接一个绝对路径
   */
  res.sendFile('index.html', obj, (err) => err && console.log(err));

  /**send方法是express提供的方法 */
  // res.send('hello list')
});

/**
 * 其他地址一概进入下面来处理
 */
app.get('*', (req, res) => {
  res.end('404 not found');
});
