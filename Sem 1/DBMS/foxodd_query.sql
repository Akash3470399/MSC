-- select * from student where stud_id < 22111010 or stud_id > 22111020;
-- select * from student where stud_id not between 22111010 and 22111022;

-- select faculty with faculty id > 105 & having salary > 100000;
select * from faculty where faculty_id > 'F105' and salary > 100000;

-- wild card : 
-- % matches 0 or more char
-- _ matches only one char

select * from faculty where faculty_name like 'e%';

-- retrive faculty whos name starts with s and has t at 4th position 

-- facuty with whos name either start with s, r

select * from faculty where faculty_name like 's%' or faculty_name 'r%';

-- faculty with dept_id null
select * from faculty where dept_id is null;

-- scalar functions

-- group functions

--dept vise avg salary
-- select dept_id, avg(salary) from faculty group by dept_id;





-- find the rooms_id with max capacity on first floor, what is total no std can be acomdt on first floor, avg capacity on second floor;
--  ANY , ALL

-- any works like or 
-- all works like and
select * from student where stud_id = any(1,2,3,4,5,33);
-- corelative query;
