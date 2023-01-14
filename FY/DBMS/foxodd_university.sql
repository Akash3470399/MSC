
-- create database foxodd_university;
use foxodd_university;

show tables;

drop table if exists class;
drop table if exists room;
drop table if exists enrol;
drop table if exists prerequisite;
drop table if exists section;
drop table if exists course;
drop table if exists student;
drop table if exists major;
alter table faculty drop foreign key fk_dept_id;
drop table if exists department;
drop table if exists faculty;
drop table if exists school;

select "tables after drop :";
show tables;

create table school(
	school_id varchar(50) primary key,
	school_name varchar(100) not null,
	address varchar(150),
	dean_name varchar(150)
);


create table faculty(
	faculty_id varchar(50) primary key,
	faculty_name varchar(100) not null,
	salary float not null,
	dept_id varchar(50) -- as department table is not created yet so fk is not defined till
);

create table department(
	dept_id varchar(50) primary key,
	dept_name varchar(100) not null,
	dept_location varchar(100) not null,
	school_id varchar(50),
	chair_id varchar(50),
        foreign key(school_id) references school(school_id),
	foreign key(chair_id) references faculty(faculty_id)
);

alter table faculty add constraint fk_dept_id foreign key(dept_id) references department(dept_id);

create table major(
	major_id varchar(50) primary key,
	major_name varchar(100) not null,
	dept_id varchar(50),
	foreign key(dept_id) references department(dept_id)
);

create table student(
	stud_id int primary key,
	stud_name varchar(100) not null,
	dob date,
	total_credits int not null,
	dept_id varchar(50),
	advisor_id varchar(50),
	foreign key(dept_id) references department(dept_id),
	foreign key(advisor_id) references faculty(faculty_id)
);

create table course(
	course_id varchar(50) primary key,
	course_name varchar(100) not null,
	credits int,
	dept_id varchar(50),
	foreign key(dept_id) references department(dept_id)
);

create table section(
	course_id varchar(50) not null,
	section_id varchar(50) not null,
	semester int,
	year int,
	foreign key(course_id) references course(course_id),
	primary key(course_id, section_id)
);

create table prerequisite(
	course_id varchar(50) not null,
	prereq_id varchar(50) not null,
	foreign key(course_id) references course(course_id) on delete cascade,
	foreign key(prereq_id) references course(course_id),
	primary key(course_id, prereq_id)
);

create table enrol(
	student_id int not null,
	course_id varchar(50) not null,
	section_id varchar(50) not null,
	semester varchar(50),
	year int,
	grade varchar(10),
	foreign key(student_id) references student(stud_id),
	foreign key(course_id, section_id) references section(course_id, section_id),
	primary key(student_id, course_id, section_id)
);

create table room(
	room_id int primary key,
	floor_no int,
	building_no int,
	capacity int
);

create table class(
	room_id int not null,
	course_id varchar(50) not null,
	section_id varchar(50) not null,
	faculty_id varchar(50) not null,
	date_ date not null,
	time_ time not null,
	duration int,
	foreign key(room_id) references room(room_id),
	foreign key(course_id, section_id) references section(course_id, section_id),
	foreign key(faculty_id) references faculty(faculty_id),
	primary key(room_id, course_id, section_id, faculty_id, date_, time_)
);


-- SET GLOBAL local_infile=1;
-- \q
--  sudo mysql --local-infile=1 -u root -p1


load data local 
	infile './data/foxodd_school.csv'  
	into table school 
	fields terminated by ',' 
	enclosed by '"' 
	lines terminated by '\r\n' 
	ignore 1 lines;

alter table faculty drop foreign key fk_dept_id;

load data local 
	infile './data/foxodd_faculty.csv'  
	into table faculty 
	fields terminated by ',' 
	enclosed by '"' 
	lines terminated by '\r\n' 
	ignore 1 lines;

load data local 
	infile './data/foxodd_department.csv' 
	into table department 
	fields terminated by ',' 
	enclosed by '"' 
	lines terminated by '\r\n'
	ignore 1 lines;
show warnings;
alter table faculty add constraint fk_dept_id foreign key(dept_id) references department(dept_id);

load data local
	infile './data/foxodd_major.csv'
	into table major
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;

load data local
	infile './data/foxodd_student.csv'
	into table student
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;

load data local
	infile './data/foxodd_course.csv'
	into table course
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;

load data local
	infile './data/foxodd_section.csv'
	into table section
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;

load data local
	infile './data/foxodd_prerequisite.csv'
	into table prerequisite
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;

load data local
	infile './data/foxodd_enrol.csv'
	into table enrol
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;

load data local
	infile './data/foxodd_room.csv'
	into table room
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;

load data local
	infile './data/foxodd_class.csv'
	into table class
	fields terminated by ','
	enclosed by '"'
	lines terminated by '\r\n'
	ignore 1 lines;
