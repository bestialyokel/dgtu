drop table if exists my_object cascade;
create table if not exists my_object (
    id integer,
    time_create timestamp,
    time_dead timestamp,
    constraint p_key primary key (id, time_create) 
);
create table if not exists Object1() INHERITS (my_object);
create table if not exists Object2() INHERITS (my_object);
create table if not exists Object3() INHERITS (my_object);
drop function if exists add_with_check() cascade; 

create function add_with_check() returns trigger as $add_with_check$ 
begin 
	
	if (TG_OP = 'INSERT') then
		if (select NEW.id from my_object where id=NEW.id) is not null then
				new.time_create = Now(); 
				update my_object set time_dead=Now() where id=new.id;
				new.id = 1 + count(*) from my_object; 
		end if; 
	end if;
	return NEW; 
end; 
$add_with_check$ language plpgsql; 

create trigger add_with_check before insert on my_object 
for each row execute procedure add_with_check(); 

insert into my_object (id,time_create) values (1, Now()); 
insert into my_object (id,time_create) values (2, Now()); 
insert into my_object (id,time_create) values (2, Now()); 
insert into my_object (id,time_create) values (3, Now()); 


select * from my_object
order by my_object.id;
-----
DROP  FUNCTION if exists buf_concat(text, instr text, outstr text, prop text) CASCADE;

CREATE FUNCTION buf_concat(text, instr text, outstr text, prop text) RETURNS text
 AS $$
        BEGIN
            IF instr IS NULL THEN
                RETURN outstr;
            ELSE
                RETURN instr || prop || outstr ;
            END IF;
        END;
    $$
    LANGUAGE plpgsql;

CREATE AGGREGATE string_agg(text, text, text) (
    SFUNC=buf_concat,
    STYPE=text
);

Select string_agg('111','222','_') as concat ;