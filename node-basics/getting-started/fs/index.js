const fs = require('fs');

const path = '../fs/fs.txt';

/**
 * 文件写入，调用writeFile方法向文件中写入内容
 * 1. 如果没有该文件，则尝试创建
 * 2. writeFile 是覆盖写入
 *
 * @param 要写的文件路径，绝对和相对均可
 * @param 要写入的字符串
 * @param 字符集， 默认是utf-8
 * @param 写入完成后触发的回调函数，该函数有一个参数err
 */
fs.writeFile(path, 'hello node js', 'utf8', (error) => {
  if (error) console.log(error);
});

/**
 * 调用appendFile方法向文件中追加写入内容
 * 1. 如果没有该文件，则尝试创建
 * 2. 追加写入
 * 3. 参数和writeFile方法一样
 *
 * @param 要写的文件路径，绝对和相对均可
 * @param 要写入的字符串
 * @param 字符集， 默认是utf-8
 * @param 写入完成后触发的回调函数，该函数有一个参数err
 */
fs.appendFile(path, ' hello world', (error) => {
  if (error) console.log(error);
});

/**
 * 文件读取
 * @param 要读取的文件路径 --- 相对路径和绝对路径均可，推荐使用绝对路径
 * @param 配置项，主要用来配置字符集。可选参数。如果不设置该参数，文件内容会以二进制形式返回
 * @param 读取完成后触发的回调函数，有两个参数 --- err 和 result
 *        读取成功: { err: null, result: 件内容，如果不设置参数2,则返回二进制数据。可以使用 toString() 方法将二进制数据
                 转为正常字符串 }
          读取失败: { err : 错误对象, result: undefined }
 */
fs.readFile(path, 'utf8', (error, result) => {
  if (error) console.log(error, '==error==');
  if (result) console.log(result, '==result==');
});

/**
 * 调用readdir方法遍历目录
 *
 * @param 要遍历的目录的路径
 * @param 字符集，默认utf-8
 * @param 遍历完成后触发的回调函数，有两个参数 err 和 files
 *        err: 错误对象
 *        files: 所有文件和目录的名称，数组形式
 */
fs.readdir('../hand_writing', (err, files) => {
  if (err) console.log(err);
  if (files.length) console.log(files);
});
