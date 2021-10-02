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
