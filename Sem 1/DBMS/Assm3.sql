-- SET A
create table Machine(Machine_id int primary key, Machine_name varchar(50) NOT NULL check(binary UPPER(Machine_name) = binary Machine_name),Machine_type varchar(10) check(Machine_type in (‘drilling’,‘milling’,‘lathe’,‘turning’,‘grinding’)),Machine_price float check(Machine_price > 0),Machine_cost float);

create table Policy(Policy_no int,Policy_name varchar(20) NOT NULL check(binary LOWER(Policy_name) = binary Policy_name),Policy_type varchar(10) check(Policy_type in (‘life’,‘vehicle’,accident’)),Policy_sale_date date,Policy_intro_date date);

-- SET B
create table Employee(Employee_id int,Employee_name varchar(20) NOT NULL check(binary UPPER(Employee_name) = binary Employee_name),Employee_desig varchar(10) check(Employee_desig in (‘Manager’,‘staff’,‘worker’)),Employee_sal float check(Employee_sal > 0)Employee_uid text Unique);

create table Hotel(hotel_no int primary key ,hotel_namevarchar(20),city varchar(20));
create table Room(room_no int primary key check(room_no > 0 & room_no < 100),type varchar(20) check(type in ('single', 'double', 'family')),price int check(price > 500 & price < 1000));
create table Guest(guest_no int primary key ,guest_name varchar(20),guestaddress varchar(20));
create table Booking(hotelno int primary key ,roomno int,datefrom date, guestno int,dateto date);

-- SET C

create table Account(acct_no int,acct_type varchar(20) check(acct_type in (‘saving’,’cuurent’)),balance int, branch_no int references Branch(branch_no) on delete cascade);
create table Loan(loan_no int,loan_amt int,no_of_years int, branch_no int references Branch(branch_no) on delete cascade);
create table Branch(branch_no int,branch_name varchar(20) NOT NULL,branch_city varchar(20));
create table Customer(cust_no int,cust_name varchar(20),cust_address text,customer_city varchar(20));
create table cust_acc(cust_no int references Customer(cust_no) on delete cascade, acct_no int references Account(acct_no) on delete cascade);
create table cust_loan(cust_no int references Customer(cust_no) on delete cascade, loan_no int references Loan(loan_no) on delete cascade);

