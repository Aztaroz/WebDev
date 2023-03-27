create table customer (
cust_id varchar(8) primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
DOB date not null,
remainning_point number(6) not null,
email varchar(30) unique not null,
registration_date date not null);

create table employee (
emp_id varchar(8) primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
DOB date not null,
DOE date not null,
position varchar(30) not null,
salary int not null,
tel varchar(10) not null,
manager varchar(8));

create table coupon (
coupon_id varchar(8) primary key,
coupon_name varchar(30) not null ,
point_value number not null,
end_date date not null,
coupon_status number(1) not null,
redemption_rr_date date);

create table point_earning (
record_pe_id varchar(8) primary key,
emp_id varchar(8) not null,
cust_id varchar(8) not null,
earn_point number not null,
earn_date date not null,
constraint point_emp_id_fk foreign key (emp_id) references employee (emp_id),
constraint point_cust_id_fk foreign key (cust_id) references customer (cust_id));

create table redeem_coupon (
record_rc_id varchar(8) primary key,
coupon_id varchar(8) not null,
cust_id varchar(8) not null,
redemption_rc_date date not null,
constraint coupon_id_fk foreign key (coupon_id) references coupon (coupon_id),
constraint cust_id_fk foreign key (cust_id) references customer (cust_id));


set linesize 200;


insert into customer
values
('CT000001', 'Panachat', 'Aiamnam', to_date('2002/11/29', 'YYYY/MM/DD'), 100, 'panachat.ai@mail.wu.ac.th', to_date('2006/11/25', 'YYYY/MM/DD'));
insert into customer
values
('CT000002', 'Kasidit', 'Boonchai', to_date('2002/10/30', 'YYYY/MM/DD'), 150, 'kasidit.bo@mail.wu.ac.th', to_date('2006/11/27', 'YYYY/MM/DD'));
insert into customer
values
('CT000003', 'Jirayu', 'Satsanatayat', to_date('2002/2/23', 'YYYY/MM/DD'), 50, 'jirayu.sa@mail.wu.ac.th', to_date('2006/11/27', 'YYYY/MM/DD'));
insert into customer
values
('CT000004', 'Thanawat', 'Sriwilai', to_date('2000/11/27', 'YYYY/MM/DD'), 200, 'thanawat.si@mail.wu.ac.th', to_date('2006/11/30', 'YYYY/MM/DD'));


insert into employee
values 
('EM000001', 'Kanjana', 'Haruehansapong', to_date('1977/4/18', 'YYYY/MM/DD'), to_date('1997/4/18', 'YYYY/MM/DD'), 'manager', 15000, '0856728460', Null);
insert into employee
values 
('EM000002', 'Theerat', 'Saichoo', to_date('1987/9/1', 'YYYY/MM/DD'), to_date('2017/9/1', 'YYYY/MM/DD'), 'senior sales associate', 15000, '0675823945', 'EM000001');
insert into employee
values 
('EM000003', 'Charlee', 'Kaewrat', to_date('1990/10/1', 'YYYY/MM/DD'), to_date('2020/10/1', 'YYYY/MM/DD'), 'sales associate', 15000, '0644561415', 'EM000002');
insert into employee
values 
('EM000004', 'Bukhoree', 'Sahoh', to_date('1991/6/14', 'YYYY/MM/DD'), to_date('2021/6/14', 'YYYY/MM/DD'), 'sales associate', 15000, '0817857689', 'EM000002');

insert into coupon
VALUES 
('CP000001','Ice tea award', 100, to_date('2023/3/31', 'YYYY/MM/DD'), 0, null);
insert into coupon
VALUES 
('CP000002','Green tea award', 120, to_date('2023/3/31', 'YYYY/MM/DD'), 1,to_date('2023/1/11', 'YYYY/MM/DD'));
insert into coupon
VALUES 
('CP000003','Coffee award', 5, to_date('2023/3/31', 'YYYY/MM/DD'), 1,to_date('2023/2/1', 'YYYY/MM/DD'));
insert into coupon
VALUES 
('CP000004','Ice milk award', 5, to_date('2023/3/31', 'YYYY/MM/DD'), 0, null);
insert into coupon
VALUES 
('CP000005','Ice milk award', 5, to_date('2023/3/31', 'YYYY/MM/DD'), 0, null);

