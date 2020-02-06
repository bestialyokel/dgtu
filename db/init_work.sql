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
    id_service SERIAL,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL
);

CREATE TABLE IF NOT EXISTS Services_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Services);

ALTER TABLE Services ADD PRIMARY KEY(id_service);


/* Tariffs */

CREATE TABLE IF NOT EXISTS Tariffs (
    id_tariff SERIAL,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0)
);

CREATE TABLE IF NOT EXISTS Tariffs_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Tariffs);

ALTER TABLE Tariffs ADD PRIMARY KEY(id_tariff);


/* TSPairs */

CREATE TABLE IF NOT EXISTS TSPairs (
    id_tariff SERIAL NOT NULL,
    id_service SERIAL NOT NULL
);

CREATE TABLE IF NOT EXISTS TSPairs_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (TSPairs);

ALTER TABLE TSPairs ADD FOREIGN KEY (id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE CASCADE;
ALTER TABLE TSPairs ADD FOREIGN KEY (id_service) REFERENCES Services(id_service) ON DELETE CASCADE;
ALTER TABLE TSPairs ADD UNIQUE (id_tariff, id_service);


/* Clients */

CREATE TABLE IF NOT EXISTS Clients (
    id_client SERIAL,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30)
);

CREATE TABLE IF NOT EXISTS Clients_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Clients);

ALTER TABLE Clients ADD PRIMARY KEY(id_client);


/* Contracts */

CREATE TABLE IF NOT EXISTS Contracts (
    id_contract SERIAL,
    id_client INTEGER NOT NULL,
    id_tariff INTEGER DEFAULT 0,
    address varchar(50),
    contract_type Contract_Type
);

CREATE TABLE IF NOT EXISTS Contracts_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Contracts);

ALTER TABLE Contracts ADD PRIMARY KEY(id_contract);
ALTER TABLE Contracts ADD FOREIGN KEY (id_client) REFERENCES Clients(id_client) ON DELETE CASCADE;
ALTER TABLE Contracts ADD FOREIGN KEY (id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE SET NULL;


/* Appeals */

CREATE TABLE IF NOT EXISTS Appeals (
    id_appeal SERIAL,
    id_contract INTEGER NOT NULL,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Appeals_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Appeals);

ALTER TABLE Appeals ADD PRIMARY KEY(id_appeal);
ALTER TABLE Appeals ADD FOREIGN KEY (id_contract) REFERENCES Contracts(id_contract) ON DELETE CASCADE;


/* Jobs */

CREATE TABLE IF NOT EXISTS Jobs (
    id_job SERIAL,
    id_appeal INTEGER NOT NULL,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Jobs_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Appeals);

ALTER TABLE Jobs ADD PRIMARY KEY(id_job);
ALTER TABLE Jobs ADD FOREIGN KEY (id_appeal) REFERENCES Appeals(id_appeal) ON DELETE CASCADE;

/* Workers */

CREATE TABLE IF NOT EXISTS Workers (
    id_worker SERIAL,
    id_job INTEGER DEFAULT 0,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50)
);

CREATE TABLE IF NOT EXISTS Workers_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Appeals);

