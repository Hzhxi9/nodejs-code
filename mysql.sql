-- mysql 数据查询

-- 基本查询

-- 语法格式: select 字段名1, 字段名2, 字段名3,... from 表名

-- 查询所有学生的学号和姓名 表: student

-- 字段: sno、 sname
select sno, sname from student

-- 查询学生的全部信息(全部字段信息)
-- * 是通配符，代表所有字段
select * from student



-- 带where子句的查询

-- 语法格式: select field1, field2, field3,... from 表名 查询表中的所有数据

-- where可以使用条件来筛选查询出的结果
-- 查询         谓词
-- 比较         >、>=、<、<=、!=、<>、!>、!<、not、+比较运算符
-- 集合         in、not in
-- 字符匹配      like、not like
-- 多重条件      and、or

-- 查询学号为2的学生的所有信息
select * from student where sno = 2;


-- 模糊查询

-- 通配符
-- %  代表任意长度(包括0)的任意字符
-- _  代表1位长度的任意字符
-- a%b: ab、 abb、 a或b
-- a_b: acb、atb
-- a_b%: acb、a&baad

-- like: 在执行模糊查询时，必须使用like来作为匹配条件

-- 查询昵称中包含 x 的学生的信息
select * from student where snickname like '%x%'

-- 查询结果排序

-- order by 可以对查询结果按某个字段的升降进行排序
-- 升序 asc(默认值), 降序 desc
-- 可进行排序的字段通常是 整型 英文字符串型 日期型 (中文字符串也行,但一般不用)

-- 查询所有学生信息，并按年龄升序排列
select * from student order by sage ase

-- 限制查询结果

-- limit 用来限制查询结果的起始点和长度
-- 格式: limit var1, var2
-- var1: 起始点, 查询结果的索引, 从0开始。 0代表第一条数据
-- var2: 长度
select * from student limit 2,4

-- 关系型数据库
-- 指采用了关系模型来组织数据的数据库
-- 本质就是二维表格模型，而一个关系型数据库就是由二维表及其之间的联系所组成的一个数据组织

-- 创建一个数据表，能够保存学生的基本信息(学号、姓名、年龄等)和学生每一科的考试成绩。

-- 一张表的形式
-- 缺点：重复数据太多(数据冗余)

-- 关系型数据库
-- 使用多张数据表联合保存数据
-- 缺点： 表多
-- 优点：数据耦合性低，每个数据表都能够独立管理


-- 数据操作

-- 多表查询
-- 格式: select * from 表1 join 表2 on 链接条件

-- 案例1: 查询学生基本信息，显示系名

-- 表: student dept (一般来讲，主要查询哪个表的数据，哪个表就作为表1， 或者哪个表字段多哪个就做表1)
-- student(表1 student表有7个字段， 要显示6个字段)
-- dept(表2 有两个字段，只显示一个字段)

--字段: student的所有字段，dept.dname

-- 链接条件: student.sdept = dept.did

select student.*, dept.dname from student join dept on student.sdept = dept.did;

-- 添加数据
-- 格式: insert into 表名(字段名1, 字段名2) vlaues (值1, 值2, ...)
-- 注意: 字段的顺序要和值的顺序是完全匹配的，自增长类型的主键，可以使用null来填充
-- mysql会自动填充数据，如果每个字段都有数据，那么表名后面可以不跟字段名，但是values里面的顺序必须正确

-- 案例: 向student表中添加一条数据
insert into student (sno, sname, snickname, sage, sgender, stime, sdept) vlaues (null, 'tony', 'car', 1000, '男', '2020-02-20', 3)


-- 修改数据
-- 格式: update 表名 set 字段=1=值1, 字段2=值2,... where 修改条件
-- 修改表中的哪一条(几条)数据的字段1=值1...

-- 案例: 将学号为6的学生姓名改为王，性别改为女
update student set sname='王', sgender='女' where sno=6;

-- 删除数据
-- 格式: delete from 表名 where 删除条件


-- 案例: 删除学号为4的学生信息
delete from student where sno=4;

