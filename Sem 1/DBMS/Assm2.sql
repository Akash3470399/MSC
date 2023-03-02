-- SET A

create table Emp(eno int primary key,ename varchar(50),designation varchar(20),salary float dno int references Dept(dno) on delete cascade );
create table Dept(dno int primary key,dname varchar(30),loc varchar);

create table Hospital(hno int primary key,name varchar(30),city varchar(20));
create table Doctor(dno int primary key,dname varchar(40),city varchar(20));
create table hos_doc(hno int references Hospital(hno)on delete cascade, dno int references Doctor(dno) on delete cascade);

create table Patient(pno int primary key,name varchar(40),address text);
create table Bed(bedno int primary key,roomno int,description varchar(40), pno references Patient(pno) unique on delete cascade);

-- SET B
create table Property(pnumber int primary key,description varcahar(50),area text, dcode int references District(dcode) on delete cascade, oname varcahar(50) references Owner(oname) on delete cascade);
create table District(dcode int primary key,dname varchar(50),tax_rate float);
create table Owner(oname varcahar(50) primary key,address text,phone int check(phone > 0));

create table Employee(empno int primary key,name varchar(50),address text,city varchar(50),deptname varchar(varcahar));
create table Project(pnoint primary key,pname varchar(50),status varcahar(10));
create table emp_proj(empno int references Employee(empno) on delete cascade, pnoint int references Project(pnoint) on delete cascade, no_of_days int);

create table Book(bookno int primary key,name varchar(50) not null,pubname varchar(50));
create table Author(authorno int primary key,author_name varchar(50) not null);
create table book_author(bookno int references Book(bookno) on delete cascade, authorno int references Author(authorno) on delete cascade, date_of_pub date);


-- SET C
create table Bus(Bus_no int primary key,capacity int not null,depot_name varchar(20), Route_no int references Route(Route_no) on delete cascade);
create table Route(Route_no int primary key,source varchar(20),destination varchar(20),no_of_stations int);
create table Driver(Driver_no int primary key,driver_name varchar(20),licence_no int unique ,address varchar(20),age int,salary float);
create bus_driver(Bus_no int references Bus(Bus_no) on delete cascade, Driver_no int Driver(Driver_no) on delete cascade, date_of_duty date);