insert into point_earning VALUES ('PE000001','EM000001','CT000001',50,to_date('2020/6/16', 'YYYY/MM/DD'));
insert into point_earning VALUES('PE000002','EM000001','CT000001',30,to_date('2020/7/04', 'YYYY/MM/DD'));
insert into point_earning VALUES('PE000003','EM000001','CT000001',55,to_date('2019/6/14', 'YYYY/MM/DD'));
insert into point_earning VALUES('PE000004','EM000001','CT000001',10,to_date('2019/6/19', 'YYYY/MM/DD'));
insert into point_earning VALUES('PE000005','EM000001','CT000001',25,to_date('2017/6/24', 'YYYY/MM/DD'));
insert into point_earning VALUES('PE000006','EM000003','CT000002',15,to_date('2018/6/24', 'YYYY/MM/DD'));

insert into redeem_Coupon VALUES
('RC00001','CP000001','CT000001', to_date('2010/9/24', 'YYYY/MM/DD'));
insert into redeem_Coupon VALUES
('RC00002','CP000001','CT000001', to_date('2004/12/24', 'YYYY/MM/DD'));
insert into redeem_Coupon VALUES
('RC00003','CP000001','CT000001', to_date('2012/6/24', 'YYYY/MM/DD'));
insert into redeem_Coupon VALUES
('RC00004','CP000001','CT000001', to_date('2023/1/30', 'YYYY/MM/DD'));



-- Join

-- แสดงข้อมูลของพนักงาน เช่น รหัสพนักงาน ชื่อจรืง นามสกุล ตำแหน่งงาน เงินเดือน  และชื่อหัวหน้า
-- วัตถุประสงค: เพื่อให้เห็นข้อมูลของพนักงานและหัวหน้าของพนักงานว่าใครเป็นใคร
-- ให้กลุ่มผู้ใช่: ผู้จัดการ, ผู้ดูแลระบบ, หน่วยงานต่างๆ ที่ต้องการตรวจสอบว่าพนักงานแต่ละคนมีตำแหน่งและหัวหน้า
select emp.emp_id, emp.first_name, emp.last_name, emp.position, emp.salary, emp.tel, mgr.first_name || ' ' || mgr.last_name AS mgr_name
from employee emp inner join employee mgr 
on emp.manager = mgr.emp_id;

-- แสดงข้อมูลของพนักงาน เช่น รหัสรายการเพิ่มแต้ม ชื่อพนักงาน ชื่อลูกค้า แต้มที่ได้ วันที่เพิ่มแต้ม
-- วัตถุประสงค์: เพื่อแสดงข้อมูลแต้มที่เพิ่มขึ้นและพนักงานที่ให้บริการการเพิ่มแต้มให้กับลูกค้าในแต่ละครั้ง
-- ให้กลุ่มผู้ใช้: ผู้ดูแลระบบโปรแกรมสะสมแต้ม, ผู้ดูแลระบบลูกค้าสัมพันธ์ และผู้ใช้งานที่ต้องการตรวจสอบข้อมูลแต้มและการให้บริการของพนักงาน
select point.record_pe_id, emp.first_name || ' ' || emp.last_name AS emp_name, cust.first_name || ' ' || cust.last_name AS cust_name, point.earn_point, point.earn_date
from point_earning point inner join employee emp on point.emp_id = emp.emp_id
inner join customer cust on cust.cust_id = point.cust_id;


-- Aggregate function

-- วัตถุประสงค์: เพื่อแสดงข้อมูลผลรวมของเงินเดือนพนักงานตำแหน่ง sales associate ทั้งหมด
-- ให้กลุ่มผู้ใช้:  ฝ่ายการเงิน
SELECT SUM(salary) FROM employee WHERE position = 'sales associate';

-- วัตถุประสงค์: เพื่อแสดงข้อมูลพนักงานที่ไม่ใช่พนักงานปฏิบัติการที่มีค่ามากที่สุดและน้อยที่สุด
-- ให้กลุ่มผู้ใช้:  ฝ่ายการเงิน
SELECT MAX(salary),MIN(salary) FROM employee WHERE position <> 'manager';




-- Build-in function

-- วัตถุประสงค์: เพื่อแสดงข้อมูลอายุงานของพนักงานทุกคนยกเว้นพนักงานตำแหน่ง manager
-- ให้กลุ่มผู้ใช้:  Manager
select emp_id, first_name, last_name, dob, doe, position, salary, tel, manager,round((trunc(current_date) - doe) / 365 as workedday,1)
from employee, dual
where position <> 'manager';








-- order by
-- วัตถุประสงค์: เพื่อแสดงข้อมูลเงินเดือนและโบนัสที่ได้ในตลอดทั้งปีของพนักงาน
-- ให้กลุ่มผู้ใช้:  ฝ่ายการเงิน
select emp_id, first_name || ' ' || last_name AS emp_name, position, salary * 12 AS Annual_salary, salary * 12 * 0.05 AS Annual_Bonus
from employee
order by position DESC, Annual_salary DESC;                