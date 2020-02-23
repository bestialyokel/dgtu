CREATE TABLE IF NOT EXISTS Services_tmp (
    id_record SERIAL PRIMARY KEY,
    id_service INTEGER,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL,
    create_date timestamp DEFAULT NOW(),
    override_date timestamp NULL
);

CREATE TABLE IF NOT EXISTS Tariffs_tmp (
    id_record SERIAL PRIMARY KEY,
    id_tariff INTEGER,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0),
    create_date timestamp DEFAULT NOW(),
    override_date timestamp NULL
);

CREATE TABLE IF NOT EXISTS Clients_tmp (
    id_record SERIAL PRIMARY KEY,
    id_client INTEGER,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30),
    create_date timestamp DEFAULT NOW(),
    override_date timestamp NULL
);

CREATE TABLE IF NOT EXISTS Contracts_tmp (
    id_record SERIAL PRIMARY KEY,
    id_contract INTEGER,
    id_client INTEGER NOT NULL,
    id_tariff INTEGER,
    address varchar(50),
    contract_type Contract_Type,
    create_date timestamp DEFAULT NOW(),
    override_date timestamp NULL
);

CREATE TABLE IF NOT EXISTS Appeals_tmp (
    id_record SERIAL PRIMARY KEY,
    id_appeal INTEGER,
    id_contract INTEGER NOT NULL,
    description text,
    status Processing_Status,
    create_date timestamp DEFAULT NOW(),
    override_date timestamp NULL
);

CREATE TABLE IF NOT EXISTS Jobs_tmp (
    id_record SERIAL PRIMARY KEY,
    id_job INTEGER,
    id_appeal INTEGER,
    description text,
    status Processing_Status,
    create_date timestamp DEFAULT NOW(),
    override_date timestamp NULL
);

CREATE TABLE IF NOT EXISTS Workers_tmp (
    id_record SERIAL PRIMARY KEY,
    id_worker INTEGER,
    id_job INTEGER,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50),
    create_date timestamp DEFAULT NOW(),
    override_date timestamp NULL
);

CREATE OR REPLACE FUNCTION services_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Services_tmp(id_service, name, description, create_date, override_date) VALUES (NEW.id_service, NEW.name, NEW.description, DEFAULT, NULL);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Services_tmp SET override_date = NOW() 
                WHERE id_service = OLD.id_service AND override_date IS NULL;
            INSERT INTO Services_tmp(id_service, name, description, create_date, override_date) VALUES (OLD.id_service, NEW.name, NEW.description, DEFAULT, NULL);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Services_tmp SET override_date = NOW()
                WHERE id_service = OLD.id_service AND override_date IS NULL;
            --INSERT INTO Services_tmp(id_service, name, description, create_date, override_date) VALUES (OLD.id_service, OLD.name, OLD.description, DEFAULT, NOW());
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 


CREATE OR REPLACE FUNCTION tariffs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Tariffs_tmp(id_record, id_tariff, name, payment, period, create_date, override_date) VALUES (DEFAULT, NEW.id_tariff, NEW.name, NEW.payment, NEW.period, DEFAULT, NULL);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Tariffs_tmp SET override_date = NOW() 
                WHERE id_tariff = OLD.id_tariff AND override_date IS NULL;
            INSERT INTO Tariffs_tmp(id_record, id_tariff, name, payment, period, create_date, override_date) VALUES (DEFAULT, OLD.id_tariff, NEW.name, NEW.payment, NEW.period, DEFAULT, NULL);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Tariffs_tmp SET override_date = NOW()
                WHERE id_tariff = OLD.id_tariff AND override_date IS NULL;
            --INSERT INTO Tariffs_tmp(id_tariff, name, payment, period, create_date, override_date) VALUES (OLD.id_tariff, OLD.name, OLD.payment, OLD.period, DEFAULT, NOW());
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 

CREATE OR REPLACE FUNCTION clients_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Clients_tmp(id_record, id_client, name, surname, patronymic, phone_number, create_date, override_date) VALUES (DEFAULT, NEW.id_client, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, NULL);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Clients_tmp SET override_date = NOW() 
                WHERE id_client = OLD.id_client AND override_date IS NULL;
            INSERT INTO Clients_tmp(id_record, id_client, name, surname, patronymic, phone_number, create_date, override_date) VALUES (DEFAULT, OLD.id_client, NEW.name, NEW.surname, NEW.patronymic, NEW.phone_number, DEFAULT, NULL);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Clients_tmp SET override_date = NOW()
                WHERE id_client = OLD.id_client AND override_date IS NULL;
            --INSERT INTO Clients_tmp(id_client, name, surname, patronymic, phone_number, create_date, override_date) VALUES (OLD.id_client, OLD.name, OLD.surname, OLD.patronymic, OLD.phone_number, DEFAULT, NOW());
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 


