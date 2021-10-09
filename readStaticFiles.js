const path = require('path');
const mime = require('mime');
const fs = require('fs');

function readFileFunc(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) resolve('当前文件夹没有文件');
      else resolve(data);
    });
  });
}

async function readStaticFiles(filePathname) {
  /**获取文件后缀名 */
  const ext = path.parse(filePathname).ext;
  /**获取content-type值 */
  const mimeType = mime.getType(ext) || 'text/html';

  let data;

  /**若访问当前存在的文件夹 */
  if (fs.existsSync(filePathname)) {
   
    if (ext) data = await readFileFunc(filePathname); /**当前文件夹存在的文件 */
    else data = await readFileFunc(path.join(filePathname, '/index.html')); /** / 默认读取index.html */
  } else {
    data = 'file or folder not found'; /**没有找到资源 */
  }

  return {
      mimeType,
      data
  }
}

module.exports = readStaticFiles;
