use foxodd;
show tables;

drop table if exists school;

create table school(school_id varchar(10), school_name varchar(60), address varchar(100), dean_name varchar(60));

-- adding primary key
alter table school add constraint pk_school_id primary key(school_id);

-- adding not null constraint for school_name
-- alter table school drop constraint pk_

--insert into school values("1", "abc", "def", "dean1");
--insert into school(school_id, school_name) values("2", "abc");

-- this will update all the entries.
-- update school set school_name = "kel", address = "kkk";

update school set school_name = "kel", address = "kkk" where school_id = "1";

--delete from table_name where condition;
