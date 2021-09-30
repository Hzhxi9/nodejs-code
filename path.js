/**
 * 相对路径的缺陷
 * 使用相对路径在不同目录下执行读取文件操作 在 public下创建 index.js
 * 
 * 解决方法
 *  1. 定义好根路径 --- rootPath
 *  2. 读取文件时使用绝对路径： rootPath + 文件路径
 * 
 * 路径变量
 *  __dirname: 获取当前文件所处目录的绝对路径
 *  __filename: 获取当前文件的绝对路径
 * 
 * 特点: 跨平台， 自动处理路径分隔符 / 和 \
 * 
 */
const fs = require('fs');
const http = require('http');

/**
 * 1. join: 构造url地址，能够根据不同参数不同系统组装不同的文件地址
 * 2. sep属性： \或/， windows系统下是\; 类unix系统下是/
 * 3. dirname(): 获取文件路径(不包含文件名)
 * 4. basename(): 获取文件名(不包含目录路径)
 * 5. extname(): 获取文件后缀
 */
const path = require('path');

const server = http.createServer();

server.listen(3301, () => console.log('server running'));

server.on('request', (req, res) => {
    /** \/Users/huangzx/my-code/nodejs-code */
    console.log('__dirname==>', __dirname); 
    /** \/Users/huangzx/my-code/nodejs-code/path.js */
    console.log('__filename', __filename)
});