ALTER TABLE Workers ADD PRIMARY KEY(id_worker);
ALTER TABLE Workers ADD FOREIGN KEY (id_worker) REFERENCES Jobs(id_job) ON DELETE SET NULL;

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
            INSERT INTO Services VALUES (DEFAULT, NEW.name, NEW.description); 
            INSERT INTO Services_tmp VALUES (DEFAULT, NEW.name, NEW.description, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Services SET 
                name = ternary(NEW.name IS NULL, OLD.name, NEW.name),
                description = ternary(NEW.description IS NULL, OLD.description, NEW.description)
                WHERE id_service = OLD.id_service;
            UPDATE Services_tmp SET 
                actual = FALSE 
                WHERE id_service = OLD.id_service AND actual = TRUE;
            INSERT INTO Services_tmp VALUES (OLD.id_service, 
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                            ternary(NEW.description IS NULL, OLD.description, NEW.description), 
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM Services WHERE id_service = OLD.id_service;
            UPDATE Services_tmp SET
                actual = FALSE
                WHERE id_service = OLD.id_service AND actual = TRUE;
            INSERT INTO Services_tmp VALUES (OLD.id_service, OLD.NAME, OLD.description, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 
CREATE TRIGGER Services_trigger AFTER INSERT OR UPDATE OR DELETE ON Services FOR EACH ROW EXECUTE PROCEDURE services_handler();


CREATE OR REPLACE FUNCTION tariffs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Tariffs VALUES (DEFAULT, NEW.name, NEW.payment, NEW.period); 
            INSERT INTO Tariffs_tmp VALUES (DEFAULT, NEW.name, NEW.payment, NEW.period, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Tariffs SET 
                name = ternary(NEW.name IS NULL, OLD.name, NEW.name),
                payment = ternary(NEW.payment IS NULL, OLD.payment, NEW.payment),
                period = ternary(NEW.period IS NULL, OLD.period, NEW.period)
                WHERE id_tariff = OLD.id_tariff;
            UPDATE Tariffs_tmp SET 
                actual = FALSE 
                WHERE id_tariff = OLD.id_tariff AND actual = TRUE;
            INSERT INTO Tariffs_tmp VALUES (OLD.id_tariff, 
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                            ternary(NEW.payment IS NULL, OLD.payment, NEW.payment),
                                            ternary(NEW.period IS NULL, OLD.period, NEW.period),
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM Tariffs WHERE id_tariff = OLD.id_tariff;
            UPDATE Tariffs_tmp SET
                actual = FALSE
                WHERE id_tariff = OLD.id_tariff AND actual = TRUE;
            INSERT INTO Tariffs_tmp VALUES (DEFAULT, NEW.name, NEW.payment, NEW.period, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER Tariffs_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Tariffs FOR EACH ROW EXECUTE PROCEDURE tariffs_handler();


CREATE OR REPLACE FUNCTION tspairs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO TSPairs VALUES (NEW.id_tariff, NEW.id_service); 
            INSERT INTO TSPairs_tmp VALUES (NEW.id_tariff, NEW.id_service, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM TSPairs WHERE id_tariff = OLD.id_tariff AND id_service = OLD.id_service;
            UPDATE TSPairs_tmp SET
                actual = FALSE
                WHERE id_tariff = OLD.id_tariff AND id_service = OLD.id_service AND actual = TRUE;
            INSERT INTO TSPairs_tmp VALUES (NEW.id_tariff, NEW.id_service, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER TSPairs_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON TSPairs FOR EACH ROW EXECUTE PROCEDURE tspairs_handler();


CREATE OR REPLACE FUNCTION clients_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Clients VALUES (DEFAULT, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number); 
            INSERT INTO Clients_tmp VALUES (DEFAULT, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, DEFAULT);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Clients SET 
                name = ternary(NEW.name IS NULL, OLD.name, NEW.name),
                surname = ternary(NEW.surname IS NULL, OLD.surname, NEW.surname),
                patronymic = ternary(NEW.patronymic IS NULL, OLD.patronymic, NEW.patronymic),
                phone_number = ternary(NEW.phone_number IS NULL, OLD.phone_number, NEW.phone_number)
                WHERE id_tariff = OLD.id_tariff;
            UPDATE Clients_tmp SET 
                actual = FALSE 
                WHERE id_client = OLD.id_client AND actual = TRUE;
            INSERT INTO Clients_tmp VALUES (OLD.id_client, 
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name), 
                                            ternary(NEW.surname IS NULL, OLD.surname, NEW.surname),
                                            ternary(NEW.patronymic IS NULL, OLD.patronymic, NEW.patronymic),
                                            ternary(NEW.phone_number IS NULL, OLD.phone_number, NEW.phone_number),
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM Clients WHERE id_client = OLD.id_client;
            UPDATE Clients_tmp SET
                actual = FALSE
                WHERE id_client = OLD.id_client AND actual = TRUE;
            INSERT INTO Clients_tmp VALUES (DEFAULT, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, FALSE);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER Clients_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Clients FOR EACH ROW EXECUTE PROCEDURE clients_handler();


CREATE OR REPLACE FUNCTION contracts_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Contracts VALUES (DEFAULT, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type); 
            INSERT INTO Contracts_tmp VALUES (DEFAULT, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type, DEFAULT, DEFAULT); 
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Contracts SET 
                id_client = ternary(NEW.id_client IS NULL, OLD.id_client, NEW.id_client),
                id_tariff = ternary(NEW.id_tariff IS NULL, OLD.id_tariff, NEW.id_tariff),
                address = ternary(NEW.address IS NULL, OLD.address, NEW.address),
                contract_type = ternary(NEW.contract_type IS NULL, OLD.contract_type, NEW.contract_type)
                WHERE id_contract = OLD.id_contract;
            UPDATE Contracts_tmp SET 
                actual = FALSE 
                WHERE id_contract = OLD.id_contract AND actual = TRUE;
            INSERT INTO Contracts_tmp VALUES (OLD.id_contract, 
                                            ternary(NEW.id_client IS NULL, OLD.id_client, NEW.id_client), 
                                            ternary(NEW.id_tariff IS NULL, OLD.id_tariff, NEW.id_tariff),
                                            ternary(NEW.address IS NULL, OLD.address, NEW.address),
                                            ternary(NEW.contract_type IS NULL, OLD.contract_type, NEW.contract_type),
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM Contracts WHERE id_contract = OLD.id_contract;
            UPDATE Contracts_tmp SET
                actual = FALSE
                WHERE id_contract = OLD.id_contract AND actual = TRUE;
            INSERT INTO Contracts_tmp VALUES (DEFAULT, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type, DEFAULT, FALSE); 
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER Contracts_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Contracts FOR EACH ROW EXECUTE PROCEDURE contracts_handler();


CREATE OR REPLACE FUNCTION appeals_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Appeals VALUES (DEFAULT, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type); 
            INSERT INTO Appeals_tmp VALUES (DEFAULT, NEW.id_contract, NEW.description, NEW.status, DEFAULT, DEFAULT); 
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Appeals SET 
                id_contract = ternary(NEW.id_contract IS NULL, OLD.id_contract, NEW.id_contract),
                description = ternary(NEW.description IS NULL, OLD.description, NEW.description),
                status = ternary(NEW.status IS NULL, OLD.status, NEW.status)
                WHERE id_appeal = OLD.id_appeal;
            UPDATE Appeals_tmp SET 
                actual = FALSE 
                WHERE id_appeal = OLD.id_appeal AND actual = TRUE;
            INSERT INTO Appeals_tmp VALUES (OLD.id_appeal, 
                                            ternary(NEW.id_contract IS NULL, OLD.id_contract, NEW.id_contract), 
                                            ternary(NEW.description IS NULL, OLD.description, NEW.description),
                                            ternary(NEW.status IS NULL, OLD.status, NEW.status),
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM Appeals WHERE id_appeal = OLD.id_appeal;
            UPDATE Appeals_tmp SET
                actual = FALSE
                WHERE id_appeal = OLD.id_appeal AND actual = TRUE;
            INSERT INTO Appeals_tmp VALUES (DEFAULT, NEW.id_contract, NEW.description, NEW.status, DEFAULT, FALSE);  
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER Appeals_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Appeals FOR EACH ROW EXECUTE PROCEDURE appeals_handler();


CREATE OR REPLACE FUNCTION jobs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Jobs VALUES (DEFAULT, NEW.id_appeal, NEW.description, NEW.status); 
            INSERT INTO Jobs_tmp VALUES (DEFAULT, NEW.id_appeal, NEW.description, NEW.status, DEFAULT, DEFAULT); 
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Jobs SET 
                id_appeal = ternary(NEW.id_appeal IS NULL, OLD.id_appeal, NEW.id_appeal),
                description = ternary(NEW.description IS NULL, OLD.description, NEW.description),
                status = ternary(NEW.status IS NULL, OLD.status, NEW.status)
                WHERE id_job = OLD.id_job;
            UPDATE Jobs_tmp SET 
                actual = FALSE 
                WHERE id_job = OLD.id_job AND actual = TRUE;
            INSERT INTO Jobs_tmp VALUES (OLD.id_job, 
                                            ternary(NEW.id_appeal IS NULL, OLD.id_appeal, NEW.id_appeal), 
                                            ternary(NEW.description IS NULL, OLD.description, NEW.description),
                                            ternary(NEW.status IS NULL, OLD.status, NEW.status),
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM Jobs WHERE id_job = OLD.id_job;
            UPDATE Jobs_tmp SET
                actual = FALSE
                WHERE id_job = OLD.id_job AND actual = TRUE;
            INSERT INTO Jobs_tmp VALUES (DEFAULT, NEW.id_appeal, NEW.description, NEW.status, DEFAULT, FALSE);  
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER Jobs_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Jobs FOR EACH ROW EXECUTE PROCEDURE jobs_handler();

CREATE OR REPLACE FUNCTION workers_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Workers VALUES (DEFAULT, NEW.id_job, NEW.name, NEW.surname, NEW.patronymic, NEW.skills); 
            INSERT INTO Workers_tmp VALUES (DEFAULT, NEW.id_job, NEW.name, NEW.surname, NEW.patronymic, NEW.skills, DEFAULT, DEFAULT);  
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Workers SET 
                id_job = ternary(NEW.id_job IS NULL, OLD.id_job, NEW.id_job),
                name = ternary(NEW.name IS NULL, OLD.name, NEW.name),
                surname = ternary(NEW.surname IS NULL, OLD.surname, NEW.surname),
                patronymic = ternary(NEW.patronymic IS NULL, OLD.patronymic, NEW.patronymic),
                skills = ternary(NEW.skills IS NULL, OLD.skills, NEW.skills)
                WHERE id_worker = OLD.id_worker;
            UPDATE Workers_tmp SET 
                actual = FALSE 
                WHERE id_worker = OLD.id_worker AND actual = TRUE;
            INSERT INTO Workers_tmp VALUES (OLD.id_worker, 
                                            ternary(NEW.id_job IS NULL, OLD.id_job, NEW.id_job),
                                            ternary(NEW.name IS NULL, OLD.name, NEW.name),
                                            ternary(NEW.surname IS NULL, OLD.surname, NEW.surname),
                                            ternary(NEW.patronymic IS NULL, OLD.patronymic, NEW.patronymic),
                                            ternary(NEW.skills IS NULL, OLD.skills, NEW.skills),
                                            DEFAULT, 
                                            DEFAULT);
        ELSIF TG_OP = 'DELETE' THEN
            DELETE FROM Workers WHERE id_worker = OLD.id_worker;
            UPDATE Workers_tmp SET
                actual = FALSE
                WHERE id_worker = OLD.id_worker AND actual = TRUE;
            INSERT INTO Workers_tmp VALUES (DEFAULT, NEW.id_job, NEW.name, NEW.surname, NEW.patronymic, NEW.skills, DEFAULT, FALSE);  
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER Workers_trigger INSTEAD OF INSERT OR UPDATE OR DELETE ON Workers FOR EACH ROW EXECUTE PROCEDURE workers_handler();

/*
*
*
* TODO: поменять все триггеры на AFTER вместо INSTEAD OF, узнать можно ли сделать универсальный триггер с вставкой NEW, OLD
*
*/