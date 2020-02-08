/*
*
* BEGIN CLR
*
*/

DROP TABLE IF EXISTS Clients_tmp   CASCADE;
DROP TABLE IF EXISTS Contracts_tmp CASCADE;
DROP TABLE IF EXISTS Appeals_tmp   CASCADE;
DROP TABLE IF EXISTS Jobs_tmp      CASCADE;
DROP TABLE IF EXISTS Workers_tmp   CASCADE;
DROP TABLE IF EXISTS Services_tmp  CASCADE;
DROP TABLE IF EXISTS Tariffs_tmp   CASCADE;
DROP TABLE IF EXISTS TSPairs_tmp   CASCADE; 

DROP TABLE IF EXISTS Clients   CASCADE;
DROP TABLE IF EXISTS Contracts CASCADE;
DROP TABLE IF EXISTS Appeals   CASCADE;
DROP TABLE IF EXISTS Jobs      CASCADE;
DROP TABLE IF EXISTS Workers   CASCADE;
DROP TABLE IF EXISTS Services  CASCADE;
DROP TABLE IF EXISTS Tariffs   CASCADE;
DROP TABLE IF EXISTS TSPairs   CASCADE;
DROP TABLE IF EXISTS Users     CASCADE;
DROP TABLE IF EXISTS Logins    CASCADE;


/*
*
* END CLR
*
*/


/*
*
* BEGIN Tools & enum types
*
*/

DROP TYPE IF EXISTS Contract_Type;
CREATE TYPE Contract_Type AS ENUM ('ф', 'ю');

DROP TYPE IF EXISTS Processing_Status;
CREATE TYPE Processing_Status AS ENUM ('o', 'c', 'p'); /* open closed processing */

DROP TYPE IF EXISTS User_Role;
CREATE TYPE User_Role AS ENUM ('d', 't', 'a', 'x'); /* d - dev, t - tech, a - acc, x - admin */

create or replace function ternary(bool, anyelement, anyelement) 
returns anyelement language sql immutable as $$
select case when $1 then $2 else $3 end
$$;



/*
*
* END Tools
*
*/

/*
*
* IFDEF DATA 
* сегмент с объявлением сущностей, представляющих данные. 
* к каждой из них создаётся *_tmp 
* для дальнейшей реализации темпоральной модели 
* через навешивание триггерных ф-ий
* Избыточно *****
*
*/


/* Services */

CREATE TABLE IF NOT EXISTS Services (
    id_service SERIAL PRIMARY KEY,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL
);

CREATE TABLE IF NOT EXISTS Services_tmp (
    id_service SERIAL,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

/* Tariffs */

CREATE TABLE IF NOT EXISTS Tariffs (
    id_tariff SERIAL PRIMARY KEY,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0)
);

CREATE TABLE IF NOT EXISTS Tariffs_tmp (
    id_tariff SERIAL,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

/* TSPairs */

CREATE TABLE IF NOT EXISTS TSPairs (
    id_tariff INTEGER NOT NULL REFERENCES Tariffs ON DELETE CASCADE,
    id_service INTEGER NOT NULL REFERENCES Services ON DELETE CASCADE,
    UNIQUE(id_tariff, id_service)
);

CREATE TABLE IF NOT EXISTS TSPairs_tmp (
    id_tariff INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);


/* Clients */

CREATE TABLE IF NOT EXISTS Clients (
    id_client SERIAL PRIMARY KEY,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30)
);

CREATE TABLE IF NOT EXISTS Clients_tmp (
    id_client SERIAL,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);


/* Contracts */

CREATE TABLE IF NOT EXISTS Contracts (
    id_contract SERIAL PRIMARY KEY,
    id_client INTEGER NOT NULL REFERENCES Clients ON DELETE CASCADE,
    id_tariff INTEGER REFERENCES Tariffs ON DELETE SET NULL,
    address varchar(50),
    contract_type Contract_Type
);

CREATE TABLE IF NOT EXISTS Contracts_tmp (
    id_contract SERIAL,
    id_client INTEGER NOT NULL,
    id_tariff INTEGER,
    address varchar(50),
    contract_type Contract_Type,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);


/* Appeals */

