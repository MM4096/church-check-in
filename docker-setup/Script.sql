create table person (
	id serial primary key,
	firstname varchar(32) not null,
	lastname varchar(32),
	birthday varchar(10),
	notes varchar(8192),
	phone varchar(32),
	email varchar(128)
)

drop table persons;
drop table parentchildrelationship ;

create table relationship (
	parent_id int references person (id) not null,
	child_id int references person (id) not null
)

insert into person (firstname) values ('Rose')

insert into relationship  (parent_id, child_id) values (1, 2)

delete from persons where personid=1

alter sequence persons_personid_seq restart with 1



