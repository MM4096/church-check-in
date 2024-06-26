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
drop table checkin;

create table relationship (
	id serial primary key,
	parent_id int references person (id) not null,
	child_id int references person (id) not null
)

create table checkin (
	id serial primary key,
	person_id int references person (id) not null,
	check_in_time timestamp not null,
	check_out_time timestamp
)

CREATE TABLE admin_table (
	id serial PRIMARY KEY,
	username varchar(32) not null,
	salt varchar(32) not null,
	password_hash varchar(128) not null
)

create table tokens (
	id serial primary key,
	admin_id int references admin_table (id) not null,
	issue_date timestamp not null,
	expiry_date timestamp not null,
	token varchar(64) not null,
	is_valid bool not null
)

set timezone = 'NZDT'

alter database postgres set timezone to 'NZDT'

show timezone

insert into person (firstname) values ('Rose')

insert into relationship  (parent_id, child_id) values (1, 2)

insert into checkin (person_id, check_in_time, check_out_time) values (1, '2022-01-01 00:00:00', '2022-01-01 00:00:01')

alter sequence persons_personid_seq restart with 1


alter sequence person_id_seq restart with 24


drop table relationship 


