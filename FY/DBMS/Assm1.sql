-- SET A

create table player(player_id int primary key, name varchar(50), birth_date date, birth_palce varchar(50));
create table student(roll_no int primary key, class varchar(20), weight numeric(6,2), height numeric(6,2));
create table project(project_id int primary key, project_name varchar(20), project_description text, status boolean);
create table donor(donor_no int donor_name varchar(50), blood_group varchar(10), last_date date);

-- SET B
create table property(property_id int primary key, property_des text, area float, rate int, agri_status varchar(30));
create table actor(actor_id int primary key, name varchr(30), birth_date date);
create table movie(movie_no int primary key, name varchar(30), release_year int);
create table hospital(hno int primary key, hname varchar(30), hcity varchar(20));

-- SET C
create table teacher(teacher_no int primary key, tname varchar(50), qualifications varchar(30), address text);
create table driver(driver_no int , permit_no int, dname varchar(50), address text, primary key(driver_no, permit_no));