CREATE TABLE IF NOT EXISTS Appeals (
    id_appeal SERIAL PRIMARY KEY,
    id_contract INTEGER NOT NULL REFERENCES Contracts ON DELETE CASCADE,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Appeals_tmp (
    id_appeal SERIAL,
    id_contract INTEGER NOT NULL,
    description text,
    status Processing_Status,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);


/* Jobs */

CREATE TABLE IF NOT EXISTS Jobs (
    id_job SERIAL PRIMARY KEY,
    id_appeal INTEGER REFERENCES Appeals ON DELETE SET NULL,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Jobs_tmp (
    id_job SERIAL,
    id_appeal INTEGER,
    description text,
    status Processing_Status,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);


/* Workers */

CREATE TABLE IF NOT EXISTS Workers (
    id_worker SERIAL PRIMARY KEY,
    id_job INTEGER REFERENCES Jobs ON DELETE SET NULL,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50)
);

CREATE TABLE IF NOT EXISTS Workers_tmp (
    id_worker SERIAL,
    id_job INTEGER,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

/*
*
* ENDIF 
*
*/


/*
*
* Функциональные сущности
*
*/

CREATE TABLE IF NOT EXISTS Users (
    login varchar(20) PRIMARY KEY,
    password varchar(30),
    role User_Role
);

CREATE TABLE IF NOT EXISTS Logins (
    key varchar(32) PRIMARY KEY,
    login varchar(20) NOT NULL REFERENCES Users ON DELETE CASCADE
);

/*
    Можно добавить транзакции для User - X чтобы он обрабатывал запросы на откаты...
*/

/*
*
* Индексы, надо разобраться как и зачем.
*
*/

CREATE UNIQUE INDEX Services_actual_index ON Services_tmp(id_service, actual) WHERE actual = TRUE;
CREATE UNIQUE INDEX Tariffs_actual_index ON Tariffs_tmp(id_tariff, actual) WHERE actual = TRUE;
CREATE UNIQUE INDEX TSPairs_actual_index ON TSPairs_tmp(id_service, id_tariff, actual) WHERE actual = TRUE;
CREATE UNIQUE INDEX Clients_actual_index ON Clients_tmp(id_client, actual) WHERE actual = TRUE;
CREATE UNIQUE INDEX Contracts_actual_index ON Contracts_tmp(id_contract, actual) WHERE actual = TRUE;
CREATE UNIQUE INDEX Appeals_actual_index ON Appeals_tmp(id_appeal, actual) WHERE actual = TRUE;
CREATE UNIQUE INDEX Jobs_actual_index ON Jobs_tmp(id_job, actual) WHERE actual = TRUE;
CREATE UNIQUE INDEX Workers_actual_index ON Workers_tmp(id_worker, actual) WHERE actual = TRUE;


/*
*
* Основная логика логгирования изменений. ВСе изменения будут в tmp, в таблицах без tmp актуальная.
*
*/


CREATE OR REPLACE FUNCTION services_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Services_tmp(id_service, name, description, create_date, actual) VALUES (NEW.id_service, NEW.name, NEW.description, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Services_tmp SET actual = FALSE 
                WHERE id_service = OLD.id_service AND actual = TRUE;
            INSERT INTO Services_tmp(id_service, name, description, create_date, actual) VALUES (OLD.id_service, NEW.name, NEW.description, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Services_tmp SET actual = FALSE
                WHERE id_service = OLD.id_service AND actual = TRUE;
            INSERT INTO Services_tmp(id_service, name, description, create_date, actual) VALUES (OLD.id_service, OLD.name, OLD.description, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Services_trigger AFTER INSERT OR UPDATE OR DELETE ON Services FOR EACH ROW EXECUTE PROCEDURE services_handler();


CREATE OR REPLACE FUNCTION tariffs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Tariffs_tmp(id_tariff, name, payment, period, create_date, actual) VALUES (NEW.id_tariff, NEW.name, NEW.payment, NEW.period, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Tariffs_tmp SET actual = FALSE 
                WHERE id_tariff = OLD.id_tariff AND actual = TRUE;
            INSERT INTO Tariffs_tmp(id_tariff, name, payment, period, create_date, actual) VALUES (OLD.id_tariff, NEW.name, NEW.payment, NEW.period, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Tariffs_tmp SET actual = FALSE
                WHERE id_tariff = OLD.id_tariff AND actual = TRUE;
            INSERT INTO Tariffs_tmp(id_tariff, name, payment, period, create_date, actual) VALUES (OLD.id_tariff, OLD.name, OLD.payment, OLD.period, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Tariffs_trigger AFTER INSERT OR UPDATE OR DELETE ON Tariffs FOR EACH ROW EXECUTE PROCEDURE tariffs_handler();


CREATE OR REPLACE FUNCTION tspairs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO TSPairs_tmp(id_tariff, id_service, create_date, actual) VALUES (NEW.id_tariff, NEW.id_service, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE TSPairs_tmp SET actual = FALSE 
                WHERE id_tariff = OLD.id_tariff AND id_service = OLD.id_service AND actual = TRUE;
            INSERT INTO TSPairs_tmp(id_tariff, id_service, create_date, actual) VALUES (OLD.id_tariff, NEW.id_service, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE TSPairs_tmp SET actual = FALSE
                WHERE id_tariff = OLD.id_tariff AND id_service = OLD.id_service AND actual = TRUE;
            INSERT INTO TSPairs_tmp(id_tariff, id_service, create_date, actual) VALUES (OLD.id_tariff, OLD.id_service, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER TSPairs_trigger AFTER INSERT OR UPDATE OR DELETE ON TSPairs FOR EACH ROW EXECUTE PROCEDURE tspairs_handler();


CREATE OR REPLACE FUNCTION clients_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Clients_tmp(id_client, name, surname, patronymic, phone_number, create_date, actual) VALUES (NEW.id_client, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Clients_tmp SET actual = FALSE 
                WHERE id_client = OLD.id_client AND actual = TRUE;
            INSERT INTO Clients_tmp(id_client, name, surname, patronymic, phone_number, create_date, actual) VALUES (OLD.id_client, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Clients_tmp SET actual = FALSE
                WHERE id_client = OLD.id_client AND actual = TRUE;
            INSERT INTO Clients_tmp(id_client, name, surname, patronymic, phone_number, create_date, actual) VALUES (OLD.id_client, OLD.name, OLD.surname, OLD.patronymic, OLD.phone_number, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Clients_trigger AFTER INSERT OR UPDATE OR DELETE ON Clients FOR EACH ROW EXECUTE PROCEDURE clients_handler();


CREATE OR REPLACE FUNCTION contracts_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Contracts_tmp(id_contract, id_client, id_tariff, address, contract_type, create_date, actual) VALUES (NEW.id_contract, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Contracts_tmp SET actual = FALSE 
                WHERE id_contract = OLD.id_contract AND actual = TRUE;
            INSERT INTO Contracts_tmp(id_contract, id_client, id_tariff, address, contract_type, create_date, actual) VALUES (OLD.id_contract, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Contracts_tmp SET actual = FALSE
                WHERE id_contract = OLD.id_contract AND actual = TRUE;
            INSERT INTO Contracts_tmp(id_contract, id_client, id_tariff, address, contract_type, create_date, actual) VALUES (OLD.id_contract, OLD.id_client, OLD.id_tariff, OLD.address, OLD.contract_type, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Contracts_trigger AFTER INSERT OR UPDATE OR DELETE ON Contracts FOR EACH ROW EXECUTE PROCEDURE contracts_handler();


CREATE OR REPLACE FUNCTION appeals_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Appeals_tmp(id_appeal, id_contract, description, status, create_date, actual) VALUES (NEW.id_appeal, NEW.id_contract, NEW.description, NEW.status, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Appeals_tmp SET actual = FALSE 
                WHERE id_appeal = OLD.id_appeal AND actual = TRUE;
            INSERT INTO Appeals_tmp(id_appeal, id_contract, description, status, create_date, actual) VALUES (OLD.id_appeal, NEW.id_contract, NEW.description, NEW.status, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Appeals_tmp SET actual = FALSE
                WHERE id_appeal = OLD.id_appeal AND actual = TRUE;
            INSERT INTO Appeals_tmp(id_appeal, id_contract, description, status, create_date, actual) VALUES (OLD.id_appeal, OLD.id_contract, OLD.description, OLD.status, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Appeals_trigger AFTER INSERT OR UPDATE OR DELETE ON Appeals FOR EACH ROW EXECUTE PROCEDURE appeals_handler();

CREATE OR REPLACE FUNCTION jobs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Jobs_tmp(id_job, id_appeal, description, status, create_date, actual) VALUES (NEW.id_job, NEW.id_appeal, NEW.description, NEW.status, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Jobs_tmp SET actual = FALSE 
                WHERE id_job = OLD.id_job AND actual = TRUE;
            INSERT INTO Jobs_tmp(id_job, id_appeal, description, status, create_date, actual) VALUES (OLD.id_job, NEW.id_appeal, NEW.description, NEW.status, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Jobs_tmp SET actual = FALSE
                WHERE id_job = OLD.id_job AND actual = TRUE;
            INSERT INTO Jobs_tmp(id_job, id_appeal, description, status, create_date, actual) VALUES (OLD.id_job, OLD.id_appeal, OLD.description, OLD.status, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Jobs_trigger AFTER INSERT OR UPDATE OR DELETE ON Jobs FOR EACH ROW EXECUTE PROCEDURE jobs_handler();


CREATE OR REPLACE FUNCTION workers_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Workers_tmp(id_worker, id_job, name, surname, patronymic, skills, create_date, actual) VALUES (NEW.id_worker, NEW.id_job, NEW.name, NEW.surname, NEW.patronymic, NEW.skills, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Workers_tmp SET actual = FALSE 
                WHERE id_worker = OLD.id_worker AND actual = TRUE;
            INSERT INTO Workers_tmp(id_worker, id_job, name, surname, patronymic, skills, create_date, actual) VALUES (OLD.id_worker, NEW.id_job, NEW.name, NEW.surname, NEW.patronymic, NEW.skills, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Workers_tmp SET actual = FALSE
                WHERE id_job = OLD.id_job AND actual = TRUE;
            INSERT INTO Workers_tmp(id_worker, id_job, name, surname, patronymic, skills, create_date, actual) VALUES (OLD.id_worker, OLD.id_job, OLD.name, OLD.surname, OLD.patronymic, OLD.skills, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Workers_trigger AFTER INSERT OR UPDATE OR DELETE ON Workers FOR EACH ROW EXECUTE PROCEDURE workers_handler();

\i fill.sql

/*TG_TABLE_SCHEMA
*
*
* TODO: сдеалать роллбеки для каждой таблицы.g
*
*/