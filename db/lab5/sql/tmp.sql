CREATE TABLE IF NOT EXISTS Services_tmp (
    id_service SERIAL,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Tariffs_tmp (
    id_tariff SERIAL,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0),
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS TSPairs_tmp (
    id_tariff INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
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

CREATE TABLE IF NOT EXISTS Contracts_tmp (
    id_contract SERIAL,
    id_client INTEGER NOT NULL,
    id_tariff INTEGER,
    address varchar(50),
    contract_type Contract_Type,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Appeals_tmp (
    id_appeal SERIAL,
    id_contract INTEGER NOT NULL,
    description text,
    status Processing_Status,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Jobs_tmp (
    id_job SERIAL,
    id_appeal INTEGER,
    description text,
    status Processing_Status,
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
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
CREATE TRIGGER Jobs_trigger AFTER INSERT OR UPDATE OR DELETE ON Jobs FOR EACH ROW EXECUTE PROCEDURE jobs_handler();
CREATE TRIGGER Appeals_trigger AFTER INSERT OR UPDATE OR DELETE ON Appeals FOR EACH ROW EXECUTE PROCEDURE appeals_handler();
CREATE TRIGGER Contracts_trigger AFTER INSERT OR UPDATE OR DELETE ON Contracts FOR EACH ROW EXECUTE PROCEDURE contracts_handler();
CREATE TRIGGER Clients_trigger AFTER INSERT OR UPDATE OR DELETE ON Clients FOR EACH ROW EXECUTE PROCEDURE clients_handler();
CREATE TRIGGER TSPairs_trigger AFTER INSERT OR UPDATE OR DELETE ON TSPairs FOR EACH ROW EXECUTE PROCEDURE tspairs_handler();
CREATE TRIGGER Tariffs_trigger AFTER INSERT OR UPDATE OR DELETE ON Tariffs FOR EACH ROW EXECUTE PROCEDURE tariffs_handler();
CREATE TRIGGER Services_trigger AFTER INSERT OR UPDATE OR DELETE ON Services FOR EACH ROW EXECUTE PROCEDURE services_handler();