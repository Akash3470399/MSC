use foxodd_university;

show tables;
drop table if exists dept;
drop table if exists professor; 
drop table if exists school;
drop table if exists employee;


-- EMPLOYEE
create table employee(
	emp_id int primary key,
	emp_name varchar(30) not null,
	emp_add varchar(40)
);                                           

insert into employee values(1, 'Emma','address 1');
insert into employee values(2, 'smith','address 2');
insert into employee values(3, 'john','address 3');


-- SCHOOL
create table school(
	school_id int primary key,
	school_name varchar(30) not null,
	dean int unique not null,
       	foreign key(dean) references employee(emp_id)
);

insert into school values (101, 'school of business.', 1);
insert into school values (102, 'school of arts.', 2);
insert into school values (103, 'school of educations', 3);



-- DEPARTMENT 
create table dept(
	dept_id int primary key,
	dept_name varchar(50) not null,
	chaired_by int not null unique, -- as one professor is chaired for one dept only
	related_school int not null, 
	foreign key(related_school) references school(school_id),
       	foreign key(chaired_by) references professor(prof_id)
);



-- PROFFESSOR
create table professor(
	prof_id int unique not null,
	prof_edu varchar(40), -- professor is a employee
	related_dept int not null, -- a professor is assigned to a department
	foreign key(related_dept) references dept(dept_id),
	foreign key(prof_id) references employee(emp_id),
       	primary key(prof_id)	
);

-- insert into professor values (1, 'MS', );
-- insert into professor values (2, 'Phd');
-- insert into professor values (3, 'MS');
                                                                                      














