/*
DROP TABLE IF EXISTS Clients CASCADE;
DROP TABLE IF EXISTS Contracts CASCADE;
DROP TABLE IF EXISTS Appeals CASCADE;
DROP TABLE IF EXISTS Jobs CASCADE;
DROP TABLE IF EXISTS Services CASCADE;
DROP TABLE IF EXISTS Tariffs CASCADE;
DROP TABLE IF EXISTS TSPairs CASCADE;
DROP TABLE IF EXISTS Workers CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Logins CASCADE;
*/



/*
*
*
*
*  init table?
*
*
*
*
*
*
*
*/

/*

CREATE TABLE IF NOT EXISTS Services (
    id_service SERIAL PRIMARY KEY,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL
);

CREATE TABLE IF NOT EXISTS Tariffs (
    id_tariff SERIAL PRIMARY KEY,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0)
);

CREATE TABLE IF NOT EXISTS TSPairs (
    id_tariff INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    UNIQUE(id_tariff, id_service),
    FOREIGN KEY(id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE CASCADE,
    FOREIGN KEY(id_service) REFERENCES Services(id_service) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Clients (
    id_client SERIAL PRIMARY KEY,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30)
);

DROP TYPE IF EXISTS Contract_Type;
CREATE TYPE Contract_Type AS ENUM ('ф', 'ю');

CREATE TABLE IF NOT EXISTS Contracts (
    id_contract SERIAL PRIMARY KEY,
    id_client INTEGER NOT NULL,
    id_tariff INTEGER DEFAULT 0,
    address varchar(50),
    contract_type Contract_Type,
    FOREIGN KEY(id_client) REFERENCES Clients(id_client) ON DELETE CASCADE,
    FOREIGN KEY(id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE SET DEFAULT
);

DROP TYPE IF EXISTS Processing_Status;
CREATE TYPE Processing_Status AS ENUM ('open', 'closed', 'proc');

CREATE TABLE IF NOT EXISTS Appeals (
    id_appeal SERIAL PRIMARY KEY,
    id_contract INTEGER NOT NULL,
    description text,
    status Processing_Status DEFAULT 'open',
    FOREIGN KEY(id_contract) REFERENCES Contracts(id_contract) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Jobs (
    id_job SERIAL PRIMARY KEY,
    id_appeal INTEGER NOT NULL,
    description text,
    status Processing_Status DEFAULT 'open',
    FOREIGN KEY(id_appeal) REFERENCES Appeals(id_appeal) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Workers (
    id_worker SERIAL PRIMARY KEY,
    id_job INTEGER DEFAULT 0,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50),
    FOREIGN KEY(id_job) REFERENCES Jobs(id_job) ON DELETE CASCADE
);

DROP TYPE IF EXISTS User_Role;
CREATE TYPE User_Role AS ENUM ('D', 'T', 'A', 'X');

CREATE TABLE IF NOT EXISTS Users (
    login varchar(20) PRIMARY KEY,
    password varchar(30),
    role User_Role
);

CREATE TABLE IF NOT EXISTS Logins (
    key varchar(32) PRIMARY KEY,
    login varchar(20) NOT NULL,
    FOREIGN KEY (login) REFERENCES Users(login) ON DELETE CASCADE
)


*/


/*
*
*
*
*  fill some data next?
*
*
*
*
*
*
*
*/


/*
*
* ternary operator 
*
*/
create or replace function ternary(bool, anyelement, anyelement) 
returns anyelement language sql immutable as $$
select case when $1 then $2 else $3 end
$$;




DROP TABLE IF EXISTS Clients_tmp CASCADE;
DROP TABLE IF EXISTS Contracts_tmp CASCADE;
DROP TABLE IF EXISTS Appeals_tmp CASCADE;
DROP TABLE IF EXISTS Jobs_tmp CASCADE;
DROP TABLE IF EXISTS Workers_tmp CASCADE;
DROP TABLE IF EXISTS Services_tmp CASCADE;
DROP TABLE IF EXISTS Tariffs_tmp CASCADE;
DROP TABLE IF EXISTS TSPairs_tmp CASCADE;


/*
*
*
*   Services
*   
*
*/

CREATE TABLE IF NOT EXISTS Services_tmp (
    id_service SERIAL,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

CREATE UNIQUE INDEX Services_unique_index ON Services_tmp(id_service, actual) WHERE actual = TRUE;

CREATE VIEW Services AS 
    SELECT id_service, name, description FROM Services_tmp WHERE actual = TRUE;


DROP FUNCTION services_handler CASCADE;

CREATE FUNCTION services_handler() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO Services_tmp VALUES (DEFAULT, NEW.name, NEW.description, DEFAULT, DEFAULT);
        /*raise notice '[%]', NEW;*/
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE Services_tmp SET actual=FALSE WHERE id_service=OLD.id_service;
        INSERT INTO Services_tmp VALUES (OLD.id_service, 
                                        ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                        ternary(NEW.description IS NULL, OLD.description, NEW.description), DEFAULT, DEFAULT);
        /*raise notice '[%]', NEW;*/
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE Services_tmp SET actual=FALSE WHERE id_service=OLD.id_service;
        /*raise notice '[%]', OLD;*/
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER Services_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Services FOR EACH ROW EXECUTE PROCEDURE services_handler();

/*
*
*
*   Tariffs
*   
*
*/


/*  

CREATE TABLE IF NOT EXISTS Tariffs_tmp (
    id_tariff SERIAL,
    name varchar(30),

CREATE TABLE IF NOT EXISTS TSPairs_tmp (
    id_tariff INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    create_date timestamp DEFAULT NOW(),
    override_date timestamp DEFAULT NULL,
    FOREIGN KEY(id_tariff) REFERENCES Tariffs_tmp(id_tariff) ON DELETE CASCADE,
    FOREIGN KEY(id_service) REFERENCES Services_tmp(id_service) ON DELETE CASCADE,
);


CREATE TABLE IF NOT EXISTS Clients_tmp (
    id_client SERIAL,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30),
    create_date timestamp DEFAULT NOW(),
    override_date timestamp DEFAULT NULL
);

CREATE UNIQUE INDEX Clients ON Clients_tmp(id_client, override_date)
    WHERE (override_date = NULL);


*/