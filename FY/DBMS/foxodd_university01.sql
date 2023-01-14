-- Quries;

--    a.etrieve all faculty information from physics department. 
select "","etrieve all faculty information from physics department.";

select * from faculty where dept_id = (select dept_id from department where dept_name="computer science");

-- b.	Retrieve all female faculty information from physics department, whose salary is more than 50000.
select * from faculty where salary > 5000 and dept_id = (select dept_id from department where dept_name="computer science");

-- c.	Display the department names, location and school name for those departments whose location is same as their name
-- c.	Display the department names, location and school name for computer science depte
select department.dept_name, department.dept_location, school.school_name from department join school on department.school_id = school.school_id and department.dept_name = "computer science";

-- d.	Display faculty names for those faculty who are teaching section 2 of CS101scheduled in morning half in a room on first floor
-- select faculty.faculty_name from faculty join class on faculty.faculty_id = class.faculty_id and class.course_id = "CID101" and class.section_id="SEC101";

-- e.	Display the student names for all students who are enrolled for section 2 of CS101.
 select s.stud_name from student s join enrol e on s.stud_id = e.student_id and e.course_id = "CID101" and e.section_id="SEC101
";

-- f.	Display the faculty names who are teaching various sections of courses CS101 and CS105
-- select faculty.faculty_name from faculty join class on faculty.faculty_id = class.faculty_id and class.course_id in ("CID101", "CID105");

-- g.	Display all courses offered in even semester of year 2020 or in odd semester of year 2021 or both.
select course_name from course where course_id in(select course_id from section where (semester=0 and year=2020) or (semester=1 and year=2021));

-- h.	Display all the prerequisites required by the course CS201.

select * from course where course_id in (select prereq_id from prerequisite where course_id = "CID101");

-- i.	Display all the courses where CS201 is required as prerequisite.
select * from course where course_id in (select course_id from prerequisite where prereq_id = "CID101");

-- j.	Find all the students who have completed all the courses required by CS201.

-- select prerequisites of  cs102
select prereq_id from prerequisite where course_id = (select course_id from course where course_name="CS102");


select * form student where stud_id in (select stud_id from enrol where course_id = "CID101");

-- k.	Find name of faculty and course if the course is offered in year 2022, and is scheduled in even semester.
select faculty_name, c.course_name from (
	select faculty_name , course_id, section_id from (
		select faculty_id, course_id, section_id from class c where (course_id, section_id) 
		in (select course_id, section_id from enrol e where semester="even" and year=2020)
	) as tmp join faculty on tmp.faculty_id = faculty.faculty_id) 
as temp2 join course c on temp2.course_id = c.course_id;

-- l.	Give the name of the youngest student for course CS101
select 













-- select all the dept_name & chair by faculty name though a department dont have a chair faculty
 select d.dept_name, f.faculty_name from department d left join faculty f on d.chair_id = f.faculty_id;.

-- full outer join
select d.dept_name, f.faculty_name from department d left join faculty f on d.chair_id = f.faculty_id union select d.dept_name, f.faculty_name from department d right join faculty f on d.chair_id = f.faculty_id;


