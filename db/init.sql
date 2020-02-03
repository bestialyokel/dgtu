
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
* BEGIN ternary operator 
*
*/
create or replace function ternary(bool, anyelement, anyelement) 
returns anyelement language sql immutable as $$
select case when $1 then $2 else $3 end
$$;

/*
*
* END ternary operator 
*
*/



TRUNCATE TABLE IF EXISTS Clients_tmp CASCADE;
TRUNCATE TABLE IF EXISTS Contracts_tmp CASCADE;
TRUNCATE TABLE IF EXISTS Appeals_tmp CASCADE;
TRUNCATE TABLE IF EXISTS Jobs_tmp CASCADE;
TRUNCATE TABLE IF EXISTS Workers_tmp CASCADE;
TRUNCATE TABLE IF EXISTS Services_tmp CASCADE;
TRUNCATE TABLE IF EXISTS Tariffs_tmp CASCADE;
TRUNCATE TABLE IF EXISTS TSPairs_tmp CASCADE;


/*
*
*
*   BEGIN Services
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

CREATE VIEW Services AS SELECT (id_service, name, description) FROM Services_tmp WHERE actual = TRUE;


CREATE OR REPLACE FUNCTION services_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Services_tmp VALUES (DEFAULT, NEW.name, NEW.description, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Services_tmp SET actual=FALSE WHERE id_service=OLD.id_service AND actual=TRUE;
            INSERT INTO Services_tmp VALUES (OLD.id_service, 
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                            ternary(NEW.description IS NULL, OLD.description, NEW.description), 
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Services_tmp SET actual=FALSE WHERE id_service=OLD.id_service AND actual=TRUE;
            INSERT INTO Services_tmp VALUES (OLD.id_service, OLD.NAME, OLD.description, DEFAULT, FALSE);
            DELETE FROM TSPairs WHERE id_service = OLD.id_service; /*  cascade delete */
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER Services_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Services FOR EACH ROW EXECUTE PROCEDURE services_handler();

/*
*
*
*   END Services
*   
*
*/


/*
*
*
*   BEGIN Tariffs
*   
*
*/

CREATE TABLE IF NOT EXISTS Tariffs_tmp (
    id_tariff SERIAL,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

CREATE UNIQUE INDEX Tariffs_unique_index ON Tariffs_tmp(id_tariff, actual) WHERE actual = TRUE;

CREATE VIEW Tariffs AS SELECT (id_tariff, name, payment, period) FROM Tariffs_tmp WHERE actual = TRUE;

CREATE OR REPLACE FUNCTION tariffs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Tariffs_tmp VALUES (DEFAULT, NEW.name, NEW.payment, NEW.period, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Tariffs_tmp SET actual=FALSE WHERE id_tariff=OLD.id_tariff AND actual=TRUE;
            INSERT INTO Tariffs_tmp VALUES (OLD.id_tariff, 
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                            ternary(NEW.payment IS NULL, OLD.payment, NEW.payment),
                                            ternary(NEW.period IS NULL, OLD.period, NEW.period), 
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Tariffs_tmp SET actual=FALSE WHERE id_tariff=OLD.id_tariff AND actual=TRUE;
            INSERT INTO Tariffs_tmp VALUES (OLD.id_tariff, OLD.name, OLD.payment, OLD.period, DEFAULT, FALSE);
            DELETE FROM TSPairs WHERE id_tariff = OLD.id_tariff; /*  cascade delete */
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER Tariffs_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Tariffs FOR EACH ROW EXECUTE PROCEDURE tariffs_handler();

/*
*
*
*   END Tariffs
*   
*
*/

/*
*
*
*   BEGIN TSPairs
*   
*
*/

CREATE TABLE IF NOT EXISTS TSPairs_tmp (
    id_tariff SERIAL REFERENCES Tariffs(id_tariff),
    id_service SERIAL REFERENCES Services(id_service),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

/*CREATE UNIQUE INDEX TSPairs_unique_index ON TSPairs_tmp(id_tariff, actual) WHERE actual = TRUE;*/

CREATE VIEW TSPairs AS SELECT (id_tariff, id_service) FROM TSPairs_tmp WHERE actual = TRUE;


CREATE OR REPLACE FUNCTION tspairs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO TSPairs_tmp VALUES (DEFAULT, NEW.name, NEW.payment, NEW.period, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE TSPairs_tmp SET actual=FALSE WHERE id_tariff=OLD.id_tariff AND id_service=OLD.id_service AND actual=TRUE;
            INSERT INTO TSPairs_tmp VALUES (OLD.id_tariff, OLD.id_service, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER TSPairs_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON TSPairs FOR EACH ROW EXECUTE PROCEDURE tspairs_handler();


/*
*
*
*   END TSPairs
*   
*
*/


/*
*
*
*   BEGIN Clients
*   
*
*/ 

CREATE TABLE IF NOT EXISTS Clients_tmp (
    id_client SERIAL PRIMARY KEY,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);



CREATE VIEW Clients AS SELECT (id_client, name, surname, patronymic, phone_number) FROM Clients_tmp WHERE actual = TRUE;


CREATE OR REPLACE FUNCTION clients_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Clients_tmp VALUES (DEFAULT, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE'
            UPDATE Clients_tmp SET actual=FALSE WHERE id_client=OLD.id_client AND actual=FALSE;
            INSERT INTO Clients_tmp VALUES (OLD.id_client, 
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                            ternary(NEW.surname IS NULL, OLD.surname, NEW.surname),
                                            ternary(NEW.patronymic IS NULL, OLD.patronymic, NEW.patronymic),
                                            ternary(NEW.phone_number IS NULL, OLD.phone_number, NEW.phone_number),  
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Clients_tmp SET actual=FALSE WHERE id_client=OLD.id_client AND actual=FALSE;
            INSERT INTO Clients_tmp VALUES (DEFAULT, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, FALSE);
            DELETE FROM Contracts WHERE id_client=OLD.id_client; /*  cascade delete */
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER Clients_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Clients FOR EACH ROW EXECUTE PROCEDURE clients_handler();

/*
*
*
*   END Clients
*   
*
*/ 

/*
*
*
*   BEGIN Contracts
*   
*
*/ 

CREATE TABLE IF NOT EXISTS Clients_tmp (
    id_client SERIAL PRIMARY KEY,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);



CREATE VIEW Clients AS SELECT (id_client, name, surname, patronymic, phone_number) FROM Clients_tmp WHERE actual = TRUE;


CREATE OR REPLACE FUNCTION clients_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Clients_tmp VALUES (DEFAULT, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE'
            UPDATE Clients_tmp SET actual=FALSE WHERE id_client=OLD.id_client AND actual=FALSE;
            INSERT INTO Clients_tmp VALUES (OLD.id_client, 
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                            ternary(NEW.surname IS NULL, OLD.surname, NEW.surname),
                                            ternary(NEW.patronymic IS NULL, OLD.patronymic, NEW.patronymic),
                                            ternary(NEW.phone_number IS NULL, OLD.phone_number, NEW.phone_number),  
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Clients_tmp SET actual=FALSE WHERE id_client=OLD.id_client AND actual=FALSE;
            INSERT INTO Clients_tmp VALUES (DEFAULT, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, FALSE);
            DELETE FROM Contracts WHERE id_client=OLD.id_client; /*  cascade delete */
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER TSPairs_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON TSPairs FOR EACH ROW EXECUTE PROCEDURE tspairs_handler();

/*
*
*
*   END Contracts
*   
*
*/ 