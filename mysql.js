/**
 *  在node中使用mysql模块一共需要五个步骤
 *
 *  1. 加载mysql模块
 *  2. 创建mysql链接对象
 *  3. 链接mysql服务器
 *  4. 执行sql语句
 *  5. 关闭链接
 */

/**1. 加载mysql模块 */
const mysql = require('mysql');

/**2. 创建mysql链接对象 */
const connection = mysql.createConnection({
  host: '127.0.0.1' /**mysql服务器地址 */,
  user: 'root' /**用户名 */,
  password: 'root1234' /**用户名对应的密码 */,
  database: 'study' /*要访问的数据库 */,
  port: 3306 /**mysql服务器端口号， 3006可不写 */,
});

/**3. 链接mysql服务器 */
connection.connect();

/**
 * 4. 执行sql语句
 *
 * 功能:  执行sql语句
 * 参数1: 要执行的sql语句
 * 参数2: sql语句中的参数，有占位符用来设置占位符，可选参数
 * 参数3: sql执行完成后触发的回调函数，有三个参数
 *       err: 如果SQL执行失败则err中保存错误对象信息，成功则为null
 *       result: SQL语句的执行结果
 *       fields: 执行本次SQL语句，涉及到的字段信息，一般不用
 **/
const sql = 'select * from student';

/**查询 --- read */
connection.query(sql, (err, result) => {
  /**
   * 处理错误或者执行结果
   * 当执行查询的SQL语句时，result中以数组形式记录了查询结果。
   * 数组中每个单元都是一个对象，并且下标是 数据表的字段名
   **/
});

/**
 * 占位符模式
 * 当SQL语句中使用了占位符，则query方法需要使用参数2
 */
const sql2 = 'select * from student where sgender=?';
connection.query(sql2, '女', (err, results) => {
  if (err) return console.log(err);

  result.forEach(function (item, idx) {
    console.log(item);
  });
});

/**
 * 添加-- create
 *
 *  执行添加类型的SQL语句，查询结果（result）是一个对象，该对象中有两个属性需要记住
 *  - affectedRows: 受影响行数
 *  - insertID： 查询数据的主键值
 */
const sql3 = `insert into student values(null, '阿托', 'atuo', 9000, '男', '2019-02-18', 1)`;

/**
 * 当执行添加时，result是一个对象，该对象中包含了两个关键属性
 * affectedRows: 受影响行数
 * insertID: 新添加好的数据的主键值
 */
connection.query(sql3, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

/**
 * 占位符形式
 *
 * 加数据时使用站位符，该占位符需要使用一个对象来填充
 * 该对象的下标必须是 数据表的字段名
 * 带自增长的主键可以不用设置，因为系统会自动设置
 */

const sql4 = `insert into student set ?`;

const student_data = {
  sname: '蕾娜',
  snickname: 'lena',
  sage: 1000,
  sgender: '女',
  stime: '20',
};

connection.query(sql4, student_data, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

/**
 * 修改 -- update
 *
 * 执行修改类型的SQL语句，查询结果（result）是一个对象，该对象中有 affectedRows 属性
 */
const sql5 = "update student set snickname='lc',sage=30 where sno=5";
connection.query(sql5, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

/**
 * 占位符模式
 *
 * 数据修改通常需要两个占位符。
 * 占位符1是要修改的数据，对象形式，属性是数据表字段；
 * 占位符2是修改条件，通常是主键值.
 */
const sql6 = 'update student set ? where sno=?';

/**set之后的? 是要修改的实际数据，必须是一个对象形式 */
const obj = {
  snickname: 'admin',
  sage: 18,
};
const sno = 5;

/**
 * 当一个sql语句中有多个占位符时，参数2需要使用数组形式
 * 程序解析时，会按照数组的顺序将数据填充到对应占位符的位置
 */
connection.query(sql6, [obj, sno], (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

/**
 * 删除 -- delete
 *
 * 执行删除类型的SQL语句，查询结果（result）是一个对象，该对象中有 affectedRows 属性。
 */
const sql7 = 'delete from student where sno=8';

connection.query(sql7, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

/**
 * 占位符模式
 */
const sql8 = 'delete from student where sno=?';

connection.query(sql8, 8, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

/**5. 关闭链接 */
connection.end();
