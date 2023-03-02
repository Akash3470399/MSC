-- drop table mark;
-- drop table student;

create table students(
	roll_no int primary key not null, 
	name text not null
);

create table marks(
	roll_no int , 
	subject text not null, 
	marks real not null,
	foreign key(roll_no) references students(roll_no) 
);


select * from students;
select * from marks;

