/**
 * 模块化定义
 * 
 * 1. js设计之初只是为了实现表单验证这样的简单功能，没设计模块化方案，所以js天生不支持模块化
 * 2. 不支持模块化简单来说就是在一个js文件内不能引入其他js文件
 * 3. 为了让js支持模块化，一些大神自己编写底层库文件，让js开始支持模块化
 * 4. js模块化规范有四种标准： AMD CMD CommonJS ES6
 * 5. Node属于CommonJS标准
 * 6. 使用模块化可以很好的解决变量、函数名冲突问题，也能灵活的解决文件依赖问题
 */

/**
 * 全局作用域 
 * 
 * 将变量、对象、方法直接挂载到global对象上
 * 就变成了全局作用域
 * 
 * 将变量、对象、函数等挂载到global对象上并不推荐，因为容易造成变量污染。
 **/
global.child = 'child'

global.obj = {
    name: 'lol',
    company: 'tencent',
    type: 'moba'
}

global.say = function(){
    console.log('lol fun')
}

/**
 * 局部作用域(模块作用域)
 * 
 * 1. 一个js文件就是一个模块
 * 2. 在一个js文件中定义的属性(属性、常量)和方法默认都只能在当前js文件中使用
 **/

/**
 * 创建index.js、user.js两个模块。 
 * user.js 模块中定义属性和方法，index.js导入user.js模块
 **/
const name = 'zx';
const person = {
    name: 'test',
    age: 18,
    skill: 'work'
}

function show(){
    console.log('模块化开发')
}

/**推荐使用 module.exports 导出模块中定义好的变量、对象、方法 */
module.exports = {
    name,
    person,
    show
}