CREATE OR REPLACE FUNCTION contracts_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Contracts_tmp(id_record, id_contract, id_client, id_tariff, address, contract_type, create_date, override_date) VALUES (DEFAULT, NEW.id_contract, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type, DEFAULT, NULL);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Contracts_tmp SET override_date = NOW() 
                WHERE id_contract = OLD.id_contract AND override_date IS NULL;
            INSERT INTO Contracts_tmp(id_record, id_contract, id_client, id_tariff, address, contract_type, create_date, override_date) VALUES (DEFAULT, OLD.id_contract, NEW.id_client, NEW.id_tariff, NEW.address, NEW.contract_type, DEFAULT, NULL);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Contracts_tmp SET override_date = NOW()
                WHERE id_contract = OLD.id_contract AND override_date IS NULL;
            --INSERT INTO Contracts_tmp(id_contract, id_client, id_tariff, address, contract_type, create_date, override_date) VALUES (OLD.id_contract, OLD.id_client, OLD.id_tariff, OLD.address, OLD.contract_type, DEFAULT, NOW());
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 


CREATE OR REPLACE FUNCTION appeals_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Appeals_tmp(id_record, id_appeal, id_contract, description, status, create_date, override_date) VALUES (DEFAULT, NEW.id_appeal, NEW.id_contract, NEW.description, NEW.status, DEFAULT, NULL);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Appeals_tmp SET override_date = NOW() 
                WHERE id_appeal = OLD.id_appeal AND override_date IS NULL;
            INSERT INTO Appeals_tmp(id_record, id_appeal, id_contract, description, status, create_date, override_date) VALUES (DEFAULT, OLD.id_appeal, NEW.id_contract, NEW.description, NEW.status, DEFAULT, NULL);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Appeals_tmp SET override_date = NOW()
                WHERE id_appeal = OLD.id_appeal AND override_date IS NULL;
            --INSERT INTO Appeals_tmp(id_appeal, id_contract, description, status, create_date, override_date) VALUES (OLD.id_appeal, OLD.id_contract, OLD.description, OLD.status, DEFAULT, NOW());
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 


CREATE OR REPLACE FUNCTION jobs_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Jobs_tmp(id_record, id_job, id_appeal, description, status, create_date, override_date) VALUES (DEFAULT, NEW.id_job, NEW.id_appeal, NEW.description, NEW.status, DEFAULT, NULL);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Jobs_tmp SET override_date = NOW() 
                WHERE id_job = OLD.id_job AND override_date IS NULL;
            INSERT INTO Jobs_tmp(id_record, id_job, id_appeal, description, status, create_date, override_date) VALUES (DEFAULT, OLD.id_job, NEW.id_appeal, NEW.description, NEW.status, DEFAULT, NULL);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Jobs_tmp SET override_date = NOW()
                WHERE id_job = OLD.id_job AND override_date IS NULL;
            --INSERT INTO Jobs_tmp(id_job, id_appeal, description, status, create_date, override_date) VALUES (OLD.id_job, OLD.id_appeal, OLD.description, OLD.status, DEFAULT, NOW());
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 


CREATE OR REPLACE FUNCTION workers_handler() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO Workers_tmp(id_record, id_worker, id_job, name, surname, patronymic, skills, create_date, override_date) VALUES (DEFAULT, NEW.id_worker, NEW.id_job, NEW.name, NEW.surname, NEW.patronymic, NEW.skills, DEFAULT, NULL);
        ELSIF TG_OP = 'UPDATE' THEN
            UPDATE Workers_tmp SET override_date = NOW() 
                WHERE id_worker = OLD.id_worker AND override_date IS NULL;
            INSERT INTO Workers_tmp(id_record, id_worker, id_job, name, surname, patronymic, skills, create_date, override_date) VALUES (DEFAULT, OLD.id_worker, NEW.id_job, NEW.name, NEW.surname, NEW.patronymic, NEW.skills, DEFAULT, NULL);
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE Workers_tmp SET override_date = NOW()
                WHERE id_job = OLD.id_job AND override_date IS NULL;
            --INSERT INTO Workers_tmp(id_worker, id_job, name, surname, patronymic, skills, create_date, override_date) VALUES (OLD.id_worker, OLD.id_job, OLD.name, OLD.surname, OLD.patronymic, OLD.skills, DEFAULT, NOW());
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql; 

CREATE TRIGGER Workers_trigger AFTER INSERT OR UPDATE OR DELETE ON Workers FOR EACH ROW EXECUTE PROCEDURE workers_handler();
CREATE TRIGGER Jobs_trigger AFTER INSERT OR UPDATE OR DELETE ON Jobs FOR EACH ROW EXECUTE PROCEDURE jobs_handler();
CREATE TRIGGER Appeals_trigger AFTER INSERT OR UPDATE OR DELETE ON Appeals FOR EACH ROW EXECUTE PROCEDURE appeals_handler();
CREATE TRIGGER Contracts_trigger AFTER INSERT OR UPDATE OR DELETE ON Contracts FOR EACH ROW EXECUTE PROCEDURE contracts_handler();
CREATE TRIGGER Clients_trigger AFTER INSERT OR UPDATE OR DELETE ON Clients FOR EACH ROW EXECUTE PROCEDURE clients_handler();
CREATE TRIGGER Tariffs_trigger AFTER INSERT OR UPDATE OR DELETE ON Tariffs FOR EACH ROW EXECUTE PROCEDURE tariffs_handler();
CREATE TRIGGER Services_trigger AFTER INSERT OR UPDATE OR DELETE ON Services FOR EACH ROW EXECUTE PROCEDURE services_handler();